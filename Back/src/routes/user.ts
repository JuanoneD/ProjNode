import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();
const users: {name:string,last:string}[] = [];

export default router

    .post('',(req,res)=>{
        const {nome,sobrenome} = req.body
        users.push({name:nome,last:sobrenome})
        res.status(200).send(`Pessoa ${nome} adicionada com sucesso`);
    })

    .get('', (req, res) => {
        res.status(200).send(users);
    })

    .get('/:id',(req, res) => {
        const { id } = req.params 
        res.status(200).send(users[Number(id)]);
    })
    
    .put('/:id', (req, res) => {
        const { id } = req.params
        const { nome, sobrenome } = req.query

        users[Number(id)].name = nome?nome.toString():"";
        users[Number(id)].name = sobrenome?sobrenome.toString():"";

        res.status(200).send(`dados atualizados com sucesso!!`);
    })

    .patch('/:id', (req, res) => {
        const { id } = req.params
        const { nome, sobrenome } = req.query

        users[Number(id)].name = nome?nome.toString():users[Number(id)].name;
        users[Number(id)].name = sobrenome?sobrenome.toString():users[Number(id)].name;

        res.status(200).send(`dados atualizados com sucesso!!`);
    })

    .delete('/:id', (req, res) => {
        const { id } = req.params;
        users.splice(Number(id),1)
        res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
    })
