import express, { Request, Response, Router } from 'express';
import Person from '../model/Person.ts';

const router: Router = express.Router();
const people: object[] = [];

export default router

    .post('/register',(req,res)=>{
        try{
            const {nome,idade} = req.body
            new Person(nome,idade).save();
            res.status(200).send(`Pessoa ${nome} é gay!!!!`);
        }catch(e){
            res.status(500);
        }
    })

    .get('/getData', async (req, res) => {
        try{
            res.status(200).json(await Person.find());
        }catch(e){
            res.status(500);
        }
    })

    .get('/getData/:id',(req, res) => {
        try{
            const { id } = req.params
            res.status(200).json(Person.findById(id));
        } catch(e){
            res.status(500)
        }
    })

    .get('/getData', (req, res) => {
        const { nome, idade } = req.query
        res.status(200).send(`Fazendo um GET no servidor! Nome: ${nome}, Idade: ${idade}`);
    })

    .put('/usuarios/:id', (req, res) => {
        try{
            const { id } = req.params;
            const { nome, idade } = req.body;
    
            Person.findByIdAndUpdate(id,{nome,idade});
            
            res.status(200).send(`Pessoa com o id: ${id} foi atualizado para
            ${nome} ${idade}`)
        }catch(e){
            res.status(500)
        }
    })

    .patch('/atualizar/:id',(req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const { nome, idade } = req.body;
    
            Person.findByIdAndUpdate(id,{nome,idade});
            
            res.status(200).send(`Pessoa com o id: ${id} foi atualizado para
            ${nome} ${idade}`)
        }catch(e){
            res.status(500)
        }
    })

    .delete('/deletar/:id', (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            Person.findByIdAndDelete(id)
            res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
        }catch(e){
            res.status(500)
        }
    })
