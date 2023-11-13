import {Router} from 'express';
import UsuariosControllers from '../controllers/UsuariosController'

export const usuariosRouter: Router = Router();
const usuarioController: UsuariosControllers = new UsuariosControllers()

usuariosRouter.get('/findById', usuarioController.findById)
usuariosRouter.get('', usuarioController.listarUsuario);
usuariosRouter.post('/registrar', usuarioController.registrar);