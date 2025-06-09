import express, { Request, Response } from 'express';
import kycRoutes from './routes/kyc.routes';
import propertyRoutes from './routes/property.routes';
import userRoutes from './routes/user.routes';
import dividendRoutes from './routes/dividend.routes';
import holdingRoutes from './routes/holding.routes';


const app = express();

app.use(express.json());
app.use('/api/kyc', kycRoutes);
app.use('/api/property', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dividend', dividendRoutes);
app.use('/api/holding', holdingRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('API is running');
});

export default app;
