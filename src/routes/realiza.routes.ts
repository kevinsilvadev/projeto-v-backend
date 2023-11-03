import {Router} from 'express';
import RealizaController from '../controllers/RealizaController';

export const realizaRouter: Router = Router();
const realizaController: RealizaController = new RealizaController()

realizaRouter.get('', realizaController.listarCargos)