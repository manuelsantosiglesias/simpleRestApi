import morgan from 'morgan';
import { createStream } from 'rotating-file-stream';
import path from 'path';
import { fileURLToPath } from 'url';

// path de los ficheros de logs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichero de logs rotativo
const accessLogStream = createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, '../log') // Ajusta la ruta según sea necesario
});

// Formato personalizado
morgan.token('headers', function (req) {
    return JSON.stringify(req.headers);
});

morgan.token('remote-addr', function (req) {
    return req.ip || req.connection.remoteAddress;
});

morgan.token('remote-connection', function (req) {
    return JSON.stringify({
        remoteAddress: req.connection.remoteAddress,
        remotePort: req.connection.remotePort,
        localAddress: req.connection.localAddress,
        localPort: req.connection.localPort
    });
});

const customFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :headers :remote-connection';

// Configuración de Morgan para logs
const logger = morgan(customFormat, { stream: accessLogStream });

export default logger;