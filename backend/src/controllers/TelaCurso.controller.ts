import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class TelaCursoControllers {
  async listarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const telaCursos = await prisma.telaCurso.findMany();
      res.json(telaCursos); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao listar telaCursos:', error);
      res.status(500).json({ error: 'Erro ao listar telaCursos' });
    }
  }

  async criarTelaCurso(req: Request, res: Response): Promise<void> {

  }

  async deletarTelaCurso(req: Request, res: Response): Promise<void> {

  }
  async atualizarTelaCurso(req: Request, res: Response): Promise<void> {

  }

  async findById(req: Request, res: Response) {

  }

  async loginTelaCurso(req: Request, res: Response) {
    
  }
}

export default TelaCursoControllers;