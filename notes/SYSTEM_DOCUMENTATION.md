# DOCUMENTACIÓN TÉCNICA: TUTOVISTA

## 1. INTRODUCCIÓN
TutoVista es una plataforma integral de gestión de tutorías académicas diseñada para conectar estudiantes con tutores especializados. El sistema permite la gestión de perfiles, agendamiento de sesiones, comunicación en tiempo real vía WebSockets, pagos simulados y sistemas de reseñas/insignias.

### Arquitectura General
El proyecto sigue una arquitectura **Client-Server** desacoplada:
- **Backend**: Microservicio desarrollado con Java 17, Spring Boot 3 y PostgreSQL.
- **Frontend**: Aplicación Single Page (SPA) desarrollada con React, Vite y Tailwind CSS.

---

## 2. INFRAESTRUCTURA Y BASE DE DATOS
El sistema utiliza una base de datos relacional PostgreSQL con un esquema complejo diseñado para la integridad académica y financiera.

### Esquema de Datos (Entidades Clave)
- **Perfiles**: Gestión centralizada de usuarios (Estudiante, Tutor, Administrador).
- **Tutor**: Perfil extendido con biografía, experiencia, precio y calificacion.
- **Materia/Departamento**: Estructura jerárquica de conocimiento académico.
- **Solicitud**: Flujo inicial de propuesta de tutoría.
- **Sesión Tutoría**: Encuentro académico confirmado resultante de una solicitud aceptada y pagada.
- **Disponibilidad**: Horarios recurrentes y fechas específicas configuradas por el tutor.
- **Chat**: Sistema de mensajería basado en conversaciones y participantes.

---

## 3. BACKEND (Spring Boot)
El backend está estructurado siguiendo los principios de **Clean Architecture** y **Package-by-Layer**.

### Capas del Sistema
1.  **Controller**: Endpoints REST que gestionan las peticiones HTTP. Utilizan estrictamente **DTOs**.
2.  **Service**: Capa de lógica de negocio y orquestación. Encargada de convertir DTOs a Entidades y viceversa.
3.  **Repository**: Interfaces JPA para persistencia de datos.
4.  **Entity**: Modelos de dominio mapeados a tablas SQL mediante Hibernate.
5.  **Security**: Configuración de JWT, filtros de autenticación y autorización por roles (BCrypt para hashes).

### Módulos Críticos
- **ChatService**: Gestiona la persistencia de mensajes y la lógica de WebSockets.
- **AuthService**: Gestión de registro, login y generación de tokens JWT.
- **GestionTutorias**: Orquestación del flujo `Solicitud -> Pago -> Sesión`.

---

## 4. FRONTEND (React + Vite)
El frontend prioriza una experiencia de usuario fluida y un diseño editorial académico de alta gama.

### Características Principales
- **Diseño Editorial**: Basado en el North Star "The Modern Scholar", con tipografía Manrope/Inter y asimetría intencional.
- **Gestión de Estado**: Context API (`AuthContext`) para la sesión del usuario.
- **Comunicación**: `WebSocketService` dedicado para el chat en tiempo real.
- **Alertas**: Integración total con `SweetAlert2` para notificaciones y confirmaciones.

### Rutas y Páginas
- `/login`, `/register`: Gestión de acceso.
- `/tutors`: Explorador de tutores con filtros avanzados.
- `/tutor/:id`: Perfil detallado del tutor y sistema de agendamiento.
- `/dashboard-student`: Panel de sesiones, pagos y progreso.
- `/dashboard-tutor`: Gestión de solicitudes, agenda y recursos.
- `/chat`: Interfaz de mensajería académica.
- `/dispo-management`: Calendario interactivo para tutores.

---

## 5. FLUJOS DE NEGOCIO

### Ciclo de Vida de una Tutoría
1.  **Solicitud**: El estudiante elige un bloque horario y envía una propuesta.
2.  **Aceptación**: El tutor revisa y acepta la solicitud.
3.  **Pago**: El estudiante realiza el pago (Mercado Pago / Simulado).
4.  **Sesión**: Se genera automáticamente la sesión con el enlace de reunión.
5.  **Cierre**: El tutor completa la sesión y el estudiante puede dejar una reseña.

### Sistema de Soporte
Integrado con persistencia en base de datos para FAQs dinámicas y contacto directo vía email con copiado al portapapeles.

---

## 6. DESPLIEGUE
- **Frontend**: Desplegado en GitHub Pages.
- **Backend**: Contenedorizado en Railway.
- **Base de Datos**: PostgreSQL gestionado en la nube.
