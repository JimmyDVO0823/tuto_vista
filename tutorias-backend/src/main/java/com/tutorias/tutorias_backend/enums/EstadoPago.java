package com.tutorias.tutorias_backend.enums;

/**
 * Representa los estados de un pago.
 * Se usan minúsculas para coincidir con el CHECK de la base de datos.
 */
public enum EstadoPago {
    pendiente,
    completado,
    reembolsado,
    fallido
}
