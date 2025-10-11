const partido_crear = async (ctx) => {
  const {
    nombre,
    fecha,
    creador_id,
    deporte_id,
    cancha_id,
  } =  ctx.request.body;
  const partido = await ctx.orm.Partido.create({
    creador_id,
    nombre,
    deporte_id,
    fecha,
    cancha_id,
  });
  ctx.body = {
    id: partido.id,
    nombre: partido.nombre,
    fecha: partido.fecha,
    estado: partido.estado,
    creador_id: partido.creador_id,
    cancha_id: partido.cancha_id,
    deporte_id: partido.deporte_id,
  };
};

module.exports = {
  partido_crear,
};
