import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';


class UsuariosControllers {
  async listarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const usuarios = await prisma.usuario.findMany();
      res.json(usuarios); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao listar usuarios:', error);
      res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
  }

  async criarUsuario(req: Request, res: Response): Promise<void> {

  }

  async deletarUsuario(req: Request, res: Response): Promise<void> {

  }
  async atualizarUsuario(req: Request, res: Response): Promise<void> {

  }

  async findById(req: Request, res: Response) {

  }

  async loginUsuario(req: Request, res: Response) {
    
  }
}

export default UsuariosControllers;