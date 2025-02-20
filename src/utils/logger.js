import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichero de logs rotativo para access.log
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, '../log')
});

// Fichero de logs rotativo para error.log
const errorLogStream = createStream('error.log', {
    interval: '1d',
    path: path.join(__dirname, '../log')
});

// Formato personalizado para errores
morgan.token('headers', function (req) {
    return JSON.stringify(req.headers);
});

morgan.token('remote-addr', function (req) {
    return req.ip || req.socket.remoteAddress;
});

morgan.token('remote-connection', function (req) {
    return JSON.stringify({
        remoteAddress: req.socket.remoteAddress,
        remotePort: req.socket.remotePort,
        localAddress: req.socket.localAddress,
        localPort: req.socket.localPort
    });
});

const customFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :headers :remote-connection';

// Peticiones
const accessLogger = morgan(customFormat, { stream: accessLogStream });

// Errores
const logError = (errorMessage) => {
    const logMessage = `${new Date().toISOString()} - ${errorMessage}\n`;
    fs.appendFile(path.join(__dirname, '../log/error.log'), logMessage, (err) => {
        if (err) {
            console.error('Failed to write to error.log:', err);
        }
    });
};

export { accessLogger, logError };