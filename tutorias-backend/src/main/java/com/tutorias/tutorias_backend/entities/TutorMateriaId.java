package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class TutorMateriaId implements Serializable {
    private Long tutorId;
    private Long materiaId;
}
