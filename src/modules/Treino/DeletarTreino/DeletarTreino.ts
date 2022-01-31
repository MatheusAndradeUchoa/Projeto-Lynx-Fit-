import { response } from "express";
import { prisma } from "../../../dataBase/prismaCliente";

interface IDeleteTreino {
    id: string;
}

export class DeleteTreino {
    async execute({ id }: IDeleteTreino) {

        if (!id) {
            return response
            .status(500)
            .json({ status: "erro", message: "Usuario não existe" });
        }
        const treinoDeletado =  await prisma.treino.delete({ where: { id } });

        return treinoDeletado;
    }
}