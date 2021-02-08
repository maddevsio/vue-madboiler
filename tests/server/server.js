const jsonServer = require('json-server');
const hello = require('./data/hello');

const config = require('./config');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/', (req, res) => {
  res.jsonp(hello);
});

server.listen(config.port, () => {
  console.log(`JSON Server is running on port: ${config.port}`);
});
