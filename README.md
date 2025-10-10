# Meet-Play
Proyecto Semestral del curso GPTI

## Instruciones de uso

### desarrollo

Requisitos: Docker

Se utiliza el siguiente comando para iniciar backend, frontend, postgres:

    docker compose -f dev.compose.yml up --build

Este cuenta con fast reload tanto en el backend y el frontend.

**!Importante:** si ya existe el volumen para la base de datos 
no se va correr el init y posiblemente este desactualizado el schema
de la base de datos, para borrar el volumen puedes usar el siguiente comando:

    docker compose -f dev.compose.yml down -v

## Tecnologias

### Backend

[Readme en Backend](./Backend/README.md#Tecnologias)

### Frontend

[Readme en Frontend](./Frontend/README.md#Tecnologias)

### Base de Datos

- postgres

## Docs

### Backend

[Readme en Backend](./Backend/README.md)

### Frontend

[Readme en Frontend](./Frontend/README.md)

### Base de datos

#### usuarios

- id:
    - SERIAL
    - PRIMARY KEY
- nombre
    - VARCHAR(100)
    - NOT NULL
- email
    - VARCHAR(150)
    - UNIQUE
    - NOT NULL
- contrasena
    - VARCHAR(255)
    - NOT NULL
- fecha_registro
    - TIMESTAMP WITH TIME ZONE
    - DEFAULT NOW
- foto_perfil
    - VARCHAR(255)
- direccion
    - VARCHAR(255)
- latitud
    - DECIMAL(10,7)
- longitud
    - DECIMAL(10,7)

#### Cancha

- id
    - SERIAL
    - PRIMARY KEY
- nombre
    - VARCHAR(100)
    - NOT NULL
- direccion
    - VARCHAR(255)
- comuna
    - VARCHAR(100)
- latitud
    - DECIMAL(10,7)
- longitud
    - DECIMAL(10,7)
- contacto
    - VARCHAR(100)
- propietario
    - VARCHAR(100)
- disponible
    - BOOLEAN
    - DEFAULT TRUE

#### DEPORTE
- id
    - SERIAL
    - PRIMARY KEY
- nombre
    - VARCHAR(100)
    - NOT NULL
- max_participantes
    - INT

#### PARTIDO
- id
    - SERIAL
    - PRIMARY KEY
- nombre
    - VARCHAR(100)
    - NOT NULL
- fecha
    - TIMESTAMP WITH TIME ZONE,
- estado
    - enum ('abierto', 'cerrado')
    - DEFAULT 'abierto'
- FOREIGN KEY (creador_id) REFERENCES Usuario(id)
- FOREIGN KEY (cancha_id) REFERENCES Cancha(id)
- FOREIGN KEY (deporte_id) REFERENCES Deporte(id)

#### CHAT
- id
    - SERIAL PRIMARY KEY,
- nombre
    - VARCHAR(100) NOT NULL,
- partido_id
    - INT,
- FOREIGN
    - KEY (partido_id) REFERENCES Partido(id)

#### MENSAJE
- id
    - SERIAL
    - PRIMARY KEY
- fecha_envio
    - TIMESTAMP WITH TIME ZONE
    - DEFAULT NOW
- contenido
    - TEXT
    - NOT NULL
- FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
- FOREIGN KEY (chat_id) REFERENCES Chat(id)

#### PARTICIPAEN
- id
    - SERIAL
    - PRIMARY KEY
- FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
- FOREIGN KEY (partido_id) REFERENCES Partido(id)
