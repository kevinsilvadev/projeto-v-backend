import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();

import CursosController from '../controllers/CursosController';
const cursosController: CursosController = new CursosController()

router.get('/cursos', cursosController.listarCursos)
router.post('/cursos', cursosController.criarCursos)
router.delete('/cursos', cursosController.deletarCursos)
router.put('/cursos', cursosController.atualizarCursos)

  