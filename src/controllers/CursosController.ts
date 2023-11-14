import { PrismaClient } from '@prisma/client';
import { da } from 'date-fns/locale';
import { Request, Response } from 'express';
import { format } from 'date-fns';

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
    const dataAtual = new Date();
    const dataFormatada = format(dataAtual, "yyyy-MM-dd");
    const prisma = new PrismaClient();
    try {
      const {
        id,
        descricao,
        fk_Usuario_id,
        fk_Academia_id,
        titulo,
        capa,
        listaDeSlides,
      } = req.body;
  
      // Criando um array com os objetos de Slide
      const slides = listaDeSlides.map((slide: any) => ({
        slideType: slide.slideType,
        midia: slide.midia,
        question: slide.question,
        options: JSON.stringify(slide.options), // Convertendo a lista para uma string
        correctOption: JSON.stringify(slide.correctOption),
        points: slide.points,
      }));
  
      const criarCurso = await prisma.curso.create({
        data: {
          id: id,
          descricao: descricao,
          fk_Usuario_id: fk_Usuario_id,
          data_criacao: new Date(dataFormatada),
          fk_Academia_id: fk_Academia_id,
          titulo: titulo,
          capa: capa,
          listaDeSlides: {
            createMany: {
              data: slides,
            },
          },
        },
        include: {
          listaDeSlides: true,
        },
      });
  
      console.log(fk_Usuario_id)
      res.status(201).json(criarCurso);
    } catch (error) {
      console.error('Erro ao criar curso:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar o curso' });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default CursosController;