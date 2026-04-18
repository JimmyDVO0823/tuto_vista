import Sidebar from "../components/Sidebar";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#f7f9fb] text-on-surface font-body selection:bg-tertiary-container selection:text-on-tertiary-container flex">
      <Sidebar />
      <main className="flex-1 ml-64">
        <HeroSection />
        <CategoriesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}
