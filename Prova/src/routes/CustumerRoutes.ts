import express, { Request, Response, Router } from 'express';
import CustumerController from '../controllers/CustumerController.ts';

export default Router()
    .post('', (req: Request, res: Response) => {
        CustumerController.create(req, res);
    })

    .get('/:id/orders', (req: Request, res: Response) => {
        CustumerController.getById(req, res);
    })

    .delete('/:id', (req: Request, res: Response) => {
        CustumerController.delete(req, res);
    })
    