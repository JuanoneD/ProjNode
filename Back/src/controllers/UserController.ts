import { Request,Response } from 'express';
import Task from '../model/Tarefa.ts';
import {prisma} from '../lib/prisma.ts';

class UserController{

    static async createUser(req:Request,res:Response){
        const { name, email } = req.body;
        try {
            const user = await prisma.users.create({
                data: { name, email },
            });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário", error });
        }
    }

    static async updateUser(req:Request,res:Response){
        const { id } = req.params;
        const { name,email } = req.body;
        await prisma.users.update({where:{id:Number(id)},data:{name,email}})
    }

    static async deleteStatus(req:Request,res:Response){
        const { id } = req.params;
        await prisma.users.delete({
            where:{id:Number(id)}
        })
    }

}

export default UserController;