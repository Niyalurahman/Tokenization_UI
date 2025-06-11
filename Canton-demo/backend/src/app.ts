import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import assetRoutes from './routes/asset.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', assetRoutes);

export default app;
