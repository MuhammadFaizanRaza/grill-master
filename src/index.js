const http = require('http');

/**
 * Load Config before any other file
 * this ensures that all necessary env vars are provided and valid to run server
 */
const { ENV, PORT } = require('./config');

/**
 * Require express app
 */
const app = require('./app');

/**
 * Start server on PORT defined in config
 */
const server = http.createServer(app);

server.listen(PORT, console.log(`Server Started On Port ${PORT} (${ENV})`));
