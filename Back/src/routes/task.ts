import express, { Request, Response, Router } from 'express';
import Task from '../model/Tarefa.ts';
import TaskController from '../controllers/taskController.ts';

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
            TaskController.postTask(req,res);
        }catch(e){
            res.status(500);
        }
    })

    .get('', (req, res) => {
        try{
            TaskController.getTask(req,res);
        }catch(e){
            res.status(500);
        }
    })

    .get('/:id',(req, res) => {
        try{
            TaskController.getTaskById(req,res)
        } catch(e){
            res.status(500)
        }
    })

    .put('/:id', (req, res) => {
        try{
            TaskController.updateStatus(req,res);
        }catch(e){
            res.status(500)
        }
    })

    .delete('/:id',(req, res) => {
        try{
            TaskController.deleteStatus(req,res)
        }catch(e){
            res.status(500)
        }
    })
