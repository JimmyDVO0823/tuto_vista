package com.tutorias.tutorias_backend.dto;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutoresPaginadosDTO {
    private List<TutorDTO> content;
    private int totalPages;
    private long totalElements;
    private int currentPage;
    private int size;
}
