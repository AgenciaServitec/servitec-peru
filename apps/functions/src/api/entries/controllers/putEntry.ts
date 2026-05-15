import { Request, Response } from "express";

export const putEntry = async (req: Request, res: Response) => {
  const { submissionId } = req.params;
  const { status, attended } = req.body;

  try {
    res.json({ message: `Submission ${submissionId} actualizado` });
  } catch (e) {
    res.status(500).json({ error: "No se pudo actualizar" });
  }
};
