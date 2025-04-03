import express, { Request, Response, Router } from 'express';
import OrderController from '../controllers/OrderController.ts';

export default Router()
    .post('', (req: Request, res: Response) => {
        OrderController.create(req, res);
    })
    .get('/:status', (req: Request, res: Response) => {
        OrderController.getByStatus(req, res);
    })
    .delete('/:id/cancel', (req: Request, res: Response) => {
        OrderController.cancelOrder(req, res);
    });
