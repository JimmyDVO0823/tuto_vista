package com.tutorias.tutorias_backend.enums;

/**
 * Representa los estados de una sesión de tutoría.
 * Se usan minúsculas para coincidir con el CHECK de la base de datos.
 */
public enum EstadoSesion {
    programada,
    en_progreso,
    completada,
    cancelada,
    no_asistio
}
