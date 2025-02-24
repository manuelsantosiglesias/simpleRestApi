import Customer from '../models/Customer.js';
import { JsonParser } from '../utils/JsonParser.js';

export const crearCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        Customer.validate(customerData);

        const parser = new JsonParser(Customer);
        const parsedCustomer = parser.parse(customerData);
        // TODO: Petición libra
        res.status(201).json(parsedCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};