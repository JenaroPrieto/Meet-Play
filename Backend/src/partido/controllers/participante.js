const partido_unirse = async (ctx) => {
  const id = Number(ctx.params.id);
  const game = await ctx.orm.Partido.findOne({
    where: { id }});
  if (!game) {
    ctx.body = {
      exito: false,
    }
  }
  const usuario_id = Number(ctx.request.body.usuario_id);
  const user = await ctx.orm.Usuario.findOne({
    where: { id: usuario_id }});
  if (!user) {
    ctx.body = {
      exito: false,
    }
  }

  await game.addParticipante(user);

  ctx.body = { succes: true };
};

module.exports = {
  partido_unirse
};
