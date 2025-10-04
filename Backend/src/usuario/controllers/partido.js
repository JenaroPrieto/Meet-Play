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

module.exports = {
  usuario_partido,
};
