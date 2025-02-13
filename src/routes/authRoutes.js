import express from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';
import { register } from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout de usuario
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.get('/logout', logout);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refrescar token de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refrescado exitosamente
 *       401:
 *         description: Token inválido
 */
router.post('/refresh', refreshToken);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registro de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', register);

export default router;