import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();


import AlunosController from '../controllers/AlunosController';
const alunosController: AlunosController = new AlunosController();

import CursosController from '../controllers/CursosController';
const cursosController: CursosController = new CursosController();

//Rota dos alunos
router.get('/alunos', alunosController.listarAlunos)
router.get('/alunos/:id', alunosController.acharPeloId)
router.post('/alunos', alunosController.criarAlunos)

//Rota de login
router.post('/login', alunosController.loginAluno)


//Rota dos cursos
router.get('/cursos', cursosController.listarCursos)
router.post('/cursos', cursosController.criarCursos)
