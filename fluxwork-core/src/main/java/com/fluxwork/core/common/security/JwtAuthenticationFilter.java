package com.fluxwork.core.common.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // Skip logging for login/register so we don't spam the console
        if (request.getRequestURI().contains("/api/auth")) {
            chain.doFilter(request, response);
            return;
        }

        System.out.println("\n🛡️ [JAVA] Bouncer inspecting request for: " + request.getRequestURI());
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null) {
            System.out.println("❌ [JAVA] Bouncer says: NO WRISTBAND FOUND (Header is null)!");
            chain.doFilter(request, response);
            return;
        }

        if (!authHeader.startsWith("Bearer ")) {
            System.out.println("❌ [JAVA] Bouncer says: WRONG WRISTBAND TYPE (Doesn't start with Bearer)!");
            chain.doFilter(request, response);
            return;
        }

        System.out.println("✅ [JAVA] Bouncer says: Wristband found! Scanning...");
        String token = authHeader.substring(7);

        try {
            if (jwtUtil.validateToken(token)) {
                String userEmail = jwtUtil.extractEmail(token);
                System.out.println("✅ [JAVA] Bouncer says: VALID! Welcome, " + userEmail);

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userEmail, null, new ArrayList<>()
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                System.out.println("❌ [JAVA] Bouncer says: TOKEN IS EXPIRED OR INVALID!");
            }
        } catch (Exception e) {
            System.out.println("❌ [JAVA] Bouncer says: SCANNER CRASHED! Error: " + e.getMessage());
        }

        chain.doFilter(request, response);
    }
}