import { Response, Request, NextFunction } from 'express';

export const postQuotation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { body: quotation } = req;

  console.log('「Add quotation」Initialize', quotation, {
    params: req.params,
    body: req.body,
  });

  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
