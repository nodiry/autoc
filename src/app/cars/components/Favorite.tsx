import { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils"; // utility for merging classNames
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

interface FavoriteMarkerProps {
  carId: string;
}

const FavoriteMarker = ({ carId }: FavoriteMarkerProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userExists, setUserExists] = useState(false);

  // On mount: check if user exists and whether the car is favorited
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const user = JSON.parse(stored);
      if (user && typeof user === "object" && Array.isArray(user.favorites)) {
        setUserExists(true);
        setIsFavorite(user.favorites.includes(carId));
      }
    } catch (err) {
      console.warn("Invalid user data in localStorage", err);
    }
  }, [carId]);

  const toggleFavorite = async () => {
    if (!userExists) return;

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

      if (!res.ok) throw new Error("Failed request");

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
      disabled={!userExists}
      variant="outline"
      size="icon"
      className={cn(
        "transition-colors",
        isFavorite ? "bg-red-500" : "text-muted-foreground",
        !userExists && "opacity-50 cursor-not-allowed"
      )}
      title={userExists ? "Toggle Favorite" : "Login to favorite"}
    >
      <Icon
        className={cn(
          "transition-colors",
          isFavorite ? "text-white" : "text-gray-500"
        )}
      />
    </Button>
  );
};

export default FavoriteMarker;
