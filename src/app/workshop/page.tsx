import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import DealerNavBar from "./components/DealerNavBar";
import { siteConfig } from "@/config/site";
import RefreshButton from "./components/RefreshButton";

const WorkShop = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedCars = localStorage.getItem("cars");
        let storedOrders = localStorage.getItem("orders");
        const user = JSON.parse(localStorage.getItem("user") || "");
        setId(user.company);
        const org = JSON.parse(localStorage.getItem("org") || "null");
        if (!org) {
          console.warn("No company found in localStorage");
          return;
        }

        if (!storedCars || !storedOrders) {
          const res = await fetch(siteConfig.links.org + org._id, {
            method: "GET",
            credentials: "include",
          });
          if (res.ok) {
            const data = await res.json();
            localStorage.setItem("cars", JSON.stringify(data.cars));
            localStorage.setItem("orders", JSON.stringify(data.orders));
          }
        }

        setCars(JSON.parse(storedCars || "[]"));
        setOrders(JSON.parse(storedOrders || "[]"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DealerNavBar />
      <div className="flex flex-col min-h-screen px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Dealer Workshop</h2>
        <RefreshButton id={id} />
        <div className="flex gap-8">
          <div className="w-1/2">
            <h3 className="font-semibold text-lg mb-2">Cars List</h3>
            {cars.length === 0 ? (
              <p className="text-sm text-gray-500">cars list is empty</p>
            ) : (
              <ul className="list-disc list-inside">
                {cars.map((car, i) => (
                  <li key={i}>{car._id}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-1/2">
            <h3 className="font-semibold text-lg mb-2">Orders List</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">orders list is empty</p>
            ) : (
              <ul className="list-disc list-inside">
                {orders.map((order, i) => (
                  <li key={i}>{order._id}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WorkShop;
