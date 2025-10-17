const Koa = require('koa');
const { bodyParser } = require('@koa/bodyparser');
const jwt = require('koa-jwt');

const router = require('./routes');
const models = require('./models');

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secreto-jwt';

const app = new Koa();

// Es responsabilidad de middlewares inferiores de revisar
// si un token valido fue otorgado. Si ctx.state.user esta definido.
// si hubo un error de jwt este se encuentra en ctx.state.jwtOriginalError
app.use(jwt({
  secret: JWT_SECRET,
  passthrough: true,
}));

app.use(bodyParser());

app.context.orm = models;

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT);
