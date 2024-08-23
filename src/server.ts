import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';
import userRoutes from "./routes/user/userRoutes";
import clientsRoutes from './routes/clients/clientsRoutes'
import plansRoutes from './routes/plans/plansRoutes'
import { corsConfig } from './config/cors';


dotenv.config()
connectDB()


const app = express()

// Habilitando el cors
app.use(cors(corsConfig))

// Logueando las peticiones
app.use(morgan('dev'))


// leer datos de formularios
app.use(express.json())
app.use('/api/user', userRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/plans', plansRoutes);



export default app