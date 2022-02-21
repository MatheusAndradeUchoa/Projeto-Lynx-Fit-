import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface iPayload {
  sub: string;
}

export async function AutenticacaoCliente(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ mesage: "Token não existe" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "chavesecretacliente") as iPayload;
    req.id_client = sub;
    return next();
  } catch (err) {
    return res.status(401).json({ mesage: "Token invalido" });
  }
}