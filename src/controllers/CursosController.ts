import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import TelaCurso from '../model/TelaCurso';

class CursosController {

  async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const prisma = new PrismaClient();
      const cursos = await prisma.curso.findMany();
      res.json(cursos);
      await prisma.$disconnect();
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }

  async criarCurso(req: Request, res: Response): Promise<void> {    
    try {

      const prisma = new PrismaClient();

      const {
        descricao,
        usuarioId,
        academiaId,
        titulo,
        imagem,
        telasCursoJson,
      } = req.body;

      const telas = JSON.parse(telasCursoJson)

      const academia = await prisma.academia.findFirst(
        {
          where: {
            nome: academiaId
          }
        }
      );

      if(academia === null){
        return;
      }
  
      const criarCurso = await prisma.curso.create({
        data: {
          descricao: descricao,
          usuarioId: usuarioId,
          data_criacao: new Date(),
          academiaId: academia?.id,
          titulo: titulo,
          imagem: 'imagem',                                                         
          validado: false,                                              
          telas: {
            create: telas           
          }
        }
      });
  
      res.status(201).json(criarCurso);

      await prisma.$disconnect();
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar o curso' });
    }
  }
}

export default CursosController;