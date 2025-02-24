import express from 'express';
import { crearOrder, getOrderById, getOrderByName } from '../controllers/orderController.js';
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - billingDetails
 *         - shippingDetails
 *         - products
 *         - subtotal
 *         - gastosEnvio
 *         - tasas
 *         - total
 *         - metodoPago
 *       properties:
 *         billingDetails:
 *           type: object
 *           properties:
 *             razonSocial:
 *               type: string
 *               description: Razón social de la empresa
 *             cif:
 *               type: string
 *               description: CIF de la empresa
 *             direccion:
 *               type: string
 *               description: Dirección de facturación
 *             codigoPostal:
 *               type: string
 *               description: Código postal de facturación
 *             ciudad:
 *               type: string
 *               description: Ciudad de facturación
 *             provincia:
 *               type: string
 *               description: Provincia de facturación
 *             pais:
 *               type: string
 *               description: País de facturación
 *             contacto:
 *               type: string
 *               description: Contacto de facturación
 *             telefono:
 *               type: string
 *               description: Teléfono de contacto
 *         shippingDetails:
 *           type: object
 *           properties:
 *             nombre:
 *               type: string
 *               description: Nombre del destinatario
 *             direccion:
 *               type: string
 *               description: Dirección de envío
 *             codigoPostal:
 *               type: string
 *               description: Código postal de envío
 *             ciudad:
 *               type: string
 *               description: Ciudad de envío
 *             provincia:
 *               type: string
 *               description: Provincia de envío
 *             pais:
 *               type: string
 *               description: País de envío
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: Código del producto
 *               producto:
 *                 type: string
 *                 description: Nombre del producto
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del producto
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: Precio del producto
 *               subtotal:
 *                 type: number
 *                 format: float
 *                 description: Subtotal del producto
 *         subtotal:
 *           type: number
 *           format: float
 *           description: Subtotal de la orden
 *         gastosEnvio:
 *           type: number
 *           format: float
 *           description: Gastos de envío
 *         tasas:
 *           type: number
 *           format: float
 *           description: Tasas aplicadas
 *         total:
 *           type: number
 *           format: float
 *           description: Total de la orden
 *         metodoPago:
 *           type: string
 *           description: Método de pago
 *       example:
 *         billingDetails:
 *           razonSocial: Empresa
 *           cif: B36001122
 *           direccion: Dirección empresa
 *           codigoPostal: 36000
 *           ciudad: VIGO
 *           provincia: PONTEVEDRA
 *           pais: ESPAÑA
 *           contacto: Isabel - Enriel
 *           telefono: "+34986001122"
 *         shippingDetails:
 *           nombre: Nombre
 *           direccion: Dirección
 *           codigoPostal: 30000
 *           ciudad: VIGO
 *           provincia: PONTEVEDRA
 *           pais: ESPAÑA
 *         products:
 *           - codigo: COD1
 *             producto: PRODUCTO1
 *             cantidad: 1
 *             precio: 7.10
 *             subtotal: 7.10
 *         subtotal: 7.10
 *         gastosEnvio: 0.00
 *         tasas: 1.49
 *         total: 8.59
 *         metodoPago: pago_credito
 */

/**
 * @swagger
 * /order/createOrder:
 *   post:
 *     summary: Crear una nueva orden
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Orden creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error en la solicitud
 */
router.post('/createOrder', crearOrder);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la orden
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.get('/:id', getOrderById);

/**
 * @swagger
 * /order/name/{name}:
 *   get:
 *     summary: Obtener una orden por nombre
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del cliente
 *     responses:
 *       200:
 *         description: Orden obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Orden no encontrada
 *       400:
 *         description: Error en la solicitud
 */
router.get('/name/:name', getOrderByName);

export default router;