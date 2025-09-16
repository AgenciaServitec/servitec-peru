import { Response, Request, NextFunction } from 'express';

type Params = { quotationId: string };

export const putQuotation = async (
  req: Request<Params, unknown, Quotation, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: quotation,
    params: { quotationId },
  } = req;

  console.log(quotationId, '「Update quotation」Initialize', {
    params: req.params,
    body: req.body,
  });

  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
