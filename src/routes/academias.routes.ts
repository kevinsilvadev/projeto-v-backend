import {Router} from 'express';
import AcademiaController from '../controllers/AcademiaController'; 
import isAutenticado from '../middlewares/isAutenticado';

export const academiasRouter: Router = Router();
const academiaController: AcademiaController = new AcademiaController();

academiasRouter.use(isAutenticado)
academiasRouter.get('', academiaController.listarAcademia);
academiasRouter.post('', academiaController.criarAcademia);