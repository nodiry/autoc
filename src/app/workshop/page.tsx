import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import DealerNavBar from "./DealerNavBar";

const WorkShop = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedCars = localStorage.getItem("cars");
        let storedOrders = localStorage.getItem("orders");

        const org = JSON.parse(localStorage.getItem("org") || "null");
        if (!org) {
          console.warn("No company found in localStorage");
          return;
        }

        if (!storedCars) {
          const res = await fetch("/org/cars", { credentials: "include" });
          if (res.ok) {
            const data = await res.json();
            storedCars = JSON.stringify(data);
            localStorage.setItem("cars", storedCars);
          }
        }

        if (!storedOrders) {
          const res = await fetch("/org/history", { credentials: "include" });
          if (res.ok) {
            const data = await res.json();
            storedOrders = JSON.stringify(data);
            localStorage.setItem("orders", storedOrders);
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
