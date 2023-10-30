import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Usuario from '../model/Usuario';


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
    const prisma = new PrismaClient();
    try {
      const usuarioData = req.body; 

      const criarusuario = await prisma.usuario.create({
        data: usuarioData,
      });
      res.status(201).json(criarusuario);
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar a usuario' });
    } finally {
      await prisma.$disconnect(); 
    }
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