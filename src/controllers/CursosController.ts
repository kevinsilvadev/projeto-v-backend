import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class CursosController {

  async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const cursos = await prisma.curso.findMany();
      res.json(cursos); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }


}

export default CursosController;
