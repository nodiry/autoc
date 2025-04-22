import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import axios from "axios";
import { siteConfig } from "@/config/site";

interface Car {
  _id: string;
  make: string;
  carmodel: string;
  year: number;
  price: number;
  images: string[];
  specs: {
    color?: string;
    transmission?: string;
    fuelType?: string;
    mileage?: number;
  };
}

const CarFilter = ({
  cars,
  isOpen,
  onFilter,
}: {
  cars: Car[];
  isOpen: boolean;
  onFilter: (filtered: Car[]) => void;
}) => {
  const [filters, setFilters] = useState({
    make: "",
    fuelType: "",
    transmission: "",
  });

  useEffect(() => {
    const filtered = cars.filter((car) => {
      return (
        (!filters.make ||
          car.make.toLowerCase().includes(filters.make.toLowerCase())) &&
        (!filters.fuelType || car.specs.fuelType === filters.fuelType) &&
        (!filters.transmission ||
          car.specs.transmission === filters.transmission)
      );
    });
    onFilter(filtered);
  }, [filters, cars]);

  return (
    <div
      className={cn(
        "p-4 space-y-4 w-64 bg-gray-100 h-full",
        !isOpen && "hidden md:block"
      )}
    >
      <div>
        <label className="block text-sm font-medium">Make</label>
        <input
          className="w-full p-2 border rounded"
          value={filters.make}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, make: e.target.value }))
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Fuel Type</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.fuelType}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fuelType: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Transmission</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.transmission}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, transmission: e.target.value }))
          }
        >
          <option value="">All</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>
      <Button
        onClick={() => setFilters({ make: "", fuelType: "", transmission: "" })}
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  );
};

const CarListings = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const localCars = localStorage.getItem("cars");
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
      <Navbar />
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
                <Card key={car._id}>
                  <CardContent className="p-0">
                    <Carousel>
                      <CarouselContent>
                        {car.images.map((img, i) => (
                          <CarouselItem key={i}>
                            <img
                              src={img}
                              alt={car.make}
                              className="w-full h-48 object-cover rounded-t"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">
                        {car.make} {car.carmodel}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {car.year} • ${car.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarListings;
