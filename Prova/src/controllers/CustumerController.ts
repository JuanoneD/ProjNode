import { Request,Response } from 'express';
import DefaultReturn from '../dto/DefaultReturn.ts';
import CustumersDto from '../dto/CustumersDto.ts';
import CustumerService from '../services/CustumerService.ts';

export default class CustumerController{
    static async create(req:Request,res:Response){
        let data:CustumersDto = req.body;

        try{
            let response:DefaultReturn = await CustumerService.create(data);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao criar cliente");
        }
    }

    static async getById(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await CustumerService.getOrderById(id);

            if(!response.response)
                return res.status(400).json("Cliente não encontrado!");

            return res.status(200).json(response.data);
        }catch(e){
            return res.status(500).json("Error ao buscar cliente");
        }
    }

    static async delete(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await CustumerService.delete(id);

            if(!response.response)
                return res.status(400).json("Cliente não encontrado!");

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao deletar cliente");
        }
    }
}