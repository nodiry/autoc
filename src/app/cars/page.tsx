import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { siteConfig } from "@/config/site";

import { Car } from "@/type";
import CarFilter from "./components/carFilter";
import CarCard from "./components/carCard";
import QuickView from "./components/QuickView";
import SignedNavBar from "@/components/shared/SignedNavBar";

const CarListings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const localCars = localStorage.getItem("cars");
    const user = localStorage.getItem("user");
    if (user) setsigned(true);
    if (localCars) {
      const parsed = JSON.parse(localCars);
      setCars(parsed);
      setFilteredCars(parsed);
      setIsLoading(false);
    } else {
      axios.get(siteConfig.links.dashboard + "cars").then((res) => {
        localStorage.setItem("cars", JSON.stringify(res.data.cars));
        setCars(res.data.cars);
        setFilteredCars(res.data.cars);
        setIsLoading(false);
      });
    }
  }, []);
  if (cars.length == 0)
    return (
      <div className="w-screen flex flex-col items-center">
        <Navbar />
        <div className="flex flex-col items-center h-screen mt-16">
          No cars on the server yet.
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {signed ? <SignedNavBar /> : <Navbar />}
      <div className="flex flex-1 w-full">
        <div className="hidden md:block">
          <CarFilter cars={cars} isOpen={true} onFilter={setFilteredCars} />
        </div>
        <div className="flex-1 p-4">
          <div className="md:hidden mb-4">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">Filter</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <CarFilter
                  cars={cars}
                  isOpen={true}
                  onFilter={setFilteredCars}
                />
              </SheetContent>
            </Sheet>
          </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default CarListings;
