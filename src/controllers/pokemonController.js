import { apiRequest } from '../handlers/apiHandler.js';
import emailService from '../services/emailService.js';
import { JsonParser } from '../utils/JsonParser.js';
import { Pokemon } from '../models/Pokemon.js';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const POKEMON_API_URL_BY_ID = 'https://pokeapi.co/api/v2/pokemon/';

export const getPokemon = async (req, res) => {
    try {
        //TODO: AÑADIR FACTORY Y HANDLER DE SOAP
        const pokemonData = await apiRequest('get', POKEMON_API_URL);
        const parser = new JsonParser(Pokemon);
        const parsedData = parser.parse(pokemonData.results); // Asumiendo que la respuesta tiene una propiedad 'results'
        res.json(parsedData);
    } catch (error) {
        // TODO: REVISAR MAIL
        console.log(error);
        await emailService.sendErrorEmail(error.message);
        res.status(500).json({ message: 'Failed to fetch data from external API' });
    }
};

export const getPokemonById = async (req, res) => {
    const { id } = req.query;
    console.log(`Fetching data for Pokemon ID: ${id}`);
    try {
        const url = `${POKEMON_API_URL_BY_ID}${id}/`;
        const pokemonData = await apiRequest('get', url);
        res.json(pokemonData);
    } catch (error) {
        console.log(error);
        await emailService.sendErrorEmail(error.message);
        res.status(500).json({ message: 'Failed to fetch data from external API' });
    }
};