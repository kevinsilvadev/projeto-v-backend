import {Router} from 'express';
import UsuariosControllers from '../controllers/UsuariosController'

export const usuariosRouter: Router = Router();
const usuarioController: UsuariosControllers = new UsuariosControllers()

usuariosRouter.get('/findById/:id', usuarioController.findById)
usuariosRouter.get('', usuarioController.listarUsuario);
usuariosRouter.post('/registrar', usuarioController.registrar);
usuariosRouter.delete('/deletar/:id', usuarioController.deletarUsuario)
usuariosRouter.put('/atualizar/:id', usuarioController.atualizarUsuario);
usuariosRouter.put('/promover/', usuarioController.promoverUsuario);