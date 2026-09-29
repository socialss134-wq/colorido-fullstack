import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import routes from './routes';
import { errorHandler, notFound } from './middleware/error';

export const app=express();
app.use(helmet());
app.use(cors({origin:env.FRONTEND_URL.split(',').map(x=>x.trim()),credentials:true}));
app.use(express.json({limit:'1mb'}));
app.get('/',(_req,res)=>res.json({service:'COLORIDO 2K26 API',docs:'/api/health'}));
app.use('/api',routes);
app.use(notFound);
app.use(errorHandler);
