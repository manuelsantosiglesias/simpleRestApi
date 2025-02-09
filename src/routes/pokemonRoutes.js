import express from 'express';
import { getPokemon } from '../controllers/pokemonController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authenticateToken, getPokemon);

export default router;