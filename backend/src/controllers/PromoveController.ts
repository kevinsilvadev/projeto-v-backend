import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

class PromoveController {

    async listarPromover(req: Request, res: Response): Promise<void> {
        try {
          const prisma = new PrismaClient();
          const promove = await prisma.promove.findMany();
          res.json(promove); // Envia a resposta ao cliente
        } catch (error) {
          console.error('Erro ao listar Promovers:', error);
          res.status(500).json({ error: 'Erro ao listar Promovers' });
        }
      }
    
      async criarPromove(req: Request, res: Response): Promise<void> {
    
      }
    
      async deletarPromove(req: Request, res: Response): Promise<void> {
    
      }
      async atualizarPromove(req: Request, res: Response): Promise<void> {
    
      }
    
      async findById(req: Request, res: Response) {
    
      }
    
      async loginPromove(req: Request, res: Response) {
        
      }
}

export default PromoveController;
