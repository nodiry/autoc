import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  carMakes,
  colors,
  transmissions,
  fuelTypes,
  bodyTypes,
  driveTypes,
  engineSizes,
} from "@/lib/carOptions";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import ImageUploaderCarousel from "./addImages";
import { siteConfig } from "@/config/site";

interface AddCarModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  company: string;
  dealer: string;
}

export default function AddCarModal({
  isOpen,
  setIsOpen,
  company,
  dealer,
}: AddCarModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    make: "",
    carmodel: "",
    year: "",
    price: "",
    vin: "",
    specs: {
      color: "",
      transmission: "",
      fuelType: "",
      bodyType: "",
      driveType: "",
      engine: {
        size: "",
        cylinders: 0,
        horsepower: 0,
      },
      engineCylinders: "",
      fuelEfficiency: "",
    },
    images: [],
  });

  const handleChange = (field: string, value: any) => {
    const keys = field.split(".");
    setForm((prevForm) => {
      const newForm = { ...prevForm };
      let current: any = newForm;

      while (keys.length > 1) {
        const key = keys.shift()!;
        if (!(key in current)) current[key] = {};
        current = current[key];
      }
      current[keys[0]] = value;
      return newForm;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      year: parseInt(form.year),
      price: parseFloat(form.price),
      dealer,
      company,
    };

    try {
      const res = await fetch(siteConfig.links.sales + "add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const cars = JSON.parse(localStorage.getItem("cars") || "[]");
        cars.push(data.car);
        localStorage.setItem("cars", JSON.stringify(cars));
        toast.success("Car added successfully");
        window.location.reload();
      } else {
        toast.error("Failed to add car");
      }
    } catch (err) {
      console.error("Error adding car:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : ""), obj);
  };

  const renderSelect = (label: string, field: string, options: string[]) => (
    <div>
      <Label>{label}</Label>
      <Select
        onValueChange={(val) => handleChange(`specs.${field}`, val)}
        value={getNestedValue(form, `specs.${field}`) || ""}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent style={{ maxWidth: "1000px" }}>
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
            Fill the form to list a new car.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-x-6 w-full h-full">
          <div className="flex flex-col w-full md:max-w-1/2 md:w-1/2 space-y-4 py-4">
            <Label>Car Brand</Label>
            <Select onValueChange={(val) => handleChange("make", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Car brand" />
              </SelectTrigger>
              <SelectContent>
                {carMakes.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>{" "}
            <Input
              placeholder="Model"
              value={form.carmodel}
              onChange={(e) => handleChange("carmodel", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={(e) => handleChange("year", e.target.value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
            <Input
              type="text"
              placeholder="VIN Number"
              value={form.vin}
              onChange={(e) => handleChange("vin", e.target.value)}
            />
            <ImageUploaderCarousel
              onChange={(urls) => handleChange("images", urls)}
            />
          </div>
          <div className="flex flex-col w-full md:max-w-1/2 md:w-1/2 space-y-4 py-4">
            {renderSelect("Color", "color", colors)}
            {renderSelect("Transmission", "transmission", transmissions)}
            {renderSelect("Fuel Type", "fuelType", fuelTypes)}
            {renderSelect("Body Type", "bodyType", bodyTypes)}
            {renderSelect("Drive Type", "driveType", driveTypes)}
            <Label>Engine Size</Label>
            <Select
              onValueChange={(val) => handleChange("specs.engine.size", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Engine Size" />
              </SelectTrigger>
              <SelectContent>
                {engineSizes.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Engine Cylinders</Label>
            <Input
              min={0}
              max={24}
              type="number"
              placeholder=" Engine Cylinders"
              value={form.specs.engine.cylinders}
              onChange={(e) =>
                handleChange("specs.engine.cylinders", e.target.value)
              }
            />
            <Label>Horse Power</Label>
            <Input
              min={10}
              max={1000}
              type="number"
              placeholder=" Horse Power"
              value={form.specs.engine.horsepower}
              onChange={(e) =>
                handleChange("specs.engine.horsepower", e.target.value)
              }
            />
            <Label>Fuel Efficiency</Label>
            <Input
              min={0}
              max={1200}
              type="number"
              placeholder="Fuel Efficiency (e.g. 18 km/l or 500 km)"
              value={form.specs.fuelEfficiency}
              onChange={(e) =>
                handleChange("specs.fuelEfficiency", e.target.value)
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
            ) : (
              "Add Car"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
