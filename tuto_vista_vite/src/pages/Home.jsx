import React from 'react';
import MainLayout from '../components/layout/MainLayout/MainLayout';
import HeroSection from '../components/features/home/HeroSection/HeroSection';
import HowItWorksSection from '../components/features/home/HowItWorksSection/HowItWorksSection';
import CTASection from '../components/features/home/CTASection/CTASection';
import CategoriesSection from '../components/features/home/CategoriesSection/CategoriesSection';
import TestimonialsSection from '../components/features/home/TestimonialsSection/TestimonialsSection';
import Footer from '../components/layout/Footer/Footer';

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
