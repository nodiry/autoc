import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import DealerNavBar from "./components/DealerNavBar";
import { siteConfig } from "@/config/site";
import RefreshButton from "./components/RefreshButton";
import DealerCarCard from "./components/DealerCarCard";
import { toast } from "sonner";

const WorkShop = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        setId(user.company);
        const org = JSON.parse(localStorage.getItem("org") || "null");
        if (!org) {
          console.warn("No company found in localStorage");
          return;
        }
        const res = await fetch(siteConfig.links.org + org._id, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) toast.error("error happened while fetching cars");
        const data = await res.json();

        setCars(data.cars);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DealerNavBar />
      <div className="flex flex-col min-h-screen px-4 py-6 w-screen">
        <div className="flex flex-row w-fit">
          <h2 className="text-xl font-bold mb-4">Dealer Workshop</h2>
          <RefreshButton id={id} />
        </div>
        <div className="flex flex-col items-center md:w-10/12 w-full mx-auto">
          <h3 className="font-semibold text-lg mb-4">Cars List</h3>
          {cars.length === 0 ? (
            <p className="text-sm text-gray-500">cars list is empty</p>
          ) : (
            cars.map((car, i) => (
              <DealerCarCard key={car._id || i} car={car} companyId={id} />
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkShop;
