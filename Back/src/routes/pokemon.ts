import express, { Request, Response, Router } from 'express';
import PokemonController from '../controllers/pokemonContreller.ts';


export default express.Router()
    .post('/capture/:id',(req,res)=>{
        try{
            PokemonController.capture(req,res);
        }catch(e){
            res.status(500);
        }
    })
    .get('/team',(req,res)=>{
        try{
            PokemonController.team(req,res);
        }catch(e){
            res.status(500);
        }
    })
    
