const { compare_password } = require('../../utils/password');
const { sign_token } = require('../../utils/token');

const usuario_login = async (ctx) => {
  const {
    email,
    contrasena,
  } = ctx.request.body;

  const user = await ctx.orm.Usuario.findOne({
    where: { email },
  });

  if (!user) {
    ctx.throw(401, 'Invalid email or password');
  }

  if (!compare_password(contrasena, user.contrasena)) {
    ctx.throw(401, 'Invalid email or password');
  }


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
  usuario_login,
};
