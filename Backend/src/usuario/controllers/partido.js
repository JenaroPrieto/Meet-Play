const usuario_partido = async (ctx) => {
  const id = Number(ctx.params.id);
  const user = await ctx.orm.Usuario.findOne({
    where: { id },
  });
  if (!user) {
    ctx.throw(404, "Usuario no encontrado");
  }
  const partidos = await user.getPartidos();
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

module.exports = {
  usuario_partido,
};
