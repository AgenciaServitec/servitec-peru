import { Request, Response } from "express";
import lodash from "lodash";

import { fetchUsers } from "../../_firebase/collections/index.js";
import { User } from "../../globalTypes.js";

const { isEmpty } = lodash;

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
