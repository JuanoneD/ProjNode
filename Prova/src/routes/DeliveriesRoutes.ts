import express, { Request, Response, Router } from 'express';
import DeliveriesController from '../controllers/DeliverisController.ts';

export default Router()
    .post('', (req: Request, res: Response) => {
        DeliveriesController.create(req, res);
    })
    .get('/:id', (req: Request, res: Response) => {
        DeliveriesController.getById(req, res);
    })
    .put('/:id/status', (req: Request, res: Response) => {
        DeliveriesController.updateStatus(req, res);
    })