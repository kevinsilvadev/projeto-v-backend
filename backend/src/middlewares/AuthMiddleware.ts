import { Request, Response, NextFunction } from 'express'
import Alunos from '../models/Alunos';
import jwt from 'jsonwebtoken'
import { env } from '../env'

type JwtPayload = {
  userToken: String
}

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({
      error: 'Not authorized',
    })
  }

  const token = authorization.split(' ')[1]

  const { userToken } = jwt.verify(token, env.JWT_PASS) as JwtPayload

  const user = await Alunos.listarAlunos({ userToken })

  if (!user) {
    return res.status(401).json({
      error: 'Not authorized',
    })
  }

  const userWithoutPassword = {
    name: user?.name,
    lastname: user?.lastname,
    status: user?.status,
    type: user?.type,
    userToken: user?.userToken,
  }

  req.user = userWithoutPassword

  next()
}

export default authMiddleware
