import { Router } from 'express';
import { simpleLogin, getCurrentUser } from '../controllers/extAuthAPIController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ExtAuthAPI
 *   description: API Externa con autentificación. Solo se necesita la autenticación externa para realizar la consulta.
 */

/**
 * @swagger
 * /extapi/login:
 *   post:
 *     summary: Función externa de login
 *     tags: [ExtAuthAPI]
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
 *             username: emilys
 *             password: emilyspass
 *     responses:
 *       200:
 *         description: Login OK
 *       500:
 *         description: Fallo al hacer login
 */
router.post('/login', simpleLogin);

/**
 * @swagger
 * /extapi/getUserAutoLogin:
 *   get:
 *     summary: Función getUser con login y manejo de tokens automático
 *     tags: [ExtAuthAPI]
 *     responses:
 *       200:
 *         description: Ok información de usuario
 *       401:
 *         description: Sin autorización
 *       500:
 *         description: Fallo al obtener autorización
 */
router.get('/getUserAutoLogin', getCurrentUser);

export default router;