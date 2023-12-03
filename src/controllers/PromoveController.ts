import { Request, Response } from "express";
import { config } from "../config/db";
import sql, { pool } from "mssql";

class PromoveController {
  async listarPromover(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query('SELECT * FROM Promove');
      res.json(result); // Envia a resposta ao cliente
    } catch (error) {
      console.error("Erro ao listar Promovers:", error);
      res.status(500).json({ error: "Erro ao listar Promovers" });
    }
  }

  async criarPromove(req: Request, res: Response): Promise<void> {}

  async deletarPromove(req: Request, res: Response): Promise<void> {}
  async atualizarPromove(req: Request, res: Response): Promise<void> {}

  async findById(req: Request, res: Response) {}

  async loginPromove(req: Request, res: Response) {}
}

export default PromoveController;
