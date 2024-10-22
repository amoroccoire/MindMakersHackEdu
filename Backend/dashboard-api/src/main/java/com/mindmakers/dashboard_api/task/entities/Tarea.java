package com.mindmakers.dashboard_api.task.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mindmakers.dashboard_api.user.entities.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Tarea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @NotNull(message = "El titulo no puede ser vacio")
    @Size(min = 4, max = 100, message = "El tamaño de los caracteres debe estar entre 4 y 100 caracteres")
    private String titulo;

    @Size(min=5, max = 200, message = "Mensaje debe tener al menos 5 y no debe exceder los 200 caracteres")
    private String descripcion;

    @NotNull(message = "La prioridad debe tener un valor")
    @Min(value = 1, message = "El valor minimo permitido es 1")
    @Max(value = 4, message = "El valor maximo permitido es 4")
    private Integer prioridad;

    // Hora de creación de la tarea
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaCreacion;

    // Fecha límite para completar la tarea
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime fechaLimite;

    @AssertTrue(message = "La fecha límite no puede ser anterior o igual a la fecha de creación")
    public boolean isFechaLimiteValida() {
        if (fechaLimite != null && fechaCreacion != null) {
            // Comparamos que la fecha límite no sea ni igual ni anterior a la fecha de creación
            return fechaLimite.isAfter(fechaCreacion);
        }
        return true;
    }
}
