const Router = require('@koa/router');
const router = new Router();

router.get('/', ctx => {
  ctx.body = {
    cantidad_partidos: 1,
    partidos: [
      {
        creador_id: 42,
        id: 33,
        nombre: 'pichanga',
        deporte: 'futbol',
        hora_inicio: Date.now(),
        direccion: 'Donde el diablo perdio el poncho',
        ubicacion: { lat: -33.5, lng: -70.6 },
      },
  ],
  };
});

router.get('/:id', ctx => {
  const id = Number(ctx.params.id);
  ctx.body = {
    creador_id: 42,
    id: id,
    nombre: 'pichanga',
    deporte: 'futbol',
    hora_inicio: Date.now(),
    direccion: 'Donde el diablo perdio el poncho',
    ubicacion: { lat: -33.5, lng: -70.6 },
  };
});

router.post('/crear', ctx => {
  const {
    usuario_id,
    nombre,
    deporte,
    hora_inicio,
    direccion,
    ubicacion
  } = ctx.request.body;
  ctx.body = {
    creador_id: usuario_id,
    id: 33,
    nombre,
    deporte,
    hora_inicio,
    direccion,
    ubicacion,
  };
});

router.post('/:id/unirse', ctx => {
  const partido_id = Number(ctx.params.id);
  const usuario_id = Number(ctx.request.body.usuario_id);
  let success = true;
  if ( !partido_id || !usuario_id ){
    success = false;
  }
  ctx.body = { exito: success}
});

module.exports = router;
