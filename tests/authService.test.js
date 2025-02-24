// AuthService test
// TODO: Revisar generados automáticamente
import { expect } from 'chai';
import sinon from 'sinon';
import authService from '../src/services/authService.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

describe('AuthService', function() {
    let user;

    beforeEach(() => {
        user = { username: 'testuser', password: 'password', tokenVersion: uuidv4() };
        authService.register(user);
    });

    afterEach(() => {
        authService.users = [];
    });

    describe('register', function() {
        it('should register a new user', function() {
            const newUser = { username: 'newuser', password: 'newpassword' };
            const registeredUser = authService.register(newUser);
            expect(registeredUser).to.have.property('username', 'newuser');
            expect(registeredUser).to.have.property('tokenVersion');
        });

        it('should throw an error if user already exists', function() {
            const existingUser = { username: 'testuser', password: 'password' };
            expect(() => authService.register(existingUser)).to.throw('User already exists');
        });
    });

    describe('validateUser', function() {
        it('should validate a user with correct credentials', function() {
            const validatedUser = authService.validateUser(user.username, user.password);
            expect(validatedUser).to.have.property('username', user.username);
        });

        it('should throw an error if credentials are invalid', function() {
            expect(() => authService.validateUser('invaliduser', 'invalidpass')).to.throw('Invalid credentials');
        });
    });

    describe('generateTokens', function() {
        it('should generate tokens for a user', function() {
            const tokens = authService.generateTokens(user);
            expect(tokens).to.have.property('authToken');
            expect(tokens).to.have.property('refreshToken');
        });
    });

    describe('invalidateTokens', function() {
        it('should invalidate tokens by changing tokenVersion', function() {
            const oldTokenVersion = user.tokenVersion;
            const tokens = authService.generateTokens(user);
            authService.invalidateTokens(tokens.authToken);
            const updatedUser = authService.users.find(u => u.username === user.username);
            expect(updatedUser.tokenVersion).to.not.equal(oldTokenVersion);
        });
    });

    describe('isTokenInvalid', function() {
        it('should verify if a token is invalid', function() {
            const tokens = authService.generateTokens(user);
            authService.invalidateTokens(tokens.authToken);
            const isInvalid = authService.isTokenInvalid(tokens.authToken);
            expect(isInvalid).to.be.true;
        });
    });

    describe('refreshAuthToken', function() {
        it('should refresh auth token with valid refresh token', function() {
            const tokens = authService.generateTokens(user);
            const newAuthToken = authService.refreshAuthToken(tokens.refreshToken);
            expect(newAuthToken).to.be.a('string');
        });

        it('should throw an error for invalid refresh token', function() {
            const invalidToken = jwt.sign({ username: 'invaliduser', tokenVersion: uuidv4() }, process.env.REFRESH_TOKEN_SECRET);
            expect(() => authService.refreshAuthToken(invalidToken)).to.throw('Invalid refresh token');
        });
    });
});
