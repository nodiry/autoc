// File: src/components/HowItWorks.tsx
import { motion } from "framer-motion";
import { Search, FileCheck, Car, CreditCard } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-blue-500" />,
      title: "Search",
      description: "Browse through our extensive collection of vehicles",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-blue-500" />,
      title: "Compare",
      description: "Compare different cars and select the one that suits you",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-blue-500" />,
      title: "Purchase",
      description: "Complete the payment process through our secure system",
    },
    {
      icon: <Car className="h-10 w-10 text-blue-500" />,
      title: "Drive",
      description: "Pick up your car and hit the road with confidence",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Your journey to getting a new car is just four simple steps away
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white p-6 rounded-lg shadow-md z-10 relative">
                <div className="rounded-full bg-blue-50 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-blue-300 z-0"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
