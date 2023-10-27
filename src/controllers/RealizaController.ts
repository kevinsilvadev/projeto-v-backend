import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class RealizaController {

  async listarCargos(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const realiza = await prisma.realiza.findMany();
      res.json(realiza); // Envia a resposta ao cliente
      console.log(realiza)
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }
}

export default RealizaController;
