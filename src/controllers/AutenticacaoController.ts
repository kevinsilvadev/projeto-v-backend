import { Request, Response } from "express";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { config } from "../config/db";
import sql, { pool } from "mssql";
import Usuario from "../model/Usuario";

class AutenticacaoController {
  async login(req: Request, res: Response): Promise<void> {

    const pool = await sql.connect(config);

    try {
      
      const result = await pool
        .request()
        .input('email', sql.VarChar, req.body.email)
        .query(`SELECT * FROM Usuario WHERE email = @email`);

      if (!result.recordset || result.recordset.length === 0) {
        res.status(403);
        throw new Error("Dados inválidos.");
      }

      const usuario = Usuario.fromMap(result.recordset[0]);

      const validPassword = await compare(req.body.senha, usuario.senha);
      if (!validPassword) {
        res.status(403);
        throw new Error("Invalid login credentials.");
      }

      const token = sign({}, authConfig.jwt.secret, {
        subject: String(usuario.id),
        expiresIn: authConfig.jwt.expiresIn,
      });

      res.json({ token: token, usuario: usuario });
    } catch (error) {
      console.error("Erro ao realizar login", error);
      res.status(500).json({ error: "Erro ao realizar login" });
    } finally {
      await pool.close();
    }
  }
}

export default AutenticacaoController;
