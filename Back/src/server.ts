import express from 'express';
import router from './routes/routes.js';
import connectDB from './database/database.ts';
import cors from 'cors';
import { Request } from "express";

const app = express();

const port = 8080;

app.use(cors()); // Removi a tipagem desnecessária
app.use(express.json()); 

connectDB()
router(app);


app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));
