const { Router } = require('express');

const { getAll, getOne, create, update, remove } = require('../controllers/post.controller');
const authenticated = require('../middlewares/auth.middleware');

const router = Router();

router.route('/')
  .get(getAll)
  .post(authenticated, create);

router.route('/:id')
  .get(getOne)
  .put(authenticated, update)
  .delete(authenticated, remove);

module.exports = router;
