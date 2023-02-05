const expressSession = require("express-session");
const connectRedis = require("connect-redis");
const { createClient } = require("redis");

const { REDIS_HOST, REDIS_PORT, SESSION_SECRET } = require("../config");

const RedisStore = connectRedis(expressSession);

function _connect() {
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT,  
    },
  });

  redisClient.connect()
    .then(() => console.log('Redis connected successfully.'))
    .catch(console.error)

  return expressSession({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      resave: false,
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  })
};

module.exports = _connect;
