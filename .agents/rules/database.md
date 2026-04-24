---
trigger: always_on
---

## Table `calificaciones`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `sesion_id` | `int4` |  Unique |
| `estudiante_id` | `int4` |  |
| `tutor_id` | `int4` |  |
| `puntuacion` | `numeric` |  |
| `comentario` | `text` |  Nullable |
| `creado_en` | `timestamptz` |  |

## Table `departamentos`

### Columns

| Name | Type | Constraints |
|------|------|-------------|# Data Architecture & Business Rules: The Academic Editorial

## 1. Project Context
Este documento define el esquema de base de datos y las reglas de integridad para una plataforma de tutorías académicas premium. El flujo principal es: **Perfil -> Disponibilidad -> Solicitud -> Sesión -> Pago/Calificación.**

## 2. Business Logic Rules (AI Instructions)
- **Role Mapping:** Los usuarios se dividen en `estudiante` y `tutor` mediante la columna `rol` en `perfiles`.
- **Tutor Integrity:** Un `perfiles_tutor` NO puede existir sin un `perfiles` correspondiente (`usuario_id`).
- **Academic Catalog:** Las búsquedas se realizan sobre `materias`. La tabla `tutor_materias` es la fuente de verdad para saber qué enseña cada tutor.
- **Session Lifecycle:** Una `sesion` nace únicamente de una `solicitud_tutoria` con estado 'aceptada'.
- **Financial Calculation:** El `pago_tutor` es el resultado de `monto` - `comision_plataforma`.

## 3. Database Schema

### Table `perfiles`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `id` | `int4` | Primary | |
| `nombre_completo` | `text` | | Usar para UI Display |
| `correo` | `text` | Unique | |
| `url_avatar` | `text` | Nullable | Imagen de perfil |
| `rol` | `text` | | 'estudiante' o 'tutor' |
| `creado_en` | `timestamptz` | | |

### Table `perfiles_tutor`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `id` | `int4` | Primary | |
| `usuario_id` | `int4` | Unique | FK a perfiles.id |
| `biografia` | `text` | Nullable | |
| `anios_experiencia` | `int4` | Nullable | |
| `precio_por_hora` | `numeric` | | Base para cálculos de pago |
| `esta_disponible` | `bool` | | Switch global de visibilidad |
| `titulos` | `_text` | Nullable | Array de strings |

### Table `materias` & `departamentos`
| Table | Column | Type | Constraints |
|-------|--------|------|-------------|
| `departamentos` | `nombre` | `text` | Unique |
| `materias` | `nombre` | `text` | |
| `materias` | `departamento_id` | `int4` | FK a departamentos |

### Table `disponibilidad_tutor`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `tutor_id` | `int4` | | FK a perfiles.id (Tutor) |
| `dia_semana` | `int4` | | 0 (Dom) a 6 (Sáb) |
| `hora_inicio` | `time` | | |
| `hora_fin` | `time` | | |

### Table `sesiones`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `id` | `int4` | Primary | |
| `estudiante_id` | `int4` | | FK a perfiles |
| `tutor_id` | `int4` | | FK a perfiles |
| `materia_id` | `int4` | | |
| `programada_para` | `timestamptz` | | Fecha y hora del encuentro |
| `estado` | `text` | | 'programada', 'completada', 'cancelada' |
| `enlace_reunion` | `text` | Nullable | Link a Zoom/Meet |

### Table `pagos`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `sesion_id` | `int4` | | FK a sesiones |
| `monto` | `numeric` | | Total pagado por estudiante |
| `comision_plataforma`| `numeric` | | Fee del sitio |
| `pago_tutor` | `numeric` | | Neto para el tutor |
| `estado` | `text` | | 'pendiente', 'pagado' |

### Table `calificaciones`
| Name | Type | Constraints | Description |
|------|------|-------------|-------------|
| `sesion_id` | `int4` | Unique | 1 calificación por sesión |
| `puntuacion` | `numeric` | | 1.0 a 5.0 |
| `comentario` | `text` | Nullable | |

