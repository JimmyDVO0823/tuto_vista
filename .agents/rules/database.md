---
trigger: always_on
---

aquí está el schema de la base de datos del proyecto, la segunda parte está en database2.md
CREATE SCHEMA "public";
CREATE TABLE "actividad_estudiante" (
	"id" bigserial PRIMARY KEY,
	"recurso_id" bigint,
	"estudiante_id" bigint NOT NULL,
	"sesion_id" bigint NOT NULL,
	"estado" text DEFAULT 'pendiente' NOT NULL,
	"comentario_tutor" text,
	CONSTRAINT "actividad_estudiante_estado_check" CHECK ((estado = ANY (ARRAY['pendiente'::text, 'completado'::text])))
);
CREATE TABLE "conversacion" (
	"id" bigserial PRIMARY KEY,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "conversacion_participantes" (
	"conversacion_id" bigint,
	"perfil_id" bigint,
	"unido_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "conversacion_participantes_pkey" PRIMARY KEY("conversacion_id","perfil_id")
);
CREATE TABLE "departamento" (
	"id" bigserial PRIMARY KEY,
	"nombre" varchar(255) NOT NULL CONSTRAINT "departamento_nombre_key" UNIQUE
);
CREATE TABLE "disponibilidad" (
	"id" bigserial PRIMARY KEY,
	"tutor_id" bigint NOT NULL,
	"dia_semana" integer NOT NULL,
	"hora_inicio" time NOT NULL,
	"hora_fin" time NOT NULL,
	"esta_activo" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_orden_horas" CHECK ((hora_inicio < hora_fin)),
	CONSTRAINT "disponibilidad_dia_semana_check" CHECK (((dia_semana >= 0) AND (dia_semana <= 6)))
);
CREATE TABLE "disponibilidad_especifica" (
	"id" bigserial PRIMARY KEY,
	"tutor_id" bigint NOT NULL,
	"fecha" date NOT NULL,
	"hora_inicio" time NOT NULL,
	"hora_fin" time NOT NULL,
	"esta_disponible" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_horas_especificas" CHECK ((hora_inicio < hora_fin))
);
CREATE TABLE "estudiante" (
	"id" bigint PRIMARY KEY,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "estudiante_plan" (
	"id" bigserial PRIMARY KEY,
	"estudiante_id" bigint NOT NULL,
	"plan_id" bigint NOT NULL,
	"sesiones_disponibles" integer NOT NULL,
	"fecha_vencimiento" date NOT NULL,
	"estado" varchar(255) DEFAULT 'activo' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "estudiante_plan_estado_check" CHECK (((estado)::text = ANY (ARRAY['activo'::text, 'vencido'::text, 'agotado'::text, 'cancelado'::text]))),
	CONSTRAINT "estudiante_plan_sesiones_disponibles_check" CHECK ((sesiones_disponibles >= 0))
);
CREATE TABLE "factura" (
	"id" bigserial PRIMARY KEY,
	"pago_id" integer NOT NULL CONSTRAINT "factura_pago_id_key" UNIQUE,
	"subtotal" numeric(10, 2) NOT NULL,
	"impuesto" numeric(10, 2) DEFAULT '0' NOT NULL,
	"total" numeric(10, 2) GENERATED ALWAYS AS ((subtotal + impuesto)) STORED,
	"moneda" varchar(255) DEFAULT 'COP' NOT NULL,
	"emitida_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "factura_impuesto_check" CHECK ((impuesto >= (0)::numeric)),
	CONSTRAINT "factura_subtotal_check" CHECK ((subtotal >= (0)::numeric))
);
CREATE TABLE "insignia" (
	"id" bigserial PRIMARY KEY,
	"nombre" varchar(255) NOT NULL CONSTRAINT "insignia_nombre_key" UNIQUE,
	"descripcion" text NOT NULL,
	"url_icono" varchar(255),
	"condicion_tipo" varchar(255) NOT NULL,
	"condicion_valor" integer NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "insignia_condicion_tipo_check" CHECK (((condicion_tipo)::text = ANY (ARRAY['total_sesiones'::text, 'sesiones_5_estrellas'::text, 'calificacion_promedio'::text]))),
	CONSTRAINT "insignia_condicion_valor_check" CHECK ((condicion_valor > 0))
);
CREATE TABLE "materia" (
	"id" bigserial PRIMARY KEY,
	"nombre" varchar(255) NOT NULL,
	"departamento_id" bigint NOT NULL
);
CREATE TABLE "mensajes" (
	"id" bigserial PRIMARY KEY,
	"conversacion_id" bigint NOT NULL,
	"remitente_id" bigint NOT NULL,
	"contenido" text NOT NULL,
	"leido" boolean DEFAULT false NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "notificaciones" (
	"id" bigserial PRIMARY KEY,
	"perfil_id" bigint NOT NULL,
	"tipo" varchar(255) NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"cuerpo" text NOT NULL,
	"leida" boolean DEFAULT false NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE "pago" (
	"id" bigserial PRIMARY KEY,
	"sesion_id" bigint CONSTRAINT "pago_sesion_id_key" UNIQUE,
	"estudiante_id" bigint NOT NULL,
	"tutor_id" bigint NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"comision_plataforma" numeric(10, 2) DEFAULT '0' NOT NULL,
	"pago_tutor" numeric(10, 2) GENERATED ALWAYS AS ((monto - comision_plataforma)) STORED,
	"moneda" varchar(255) DEFAULT 'COP' NOT NULL,
	"estado" varchar(255) DEFAULT 'pendiente' NOT NULL,
	"pagado_en" timestamp with time zone,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"tipo" varchar(255) DEFAULT 'sesion' NOT NULL,
	"estudiante_plan_id" bigint,
	CONSTRAINT "pago_comision_plataforma_check" CHECK ((comision_plataforma >= (0)::numeric)),
	CONSTRAINT "pago_estado_check" CHECK (((estado)::text = ANY (ARRAY['pendiente'::text, 'completado'::text, 'reembolsado'::text, 'fallido'::text]))),
	CONSTRAINT "pago_monto_check" CHECK ((monto >= (0)::numeric)),
	CONSTRAINT "pago_tipo_check" CHECK (((tipo)::text = ANY (ARRAY['sesion'::text, 'plan'::text])))
);
CREATE TABLE "perfiles" (
	"id" bigserial PRIMARY KEY,
	"nombre_completo" varchar(255) NOT NULL,
	"correo" varchar(255) NOT NULL CONSTRAINT "perfiles_correo_key" UNIQUE,
	"contrasena_hash" varchar(255) NOT NULL,
	"url_avatar" varchar(255),
	"rol" varchar(255) NOT NULL,
	"esta_activo" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "perfiles_rol_check" CHECK (((rol)::text = ANY (ARRAY['estudiante'::text, 'tutor'::text, 'administrador'::text])))
);
CREATE TABLE "plan_tutoria" (
	"id" bigserial PRIMARY KEY,
	"tutor_id" bigint NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"descripcion" text,
	"total_sesiones" integer NOT NULL,
	"duracion_sesion" integer DEFAULT 90 NOT NULL,
	"precio_total" numeric(10, 2) NOT NULL,
	"duracion_plan_dias" integer NOT NULL,
	"esta_activo" boolean DEFAULT true NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "plan_tutoria_duracion_plan_dias_check" CHECK ((duracion_plan_dias > 0)),
	CONSTRAINT "plan_tutoria_duracion_sesion_check" CHECK ((duracion_sesion > 0)),
	CONSTRAINT "plan_tutoria_precio_total_check" CHECK ((precio_total > (0)::numeric)),
	CONSTRAINT "plan_tutoria_total_sesiones_check" CHECK ((total_sesiones > 0))
);
CREATE TABLE "recursos" (
	"id" bigserial PRIMARY KEY,
	"tutor_id" bigint NOT NULL,
	"materia_id" bigint NOT NULL,
	"titulo" varchar(255) NOT NULL,
	"descripcion" text,
	"url_archivo" varchar(255),
	"tipo" varchar(255),
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "recursos_tipo_check" CHECK (((tipo)::text = ANY (ARRAY['documento'::text, 'video'::text, 'enlace'::text, 'imagen'::text, 'otro'::text])))
);
CREATE TABLE "reporte" (
	"id" bigserial PRIMARY KEY,
	"reportado_por" bigint NOT NULL,
	"reportado_a" bigint NOT NULL,
	"sesion_id" bigint,
	"motivo" varchar(255) NOT NULL,
	"descripcion" text,
	"estado" varchar(255) DEFAULT 'pendiente' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_reporte_diferente" CHECK ((reportado_por <> reportado_a)),
	CONSTRAINT "reporte_estado_check" CHECK (((estado)::text = ANY (ARRAY['pendiente'::text, 'revisando'::text, 'resuelto'::text, 'descartado'::text]))),
	CONSTRAINT "reporte_motivo_check" CHECK (((motivo)::text = ANY (ARRAY['no_asistio'::text, 'comportamiento_inapropiado'::text, 'contenido_inadecuado'::text, 'fraude'::text, 'otro'::text])))
);
CREATE TABLE "resena" (
	"id" bigserial PRIMARY KEY,
	"sesion_id" bigint NOT NULL CONSTRAINT "resena_sesion_id_key" UNIQUE,
	"estudiante_id" bigint NOT NULL,
	"tutor_id" bigint NOT NULL,
	"puntuacion" numeric(2, 1) NOT NULL,
	"comentario" text,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "resena_puntuacion_check" CHECK (((puntuacion >= 1.0) AND (puntuacion <= 5.0)))
);
CREATE TABLE "sesion_tutoria" (
	"id" bigserial PRIMARY KEY,
	"solicitud_id" bigint CONSTRAINT "sesion_tutoria_solicitud_id_key" UNIQUE,
	"tutor_id" bigint NOT NULL,
	"estudiante_id" bigint NOT NULL,
	"materia_id" bigint NOT NULL,
	"programada_para" timestamp with time zone NOT NULL,
	"duracion_min" integer DEFAULT 90 NOT NULL,
	"precio" numeric(10, 2) DEFAULT '0' NOT NULL,
	"enlace_reunion" varchar(255),
	"estado" varchar(255) DEFAULT 'programada' NOT NULL,
	"cancelada_por" bigint,
	"motivo_cancelacion" text,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	"estudiante_plan_id" bigint,
	CONSTRAINT "sesion_tutoria_duracion_min_check" CHECK ((duracion_min > 0)),
	CONSTRAINT "sesion_tutoria_estado_check" CHECK (((estado)::text = ANY (ARRAY['programada'::text, 'en_progreso'::text, 'completada'::text, 'cancelada'::text, 'no_asistio'::text]))),
	CONSTRAINT "sesion_tutoria_precio_check" CHECK ((precio >= (0)::numeric))
);
CREATE TABLE "solicitud" (
	"id" bigserial PRIMARY KEY,
	"estudiante_id" bigint NOT NULL,
	"tutor_id" bigint NOT NULL,
	"materia_id" bigint NOT NULL,
	"fecha_preferida" date NOT NULL,
	"hora_preferida" time NOT NULL,
	"duracion_min" integer DEFAULT 90 NOT NULL,
	"mensaje" text,
	"estado" varchar(255) DEFAULT 'pendiente' NOT NULL,
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "solicitud_duracion_min_check" CHECK ((duracion_min > 0)),
	CONSTRAINT "solicitud_estado_check" CHECK (((estado)::text = ANY (ARRAY['pendiente'::text, 'aceptada'::text, 'rechazada'::text, 'cancelada'::text])))
);
CREATE TABLE "tutor" (
	"id" bigint PRIMARY KEY,
	"biografia" varchar(255),
	"frase_personal" varchar(255),
	"anios_experiencia" integer DEFAULT 0 NOT NULL,
	"precio_por_hora" numeric(10, 2) DEFAULT '0' NOT NULL,
	"duracion_sesion_min" integer DEFAULT 90 NOT NULL,
	"esta_disponible" boolean DEFAULT true NOT NULL,
	"calificacion_promedio" numeric(3, 2) DEFAULT '0' NOT NULL,
	"total_sesiones" integer DEFAULT 0 NOT NULL,
	"titulos" text[],
	"logros" text[],
	"creado_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tutor_anios_experiencia_check" CHECK ((anios_experiencia >= 0)),
	CONSTRAINT "tutor_calificacion_promedio_check" CHECK (((calificacion_promedio >= (0)::numeric) AND (calificacion_promedio <= (5)::numeric))),
	CONSTRAINT "tutor_duracion_sesion_min_check" CHECK ((duracion_sesion_min > 0)),
	CONSTRAINT "tutor_precio_por_hora_check" CHECK ((precio_por_hora >= (0)::numeric)),
	CONSTRAINT "tutor_total_sesiones_check" CHECK ((total_sesiones >= 0))
);