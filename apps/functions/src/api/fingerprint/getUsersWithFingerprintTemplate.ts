import { Request, Response } from "express";
import { isEmpty } from "lodash";

import { fetchUsers } from "../../_firebase/collections";
import { User } from "../../globalTypes.js";

export const getUsersWithFingerprintTemplate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await fetchUsers();

    const userWithFingerprintTemplate = users?.filter(
      (user: User) => !isEmpty(user?.fingerprintTemplate)
    );

    res.json({
      userWithFingerprintTemplate,
      message: "user_exists",
    });
  } catch (error) {
    console.error(error);
  }
};
