const { get_user } = require('../../utils/session');

const partido_unirse = async (ctx) => {
  // get user if session token is valid
  let user = null;
  try {
    user = await get_user(ctx);
  } catch (error) {
    if (error === ctx.state.jwtOriginalError){
      ctx.throw(401, "Unathorized Access")
    }
    throw error;
  }

  const id = Number(ctx.params.id);
  const game = await ctx.orm.Partido.findOne({
    where: { id },
    include: 'deporte'
  });
  if (!game) {
    ctx.throw(404, 'partido no encontrado');
  }
  if (!user) {
    ctx.throw(404, 'usuario no encontrado');
  }

  if (await game.hasParticipante(user)){
    ctx.body = { succes: false, message: 'usuario ya participa de este partido' }
  } else if (await game.countParticipantes() >= game.deporte.max_participantes) {
    ctx.body = { succes: false, message: 'partido ya se encuentra lleno' }
  } else {
    await game.addParticipante(user);
    ctx.body = { succes: true };
  }
};

module.exports = {
  partido_unirse
};
