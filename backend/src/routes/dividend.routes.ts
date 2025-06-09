import { Router } from 'express';
import { calculateDividend } from '../controllers/dividend.controller';

const router = Router();

router.post('/calculate', calculateDividend); // just returns per-token

export default router;
