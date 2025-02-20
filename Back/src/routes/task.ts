import express, { Request, Response, Router } from 'express';
import Task from '../model/Tarefa.ts';

interface ITask{
    title:string,
    description:string,
    completed : boolean,
    createdAt : Date,
    updateAt : Date
}

const router: Router = express.Router();

export default router

    .post('',(req,res)=>{
        try{
            const {title,description} = req.body
            let task = new Task({title:title,description:description});
            task.save()
            res.status(200).json({message:"Adicionado com sucesso!"});
        }catch(e){
            res.status(500);
        }
    })

    .get('', async (req, res) => {
        try{
            res.status(200).json(await Task.find());
        }catch(e){
            res.status(500);
        }
    })

    .get('/:id',async (req, res) => {
        try{
            const { id } = req.params
            res.status(200).json(await Task.findById(id));
        } catch(e){
            res.status(500)
        }
    })

    .put('/:id',async (req, res) => {
        try{
            const { id } = req.params;
            const { status } = req.body;
    
            await Task.findByIdAndUpdate(id,{updateAt:Date.now(),completed:status});
            res.status(200).send(`Valor atualizado!`)
        }catch(e){
            res.status(500)
        }
    })

    .delete('/:id', async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            await Task.findByIdAndDelete(id)
            res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
        }catch(e){
            res.status(500)
        }
    })
