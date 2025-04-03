import { Request,Response } from 'express';
import Product from '../model/Products.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';
import Customer from '../model/Custumer.ts';
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";



export default class ProductService{
    static async create(data:any):Promise<DefaultReturn>{

        let secret = process.env.SECRET?process.env.SECRET:"LancaPerfumeRodometalicoDeAndrade"
        let passwordHash: string =CryptoJS.AES.encrypt(data.password,secret as string).toString();


        let newProd = await Product.create({
            name:data.name,
            price:data.price,
            quantity:data.quantity,
            password:passwordHash
        })

        newProd.save();

        return {response:true,message:"Produto cadastrado com sucesso!"}
    }

    static async getAll():Promise<DefaultReturn>{
        let products = await Product.find();

        if(products.length===0)
            return {response:false,message:"Nenhum produto encontrado!"}

        return {response:true,message:"Produtos encontrados!",data:products};
    }

    static async delete(id:number):Promise<DefaultReturn>{
        Product.findByIdAndDelete(id);
        return {response:true,message:"Produto deletado com sucesso!"}
    }

    static async login(req: Request, res: Response):Promise<DefaultReturn> {
        const {email,password} = req.body;
        const user = await Customer.findOne({email});
        let secret = process.env.SECRET?process.env.SECRET:"LancaPerfumeRodomecanicoDeAndrade"
        
        if(!user)
            return {response:false,message:"Senha ou Email invalidos"};
    
        let desci = CryptoJS.AES.decrypt(user.password,secret).toString(CryptoJS.enc.Utf8);
        console.log(desci)
        if(!(password !== desci))
            return {response:false,message:"Senha ou Email invalidos"};
        const token = jwt.sign(
            {
                id:user._id,
            },
            secret as string,
            {
                expiresIn:'2 days'
            }
        );
        return {response:true,message:"Login realizado com sucesso!",data:token};
    }
}