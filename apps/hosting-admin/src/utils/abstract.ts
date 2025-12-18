import lodash from "lodash";
import { deviceTypes } from "../data-list";

const { capitalize, concat } = lodash;

export const userFullName = (user: any) => {
  if (!user) return null;

  return `${capitalize(user.firstName)} ${capitalize(
    user.paternalSurname
  )} ${capitalize(user.maternalSurname)}`;
};

export const getSearchDataToUser = (user, firstName) =>
  concat(
    [
      user.phoneNumber,
      user.dni,
      user.email.toLowerCase(),
      user.paternalSurname.toLowerCase(),
      user.maternalSurname.toLowerCase(),
    ],
    firstName
      .toLowerCase()
      .split(" ")
      .filter((name: string) => name.trim())
  );

export const getDevice = (deviceValue: string) =>
  deviceTypes.find((device) => device.value === deviceValue)?.label;
