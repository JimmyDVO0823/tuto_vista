---
trigger: always_on
---

en este archivo esta el ddl de la base de datos del proyecto, debes tener esto en cuenta siempre que trabajas en el proyecto.
CREATE TABLE perfiles (
  id              SERIAL      PRIMARY KEY,
  nombre_completo TEXT        NOT NULL,
  correo          TEXT        NOT NULL UNIQUE,
  contrasena_hash TEXT        NOT NULL,
  url_avatar      TEXT,
  rol             TEXT        NOT NULL CHECK (rol IN ('estudiante', 'tutor', 'administrador')),
  esta_activo     BOOLEAN     NOT NULL DEFAULT TRUE,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE departamento (
  id        SERIAL      PRIMARY KEY,
  nombre    TEXT        NOT NULL UNIQUE
);

CREATE TABLE materia (
  id              SERIAL      PRIMARY KEY,
  nombre          TEXT        NOT NULL,
  departamento_id INT         NOT NULL REFERENCES departamento(id) ON DELETE RESTRICT
);


CREATE TABLE conversacion (
  id        SERIAL      PRIMARY KEY,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE tutor (
  id                    INT           PRIMARY KEY REFERENCES perfiles(id) ON DELETE CASCADE,
  biografia             TEXT,
  frase_personal        TEXT,
  anios_experiencia     INT           NOT NULL DEFAULT 0  CHECK (anios_experiencia >= 0),
  precio_por_hora       NUMERIC(10,2) NOT NULL DEFAULT 0  CHECK (precio_por_hora >= 0),
  duracion_sesion_min   INT           NOT NULL DEFAULT 90 CHECK (duracion_sesion_min > 0),
  esta_disponible       BOOLEAN       NOT NULL DEFAULT TRUE,
  calificacion_promedio NUMERIC(3,2)  NOT NULL DEFAULT 0
                          CHECK (calificacion_promedio BETWEEN 0 AND 5),
  total_sesiones        INT           NOT NULL DEFAULT 0  CHECK (total_sesiones >= 0),
  titulos               TEXT[],   
  logros                TEXT[],   
  creado_en             TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


CREATE TABLE estudiante (
  id              INT         PRIMARY KEY REFERENCES perfiles(id) ON DELETE CASCADE,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE notificaciones (
  id            SERIAL      PRIMARY KEY,
  perfil_id     INT         NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  tipo          TEXT        NOT NULL,
  titulo        TEXT        NOT NULL,
  cuerpo        TEXT        NOT NULL,
  leida         BOOLEAN     NOT NULL DEFAULT FALSE,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE disponibilidad (
  id          SERIAL      PRIMARY KEY,
  tutor_id    INT         NOT NULL REFERENCES tutor(id) ON DELETE CASCADE,
  dia_semana  INT         NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
  hora_inicio TIME        NOT NULL,
  hora_fin    TIME        NOT NULL,
  esta_activo BOOLEAN     NOT NULL DEFAULT TRUE,
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_orden_horas CHECK (hora_inicio < hora_fin)
);


CREATE TABLE solicitud (
  id              SERIAL      PRIMARY KEY,
  estudiante_id   INT         NOT NULL REFERENCES estudiante(id) ON DELETE CASCADE,
  tutor_id        INT         NOT NULL REFERENCES tutor(id)      ON DELETE CASCADE,
  materia_id      INT         NOT NULL REFERENCES materia(id)    ON DELETE RESTRICT,
  fecha_preferida DATE        NOT NULL,
  hora_preferida  TIME        NOT NULL,
  duracion_min    INT         NOT NULL DEFAULT 90 CHECK (duracion_min > 0),
  mensaje         TEXT,
  estado          TEXT        NOT NULL DEFAULT 'pendiente'
                                CHECK (estado IN ('pendiente','aceptada','rechazada','cancelada')),
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE sesion_tutoria (
  id                 SERIAL        PRIMARY KEY,
  solicitud_id       INT           UNIQUE REFERENCES solicitud(id) ON DELETE SET NULL,
  tutor_id           INT           NOT NULL REFERENCES tutor(id)      ON DELETE CASCADE,
  estudiante_id      INT           NOT NULL REFERENCES estudiante(id) ON DELETE CASCADE,
  materia_id         INT           NOT NULL REFERENCES materia(id)    ON DELETE RESTRICT,
  programada_para    TIMESTAMPTZ   NOT NULL,
  duracion_min       INT           NOT NULL DEFAULT 90 CHECK (duracion_min > 0),
  precio             NUMERIC(10,2) NOT NULL DEFAULT 0  CHECK (precio >= 0),
  enlace_reunion     TEXT,
  estado             TEXT          NOT NULL DEFAULT 'programada'
                                     CHECK (estado IN (
                                       'programada','en_progreso','completada',
                                       'cancelada','no_asistio'
                                     )),
  cancelada_por      INT           REFERENCES perfiles(id) ON DELETE SET NULL,
  motivo_cancelacion TEXT,
  creado_en          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE pago (
  id                  SERIAL        PRIMARY KEY,
  sesion_id           INT           NOT NULL UNIQUE REFERENCES sesion_tutoria(id) ON DELETE RESTRICT,
  estudiante_id       INT           NOT NULL REFERENCES estudiante(id) ON DELETE RESTRICT,
  tutor_id            INT           NOT NULL REFERENCES tutor(id)      ON DELETE RESTRICT,
  monto               NUMERIC(10,2) NOT NULL CHECK (monto >= 0),
  comision_plataforma NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (comision_plataforma >= 0),
  pago_tutor          NUMERIC(10,2) GENERATED ALWAYS AS (monto - comision_plataforma) STORED,
  moneda              TEXT          NOT NULL DEFAULT 'COP',
  estado              TEXT          NOT NULL DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente','completado','reembolsado','fallido')),
  pagado_en           TIMESTAMPTZ,
  creado_en           TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE resena (
  id            SERIAL        PRIMARY KEY,
  sesion_id     INT           NOT NULL UNIQUE REFERENCES sesion_tutoria(id) ON DELETE CASCADE,
  estudiante_id INT           NOT NULL REFERENCES estudiante(id) ON DELETE CASCADE,
  tutor_id      INT           NOT NULL REFERENCES tutor(id)      ON DELETE CASCADE,
  puntuacion    NUMERIC(2,1)  NOT NULL CHECK (puntuacion BETWEEN 1.0 AND 5.0),
  comentario    TEXT,
  creado_en     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE recursos (
  id          SERIAL      PRIMARY KEY,
  tutor_id    INT         NOT NULL REFERENCES tutor(id)   ON DELETE CASCADE,
  materia_id  INT         NOT NULL REFERENCES materia(id) ON DELETE CASCADE,
  titulo      TEXT        NOT NULL,
  descripcion TEXT,
  url_archivo TEXT,
  tipo        TEXT        CHECK (tipo IN ('documento','video','enlace','imagen','otro')),
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE mensajes (
  id              SERIAL      PRIMARY KEY,
  conversacion_id INT         NOT NULL REFERENCES conversacion(id) ON DELETE CASCADE,
  remitente_id    INT         NOT NULL REFERENCES perfiles(id)     ON DELETE CASCADE,
  contenido       TEXT        NOT NULL,
  leido           BOOLEAN     NOT NULL DEFAULT FALSE,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE conversacion_participantes (
  conversacion_id INT         NOT NULL REFERENCES conversacion(id) ON DELETE CASCADE,
  perfil_id       INT         NOT NULL REFERENCES perfiles(id)     ON DELETE CASCADE,
  unido_en        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (conversacion_id, perfil_id)
);
CREATE TABLE tutor_materias (
  tutor_id   INT NOT NULL,
  materia_id INT NOT NULL,

  PRIMARY KEY (tutor_id, materia_id),

  CONSTRAINT fk_tutor
    FOREIGN KEY (tutor_id)
    REFERENCES tutor(id)
    ON DELETE CASCADE,

  CONSTRAINT fk_materia
    FOREIGN KEY (materia_id)
    REFERENCES materia(id)
    ON DELETE RESTRICT
);

CREATE OR REPLACE FUNCTION fn_recalcular_calificacion_tutor()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tutor
  SET calificacion_promedio = (
    SELECT COALESCE(ROUND(AVG(puntuacion)::NUMERIC, 2), 0)
    FROM resena
    WHERE tutor_id = NEW.tutor_id
  )
  WHERE id = NEW.tutor_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_recalcular_calificacion
  AFTER INSERT OR UPDATE ON resena
  FOR EACH ROW EXECUTE FUNCTION fn_recalcular_calificacion_tutor();


CREATE OR REPLACE FUNCTION fn_actualizar_total_sesiones()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.estado = 'completada' AND OLD.estado <> 'completada' THEN
    UPDATE tutor
    SET total_sesiones = total_sesiones + 1
    WHERE id = NEW.tutor_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_total_sesiones
  AFTER UPDATE ON sesion_tutoria
  FOR EACH ROW EXECUTE FUNCTION fn_actualizar_total_sesiones();


