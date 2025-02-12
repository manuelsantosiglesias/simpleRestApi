import { apiRequest } from '../handlers/apiHandler.js';
import emailService from '../services/emailService.js';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

export const getPokemon = async (req, res) => {
    try {
        // TODO: PRUEBA DE CONCEPTO PASAR A HANDLER
        const pokemonData = await apiRequest('get', POKEMON_API_URL);
        res.json(pokemonData);
    } catch (error) {
        // MAIL SI NO ES POSIBLE OBTENER LOS DATOS
        await emailService.sendErrorEmail(error.message);
        res.status(500).json({ message: 'Failed to fetch data from external API' });
    }
};