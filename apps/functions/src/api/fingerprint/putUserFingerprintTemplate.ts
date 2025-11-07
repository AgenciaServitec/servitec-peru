import { Request, Response } from "express";
import { defaultFirestoreProps } from "../../utils/defaultFirestoreProps.js";
import { User } from "../../globalTypes.js";
import { logger } from "firebase-functions";
import { fetchCollection } from "../../_firebase/firestore.js";
import { firestore } from "../../_firebase/index.js";

interface Params {
  dni: string;
}

const { assignUpdateProps } = defaultFirestoreProps();

export const putUserFingerprintTemplate = async (
  req: Request<Params, unknown, User, unknown>,
  res: Response
): Promise<void> => {
  const { dni } = req.params;
  const { fingerprintTemplate } = req.body;

  logger.debug("putUserFingerprintTemplate:", fingerprintTemplate);
  try {
    const user = await fetchUserByDni(dni);

    const userWithFingerprintTemplate = { ...user[0], fingerprintTemplate };

    await updateUser(assignUpdateProps(userWithFingerprintTemplate));
    res.json();
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (user: User): Promise<void> => {
  await firestore
    .collection("users")
    .doc(user.id)
    .update({ ...user });
};

const fetchUserByDni = async (dni: string | null): Promise<User[]> =>
  await fetchCollection<User>(
    firestore
      .collection("users")
      .where("isDeleted", "==", false)
      .where("document.number", "==", dni)
      .limit(1)
  );