## 4. Coding Standards for Agent
- **Naming:** Backend usa `snake_case`, Frontend usa `camelCase`. Mapear automáticamente.
- **Filtering:** Al consultar `sesiones` o `pagos`, filtrar siempre por el `id` del usuario en sesión.
- **Formatting:** Precios en `numeric` deben formatearse según la moneda de la tabla `pagos`.
- **Modality:** Las tablas de `solicitudes_tutoria` y `sesiones` son el corazón del Dashboard.
| `id` | `int4` | Primary |
| `nombre` | `text` |  Unique |

## Table `disponibilidad_tutor`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `tutor_id` | `int4` |  |
| `dia_semana` | `int4` |  |
| `hora_inicio` | `time` |  |
| `hora_fin` | `time` |  |
| `esta_activo` | `bool` |  |

## Table `materias`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `nombre` | `text` |  |
| `departamento_id` | `int4` |  Nullable |

## Table `notificaciones`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `usuario_id` | `int4` |  |
| `titulo` | `text` |  |
| `cuerpo` | `text` |  |
| `creado_en` | `timestamptz` |  |

## Table `pagos`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `sesion_id` | `int4` |  |
| `estudiante_id` | `int4` |  |
| `tutor_id` | `int4` |  |
| `monto` | `numeric` |  |
| `comision_plataforma` | `numeric` |  |
| `pago_tutor` | `numeric` |  Nullable |
| `moneda` | `text` |  |
| `estado` | `text` |  |
| `pagado_en` | `timestamptz` |  Nullable |
| `creado_en` | `timestamptz` |  |

## Table `perfiles`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `nombre_completo` | `text` |  |
| `correo` | `text` |  Unique |
| `url_avatar` | `text` |  Nullable |
| `rol` | `text` |  |
| `creado_en` | `timestamptz` |  |

## Table `perfiles_tutor`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `usuario_id` | `int4` |  Unique |
| `biografia` | `text` |  Nullable |
| `anios_experiencia` | `int4` |  Nullable |
| `precio_por_hora` | `numeric` |  Nullable |
| `duracion_sesion_min` | `int4` |  Nullable |
| `esta_disponible` | `bool` |  |
| `calificacion_promedio` | `numeric` |  Nullable |
| `total_sesiones` | `int4` |  Nullable |
| `titulos` | `_text` |  Nullable |
| `logros` | `_text` |  Nullable |
| `creado_en` | `timestamptz` |  |

## Table `recursos`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `tutor_id` | `int4` |  |
| `materia_id` | `int4` |  Nullable |
| `titulo` | `text` |  |
| `descripcion` | `text` |  Nullable |
| `url_archivo` | `text` |  Nullable |
| `creado_en` | `timestamptz` |  |

## Table `sesiones`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `solicitud_id` | `int4` |  Nullable Unique |
| `estudiante_id` | `int4` |  |
| `tutor_id` | `int4` |  |
| `materia_id` | `int4` |  |
| `programada_para` | `timestamptz` |  |
| `duracion_min` | `int4` |  |
| `precio` | `numeric` |  |
| `enlace_reunion` | `text` |  Nullable |
| `estado` | `text` |  |
| `cancelada_por` | `int4` |  Nullable |
| `motivo_cancelacion` | `text` |  Nullable |
| `creado_en` | `timestamptz` |  |

## Table `solicitudes_tutoria`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int4` | Primary |
| `estudiante_id` | `int4` |  |
| `tutor_id` | `int4` |  |
| `materia_id` | `int4` |  |
| `fecha_preferida` | `date` |  |
| `hora_preferida` | `time` |  |
| `duracion_min` | `int4` |  |
| `mensaje` | `text` |  Nullable |
| `estado` | `text` |  |
| `creado_en` | `timestamptz` |  |

## Table `tutor_materias`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `tutor_id` | `int4` | Primary |
| `materia_id` | `int4` | Primary |