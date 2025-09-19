import { Response, Request, NextFunction } from 'express';
import { fetchUser } from '../../../_firebase/collections';

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    params: { userId },
  } = req;

  console.log(userId, '「Get user data」Initialize', {
    params: req.params,
  });

  try {
    const user = await fetchUser(userId);

    res.json(user);
  } catch (e) {
    console.error(e);
  }
};
