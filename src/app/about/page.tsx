// File: src/pages/AboutPage.tsx
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { motion } from "framer-motion";
import { Users, Shield, Award, Globe } from "lucide-react";

const AboutPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <header className="bg-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            About AutoBozor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            The leading car marketplace in Uzbekistan connecting buyers and
            sellers since 2020
          </motion.p>
        </div>
      </header>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2020, AutoBozor started with a simple mission: to
                create a transparent and efficient marketplace for car buyers
                and sellers in Uzbekistan.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                What began as a small startup has grown into the country's most
                trusted automotive platform, connecting thousands of dealers and
                individual sellers with eager buyers every day.
              </p>
              <p className="text-lg text-gray-700">
                Our commitment to quality, security, and customer satisfaction
                has made us the go-to destination for anyone looking to buy or
                sell vehicles across the nation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-80 w-full flex items-center justify-center">
                <p className="text-white text-xl">Company Image Placeholder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Trust
              </h3>
              <p className="text-gray-700 text-center">
                We build trust through transparency and honest business
                practices in every transaction.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Quality
              </h3>
              <p className="text-gray-700 text-center">
                We maintain high standards for the vehicles and services on our
                platform.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Community
              </h3>
              <p className="text-gray-700 text-center">
                We foster a supportive community of car enthusiasts and everyday
                drivers alike.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                Innovation
              </h3>
              <p className="text-gray-700 text-center">
                We continuously improve our platform to provide the best
                experience possible.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet the people driving AutoBozor forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rustam Karimov",
                role: "CEO & Founder",
                bio: "Automotive industry veteran with over 15 years of experience",
              },
              {
                name: "Sevara Azimova",
                role: "Chief Technology Officer",
                bio: "Tech innovator specializing in marketplace platforms",
              },
              {
                name: "Oybek Rakhimov",
                role: "Chief Marketing Officer",
                bio: "Digital marketing expert with a passion for automotive",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gray-200 h-64 flex items-center justify-center">
                  <p className="text-gray-500">Photo Placeholder</p>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Join the AutoBozor Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-8"
          >
            Whether you're looking to buy or sell, we're here to help you every
            step of the way
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="/cars"
              className="inline-block px-8 py-3 bg-white text-blue-500 font-bold rounded-lg hover:bg-blue-50 transition duration-300 mr-4"
            >
              Browse Cars
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
