import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default {
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
};