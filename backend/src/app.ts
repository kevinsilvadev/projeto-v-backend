import express from 'express'
import cors from 'cors'
import logger from 'morgan'

import { router } from './routes/index'

/*Cria app*/
export const app = express()

app.use(express.json())
app.use(cors())
app.use(logger('dev'))

//Integra endpoint na aplicação
app.use('/', router)