import express from 'express';
import cors from 'cors';
import logger from './utils/logger.js';
import swaggerRouter from './utils/swagger.js';
import authRoutes from './routes/authRoutes.js';
import pokemonRoutes from './routes/pokemonRoutes.js';
import extAuthAPIRoutes from './routes/extAuthAPIRoutes.js';

const app = express();

// Uso de Morgan para logs
app.use(logger);

// TODO: revisar uso de CORS
app.use(cors());
app.use(express.json());

// Documentación de la API con Swagger
app.use(swaggerRouter);

// Rutas de nuestra API
app.use('/auth', authRoutes);
app.use('/pokemon', pokemonRoutes);

// Rutas de la API externa
app.use('/extapi', extAuthAPIRoutes);

export default app;