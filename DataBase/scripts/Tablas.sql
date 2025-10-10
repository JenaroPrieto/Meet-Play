
-- 1. USUARIO
CREATE TABLE Usuario (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasena_hash VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT NOW(),
    foto_perfil VARCHAR(255),
    ubicacion VARCHAR(255),
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7)
);

-- 2. CANCHA
CREATE TABLE Cancha (
    id_cancha SERIAL PRIMARY KEY,
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
    id_deporte SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    max_participantes INT
);

-- 4. PARTIDO
CREATE TABLE Partido (
    id_partido SERIAL PRIMARY KEY,
    titulo VARCHAR(100),
    fecha DATE,
    hora TIME,
    estado VARCHAR(20) DEFAULT 'abierto',
    id_creador INT,
    id_cancha INT,
    id_deporte INT,
    FOREIGN KEY (id_creador) REFERENCES Usuario(id_usuario)
        ON DELETE SET NULL,
    FOREIGN KEY (id_cancha) REFERENCES Cancha(id_cancha)
        ON DELETE SET NULL,
    FOREIGN KEY (id_deporte) REFERENCES Deporte(id_deporte)
        ON DELETE SET NULL
);

-- 5. CHAT
CREATE TABLE Chat (
    id_chat SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    id_partido INT,
    FOREIGN KEY (id_partido) REFERENCES Partido(id_partido)
        ON DELETE CASCADE
);

-- 6. MENSAJE
CREATE TABLE Mensaje (
    id_mensaje SERIAL PRIMARY KEY,
    fecha_envio TIMESTAMP DEFAULT NOW(),
    estado VARCHAR(50),
    mensaje TEXT NOT NULL,
    id_usuario INT,
    id_chat INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
        ON DELETE SET NULL,
    FOREIGN KEY (id_chat) REFERENCES Chat(id_chat)
        ON DELETE CASCADE
);

-- 7. PARTICIPAEN
CREATE TABLE ParticipaEn (
    id_usuario INT,
    id_partido INT,
    PRIMARY KEY (id_usuario, id_partido),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
        ON DELETE SET NULL,
    FOREIGN KEY (id_partido) REFERENCES Partido(id_partido)
        ON DELETE CASCADE
);