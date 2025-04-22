// File: src/components/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      {/* Video background with tint */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/hero.mp4"
        >
          <source src="/hero.mp4" type="video/mp4" />
          {/* Placeholder div to show when video isn't available */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Find Your Dream Car in Uzbekistan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-xl text-white max-w-3xl mx-auto"
          >
            The premier marketplace connecting car buyers and sellers across the
            country
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/cars"
              className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg"
            >
              Browse Cars
            </Link>
            <Link
              to="/auth/signup"
              className="px-8 py-3 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating number counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          type: "spring",
          stiffness: 100,
        }}
        className="absolute bottom-10 right-10 z-30 bg-white rounded-full p-6 shadow-xl"
      >
        <div className="text-center">
          <span className="text-3xl font-bold text-blue-500">5,248+</span>
          <p className="text-gray-700 text-sm">Cars Available</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
