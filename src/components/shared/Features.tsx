// File: src/components/Features.tsx
import { motion } from "framer-motion";
import { Shield, Search, Award, CreditCard } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Search className="h-8 w-8 text-blue-500" />,
      title: "Easy Search",
      description: "Find your perfect car with our powerful search filters",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      title: "Verified Sellers",
      description:
        "All dealers and private sellers are verified for your safety",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-500" />,
      title: "Quality Guaranteed",
      description: "All listed vehicles pass our quality standards",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      title: "Flexible Financing",
      description: "Easy payment options to fit your budget",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose AutoBozor?
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We provide the best car buying and selling experience in Uzbekistan
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="rounded-full bg-blue-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
