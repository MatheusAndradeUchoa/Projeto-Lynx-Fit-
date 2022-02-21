import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface iPayload {
  sub: string;
}

export async function AutenticacaoUsuario(
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
    const { sub } = verify(token, "chavesecreta") as iPayload;
    req.id_usuario = sub;
    return next();
  } catch (err) {
    return res.status(401).json({ mesage: "Token invalido" });
  }
}