// File: src/components/CallToAction.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center md:text-left mb-8 md:mb-0"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Dream Car?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of satisfied customers across Uzbekistan who have found their perfect vehicle with Dream Auto.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/auth/signup" className="inline-flex items-center px-8 py-4 bg-white text-blue-500 font-bold rounded-lg hover:bg-blue-50 transition duration-300 shadow-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;