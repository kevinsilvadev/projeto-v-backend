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
  async criarAlunos(req: Request, res:Response): Promise<void> {
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
}

export default AlunosController;