import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// TODO: REFACTORIZAR CLASE PARA PERSISTENCIA EN BD
class AuthService {
    constructor() {
        this.users = []; // Usuarios en local
        // TODO: MOVER A BASE DE DATOS PERSISTENCIA
        this.invalidTokens = new Set();

        // Registrar usuario administrador por defecto
        const adminUser = {
            username: process.env.DEFAULT_LOGIN,
            password: process.env.DEFAULT_PASS
        };
        this.register(adminUser);
    }

    register(user) {
        // TODO: Mejorar user.find, probablemente no se necesite con BD
        const existingUser = this.users.find(u => u.username === user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        this.users.push(user);
        console.log('Usuario', user, 'registrado');
        return user;
    }

    validateUser(username, password) {
        // TODO: Mejorar user find, probablemente no se necesite con BD
        const user = this.users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        console.log('Usuario ', user, 'validado');
        return user;
    }

    generateTokens(user) {
        const authToken = this.createToken(user);
        const refreshToken = this.createRefreshToken(user);
        return { authToken, refreshToken };
    }

    createToken(user) {
        const payload = { username: user.username };
        const options = { expiresIn: '1h'};
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    createRefreshToken(user) {
        const payload = { username: user.username };
        const options = { expiresIn: '7d'};
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
    }

    refreshAuthToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = { username: decoded.username };
            return this.createToken(user);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    invalidateTokens(authToken, refreshToken) {
        this.invalidTokens.add(authToken);
        this.invalidTokens.add(refreshToken);
    }

    isTokenInvalid(token) {
        return this.invalidTokens.has(token);
    }
}

export default new AuthService();