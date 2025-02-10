import express from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';
import { register } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/register', register);

export default router;