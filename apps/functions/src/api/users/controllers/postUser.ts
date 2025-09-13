import { Response, Request, NextFunction } from 'express';

export const postUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { body: user } = req;

  console.log('「Add user」Initialize', user, {
    params: req.params,
    body: req.body,
  });

  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
