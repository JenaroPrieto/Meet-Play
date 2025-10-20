const Router = require('@koa/router');
const router = new Router();

// Controllers
const { partido_crear } = require('./controllers/crear');
const {
  partido_all,
  partido_buscar_id
} = require('./controllers/buscar');
const { partido_unirse } = require('./controllers/participante');

// Helper Middlewares
const { validate_content_type } = require('../middleware/validate-content-type');
const validate_json = validate_content_type("application/json");

router.get('/', partido_all);

router.get('/:id', partido_buscar_id);

router.post('/crear', validate_json, partido_crear);

router.post('/:id/unirse', partido_unirse);

module.exports = router;
