import { Router } from "express";
import TelaCursoControllers from "../controllers/TelaCurso.controller";
const telaCurso: TelaCursoControllers = new TelaCursoControllers();
export const telaCursoRouter: Router = Router();

telaCursoRouter.get("", telaCurso.listarTelaCurso);
telaCursoRouter.post("/criar", telaCurso.criarTelaCurso);
telaCursoRouter.get("/listarSlidePorId/:id", telaCurso.listarSlidePorId);
