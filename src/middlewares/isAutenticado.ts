//Middleware para autenticação
import {Request, Response, NextFunction} from 'express';
import {verify} from 'jsonwebtoken';
import authConfig from '../config/auth';
import auth from '../config/auth';

export default function isAutenticado(request: Request, response:Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        next();
    } catch (err) {
        console.log(err)
        return response.status(401).json({ message: 'Token inválido' });
    }
}
