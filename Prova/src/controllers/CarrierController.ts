import { Request,Response } from 'express';
import CarrierService  from '../services/CarriersService.ts';
import CarriersDto from '../dto/CarriersDto.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class CarrierController{
    static async create(req:Request,res:Response){
        let data:CarriersDto = req.body;

        try{
            let response:DefaultReturn = await CarrierService.create(data);

            if(!response.response)
                return res.status(400).json(response.message);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao criar transportadora");
        }
    }

    static async getById(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await CarrierService.getById(id);

            if(!response.response)
                return res.status(400).json("Transportadora não encontrada!");

            return res.status(200).json(response.data);
        }catch(e){
            return res.status(500).json("Error ao buscar transportadora");
        }
    }
}