import { Request,Response } from 'express';
import PokemonService from '../services/pokemonService.ts';
import CapDto from '../dto/capDto.ts';

export default class PokemonController{
    static async capture(req:Request,res:Response){
        try{
            const { id } = req.params 
            let resposeCont = await PokemonService.capture({id:Number(id)});
            if(resposeCont.response){
                return res.status(201).json({message:resposeCont.message})
            }
            return res.status(401).json({message:resposeCont.message})
        }catch(e){
            return res.status(505)
        }
    }

    static async team(req:Request,res:Response){
        try {
            return res.status(201).json({data:await PokemonService.team()})
        } catch (e) {
            return res.status(505);
        }
    }
}