const partido_all = async (ctx) => {
  const partidos = await ctx.orm.Partido.findAll();
  ctx.body = {
    cantidad_partidos: partidos.length,
    partidos: partidos.map((partido) => {
      return {
        id: partido.id,
        nombre: partido.nombre,
        fecha: partido.fecha,
        estado: partido.estado,
        creador_id: partido.creador_id,
        cancha_id: partido.cancha_id,
        deporte_id: partido.deporte_id,
      };
    }),
  }
};

const partido_buscar_id = async (ctx) => {
  const id = Number(ctx.params.id);
  const partido = await ctx.orm.Partido.findOne({
    where: { id }});
  if (!game) {
    ctx.body = {
      id: null,
    }
  }
  else {
    ctx.body = {
        id: partido.id,
        nombre: partido.nombre,
        fecha: partido.fecha,
        estado: partido.estado,
        creador_id: partido.creador_id,
        cancha_id: partido.cancha_id,
        deporte_id: partido.deporte_id,
    }
  }
};

module.exports = {
  partido_all,
  partido_buscar_id,
};
