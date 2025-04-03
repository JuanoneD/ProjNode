import { Request,Response } from 'express';
import OrderService  from '../services/OrderService.ts';
import OrderDto from '../dto/OrderDto.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class OrderController{
    static async create(req:Request,res:Response){
        let data:OrderDto = req.body;

        try{
            let response:DefaultReturn = await OrderService.create(data);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao criar pedido");
        }
    }

    static async getByStatus(req:Request,res:Response){
        let status = req.params.status;

        try{
            let response:DefaultReturn = await OrderService.getByStatus(status);

            if(!response.response)
                return res.status(400).json("Nenhum pedido encontrado!");

            return res.status(200).json(response.data);

        }catch(e){
            return res.status(500).json("Error ao buscar pedidos");
        }
    }
    
    static async cancelOrder(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await OrderService.cancelOrder(id);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao cancelar pedido");
        }
    }
}