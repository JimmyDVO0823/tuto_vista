# Inventario de Componentes — `tuto_vista_vite`

> Generado: 2026-05-23 | Versión: 1.0

---

## Parte 1 — Árbol de Directorios Propuesto (Feature-Based Architecture)

La estructura actual mezcla componentes flotantes en `components/chat/` con la jerarquía `components/features/`, y no tiene carpetas dedicadas para `hooks`, `routes`, ni `services`. A continuación, la propuesta de reorganización:

```
src/
├── App.jsx                          # Raíz de la aplicación (solo routing)
├── main.jsx                         # Entry point de Vite
├── index.css                        # Estilos globales / tokens
│
├── assets/                          # Imágenes, SVG, fuentes estáticas
│
├── routes/                          # [NUEVO] Definición centralizada de rutas
│   └── AppRoutes.jsx                # <Routes> con rutas públicas y privadas
│
├── context/                         # Contextos globales de React
│   └── AuthContext.jsx
│
├── hooks/                           # [NUEVO] Hooks reutilizables globales
│   └── useAuth.js                   # Wrapper sobre useContext(AuthContext)
│
├── services/                        # [NUEVO] Capa de acceso a datos
│   ├── api.js                       # (movido desde lib/) Configuración base de fetch
│   └── jwt.js                       # (movido desde lib/) Utilidades JWT
│
├── components/
│   ├── ui/                          # Componentes atómicos sin lógica de negocio
│   │   ├── Button/
│   │   ├── Pagination/
│   │   ├── Searcher/
│   │   └── SubjectTable/
│   │
│   └── layout/                      # Envolturas estructurales de la app
│       ├── MainLayout/
│       ├── Header/
│       ├── Footer/
│       ├── Navbar/
│       └── Sidebar/
│
├── features/                        # [REORGANIZADO] Un módulo por dominio de negocio
│   │
│   ├── auth/                        # Dominio: Autenticación
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   └── ProtectedRoute/
│   │
│   ├── home/                        # Dominio: Landing Page
│   │   ├── HeroSection/
│   │   ├── CategoriesSection/
│   │   ├── CTASection/
│   │   ├── HowItWorksSection/
│   │   └── TestimonialsSection/
│   │
│   ├── dashboard/                   # Dominio: Panel de Control
│   │   ├── AcademicCalendar/
│   │   ├── ActivityCard/
│   │   ├── IncomeChart/             # (movido desde Rechart/)
│   │   ├── NextSessions/
│   │   ├── NotificationWidget/
│   │   ├── PendingAssignments/
│   │   └── SemesterProgressWidget/
│   │
│   ├── tutors/                      # Dominio: Explorador de Tutores
│   │   ├── AddSubjectModal/
│   │   ├── RequestCard/
│   │   ├── SearchFilters/
│   │   ├── SessionCard/
│   │   ├── TutorCard/
│   │   └── TutorSearchHeader/
│   │
│   └── chat/                        # Dominio: Mensajería
│       ├── ChatHeader/
│       ├── ContactMenu/
│       ├── FileAttachment/
│       ├── MessageBubble/
│       ├── MessageInputBar/
│       └── ProfileBlock/
│
└── pages/                           # Páginas/Views (orquestan features)
    ├── Home.jsx
    ├── Login.jsx
    ├── TutorsExplorer.jsx
    ├── TutorAgendaDetail.jsx
    ├── DashboardSwitcher.jsx
    ├── DashboardStudent.jsx
    ├── DashboardTutor.jsx
    ├── DashboardAdmin.jsx
    ├── AcademicChat.jsx
    ├── GestionTutorias.jsx
    ├── DispoManagement.jsx
    ├── SubjectsManagement.jsx
    ├── MyTutorsHistory.jsx
    └── UsersManagement.jsx
```

### Reglas Anti-Ciclos de Importación

| Capa | Puede importar de | Nunca importa de |
|------|-------------------|------------------|
| `pages/` | `features/`, `components/layout/`, `components/ui/`, `context/`, `services/` | — |
| `features/` | `components/ui/`, `context/`, `services/`, `hooks/` | `pages/`, otros `features/` distintos |
| `components/ui/` | nada del proyecto | `features/`, `pages/`, `context/` |
| `components/layout/` | `components/ui/`, `context/`, `hooks/` | `features/`, `pages/` |
| `services/` | nada del proyecto | Nada |
| `context/` | `services/`, `hooks/` | `features/`, `pages/` |

---

## Parte 2 — Inventario de Componentes

