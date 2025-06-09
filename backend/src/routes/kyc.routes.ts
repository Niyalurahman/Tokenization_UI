import express from 'express';
import * as kycController from '../controllers/kyc.controller';

const router = express.Router();

router.post('/submit', kycController.submitKYC);
router.get('/pending', kycController.getPendingKYCs);
router.post('/:id/approve', kycController.approveKYC);
router.post('/:id/reject', kycController.rejectKYC);

export default router;
