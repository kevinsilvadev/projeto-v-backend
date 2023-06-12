import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();

import AlunosController from '../controllers/AlunosController';
const alunosController: AlunosController = new AlunosController()

router.get('/alunos', alunosController.listarAlunos)
router.post('/alunos', alunosController.criarAlunos)
router.delete('/alunos', alunosController.deletarAlunos)
router.put('/alunos', alunosController.atualizarAlunos)

//login
router.post('/login', alunosController.loginAluno)


// NAO TA FUNCIONANDO