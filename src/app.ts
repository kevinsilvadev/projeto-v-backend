import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import cookie from 'cookie-parser'
import { router } from './routes/index'
const jwt = require('jsonwebtoken');
export const app = express()

app.use(cookie('usuario'))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use('/', router);

//Middleware para autenticação
app.use((req, res, next) => {
    const token = req.body.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        console.log(decoded)
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Token inválido' });
    }


})

