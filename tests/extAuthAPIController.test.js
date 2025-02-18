// AUTO generated test
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loginUser, getCurrentUser } from '../src/controllers/extAuthAPIController';
import * as axiosFactory from '../src/utils/axiosFactory';

const mock = new MockAdapter(axios);

jest.mock('../src/utils/axiosFactory', () => ({
    ...jest.requireActual('../src/utils/axiosFactory'),
    setAuthToken: jest.fn(),
    setRefreshToken: jest.fn(),
    getAuthToken: jest.fn(),
    getRefreshToken: jest.fn(),
}));

describe('extAuthAPIController', () => {
    afterEach(() => {
        mock.reset();
        jest.clearAllMocks();
    });

    it('should login user and set tokens', async () => {
        const req = {
            body: {
                username: 'emilys',
                password: 'emilyspass'
            }
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const responseData = {
            accessToken: 'testAccessToken',
            refreshToken: 'testRefreshToken'
        };

        mock.onPost('https://dummyjson.com/auth/login').reply(200, responseData);

        await loginUser(req, res);

        expect(res.json).toHaveBeenCalledWith(responseData);
        expect(axiosFactory.setAuthToken).toHaveBeenCalledWith('testAccessToken');
        expect(axiosFactory.setRefreshToken).toHaveBeenCalledWith('testRefreshToken');
    });

    it('should fetch current user data', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const userData = {
            id: 1,
            username: 'emilys',
            email: 'emily.johnson@x.dummyjson.com',
            firstName: 'Emily',
            lastName: 'Johnson',
            gender: 'female',
            image: 'https://dummyjson.com/icon/emilys/128'
        };

        const loginResponseData = {
            accessToken: 'testAccessToken',
            refreshToken: 'testRefreshToken'
        };

        axiosFactory.getAuthToken.mockReturnValue('testAccessToken');
        mock.onGet('https://dummyjson.com/auth/me').reply(200, userData);

        await getCurrentUser(req, res);

        expect(res.json).toHaveBeenCalledWith(userData);
    });

    it('should refresh token and fetch current user data', async () => {
        const req = {};
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const userData = {
            id: 1,
            username: 'emilys',
            email: 'emily.johnson@x.dummyjson.com',
            firstName: 'Emily',
            lastName: 'Johnson',
            gender: 'female',
            image: 'https://dummyjson.com/icon/emilys/128'
        };

        const newTokenData = {
            accessToken: 'newTestAccessToken'
        };

        axiosFactory.getAuthToken.mockReturnValue('expiredAccessToken');
        axiosFactory.getRefreshToken.mockReturnValue('testRefreshToken');
        mock.onGet('https://dummyjson.com/auth/me').reply(401);
        mock.onPost('https://dummyjson.com/auth/refresh').reply(200, newTokenData);
        mock.onGet('https://dummyjson.com/auth/me').reply(200, userData);

        await getCurrentUser(req, res);

        expect(res.json).toHaveBeenCalledWith(userData);
    });
});