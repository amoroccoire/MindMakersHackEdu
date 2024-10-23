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
            var token = authHeader.replace("Bearer ", "");
            System.out.println(token);
            System.out.println(tokenService.getSubject(token));
            if (tokenService.validarToken(token)) {
                var subject = tokenService.getSubject(token);
                if (subject != null) {
                    Optional<Usuario> usuario = usuarioRepository.findByGmail(subject);

                    if (usuario.isEmpty()) {
                        throw new UsernameNotFoundException("Usuario no encontrado");
                    }
                    var userDetails = new UserDetailsImpl(usuario.get());

                    var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Contexto de seguridad: " + SecurityContextHolder.getContext().getAuthentication());
                }
            }
        }
        System.out.println("Pasando al siguiente filtro");
        filterChain.doFilter(request, response);
    }
}
