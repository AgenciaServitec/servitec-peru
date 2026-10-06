import React, { useEffect, useState } from "react";
import { message as AntdMessage, Upload as AntdUpload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import styled, { css } from "styled-components";
import { isEmpty } from "lodash";

import { buckets } from "../firebase/storage";
import {
  deleteFileAndFileThumbFromStorage,
  uploadFile,
} from "./utils/upload/functions";
import {
  PreviewFile,
  UploadBody,
  UploadDraggerBody,
} from "./utils/upload/components";
import type {
  BucketType,
  ImageResize,
  UploadedFile,
} from "./types/upload.types";
import { ComponentContainer, useModalConfirm, useNotification } from "./ui";

interface UploadProps {
  accept?: string;
  bucket?: BucketType;
  buttonText?: string;
  dragger?: boolean;
  hidden?: boolean;
  name: string;
  error?: boolean;
  helperText?: string;
  filePath: string;
  fileName?: string;
  isImage?: boolean;
  withThumbImage?: boolean;
  label?: string;
  required?: boolean;
  resize?: ImageResize;
  additionalFields?: Record<string, any> | null;
  value?: UploadedFile;
  onUploading?: (uploading: boolean) => void;
  onChange: (file?: UploadedFile) => void;
}

interface UploadFileWithStatus extends UploadFile {
  status?: "uploading" | "done" | "error" | "success";
}

interface CustomRequestOptions {
  file: RcFile;
  onError?: (error: any) => void;
  onProgress?: (event: { percent: number }) => void;
  onSuccess?: (message: string, xhr: XMLHttpRequest) => void;
}

export const Upload: React.FC<UploadProps> = ({
  accept,
  bucket = "default",
  buttonText = "Subir archivo",
  dragger = true,
  hidden,
  name,
  error = false,
  helperText,
  filePath,
  fileName,
  isImage = true,
  withThumbImage = true,
  label,
  required = false,
  resize = "1480x2508",
  additionalFields = null,
  value,
  onUploading,
  onChange,
}) => {
  const { notification } = useNotification();
  const { modalConfirm } = useModalConfirm();

  const storage = buckets[bucket];
  const [files, setFiles] = useState<UploadFileWithStatus[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<UploadFileWithStatus | null>(
    null
  );

  useEffect(() => {
    if (value?.url) {
      const isAlreadyInState = files.some((f) => f.url === value.url);
      if (!isAlreadyInState) {
        setFiles([{ ...value, status: "done" } as any]);
      }
    } else if (!value && files.length > 0) {
      setFiles([]);
    }
  }, [value?.uid, value?.url]);

  useEffect(() => {
    onUploading?.(uploading);
  }, [uploading]);

  const customRequest = async (options: CustomRequestOptions) => {
    try {
      setUploading(true);

      const { newFile, status } = await uploadFile({
        filePath,
        fileName,
        resize,
        storage,
        isImage,
        withThumbImage,
        options: {
          file: options.file,
          onError: (err) => options.onError?.(err),
          onProgress: (p) => options.onProgress?.({ percent: p } as any),
          onSuccess: (res) => options.onSuccess?.(res, new XMLHttpRequest()),
        },
      });

      if (status) {
        const finalFile: UploadedFile = {
          ...additionalFields,
          uid: newFile.uid,
          name: newFile.name,
          url: newFile.url!,
          thumbUrl: newFile.thumbUrl,
        };

        setFiles([{ ...newFile, status: "done" } as any]);
        onChange(finalFile);
      } else {
        uploadErrorMessage();
      }
    } catch (e) {
      console.error("Upload Error:", e);
      uploadErrorMessage();
    } finally {
      setUploading(false);
    }
  };

  const uploadErrorMessage = (): void =>
    notification({
      type: "error",
      title: "Error al cargar el archivo",
      description: "¡Por favor, intente de nuevo!",
    });

  const onRemove = async (file: UploadFile) => {
    return new Promise<boolean>((resolve) => {
      modalConfirm({
        content: "¿Está seguro de eliminar este archivo permanentemente?",
        onOk: async () => {
          try {
            await deleteFileAndFileThumbFromStorage(
              storage,
              filePath,
              file.name
            );
            setFiles([]);
            onChange(undefined);
            resolve(true);
          } catch (e) {
            notification({ type: "error", title: "Error al eliminar" });
            resolve(false);
          }
        },
        onCancel: () => resolve(false),
      });
    });
  };

  const beforeUpload = (): boolean | typeof AntdUpload.LIST_IGNORE => {
    if (isEmpty(files)) return true;
    AntdMessage.error(`¡Elimine el archivo actual antes de subir uno nuevo!`);
    return AntdUpload.LIST_IGNORE;
  };

  return (
    <>
      <ComponentContainer.filled
        animation={false}
        required={required}
        hidden={hidden}
        error={error}
        helperText={helperText}
        label={label}
      >
        <WrapperComponents>
          {dragger ? (
            <AntdUpload.Dragger
              name={name}
              fileList={files}
              listType="picture"
              accept={accept}
              customRequest={customRequest as any}
              onRemove={onRemove}
              onPreview={(file) => setCurrentFile(file)}
              onChange={({ fileList }) => setFiles(fileList)}
              beforeUpload={beforeUpload}
            >
              <UploadDraggerBody
                hint="Formatos permitidos según configuración"
                text="Haga clic o arrastre un archivo a esta área"
              />
            </AntdUpload.Dragger>
          ) : (
            <AntdUpload
              name={name}
              fileList={files}
              listType="picture"
              accept={accept}
              customRequest={customRequest as any}
              onRemove={onRemove}
              onPreview={(file) => setCurrentFile(file)}
              onChange={({ fileList }) => setFiles(fileList)}
              beforeUpload={beforeUpload}
            >
              <UploadBody visible={isEmpty(files)} buttonText={buttonText} />
            </AntdUpload>
          )}
        </WrapperComponents>
      </ComponentContainer.filled>

      {currentFile?.url && (
        <PreviewFile
          url={currentFile.url}
          thumbUrl={currentFile?.thumbUrl}
          isImage={isImage}
          onCancel={() => setCurrentFile(null)}
          visible={!!currentFile}
        />
      )}
    </>
  );
};

/* --- ESTILOS INYECTADOS DINÁMICAMENTE SIN !IMPORTANT --- */

const WrapperComponents = styled.div`
  ${({ theme }) => css`
    margin: 4px 0;

    .ant-upload-wrapper .ant-upload-drag {
      background: ${theme.colors.bgTertiary};
      border: 1px dashed ${theme.colors.border};
      border-radius: ${theme.border_radius.lg};
      transition: all ${theme.transitions.normal};

      &:hover {
        border-color: ${theme.colors.primary};
        background: ${theme.colors.bgHover};
      }
    }

    .ant-upload-list-item {
      background: ${theme.colors.bgTertiary};
      border: 1px solid ${theme.colors.border};
      border-radius: ${theme.border_radius.md};
      padding: 8px;
      margin-top: 8px;
      transition: all ${theme.transitions.fast};

      &:hover {
        background: ${theme.colors.bgHover};
      }

      .ant-upload-list-item-name {
        color: ${theme.colors.fontPrimary};
        font-weight: ${theme.font_weight.medium};
      }

      .ant-upload-list-item-action {
        .anticon-delete {
          color: ${theme.colors.error};
          font-size: ${theme.font_sizes.md};
          transition: color ${theme.transitions.fast};

          &:hover {
            color: #ff7875;
          }
        }
      }
    }
  `}
`;