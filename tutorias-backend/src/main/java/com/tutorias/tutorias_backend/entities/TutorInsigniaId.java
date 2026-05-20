package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TutorInsigniaId implements Serializable {

    @Column(name = "tutor_id")
    private Long tutorId;

    @Column(name = "insignia_id")
    private Long insigniaId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TutorInsigniaId that = (TutorInsigniaId) o;
        return Objects.equals(tutorId, that.tutorId) &&
               Objects.equals(insigniaId, that.insigniaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tutorId, insigniaId);
    }
}
