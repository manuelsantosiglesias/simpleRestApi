import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
        //TODO: expiresIN a variable .env
        const payload = { username: user.username };
        const options = { expiresIn: process.env.JWT_EXPIRES_IN };
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    }

    createRefreshToken(user) {
        const payload = { username: user.username };
        const options = { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN};
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

    // TODO: no está correcto, trabajar en las tokens inválidas sin cerrar sesión
    invalidateTokens(authToken, refreshToken) {
        this.invalidTokens.add(authToken);
        this.invalidTokens.add(refreshToken);
    }

    isTokenInvalid(token) {
        return this.invalidTokens.has(token);
    }
}

export default new AuthService();