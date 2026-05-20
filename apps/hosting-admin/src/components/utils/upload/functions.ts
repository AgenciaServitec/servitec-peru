import { imageResizes } from "../../../firebase/storage";
import { timeoutPromise } from "../../../utils";
import { isObject } from "lodash";
import type { RcFile } from "antd/es/upload/interface";
import type { UploadFileParams } from "../../types/upload.types";

interface StorageError {
  code: string;
  message: string;
}

interface UploadFileWithStatus {
  uid: string;
  name: string;
  url?: string;
  thumbUrl?: string;
  status?: "uploading" | "done" | "error" | "success";
}

interface UploadFileResult {
  newFile: UploadFileWithStatus;
  status: boolean;
}

export const isRcFile = (data: any): data is RcFile =>
  isObject(data) && "uid" in data;

export const uploadFile = async ({
  filePath,
  fileName,
  storage,
  resize,
  isImage,
  withThumbImage,
  options: { file, onError, onProgress, onSuccess },
}: UploadFileParams): Promise<UploadFileResult> =>
  await new Promise((resolve, reject) => {
    if (!isRcFile(file)) {
      const error = new Error("El archivo no es válido");
      onError(error);
      return reject(error);
    }

    const fileExtension = file.name.split(".").pop() || "";
    const finalFileName =
      fileName || file.name.replace(`.${fileExtension}`, "");

    const fileConfig = {
      url: {
        path: filePath,
        fileName: `${finalFileName}.${fileExtension}`,
      },
      thumbUrl: {
        path: `${filePath}/thumbs`,
        fileName: `${finalFileName}_${resize}.webp`,
      },
    };

    const uploadTask = storage
      .ref(fileConfig.url.path)
      .child(fileConfig.url.fileName)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 90; // Reservamos 10% para el thumb
        onProgress(progress);
      },
      (error: any) => {
        onError(error);
        reject(error);
      },
      () => uploadComplete(mapUploadFile(file), fileConfig)
    );

    const uploadComplete = async (
      newFile: UploadFileWithStatus,
      config: typeof fileConfig
    ) => {
      try {
        const url = await storage
          .ref(config.url.path)
          .child(config.url.fileName)
          .getDownloadURL();
        newFile.url = url;

        if (isImage && withThumbImage) {
          try {
            const thumbRef = storage
              .ref(config.thumbUrl.path)
              .child(config.thumbUrl.fileName);
            newFile.thumbUrl = await keepTryingGetThumbURL(thumbRef);
          } catch (e) {
            console.warn(
              "Thumbnail no generado a tiempo, usando URL original como fallback."
            );
            newFile.thumbUrl = url;
          }
        }

        newFile.status = "success";
        newFile.name = config.url.fileName;
        onProgress(100);
        onSuccess("ok");
        resolve({ newFile, status: true });
      } catch (error) {
        onError(error);
        resolve({ newFile, status: false });
      }
    };
  });

const mapUploadFile = (file: RcFile): UploadFileWithStatus => ({
  uid: file.uid,
  name: file.name,
});

export const deleteFileAndFileThumbFromStorage = async (
  storage: any,
  filePath: string,
  fileName: string
): Promise<void> => {
  const extension = fileName.split(".").pop() || "";

  const pathImage = `${filePath}/${fileName}`;

  const pathThumbImages = imageResizes.map(
    (resizeImage) =>
      `${filePath}/thumbs/${fileName.replace(
        `.${extension}`,
        ""
      )}_${resizeImage}.${extension}`
  );

  const uris = [pathImage, ...pathThumbImages].map(
    (url) => `gs://${storage.ref().bucket}/${url}`
  );

  try {
    await Promise.all(uris.map((uri) => deleteFileFromStorage(storage, uri)));
  } catch (error) {
    console.error("Delete file and file thumb", error);
  }
};

export const deleteFileFromStorage = async (
  storage: any,
  url: string
): Promise<void | null> => {
  try {
    console.log("url", url);
    const ref = storage.refFromURL(url);

    return await storage.ref(ref.fullPath).delete();
  } catch (error) {
    if (isObject(error) && "code" in error) {
      const storageError = error as StorageError;
      if (storageError.code === "storage/object-not-found") return null;
    }

    throw error;
  }
};

export const keepTryingGetThumbURL = async (
  storageRef: any,
  triesCount: number = 10
): Promise<string> => {
  console.info("Getting thumb download URL...");

  if (triesCount < 0) return Promise.reject("out of tries");

  try {
    return await storageRef.getDownloadURL();
  } catch (error) {
    if (isObject(error) && "code" in error) {
      const storageError = error as StorageError;
      if (storageError.code === "storage/object-not-found") {
        await timeoutPromise(1000);
        return keepTryingGetThumbURL(storageRef, triesCount - 1);
      } else {
        return Promise.reject(storageError);
      }
    }
    return Promise.reject(error);
  }
};
