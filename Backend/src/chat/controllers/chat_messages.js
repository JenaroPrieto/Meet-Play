const { Op } = require("sequelize");
const { get_user } = require('../../utils/session');

const match_chat_messages = async (ctx) => {

  let user = null;
  try {
    user = await get_user(ctx);
  } catch (error) {
    if (error === ctx.state.jwtOriginalError){
      ctx.throw(401, "unauthorized Access");
    }
    throw error;
  }

  const match_id = Number(ctx.params.partido_id);
  const match = await ctx.orm.Partido.findOne({
    where: { id: match_id }});
  if (!match) {
    ctx.throw(404, 'partido no encontrado');
  }

  if (!await match.hasParticipante(user)) {
    ctx.throw(400, 'Usuario no participa de este partido');
  }

  const [chat, created] = await ctx.orm.Chat.FindOrCreate({
    where: { partido_id: match_id },
    defaults: { nombre: "Chat De Partido" },
  });
  if (created) {
    ctx.body = {
      chat: {
        id: chat.id,
        nombre: chat.nombre,
        partido_id: chat.partido_id
      },
      mensajes: [ ],
    }
  } else {
    let where = {};
    let fecha_envio = {};
    if ('before_date' in ctx.query) {
      fecha_envio[Op.lt] = ctx.query.before_date;
      where.fecha_envio = fecha_envio;
    }
    if ('after_date' in ctx.query) {
      fecha_envio[Op.gt] = ctx.query.after_date;
      where.fecha_envio = fecha_envio;
    }
    let messages = await chat.getMensajes({
      where,
      order: [['fecha_envio', 'ASC']]
    });
    ctx.body = {
      chat: {
        id: chat.id,
        nombre: chat.nombre,
        partido_id: chat.partido_id
      },
      mensajes: messages.map((message) => {
        return {
          id: message.id,
          fecha_envio: message.fecha_envio,
          contenido: message.contenido,
          usuario_id: message.usuario_id,
          chat_id: message.chat_id
        };
      }),
    }
  }
};

module.exports = {
  match_chat_messages
};
