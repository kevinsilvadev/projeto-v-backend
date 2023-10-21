import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class CargoController {

  async listarCargos(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const cargos = await prisma.cargo.findMany();
      res.json(cargos); // Envia a resposta ao cliente
      console.log(cargos)
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }
}

export default CargoController;
