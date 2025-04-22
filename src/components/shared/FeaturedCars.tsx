// File: src/components/FeaturedCars.tsx
import { motion } from "framer-motion";
import { Star, Users, Calendar, Gauge } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedCars = () => {
  const cars = [
    {
      id: 1,
      name: "Chevrolet Malibu",
      price: "28,000",
      image: "/images/car1-placeholder.jpg",
      year: "2023",
      seats: "5",
      mileage: "0",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Toyota Camry",
      price: "32,500",
      image: "/images/car2-placeholder.jpg",
      year: "2022",
      seats: "5",
      mileage: "12,000",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Hyundai Sonata",
      price: "25,900",
      image: "/images/car3-placeholder.jpg",
      year: "2023",
      seats: "5",
      mileage: "5,000",
      rating: 4.8,
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900">Featured Cars</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Check out some of our top listings from across Uzbekistan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-64">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full w-full absolute flex items-center justify-center">
                  <p className="text-white">Image Placeholder</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {car.name}
                  </h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {car.rating}
                    </span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-500 mb-4">
                  ${car.price}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex flex-col items-center">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600 mt-1">
                      {car.year}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600 mt-1">
                      {car.seats} Seats
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Gauge className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600 mt-1">
                      {car.mileage} km
                    </span>
                  </div>
                </div>
                <Link
                  to={`/cars/${car.id}`}
                  className="block w-full text-center py-3 bg-gray-100 hover:bg-gray-200 text-blue-500 font-medium rounded-lg transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/cars"
            className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300 inline-block"
          >
            View All Cars
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCars;
