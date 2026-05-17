---
trigger: always_on
---

en este archivo esta la primera parte de el ddl de la base de datos del proyecto, debes tener esto en cuenta siempre que trabajas en el proyecto.

 ================================================================
-- 1. PERFILES
--    Entidad raíz. Todo usuario del sistema tiene un perfil.
--    La contraseña se guarda hasheada desde el backend (bcrypt).
-- ================================================================
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
 
 
-- ================================================================
-- 2. DEPARTAMENTO
--    Agrupa las materias por área académica.
-- ================================================================
CREATE TABLE departamento (
  id        SERIAL      PRIMARY KEY,
  nombre    TEXT        NOT NULL UNIQUE,
);
 
 
-- ================================================================
-- 3. MATERIA
--    Cada materia pertenece a un departamento.
--    ON DELETE RESTRICT: no se puede borrar un departamento
--    si tiene materias asociadas.
-- ================================================================
CREATE TABLE materia (
  id              SERIAL      PRIMARY KEY,
  nombre          TEXT        NOT NULL,
  departamento_id INT         NOT NULL REFERENCES departamento(id) ON DELETE RESTRICT,
 );
 
 
-- ================================================================
-- 4. CONVERSACION
--    Contenedor del chat entre dos perfiles.
--    Los participantes se guardan en conversacion_participantes.
-- ================================================================
CREATE TABLE conversacion (
  id        SERIAL      PRIMARY KEY,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 5. TUTOR
--    Especialización de perfiles (herencia 1:1).
--    La PK es la misma que perfiles.id.
--    calificacion_promedio y total_sesiones se actualizan
--    desde el backend cada vez que se completa una sesión
--    o se recibe una reseña.
-- ================================================================
CREATE TABLE tutor (
  id                    INT           PRIMARY KEY REFERENCES perfiles(id) ON DELETE RESTRICT,
  biografia             TEXT,
  frase_personal        TEXT,
  anios_experiencia     INT           NOT NULL DEFAULT 0   CHECK (anios_experiencia >= 0),
  precio_por_hora       NUMERIC(10,2) NOT NULL DEFAULT 0   CHECK (precio_por_hora >= 0),
  duracion_sesion_min   INT           NOT NULL DEFAULT 90  CHECK (duracion_sesion_min > 0),
  esta_disponible       BOOLEAN       NOT NULL DEFAULT TRUE,
  calificacion_promedio NUMERIC(3,2)  NOT NULL DEFAULT 0
                          CHECK (calificacion_promedio BETWEEN 0 AND 5),
  total_sesiones        INT           NOT NULL DEFAULT 0   CHECK (total_sesiones >= 0),
  titulos               TEXT[],
  logros                TEXT[],
  creado_en             TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 6. ESTUDIANTE
--    Especialización de perfiles (herencia 1:1).
--    La PK es la misma que perfiles.id.
-- ================================================================
CREATE TABLE estudiante (
  id        INT         PRIMARY KEY REFERENCES perfiles(id) ON DELETE RESTRICT,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 7. NOTIFICACIONES
--    Entidad débil de perfiles.
--    perfiles (1,N) ——recibe—— (0,N) notificaciones
-- ================================================================
CREATE TABLE notificaciones (
  id            SERIAL      PRIMARY KEY,
  perfil_id     INT         NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
  tipo          TEXT        NOT NULL,
  titulo        TEXT        NOT NULL,
  cuerpo        TEXT        NOT NULL,
  leida         BOOLEAN     NOT NULL DEFAULT FALSE,
  creado_en     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 8. DISPONIBILIDAD
--    Entidad débil de tutor.
--    Bloques de horario semanal recurrente del tutor.
--    tutor (1,1) ——define—— (0,N) disponibilidad
-- ================================================================
CREATE TABLE disponibilidad (
  id          SERIAL      PRIMARY KEY,
  tutor_id    INT         NOT NULL REFERENCES tutor(id) ON DELETE CASCADE,
  dia_semana  INT         NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
                            -- 0=Domingo 1=Lunes 2=Martes 3=Miércoles
                            -- 4=Jueves  5=Viernes 6=Sábado
  hora_inicio TIME        NOT NULL,
  hora_fin    TIME        NOT NULL,
  esta_activo BOOLEAN     NOT NULL DEFAULT TRUE,
  creado_en   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_orden_horas CHECK (hora_inicio < hora_fin)
);
 
 
-- ================================================================
-- 9. SOLICITUD
--    Entidad débil de estudiante + tutor + materia.
--    El estudiante solicita una tutoría antes de que
--    el tutor la confirme y se cree la sesión.
-- ================================================================
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
 
 
-- ================================================================
-- 10. PLAN_TUTORIA
--     Paquetes de N sesiones a precio reducido que ofrece
--     un tutor. El estudiante compra el plan y paga una sola
--     vez por adelantado.
-- ================================================================
CREATE TABLE plan_tutoria (
  id                 SERIAL        PRIMARY KEY,
  tutor_id           INT           NOT NULL REFERENCES tutor(id) ON DELETE CASCADE,
  nombre             TEXT          NOT NULL,
  descripcion        TEXT,
  total_sesiones     INT           NOT NULL CHECK (total_sesiones > 0),
  duracion_sesion    INT           NOT NULL DEFAULT 90 CHECK (duracion_sesion > 0),
  precio_total       NUMERIC(10,2) NOT NULL CHECK (precio_total > 0),
  duracion_plan_dias INT           NOT NULL CHECK (duracion_plan_dias > 0),
    -- Días desde la compra para usar las sesiones. Ej: 90 = 3 meses
  esta_activo        BOOLEAN       NOT NULL DEFAULT TRUE,
  creado_en          TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 11. ESTUDIANTE_PLAN
--     Registro de compra de un plan por parte de un estudiante.
--     Lleva el conteo de sesiones disponibles y el vencimiento.
--     Se crea desde el backend cuando el pago del plan
--     queda en estado 'completado'.
-- ================================================================
CREATE TABLE estudiante_plan (
  id                   SERIAL      PRIMARY KEY,
  estudiante_id        INT         NOT NULL REFERENCES estudiante(id)   ON DELETE RESTRICT,
  plan_id              INT         NOT NULL REFERENCES plan_tutoria(id) ON DELETE RESTRICT,
  sesiones_disponibles INT         NOT NULL CHECK (sesiones_disponibles >= 0),
  fecha_vencimiento    DATE        NOT NULL,
  estado               TEXT        NOT NULL DEFAULT 'activo'
                         CHECK (estado IN ('activo','vencido','agotado','cancelado')),
  creado_en            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
 
-- ================================================================
-- 12. SESION_TUTORIA
--     Entidad débil de solicitud + tutor + materia.
--     Se crea cuando el tutor acepta una solicitud.
--     estudiante_plan_id: indica si la sesión se agendó
--     usando un plan comprado (nullable = sesión individual).
-- ================================================================
CREATE TABLE sesion_tutoria (
  id                 SERIAL        PRIMARY KEY,
  solicitud_id       INT           UNIQUE REFERENCES solicitud(id)      ON DELETE SET NULL,
  tutor_id           INT           NOT NULL REFERENCES tutor(id)        ON DELETE CASCADE,
  estudiante_id      INT           NOT NULL REFERENCES estudiante(id)   ON DELETE CASCADE,
  materia_id         INT           NOT NULL REFERENCES materia(id)      ON DELETE RESTRICT,
  estudiante_plan_id INT           REFERENCES estudiante_plan(id)       ON DELETE SET NULL,
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
 
 
-- ================================================================
-- 13. PAGO
--     Registra la transacción económica.
--     tipo 'sesion' → sesion_id NOT NULL, estudiante_plan_id NULL
--     tipo 'plan'   → estudiante_plan_id NOT NULL, sesion_id NULL
--     pago_tutor se calcula automáticamente (columna generada).
-- ================================================================
CREATE TABLE pago (
  id                  SERIAL        PRIMARY KEY,
  sesion_id           INT           UNIQUE REFERENCES sesion_tutoria(id) ON DELETE RESTRICT,
  estudiante_plan_id  INT           REFERENCES estudiante_plan(id)       ON DELETE RESTRICT,
  estudiante_id       INT           NOT NULL REFERENCES estudiante(id)   ON DELETE RESTRICT,
  tutor_id            INT           NOT NULL REFERENCES tutor(id)        ON DELETE RESTRICT,
  tipo                TEXT          NOT NULL DEFAULT 'sesion'
                        CHECK (tipo IN ('sesion', 'plan')),
  monto               NUMERIC(10,2) NOT NULL CHECK (monto >= 0),
  comision_plataforma NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (comision_plataforma >= 0),
  pago_tutor          NUMERIC(10,2) GENERATED ALWAYS AS (monto - comision_plataforma) STORED,
  moneda              TEXT          NOT NULL DEFAULT 'COP',
  estado              TEXT          NOT NULL DEFAULT 'pendiente'
                        CHECK (estado IN ('pendiente','completado','reembolsado','fallido')),
  pagado_en           TIMESTAMPTZ,
  creado_en           TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);
 