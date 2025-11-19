const { hash_password, compare_password } = require('../../utils/password');
const { get_user } = require('../../utils/session');

const partido_actualizar = async (ctx) => {

  const id = Number(ctx.params.id);
  const partido = await ctx.orm.Partido.findOne({
    where: { id }});
  if (!partido) {
    ctx.throw(404, 'partido no encontrado');
  }

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
  if (user.id != partido.creador_id){
    ctx.throw(401, "Unauthorized Access");
  }

  let {
    nombre,
    fecha,
    estado,
    deporte_id,
    cancha_id,
  } =  ctx.request.body;

  if (nombre) {
    partido.nombre = nombre
  }
  if (fecha) {
    partido.fecha = fecha
  }
  if (deporte_id) {
    partido.deporte_id = deporte_id
  }
  if (cancha_id) {
    partido.cancha_id = cancha_id
  }
  if (estado) {
    partido.estado = estado
  }

  try {
    await partido.save();
  } catch (error) {
    ctx.throw(400, "It was not posible to update match");
  }

  ctx.body = {
    partido: {
      id: partido.id,
      nombre: partido.nombre,
      fecha: partido.fecha,
      estado: partido.estado,
      creador_id: partido.creador_id,
      cancha_id: partido.cancha_id,
      deporte_id: partido.deporte_id,
    },
  };
};

module.exports = {
  partido_actualizar,
};
