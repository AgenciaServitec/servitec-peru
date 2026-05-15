import { Request, Response } from "express";

export const getEntry = async (req: Request, res: Response) => {
  try {
    res.json({ data: [], total: 0 });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener entradas" });
  }
};
