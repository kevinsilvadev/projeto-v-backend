import { Request, Response } from "express";
import sql, { pool } from "mssql";
import { config } from "../config/db";
import Curso from "../model/Curso";
import TelaCurso from "../model/TelaCurso";
import salvarImagem from "../azure/salvarImagem";

class TelaCursoControllers {
  async listarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);

      const result = await pool.request().query("SELECT * FROM TelaCurso");

      res.json(result); // Envia a resposta ao cliente
    } catch (error) {
      console.error("Erro ao listar telaCursos:", error);
      res.status(500).json({ error: "Erro ao listar telaCursos" });
    } finally {
      await pool.close();
    }
  }

  async criarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = req.body.cursoId;
      const slidesData = JSON.parse(req.body.json);
      const pool = await sql.connect(config);

      const insertPromises = slidesData.map(async (element: TelaCurso) => {
        console.log("element: ", element);
        let imgUrl;
        if (element.midia){
          imgUrl = await salvarImagem(
            `${element.posicao}-base64`,
            element.midia
          );
        }

        const result = await pool.request().query(`
          INSERT INTO TelaCurso (
            texto,
            midia,
            resposta,
            fk_Curso_id,
            posicao,
            alternativas,
            feedbacks,
            tipo
          ) VALUES (
            '${element.texto || ""}',
            '${imgUrl || ""}',
            '${element.resposta || ""}',
            ${cursoId},
            ${element.posicao},
            '${element.alternativas || ""}',
            '${element.feedbacks || ""}',
            '${element.tipo}'
          )
        `);
        return result;
      });

      // Aguarda todas as operações de inserção serem concluídas
      const results = await Promise.all(insertPromises);

      // Pode realizar alguma lógica com os resultados, se necessário

      res.json({ success: true });
    } catch (error) {
      console.error("Erro ao listar telaCursos:", error);
      res.status(500).json({ error: "Erro ao listar telaCursos" });
    } 
  }

  async deletarTelaCurso(req: Request, res: Response): Promise<void> {}
  async atualizarTelaCurso(req: Request, res: Response): Promise<void> {}

  async findById(req: Request, res: Response) {}

  async loginTelaCurso(req: Request, res: Response) {}
}

export default TelaCursoControllers;
