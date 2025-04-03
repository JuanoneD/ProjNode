import express, { Request, Response, Router } from 'express';
import CarrierController from '../controllers/CarrierController.ts';

export default Router()
    .post('', (req: Request, res: Response) => {
        CarrierController.create(req, res);
    })
    .get('/:id/deliveries', (req: Request, res: Response) => {
        CarrierController.getById(req, res);
    })