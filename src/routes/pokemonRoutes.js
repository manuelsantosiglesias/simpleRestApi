import express from 'express';
import { getPokemon, getPokemonById } from '../controllers/pokemonController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPokemon);
router.get('/byId', authenticateToken, getPokemonById);

export default router;