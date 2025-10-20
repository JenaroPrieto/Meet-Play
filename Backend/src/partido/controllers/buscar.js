const { get_user } = require('../../utils/session');
const { distance } = require('../../utils/great_circle_distance');

const partido_all = async (ctx) => {

  // get user if session token is valid
  let user = null;
  try {
    user = await get_user(ctx);
  } catch (error) {
    console.log(error);
    if (!(error === ctx.state.jwtOriginalError)){
      throw error;
    }
  }

  let estado = 'abierto';
  const valid_estados = ('cerrado', 'abierto');
  if ('estado' in ctx.query) {
    if (ctx.query.estado == 'todos') {
      estado = undefined;
    } else if (ctx.query.estado in valid_estados) {
      estado = ctx.query.estado;
    } else {
      ctx.throw(400, 'estado invalido');
    }
  }

  let incluir_pasados = false;
  if ('incluir_pasados' in ctx.query) {
    if (ctx.query.incluir_pasados == 'true') {
      incluir_pasados = true;
    } else if (ctx.query.incluir_pasados == 'false') {
      incluir_pasados = false;
    } else {
      ctx.throw(400, 'incluir_pasados invalido');
    }
  }
  
  let offset = 0;
  if ('offset' in ctx.query) {
    offset = parseInt(ctx.query.offset, 10);
    if (offset == NaN) {
      ctx.throw(400, 'invalid offset, must be a positive number');
    } else if (offset >= 0) {
      ctx.throw(400, 'invalid offset, must be a positive number');
    }
  }

  let limit = 10;
  if ('limit' in ctx.query) {
    limit = parseInt(ctx.query.offset, 10);
    if (limit == NaN) {
      ctx.throw(400, 'invalid limit, must be a positive number');
    } else if (limit >= 0) {
      ctx.throw(400, 'invalid limit, must be a positive number');
    }
  }

  let where = {};
  if (estado != undefined){
    where.estado = estado;
  }
  if (incluir_pasados){
    where.fecha = {
      [Op.gt]: new Date(),
    }
  }

  const partidos = await ctx.orm.Partido.findAll({
    where,
    order: [ ['fecha', 'ASC'] ],
    limit,
    offset,
  });

  let deportes = [];
  let id_deportes = new Set();
  let canchas = [];
  let id_canchas = new Set();
  for (const partido of partidos){
    if (!id_deportes.has(partido.deporte_id)) {
      id_deportes.add(partido.deporte_id);
      deportes.push(await partido.getDeporte());
    }
    if (!id_canchas.has(partido.cancha_id)) {
      id_canchas.add(partido.cancha_id);
      canchas.push(await partido.getCancha());
    }
  };

  ctx.body = {
    cantidad_partidos: partidos.length,
    partidos: await Promise.all(partidos.map(async (partido) => {
      return {
        id: partido.id,
        nombre: partido.nombre,
        fecha: partido.fecha,
        estado: partido.estado,
        creador_id: partido.creador_id,
        cancha_id: partido.cancha_id,
        deporte_id: partido.deporte_id,
        participantes: await partido.countParticipantes(),
        usuario_participa: user ? await partido.hasParticipante(user) : undefined,
      };
    })),
    deportes: deportes.map((deporte) => {
      return {
        id: deporte.id,
        nombre: deporte.nombre,
        max_participantes: deporte.max_participantes
      };
    }),
    canchas: canchas.map((cancha) => {
      return {
        id: cancha.id,
        nombre: cancha.nombre,
        direccion: cancha.direccion,
        comuna: cancha.comuna,
        latitud: cancha.latitud,
        longitud: cancha.longitud,
        distancia: user ? distance(user.latitud, cancha.latitud, user.longitud, cancha.longitud) : undefined,
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