### 🏠 Pages (Páginas / Vistas)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `Home` | `src/pages/Home.jsx` | Page | Landing pública; orquesta secciones del home |
| `Login` | `src/pages/Login.jsx` | Page | Página de inicio de sesión (envuelve `LoginForm`) |
| `TutorsExplorer` | `src/pages/TutorsExplorer.jsx` | Page | Listado, búsqueda y filtrado de tutores |
| `TutorAgendaDetail` | `src/pages/TutorAgendaDetail.jsx` | Page | Perfil detallado de tutor con agenda y reserva |
| `DashboardSwitcher` | `src/pages/DashboardSwitcher.jsx` | Page | Redirige al dashboard correcto según el rol del usuario |
| `DashboardStudent` | `src/pages/DashboardStudent.jsx` | Page | Panel de control del estudiante |
| `DashboardTutor` | `src/pages/DashboardTutor.jsx` | Page | Panel de control del tutor |
| `DashboardAdmin` | `src/pages/DashboardAdmin.jsx` | Page | Panel de control del administrador |
| `AcademicChat` | `src/pages/AcademicChat.jsx` | Page | Interfaz completa de mensajería en tiempo real |
| `GestionTutorias` | `src/pages/GestionTutorias.jsx` | Page | Gestión de solicitudes y sesiones de tutoría |
| `DispoManagement` | `src/pages/DispoManagement.jsx` | Page | Gestión de horarios de disponibilidad del tutor |
| `SubjectsManagement` | `src/pages/SubjectsManagement.jsx` | Page | Gestión de materias asignadas al tutor |
| `MyTutorsHistory` | `src/pages/MyTutorsHistory.jsx` | Page | Historial de tutores del estudiante |
| `UsersManagement` | `src/pages/UsersManagement.jsx` | Page | Gestión de usuarios (solo admin) |

---

### 🗂️ Layout (Estructura y Envoltura)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `MainLayout` | `src/components/layout/MainLayout/MainLayout.jsx` | Layout | Shell principal con Sidebar + área de contenido |
| `Header` | `src/components/layout/Header/Header.jsx` | Layout | Cabecera global de la aplicación pública |
| `Footer` | `src/components/layout/Footer/Footer.jsx` | Layout | Pie de página global |
| `Navbar` | `src/components/layout/Navbar/` | Layout | Barra de navegación de la app pública |
| `Sidebar` | `src/components/layout/Sidebar/` | Layout | Panel lateral de navegación del dashboard autenticado |
| `SidebarItem` | `src/components/layout/Sidebar/SidebarItem.jsx` | Layout Atómico | Ítem individual de link navegable en el Sidebar |

---

### 🔐 Feature — Autenticación (`auth`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `LoginForm` | `src/components/features/auth/LoginForm/LoginForm.jsx` | Feature-Auth | Formulario de login con validación y JWT |
| `RegisterForm` | `src/components/features/auth/RegisterForm/RegisterForm.jsx` | Feature-Auth | Formulario de registro; crea perfil y rol en BD |
| `ProtectedRoute` | `src/components/features/auth/ProtectedRoute/ProtectedRoute.jsx` | Feature-Auth | HOC guard de rutas privadas basado en AuthContext |

---

### 🏡 Feature — Home / Landing (`home`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `HeroSection` | `src/components/features/home/HeroSection/HeroSection.jsx` | Feature-Home | Sección héroe principal con CTA de conversión |
| `CategoriesSection` | `src/components/features/home/CategoriesSection/CategoriesSection.jsx` | Feature-Home | Grid de categorías/materias disponibles en la plataforma |
| `CTASection` | `src/components/features/home/CTASection/CTASection.jsx` | Feature-Home | Banner de llamada a la acción secundario (registro) |
| `HowItWorksSection` | `src/components/features/home/HowItWorksSection/HowItWorksSection.jsx` | Feature-Home | Explica el flujo de la plataforma en pasos visuales |
| `TestimonialsSection` | `src/components/features/home/TestimonialsSection/TestimonialsSection.jsx` | Feature-Home | Reseñas y testimonios de estudiantes/tutores |

---

