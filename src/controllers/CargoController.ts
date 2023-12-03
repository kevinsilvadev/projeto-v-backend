import { Request, Response } from 'express';
import { config } from "../config/db";
import sql, { pool } from "mssql";

class CargoController {

  async listarCargos(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);

      const result = await pool
        .request()
        .query(`SELECT * FROM Cargo`);

      res.json(result); // Envia a resposta ao cliente
      
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      res.status(500).json({ error: 'Erro ao listar cursos' });
    } finally {
      await pool.close();
    }
  }
}

export default CargoController;
