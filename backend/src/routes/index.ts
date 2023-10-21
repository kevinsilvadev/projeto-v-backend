/*import { Request, Response, Router } from 'express';
import sql from 'mssql';
export const router: Router = Router();


import usuarioController from '../controllers/UsuariosController';
const usuario: usuarioController = new usuarioController();


//Rota dos usurario
router.get('/usuario', usuario.listarUsuario)
router.get('/usuario/:id', usuario.findById)
router.post('/usuario', usuario.criarUsuario)


  

//Rota de login
router.post('/login', usuario.loginUsuario)


//Rota dos cursos
router.get('/cursos', cursosController.listarCursos)
router.post('/cursos', cursosController.criarCursos)
*/

import { Request, Response, Router } from 'express';
export const router: Router = Router();


import CursosController from '../controllers/CursosController'
const cursosController: CursosController = new CursosController();

import UsuariosControllers from '../controllers/UsuariosController'
const usuarioController: UsuariosControllers = new UsuariosControllers()

import AcademiaController from '../controllers/AcademiaController'; 
const academiaController: AcademiaController = new AcademiaController()

import CargoController from '../controllers/CargoController';
const cargoController: CargoController = new CargoController()

import RealizaController from '../controllers/RealizaController';
const realizaController: RealizaController = new RealizaController()

import PromoveController from '../controllers/PromoveController';
const promoveController:PromoveController = new PromoveController()

import TelaCursoControllers from '../controllers/TelaCurso.controller';
const telaCurso:TelaCursoControllers = new TelaCursoControllers()

//Academia
router.get('/academias', academiaController.listarAcademia);

//Cursos
router.get('/cursos', cursosController.listarCursos);

//Usuarios
router.get('/usuarios', usuarioController.listarUsuario);

//Cargos
router.get('/cargos', cargoController.listarCargos)

//Realiza
router.get('/realiza', realizaController.listarCargos)

//Promove
router.get('/promove', promoveController.listarPromover)

//TelaCurso
router.get('/telacursos', telaCurso.listarTelaCurso)