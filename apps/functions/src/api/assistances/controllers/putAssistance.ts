import { Response, Request, NextFunction } from 'express';

type Params = { assistanceId: string };

export const putAssistance = async (
  req: Request<Params, unknown, Assistance, unknown>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    body: assistance,
    params: { assistanceId },
  } = req;

  console.log(assistanceId, '「Update assistance」Initialize', {
    params: req.params,
    body: req.body,
  });

  try {
    res.json({ message: 'En desarrollo!!!' });
  } catch (e) {
    console.error(e);
  }
};
