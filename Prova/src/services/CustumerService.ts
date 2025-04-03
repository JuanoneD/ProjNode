import { Request,Response } from 'express';
import CustumersDto from '../dto/CustumersDto.ts';
import Customer from '../model/Custumer.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';
import Order from '../model/Orders.ts';
import c from 'config';

export default class CustumerService{
    static async create(data:CustumersDto):Promise<DefaultReturn>{
        let custumer = await Customer.findOne({email:data.email});

        if(custumer!==null)
            return {response:false,message:"Email ja Cadastrado!"}

        let newCus = await Customer.create({
            name:data.name,
            email:data.email,
            phone:data.phone,
            address:data.address
        });

        newCus.save();

        return {response:true,message:"Cliente Cadastrado com Sucesso!"}
    }

    static async getOrderById(id:number):Promise<DefaultReturn>{
        let custumer = await Customer.findById(id);

        if(custumer===null)
            return {response:false,message:"Cliente não encontrado!"}

        let orders:any =[];

        custumer.ordersIds.map(async (orderId)=>{
            orders.push(await Order.findById(orderId));
        })

        return {response:true,message:"Cliente Encontrado!",data:orders};
    }

    static async delete(id:number):Promise<DefaultReturn>{
        await Customer.findByIdAndDelete(id);

        return {response:true,message:"Cliente deletado com sucesso!"}
    }
}