package com.tutorias.tutorias_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Configuration for WebSocket message broker in the tutoring system.
 * This class handles the registration of STOMP endpoints and configures
 * the message broker destination prefixes.
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Prefix for server-to-client messages (broadcasts)
        config.enableSimpleBroker("/topic", "/queue");
        // Prefix for client-to-server messages
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Register the endpoint that clients will use to connect to our WebSocket server
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Allows any origin for development, should be restricted in production
                .withSockJS(); // Enables Fallback mechanisms if WebSockets are not available
        
        // Add a secondary endpoint without SockJS for clients that don't need it
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }
}
