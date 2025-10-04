const usuario_buscar_nombre = async (ctx) => {
  const name = ctx.params.nombre;
  const user = await ctx.orm.Usuario.findOne({
    where: { nombre: name }});
  if (!user) {
    ctx.body = {
      id: null,
      nombre: null,
    };
  }
  else {
    ctx.body = {
      id: user.id,
      nombre: user.nombre,
    };
  }
};

const usuario_buscar_id = async (ctx) => {
  const id = Number(ctx.params.id);
  const user = await ctx.orm.Usuario.findOne({
    where: { id }});
  if (!user) {
    ctx.body = {
      id: null,
      nombre: null,
    };
  }
  else {
    ctx.body = {
      id: user.id,
      nombre: user.nombre,
    };
  }
};

module.exports = {
  usuario_buscar_nombre,
  usuario_buscar_id,
};
