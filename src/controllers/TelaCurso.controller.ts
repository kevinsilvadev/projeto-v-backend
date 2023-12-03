import { Request, Response } from 'express';
import sql, { pool } from 'mssql';
import {config} from '../config/db';



class TelaCursoControllers {
  async listarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);

      const result = await pool.request().query('SELECT * FROM TelaCurso')
      
      res.json(result); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao listar telaCursos:', error);
      res.status(500).json({ error: 'Erro ao listar telaCursos' });
    } finally {
      await pool.close();
    }
  }

  async criarTelaCurso(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);

      const cursoData = req.body;

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
          '${cursoData.texto}',
          '${cursoData.midia}',
          '${cursoData.resposta}',
          ${cursoData.cursoID}
        )
      `);
      
      res.json(result); // Envia a resposta ao cliente
    } catch (error) {
      console.error('Erro ao listar telaCursos:', error);
      res.status(500).json({ error: 'Erro ao listar telaCursos' });
    } finally {
      await pool.close();
    }
  }

  async deletarTelaCurso(req: Request, res: Response): Promise<void> {

  }
  async atualizarTelaCurso(req: Request, res: Response): Promise<void> {

  }

  async findById(req: Request, res: Response) {

  }

  async loginTelaCurso(req: Request, res: Response) {
    
  }
}

export default TelaCursoControllers;