import React, { useState, useRef, useEffect } from 'react';
import { ProfileBlock } from '../components/chat/ProfileBlock';
import { ContactMenu } from '../components/chat/ContactMenu';
import { ChatHeader } from '../components/chat/ChatHeader';
import { MessageBubble } from '../components/chat/MessageBubble';
import { FileAttachment } from '../components/chat/FileAttachment';
import { MessageInputBar } from '../components/chat/MessageInputBar';
import MainLayout from '../components/layout/MainLayout/MainLayout';

// 1. DATA INICIAL DE PRUEBA (MOCK DATA)
const INITIAL_CONTACTS = [
  {
    id: 1,
    name: "Elena Martínez",
    specialty: "Advanced Econometrics & Research",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYky3d73G8fMaGiMs2Zs21Hi1RD34MEfp19atPBB1RVl0RHNfwMUwyJeQgaei9D-e4i0ouQ8f4ZMS0zo1mMxCbbRHLsYX70ktjx_MToNeeC_CEjmMxFKC8BcW76J9xj9t2Lm1gHqJ9fuHoiSqCEmCwRyoenxL_HPO64ltpquoluVuNYtwyNLFoQkemI3axD_IkfssOAwjzV_77Y7nl1bUkdIvOIZ6eG9uB9LM1fL49l20j0fEC2ZIQ7082kYozlfep6J-_X7KTs-8r",
    isOnline: true,
    lastMessageTime: "10:24 AM",
    lastMessageText: "Have you reviewed the revised methodology?",
    messages: [
      { id: 101, text: "Hello Dr. Voss, I've finished the preliminary data analysis for the quarterly report. I've attached the PDF with the regression models we discussed yesterday.", timestamp: "10:15 AM", isSent: false },
      { id: 102, type: "file", fileName: "Econometrics_Draft_V2.pdf", fileSize: "4.2 MB", fileType: "Research Paper", timestamp: "10:16 AM", isSent: false },
      { id: 103, text: "Excellent work, Elena. I'm especially interested in seeing how the R-squared values changed after excluding the outliers from the North region data.", timestamp: "10:22 AM", isSent: true, isRead: true },
      { id: 104, text: "Here is the visualization of the region comparison. It seems the correlation is much stronger now.", timestamp: "10:24 AM", isSent: false, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMaOtAZnGZoa7fcNDdqiHbTDEElQbf1lOE9smUyVPUNnpeyJbyMUBqYyehx0xkeg-zO_vbeFhOVDmjkTKngo1iTvcEkpQI3u1Fu-6MkXdwWLcDLNm0evZ71E6lIjI1fFYrwVrUpOaI_igBHqSjGPTt3us8ILV0V-dc_Oep_ZsHwBMAro7IiQ5xuIp1WQp0WvoC_iUKifbs6hLv_qsQ6E44t61KFWuKyspCZWJvUR7bl7lw9bZrkYAOPSieSEQ3yyP2LdLNe9rytvNb" }
    ]
  },
  {
    id: 2,
    name: "Prof. Marcus Thorne",
    specialty: "Macroeconomic Policy",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1mFt1bCpYzcLgqkXi-jjcNIyMFkENSfkZBdNUid7SCyFSGBJdmhqyy7NNlAb6kOvOhngr1-JGgqbM_CBJjDV1Mpt6AR9kdvePFl0uAt7wvTQW4M54n_wbkM6pKOH9tHcbx2hLY1ZDjRSoa_a7SZobXpDn7DBDBZio_Ce7Ed8fmtlfgeVT3ueRVW_9vKrCx5ooOi1XLzQcAexXbJmUkA4ATLfzIITFXzTFEk7oM_grE1YM5sz3Q8coKXiXkwnnzhFV1sOkf6hHir9C",
    isOnline: false,
    lastMessageTime: "Yesterday",
    lastMessageText: "The lecture notes on Econometrics are ready.",
    messages: [
      { id: 201, text: "Dear Julian, the lecture notes on Econometrics are ready for the graduate symposium.", timestamp: "Yesterday", isSent: false }
    ]
  },
  {
    id: 3,
    name: "Sofia Chen",
    specialty: "Doctoral Candidate",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC533Rb94BltlPOBsWdZG4vXlTap_24auXk42bzxeCRSev0gKF9MaWJ-RnPcNSiKxXkgfOjro2peCxlYKPZPVnPI3Sz9hgllX5joQoO_TNMUOeb-Dstl6yaw4_tjUls3H9DDvhsQDAWOOitOVsFtcpViDxqkoBUlrYLt0mpaXfI2NCdaYYluMi4nd7O_qTXItMczlLv9SOtAa2akxO8Jtm_PenM4IV7LVnVks-VbC8W8ekb4xPQHy0hImu7kRIlJLa74IJcHGuXVrar",
    isOnline: false,
    lastMessageTime: "Tuesday",
    lastMessageText: "Great session today, thank you professor.",
    messages: [
      { id: 301, text: "Great session today, thank you professor. The structural equation modeling clear up many doubts.", timestamp: "Tuesday", isSent: false }
    ]
  }
];

const CURRENT_USER = {
  name: "Dr. Julian Voss",
  role: "Senior Fellow",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0vWfs-MLOXFC5G5pO5YKHaeX44ixwgI9sRycrcL5LdbHI17obah5tTQdJY0btr5waz-xvIFLqxcD19ljwQ21HQd76nQWtPSNRijt_u9KUSSCri51gRFWR1ClsPWDnc6TsDuzPcgA9cxKR1ih7g1bD26QVDJJtUrkGnSflI0W870QeLux246TSroGKWYfX5O8OweP4lCM_-cQsWCss-dZ3UTkpNMkvCrKvHsWqhGq5SXEowgtXLbDHze1_DEV039d3wt7cYyxbjpNI"
};

export default function AcademicChat() {
  
  // 2. ESTADOS DE CONTROL
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activeContactId, setActiveContactId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef(null);

  // Obtener la información completa del contacto seleccionado actualmente
  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  // 3. AUTO-SCROLL AL RECIBIR/ENVIAR MENSAJES
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeContact.messages]);

  // 4. MANEJADOR: Enviar nuevo mensaje
  const handleSendMessage = (text) => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newMessage = {
      id: Date.now(), // ID temporal único
      text: text,
      timestamp: formattedTime,
      isSent: true,
      isRead: false
    };

    // Actualizamos el historial de mensajes de ese contacto específico
    setContacts(prevContacts => 
      prevContacts.map(contact => {
        if (contact.id === activeContactId) {
          return {
            ...contact,
            lastMessageTime: formattedTime,
            lastMessageText: text,
            messages: [...contact.messages, newMessage]
          };
        }
        return contact;
      })
    );
  };

  // 5. MANEJADOR: Acciones de cabecera (Llamar, vídeo, etc.)
  const handleHeaderAction = (actionType) => {
    console.log(`Iniciando acción: ${actionType} con ${activeContact.name}`);
    // Aquí conectarías lógica real como abrir un modal de WebRTC o Zoom
  };

  // 6. FILTRADO DE CONTACTOS EN TIEMPO REAL
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
  <MainLayout>            
    {/* CORREGIDO: 
      - Eliminamos 'ml-72' porque MainLayout ya maneja el margen del Sidebar.
      - Eliminamos 'w-full' para evitar que desborde el viewport.
      - Añadimos 'h-[calc(100vh-64px)]' (o la altura de tu Footer/Header si aplica) 
        para que el chat ocupe todo el alto disponible y sus barras de scroll internas funcionen.
    */}
    <main className="flex-1 flex h-screen overflow-hidden">
      
      {/* SECCIÓN B: BARRA LATERAL DE MENSAJES / CONTACTOS */}
      <section className="w-80 lg:w-96 h-full bg-surface flex flex-col z-10 flex-shrink-0">
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
            activeContactId={activeContactId} 
            onContactSelect={(id) => setActiveContactId(id)} 
          />
        </div>
      </section>

      {/* SECCIÓN C: FLUJO Y CONTENEDOR DE CHAT EN VIVO */}
      <section className="flex-1 h-full bg-surface-container-low flex flex-col relative">
        
        {/* Cabecera del Chat Activo */}
        <ChatHeader 
          name={activeContact.name}
          specialty={activeContact.specialty}
          avatarUrl={activeContact.avatarUrl}
          isOnline={activeContact.isOnline}
          onAction={handleHeaderAction}
        />

        {/* Caja de Flujo de Mensajes */}
        <div className="flex-1 overflow-y-auto p-10 space-y-6">
          <div className="flex justify-center my-4">
            <span className="px-4 py-1 rounded-full bg-surface-container-high text-[10px] font-label font-bold text-on-surface-variant uppercase tracking-widest">
              Today
            </span>
          </div>

          {activeContact.messages.map((msg) => {
            if (msg.type === 'file') {
              return (
                <FileAttachment 
                  key={msg.id}
                  fileName={msg.fileName}
                  fileSize={msg.fileSize}
                  fileType={msg.fileType}
                  onDownload={() => console.log(`Descargando ${msg.fileName}...`)}
                />
              );
            }

            return (
              <MessageBubble 
                key={msg.id}
                text={msg.text}
                timestamp={msg.timestamp}
                isSent={msg.isSent}
                isRead={msg.isRead}
                imageUrl={msg.imageUrl}
              />
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Barra de Escribir Mensaje */}
        <MessageInputBar onSendMessage={handleSendMessage} />

      </section>
    </main>
  </MainLayout>
);
};