import express from 'express';
import bodyParser from 'body-parser';
import logging from './config/logging';
import config from './config/config';
import bookRoutes from './routes/book';
import authorRoutes from './routes/author';
import genreRoutes from './routes/genre';

const NAMESPACE = 'Server';
const app = express();

// Log request
app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });

    next();
});

// Parse the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rules
app.use((req, res, next) => {
    // Request can come from anywhere
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Get the API options
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/genre', genreRoutes);

// Error handling
app.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });
});

// Create server
logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`);
app.listen(config.server.port);
