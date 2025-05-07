import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RefreshButton = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await fetch(siteConfig.links.org + id, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error("error while fetching cars and orders");
      setLoading(false);
      localStorage.setItem("cars", JSON.stringify(data.cars));
      localStorage.setItem("orders", JSON.stringify(data.orders));
      window.location.reload();
    } catch (error) {
      toast.error("server while refreshing" + error);
    }
  };
  if (!id) return;
  return (
    <Button variant="outline" onClick={handleRefresh}>
      <div className={loading ? "animate-spin" : ""}>
        <RefreshCw />
      </div>
      Refresh
    </Button>
  );
};

export default RefreshButton;
