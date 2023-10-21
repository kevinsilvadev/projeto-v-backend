import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class AcademiaController {

  async listarAcademia(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const academia = await prisma.academia.findMany();
      res.json(academia); // Envia a resposta ao cliente
      console.log(academia)
    } catch (error) {
      console.error('Erro ao listar Academia:', error);
      res.status(500).json({ error: 'Erro ao listar Academia' });
    }
  }
}

export default AcademiaController;
