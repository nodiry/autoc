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
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
    specs: {
      color: "",
      transmission: "",
      fuelType: "",
      mileage: "",
    },
    images: "",
  });

  const handleChange = (field: string, value: string) => {
    if (field in form.specs) {
      setForm({ ...form, specs: { ...form.specs, [field]: value } });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      year: parseInt(form.year),
      price: parseFloat(form.price),
      specs: {
        ...form.specs,
        mileage: parseFloat(form.specs.mileage),
      },
      images: form.images.split(",").map((url) => url.trim()),
      dealer,
      company,
    };

    try {
      const res = await fetch("/org/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        const cars = JSON.parse(localStorage.getItem("cars") || "[]");
        cars.push(data.car);
        localStorage.setItem("cars", JSON.stringify(cars));
        toast.success("Car added successfully");
        setForm({
          make: "",
          carmodel: "",
          year: "",
          price: "",
          specs: {
            color: "",
            transmission: "",
            fuelType: "",
            mileage: "",
          },
          images: "",
        });
        setIsOpen(false); // close modal
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Car</DialogTitle>
          <DialogDescription>
            Fill the form to list a new car.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Make"
            value={form.make}
            onChange={(e) => handleChange("make", e.target.value)}
          />
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
          <Label>Color</Label>
          <Input
            placeholder="Color"
            value={form.specs.color}
            onChange={(e) => handleChange("color", e.target.value)}
          />
          <Label>Transmission</Label>
          <Input
            placeholder="Transmission"
            value={form.specs.transmission}
            onChange={(e) => handleChange("transmission", e.target.value)}
          />
          <Label>Fuel Type</Label>
          <Input
            placeholder="Fuel Type"
            value={form.specs.fuelType}
            onChange={(e) => handleChange("fuelType", e.target.value)}
          />
          <Label>Mileage</Label>
          <Input
            type="number"
            placeholder="Mileage"
            value={form.specs.mileage}
            onChange={(e) => handleChange("mileage", e.target.value)}
          />
          <Label>Image URLs (comma separated)</Label>
          <Textarea
            placeholder="https://image1.com, https://image2.com"
            value={form.images}
            onChange={(e) => handleChange("images", e.target.value)}
          />
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
