import Order from '../models/Order.js';
import { JsonParser } from '../utils/JsonParser.js';

export const crearOrder = async (req, res) => {
    try {
        const orderData = req.body;

        Order.validate(orderData);
        // Parsear la información con JsonParser
        const parser = new JsonParser(Order);
        const parsedOrder = parser.parse(orderData);
        // TODO: petición libra
        res.status(201).json(parsedOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};