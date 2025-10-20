-- define in waht database to operate on
\c meet_play_db;

INSERT INTO "Usuarios" ( nombre, email, contrasena, direccion, latitud, longitud )
VALUES ( 'usuario1', 'user1@example.com', '$2b$10$dUh.1ZPhEVhy5DHxSYFE4ODl7PsQohbSSrusRFrzGKQHjwDKS135K', 'Baquedano', '-33.436867', '-70.634270' );

INSERT INTO "Usuarios" ( nombre, email, contrasena, direccion, latitud, longitud )
VALUES ( 'usuario2', 'user2@example.com', '$2b$10$dUh.1ZPhEVhy5DHxSYFE4ODl7PsQohbSSrusRFrzGKQHjwDKS135K', 'Baquedano', '-33.436867', '-70.634270' );

INSERT INTO "Canchas" ( nombre, direccion, comuna, latitud, longitud, contacto, propietario, disponible)
VALUES ( 'Campus San Joaquin', 'Av. Vicuña Mackenna 4860', 'Macul', '-33.500848', '-70.608126', 'propietario@example.com', 'PUC','true');

INSERT INTO "Deportes" ( nombre, max_participantes )
VALUES ('futbolito', '10');

INSERT INTO "Partidos" ( nombre, fecha, creador_id, cancha_id, deporte_id )
VALUES ( 'futbol tranqui', (NOW() + interval '7 day'), '1', '1', '1');

INSERT INTO "Partidos" ( nombre, fecha, creador_id, cancha_id, deporte_id )
VALUES ( 'pichanga', (NOW() + interval '7 day'), '2', '1', '1');

INSERT INTO "ParticipaEns" ( usuario_id, partido_id )
VALUES ( '1', '1');

INSERT INTO "ParticipaEns" ( usuario_id, partido_id )
VALUES ( '2', '2');
