package com.mindmakers.dashboard_api.auth;

import com.mindmakers.dashboard_api.user.adaptadores.UserDetailsImpl;
import com.mindmakers.dashboard_api.user.entities.Usuario;
import com.mindmakers.dashboard_api.user.repositories.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            System.out.println("ENTRA 1");
            var token = authHeader.replace("Bearer ", "");
            System.out.println(token);
            System.out.println(tokenService.getSubject(token));
            if (tokenService.validarToken(token)) {
                var subject = tokenService.getSubject(token);
                if (subject != null) {
                    Optional<Usuario> usuario = usuarioRepository.findByGmail(subject);
                    if (usuario.get() == null) {
                        new UsernameNotFoundException("Usuario no encontrado");
                        return;
                    }
                    var userDetails = new UserDetailsImpl(usuario.get());
                    var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        }
        filterChain.doFilter(request, response);
    }
}
