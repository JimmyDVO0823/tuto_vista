# RequestCard Component

El componente `RequestCard` es una tarjeta especializada para la visualización y gestión de solicitudes de tutoría en el panel del tutor. Sigue estrictamente los principios de diseño "Academic Editorial".

## 🎨 Principios de Diseño Aplicados

- **Asimetría Intencional**: El diseño se divide en una proporción 30/70. La columna izquierda (30%) muestra el perfil del estudiante, mientras que la derecha (70%) presenta los detalles académicos.
- **Tonal Layering (Sin Bordes Sólidos)**: Utiliza `bg-surface-container-lowest` sobre un fondo `bg-surface` o `bg-surface-container-low`, apoyado por una sombra sutil (`shadow-ambient`) en lugar de bordes marcados.
- **Microinteracciones**: Efecto de elevación (`hover:-translate-y-1`) sutil al pasar el cursor para invitar a la interacción sin ser ruidoso.
- **Tipografía Jerárquica**: Uso de `text-[10px] uppercase tracking-widest` para las etiquetas (metadata) y `font-bold text-primary` para los datos críticos.

## ⚙️ Props

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `solicitud` | `Object` | Objeto `SolicitudDTO` que contiene toda la información de la solicitud. |
| `onAccept` | `Function` | Callback invocado cuando el tutor hace clic en "Aceptar Tutoría". Recibe el `id` de la solicitud. |
| `onReject` | `Function` | Callback invocado cuando el tutor hace clic en "Rechazar". Recibe el `id` de la solicitud. |
| `isLoading` | `boolean` | Deshabilita los botones y cambia el texto del CTA principal a "Procesando...". |

## 🧩 Estructura Interna

1. **Avatar y Nombre**: Usa `ui-avatars` con el color `primary` (`#002045`) como fallback si no hay foto real.
2. **Badge de Materia**: Resalta el área de estudio con `bg-surface-container-low` para un contraste suave.
3. **Detalles de Fecha y Hora**: Presenta la fecha en formato local y calcula visualmente la hora de finalización basada en la duración (`horaPreferida` + `duracionMin`).
4. **Cita (Mensaje)**: El mensaje del estudiante se presenta en formato itálico y entrecomillado, simulando una cita textual en un entorno académico.
5. **CTAs**: 
    - **Rechazar**: Botón "Ghost" que toma prominencia de error (rojo) solo en estado `hover`.
    - **Aceptar**: Botón principal usando la `.signature-gradient`.
