const express = require('express');
const cors = require('cors')

const connectMongo = require('./db/connect-mongo');
const connectRedis = require('./db/connect-redis');
const configureRoutes = require('./routes');

function main() {
  const app = express();
  
  app.enable('trust proxy');
  app.use(express.json());
  app.use(cors())
  app.use(connectRedis());

  connectMongo();
  configureRoutes(app);
  
  app.get('/', (req, res) => res.send('<h2>Hello Docker</h2>'));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

main();
