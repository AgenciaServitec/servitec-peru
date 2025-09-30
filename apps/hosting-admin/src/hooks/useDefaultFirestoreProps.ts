import { assign } from 'lodash';
import { now } from '../firebase/utils';

// interface DocumentCreate {
//   createAt: firebase.firestore.Timestamp;
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
//   isDeleted?: false;
// }
//
// interface DocumentUpdate {
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
// }
//
// interface DocumentDelete {
//   updateAt: firebase.firestore.Timestamp;
//   updateBy: string;
//   isDeleted?: true;
// }
//
// interface Return {
//   assignCreateProps: <U>(document: U) => U & DocumentCreate;
//   assignDeleteProps: <U>(document: U) => U & DocumentDelete;
//   assignUpdateProps: <U>(document: U) => U & DocumentUpdate;
// }

export const useDefaultFirestoreProps = (isSoftDelete = true) => {
  /* const navigate = useNavigate(); */
  // const { authUser } = useAuthentication();

  /* if (!authUser) {
      console.error("Missing authUser");
      return navigate("/");
  } */

  const assignCreateProps = <T extends object>(
    document: T
  ): T & { createAt: Date; updateAt: Date; isDeleted?: false } => {
    const CREATE = {
      createAt: now(),
      updateAt: now(),
      // ...(authUser?.email && {
      //   updateBy: `${authUser.firstName} ${authUser.paternalSurname} ${authUser.maternalSurname}|${authUser.cip}|${authUser.dni}`,
      // }),
      // ...(authUser?.email && { createBy: authUser.email }),
    };

    if (isSoftDelete) {
      (CREATE as any).isDeleted = false;
    }

    // @ts-ignore
    return assign({}, document, CREATE);
  };

  const assignUpdateProps = <T extends object>(document: T): T & { updateAt: Date } => {
    const UPDATE = {
      updateAt: now(),
      // ...(authUser?.email && {
      //   updateBy: `${authUser.firstName} ${authUser.paternalSurname} ${authUser.maternalSurname}|${authUser.cip}|${authUser.dni}`,
      // }),
    };

    // @ts-ignore
    return assign({}, document, UPDATE);
  };

  const assignDeleteProps = <T extends object>(
    document: T
  ): T & { updateAt: Date; isDeleted?: true } => {
    const DELETE = {
      updateAt: now(),
      // ...(authUser?.email && {
      //   updateBy: `${authUser.firstName} ${authUser.paternalSurname} ${authUser.maternalSurname}|${authUser.cip}|${authUser.dni}`,
      // }),
    };

    if (isSoftDelete) {
      (DELETE as any).isDeleted = true;
    }

    // @ts-ignore
    return assign({}, document, DELETE);
  };

  return {
    assignCreateProps,
    assignUpdateProps,
    assignDeleteProps,
  };
};
