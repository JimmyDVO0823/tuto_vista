---
trigger: always_on
---

Tu objetivo es construir un backend completo, coherente y escalable basado en la base de datos existente.

---

## 2. SOURCE OF TRUTH (OBLIGATORIO)

La base de datos es la única fuente de verdad.

Reglas estrictas:

- NO inventar tablas
- NO modificar columnas
- NO cambiar relaciones
- NO alterar tipos de datos

---

## 4. PROJECT STRUCTURE (OBLIGATORIO)

Generar el backend con esta estructura exacta:

├── controllers/
├── services/
├── repositories/
├── entities/
├── dto/
├── security/
├── config/
├── exceptions/
├── utils/
└── enums/

Regla:
- NO crear carpetas adicionales sin justificación explícita.

---

## 5. ENTITY RULES (JPA + LOMBOK)

Cada tabla → entidad JPA.

Reglas:

- Usar @Table con nombre exacto de la BD
- Usar Lombok obligatorio:
  - @Getter
  - @Setter
  - @NoArgsConstructor
  - @AllArgsConstructor

- NO escribir getters/setters manuales
- NO usar @Data en entidades con relaciones complejas

---

## 6. ENUM RULES (OBLIGATORIO)

Todos los campos TEXT con restricciones CHECK deben convertirse en enums Java.

Siempre usar:

- @Enumerated(EnumType.STRING)

Nunca usar strings libres para estados o roles.

---

### ENUMS OBLIGATORIOS

#### Rol
ESTUDIANTE, TUTOR, ADMINISTRADOR

---

#### EstadoSolicitud
PENDIENTE, ACEPTADA, RECHAZADA, CANCELADA

---

#### EstadoSesion
PROGRAMADA, EN_PROGRESO, COMPLETADA, CANCELADA, NO_ASISTIO

---

#### EstadoPago
PENDIENTE, COMPLETADO, REEMBOLSADO, FALLIDO

---

#### TipoRecurso
DOCUMENTO, VIDEO, ENLACE, IMAGEN, OTRO

---

## 7. RELATIONSHIP RULES (BASED ON DATABASE)

Mapear exactamente:

- perfiles → tutor (1:1)
- perfiles → estudiante (1:1)
- tutor → materia (N:M via tutor_materias)
- tutor → disponibilidad (1:N)
- estudiante → solicitud (1:N)
- tutor → solicitud (1:N)
- solicitud → sesion_tutoria (1:1 opcional)
- sesion_tutoria → pago (1:1)
- sesion_tutoria → resena (1:1)
- conversacion → mensajes (1:N)
- conversacion ↔ perfiles (N:M via conversacion_participantes)

---

## 8. BUSINESS FLOW (CRÍTICO)

Flujo principal obligatorio:

perfil → solicitud → sesion_tutoria → pago → resena

---

## 9. SERVICE LAYER ARCHITECTURE

Crear servicios separados por dominio:

- AuthService
- PerfilService
- TutorService
- EstudianteService
- SolicitudService
- SesionTutoriaService
- PagoService
- ResenaService
- ChatService
- NotificacionService

---

## 10. API DESIGN RULES

Endpoints REST consistentes:

- POST /auth/register
- POST /auth/login

- GET /tutores
- GET /tutores/{id}

- POST /solicitudes
- PATCH /solicitudes/{id}

- POST /sesiones
- POST /pagos
- POST /resenas

---

## 11. SECURITY RULES

- JWT stateless authentication
- BCrypt password hashing
- Roles basados en enum Rol

Endpoints públicos:
- /auth/**
- GET /tutores
- GET /materias

---

## 12. VALIDATION RULES

- Usar Bean Validation en DTOs
- Validar enums automáticamente
- Validar constraints de la base de datos
- Nunca permitir estados inválidos

---

## 13. DEVELOPMENT FLOW (OBLIGATORIO)

Antes de generar código:

1. Analizar tablas involucradas
2. Identificar relaciones
3. Definir flujo de negocio
4. Crear entidades JPA
5. Crear enums
6. Crear repositorios
7. Crear services
8. Crear controllers

---

## 14. QUALITY RULES

- No lógica en controllers
- Services contienen toda la lógica de negocio
- DTOs obligatorios (nunca exponer entidades)
- Código limpio y sin boilerplate innecesario
- Uso obligatorio de Lombok
- Uso obligatorio de enums
- Uso correcto de utils/ solo para funciones puras reutilizables (NO lógica de negocio)

---

## 15. FINAL OBJECTIVE

Construir un backend completo, escalable y coherente con la base de datos del sistema de tutorías, listo para integrarse con frontend sin necesidad de refactorización.