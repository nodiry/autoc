import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateCompanyModalProps {
  dealerId: string;
}

const regions = [
  "Tashkent",
  "Andijan",
  "Fergana",
  "Namangan",
  "Samarkand",
  "Bukhara",
  "Khorezm",
  "Kashkadarya",
  "Surkhandarya",
  "Jizzakh",
  "Sirdaryo",
  "Navoi",
  "Karakalpakstan",
];

export default function CreateCompanyModal({
  dealerId,
}: CreateCompanyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    region: "",
  });
  const [hasOrg, setHasOrg] = useState(false);

  useEffect(() => {
    const org = localStorage.getItem("org");
    if (org) setHasOrg(true);
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...form,
      dealers: [dealerId],
    };

    try {
      const res = await fetch(siteConfig.links.org, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create company");

      const data = await res.json();
      localStorage.setItem("org", JSON.stringify(data.company));
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Company created");
      setIsOpen(false);
      setHasOrg(true);
    } catch (err) {
      console.error(err);
      toast.error("Error creating company");
    } finally {
      setLoading(false);
    }
  };

  if (hasOrg) return null;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-medium"
      >
        Create Company
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Company</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3 py-4">
            <Input
              placeholder="Company Name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <Input
              placeholder="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />

            {/* Select Region Dropdown */}
            <Select
              value={form.region}
              onValueChange={(value) => handleChange("region", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                "Create Company"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
