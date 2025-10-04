const partido_all = async (ctx) => {
  const partidos = await ctx.orm.Partido.findAll();
  ctx.body = {
    cantidad_partidos: partidos.length,
    partidos: partidos.map((partido) => {
      return {
        creador_id: partido.creador_id,
        id: partido.id,
        nombre: partido.nombre,
        deporte: partido.deporte,
        hora_inicio: partido.hora_inicio,
        direccion: partido.direccion,
        ubicacion: { lat: partido.lat, lng: partido.lng },
      };
    }),
  }
};

const partido_buscar_id = async (ctx) => {
  const id = Number(ctx.params.id);
  const game = await ctx.orm.Partido.findOne({
    where: { id }});
  if (!game) {
    ctx.body = {
      id: null,
    }
  }
  else {
    ctx.body = {
      creador_id: game.creador_id,
      id: game.id,
      nombre: game.nombre,
      deporte: game.deporte,
      hora_inicio: game.hora_inicio,
      direccion: game.direccion,
      ubicacion: { lat: game.lat, lng: game.lng },
    }
  }
};

module.exports = {
  partido_all,
  partido_buscar_id,
};
