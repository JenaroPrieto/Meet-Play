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

#### login

    POST /usuario/login

en caso de no encontrar el email o contraseña invalida
retorna codigo de status 401

##### request body
    
    {
        email: <string>,
        contrasena: <string>,
    }

##### response body

    {
        user: {
            id: <numero>,
            nombre: <nombre>,
            email: <string>,
            fecha_registro: <DateTime>,
            foto_perfil: <string>,
            direccion: <string>,
            latitud: <numero>,
            longitud: <numero>
        }
        token: <string>
    }


#### nuevo usuario

    POST /usuario/crear

crea un nuevo usuario y retorn su información

##### request body
    
    {
        nombre: <string>,
        email: <string>,
        contrasena: <string>,
        direccion: <string>,
        latitud: <numero>,
        longitud: <numero>
    }

##### response body

    {
        user: {
            id: <numero>,
            nombre: <nombre>,
            email: <string>,
            fecha_registro: <DateTime>,
            foto_perfil: <string>,
            direccion: <string>,
            latitud: <numero>,
            longitud: <numero>
        }
        token: <string>
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

#### usuarios con los comparte partido

    GET /usuario/:id/met

retorna los ids de los usuarios con la lista
de partidos que comparten

##### response body

    {
        usuarios: {
            "<id usuario>": [lista id partidos]
        }
    }

### partido

#### listar partidos

    GET /partido

retorna una lista de partidos

##### header params

si se encuentra el token de authorización, en la 
respuesta se incluira si participa el usuario en el 
partido y la distancia en kilometros de la ubicacion
del usuario a las canchas.

##### query params

- estado = <abierto|cerrado|todos> default: abierto
- incluir_pasados = <true|false> default: false
- offset = <number> default: 0
- limit = <number> default: 10

##### response body

    {
        cantidad_partidos: <numero>,
        cantidad_partidos_total: <numero>,
        partidos: [...{
            id: <number>,
            nombre: <string>,
            fecha: <datetime>,
            estado: <string>,
            creador_id: <string>,
            deporte_id: <string>,
            cancha_id: <string>,
            participantes: <number>,
            usuario_participa:? <bool>,
        }...],
        deportes: [...{
                id: <number>,
                nombre: <string>,
                max_participantes: <number>
        }...],
        canchas: [...{
                id: <number>,
                nombre: <string>,
                direccion: <string>,
                comuna: <string>,
                latitud: <number>,
                longitud: <number>
                distancia:? <number>
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
        cancha_id: <string>
    }

##### response body

    {
        id: <number>,
        nombre: <string>,
        fecha: <datetime>,
        estado: <string>,
        creador_id: <string>,
        deporte_id: <string>,
        cancha_id: <string>
    }

#### Actualizar partido

    PUT /partido/:id/update

actualiza un partido y retorna su información

es necesario que se mande el token de session y que
este sea del dueño del partido.

##### request body

    {
        nombre: <string>,
        fecha: <datetime>,
        estado: <'abierto'|'cerrado'>,
        deporte_id: <string>,
        cancha_id: <string>
    }

##### response body

    {
        partido: {
            id: <number>,
            nombre: <string>,
            fecha: <datetime>,
            estado: <string>,
            creador_id: <string>,
            deporte_id: <string>,
            cancha_id: <string>
        }
    }



#### unirse a partido

    POST /partido/:id/unirse

Ingresa al usuario para ser parte del partido

##### header param

el token de authorización es necesario

##### request body

    {
        exito: true|false,
        message: <string>
    }
