import express from 'express';
import { register, login, getProfile, deleteAllUsers } from '../controllers/auth.controller.js';
import protect from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login',    login);
router.get('/profile',   protect, getProfile);  // protected route
router.delete('/users', protect, deleteAllUsers);

export default router;