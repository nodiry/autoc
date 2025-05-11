import { useEffect, useState } from "react";
import { Car } from "@/type";
import { siteConfig, site } from "@/config/site";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteMarker from "./components/Favorite";
import { useParams } from "react-router-dom";
import BuyCarModal from "./components/BuyButton";
import Navbar from "@/components/shared/NavBar";
import SignedNavBar from "@/components/shared/SignedNavBar";

interface Company {
  _id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
}

const CarPage = () => {
  const { id } = useParams();
  const [company, setCompany] = useState<Company | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBuyer, setBuyer] = useState(false);

  const handleSuccess = (updatedCar: Car) => {
    setCar(updatedCar); // this updates the car info on page
  };
  // First: load the car from localStorage
  useEffect(() => {
    const storedCars: Car[] = JSON.parse(localStorage.getItem("cars") || "[]");
    const foundCar = storedCars.find((c) => c._id === id);
    setCar(foundCar || null);
  }, [id]);

  // Second: check if the user is signed in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && Object.keys(user).length > 0) setsigned(true);
  }, []);

  // Third: once car and user are available, check if user is the buyer
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (car && user?._id) {
      setBuyer(car.buyer === user._id);
    }
  }, [car]);

  // Fourth: fetch the company info after the car is loaded
  useEffect(() => {
    if (!car?.company) return;

    const fetchCompany = async () => {
      try {
        const res = await fetch(siteConfig.links.org + car.company, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setCompany(data.company);
        setCars(data.cars);
      } catch (err) {
        console.error("Failed to fetch company info", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [car?.company]);

  if (!car) return <div className="p-6 text-center">Car not found.</div>;

  return (
    <div className="flex flex-col mx-auto px-4 space-y-8">
      {signed ? <SignedNavBar /> : <Navbar />}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Images */}
        <div>
          <AspectRatio ratio={16 / 9} className="bg-muted mb-4">
            <img
              src={site + car.images[0]}
              alt="Car image"
              className="object-cover w-full h-full rounded"
            />
          </AspectRatio>
          {/* Add carousel/fullscreen later */}
        </div>

        {/* Car info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {car.make} {car.carmodel} ({car.year})
            </h1>
            <FavoriteMarker carId={car._id} />
          </div>
          <p className="text-xl font-semibold text-primary">${car.price}</p>

          <ul className="text-sm grid grid-cols-2 gap-2">
            <li>Color: {car.specs.color || "-"}</li>
            <li>Transmission: {car.specs.transmission || "-"}</li>
            <li>Fuel Type: {car.specs.fuelType || "-"}</li>
            <li>Drive Type: {car.specs.driveType || "-"}</li>
            <li>Body Type: {car.specs.bodyType || "-"}</li>
            <li>Car Rnage: {car.specs.range || 0} km</li>
            <li>
              Engine: {car.specs.engine?.size || "-"} (
              {car.specs.engine?.cylinders || "-"} cyl)
            </li>
            <li>Horsepower: {car.specs.engine?.horsepower || "-"} HP</li>
          </ul>

          <p className="text-sm mt-2">VIN: {car.vin}</p>
          <div className="mt-4 space-x-4">
            <Button variant="default">Contact Dealer</Button>
            <Button
              onClick={() => setModalOpen(true)}
              disabled={
                car.status !== "available" &&
                !(car.status === "rejected" && !isBuyer)
              }
            >
              {car.status === "available"
                ? "Buy Now"
                : car.status === "pending" && isBuyer
                ? "Reserved for You"
                : car.status === "pending"
                ? "Reserved"
                : car.status === "completed" && isBuyer
                ? "Purchase Approved"
                : car.status === "completed"
                ? "Car Sold"
                : car.status === "rejected" && isBuyer
                ? "Purchase Denied"
                : "Buy Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Dealer Info</h2>
        {loading ? (
          <p>Loading dealer info...</p>
        ) : company ? (
          <div className="border p-4 rounded-md">
            <p className="font-semibold">{company.name}</p>
            <p>Region: {company.region}</p>
            <p>Address: {company.address}</p>
            <p>Phone: {company.phone}</p>
            <p>Email: {company.email}</p>
            <p>Total Cars: {cars.length}</p>
          </div>
        ) : (
          <p>Dealer info not found.</p>
        )}
      </div>

      {/* More from company */}
      {cars.length > 1 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">More from {company?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars
              .filter((c) => c._id !== car._id)
              .map((relatedCar) => (
                <Card key={relatedCar._id}>
                  <CardContent className="p-0">
                    <AspectRatio ratio={10 / 8} className="bg-muted">
                      <img
                        src={site + relatedCar.images[0]}
                        alt={relatedCar.make}
                        className="w-full h-full object-cover rounded-t"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">
                        {relatedCar.make} {relatedCar.carmodel}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {relatedCar.year} • ${relatedCar.price}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}
      <BuyCarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        carid={car._id}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default CarPage;
