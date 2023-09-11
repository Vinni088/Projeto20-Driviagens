import cors from 'cors';
import dotenv from 'dotenv';
import "express-async-errors";
import express, { json } from 'express';
import router from './routers/indexRouter.js';
import errorHandler from "./middlewares/errorMiddleware.js"

const app = express();

dotenv.config();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Rodando na porta ${PORT}`)})