import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import axios from "axios";
import { siteConfig } from "@/config/site";

import { Car } from "@/type";
import SignedNavBar from "@/components/shared/SignedNavBar";
import CarCard from "../cars/components/carCard";
import QuickView from "../cars/components/QuickView";

const FavoritesPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signed, setsigned] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setsigned(true);

    axios
      .get(siteConfig.links.dashboard + "favorite", { withCredentials: true })
      .then((res) => {
        setCars(res.data.cars);
        setFilteredCars(res.data.cars);
        setIsLoading(false);
      });
  }, []);
  if (cars.length == 0)
    return (
      <div className="w-screen flex flex-col items-center">
        {signed ? <SignedNavBar /> : <Navbar />}
        <div className="flex flex-col items-center h-screen mt-16">
                <h2 className="text-2xl font-bold mb-4 text-center">Favorite Cars</h2>
          No cars you have liked yet.
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {signed ? <SignedNavBar /> : <Navbar />}
      <h2 className="text-2xl font-bold mb-4 text-center">Favorite Cars</h2>
      <div className="flex-1 p-4">
        {isLoading ? (
          <p>Loading cars...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
                onClick={() => setSelectedCar(car)}
              />
            ))}
            {selectedCar && (
              <QuickView
                car={selectedCar}
                open={!!selectedCar}
                onClose={() => setSelectedCar(null)}
              />
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
