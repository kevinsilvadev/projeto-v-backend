import { Request, Response } from 'express';
import sql, { pool } from 'mssql';
import { config } from '../bd';
import Alunos from '../models/Alunos';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../env';

class AlunosController {
  async listarAlunos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM ALUNOS');

      const alunos = result.recordset.map((aluno: Alunos) => {
        return {
          id: aluno.id,
          nome_completo: aluno.nome_completo,
          email: aluno.email,
          senha: aluno.senha,
          celular: aluno.celular,
          estado: aluno.estado,
          cep: aluno.cep,
          bairro: aluno.bairro,
          rua: aluno.rua,
          data_nasc: aluno.data_nasc,
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
        .query(`INSERT INTO ALUNOS (nome_completo, email, senha, celular, estado, cep, bairro, rua, data_nasc, empregado, area_profissao) VALUES ('${aluno.nome_completo}', '${aluno.email}', '${aluno.senha}', '${aluno.celular}', '${aluno.estado}', '${aluno.cep}', '${aluno.bairro}', '${aluno.rua}', '${aluno.data_nasc}','${aluno.empregado}', '${aluno.area_profissao}')`);
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

  async acharPeloId(req: Request, res: Response) {
    try {
      const token = req.params.id;

      const { id } = jwt.verify(token, env.JWT_PASS) as JwtPayload

      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`SELECT email, celular, estado, cep, bairro, rua, empregado, area_profissao, nome_completo, data_nasc FROM ALUNOS WHERE ID_ALUNO=${id}`);

      let aluno = Alunos.fromMap(result.recordset[0]);

      if (!result) {
        res.status(404).send('Usuário não encontrado!')
      }

      res.status(200).send(aluno);
    } catch (error) {
      res.status(500).json({ msg: 'Token inválido' });
    }
  }

  async loginAluno(req: Request, res: Response) {
    try {
      const pool = await sql.connect(config);

      const { email, senha } = req.body;

      if (!email) {
        res.status(422).send('O email é obrigatório!')
      }

      if (!senha) {
        res.status(422).send('A senha é obrigatória!')
      }

      const user = await pool.request().query(`SELECT * FROM ALUNOS WHERE email='${email}';`);

      if (!user) {
        res.status(404).send('Usuário não encontrado!')
      }

      const aluno = Alunos.fromMap(user.recordset[0])

      const token = jwt.sign(
        {
          id: aluno.id,
        },
        env.JWT_PASS,
        {
          expiresIn: 60 * 60 * 3,
        },
      );

      res.status(200).json({ msg: 'Autenticação realizada com sucesso', token })

    } catch (error) {
      res.status(500).send('Erro ao efetuar o login');
      console.log(error)
    }
  }

}

export default AlunosController;