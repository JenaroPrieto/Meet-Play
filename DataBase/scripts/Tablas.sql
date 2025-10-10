-- 1. USUARIO
CREATE TABLE Usuario (
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
CREATE TABLE Cancha (
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
CREATE TABLE Deporte (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    max_participantes INT
);

-- 4.0 TYPE estado partido
CREATE TYPE ESTADO_PARTIDO AS ENUM ('abierto', 'cerrado');

-- 4. PARTIDO
CREATE TABLE Partido (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha TIMESTAMP,
    estado ESTADO DEFAULT 'abierto',
    creador_id INT,
    cancha_id INT,
    deporte_id INT,
    FOREIGN KEY (creador_id) REFERENCES Usuario(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (cancha_id) REFERENCES Cancha(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (deporte_id) REFERENCES Deporte(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- 5. CHAT
CREATE TABLE Chat (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    partido_id INT,
    FOREIGN KEY (partido_id) REFERENCES Partido(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 6. MENSAJE
CREATE TABLE Mensaje (
    id SERIAL PRIMARY KEY,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    contenido TEXT NOT NULL,
    usuario_id INT,
    chat_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (chat_id) REFERENCES Chat(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- 7. PARTICIPAEN
CREATE TABLE ParticipaEn (
    id SERIAL PRIMARY KEY,
    usuario_id INT,
    partido_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    FOREIGN KEY (partido_id) REFERENCES Partido(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
