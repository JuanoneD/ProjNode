import { Request,Response } from 'express';
import CarriersDto from '../dto/CarriersDto.ts';
import Carriers from '../model/Carriers.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';
import Delivery from '../model/Deliveries.ts';

export default class CarriersService{
    static async create(data:CarriersDto){
        if(data.CNPJ.length!==14)
            return {response:false,message:"CNPJ inválido!"}

        let newCarrier = await Carriers.create({
            name:data.name,
            CNPJ:data.CNPJ,
            carriageType:data.carriageType
        });
        newCarrier.save();
        return {response:true,message:"Transportadora Cadastrada com Sucesso!"};
    }

    static async getById(id:number):Promise<DefaultReturn>{
        let carrier = await Carriers.findById(id);
        if(carrier===null)
            return {response:false,message:"Transportadora não encontrada!"}

        let deliveries:any = [];
        carrier.deliveresIds.map(async (deliveryId)=>{
            let currDeli = Delivery.findById(deliveryId);
            deliveries.push(currDeli);
        })
        
        return {response:true,message:"Trasportadora encotrada com sucesso!",data:deliveries};
    }

}