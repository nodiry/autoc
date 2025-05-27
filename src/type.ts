export interface Car {
  _id: string;
  company: string; // Linked company
  dealer: string; // Linked dealer
  make: string; // e.g., Toyota
  carmodel: string; // e.g., Corolla
  year: number; // Model year
  price: number; // Price in number (assumed to be in a default currency)

  specs: {
    color?: string; // Exterior color
    transmission?: string; // e.g., Automatic
    fuelType?: string; // e.g., Petrol, Diesel
    range?: number; // Kilometers or miles (even new cars may have delivery mileage)
    driveType?: string; // e.g., FWD, AWD
    bodyType?: string; // e.g., SUV, Sedan
    engine?: {
      size?: string; // e.g., "2.0L"
      cylinders?: number; // e.g., 4
      horsepower?: number; // e.g., 180
    };
  };
  vin: string; // Unique vehicle identification number
  features?: string[]; // e.g., ["Sunroof", "Bluetooth", "Parking Sensors"]
  warranty?: {
    years?: number; // e.g., 5
    kilometers?: number; // e.g., 100000
  };
  images: string[]; // Array of image URLs
  status: string;
  buyer?: string;
  saleDate?: string;
  review?: {
    user: string;
    text: string;
    rating: number;
    date: string;
  };
  created?: number;
  modified?: number;
}

export interface Dealer {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  passportId?: string;
  validated: boolean;
  company: string;
  settings: {
    chatEnabled: boolean;
    visible: boolean;
  };
}
