import { Request,Response } from 'express';
import DeliverisService  from '../services/DeliveriesService.ts';
import DeliveryDto from '../dto/DeliveryDto.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class DeliveriesController{
    static async create(req:Request,res:Response){
        let data:DeliveryDto = req.body;

        try{
            let response:DefaultReturn = await DeliverisService.create(data);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao criar entrega");
        }
    }

    static async getById(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await DeliverisService.getById(id);

            if(!response.response)
                return res.status(400).json("Entrega não encontrada!");

            return res.status(200).json(response.data);
        }catch(e){
            return res.status(500).json("Error ao buscar entrega");
        }
    }

    static async updateStatus(req:Request,res:Response){
        let id = parseInt(req.params.id);
        let {status} = req.body;

        try{
            let response:DefaultReturn = await DeliverisService.updateStatus(id,status);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);
        }catch(e){
            return res.status(500).json("Error ao atualizar status da entrega");
        }
    }
}