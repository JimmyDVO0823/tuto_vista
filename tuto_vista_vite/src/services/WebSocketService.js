import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

/**
 * WebSocketService - Manages real-time communication via STOMP over WebSockets.
 * Handles connection, subscription to conversation topics, and sending messages.
 */
class WebSocketService {
    constructor() {
        this.client = null;
        this.subscriptions = new Map();
        this.isConnected = false;
    }

    /**
     * Establishes a connection to the WebSocket server.
     * @param {Function} onConnectCallback - Callback executed when connection is successful.
     */
    connect(onConnectCallback) {
        if (this.client && (this.client.active || this.client.connected)) {
            console.log('WebSocket already connected or connecting');
            if (this.client.connected && onConnectCallback) onConnectCallback();
            return;
        }

        const socketUrl = `${import.meta.env.VITE_API_URL || 'https://tutovista-production.up.railway.app'}/ws`;
        console.log('Connecting to WebSocket at:', socketUrl);
        
        this.client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            debug: (str) => console.log('[STOMP Debug]:', str),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = (frame) => {
            console.log('Connected to WebSocket server');
            this.isConnected = true;
            if (onConnectCallback) onConnectCallback(frame);
        };

        this.client.onDisconnect = () => {
            console.log('Disconnected from WebSocket server');
            this.isConnected = false;
        };

        this.client.onStompError = (frame) => {
            console.error('STOMP error:', frame.headers['message']);
            console.group('Error Details');
            console.error(frame.body);
            console.groupEnd();
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
