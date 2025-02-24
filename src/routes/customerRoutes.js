import express from 'express';
import { crearCustomer } from '../controllers/customerController.js';
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - numeroCliente
 *         - nombre
 *         - cifNif
 *         - direccion
 *         - codigoPostal
 *         - localidad
 *         - pais
 *         - email
 *         - telefono
 *         - movil
 *         - nombreEmpresa
 *       properties:
 *         numeroCliente:
 *           type: integer
 *           description: Número de cliente
 *         nombre:
 *           type: string
 *           description: Nombre del cliente
 *         cifNif:
 *           type: string
 *           description: CIF o NIF del cliente
 *         direccion:
 *           type: string
 *           description: Dirección del cliente
 *         codigoPostal:
 *           type: string
 *           description: Código postal del cliente
 *         localidad:
 *           type: string
 *           description: Localidad del cliente
 *         pais:
 *           type: string
 *           description: País del cliente
 *         email:
 *           type: string
 *           description: Email del cliente
 *         telefono:
 *           type: string
 *           description: Teléfono del cliente
 *         movil:
 *           type: string
 *           description: Móvil del cliente
 *         nombreEmpresa:
 *           type: string
 *           description: Nombre de la empresa del cliente
 *       example:
 *         numeroCliente: 478
 *         nombre: John Doe
 *         cifNif: 12345678A
 *         direccion: 123 Main St
 *         codigoPostal: 36000
 *         localidad: Some City
 *         pais: Some Country
 *         email: mail@mail.com
 *         telefono: "+34123456789"
 *         movil: "+34123456789"
 *         nombreEmpresa: Some Company
 */

/**
 * @swagger
 * /customer/createCustomer:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/createCustomer', crearCustomer);

export default router;