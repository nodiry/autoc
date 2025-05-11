import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Maximize, ChevronLeft, ChevronRight } from "lucide-react";
import { site } from "@/config/site";
import { Car } from "@/type";
import FavoriteMarker from "./Favorite";

interface QuickViewProps {
  car: Car;
  open: boolean;
  onClose: () => void;
}

const QuickView = ({ car, open, onClose }: QuickViewProps) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {/* Main Quick View Dialog */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          style={{ maxWidth: "1200px" }}
          className="max-w-5xl w-full p-0 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Section: Image Carousel */}
            <div className="md:w-2/3 w-full bg-black relative">
              <Carousel className="w-full h-full">
                <CarouselContent>
                  {car.images.map((img, idx) => (
                    <CarouselItem key={idx}>
                      <AspectRatio ratio={10 / 9}>
                        <img
                          src={site + img}
                          alt={`Image ${idx + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white">
                  <ChevronLeft />
                </CarouselPrevious>
                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white">
                  <ChevronRight />
                </CarouselNext>
              </Carousel>
              <Button
                variant="ghost"
                size="icon"
                className="absolute bottom-4 right-4 bg-white/50 hover:bg-white"
                onClick={() => setFullscreen(true)}
              >
                <Maximize />
              </Button>
            </div>

            {/* Right Section: Car Details */}
            <div className="md:w-1/3 w-full p-6 overflow-auto">
              <DialogHeader>
                <DialogTitle>
                  {car.make} {car.carmodel}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Year:</strong> {car.year}
                </p>
                <p>
                  <strong>Price:</strong> ${car.price}
                </p>
                <p>
                  <strong>Color:</strong> {car.specs.color || "N/A"}
                </p>
                <p>
                  <strong>Transmission:</strong>{" "}
                  {car.specs.transmission || "N/A"}
                </p>
                <p>
                  <strong>Fuel Type:</strong> {car.specs.fuelType || "N/A"}
                </p>
                <p>
                  <strong>Range:</strong> {car.specs.range || "N/A"} km
                </p>
                <p>
                  <strong>Drive Type:</strong> {car.specs.driveType || "N/A"}
                </p>
                <p>
                  <strong>Body Type:</strong> {car.specs.bodyType || "N/A"}
                </p>
                <p>
                  <strong>Engine Size:</strong>{" "}
                  {car.specs.engine?.size || "N/A"}
                </p>
                <p>
                  <strong>Cylinders:</strong>{" "}
                  {car.specs.engine?.cylinders || "N/A"}
                </p>
                <p>
                  <strong>Horsepower:</strong>{" "}
                  {car.specs.engine?.horsepower || "N/A"} HP
                </p>
              </div>
              <DialogFooter className="mt-6">
                <FavoriteMarker carId={car._id} />
                <Button
                  onClick={() => (window.location.href = `/cars/${car._id}`)}
                >
                  View Full Details
                </Button>
              </DialogFooter>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Carousel Dialog */}
      {fullscreen && (
        <Dialog open={fullscreen} onOpenChange={() => setFullscreen(false)}>
          <DialogContent
            style={{ maxWidth: "1000px" }}
            className="w-screen h-fit p-0 bg-black"
          >
            <Carousel className="w-full h-full">
              <CarouselContent>
                {car.images.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <AspectRatio ratio={10 / 9}>
                      <img
                        src={site + img}
                        alt={`Fullscreen Image ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white">
                <ChevronLeft />
              </CarouselPrevious>
              <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white">
                <ChevronRight />
              </CarouselNext>
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default QuickView;