### 📊 Feature — Dashboard (`dashboard`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `AcademicCalendar` | `src/components/features/dashboard/AcademicCalendar/AcademicCalendar.jsx` | Feature-Dashboard | Calendario interactivo de sesiones y solicitudes del semestre |
| `EventPreviewCard` | `src/components/features/dashboard/AcademicCalendar/EventPreviewCard.jsx` | Feature-Dashboard | Tarjeta de detalle que aparece al hacer hover sobre un evento |
| `ActivityCard` | `src/components/features/dashboard/ActivityCard/ActivityCard.jsx` | Feature-Dashboard | Tarjeta de una actividad o tarea pendiente del estudiante |
| `NextSessions` | `src/components/features/dashboard/NextSessions/NextSessions.jsx` | Feature-Dashboard | Lista de próximas sesiones programadas (tutor + estudiante) |
| `NotificationWidget` | `src/components/features/dashboard/NotificationWidget/NotificationWidget.jsx` | Feature-Dashboard | Widget de notificaciones con scroll, íconos por tipo y carga progresiva |
| `PendingAssignments` | `src/components/features/dashboard/PendingAssignments/PendingAssignments.jsx` | Feature-Dashboard | Lista de tareas/actividades pendientes del estudiante |
| `IncomeChart` | `src/components/features/dashboard/Rechart/IncomeChart.jsx` | Feature-Dashboard | Gráfico de ingresos del tutor por período (Recharts) |
| `SemesterProgressWidget` | `src/components/features/dashboard/SemesterProgressWidget/SemesterProgressWidget.jsx` | Feature-Dashboard | Widget de fracción de sesiones completadas en el semestre |

---

### 🎓 Feature — Tutores (`tutors`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `TutorCard` | `src/components/features/tutors/TutorCard/TutorCard.jsx` | Feature-Tutors | Tarjeta de presentación resumida de un tutor |
| `TutorSearchHeader` | `src/components/features/tutors/TutorSearchHeader/TutorSearchHeader.jsx` | Feature-Tutors | Barra de búsqueda por nombre en el explorador de tutores |
| `SearchFilters` | `src/components/features/tutors/SearchFilters/SearchFilters.jsx` | Feature-Tutors | Panel de filtros avanzados (depto, materia, precio, rating) |
| `RequestCard` | `src/components/features/tutors/RequestCard/RequestCard.jsx` | Feature-Tutors | Tarjeta de una solicitud de tutoría pendiente/respondida |
| `SessionCard` | `src/components/features/tutors/SessionCard/SessionCard.jsx` | Feature-Tutors | Tarjeta de una sesión aceptada con estado y acciones |
| `AddSubjectModal` | `src/components/features/tutors/AddSubjectModal/AddSubjectModal.jsx` | Feature-Tutors | Modal para que el tutor agregue/elimine materias |

---

### 💬 Feature — Chat (`chat`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `ChatHeader` | `src/components/chat/ChatHeader.jsx` | Feature-Chat | Cabecera de la ventana de chat con info del contacto activo |
| `ContactMenu` | `src/components/chat/ContactMenu.jsx` | Feature-Chat | Lista de conversaciones/contactos en el panel lateral del chat |
| `MessageBubble` | `src/components/chat/MessageBubble.jsx` | Feature-Chat | Burbuja visual de un mensaje, diferenciando enviado/recibido |
| `MessageInputBar` | `src/components/chat/MessageInputBar.jsx` | Feature-Chat | Barra de composición y envío de mensajes |
| `FileAttachment` | `src/components/chat/FileAttachment.jsx` | Feature-Chat | Componente para adjuntar y previsualizar archivos en el chat |
| `ProfileBlock` | `src/components/chat/ProfileBlock.jsx` | Feature-Chat | Bloque con avatar y nombre del interlocutor activo |

---

### 🧩 Componentes UI Atómicos (`components/ui`)

| Componente | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `Button` | `src/components/ui/Button/` | UI Atómico | Botón reutilizable con variantes de estilo |
| `Pagination` | `src/components/ui/Pagination/` | UI Atómico | Control de paginación para listas largas |
| `Searcher` | `src/components/ui/Searcher/` | UI Atómico | Input de búsqueda reutilizable con icono |
| `SubjectTable` | `src/components/ui/SubjectTable/` | UI Atómico | Tabla de materias asignadas a un tutor |

---

### 🔧 Servicios y Contextos (No-Componentes)

| Módulo | Ruta Actual | Tipo | Responsabilidad |
|---|---|---|---|
| `AuthContext` | `src/context/AuthContext.jsx` | Context | Provee y consume el estado de autenticación global (`user`, `token`) |
| `api.js` | `src/lib/api.js` | Service | Cliente HTTP base (GET, POST, PATCH, DELETE) con manejo de JWT y errores |
| `jwt.js` | `src/lib/jwt.js` | Service | Utilidades de decodificación/validación de tokens JWT |

---

## Resumen Estadístico

| Categoría | Cantidad |
|---|---|
| Pages | 14 |
| Layout | 6 |
| Feature — Auth | 3 |
| Feature — Home | 5 |
| Feature — Dashboard | 8 |
| Feature — Tutores | 6 |
| Feature — Chat | 6 |
| UI Atómicos | 4 |
| Servicios/Contextos | 3 |
| **Total** | **55** |
