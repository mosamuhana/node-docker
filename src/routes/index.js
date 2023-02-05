const postRoutes = require('./post.routes');
const authRoutes = require('./auth.routes');

const PREFIX = '/api/v1';

function configure(app) {
  app.get(PREFIX, (req, res) => {
    res.send(`<h2>Hello API "${PREFIX}"</h2>`);
  });

  app.use(`${PREFIX}/posts`, postRoutes);
  app.use(`${PREFIX}/auth`, authRoutes);
}

module.exports = configure;
