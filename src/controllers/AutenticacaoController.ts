import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
const prisma = new PrismaClient();

class AutenticacaoController {



  async login(req: Request, res: Response): Promise<void> {
    try {

      const usuario = await prisma.usuario.findUnique({
        where: {
          email: req.body.email,
        }
      });

      if (!usuario) {
        res.status(403);
        throw new Error('Dados inválidos.');
      }

      const validPassword = await compare(req.body.senha, usuario['senha']);
      if (!validPassword) {
        res.status(403);
        throw new Error('Invalid login credentials.');
      }

      const token = sign({}, authConfig.jwt.secret, {
        subject: String(usuario.id),
        expiresIn: authConfig.jwt.expiresIn,
      });

      await prisma.authenticationToken.create({
        data: {
          token: token,
          expirado: false,
          data_criacao: new Date(),
          usuarioId: usuario.id,
        }
      })

      const cargo = await prisma.cargo.findUnique({
        where: {
          id: usuario.cargoId,
        }
      });

      const {
        senha,
        ...teste
      } = usuario;
      res.json({ token: token, usuario: teste,cargo: cargo }); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao realizar login', error);
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
}

export default AutenticacaoController;
