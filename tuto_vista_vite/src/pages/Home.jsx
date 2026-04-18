import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import HeroSection from '../components/features/home/HeroSection';
import HowItWorksSection from '../components/features/home/HowItWorksSection';
import CTASection from '../components/features/home/CTASection';
import CategoriesSection from '../components/features/home/CategoriesSection';
import TestimonialsSection from '../components/features/home/TestimonialsSection';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <MainLayout>
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <CategoriesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </MainLayout>
  );
};

export default Home;
