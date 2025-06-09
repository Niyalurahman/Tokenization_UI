import { Router } from 'express';
import {
  submitProperty,
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getTokenizedProperties
} from '../controllers/property.controller';

const router = Router();

router.post('/submit', submitProperty);
router.get('/pending', getPendingProperties);
router.post('/:id/approve', approveProperty);
router.post('/:id/reject', rejectProperty);
router.get('/tokenized', getTokenizedProperties);

export default router;
