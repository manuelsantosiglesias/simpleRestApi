import { Router } from 'express';
import { getPokemon, getPokemonById } from '../controllers/pokemonController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Pokemon
 *   description: API de Pokemon sin autorización externa. Es necesario identificarse en nuestra API para realizar la consulta.
 */

/**
 * @swagger
 * /pokemon:
 *   get:
 *     summary: Obtener todos los Pokémon
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Pokémon obtenida exitosamente
 *       401:
 *         description: No autorizado
 */
router.get('/', authenticateToken, getPokemon);

/**
 * @swagger
 * /pokemon/byId:
 *   get:
 *     summary: Obtener Pokémon por ID
 *     tags: [Pokemon]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Pokémon
 *     responses:
 *       200:
 *         description: Pokémon obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pokémon no encontrado
 */
router.get('/byId', authenticateToken, getPokemonById);

export default router;