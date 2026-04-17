import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import TutorCard from '../components/TutorCard';
import Pagination from '../components/Pagination';
import TutorSearchHeader from '../components/TutorSearchHeader';

const tutorsData = [
  {
    name: "Dra. Elena Vargas",
    subject: "Física & Matemáticas",
    price: 65,
    rating: 4.9,
    reviews: 124,
    quote: "Mi enfoque se basa en desglosar problemas complejos en conceptos visuales e intuitivos para garantizar un aprendizaje profundo.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYDetG1Htv7TDGh7b-ZcyptJv_BRmfHk67Hvv-z9x38pR7Lnbbp_vFVSPswDilxdclR7VMMY36dJIyCyIO8CzEeaY9gojpkgiE1WUpYIXsQDPwpPChd0IbqIwt9BoqJlswqDnC2j-VZe0oiB-_vkGqHEC-FJzJ55g9SaKOMLwT3GnDg0ajT1PuolWsPdzX3GHmHKS2cwqiOwK3TOukyXG2oXW2H9PsWkj1FuxwWEKJ60ZA2ss-q25KlSojW2mi2UNBy1m84ZHXVUvW",
    isTopRated: true
  },
  {
    name: "Prof. Marco Tulio",
    subject: "Literatura & Filosofía",
    price: 45,
    rating: 5.0,
    reviews: 89,
    quote: "Exploramos los clásicos no como reliquias, sino como espejos de nuestra propia realidad contemporánea.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxR2q1aoO_TgePQh8N1j6EL-lIRM-Kedt4HIU-zNHTb2f1Hio1xdIvOwHCvC0Z7AElPUGRj10uW201OfWhAxJcgpAwOeIqCTKYd5c-mBMIFdXwLXaElLSDz4T5iLbc0eflud9RD-RMhEV3oBSXWdt0KykHAqknupOPf0LzHwVrindXkfZ3D-v2tncZnV7jvFnss-8fyiBH14J8akwpM3Bb5-BFEbIZewahOVmvlhYpOt_5fv53aNonGBY7HaU5VybXfNiry_ke_u-l"
  },
  {
    name: "Mtra. Lucía Méndez",
    subject: "Economía & Estadística",
    price: 55,
    rating: 4.8,
    reviews: 210,
    quote: "Especialista en análisis de datos aplicado a ciencias sociales y preparación para exámenes de grado.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb6Ef5Aj5Kg6Ki4t5cqRj_SVpI3TlrRwVXvxwoE66x0P8DkSCwk3SzyRsmKFHvGfH2WaAddipLgkV0Xx-trHZnmH6_b23AtX3tY3oM-dYDH5PrDwIC-9aoyYt7kqlsdW_eDiK9aB7nJ3zqpdiOhjAyt669vKt6Kt14UF7bCDpaFTFPxV5J5KQOaiYXqL6ncB2ycCLSj9yjzq83KY9Z6cz8HoD7AIXGbKbl7IKUOXjEdOF7HKNmR9z0Gta6vQPQMlbbc856b8wmGlpR"
  },
  {
    name: "Dr. Julián Rivas",
    subject: "Derecho Mercantil",
    price: 80,
    rating: 4.9,
    reviews: 65,
    quote: "Orientación jurídica estratégica para estudiantes y profesionales del sector privado.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgv1WCen_2AmjQK1W5j8mP3hZhGz9wyqzD3dhdJfJcvhyJUOjxMC52ycbm7abnKVMngB6Zlmz5eDtlJdLxkb5DartbkSc8r0ACtDBVB6zHhxbnrYcFVSCbE8uMbA8TXhE83vr3sJr5pWEdud4ypwVfrQqeCOm4IVeJcjDLCgsnBXOKxXaevi4OuFge0cdgfHVC6UvanJDBMZib8ipZX1F9E5vynY_2MJwqwSi_qxIgCf7TiMAYtwDRW8PWC55EtlSiTGguA84c3yFK"
  },
  {
    name: "Ing. Sofía Ortiz",
    subject: "Algoritmos & Programación",
    price: 40,
    rating: 4.7,
    reviews: 142,
    quote: "Aprende a programar resolviendo problemas del mundo real. Mentoría en Python, Java y C++.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMiUFTnkoTO7TI2_0VrsqHDl1R4LYJOPxjbk57JrIio9-xTDhQ-w1sqOrjrSl8LxKMW8NTSO4z9xdPbneo8pDbH-iZfDb_YmVnS5P3KOUJmk3jG-oHIfh3VAzpJBni_hf518sZOpNF5bSFVzd3fpz0q5bnz9xLTzjCH6kEsL0_4GJtI1KhRImoYVAMDYc9i6U0rAqSZDA_W2DemUjqUrx0YgB8kYJ2wJOluQtQw7p6t_KKLqeHKqpQ2xEEghz7sJCu2K0q4ioAdOoK"
  },
  {
    name: "Prof. David Kim",
    subject: "Biología & Genética",
    price: 35,
    rating: 4.9,
    reviews: 58,
    quote: "Pasión por la ciencia biológica. Ayudo a mis estudiantes a visualizar procesos moleculares complejos.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbGUEL0nUBPuxHZELH_sNjIKicuPeocEkkHsDwqLV79RQl_pd_nxKk7YVzbMyYXl4DNF3X6QnqGOQc9a2FNURl2HS_Dj4X1Xht_rTI74nA6BFGFBxXGmCdmiZMkdaVJN1oW1m9LroSIK4ljwRdDt82-l0grdZ4W9VsP5ul14rFTFEmc82FbI4aJTmxKa1hSwir0mKZHY4MRMwqyzut6egLizgt82vMDjqHBB7ZzJ9fIaYGxmF6zvSNcwWk60Z0zp9JCaBeW0htxfy3"
  }
];

const TutorsExplorer = () => {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-tertiary-container/30">
      <Navbar />
      
      <div className="flex min-h-[calc(100vh-72px)] bg-surface">
        <SearchFilters />
        
        <main className="flex-1 p-12 max-w-[1400px]">
          <TutorSearchHeader />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorsData.map((tutor, index) => (
              <TutorCard key={index} {...tutor} />
            ))}
          </div>
          
          <Pagination />
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default TutorsExplorer;