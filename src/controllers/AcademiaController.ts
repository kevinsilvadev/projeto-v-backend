import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Academia from "../model/Academia";
import { config } from "../config/db";
import sql, { pool } from "mssql";
import salvarImagem from "../azure/salvarImagem";

class AcademiaController {
  async listarAcademia(req: Request, res: Response): Promise<void> {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query("SELECT * FROM Academia");

      const academias: Academia[] = [];

      result.recordset.forEach((element) => {
        academias.push(Academia.fromMap(element));
      });

      res.json(academias);

      await pool.close();
    } catch (error) {
      console.error("Erro ao listar usuarios:", error);
      res.status(500).json({ error: "Erro ao listar usuarios" });
    }
  }

  async criarAcademia(req: Request, res: Response): Promise<void> {
    try {
      const academia = Academia.fromMap(req.body);
      const pool = await sql.connect(config);
      const dataCriacao = new Date().toISOString();
      const imgUrl = await salvarImagem(
        `${academia.nome.replace(' ', '-')}-base64`,
        academia.imagem
      );
      console.log("academia: ", academia)
      const result = await pool.request().query(
        `INSERT INTO ACADEMIA (
          descricao, 
          nome, 
          imagem, 
          usuarioId 
          ) 
          VALUES 
          (
            '${academia.descricao}', 
            '${academia.nome}', 
            '${imgUrl}', 
            ${academia.usuarioId})`
      );
      res.status(201).send("Academia criado com sucesso");
    } catch (error) {
      res.status(500).send("Erro ao criar o academia");
      console.log(error);
    }
  }

  /*async criarAcademia(req: Request, res: Response): Promise<void> {
    const prisma = new PrismaClient();
    try {
      const { descricao, nome, imagem, usuarioId } = req.body;

      const criarAcademia = await prisma.academia.create({
        data: {
          descricao: descricao,
          nome: nome,
          imagem: imagem,
          usuarioId: usuarioId,
          data_criacao: new Date(),
        },
      });
      res.status(201).json(criarAcademia);
    } catch (error) {
      console.error('Erro ao criar academia:', error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar a academia' });
    } finally {
      await prisma.$disconnect();
    }
  }*/
}

export default AcademiaController;
