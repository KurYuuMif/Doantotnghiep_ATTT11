import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { getKeys, deleteKey, createKey } from '../controllers/keyController.js';
const router = express.Router();

router.get('/', authenticate, getKeys);
router.post('/create', authenticate, createKey);
router.delete('/:id', authenticate, deleteKey);

export default router;
