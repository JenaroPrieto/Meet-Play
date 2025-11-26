const Router = require('@koa/router');
const router = new Router();

const partido = require('./partido/router');
const usuario = require('./usuario/router');
const chat = require('./chat/router');

router.get('/', ctx => {
  ctx.body = 'Hello World';
});

router.use('/partido', partido.routes());
router.use('/usuario', usuario.routes());
router.use('/chat', chat.routes());

module.exports = router;
