import { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils"; // If you're using utility merging
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface FavoriteMarkerProps {
  carId: string;
}

const FavoriteMarker = ({ carId }: FavoriteMarkerProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (
      Array.isArray(user?.favorites) &&
      user.favorites.some((id: string) => id === carId)
    ) {
      setIsFavorite(true);
    }
  }, [carId]);

  const toggleFavorite = async () => {
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch(siteConfig.links.dashboard + "favorite", {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: carId }),
      });

      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser.user));
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  const Icon = isFavorite ? Heart : HeartOff;

  return (
    <Button
      onClick={toggleFavorite}
      variant="outline"
      size="icon"
      className={cn(
        "transition-colors",
        isFavorite ? "bg-red-500" : "text-muted-foreground"
      )}
    >
      <Icon
        className={cn(
          "transition-colors",
          isFavorite ? "text-white" : "text-gray"
        )}
      />
    </Button>
  );
};

export default FavoriteMarker;
