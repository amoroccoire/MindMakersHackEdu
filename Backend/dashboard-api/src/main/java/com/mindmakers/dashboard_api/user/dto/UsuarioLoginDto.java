package com.mindmakers.dashboard_api.user.dto;

import jakarta.validation.constraints.NotNull;

public record UsuarioLoginDto(
        @NotNull
        String correo,
        @NotNull
        String contrasena
) {
}
