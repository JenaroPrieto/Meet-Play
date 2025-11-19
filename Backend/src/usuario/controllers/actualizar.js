const { hash_password, compare_password } = require('../../utils/password');
const { get_user } = require('../../utils/session');

const usuario_actualizar = async (ctx) => {

  let user = null;
  try {
    user = await get_user(ctx);
  } catch (error) {
    if (error === ctx.state.jwtOriginalError){
      ctx.throw(401, "Unauthorized Access");
    }
    throw error;
  }
  if (user == null){
    ctx.throw(404, "User not Found");
  }

  let {
    nombre,
    email,
    contrasena,
    nueva_contrasena,
    direccion,
    latitud,
    longitud,
  } = ctx.request.body;

  if (nueva_contrasena) {
    if (!contrasena) {
      ctx.throw(400, "Must provide current password to change it")
    }
    if (compare_password(contrasena, user.contrasena)){
      user.contrasena = hash_password(nueva_contrasena);
    } else {
      ctx.throw(400, "Must provide current password to change it")
    }
  }

  if (nombre) {
    user.nombre = nombre
  }
  if (email) {
    user.email = email
  }
  if (direccion) {
    user.direccion = direccion
  }
  if (latitud) {
    user.latitud = latitud
  }
  if (longitud) {
    user.longitud = longitud
  }

  try {
    await user.save();
  } catch (error) {
    ctx.throw(400, "It was not posible to update user");
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
  };
};

module.exports = {
  usuario_actualizar,
};
