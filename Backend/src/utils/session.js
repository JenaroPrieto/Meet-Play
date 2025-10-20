const get_user = (ctx) => {
  let id;
  try {
    id = ctx.state.user.user;
  } catch (error) {
    throw ctx.state.jwtOriginalError;
  }
  return ctx.orm.Usuario.findOne({ where: { id }});
};

module.exports = {
  get_user,
}
