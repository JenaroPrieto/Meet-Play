# Meet&Play Backend

## Tecnologias

- nodejs
- Koa.js
- Koa-router
- sequelize

## Instruciones de uso

uso local (puerto 3000):

    $ npm install
    $ npm start

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
    }

#### buscar usuario

    GET /usuario/:id
    GET /usuario/buscar/:nombre

retorna la información del usuario

##### response body

    {
        id: <numero>,
        nombre: <nombre>,
    }

#### partidos en los que participa

    GET /usuario/:id/partido

retorna una lista de partidos donde participa

##### response body

    {
        cantidad_partidos: <numero>
        partidos: [...{
            id: <number>,
            creador_id: <number>,
            nombre: <string>,
            deporte: <string>,
            hora_inicio: <datetime>,
            direccion: <string>|null,
            ubicacion: { lat: <number>, lng: <number>},
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
            creador_id: <number>,
            nombre: <string>,
            deporte: <string>,
            hora_inicio: <datetime>,
            direccion: <string>,
            ubicacion: { lat: <number>, lng: <number>},
        }...]
    }


#### info de partido

    GET /partido/:id

si existe, retorna la información de ese partido

##### response body

    {
        id: <number>,
        creador_id: <number>,
        nombre: <string>,
        deporte: <string>,
        hora_inicio: <datetime>,
        direccion: <string>,
        ubicacion: { lat: <number>, lng: <number>},
    }

#### Crear partido

    POST /partido/crear

crea un partido y retorna su información

##### request body

    {
        usuario_id: <number>,
        nombre: <string>,
        deporte: <string>,
        hora_inicio: <datetime>,
        direccion: <string>,
        ubicacion: { lat: <number>, lng: <number>},
    }

##### response body

    {
        id: <number>,
        creador_id: <number>,
        nombre: <string>,
        deporte: <string>,
        hora_inicio: <datetime>,
        direccion: <string>,
        ubicacion: { lat: <number>, lng: <number>},
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
