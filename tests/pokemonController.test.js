import { getPokemonById } from '../src/controllers/pokemonController.js';
import { apiRequest } from '../src/handlers/apiHandler.js';
import emailService from '../src/services/emailService.js';

jest.mock('../src/handlers/apiHandler.js');
jest.mock('../src/services/emailService.js');

describe('getPokemonById', () => {
    it('should fetch Pokemon data by ID', async () => {
        const req = { query: { id: '1' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        apiRequest.mockResolvedValue({ name: 'bulbasaur' });

        await getPokemonById(req, res);

        expect(apiRequest).toHaveBeenCalledWith('get', 'https://pokeapi.co/api/v2/pokemon/1/');
        expect(res.json).toHaveBeenCalledWith({ name: 'bulbasaur' });
    });

    it('should handle errors and send error email', async () => {
        const req = { query: { id: '9999' } };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
        const error = new Error('Not Found');
        apiRequest.mockRejectedValue(error);

        await getPokemonById(req, res);

        expect(apiRequest).toHaveBeenCalledWith('get', 'https://pokeapi.co/api/v2/pokemon/9999/');
        expect(emailService.sendErrorEmail).toHaveBeenCalledWith('Not Found');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to fetch data from external API' });
    });
});