package com.mindmakers.dashboard_api.user.services;

import com.mindmakers.dashboard_api.user.dto.UsuarioRegisterDto;
import com.mindmakers.dashboard_api.user.entities.Usuario;
import com.mindmakers.dashboard_api.user.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Service
public class UsuarioServices {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void registrarUsuario(UsuarioRegisterDto usuarioRegisterDto) {

        Optional<Usuario> userFound = usuarioRepository.findByGmail(usuarioRegisterDto.gmail());
        System.out.println();

        if (userFound.isPresent()) {


            throw new RuntimeException("El correo ya está registrado.");
        }

        String cifrado = passwordEncoder.encode(usuarioRegisterDto.password());
        Usuario usuario = Usuario.builder()
                .id(null)
                .username(usuarioRegisterDto.username())
                .password(cifrado)
                .gmail(usuarioRegisterDto.gmail())
                .semestre(usuarioRegisterDto.semestre())
                .build();
        usuarioRepository.save(usuario);
    }
}
