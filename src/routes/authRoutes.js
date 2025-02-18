import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/authController.js';
import { register } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Login de nuestra API
 */

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
 *           example:
 *             username: admin
 *             password: admin
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
 *     summary: Logout de usuario, borra tokens autorizadas
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout exitoso
 */
router.get('/logout', authenticateToken, logout);

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
 *           example:
 *             username: test
 *             password: test
 *             email: test@test.com
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: Datos inválidos
 */
router.post('/register', register);

export default router;