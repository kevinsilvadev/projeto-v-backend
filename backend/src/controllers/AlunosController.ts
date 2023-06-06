import { Request, Response } from 'express';
import sql, { pool } from 'mssql';
import { config } from '../bd';
import Alunos from '../models/Alunos';

class AlunosController {
  async listarAlunos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM ALUNOS');

      const alunos = result.recordset.map((aluno: Alunos) => {
        return {
          id: aluno.id,
          email: aluno.email,
          senha: aluno.senha,
          celular: aluno.celular,
          estado: aluno.estado,
          cep: aluno.cep,
          bairro: aluno.bairro,
          rua: aluno.rua,
          empregado: aluno.empregado,
          area_profissao: aluno.area_profissao,
        };
      });
      res.send(alunos);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
  }
  async criarAlunos(req: Request, res: Response): Promise<void> {
    try {
      const aluno = Alunos.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO ALUNOS (email, senha, celular, estado, cep, bairro, rua, empregado, area_profissao) VALUES ('${aluno.email}', '${aluno.senha}', '${aluno.celular}', '${aluno.estado}', '${aluno.cep}', '${aluno.bairro}', '${aluno.rua}', '${aluno.empregado}', '${aluno.area_profissao}')`);
      res
        .status(201)
        .send('Aluno criado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o aluno');
      console.log(error);
    }

  }
  async deletarAlunos(req: Request, res: Response): Promise<void> {
    try {
      const aluno = Alunos.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`DELETE FROM ALUNOS WHERE id='${aluno.id}'`);
      res
        .status(201)
        .send('Aluno deletado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o aluno');
      console.log(error);
    }
  }
  async atualizarAlunos(req: Request, res: Response): Promise<void> {
    try {
      const aluno = Alunos.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`UPDATE ALUNOS SET nome_cursos='${aluno.email}',  WHERE id='${aluno.email}'`);
      res
        .status(201)
        .send('Aluno atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o aluno');
      console.log(error);
    }
  }
}

export default AlunosController;