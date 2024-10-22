package com.mindmakers.dashboard_api.auth;

import com.mindmakers.dashboard_api.user.dto.UsuarioLoginDto;
import com.mindmakers.dashboard_api.user.dto.UsuarioRegisterDto;
import com.mindmakers.dashboard_api.user.entities.Usuario;
import com.mindmakers.dashboard_api.user.services.UsuarioServices;
import jakarta.validation.Valid;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UsuarioServices usuarioServices;

    @PostMapping("/login")
    public ResponseEntity autenticarUsuario(@RequestBody @Valid UsuarioLoginDto usuarioLoginDto) {
        Authentication token = new UsernamePasswordAuthenticationToken(usuarioLoginDto.correo(), usuarioLoginDto.contrasena());

        var usuarioAutenticado = authenticationManager.authenticate(token);
        var jwtToken = tokenService.generarToken((Usuario) usuarioAutenticado.getPrincipal());
        return ResponseEntity.ok(new DatosjwtToken(jwtToken));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registrarUsuario(@Valid @RequestBody UsuarioRegisterDto usuarioRegisterDto) {
        try {
            usuarioServices.registrarUsuario(usuarioRegisterDto);
            return ResponseEntity.status(201).body("Usuario registrado exitosamente");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
