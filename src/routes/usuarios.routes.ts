import {Router} from 'express';
import UsuariosControllers from '../controllers/UsuariosController'

export const usuariosRouter: Router = Router();
const usuarioController: UsuariosControllers = new UsuariosControllers()

usuariosRouter.get('/:id', usuarioController.findById)
usuariosRouter.get('', usuarioController.listarUsuario);