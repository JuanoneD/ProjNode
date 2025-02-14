import { Express } from 'express';
import express from 'express'
import person from './person.js'
import user from './user.ts';
import task from './task.ts';

export default function (app: Express) {
    app
        .use(express.json())
        .use('/person',person)
        .use('/usuarios',user)
        .use('/tasks',task)
}