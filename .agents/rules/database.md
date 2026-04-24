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
|------|------|-------------|
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

