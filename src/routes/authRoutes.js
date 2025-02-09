import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { register } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);

export default router;