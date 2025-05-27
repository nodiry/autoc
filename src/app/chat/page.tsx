import { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "@/components/chatBox";
import { site, siteConfig } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Car } from "@/type";
import SignedNavBar from "@/components/shared/SignedNavBar";
import Navbar from "@/components/shared/NavBar";

export default function ChatMenuPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("user");
    if (!local) return;
    setsigned(true);
    setUser(JSON.parse(local));

    axios
      .get(siteConfig.links.sales + "history", { withCredentials: true })
      .then((res) => {
        setCars(res.data.sales);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Chat fetch error", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!user) return <p className="p-4">User not logged in</p>;

  return (
    <div className="p-4">
      {signed ? <SignedNavBar /> : <Navbar />}
      <h2 className="text-xl font-semibold mb-4">Your Chats</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <Card key={car._id}>
            <CardContent className="p-3 flex flex-col gap-2">
              <img
                src={site+car.images[0]}
                alt={car.carmodel}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="text-sm font-medium">{car.carmodel}</div>
              <ChatBox
                carId={car._id}
                userId={user._id}
                dealerId={car.dealer}
                role={"buyer"}
                chatEnabled={true}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
