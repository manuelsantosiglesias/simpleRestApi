import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import authRoutes from './routes/authRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

const app = express();

// Uso de Morgan para logs
app.use(logger);

// TODO: CORS por si se utiliza por webs de otros dominios, probar
app.use(cors());
app.use(express.json());

// Rutas de nuestra API y la externa
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

//TODO: Algun tipo de doc??? SWAGGER-UI??
export default app;