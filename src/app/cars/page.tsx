import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { siteConfig } from "@/config/site";
import { useLocation, useNavigate } from "react-router-dom";

import { Car } from "@/type";
import CarFilter from "./components/carFilter";
import CarCard from "./components/carCard";
import QuickView from "./components/QuickView";
import SignedNavBar from "@/components/shared/SignedNavBar";
import AISearchInput from "@/components/aisearch";

const CarListings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setsigned(true);

    const fetchCars = async () => {
      setIsLoading(true);
      try {
        if (query) {
          const res = await axios.post(
            siteConfig.links.chat,
            { prompt: query },
            { withCredentials: true }
          );
          setCars(res.data.cars);
          setFilteredCars(res.data.cars);
        } else {
          const res = await axios.get(siteConfig.links.dashboard + "cars", { withCredentials: true });
          localStorage.setItem("cars", JSON.stringify(res.data.cars));
          setCars(res.data.cars);
          setFilteredCars(res.data.cars);
        }
      } catch (error) {
        console.error("Failed to load cars", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [query]);

  const handleAISearch = (newQuery: string) => {
    navigate(`/cars?query=${encodeURIComponent(newQuery)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {signed ? <SignedNavBar /> : <Navbar />}
      <div className="flex flex-row">
        <div className="hidden md:block">
          <CarFilter cars={cars} isOpen={true} onFilter={setFilteredCars} />
        </div>

        <div className="flex flex-col w-full">
          <div className="px-4 mt-4 max-w-4xl w-full mx-auto">
            <AISearchInput onSubmit={handleAISearch} loading={isLoading} />
            {query && (
              <Button variant="outline" onClick={() => navigate("/cars")}>
                Clear AI Filter
              </Button>
            )}
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
            ) : cars.length === 0 ? (
              <div className="flex flex-col items-center h-screen mt-16">
                No cars found
              </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default CarListings;
