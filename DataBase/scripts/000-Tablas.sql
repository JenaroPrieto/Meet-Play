-- define in waht database to operate on
\c meet_play_db;


-- 1. USUARIO
CREATE TABLE "Usuarios" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    foto_perfil VARCHAR(255),
    direccion VARCHAR(255),
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7)
);

-- 2. CANCHA
CREATE TABLE "Canchas" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    comuna VARCHAR(100),
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7),
    contacto VARCHAR(100),
    propietario VARCHAR(100),
    disponible BOOLEAN DEFAULT TRUE
);

-- 3. DEPORTE
CREATE TABLE "Deportes" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    max_participantes INT
);

-- 4.0 TYPE estado partido
CREATE TYPE ESTADO_PARTIDO AS ENUM ('abierto', 'cerrado');

-- 4. PARTIDO
CREATE TABLE "Partidos" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha TIMESTAMP WITH TIME ZONE,
    estado ESTADO_PARTIDO DEFAULT 'abierto',
    creador_id INT,
    cancha_id INT,
    deporte_id INT,
    FOREIGN KEY (creador_id) REFERENCES "Usuarios"(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (cancha_id) REFERENCES "Canchas"(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (deporte_id) REFERENCES "Deportes"(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 5. CHAT
CREATE TABLE "Chats" (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    partido_id INT,
    FOREIGN KEY (partido_id) REFERENCES "Partidos"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 6. MENSAJE
CREATE TABLE "Mensajes" (
    id SERIAL PRIMARY KEY,
    fecha_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contenido TEXT NOT NULL,
    usuario_id INT,
    chat_id INT,
    FOREIGN KEY (usuario_id) REFERENCES "Usuarios"(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES "Chats"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 7. PARTICIPAEN
CREATE TABLE "ParticipaEns" (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    partido_id INT,
    FOREIGN KEY (usuario_id) REFERENCES "Usuarios"(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (partido_id) REFERENCES "Partidos"(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
