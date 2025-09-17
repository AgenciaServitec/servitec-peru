import { Response, Request, NextFunction } from 'express';

export const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body: user } = req;

  console.log('「Add user」Initialize', user, {
    params: req.params,
    body: req.body,
  });

  try {
    await addUser({ ...user, id: getUserId() });
    await addUserAuth({ ...user, id: getUserId() });
  } catch (e) {
    console.error(e);
  }
};

const addUser = async (user: User): Promise<void> => {
  const { assignCreateProps } = defaultFirestoreProps();

  await firestore
    .collection('users')
    .doc(user.id)
    .set(
      assignCreateProps({
        ...user,
      })
    );
};

const addUserAuth = async (user: User): Promise<void> => {
  await auth.createUser({
    uid: user.id,
    email: user?.email || undefined,
    phoneNumber: user?.phone ? `${user.phone?.prefix || '+51'}${user.phone.number}` : undefined,
  });
};
