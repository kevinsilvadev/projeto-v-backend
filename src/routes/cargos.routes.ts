import {Router} from 'express';
import CargoController from '../controllers/CargoController';

export const cargosRouter: Router = Router();
const cargoController: CargoController = new CargoController()

cargosRouter.get('', cargoController.listarCargos)