package com.tutorias.tutorias_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "tutor_insignia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorInsignia {

    @EmbeddedId
    private TutorInsigniaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tutorId")
    @JoinColumn(name = "tutor_id")
    private Tutor tutor;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("insigniaId")
    @JoinColumn(name = "insignia_id")
    private Insignia insignia;

    @Column(name = "obtenida_en", nullable = false, updatable = false)
    @Builder.Default
    private OffsetDateTime obtenidaEn = OffsetDateTime.now();
}
