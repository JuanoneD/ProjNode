import { Request,Response } from 'express';
import DeliveryDto from '../dto/DeliveryDto.ts';
import Delivery from '../model/Deliveries.ts';
import Carriers from '../model/Carriers.ts';
import Orders from '../model/Orders.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class DeliveriesService {
    static async create(data: DeliveryDto): Promise<DefaultReturn>{

        let currOrder = await Orders.findById(data.orderId);
        if(currOrder===null)
            return {response:false,message:"Pedido não encontrado!"}

        let currCarrier = await Carriers.findById(data.carrierId);
        if(currCarrier===null)
            return {response:false,message:"Transportadora não encontrada!"}

        let newDelivery = await Delivery.create({
            orderId: data.orderId,
            carrierId: data.carrierId,
            status: data.status
        });
        newDelivery.save();

        currCarrier.deliveresIds.push(newDelivery._id as string);
        currCarrier.save();

        currOrder.status = "em transporte";
        currOrder.save();

        return {response:true,message:"Entrega Cadastrada com Sucesso!"};
    }

    static async getById(id:number):Promise<DefaultReturn>{
        let delivery = await Delivery.findById(id);
        if(delivery===null)
            return {response:false,message:"Entrega não encontrada!"}

        return {response:true,message:"Entrega encontrada com sucesso!",data:delivery};
    }

    static async updateStatus(id:number,status:string):Promise<DefaultReturn>{
        let delivery = await Delivery.findById(id);
        if(delivery===null)
            return {response:false,message:"Entrega não encontrada!"}

        delivery.status = status;
        delivery.save();

        if(status==="entregue"){
            let currOrder = await Orders.findById(delivery.orderId);
            if(currOrder===null)
                return {response:false,message:"Pedido não encontrado!"}
            currOrder.status = "entregue";
            currOrder.save();
        }

        return {response:true,message:"Status atualizado com sucesso!"};
    }
}