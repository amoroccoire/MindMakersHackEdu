package com.mindmakers.dashboard_api.user.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mindmakers.dashboard_api.task.entities.Tarea;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull(message = "Username no puede ser vacio")
    @Size(min=4, max = 15, message = "Username debe ser de almenos 4 caracteres")
    private String username;

    @NotNull(message = "Password no puede ser vacio")
    @Size(min=5, max = 15, message = "Contraseña debe tener al menos 5 caracteres")
    private String password;

    @NotNull
    @Email(message = "Escriba un email valido")
    private String gmail;

    @NotNull
    @Min(value = 1, message = "Semestre debe ser al menos 1")
    private Integer semestre;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Tarea> tareas;

}
