import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();

import UsuariosControllers from '../controllers/UsuariosController';
const UsuarioController: UsuariosControllers = new UsuariosControllers()

router.get('/Usuario', UsuarioController.listarUsuario)
router.post('/Usuario', UsuarioController.criarUsuario)
router.delete('/Usuario', UsuarioController.deletarUsuario)
router.put('/Usuario', UsuarioController.atualizarUsuario)

//Rota privada
router.get('/Usuario/:id', UsuarioController.findById)

//login
router.post('/login', UsuarioController.loginUsuario)
