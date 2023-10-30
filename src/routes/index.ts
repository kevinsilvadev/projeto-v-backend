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

import AutenticacaoController from '../controllers/AutenticacaoController';
const autenticacao:AutenticacaoController = new AutenticacaoController();

//Academia
router.get('/academias', academiaController.listarAcademia);
router.post('/academia/registrar', academiaController.criarAcademia);

//Cursos
router.get('/cursos', cursosController.listarCursos);

//Usuarios
router.get('/usuarios', usuarioController.listarUsuario);
router.post('/usuario/registrar', usuarioController.criarUsuario)

//Cargos
router.get('/cargos', cargoController.listarCargos)

//Realiza
router.get('/realiza', realizaController.listarCargos)

//Promove
router.get('/promove', promoveController.listarPromover)

//TelaCurso
router.get('/telacursos', telaCurso.listarTelaCurso)

//Autenticacao
router.get('/auth/login', autenticacao.login)
router.get('/auth/registrar', autenticacao.registrar)