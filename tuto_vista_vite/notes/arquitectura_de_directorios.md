# Arquitectura de Directorios: The Academic Editorial

Este documento detalla la estructura de archivos del proyecto frontend (React + Vite), diseñada para ser escalable, mantenible y profesional. Seguimos una filosofía de **Diseño Atómico Simplificado** y **Organización Basada en Funcionalidades**.

---

## 📂 Directorio Raíz del Proyecto

La estructura principal del proyecto (`src/`) se divide en:

*   **`assets/`**: Recursos estáticos como imágenes y logotipos.
*   **`components/`**: La librería de componentes central (ver detalle abajo).
*   **`pages/`**: Vistas completas que ensamblan los componentes. Corresponden a las rutas del navegador.
*   **`styles/`**: Configuraciones globales de Tailwind y CSS base.
*   **`notes/`**: Documentación interna y guías de estilo para desarrolladores.

---

## 📂 Librería de Componentes (`src/components/`)

Hemos organizado los componentes en tres capas lógicas para evitar el desorden y facilitar la reutilización:

### 1. 🛠️ UI (Atomic) (`src/components/ui/`)
Contiene componentes "átomos" o primitivos. Son elementos visuales simples que no dependen de otros componentes y se repiten en toda la aplicación.
*   **Ejemplos**: `Button.jsx`, `Pagination.jsx`.
*   **Regla**: Deben ser lo más genéricos posible, usando `props` para variar su estilo.

### 2. 🏗️ Layout (`src/components/layout/`)
Define el esqueleto y la estructura visual de la aplicación. Estos componentes suelen ser contenedores de alto nivel.
*   **Ejemplos**: `MainLayout.jsx`, `Sidebar.jsx`, `Navbar.jsx`, `Footer.jsx`.
*   **Regla**: El `MainLayout` es el "Layout Maestro" que envuelve a todas las páginas de la aplicación.

### 3. 🧩 Features (`src/components/features/`)
Contiene componentes complejos y específicos de una funcionalidad o dominio del negocio. Se subdividen por área:

*   **`auth/`**: Formularios de acceso y registro (`LoginForm`, `RegisterForm`).
*   **`home/`**: Secciones exclusivas de la página de aterrizaje (`HeroSection`, `HowItWorksSection`, `TestimonialsSection`).
*   **`tutors/`**: Componentes para la lógica de búsqueda y visualización de tutores (`TutorCard`, `SearchFilters`, `TutorSearchHeader`).

---

## 📜 Convenciones de Nombres
1.  **Componentes**: Siempre en **PascalCase** (`MyComponent.jsx`).
2.  **Stories**: Guardadas junto al componente con extensión `.stories.jsx`.
3.  **Tests**: Guardados junto al componente con extensión `.test.jsx`.

---

## 🚀 Beneficios de esta Estructura
- **Localización Rápida**: Si necesitas cambiar el banner del home, sabes exactamente que está en `features/home`.
- **Escalabilidad**: Podemos añadir 50 componentes nuevos y el directorio `src/components` seguirá estando limpio.
- **Storybook**: Al estar el `.stories.jsx` al lado del código, es más fácil actualizar la documentación visual mientras se desarrolla.
