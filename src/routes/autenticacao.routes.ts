import { Router } from 'express';
import AutenticacaoController from '../controllers/AutenticacaoController';

export const authRouter: Router = Router();
const autenticacao:AutenticacaoController = new AutenticacaoController();

//Autenticacao
authRouter.post('', autenticacao.login);