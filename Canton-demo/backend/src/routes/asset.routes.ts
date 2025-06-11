import { Router } from 'express';
import { createAsset, getAsset } from '../controllers/asset.controller';

const router = Router();

router.post('/assets', createAsset);
router.post('/assets/fetch', getAsset);


export default router;
