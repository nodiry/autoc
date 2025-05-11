import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { site } from "@/config/site"; // assuming you use this for full image paths
import { Car } from "@/type";

interface CarCardProps {
  car: Car;
  onClick?: () => void;
}

const CarCard = ({ car, onClick }: CarCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-lg transition"
    >
      <CardContent className="p-0">
        <AspectRatio ratio={10 / 8} className="bg-muted">
          <img
            src={site + car.images[0]}
            alt={car.make + " " + car.carmodel}
            className="w-full h-full object-cover rounded-t"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-semibold text-lg">
            {car.make} {car.carmodel}
          </h3>
          <p className="text-sm text-muted-foreground">
            {car.year} • ${car.price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;
