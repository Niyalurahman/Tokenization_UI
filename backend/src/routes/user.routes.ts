import { Router } from 'express';
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.patch('/:id/role', updateUserRole);
router.patch('/:id/status', updateUserStatus);
router.delete('/:id', deleteUser);

export default router;
