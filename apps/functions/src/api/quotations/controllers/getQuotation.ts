import { Response, Request, NextFunction } from 'express';
import { fetchQuotation } from '../../../_firebase/collections';

export const getQuotation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    params: { quotationId },
  } = req;

  console.log('「Get quotation data」Initialize', {
    params: req.params,
  });

  try {
    const quotation = await fetchQuotation(quotationId);

    res.json(quotation);
  } catch (e) {
    console.error(e);
  }
};
