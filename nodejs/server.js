const http = require('http')

const app = require('./App')

const PORT = 3002;

const server = http.createServer(app);

server.listen(PORT);