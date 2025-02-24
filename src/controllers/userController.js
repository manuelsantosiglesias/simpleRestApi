import authService from '../services/authService.js';

// TODO: Not used pendiente de eliminar
export const register = (req, res) => {
    const { username, password } = req.body;
    try {
        const user = authService.register({ username, password });
        res.json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};