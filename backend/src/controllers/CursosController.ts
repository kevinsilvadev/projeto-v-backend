import { Request, Response } from 'express';
import sql from 'mssql';
import { config } from '../bd';
import Curso from '../models/Cursos';

class CursosController {
  async listarCursos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM CURSOS');
  
      const curso = result.recordset.map((curso: Curso) => {
        return {
            id: curso.id,
            urlPhoto:curso.urlPhoto,
            nome: curso.nome,
            descricao: curso.descricao
        };
      });
      res.send(curso);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
    
  }

  async criarCursos(req: Request, res: Response): Promise<void> {
    try {
      const curso = Curso.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO CURSOS (urlPhoto, nome, descricao) VALUES ('${curso.urlPhoto}', '${curso.nome}', '${curso.descricao}')`);

      res.status(201).send('Curso criado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o curso');
      console.log(error);
    }
  }

  async deletarCursos(req: Request, res: Response): Promise<void> {
    try {
      const curso = Curso.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`DELETE FROM CURSOS WHERE id_cursos='${curso.id}`);
      res
        .status(201)
        .send('Curso atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o curso');
      console.log(error);
    }
  }

  async atualizarCursos(req: Request, res: Response): Promise<void> {
    try {
      const { id, campo, valor } = req.body; // Obtém os valores do corpo da requisição
  
      const pool = await sql.connect(config);
      const request = pool.request();
  
      let query = '';
      switch (campo) {
        case 'urlPhoto':
          query = `UPDATE CURSOS SET urlPhoto = @valor WHERE ID_CURSOS = @id`;
          break;
        case 'nome_cursos':
          query = `UPDATE CURSOS SET nome_cursos = @valor WHERE ID_CURSOS = @id`;
          break;
        case 'descricao':
          query = `UPDATE CURSOS SET descricao = @valor WHERE ID_CURSOS = @id`;
          break;
        default:
          throw new Error('Campo inválido');
      }
  
      request.input('id', id);
      request.input('valor', valor);
  
      const result = await request.query(query);
  
      res.status(201).send('Curso atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o curso');
      console.log(error);
    }
  }
}

export default CursosController;