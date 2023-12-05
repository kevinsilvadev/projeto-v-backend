import { Request, Response } from "express";
import sql, { pool } from "mssql";
import { config } from "../config/db";
import Curso from "../model/Curso";
import TelaCurso from "../model/TelaCurso";
import salvarImagem from "../azure/salvarImagem";
import { string } from "zod";

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

  async listarSlidePorId(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const cursoId = req.params.id;

      const result = await pool
        .request()
        .query(
          `SELECT * FROM TelaCurso WHERE cursoId = ${cursoId}`
        );

      const recordset = result.recordsets as TelaCurso[][];

      // Verifica se há dados no recordset
      const telaCurso = recordset.length > 0 ? recordset[0] : [];

      console.log(telaCurso)

      if (telaCurso.length > 0) {
        res.json(telaCurso);
      } else {
        res.status(404).json({ message: "Nenhuma telaCurso encontrada" });
      }

    } catch (error) {
      console.error("Erro ao listar telaCursos:", error);
      res.status(500).json({ error: "Erro ao listar telaCursos" });
    }
  }

  async criarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoId = req.body.cursoId;
      const slidesData = JSON.parse(req.body.json);
      const pool = await sql.connect(config);

      const insertPromises = slidesData.map(async (element: any) => {
        let imgUrl;
        if (element.midia) {
          imgUrl = await salvarImagem(
            `${element.posicao}-base64`,
            element.midia
          );
        }

        let index = 1;
        let stringAlternativa = '';
        let stringValor = '';

        element.alternativas.map((alternativa: any) =>{
          if(index == 1){
            stringAlternativa = `alternativa${index}`
            stringValor = `'${alternativa}'`
          } else {
            stringAlternativa = `${stringAlternativa}, alternativa${index}`
            stringValor = `${stringValor},'${alternativa}'`
          }
          index ++;
        })

        const resultTipo = await pool.request().query(`SELECT id FROM TipoTelaCurso WHERE nome = '${element.tipo}' `)

        const result = await pool.request().query(`
          INSERT INTO TelaCurso (
            texto,
            midia,
            correta,
            cursoId,
            posicao,
            ${stringAlternativa},
            feedbackPositivo,
            feedbackNegativo,
            tipoId
          ) VALUES (
            '${element.texto || ""}',
            '${imgUrl || ""}',
            '${element.resposta || ""}',
            ${cursoId},
            ${element.posicao},
            ${stringValor},
            '${element.feedbacks[0] || ""}',
            '${element.feedbacks[1] || ""}',
            ${resultTipo.recordset[0].id}
          )
        `);
        return result;
      });

      const results = await Promise.all(insertPromises);

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
