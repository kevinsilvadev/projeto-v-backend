import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();

import AlunosController from '../controllers/AlunosController';
const alunosController: AlunosController = new AlunosController()

router.get('/alunos', alunosController.listarAlunos)