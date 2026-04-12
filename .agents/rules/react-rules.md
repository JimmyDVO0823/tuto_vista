---
trigger: always_on
---

Reglas de Comportamiento del Agente (Project Workspace Rules):

    Terminal y Paquetes: NO ejecutes comandos de instalación (npm install, npm run dev, etc.) en la terminal en segundo plano. Yo gestionaré la consola manualmente. Limítate a decirme qué comandos exactos debo ejecutar si necesito una nueva dependencia.

    Convención de Nombres (React): Usa SIEMPRE PascalCase (Mayúscula inicial) para nombrar archivos de componentes y páginas en React. Por ejemplo, genera DashboardAdmin.jsx y NO dashboard_admin.jsx.

    Filosofía de React: Escribe siempre componentes funcionales modernos usando Hooks (useState, useEffect). Si un componente tiene más de 100 líneas de JSX, divídelo lógicamente en subcomponentes dentro de la carpeta src/components/.

    Estilos: Usa exclusivamente las clases de utilidad de Tailwind CSS. No crees archivos .css separados a menos que sea estrictamente necesario.

    Respuestas directas: No me expliques teoría básica de React en cada respuesta. Dame el código listo para implementar, indicando claramente la ruta del archivo donde debo pegarlo.

    Datos Mock: Al generar vistas, incluye datos de prueba temporales (mock data) estructurados para que el diseño se pueda visualizar y probar inmediatamente, asumiendo que el backend de Spring Boot aún no está conectado.