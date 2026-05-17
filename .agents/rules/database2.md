---
trigger: always_on
---

en este archivo esta la segunda parte de el ddl de la base de datos del proyecto, debes tener esto en cuenta siempre que trabajas en el proyecto.

-- ================================================================
-- 14. RESENA
--     Entidad débil de sesion_tutoria.
--     Solo el estudiante puede reseñar, y solo una vez
--     por sesión (UNIQUE en sesion_id).
--     El backend valida que la sesión esté en estado
--     'completada' antes de permitir la reseña.
-- ================================================================
CREATE TABLE resena (
  id            SERIAL        PRIMARY KEY,
  sesion_id     INT           NOT NULL UNIQUE REFERENCES sesion_tutoria(id) ON DELETE CASCADE,
  estudiante_id INT           NOT NULL REFERENCES estudiante(id)            ON DELETE CASCADE,
  tutor_id      INT           NOT NULL REFERENCES tutor(id)                 ON DELETE CASCADE,
  puntuacion    NUMERIC(2,1)  NOT NULL CHECK (puntuacion BETWEEN 1.0 AND 5.0),
  comentario    TEXT,
  creado_en     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 15. RECURSOS
--     Entidad débil de tutor + materia.
--     Material de estudio que el tutor comparte en la plataforma.
-- ================================================================
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
 
 
-- ================================================================
-- 16. MENSAJES
--     Entidad débil de conversacion + perfiles.
--     El remitente debe ser participante de la conversación
--     (validado desde el backend).
-- ================================================================
CREATE TABLE mensajes (
  id              SERIAL      PRIMARY KEY,
  conversacion_id INT         NOT NULL REFERENCES conversacion(id) ON DELETE CASCADE,
  remitente_id    INT         NOT NULL REFERENCES perfiles(id)     ON DELETE CASCADE,
  contenido       TEXT        NOT NULL,
  leido           BOOLEAN     NOT NULL DEFAULT FALSE,
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 17. CONVERSACION_PARTICIPANTES
--     Relación N:M entre perfiles y conversacion.
--     perfiles (1,N) ——participa—— (2,N) conversacion
--     La PK compuesta impide que un perfil esté dos veces
--     en la misma conversación.
-- ================================================================
CREATE TABLE conversacion_participantes (
  conversacion_id INT         NOT NULL REFERENCES conversacion(id) ON DELETE CASCADE,
  perfil_id       INT         NOT NULL REFERENCES perfiles(id)     ON DELETE CASCADE,
  unido_en        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (conversacion_id, perfil_id)
);
 
 
-- ================================================================
-- 18. TUTOR_MATERIAS
--     Relación N:M entre tutor y materia.
--     Indica qué materias puede dictar un tutor.
--     Usado en el explorador para filtrar tutores por materia.
-- ================================================================
CREATE TABLE tutor_materias (
  tutor_id   INT NOT NULL REFERENCES tutor(id)   ON DELETE CASCADE,
  materia_id INT NOT NULL REFERENCES materia(id) ON DELETE RESTRICT,
  PRIMARY KEY (tutor_id, materia_id)
);
 
 
-- 21. INSIGNIA
--     Catálogo de todas las insignias del sistema.
--     condicion_tipo y condicion_valor permiten al backend
--     evaluar automáticamente si un tutor ganó una insignia.
--     El CHECK en condicion_tipo garantiza que solo existan
--     tipos que el backend sabe manejar.
-- ================================================================
CREATE TABLE insignia (
  id              SERIAL      PRIMARY KEY,
  nombre          TEXT        NOT NULL UNIQUE,
  descripcion     TEXT        NOT NULL,
  url_icono       TEXT,
  condicion_tipo  TEXT        NOT NULL
                    CHECK (condicion_tipo IN (
                      'total_sesiones',
                      'sesiones_5_estrellas',
                      'calificacion_promedio'
                    )),
  condicion_valor INT         NOT NULL CHECK (condicion_valor > 0),
  creado_en       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
  
-- ================================================================
-- 22. TUTOR_INSIGNIA
--     Relación N:M entre tutor e insignia.
--     Registra qué insignias ha ganado cada tutor y cuándo.
--     La PK compuesta impide que un tutor tenga la misma
--     insignia dos veces.
-- ================================================================
CREATE TABLE tutor_insignia (
  tutor_id    INT         NOT NULL REFERENCES tutor(id)    ON DELETE CASCADE,
  insignia_id INT         NOT NULL REFERENCES insignia(id) ON DELETE CASCADE,
  obtenida_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (tutor_id, insignia_id)
);
 
 
-- ================================================================
-- 23. REPORTE
--     Permite reportar problemas entre usuarios.
--     El administrador los gestiona desde su panel.
--     chk_reporte_diferente impide que alguien se reporte
--     a sí mismo.
-- ================================================================
CREATE TABLE reporte (
  id            SERIAL      PRIMARY KEY,
  reportado_por INT         NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  reportado_a   INT         NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  sesion_id     INT         REFERENCES sesion_tutoria(id)    ON DELETE SET NULL,
  motivo        TEXT        NOT NULL
                  CHECK (motivo IN (
                    'no_asistio',
                    'comportamiento_inapropiado',
                    'contenido_inadecuado',
                    'fraude',
                    'otro'
                  )),
  descripcion   TEXT,
  estado        TEXT        NOT NULL DEFAULT 'pendiente'
                  CHECK (estado IN ('pendiente','revisando','resuelto','descartado')),
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_reporte_diferente CHECK (reportado_por <> reportado_a)
);
 
 
-- ================================================================
-- 24. FACTURA
--     Documento contable generado únicamente cuando un pago
--     queda en estado 'completado'.
--     El backend genera la factura y construye el número
--     visible usando el id: "FACT-2024-00001"
-- ================================================================
CREATE TABLE factura (
  id         SERIAL        PRIMARY KEY,
  subtotal   NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  impuesto   NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (impuesto >= 0),
  total      NUMERIC(10,2) GENERATED ALWAYS AS (subtotal + impuesto) STORED,
  moneda     TEXT          NOT NULL DEFAULT 'COP',
  emitida_en TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);