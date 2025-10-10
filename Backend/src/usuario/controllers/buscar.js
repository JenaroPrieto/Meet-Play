const usuario_buscar_nombre = async (ctx) => {
  const name = ctx.params.nombre;
  const user = await ctx.orm.Usuario.findOne({
    where: { nombre: name }});
  if (!user) {
    ctx.body = {
      id: null,
    };
  }
  else {
    ctx.body = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fecha_registro: user.fecha_registro,
      foto_perfil: user.foto_perfil,
      direccion: user.direccion,
      latitud: user.latitud,
      longitud: user.longitud,
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
    };
  }
  else {
    ctx.body = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fecha_registro: user.fecha_registro,
      foto_perfil: user.foto_perfil,
      direccion: user.direccion,
      latitud: user.latitud,
      longitud: user.longitud,
    };
  }
};

module.exports = {
  usuario_buscar_nombre,
  usuario_buscar_id,
};
