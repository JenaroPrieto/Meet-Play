const Router = require('@koa/router');
const router = new Router();

// Controllers
const { usuario_crear } = require('./controllers/crear');
const {
  usuario_buscar_nombre,
  usuario_buscar_id
} = require('./controllers/buscar');
const { usuario_partido } = require('./controllers/partido');
const { usuario_login } = require('./controllers/login');
const { usuario_conocidos } = require('./controllers/users_met');
const { usuario_actualizar } = require('./controllers/actualizar');

const { usuario_actualizar } = require('./controllers/actualizar');


// Helper Middlewares
const { validate_content_type } = require('../middleware/validate-content-type');
const validate_json = validate_content_type("application/json");

router.post('/login', validate_json, usuario_login);

router.get('/:id', usuario_buscar_id);

router.get('/buscar/:nombre', usuario_buscar_nombre);

router.post('/crear', validate_json, usuario_crear);

router.get('/:id/partido', usuario_partido);

router.get('/:id/met', usuario_conocidos);

router.put('/update', validate_json, usuario_actualizar);

module.exports = router;
