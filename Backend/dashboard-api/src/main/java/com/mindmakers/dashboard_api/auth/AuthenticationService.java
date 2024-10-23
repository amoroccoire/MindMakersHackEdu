package com.mindmakers.dashboard_api.auth;

import com.mindmakers.dashboard_api.user.adaptadores.UserDetailsImpl;
import com.mindmakers.dashboard_api.user.entities.Usuario;
import com.mindmakers.dashboard_api.user.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByGmail(username);

        if (usuario.isEmpty()) {
            throw new UsernameNotFoundException("Usuario no encontrado");
        }

        return new UserDetailsImpl(usuario.get());
    }
}
