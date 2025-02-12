// AuthService test
// TODO: Revisar generados automáticamente
import authService from '../src/services/authService.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

describe('AuthService', () => {
    let user;

    beforeEach(() => {
        user = { username: 'testuser', password: 'password', tokenVersion: uuidv4() };
        authService.register(user);
    });

    afterEach(() => {
        authService.users = [];
    });

    test('should register a new user', () => {
        const newUser = { username: 'newuser', password: 'newpassword' };
        const registeredUser = authService.register(newUser);
        expect(registeredUser.username).toBe(newUser.username);
        expect(registeredUser).toHaveProperty('tokenVersion');
    });

    test('should validate a user with correct credentials', () => {
        const validatedUser = authService.validateUser(user.username, user.password);
        expect(validatedUser.username).toBe(user.username);
    });

    test('should throw an error for invalid credentials', () => {
        expect(() => {
            authService.validateUser(user.username, 'wrongpassword');
        }).toThrow('Invalid credentials');
    });

    test('should generate tokens for a user', () => {
        const tokens = authService.generateTokens(user);
        expect(tokens).toHaveProperty('authToken');
        expect(tokens).toHaveProperty('refreshToken');
    });

    test('should invalidate tokens by changing tokenVersion', () => {
        const oldTokenVersion = user.tokenVersion;
        const tokens = authService.generateTokens(user);
        authService.invalidateTokens(tokens.authToken);
        const updatedUser = authService.users.find(u => u.username === user.username);
        expect(updatedUser.tokenVersion).not.toBe(oldTokenVersion);
    });

    test('should verify if a token is invalid', () => {
        const tokens = authService.generateTokens(user);
        authService.invalidateTokens(tokens.authToken);
        const isInvalid = authService.isTokenInvalid(tokens.authToken);
        expect(isInvalid).toBe(true);
    });

    test('should refresh auth token with valid refresh token', () => {
        const tokens = authService.generateTokens(user);
        const newAuthToken = authService.refreshAuthToken(tokens.refreshToken);
        expect(newAuthToken).toBeDefined();
    });

    test('should throw an error for invalid refresh token', () => {
        const invalidToken = jwt.sign({ username: 'invaliduser', tokenVersion: uuidv4() }, process.env.REFRESH_TOKEN_SECRET);
        expect(() => {
            authService.refreshAuthToken(invalidToken);
        }).toThrow('Invalid refresh token');
    });
});
