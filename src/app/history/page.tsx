import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/shared/Footer";
import { site, siteConfig } from "@/config/site";
import { Car } from "@/type";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/NavBar";
import SignedNavBar from "@/components/shared/SignedNavBar";

const HistoryPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setsigned(true);
    const fetchHistory = async () => {
      try {
        const res = await fetch(siteConfig.links.sales + "history", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setCars(data.sales || []);
        } else {
          console.warn("Failed to load sales history.");
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.status === "completed" ||
      car.status === "cancelled" ||
      car.status === "pending"
  );

  return (
    <div className="min-h-screen px-4 py-6 flex flex-col items-center">
      {signed ? <SignedNavBar /> : <Navbar />}
      <div className="w-full md:w-9/12">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Purchase History
        </h2>
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : filteredCars.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            No cars in your history.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredCars.map((car) => (
              <Card className="w-full max-w-6xl mb-4 shadow-md">
                <CardContent className="flex flex-row items-center justify-between gap-6 p-4">
                  {/* 1. Image */}
                  <div className="w-40 h-32 shrink-0 overflow-hidden rounded">
                    <img
                      src={site + car.images[0]}
                      alt={car.make + " " + car.carmodel}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  {/* 2. Car Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h2 className="text-base font-semibold truncate">
                      {car.make} {car.carmodel}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      ${car.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Color: {car.specs?.color || "N/A"}
                    </p>
                  </div>

                  {/* 4. Actions + Date */}
                  <div className="flex flex-col gap-2 items-end text-right shrink-0">
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        disabled={loading}
                        onClick={() => navigate("/cars/" + car._id)}
                      >
                        See full details
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Created {formatDistanceToNow(new Date(car.created || 0))}{" "}
                      ago
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Approved{" "}
                      {formatDistanceToNow(new Date(car.modified || 0))} ago
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HistoryPage;
