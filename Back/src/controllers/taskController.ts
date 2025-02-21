import { Request,Response } from 'express';
import Task from '../model/Tarefa.ts';


class TaskController{

    static postTask(req:Request,res:Response){
        let {title,description} = req.body
        new Task({title:title,description:description}).save();
        return res.status(200).json({message:"Adicionado com sucesso!"});
    }

    static async getTask(req:Request,res:Response){
        return res.status(200).json(await Task.find());
    }

    static async getTaskById(req:Request,res:Response){
        const { id } = req.params
        return res.status(200).json(await Task.findById(id));
    }

    static async updateStatus(req:Request,res:Response){
        const { id } = req.params;
        const { status } = req.body;
        await Task.findByIdAndUpdate(id,{updateAt:Date.now(),completed:status})
        return res.status(200).send(`Valor atualizado!`)
    }

    static async deleteStatus(req:Request,res:Response){
        const { id } = req.params;
        await Task.findByIdAndDelete(id)
        return res.status(200).send(`Pessoa com o id: ${id} foi deletada `);
    }

}

export default TaskController;