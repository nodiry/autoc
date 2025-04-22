// File: src/pages/PrivacyPolicy.tsx

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Introduction",
      content:
        "This Privacy Policy explains how AutoBozor ('we', 'us', 'our') collects, uses, and discloses your personal information when you use our website and services. This policy applies to all users of our platform in Uzbekistan.",
    },
    {
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you register for an account, list a vehicle, or make a purchase. We also collect information about your usage of our platform and devices you use to access our services.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to provide and improve our services, process transactions, communicate with you, and comply with legal obligations. We may also use your information for marketing purposes with your consent.",
    },
    {
      title: "Information Sharing",
      content:
        "We may share your information with third-party service providers who assist us in operating our platform, other users as part of the transaction process, and as required by law. We do not sell your personal information to third parties.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You may also withdraw your consent for certain data processing activities. To exercise these rights, please contact us using the information provided below.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about this Privacy Policy, please contact us at privacy@autobozor.uz or call us at +998 71 123 4567.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Header */}
      <header className="bg-blue-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Last Updated: April 2025
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <p className="text-lg text-gray-700 mb-8">
              At AutoBozor, we take your privacy seriously. Please read this
              Privacy Policy carefully to understand how we handle your personal
              information.
            </p>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-700">{section.content}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sections.length * 0.1 }}
              className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Have Questions?
              </h3>
              <p className="text-gray-700 mb-4">
                If you have any questions or concerns about our Privacy Policy
                or data practices, please don't hesitate to contact us.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Contact Our Privacy Team
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
