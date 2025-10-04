const partido_crear = async (ctx) => {
  const creador_id = ctx.request.body.usuario_id;
  const nombre = ctx.request.body.nombre;
  const deporte = ctx.request.body.deporte;
  const hora_inicio = ctx.request.body.hora_inicio;
  const direccion = ctx.request.body.direccion;
  const { lat, lng } = ctx.request.body.ubicacion;
  const game = await ctx.orm.Partido.create({
    creador_id,
    nombre,
    deporte,
    hora_inicio,
    direccion,
    lat,
    lng
  });
  ctx.body = {
    id: game.id,
    creador_id: game.creador_id,
    nombre: game.nombre,
    deporte: game.deporte,
    hora_inicio: game.hora_inicio,
    direccion: game.direccion,
    ubicacion: { lat: game.lat, lng: game.lng },
  };
};

module.exports = {
  partido_crear,
};
