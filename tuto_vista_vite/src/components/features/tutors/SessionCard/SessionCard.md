# SessionCard Component

El componente `SessionCard` visualiza una sesión de tutoría que ya ha sido aceptada y programada. Diseñado bajo la estética "Academic Editorial".

## 🎨 Principios de Diseño Aplicados

- **No-line Rule (Sin bordes)**: Estructurado usando una tarjeta con fondo plano `bg-surface-container-lowest` y una sombra difuminada para dar volumen sin ensuciar la interfaz con bordes sólidos de 1px.
- **Micro-interacciones**: Efecto sutil de traslación vertical al hacer hover (`hover:-translate-y-1`) para dar vida al listado de agenda.
- **Tratamiento Horario (Timezone-proof)**: Procesa fechas forzando la zona horaria a `UTC` ya que el backend de Spring Boot almacena las horas en UTC pero con la intención de que actúen como local de la institución.
- **Acciones Directas**: Un botón para cancelar tutoría resaltado con tonos rojos suaves y un botón flotante en el banner del enlace de reunión si la sesión cuenta con uno.

## ⚙️ Props

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `session` | `Object` | Objeto `SesionTutoriaDTO` que describe la tutoría. |
| `onCancel` | `Function` | Callback invocado al presionar el botón de cancelación. Recibe el `id` de la sesión. |
| `isLoading` | `boolean` | Indica que se está procesando la cancelación, deshabilitando botones y cambiando el estado textual. |

## 🧩 Elementos Visuales Destacados

1. **Badge de Estado**: Muestra de forma concisa si la tutoría está en estado programado o en progreso.
2. **Caja de Enlace (Meeting Box)**: Si la sesión contiene un enlace de Google Meet/Zoom, renderiza una caja en la parte inferior permitiendo copiar o unirse de inmediato mediante un botón primario de marca.
3. **Botón Cancelar**: Diseñado en base a `bg-red-50 text-red-600` para indicar una acción destructiva de forma elegante y poco intrusiva.
