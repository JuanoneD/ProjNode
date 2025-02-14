import express from 'express';
import router from './routes/routes.js';
import connectDB from './database/database.ts';


const app = express();
const port = 8080;

connectDB()
router(app);

app.listen(port, () => console.log(`Acesse: http://localhost:${port}/`));
