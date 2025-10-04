const Router = require('@koa/router');
const router = new Router();

// Controllers
const { usuario_crear } = require('./controllers/crear');
const {
  usuario_buscar_nombre,
  usuario_buscar_id
} = require('./controllers/buscar');
const { usuario_partido } = require('./controllers/partido');

// Helper Middlewares
const { validate_content_type } = require('../middleware/validate-content-type');
const validate_json = validate_content_type("application/json");

router.get('/:id', usuario_buscar_id);

router.get('/buscar/:nombre', usuario_buscar_nombre);

router.post('/crear', validate_json, usuario_crear);

router.get('/:id/partido', usuario_partido);

module.exports = router;
