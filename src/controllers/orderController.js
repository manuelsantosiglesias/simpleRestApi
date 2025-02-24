import Order from '../models/Order.js';
import { JsonParser } from '../utils/JsonParser.js';

export const crearOrder = async (req, res) => {
    try {
        const orderData = req.body;
        const order = await Order.create(orderData);

        // Parsear la información con JsonParser
        const parser = new JsonParser(Order);
        const parsedOrder = parser.parse(order);

        res.status(201).json(parsedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(parseInt(id, 10));
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getOrderByName = async (req, res) => {
    try {
        const { name } = req.params;
        const orders = await Order.findByName(name);
        if (orders.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};