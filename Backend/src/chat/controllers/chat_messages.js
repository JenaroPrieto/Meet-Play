const { Op } = require("sequelize");
const { get_user } = require('../../utils/session');

const match_chat_messages = async (ctx) => {
  let user;

  try {
    user = await get_user(ctx);
  } catch (error) {
    if (error === ctx.state.jwtOriginalError) {
      ctx.throw(401, "unauthorized Access");
    }
    throw error;
  }

  const match_id = Number(ctx.params.partido_id);

  const match = await ctx.orm.Partido.findOne({
    where: { id: match_id }
  });

  if (!match) {
    ctx.throw(404, "partido no encontrado");
  }

  // Si el usuario NO participa → 401
  const participa = await match.hasParticipante(user);
  if (!participa) {
    ctx.throw(401, "Usuario no participa de este partido");
  }

  // -----------------------------------------
  // 🔥 FIX PRINCIPAL: findOrCreate (NO FindOrCreate)
  // -----------------------------------------
  const [chat, created] = await ctx.orm.Chat.findOrCreate({
    where: { partido_id: match_id },
    defaults: { nombre: "Chat De Partido" }
  });

  // Si recién creado, no hay mensajes aún
  if (created) {
    ctx.body = {
      chat: {
        id: chat.id,
        nombre: chat.nombre,
        partido_id: chat.partido_id,
      },
      mensajes: [],
    };
    return;
  }

  // Filtros opcionales
  const where = {};
  if (ctx.query.before_date) {
    where.fecha_envio = { ...(where.fecha_envio || {}), [Op.lt]: ctx.query.before_date };
  }
  if (ctx.query.after_date) {
    where.fecha_envio = { ...(where.fecha_envio || {}), [Op.gt]: ctx.query.after_date };
  }

  // Obtener mensajes
  const messages = await chat.getMensajes({
    where,
    order: [['fecha_envio', 'ASC']]
  });

  ctx.body = {
    chat: {
      id: chat.id,
      nombre: chat.nombre,
      partido_id: chat.partido_id,
    },
    mensajes: messages.map(m => ({
      id: m.id,
      fecha_envio: m.fecha_envio,
      contenido: m.contenido,
      usuario_id: m.usuario_id,
      chat_id: m.chat_id
    })),
  };
};


const send_message = async (ctx) => {
  let user_id;

  try {
    user_id = ctx.state.user.user;
  } catch (error) {
    ctx.throw(401, "unauthorized Access");
  }

  const chat_id = Number(ctx.params.chat_id);
  const contenido = ctx.request.body.contenido;

  if (!contenido || contenido.trim() === "") {
    ctx.throw(400, "Mensaje vacío");
  }

  const message = await ctx.orm.Mensaje.create({
    contenido,
    usuario_id: user_id,
    chat_id
  });

  ctx.body = {
    mensaje: {
      id: message.id,
      fecha_envio: message.fecha_envio,
      contenido: message.contenido,
      usuario_id: message.usuario_id,
      chat_id: message.chat_id
    }
  };
};

module.exports = {
  match_chat_messages,
  send_message
};
