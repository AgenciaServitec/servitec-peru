import { Request, Response } from "express";

export const getLead = async (req: Request, res: Response) => {
  try {
    res.json({ data: [], total: 0 });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener entradas" });
  }
};
