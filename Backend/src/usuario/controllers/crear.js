const usuario_crear = async (ctx) => {
  const name = ctx.request.body.nombre;
  const user = await ctx.orm.Usuario.create({ nombre: name });
  ctx.body = {
    id: user.id,
    nombre: user.nombre,
  };
};

module.exports = {
  usuario_crear,
};
