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
  async criarCurso(req: Request, res: Response): Promise<void> {
    const prisma = new PrismaClient();
    try {
      const cursoData = req.body; 

      const criarcurso = await prisma.curso.create({
        data: cursoData,
      });
      res.status(201).json(criarcurso);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar a curso' });
    } finally {
      await prisma.$disconnect(); 
    }
  }


  async updateCursosPendentes(req: Request, res: Response): Promise<void> {
    try {
      const cursoData = req.body; 
      const prisma = new PrismaClient();
      const updateCursosPendentes = await prisma.curso.update({
        where: {
          id: cursoData.id
        },
        data: {
          validado: cursoData.data.validado
        }
      })
      console.log(cursoData.validado)
      console.log(cursoData.data)
      res.json(updateCursosPendentes);
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    }
  }
}



export default CursosController;
