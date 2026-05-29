import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

/**
 * WebSocketService - Manages real-time communication via STOMP over WebSockets.
 * Handles connection, subscription to conversation topics, and sending messages.
 */
class WebSocketService {
    constructor() {
        this.client = null;
        this.onMessageReceived = null;
        this.subscriptions = new Map();
    }

    /**
     * Establishes a connection to the WebSocket server.
     * @param {string} token - The authentication token.
     * @param {Function} onConnectCallback - Callback executed when connection is successful.
     */
    connect(onConnectCallback) {
        // Use relative URL or environment variable. Assuming Vite proxy or same host.
        // For development, we might need the full URL if not proxied.
        const socketUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/ws`;
        
        this.client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            // Override the default debug to console if needed
            debug: (str) => {
                // console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = (frame) => {
            console.log('Connected to WebSocket server');
            if (onConnectCallback) onConnectCallback(frame);
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.client.activate();
    }

    /**
     * Subscribes to a specific conversation topic.
     * @param {number|string} convId - The conversation ID.
     * @param {Function} callback - Function executed when a message is received on this topic.
     */
    subscribeToConversation(convId, callback) {
        if (!this.client || !this.client.connected) {
            console.warn('Cannot subscribe: Client not connected');
            return;
        }

        const topic = `/topic/messages/${convId}`;
        
        // Unsubscribe if already subscribed to this topic to avoid duplicates
        if (this.subscriptions.has(convId)) {
            this.subscriptions.get(convId).unsubscribe();
        }

        const subscription = this.client.subscribe(topic, (message) => {
            if (callback) {
                callback(JSON.parse(message.body));
            }
        });

        this.subscriptions.set(convId, subscription);
        console.log(`Subscribed to conversation: ${convId}`);
    }

    /**
     * Sends a message to a specific conversation via WebSocket.
     * @param {number|string} convId - The conversation ID.
     * @param {Object} messageData - The message payload (remitenteId, contenido).
     */
    sendMessage(convId, messageData) {
        if (!this.client || !this.client.connected) {
            console.error('Cannot send message: Client not connected');
            return;
        }

        this.client.publish({
            destination: `/app/chat/${convId}`,
            body: JSON.stringify(messageData),
        });
    }

    /**
     * Disconnects from the WebSocket server and clears subscriptions.
     */
    disconnect() {
        if (this.client) {
            this.subscriptions.forEach((sub) => sub.unsubscribe());
            this.subscriptions.clear();
            this.client.deactivate();
            console.log('Disconnected from WebSocket');
        }
    }
}

const serviceInstance = new WebSocketService();
export default serviceInstance;
