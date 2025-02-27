import express from 'express'
import AuthController from '../controllers/AuthController.ts'
import { validadeLogin, validadeRegister } from '../middlewares/authMiddleware.ts'

export default express.Router()
    .post('/register',validadeRegister,AuthController.register)
    .post('/login',validadeLogin,AuthController.login)