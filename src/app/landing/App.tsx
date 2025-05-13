// File: src/pages/LandingPage.tsx
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroSection from "@/components/shared/HeroSection";
import Features from "@/components/shared/Features";
import FeaturedCars from "@/components/shared/FeaturedCars";
import HowItWorks from "@/components/shared/HowItWorks";
import Testimonials from "@/components/shared/Testimonials";
import CallToAction from "@/components/shared/CallToAction";
import Footer from "@/components/shared/Footer";
import SignedNavBar from "@/components/shared/SignedNavBar";
import NavBar from "@/components/shared/NavBar";
import DealersMap from "@/components/Map";
import AISearchInput from "@/components/aisearch";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAISearch = (query: string) => {
    navigate(`/cars?query=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    // Simulate page load animation
    setIsLoaded(true);
  }, []);
  const user = localStorage.getItem("user");
  return (
    <div className="bg-white min-h-screen">
      {user ? <SignedNavBar /> : <NavBar />}

      {/* Loading animation */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />

        <section className="px-6 py-12">
          <h1 className="text-3xl mb-4">Find Your Dream Car with AI</h1>
          <AISearchInput onSubmit={handleAISearch} />
        </section>
        <Features />
        <FeaturedCars />
        <HowItWorks />
        <Testimonials />
        <DealersMap />
        <CallToAction />
        <Footer />

        {/* Scroll to top button */}
        <motion.button
          style={{ opacity }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300 z-40"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
