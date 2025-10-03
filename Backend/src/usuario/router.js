const Router = require('@koa/router');
const router = new Router();

router.get('/:id', ctx => {
  ctx.body = 'Hello World';
});

router.get('/buscar/:nombre', ctx => {
  ctx.body = 'Hello World';
});

router.post('/crear', ctx => {
  ctx.body = 'Hello World';
});

router.get('/:id/partido', ctx => {
  ctx.body = 'Hello World';
});

module.exports = router;
