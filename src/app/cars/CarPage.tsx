import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Car } from "@/type";
import { site, siteConfig } from "@/config/site";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteMarker from "./components/Favorite";
import BuyCarModal from "./components/BuyButton";
import Navbar from "@/components/shared/NavBar";
import SignedNavBar from "@/components/shared/SignedNavBar";
import ChatBox from "@/components/chatBox";

interface Company {
  _id: string;
  name: string;
  region: string;
  address: string;
  phone: string;
  email: string;
}

const CarPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Get user from localStorage
        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser(parsedUser);

        // Fetch car
        const carRes = await fetch(`${siteConfig.links.dashboard}cars/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!carRes.ok) throw new Error("Failed to fetch car");

        const { car: fetchedCar } = await carRes.json();
        setCar(fetchedCar);

        // Set buyer flag if user is the buyer
        if (parsedUser?._id && fetchedCar.buyer === parsedUser._id) {
          setIsBuyer(true);
        }

        // Fetch company
        if (fetchedCar.company) {
          const companyRes = await fetch(
            siteConfig.links.org + fetchedCar.company,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!companyRes.ok) throw new Error("Failed to fetch company");

          const { company: fetchedCompany, cars: companyCars } =
            await companyRes.json();
          setCompany(fetchedCompany);
          setCars(companyCars);
        }
      } catch (err) {
        console.error("Error loading car page:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!car) return <div className="p-6 text-center">Car not found.</div>;

  const chatEnabled = (car.status === "pending" && isBuyer) || (car.status === "completed" && isBuyer);

  const showBuyButton =car.status === "available" || (car.status === "rejected" && !isBuyer);

  const buyButtonLabel = (() => {
    if (car.status === "available") return "Buy Now";
    if (car.status === "pending" && isBuyer) return "Reserved for You";
    if (car.status === "pending") return "Reserved";
    if (car.status === "completed" && isBuyer) return "Purchase Approved";
    if (car.status === "completed") return "Car Sold";
    if (car.status === "cancelled" && isBuyer) return "Purchase Denied";
    return "Buy Now";
  })();

  return (
    <div className="flex flex-col mx-auto px-4 space-y-8">
      {user ? <SignedNavBar /> : <Navbar />}

      {/* Car Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Car Images */}
        <div>
          <AspectRatio ratio={16 / 9} className="bg-muted mb-4">
            <img
              src={site + car.images[0]}
              alt="Car"
              className="object-cover w-full h-full rounded"
            />
          </AspectRatio>
        </div>

        {/* Car Info */}
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
            <li>Car Range: {car.specs.range || 0} km</li>
            <li>
              Engine: {car.specs.engine?.size || "-"} (
              {car.specs.engine?.cylinders || "-"} cyl)
            </li>
            <li>Horsepower: {car.specs.engine?.horsepower || "-"} HP</li>
          </ul>

          <p className="text-sm mt-2">VIN: {car.vin}</p>

          {/* Buttons */}
          <div className="mt-4 space-x-4 flex flex-wrap">
            <Button variant="default">Contact Dealer</Button>
            <ChatBox
              carId={car._id}
              userId={user?._id || car.dealer}
              dealerId={car.dealer}
              role="buyer"
              chatEnabled={chatEnabled}
            />
            <Button
              onClick={() => {
                if (!user) window.location.href = "/auth/signin";
                setModalOpen(true);
              }}
              disabled={!showBuyButton}
            >
              {buyButtonLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Dealer Info */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">Dealer Info</h2>
        {company ? (
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

      {/* Related Cars */}
      {cars.length > 1 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">More from {company?.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars
              .filter((c) => c._id !== car._id)
              .map((relatedCar) => (
                <Card key={relatedCar._id}>
                  <CardContent
                    className="p-0 cursor-pointer"
                    onClick={() =>
                      (window.location.href = "/cars/" + relatedCar._id)
                    }
                  >
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

      {/* Modal */}
      <BuyCarModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        carid={car._id}
      />
    </div>
  );
};

export default CarPage;
