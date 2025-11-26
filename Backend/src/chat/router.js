const Router = require('@koa/router');
const router = new Router();

// Controllers
const { match_chat_messages } = require('./controllers/chat_messages');


// Middlewares
const { validate_content_type } = require('../middleware/validate-content-type');
const validate_json = validate_content_type("application/json");

// Routes
router.get('/partido/:partido_id', match_chat_messages);


module.exports = router;
