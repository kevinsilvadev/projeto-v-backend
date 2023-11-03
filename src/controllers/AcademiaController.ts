import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Academia from '../model/Academia';

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

  async criarAcademia(req: Request, res: Response): Promise<void> {
    const prisma = new PrismaClient();
    try {
      const { descricao, nome, imagem, usuarioId } = req.body;

      console.log(usuarioId);

      const criarAcademia = await prisma.academia.create({
        data: {
          descricao: descricao,
          nome: nome,
          imagem: imagem,
          usuarioId: usuarioId,
          data_criacao: new Date(),
        },
      });
      res.status(201).json(criarAcademia);
    } catch (error) {
      console.error('Erro ao criar academia:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar a academia' });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default AcademiaController;
