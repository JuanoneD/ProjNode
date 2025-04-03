import { Express } from 'express';
import express from 'express'
import CustumerRoutes from './CustumerRoutes.ts';
import CarrierRoutes from './CarrierRoutes.ts';
import ProductRoutes from './ProductRoutes.ts';
import OrdersRoutes from './OrdersRoutes.ts';
import DeliveriesRoutes from './DeliveriesRoutes.ts';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/custumers', CustumerRoutes)
        .use('/carriers', CarrierRoutes)
        .use('/products', ProductRoutes)
        .use('/orders', OrdersRoutes)
        .use('/deliveries', DeliveriesRoutes)
}