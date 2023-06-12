import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();


import AlunosController from '../controllers/AlunosController';
const alunosController: AlunosController = new AlunosController();

import CursosController from '../controllers/CursosController';
const cursosController: CursosController = new CursosController();


router.get('/alunos', alunosController.listarAlunos)

router.get('/cursos', cursosController.listarCursos)

router.post('/alunos', alunosController.criarAlunos)
router.post('/login', alunosController.loginAluno)
