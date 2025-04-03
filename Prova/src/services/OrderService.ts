import { Request,Response } from 'express';
import Order from '../model/Orders.ts';
import OrderDto from '../dto/OrderDto.ts';
import Product from '../model/Products.ts';
import Customer from '../model/Custumer.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class OrderService {
    static async create(data:OrderDto): Promise<DefaultReturn> {
        data.productsIds.forEach((productId) => {
            Product.findById(productId).then((product) => {
                if (!product) {
                    return {response:false,message: `Produto com ${productId} não encontrado`};
                }
                if (product.quantity < 1) {
                    return {response:false,message: `Produto com ${productId} fora de estoque`};
                }
            });
        })

        let currCustumer = await Customer.findById(data.custumerId);

        if (currCustumer === null) {
            return {response:false,message:"Cliente não encontrado!"};
        }
        
        let order = new Order(data);
        await order.save();

        currCustumer.ordersIds.push(order._id as string);
        currCustumer.save();

        return {response:true,message:"Pedido criado com sucesso!"};
    }

    static async getByStatus(status:string):Promise<DefaultReturn> {
        let orders = await Order.find({status:status});
        if (orders.length === 0) {
            return {response:false,message:"Nenhum pedido encontrado!"};
        }
        return {response:true,message:"Pedidos encontrados!",data:orders};
    }

    static async cancelOrder(id:number):Promise<DefaultReturn> {
        let order = await Order.findById(id);

        if (order === null) {
            return {response:false,message:"Pedido não encontrado!"};
        }

        if (order.status === "Enviado") {
            return {response:false,message:"Pedido já enviado!"};
        }

        order.status = "Cancelado";
        await order.save();
        return {response:true,message:"Pedido cancelado com sucesso!"};
    }
}
