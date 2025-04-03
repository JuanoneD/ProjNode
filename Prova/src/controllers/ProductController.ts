import { Request,Response } from 'express';
import ProductService  from '../services/ProductService.ts';
import ProductDto from '../dto/ProductDto.ts';
import DefaultReturn from '../dto/DefaultReturn.ts';

export default class ProductController{
    static async create(req:Request,res:Response){
        let data:ProductDto = req.body;

        try{
            let response:DefaultReturn = await ProductService.create(data);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao criar produto");
        }
    }
    static async getAll(req:Request,res:Response){
        try{
            let response:DefaultReturn = await ProductService.getAll();

            if(!response.response)
                return res.status(400).json("Nenhum produto encontrado!");

            return res.status(200).json(response.data);
        }catch(e){
            return res.status(500).json("Error ao buscar produtos");
        }
    }
    static async delete(req:Request,res:Response){
        let id = parseInt(req.params.id);

        try{
            let response:DefaultReturn = await ProductService.delete(id);

            return res.status(200).json(response.message);

        }catch(e){
            return res.status(500).json("Error ao deletar produto");
        }
    }
    static async login(req:Request,res:Response){
        try{
            let response:DefaultReturn = await ProductService.login(req,res);

            if(!response.response)
                return res.status(400).json("Email ou senha inválidos!");

            return res.status(200).json({token:response.data});
        }catch(e){
            return res.status(500).json("Error ao fazer login");
        }
    }
}