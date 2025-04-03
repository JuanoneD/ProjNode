import express, { Request, Response, Router } from 'express';
import ProductController from '../controllers/ProductController.ts';
import { AuthCNPJ } from '../middlewares/Auth.ts';

export default Router()
    .post('',AuthCNPJ, (req: Request, res: Response) => {
        ProductController.create(req, res);
    })
    .get('', (req: Request, res: Response) => {
        ProductController.getAll(req, res);
    })
    .delete('/:id', (req: Request, res: Response) => {
        ProductController.delete(req, res);
    })
    .post('/login', (req: Request, res: Response) => {
        ProductController.login(req, res);
    })