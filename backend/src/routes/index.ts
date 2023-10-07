import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();


import usuarioController from '../controllers/UsuariosController';
const usuario: usuarioController = new usuarioController();

import CursosController from '../controllers/CursosController';
const cursosController: CursosController = new CursosController();

//Rota dos usurario
router.get('/usuario', usuario.listarUsuario)
router.get('/usuario/:id', usuario.findById)
router.post('/usuario', usuario.criarUsuario)

//Rota de login
router.post('/login', usuario.loginUsuario)


//Rota dos cursos
router.get('/cursos', cursosController.listarCursos)
router.post('/cursos', cursosController.criarCursos)
