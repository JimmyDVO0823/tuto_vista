---
trigger: always_on
---

CREATE TABLE "tutor_insignia" (
	"tutor_id" bigint,
	"insignia_id" bigint,
	"obtenida_en" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tutor_insignia_pkey" PRIMARY KEY("tutor_id","insignia_id")
);
CREATE TABLE "tutor_materias" (
	"tutor_id" bigint,
	"materia_id" bigint,
	CONSTRAINT "tutor_materias_pkey" PRIMARY KEY("tutor_id","materia_id")
);
CREATE UNIQUE INDEX "actividad_estudiante_pkey" ON "actividad_estudiante" ("id");
CREATE UNIQUE INDEX "conversacion_pkey" ON "conversacion" ("id");
CREATE UNIQUE INDEX "conversacion_participantes_pkey" ON "conversacion_participantes" ("conversacion_id","perfil_id");
CREATE UNIQUE INDEX "departamento_nombre_key" ON "departamento" ("nombre");
CREATE UNIQUE INDEX "departamento_pkey" ON "departamento" ("id");
CREATE UNIQUE INDEX "disponibilidad_pkey" ON "disponibilidad" ("id");
CREATE UNIQUE INDEX "disponibilidad_especifica_pkey" ON "disponibilidad_especifica" ("id");
CREATE UNIQUE INDEX "estudiante_pkey" ON "estudiante" ("id");
CREATE UNIQUE INDEX "estudiante_plan_pkey" ON "estudiante_plan" ("id");
CREATE UNIQUE INDEX "factura_pago_id_key" ON "factura" ("pago_id");
CREATE UNIQUE INDEX "factura_pkey" ON "factura" ("id");
CREATE UNIQUE INDEX "insignia_nombre_key" ON "insignia" ("nombre");
CREATE UNIQUE INDEX "insignia_pkey" ON "insignia" ("id");
CREATE UNIQUE INDEX "materia_pkey" ON "materia" ("id");
CREATE UNIQUE INDEX "mensajes_pkey" ON "mensajes" ("id");
CREATE UNIQUE INDEX "notificaciones_pkey" ON "notificaciones" ("id");
CREATE UNIQUE INDEX "pago_pkey" ON "pago" ("id");
CREATE UNIQUE INDEX "pago_sesion_id_key" ON "pago" ("sesion_id");
CREATE UNIQUE INDEX "perfiles_correo_key" ON "perfiles" ("correo");
CREATE UNIQUE INDEX "perfiles_pkey" ON "perfiles" ("id");
CREATE UNIQUE INDEX "plan_tutoria_pkey" ON "plan_tutoria" ("id");
CREATE UNIQUE INDEX "recursos_pkey" ON "recursos" ("id");
CREATE UNIQUE INDEX "reporte_pkey" ON "reporte" ("id");
CREATE UNIQUE INDEX "resena_pkey" ON "resena" ("id");
CREATE UNIQUE INDEX "resena_sesion_id_key" ON "resena" ("sesion_id");
CREATE UNIQUE INDEX "sesion_tutoria_pkey" ON "sesion_tutoria" ("id");
CREATE UNIQUE INDEX "sesion_tutoria_solicitud_id_key" ON "sesion_tutoria" ("solicitud_id");
CREATE UNIQUE INDEX "solicitud_pkey" ON "solicitud" ("id");
CREATE UNIQUE INDEX "tutor_pkey" ON "tutor" ("id");
CREATE UNIQUE INDEX "tutor_insignia_pkey" ON "tutor_insignia" ("tutor_id","insignia_id");
CREATE UNIQUE INDEX "tutor_materias_pkey" ON "tutor_materias" ("tutor_id","materia_id");
ALTER TABLE "actividad_estudiante" ADD CONSTRAINT "actividad_estudiante_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "perfiles"("id");
ALTER TABLE "actividad_estudiante" ADD CONSTRAINT "actividad_estudiante_recurso_id_fkey" FOREIGN KEY ("recurso_id") REFERENCES "recursos"("id") ON DELETE CASCADE;
ALTER TABLE "actividad_estudiante" ADD CONSTRAINT "actividad_estudiante_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesion_tutoria"("id");
ALTER TABLE "conversacion_participantes" ADD CONSTRAINT "conversacion_participantes_conversacion_id_fkey" FOREIGN KEY ("conversacion_id") REFERENCES "conversacion"("id") ON DELETE CASCADE;
ALTER TABLE "conversacion_participantes" ADD CONSTRAINT "conversacion_participantes_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE CASCADE;
ALTER TABLE "disponibilidad" ADD CONSTRAINT "disponibilidad_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "disponibilidad_especifica" ADD CONSTRAINT "disponibilidad_especifica_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "estudiante" ADD CONSTRAINT "estudiante_id_fkey" FOREIGN KEY ("id") REFERENCES "perfiles"("id") ON DELETE RESTRICT;
ALTER TABLE "estudiante_plan" ADD CONSTRAINT "estudiante_plan_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE RESTRICT;
ALTER TABLE "estudiante_plan" ADD CONSTRAINT "estudiante_plan_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan_tutoria"("id") ON DELETE RESTRICT;
ALTER TABLE "factura" ADD CONSTRAINT "factura_pago_id_fkey" FOREIGN KEY ("pago_id") REFERENCES "pago"("id") ON DELETE RESTRICT;
ALTER TABLE "materia" ADD CONSTRAINT "materia_departamento_id_fkey" FOREIGN KEY ("departamento_id") REFERENCES "departamento"("id") ON DELETE RESTRICT;
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_conversacion_id_fkey" FOREIGN KEY ("conversacion_id") REFERENCES "conversacion"("id") ON DELETE CASCADE;
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "perfiles"("id") ON DELETE CASCADE;
ALTER TABLE "notificaciones" ADD CONSTRAINT "notificaciones_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfiles"("id") ON DELETE CASCADE;
ALTER TABLE "pago" ADD CONSTRAINT "pago_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE RESTRICT;
ALTER TABLE "pago" ADD CONSTRAINT "pago_estudiante_plan_id_fkey" FOREIGN KEY ("estudiante_plan_id") REFERENCES "estudiante_plan"("id") ON DELETE RESTRICT;
ALTER TABLE "pago" ADD CONSTRAINT "pago_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesion_tutoria"("id") ON DELETE RESTRICT;
ALTER TABLE "pago" ADD CONSTRAINT "pago_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE RESTRICT;
ALTER TABLE "plan_tutoria" ADD CONSTRAINT "plan_tutoria_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materia"("id") ON DELETE CASCADE;
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "reporte" ADD CONSTRAINT "reporte_reportado_a_fkey" FOREIGN KEY ("reportado_a") REFERENCES "perfiles"("id") ON DELETE CASCADE;
ALTER TABLE "reporte" ADD CONSTRAINT "reporte_reportado_por_fkey" FOREIGN KEY ("reportado_por") REFERENCES "perfiles"("id") ON DELETE CASCADE;
ALTER TABLE "reporte" ADD CONSTRAINT "reporte_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesion_tutoria"("id") ON DELETE SET NULL;
ALTER TABLE "resena" ADD CONSTRAINT "resena_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE CASCADE;
ALTER TABLE "resena" ADD CONSTRAINT "resena_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesion_tutoria"("id") ON DELETE CASCADE;
ALTER TABLE "resena" ADD CONSTRAINT "resena_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_cancelada_por_fkey" FOREIGN KEY ("cancelada_por") REFERENCES "perfiles"("id") ON DELETE SET NULL;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE CASCADE;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_estudiante_plan_id_fkey" FOREIGN KEY ("estudiante_plan_id") REFERENCES "estudiante_plan"("id") ON DELETE SET NULL;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materia"("id") ON DELETE RESTRICT;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_solicitud_id_fkey" FOREIGN KEY ("solicitud_id") REFERENCES "solicitud"("id") ON DELETE SET NULL;
ALTER TABLE "sesion_tutoria" ADD CONSTRAINT "sesion_tutoria_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "solicitud" ADD CONSTRAINT "solicitud_estudiante_id_fkey" FOREIGN KEY ("estudiante_id") REFERENCES "estudiante"("id") ON DELETE CASCADE;
ALTER TABLE "solicitud" ADD CONSTRAINT "solicitud_materia_id_fkey" FOREIGN KEY ("materia_id") REFERENCES "materia"("id") ON DELETE RESTRICT;
ALTER TABLE "solicitud" ADD CONSTRAINT "solicitud_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "tutor" ADD CONSTRAINT "tutor_id_fkey" FOREIGN KEY ("id") REFERENCES "perfiles"("id") ON DELETE RESTRICT;
ALTER TABLE "tutor_insignia" ADD CONSTRAINT "tutor_insignia_insignia_id_fkey" FOREIGN KEY ("insignia_id") REFERENCES "insignia"("id") ON DELETE CASCADE;
ALTER TABLE "tutor_insignia" ADD CONSTRAINT "tutor_insignia_tutor_id_fkey" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;
ALTER TABLE "tutor_materias" ADD CONSTRAINT "fk_materia" FOREIGN KEY ("materia_id") REFERENCES "materia"("id") ON DELETE RESTRICT;
ALTER TABLE "tutor_materias" ADD CONSTRAINT "fk_tutor" FOREIGN KEY ("tutor_id") REFERENCES "tutor"("id") ON DELETE CASCADE;