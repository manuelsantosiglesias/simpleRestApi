import Customer from '../models/Customer.js';
import { JsonParser } from '../utils/JsonParser.js';

export const crearCustomer = async (req, res) => {
    try {
        const customerData = req.body;
        const customer = await Customer.create(customerData);

        // Parsear la información con JsonParser
        const parser = new JsonParser(Customer);
        const parsedCustomer = parser.parse(customer);

        res.status(201).json(parsedCustomer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(parseInt(id, 10));
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCustomerByName = async (req, res) => {
    try {
        const { name } = req.params;
        const customer = await Customer.findByName(name);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};