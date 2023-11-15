import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Usuario from '../model/Usuario';
import{hash } from 'bcrypt';


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

  async deletarUsuario(req: Request, res: Response): Promise<void> {
    const prisma = new PrismaClient();
    try {
      const userId = parseInt(req.params.id);
      await prisma.usuario.delete({
        where: {
          id: userId, 
        },
      });
    } catch (error) {
      console.log('Erro ao deletar usuário', error)
    } finally {
      await prisma.$disconnect();
    }
  }

/*  async atualizarUsuario(req: Request, res: Response, userId:Number, newData:Usuario): Promise<void> {
    const prisma = new PrismaClient();
    const updatedUser = await prisma.usuario.update({
      where: {
        id: userId, // Substitua 'id' pelo campo exclusivo que você está usando
      },
      data: newData, // Os novos dados que você deseja atualizar
    });
    return updatedUser;
  }
*/

async registrar(req: Request, res: Response): Promise<void> {
  
  try {
    const prisma = new PrismaClient();

    const {
      dataNascimento,
      celular,
      senha,
      nome,
      colaborador,
      profissao,
      email,
      cep,
      bairro,
      estado,
      rua } = req.body;

    if (!email || !senha) {
      res.status(400);
      throw new Error('Email ou senha vazio.');
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email,
      }
    });

    if (usuario !== null) {
      
      res.status(400);
      throw new Error('Email já está sendo utilizado.');
    }
    
    await prisma.usuario.create({
      data: {
        nome: nome,
        colaborador: colaborador,
        profissao: profissao,
        cep: cep,
        bairro: bairro,
        estado: estado,
        rua: rua,
        celular: celular,
        data_nascimento: new Date(dataNascimento),
        cargoId: 1,
        senha: await hash(senha, 12),
        email: email,
      }})
  
    res.status(201).json({sucesso: 'Conta criada com sucesso!'});

    await prisma.$disconnect();

 } catch (error) {
    console.error('Erro ao criar conta', error);
    res.status(500).json({ error: 'Erro ao realizar criar conta' });
  }
}

async findById(req: Request, res: Response) {
  const prisma = new PrismaClient();
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.usuario.findUnique({
      where: {
        id: userId,
      },
    });
    res.status(200).json({user})
    await prisma.$disconnect();
  } catch (error) {
    throw new Error(`Erro ao encontrar o usuário: ${error}`);
  }
}
}

export default UsuariosControllers;