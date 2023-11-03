import {Router} from 'express';
import PromoveController from '../controllers/PromoveController';

export const promoveRouter: Router = Router();
const promoveController:PromoveController = new PromoveController();

promoveRouter.get('', promoveController.listarPromover)