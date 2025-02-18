import express from 'express';
import { simpleLogin, getCurrentUser } from '../controllers/extAuthAPIController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ExtAuthAPI
 *   description: External API with Authentication
 */

/**
 * @swagger
 * /extapi/login:
 *   post:
 *     summary: Login user and get tokens
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
 *         description: Login successful
 *       500:
 *         description: Internal server error
 */
router.post('/login', simpleLogin);

/**
 * @swagger
 * /extapi/getUserAutoLogin:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [ExtAuthAPI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to fetch user data
 */
router.get('/getUserAutoLogin', getCurrentUser);

export default router;