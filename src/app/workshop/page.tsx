import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import DealerNavBar from "./components/DealerNavBar";
import { siteConfig } from "@/config/site";
import RefreshButton from "./components/RefreshButton";
import DealerCarCard from "./components/DealerCarCard";
import { toast } from "sonner";
import { io, Socket } from "socket.io-client";
import ChatModal from "./components/ChatModal";

const WorkShop = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeChat, setActiveChat] = useState<{
    carId: string;
    buyerId: string;
  } | null>(null);

  // Load user + connect socket
  useEffect(() => {
    const rawUser = localStorage.getItem("user");
    if (!rawUser) {
      toast.error("there is no user");
      return;
    }

    const parsedUser = JSON.parse(rawUser);
    setUser(parsedUser);

    const socketInstance = io(siteConfig.ws.chat, {
      auth: { userId: parsedUser._id },
      withCredentials: true,
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Fetch cars only after user is set
  useEffect(() => {
    if (!user) return;

    const fetchCars = async () => {
      try {
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

    fetchCars();
  }, [user]);

  return (
    <div>
      <DealerNavBar />
      <div className="flex flex-col min-h-screen px-4 py-6 w-screen">
        <div className="flex flex-row w-fit items-center gap-4">
          <h2 className="text-xl font-bold mb-4">Dealer Workshop</h2>
          {user && <RefreshButton id={user.company} />}
        </div>
        <div className="flex flex-col items-center md:w-10/12 w-full mx-auto">
          <h3 className="font-semibold text-lg mb-4">Cars List</h3>
          {cars.length === 0 ? (
            <p className="text-sm text-gray-500">cars list is empty</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Column 1: Available or Cancelled */}
              <div>
                <h4 className="text-center font-medium text-sm text-gray-600 mb-2">
                  Available / Cancelled
                </h4>
                {cars
                  .filter(
                    (car) =>
                      car.status === "available" || car.status === "cancelled",
                  )
                  .map((car, i) => (
                    <DealerCarCard
                      key={car._id || i}
                      car={car}
                      companyId={user.company}
                      onOpenChat={() =>
                        setActiveChat({ carId: car._id, buyerId: car.buyer })
                      }
                    />
                  ))}
              </div>

              {/* Column 2: Pending */}
              <div>
                <h4 className="text-center font-medium text-sm text-gray-600 mb-2">
                  Pending
                </h4>
                {cars
                  .filter((car) => car.status === "pending")
                  .map((car, i) => (
                    <DealerCarCard
                      key={car._id || i}
                      car={car}
                      companyId={user.company}
                      onOpenChat={() =>
                        setActiveChat({ carId: car._id, buyerId: car.buyer })
                      }
                    />
                  ))}
              </div>

              {/* Column 3: Completed */}
              <div>
                <h4 className="text-center font-medium text-sm text-gray-600 mb-2">
                  Completed
                </h4>
                {cars
                  .filter((car) => car.status === "completed")
                  .map((car, i) => (
                    <DealerCarCard
                      key={car._id || i}
                      car={car}
                      companyId={user.company}
                      onOpenChat={() =>
                        setActiveChat({ carId: car._id, buyerId: car.buyer })
                      }
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {activeChat && socket && (
        <ChatModal
          socket={socket}
          carId={activeChat.carId}
          senderId={user._id}
          receiverId={activeChat.buyerId}
          onClose={() => setActiveChat(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default WorkShop;
