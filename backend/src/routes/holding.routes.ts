import { Router } from 'express';
import { buyTokens,getHoldersByProperty } from '../controllers/holding.controller';

const router = Router();

router.post('/buy', buyTokens);
router.get('/property/:title', getHoldersByProperty); 
export default router;

