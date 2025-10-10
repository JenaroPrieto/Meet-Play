const usuario_crear = async (ctx) => {
  const {
    nombre,
    email,
    contrasena,
    direccion,
    latitud,
    longitud,
  } = ctx.request.body;
  const user = await ctx.orm.Usuario.create({
    nombre,
    email,
    contrasena,
    direccion,
    latitud,
    longitud,
  });
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
};

module.exports = {
  usuario_crear,
};
