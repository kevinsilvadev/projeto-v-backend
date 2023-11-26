import CursosController from '../controllers/CursosController'
import {Router} from 'express';

export const cursosRouter: Router = Router();
const cursosController: CursosController = new CursosController();

cursosRouter.get('', cursosController.listarCursos);
cursosRouter.post('/criar', cursosController.criarCurso);