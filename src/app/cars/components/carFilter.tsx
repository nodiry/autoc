import { Button } from "@/components/ui/button";
import {
  bodyTypes,
  carMakes,
  colors,
  driveTypes,
  fuelTypes,
  transmissions,
} from "@/lib/carOptions";
import { cn } from "@/lib/utils";
import { Car } from "@/type";
import { useEffect, useState } from "react";

const CarFilter = ({
  cars,
  isOpen,
  onFilter,
}: {
  cars: Car[];
  isOpen: boolean;
  onFilter: (filtered: Car[]) => void;
}) => {
  const [filters, setFilters] = useState({
    make: "",
    fuelType: "",
    transmission: "",
    driveType: "",
    bodyType: "",
    color: "",
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    minMileage: "",
    maxMileage: "",
    minHorsepower: "",
    maxHorsepower: "",
  });

  useEffect(() => {
    const filtered = cars.filter((car) => {
      const {
        make,
        fuelType,
        transmission,
        driveType,
        bodyType,
        color,
        minYear,
        maxYear,
        minPrice,
        maxPrice,
        minMileage,
        maxMileage,
        minHorsepower,
        maxHorsepower,
      } = filters;

      return (
        (!make || car.make.toLowerCase().includes(make.toLowerCase())) &&
        (!fuelType || car.specs.fuelType === fuelType) &&
        (!transmission || car.specs.transmission === transmission) &&
        (!driveType || car.specs.driveType === driveType) &&
        (!bodyType || car.specs.bodyType === bodyType) &&
        (!color || car.specs.color?.toLowerCase() === color.toLowerCase()) &&
        (!minYear || car.year >= parseInt(minYear)) &&
        (!maxYear || car.year <= parseInt(maxYear)) &&
        (!minPrice || car.price >= parseFloat(minPrice)) &&
        (!maxPrice || car.price <= parseFloat(maxPrice)) &&
        (!minMileage || (car.specs.mileage ?? 0) >= parseInt(minMileage)) &&
        (!maxMileage || (car.specs.mileage ?? 0) <= parseInt(maxMileage)) &&
        (!minHorsepower ||
          (car.specs.engine?.horsepower ?? 0) >= parseInt(minHorsepower)) &&
        (!maxHorsepower ||
          (car.specs.engine?.horsepower ?? 0) <= parseInt(maxHorsepower))
      );
    });

    onFilter(filtered);
  }, [filters, cars]);

  const handleChange = (key: string, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div
      className={cn(
        "p-4 space-y-4 w-64 bg-gray-100 h-full overflow-y-auto",
        !isOpen && "hidden md:block"
      )}
    >
      {/* Text filters */}
      <div>
        <label className="block text-sm font-medium">Car Brand</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.make}
          onChange={(e) => handleChange("make", e.target.value)}
        >
          <option value="">All</option>
          {carMakes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Color</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.color}
          onChange={(e) => handleChange("color", e.target.value)}
        >
          <option value="">All</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown filters */}
      <div>
        <label className="block text-sm font-medium">Fuel Type</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.fuelType}
          onChange={(e) => handleChange("fuelType", e.target.value)}
        >
          <option value="">All</option>
          {fuelTypes.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Transmision</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.transmission}
          onChange={(e) => handleChange("transmission", e.target.value)}
        >
          <option value="">All</option>
          {transmissions.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Drive Type</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.driveType}
          onChange={(e) => handleChange("driveType", e.target.value)}
        >
          <option value="">All</option>
          {driveTypes.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Body Type</label>
        <select
          className="w-full p-2 border rounded"
          value={filters.bodyType}
          onChange={(e) => handleChange("bodyType", e.target.value)}
        >
          <option value="">All</option>
          {bodyTypes.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Range filters */}
      {[
        ["Year", "minYear", "maxYear"],
        ["Price", "minPrice", "maxPrice"],
        ["Mileage", "minMileage", "maxMileage"],
        ["Horsepower", "minHorsepower", "maxHorsepower"],
      ].map(([label, minKey, maxKey]) => (
        <div key={minKey}>
          <label className="block text-sm font-medium">{label} Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border rounded"
              value={filters[minKey]}
              onChange={(e) => handleChange(minKey, e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border rounded"
              value={filters[maxKey]}
              onChange={(e) => handleChange(maxKey, e.target.value)}
            />
          </div>
        </div>
      ))}

      <Button
        onClick={() =>
          setFilters({
            make: "",
            fuelType: "",
            transmission: "",
            driveType: "",
            bodyType: "",
            color: "",
            minYear: "",
            maxYear: "",
            minPrice: "",
            maxPrice: "",
            minMileage: "",
            maxMileage: "",
            minHorsepower: "",
            maxHorsepower: "",
          })
        }
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default CarFilter;
