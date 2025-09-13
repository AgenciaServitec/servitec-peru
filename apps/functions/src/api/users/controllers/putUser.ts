import { Response, Request, NextFunction } from 'express';

type Params = { userId: string };

export const putUser = async (
  req: Request<Params, unknown, User, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: user,
    params: { userId },
  } = req;

  console.log(userId, '「Update user」Initialize', {
    params: req.params,
    body: req.body,
  });

  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
