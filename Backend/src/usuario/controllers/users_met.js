const { Op } = require("sequelize");

const usuario_conocidos = async (ctx) => {
  const id = Number(ctx.params.id);
  const user = await ctx.orm.Usuario.findOne({
    where: { id },
  });
  if (!user) {
    ctx.throw(404, "Usuario no encontrado");
  }
  const partidos = await user.getPartidos();

  const usersInPartidos = await ctx.orm.ParticipaEn.findAll({
    where: {
      partido_id: {
        [Op.in]: partidos.map((p) => {return p.id})},
      usuario_id: {
        [Op.not]: user.id}},
  });

  let users = new Map();

  usersInPartidos.forEach((userInPartido) => {
    if (users.has(userInPartido.usuario_id)) {
      users.get(userInPartido.usuario_id).push(userInPartido.partido_id);
    } else {
      users.set(userInPartido.usuario_id, [userInPartido.partido_id]);
    }
  });

  ctx.body = {
    usuarios: Object.fromEntries(users)
  }
};

module.exports = {
  usuario_conocidos,
};
