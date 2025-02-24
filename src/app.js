import express from 'express';
import cors from 'cors';
import { accessLogger } from './utils/logger.js';
import swaggerRouter from './utils/swagger.js';
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Uso de Morgan para logs
app.use(accessLogger);

// TODO: revisar CORS
app.use(cors());
app.use(express.json());

// Documentación de la API con Swagger
app.use(swaggerRouter);

// Rutas de nuestra API
app.use('/auth', authRoutes);
app.use('/customer', customerRoutes);
app.use('/order', orderRoutes);

export default app;