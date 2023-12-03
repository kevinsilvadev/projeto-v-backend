import { Request, Response } from "express";
import sql, { pool } from "mssql";
import Usuario from "../model/Usuario";
import { hash } from "bcrypt";
import { config } from "../config/db";

class UsuariosControllers {
  async listarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query("SELECT * FROM Usuario");

      const usuarios:Usuario[] = [];

      result.recordset.forEach(element => {
        usuarios.push(Usuario.fromMap(element))
      })

      console.log(usuarios)

      res.json(usuarios);

      await pool.close();
    } catch (error) {
      console.error("Erro ao listar usuarios:", error);
      res.status(500).json({ error: "Erro ao listar usuarios" });
    }
  }

  async deletarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);

      const userId = parseInt(req.params.id);

      const result = await pool
        .request()
        .query(`DELETE FROM Usuario WHERE id = ${userId}`);

      res.json(result);
    } catch (error) {
      console.log("Erro ao deletar usuário", error);
    } finally {
      await await pool.close();
    }
  }

  async promoverUsuario(req: Request, res: Response): Promise<void> {
    const { id, cargoId } = req.body;

    console.log(id);
    console.log(cargoId);

    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .query(`UPDATE Usuario SET fk_Cargo_id = ${cargoId} WHERE id = ${id}`);

    res.status(200).json(result);

    await pool.close();
  }

  async atualizarUsuario(req: Request, res: Response): Promise<void> {
    const {
      celular,
      senha,
      nome,
      colaborador,
      profissao,
      email,
      cep,
      bairro,
      estado,
      rua,
    } = req.body;

    const id = req.params.id;

    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .query(
        `UPDATE Usuario SET celular = ${celular}, senha = ${senha}, nome = ${nome}, profissao = ${profissao}, colaborador = ${colaborador}, email = ${email}, cep = ${cep}, rua = ${rua}, bairro = ${bairro}, estado = ${estado} WHERE id = ${id}`
      );

    await pool.close();
  }

  async registrar(req: Request, res: Response): Promise<void> {
    
    const pool = await sql.connect(config);

    try {
    
      const {
        dataNascimento,
        celular,
        senha,
        nome,
        colaborador,
        profissao,
        email,
        cep,
        bairro,
        estado,
        rua,
      } = req.body;

      if (!email || !senha) {
        res.status(400);
        throw new Error("Email ou senha vazio.");
      }
      console.log(email)
      const usuario = await pool.request().query(`SELECT * FROM Usuario WHERE email = '${email}'`);


      if (!usuario.recordset || usuario.recordset.length === 0) {
        res.status(400);
        throw new Error("Email já está sendo utilizado.");
      }

      const data = new Date(dataNascimento).toISOString();
      
      const result = await pool
        .request()
        .query(
        `INSERT INTO Usuario(
          data_nascimento, 
          celular, 
          senha, 
          nome, 
          colaborador,
          profissao,
          email,
          cep,
          bairro,
          estado,
          rua,
          fk_Cargo_id) 
          VALUES 
          (
            '${data}', 
            '${celular}', 
            '${await hash(senha, 12)}', 
            '${nome}', 
            ${colaborador == true ? 1 : 0},
            '${profissao}',
            '${email}',
            '${cep}',
            '${bairro}',
            '${estado}',
            '${rua}',
            1)`);


            console.log(new Date(dataNascimento).toISOString())

      res.status(201).json({ sucesso: "Conta criada com sucesso!", result: result});

    } catch (error) {
      console.error("Erro ao criar conta", error);
      res.status(500).json({ error: "Erro ao realizar criar conta" });
    } finally {
      await pool.close();
    }
  }

  async findById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const pool = await sql.connect(config);
    try { 
      const result = await pool
        .request()
        .query(`SELECT * FROM Usuario WHERE id = ${userId}`);

        console.log(result.recordset[0]);
      res.status(200).json(result.recordset[0]);
    } catch (error) {
      throw new Error(`Erro ao encontrar o usuário: ${error}`);
    } finally {
      await pool.close();
    }
  }
}

export default UsuariosControllers;
