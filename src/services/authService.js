import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import '../config/config.js';

// TODO: REFACTORIZAR CLASE PARA PERSISTENCIA EN BD
// TODO: Login que devuelva nombre de usuario
class AuthService {
    constructor() {
        this.users = []; // Usuarios en local
        // TODO: MOVER A BASE DE DATOS PERSISTENCIA
        // USAR TOKEN VERSIONS Y UUID, cambiar UUID en logout
        this.invalidTokens = new Set();

        // Registrar usuario administrador por defecto
        const adminUser = {
            username: process.env.DEFAULT_LOGIN,
            password: process.env.DEFAULT_PASS,
            tokenVersion: uuidv4()
        };
        this.register(adminUser);
    }

    register(user) {
        // TODO: Mejorar user.find, probablemente no se necesite con BD
        const existingUser = this.users.find(u => u.username === user.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        user.tokenVersion = uuidv4();
        this.users.push(user);
        return user;
    }

    validateUser(username, password) {
        // TODO: Mejorar user find, probablemente no se necesite con BD
        const user = this.users.find(u => u.username === username && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return user;
    }

    generateTokens(user) {
        const authToken = this.createToken(user);
        const refreshToken = this.createRefreshToken(user);
        return { authToken, refreshToken };
    }

    createToken(user) {
        //TODO: expiresIN a variable .env
        const payload = { username: user.username, tokenVersion: user.tokenVersion  };
        const options = { expiresIn: process.env.JWT_EXPIRES_IN };
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    createRefreshToken(user) {
        const payload = { username: user.username, tokenVersion: user.tokenVersion  };
        const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN};
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
    }

    refreshAuthToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = this.users.find(u => u.username === decoded.username);
            if (!user || user.tokenVersion !== decoded.tokenVersion) {
                throw new Error('Invalid refresh token');
            }
            return this.createToken(user);
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    // TODO: no está correcto, trabajar en las tokens inválidas sin cerrar sesión
    invalidateTokens(authToken) {
        try {
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
            const user = this.users.find(u => u.username === decoded.username);
            if (user) {
                user.tokenVersion = uuidv4(); // Cambiar tokenVersion al invalidar tokens
            }
        } catch (error) {
            throw new Error('Invalid token');
        }
    }

    isTokenInvalid(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = this.users.find(u => u.username === decoded.username);
            return !user || user.tokenVersion !== decoded.tokenVersion;
        } catch (error) {
            return true;
        }
    }
}

export default new AuthService();