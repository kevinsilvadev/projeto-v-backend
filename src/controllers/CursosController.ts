import { Request, Response } from 'express';
import {config} from '../config/db';
import sql, { pool } from 'mssql';
import Curso from '../model/Curso';
import salvarImagem from '../azure/salvarImagem';

class CursosController {
  async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query("SELECT * FROM Curso");
  
      const cursos: Curso[] = [];

      result.recordset.forEach(element => {
        cursos.push(Curso.fromMap(element))
      });
  
      if (cursos.length > 0) {
        res.json(cursos);
      } else {
        res.status(404).json({ message: "Nenhum curso encontrado" });
      }
  
      await pool.close();
    } catch (error) {
      console.error("Erro ao listar cursos:", error);
      res.status(500).json({ error: "Erro ao listar cursos" });
    }
  }

  async criarCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoData = req.body;
      const pool = await sql.connect(config);

      const imgUrl = await salvarImagem(`${cursoData.titulo}-base64`, cursoData.imagem);
        
      const result = await pool
      .request()
      .query(
      `INSERT INTO Curso (
        descricao, 
        fk_Usuario_id, 
        data_criacao, 
        fk_Academia_id, 
        imagem, 
        validado, 
        titulo
      )
      VALUES (
        '${cursoData.descricao}',
        ${cursoData.usuarioId},
        '${new Date().toISOString()}',
        ${cursoData.academiaId},
        '${imgUrl}',          
        0,
        '${cursoData.titulo}'
      )`);

      console.log(result)
      res
        .status(201)
        .send('Curso criado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o Curso');
      console.log(error);
    }
  }

  async validarCurso(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;

      const pool = await sql.connect(config);

      const query = await pool
        .request()
        .query(
        `UPDATE Curso SET validado = 1 WHERE id = ${id} `);
      
      res.json(query);
    } catch (error) {
      console.error('Erro ao validar cursos:', error);
      res.status(500).json({ error: 'Erro ao validar cursos' });
    }
  }
}

export default CursosController;
