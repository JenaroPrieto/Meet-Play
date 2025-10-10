# Meet&Play Backend

## Tecnologias

- nodejs
- Koa.js
- Koa-router
- sequelize

## Instruciones de uso

### ENV

- PORT          (default: 3000)
- DB_USER
- DB_PASS
- DB_NAME
- DB_HOST       (default: localhost
- DB_PORT       (default: 5432)
- DB_DIALECT    (default postgres)

### comandos

uso local (puerto 3000):

obtiene depedencias

    npm install 

inicia el servicio en modo desarrollo

    npm run dev

## Docs

### usuario

#### nuevo usuario

    POST /usuario/crear

crea un nuevo usuario y retorn su información

##### request body
    
    {
        nombre: <string>,
    }

##### response body

    {
        id: <numero>,
        nombre: <nombre>,
        email: <string>,
        fecha_registro: <DateTime>,
        foto_perfil: <string>,
        direccion: <string>,
        latitud: <numero>,
        longitud: <numero>,
    }

#### buscar usuario

    GET /usuario/:id
    GET /usuario/buscar/:nombre

retorna la información del usuario

##### response body

    {
        id: <numero> || null,
        nombre?: <nombre>,
        email?: <string>,
        fecha_registro?: <DateTime>,
        foto_perfil?: <string>,
        direccion?: <string>,
        latitud?: <numero>,
        longitud?: <numero>,
    }

#### partidos en los que participa

    GET /usuario/:id/partido

retorna una lista de partidos donde participa

##### response body

    {
        cantidad_partidos: <numero>
        partidos: [...{
            id: <number>,
            nombre: <string>,
            fecha: <datetime>,
            estado: <string>,
            creador_id: <string>,
            deporte_id: <string>,
            cancha_id: <string>,
        }...]
    }

### partido

#### listar partidos

    GET /partido

retorna una lista de partidos

##### response body

    {
        cantidad_partidos: <numero>
        partidos: [...{
            id: <number>,
            nombre: <string>,
            fecha: <datetime>,
            estado: <string>,
            creador_id: <string>,
            deporte_id: <string>,
            cancha_id: <string>,
        }...]
    }


#### info de partido

    GET /partido/:id

si existe, retorna la información de ese partido

##### response body

    {
        id: <number>,
        nombre: <string>,
        fecha: <datetime>,
        estado: <string>,
        creador_id: <string>,
        deporte_id: <string>,
        cancha_id: <string>,
    }

#### Crear partido

    POST /partido/crear

crea un partido y retorna su información

##### request body

    {
        nombre: <string>,
        fecha: <datetime>,
        creador_id: <string>,
        deporte_id: <string>,
        cancha_id: <string>,
    }

##### response body

    {
        id: <number>,
        nombre: <string>,
        fecha: <datetime>,
        estado: <string>,
        creador_id: <string>,
        deporte_id: <string>,
        cancha_id: <string>,
    }


#### unirse a partido

    POST /partido/:id/unirse

Ingresa al usuario para ser parte del partido

##### request body

    {
        usuario_id: <number>,
    }

##### request body

    {
        exito: true|false
    }
