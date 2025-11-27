// backend/partido/controllers/salirse.js

const salirse_partido = async (ctx) => {
    const usuario_id = ctx.state.user.id; // token decodificado
    const partido_id = ctx.params.id;
  
    try {
      const relacion = await ctx.orm.ParticipaEn.findOne({
        where: { usuario_id, partido_id }
      });
  
      if (!relacion) {
        ctx.status = 400;
        ctx.body = {
          exito: false,
          message: "No estás inscrito en este partido"
        };
        return;
      }
  
      await relacion.destroy();
  
      ctx.body = {
        exito: true,
        message: "Te has salido del partido"
      };
  
    } catch (err) {
      console.error(err);
      ctx.status = 500;
      ctx.body = {
        exito: false,
        message: "Error al salir del partido"
      };
    }
  };
  
  module.exports = {
    salirse_partido,
  };
  