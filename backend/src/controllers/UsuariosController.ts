import { Request, Response } from 'express';
import sql, { pool } from 'mssql';
import { config } from '../bd';
import Usuario from '../models/Usuario';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../env';

class UsuariosControllers {
  async listarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Usuario');

      const Usuario = result.recordset.map((usuario: Usuario) => {
        return {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          senha: usuario.senha,
          celular: usuario.celular,
          estado: usuario.estado,
          cep: usuario.cep,
          bairro: usuario.bairro,
          rua: usuario.rua,
          data_nascimento: usuario.data_nascimento,
          colaborador: usuario.colaborador,
          profissao: usuario.profissao,
          cargo: usuario.cargo
        };
      });
      res.send(Usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send('Erro ao buscar os dados do banco de dados.');
    }
  }

  async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = Usuario.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`INSERT INTO Usuario (nome, email, senha, celular, estado, cep, bairro, rua, data_nascimento, colaborador, profissao) 
          VALUES ('${usuario.nome}', '${usuario.email}', '${usuario.senha}', '${usuario.celular}', '${usuario.estado}', '${usuario.cep}', '${usuario.bairro}', '${usuario.rua}', ${usuario.data_nascimento},'${usuario.colaborador}', '${usuario.profissao}')`);
      res
        .status(201)
        .send('usuario criado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o usuario');
      console.log(error);
    }

  }
  async deletarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = Usuario.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`DELETE FROM Usuario WHERE id='${usuario.id}'`);
      res
        .status(201)
        .send('usuario deletado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao criar o usuario');
      console.log(error);
    }
  }
  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const usuario = Usuario.fromMap(req.body);
      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`UPDATE Usuario SET nome_cursos='${usuario.email}',  WHERE id='${usuario.email}'`);
      res
        .status(201)
        .send('usuario atualizado com sucesso');
    } catch (error) {
      res.status(500).send('Erro ao atualizar o usuario');
      console.log(error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const token = req.params.id;

      const { id } = jwt.verify(token, env.JWT_PASS) as JwtPayload

      const pool = await sql.connect(config);
      const result = await pool
        .request()
        .query(`SELECT email, celular, estado, cep, bairro, rua, empregado, area_profissao, nome_completo, data_nasc FROM Usuario WHERE ID_usuario=${id}`);

      let usuario = Usuario.fromMap(result.recordset[0]);

      if (!result) {
        res.status(404).send('Usuário não encontrado!')
      }

      res.status(200).send(usuario);
    } catch (error) {
      res.status(500).json({ msg: 'Token inválido' });
    }
  }

  async loginUsuario(req: Request, res: Response) {
    try {
      const pool = await sql.connect(config);

      const { email, senha } = req.body;

      console.log(req.body)

      if (!email) {
        res.status(422).send('O email é obrigatório!')
      }

      if (!senha) {
        res.status(422).send('A senha é obrigatória!')
      }

      const user = await pool.request().query(`SELECT * FROM Usuario WHERE email='${email}';`);

      if (!user) {
        res.status(404).send('Usuário não encontrado!')
      }

      const usuario = Usuario.fromMap(user.recordset[0])

      console.log(usuario)

      const token = jwt.sign(
        {
          id: usuario.id,
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

export default UsuariosControllers;