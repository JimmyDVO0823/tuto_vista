package com.tutorias.tutorias_backend.enums;

/**
 * Representa los estados de una solicitud según la base de datos.
 * Se usan minúsculas para coincidir con el CHECK de la base de datos.
 */
public enum EstadoSolicitud {
    pendiente,
    aceptada,
    rechazada,
    cancelada
}
