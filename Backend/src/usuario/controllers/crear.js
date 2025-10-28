const { hash_password } = require('../../utils/password');
const { sign_token } = require('../../utils/token');

const usuario_crear = async (ctx) => {
  let {
    nombre,
    email,
    contrasena,
    direccion,
    latitud,
    longitud,
  } = ctx.request.body;

  contrasena = hash_password(contrasena);

  const user = await ctx.orm.Usuario.create({
    nombre,
    email,
    contrasena,
    direccion,
    latitud,
    longitud,
  });


  ctx.body = {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fecha_registro: user.fecha_registro,
      foto_perfil: user.foto_perfil,
      direccion: user.direccion,
      latitud: user.latitud,
      longitud: user.longitud,
    },
    token: sign_token(user.id),
  };
};

module.exports = {
  usuario_crear,
};
