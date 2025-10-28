const validate_content_type = (content_type) => {
  return async (ctx, next) => {
    if (ctx.is(content_type)) {
      await next();
    }
    else {
      ctx.throw(415, `Content-Type should be ${content_type}`);
    }
  }
};

module.exports = {
  validate_content_type,
}
