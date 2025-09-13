import { Response, Request, NextFunction } from 'express';

export const getUsers = async (res: Response, req: Request, next: NextFunction): Promise<void> => {
  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
