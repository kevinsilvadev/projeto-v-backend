import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

class AutenticacaoController {

	async registrar(req: Request, res: Response): Promise<void> {
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
				rua } = req.body;

			if (!email || !senha) {
				res.status(400);
				throw new Error('Email ou senha vazio.');
			}

			const usuario = await prisma.usuario.findUnique({
				where: {
					email: req.body.email,
				}
			});

			if (usuario) {
				res.status(400);
				throw new Error('Email já está sendo utilizado.');
			}

			const novoUsuario = await prisma.usuario.create({
				data: {
					nome: nome,
					colaborador: colaborador,
					profissao: profissao,
					cep: cep,
					bairro: bairro,
					estado: estado,
					rua: rua, 
					celular: celular, 
					data_nascimento: new Date(dataNascimento),
					cargoId: 1,
					senha: bcrypt.hashSync(senha, 12),
					email: 'teste'
				}
			})

			res.status(200)
			res.json(novoUsuario);

		} catch (error) {
			console.error('Erro ao criar conta', error);
			res.status(500).json({ error: 'Erro ao realizar criar conta' });
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {

			console.log(req.body.email)

			const usuario = await prisma.usuario.findUnique({
				where: {
					email: req.body.email,
				}
			});

			console.log(usuario)


			if (!usuario) {
				res.status(403);
				throw new Error('Dados inválidos.');
			}

			console.log(usuario.senha);

			const validPassword = await bcrypt.compare(req.body.senha, usuario['senha']);
			if (!validPassword) {
				res.status(403);
				throw new Error('Invalid login credentials.');
			}

			const jwt = require('jsonwebtoken');


			const token = jwt.sign({ userId: usuario.id }, process.env.JWT_ACCESS_SECRET, {
				expiresIn: '10m',
			});


			res.json({ token: token }); // Envia a resposta ao cliente
		} catch (error) {
			console.error('Erro ao realizar login', error);
			res.status(500).json({ error: 'Erro ao realizar login' });
		}
	}
}

export default AutenticacaoController;
