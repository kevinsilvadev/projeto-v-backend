import {Router} from 'express';
import { authRouter } from './autenticacao.routes';
import { usuariosRouter } from './usuarios.routes';
import { telaCursoRouter } from './telaCurso.routes';
import { cursosRouter } from './cursos.routes';
import { academiasRouter } from './academias.routes';
import { cargosRouter } from './cargos.routes';
import { realizaRouter } from './realiza.routes';
import { promoveRouter } from './promove.routes';

export const router: Router = Router();

//router.use('/auth', authRouter);
router.use('/usuarios', usuariosRouter);
router.use('/telaCurso', telaCursoRouter);
router.use('/cursos', cursosRouter);
router.use('/academias', academiasRouter);
router.use('/cargos', cargosRouter);
router.use('/realiza', realizaRouter);
router.use('/promove', promoveRouter);

