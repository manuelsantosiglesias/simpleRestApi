import authService from '../services/authService.js';

export const login = (req, res) => {

    // TODO: IF USER EXISTS INVALIDATE TOKENS
    const { username, password } = req.body;
    try {
        const user = authService.validateUser(username, password);
        const tokens = authService.generateTokens(user);
        res.json({ username: user.username, ...tokens });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    try {
        const newAuthToken = authService.refreshAuthToken(refreshToken);
        res.json({ authToken: newAuthToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    const { authToken, refreshToken } = req.body;
    try {
        authService.invalidateTokens(authToken, refreshToken);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};