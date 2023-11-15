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
        id,
        descricao,
        usuarioId,
        academiaId,
        titulo,
        imagem,
        telasCursoJson,
      } = req.body;
  
      const telasCurso = telasCursoJson.map((tela: any) => (
          TelaCurso.fromMap(
            tela
          )
       ));
  
      const criarCurso = await prisma.curso.create({
        data: {
          id: id,
          descricao: descricao,
          usuarioId: usuarioId,
          data_criacao: new Date(),
          academiaId: academiaId,
          titulo: titulo,
          imagem: imagem,
          telas:{
            create: telasCurso
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