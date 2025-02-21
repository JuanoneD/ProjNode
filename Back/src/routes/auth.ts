import express from 'express'
import AuthController from '../controllers/AuthController.ts'

export default express.Router()
    .post('/register',AuthController.register)
    .post('/login',AuthController.login)