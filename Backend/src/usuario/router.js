const Router = require('@koa/router');
const router = new Router();

router.get('/:id', ctx => {
  const id = Number(ctx.params.id);
  ctx.body = {
    id: id,
    nombre: `usuario numero #${id}`,
  };
});

router.get('/buscar/:nombre', ctx => {
  const name = ctx.params.nombre;
  ctx.body = {
    id: 42,
    nombre: name,
  };
});

router.post('/crear', ctx => {
  const name = ctx.request.body.nombre;
  ctx.body = {
    id: 42,
    nombre: name,
  };
});

router.get('/:id/partido', ctx => {
  const id = Number(ctx.params.id);
  ctx.body = {
    cantidad_partidos: 1,
    partidos: [
      {
        creador_id: id,
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

module.exports = router;
