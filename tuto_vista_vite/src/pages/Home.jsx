import React from "react";
import MainLayout from "../components/layout/MainLayout/MainLayout";
import HeroSection from "../features/home/HeroSection/HeroSection";
import HowItWorksSection from "../features/home/HowItWorksSection/HowItWorksSection";
import CTASection from "../features/home/CTASection/CTASection";
import CategoriesSection from "../features/home/CategoriesSection/CategoriesSection";
import TestimonialsSection from "../features/home/TestimonialsSection/TestimonialsSection";
import Footer from "../components/layout/Footer/Footer";

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
