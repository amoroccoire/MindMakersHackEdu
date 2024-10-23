package com.mindmakers.dashboard_api.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UsuarioRegisterDto(
        @NotNull @NotBlank
        String username,

        String gmail,
        @NotNull @NotBlank
        String password,
        @NotNull @Min(1)
        Integer semestre,
        @NotNull
        String carreraProfesional
) {
}
