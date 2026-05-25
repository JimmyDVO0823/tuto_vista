import React, { useState, useRef, useEffect } from 'react';
import { ProfileBlock } from '../features/chat/ProfileBlock/ProfileBlock';
import { ContactMenu } from '../features/chat/ContactMenu/ContactMenu';
import { ChatHeader } from '../features/chat/ChatHeader/ChatHeader';
import { MessageBubble } from '../features/chat/MessageBubble/MessageBubble';
import { FileAttachment } from '../features/chat/FileAttachment/FileAttachment';
import { MessageInputBar } from '../features/chat/MessageInputBar/MessageInputBar';
import MainLayout from '../components/layout/MainLayout/MainLayout';

import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function AcademicChat() {
  const { user } = useAuth();
  
  // 2. ESTADOS DE CONTROL
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);

  // Obtener conversaciones del usuario
  useEffect(() => {
    if (user?.id) {
      api.get(`/chat/conversaciones/${user.id}`)
        .then(data => {
          setConversations(data || []);
          if (data && data.length > 0 && !activeConversationId) {
            setActiveConversationId(data[0].id);
          }
        })
        .catch(err => console.error('Error fetching conversations:', err));
    }
  }, [user]);

  // Obtener mensajes de la conversación activa
  useEffect(() => {
    if (activeConversationId) {
      api.get(`/chat/mensajes/${activeConversationId}`)
        .then(data => setMessages(data || []))
        .catch(err => console.error('Error fetching messages:', err));
    }
  }, [activeConversationId]);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipant = activeConversation?.participantes.find(p => p.id !== user?.id);

  // 3. AUTO-SCROLL AL RECIBIR/ENVIAR MENSAJES
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 4. MANEJADOR: Enviar nuevo mensaje
  const handleSendMessage = (text) => {
    if (!activeConversationId || !user?.id) return;

    api.post(`/chat/mensaje?convId=${activeConversationId}&remitenteId=${user.id}`, text)
      .then(newMsg => {
        setMessages(prev => [...prev, newMsg]);
        // Actualizar último mensaje en la lista de conversaciones
        setConversations(prev => prev.map(c => {
          if (c.id === activeConversationId) {
            return { ...c, ultimoMensaje: newMsg };
          }
          return c;
        }));
      })
      .catch(err => console.error('Error sending message:', err));
  };

  // 5. MANEJADOR: Acciones de cabecera (Llamar, vídeo, etc.)
  const handleHeaderAction = (actionType) => {
    console.log(`Iniciando acción: ${actionType} con ${otherParticipant?.nombreCompleto}`);
  };

  // Mapear conversaciones para el ContactMenu
  const contactsForMenu = conversations.map(c => {
    const otherP = c.participantes.find(p => p.id !== user?.id);
    return {
      id: c.id,
      name: otherP?.nombreCompleto || 'Unknown',
      avatarUrl: otherP?.urlAvatar || 'https://via.placeholder.com/150',
      isOnline: true, // Placeholder
      lastMessageTime: c.ultimoMensaje ? new Date(c.ultimoMensaje.creadoEn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      lastMessageText: c.ultimoMensaje?.contenido || 'No messages yet'
    };
  });

  const filteredContacts = contactsForMenu.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <MainLayout>            
    <main className="flex-1 flex h-screen overflow-hidden">
      
      {/* SECCIÓN B: BARRA LATERAL DE MENSAJES / CONTACTOS */}
      <section className="hidden md:flex md:w-80 lg:w-96 h-full bg-surface flex-col z-10 flex-shrink-0">
        <header className="p-8 pb-4">
          <h2 className="font-headline font-extrabold text-2xl tracking-tight mb-6">Messages</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary-container" 
              placeholder="Search contacts..." 
            />
          </div>
        </header>

        {/* Menú de Contactos */}
        <div className="flex-1 overflow-y-auto pb-8">
          <ContactMenu 
            contacts={filteredContacts} 
            activeContactId={activeConversationId} 
            onContactSelect={(id) => setActiveConversationId(id)} 
          />
        </div>
      </section>

      {/* SECCIÓN C: FLUJO Y CONTENEDOR DE CHAT EN VIVO */}
      <section className="flex-1 h-full bg-surface-container-low flex flex-col relative">
        
        {/* Cabecera del Chat Activo */}
        {otherParticipant ? (
          <ChatHeader 
            name={otherParticipant.nombreCompleto}
            specialty={otherParticipant.rol}
            avatarUrl={otherParticipant.urlAvatar}
            isOnline={true}
            onAction={handleHeaderAction}
          />
        ) : (
          <div className="h-24 px-4 md:px-10 flex items-center bg-surface-container-lowest">
            <p className="text-gray-400 italic">Select a conversation</p>
          </div>
        )}

        {/* Caja de Flujo de Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-6">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id}
              text={msg.contenido}
              timestamp={new Date(msg.creadoEn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              isSent={msg.remitenteId === user?.id}
              isRead={msg.leido}
            />
          ))}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Barra de Escribir Mensaje */}
        <MessageInputBar onSendMessage={handleSendMessage} />

      </section>
    </main>
  </MainLayout>
);
}