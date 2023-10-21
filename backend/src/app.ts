import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import cookie from 'cookie-parser'
import { router } from './routes/index'
/*Cria app*/
export const app = express()

import { PrismaClient } from '@prisma/client'

app.use(cookie('usuario'))
app.use(express.json())
app.use(cors())
app.use(logger('dev'))
app.use('/', router);

