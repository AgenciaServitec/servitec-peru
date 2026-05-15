import { Response, Request, NextFunction } from "express";

export const getEntries = async (req: Request, res: Response) => {
  try {
    res.json({ data: [], total: 0 });
  } catch (e) {
    res.status(500).json({ error: "Error al obtener entradas" });
  }
};
