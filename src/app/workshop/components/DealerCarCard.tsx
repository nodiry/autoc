import { useEffect, useState } from "react";
import { Car } from "@/type";
import { siteConfig, site } from "@/config/site";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

interface Props {
  car: Car;
  companyId: string;
  onOpenChat: (carId: string, buyerId: string) => void;
}

const DealerCarCard = ({ car, companyId, onOpenChat }: Props) => {
  const [buyerName, setBuyerName] = useState<string | null>(null);
  const [dealerName, setDealerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBuyerDealer = async () => {
      if (car.status !== "available" && car.buyer) {
        try {
          const res = await fetch(siteConfig.links.user, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buyerid: car.buyer, dealerid: car.dealer }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error("failed to fetch user and dealer");
          setBuyerName(data?.user?.firstname + data.user.lastname);
          setDealerName(data?.dealer?.firstname + data.dealer.lastname);
        } catch (err) {
          toast.error("error fetching names:");
          setBuyerName("Unknown Buyer");
          setDealerName("Unknown Dealer");
        }
      }
    };

    fetchBuyerDealer();
  }, [car.status, car.buyer]);

  const updateStatus = async (status: "completed" | "cancelled") => {
    try {
      setLoading(true);
      const res = await fetch(siteConfig.links.sales + "status", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyid: companyId,
          carid: car._id,
          status,
        }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      window.location.reload();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete() {
    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.sales, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carid: car._id, companyid: companyId }),
      });
      if (!res.ok) return toast.error("error happened while deleting the car");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      toast.error("error happened : " + error);
    }
  }

  return (
    <Card className="w-full max-w-6xl mb-4 shadow-md">
      <CardContent className="flex flex-col p-4 gap-y-3">
        {/* Image */}
        <div className="w-full h-40 overflow-hidden rounded">
          <img
            src={site + car.images[0]}
            alt={car.make + " " + car.carmodel}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Car Info */}
        <div className="space-y-1">
          <h2 className="text-base font-semibold">
            {car.make} {car.carmodel}
          </h2>
          <p className="text-sm text-muted-foreground">${car.price}</p>
          <p className="text-sm text-muted-foreground">
            Color: {car.specs?.color || "N/A"}
          </p>
        </div>

        {/* Buyer and Dealer Info */}
        <div className="space-y-1 text-sm">
          {(car.status === "pending" || car.status === "completed") &&
          car.buyer ? (
            <>
              <p>
                <span className="font-medium">Buyer:</span> {buyerName}
              </p>
              <p>
                <span className="font-medium">Dealer:</span> {dealerName}
              </p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => onOpenChat(car._id, car.buyer || "")}
              >
                Open Chat
              </Button>
            </>
          ) : (
            <p className="italic text-muted-foreground">No buyer info</p>
          )}
        </div>

        {/* Status + Actions */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Status: {car.status}</p>

          {car.status === "pending" && car.buyer && (
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                disabled={loading}
                onClick={() => updateStatus("completed")}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={loading}
                onClick={() => updateStatus("cancelled")}
              >
                Reject
              </Button>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleDelete}
          >
            Delete Car
          </Button>

          <p className="text-xs text-muted-foreground text-right">
            Created {formatDistanceToNow(new Date(car.created || 0))} ago
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DealerCarCard;
