const Koa = require('koa');
const { bodyParser } = require('@koa/bodyparser');

const router = require('./routes');
const models = require('./models');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(bodyParser());

app.context.orm = models;

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
