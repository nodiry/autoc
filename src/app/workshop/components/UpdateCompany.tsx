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

interface UpdateCompanyModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function UpdateCompanyModal({
  isOpen,
  setIsOpen,
}: UpdateCompanyModalProps) {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [form, setForm] = useState({
    _id: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    region: "",
    newDealer: "",
  });

  // Load company data from localStorage
  useEffect(() => {
    const org = localStorage.getItem("org");
    if (!org) return;
    const parsed = JSON.parse(org);
    setCompany(parsed);
    setForm({
      _id: parsed._id || "",
      name: parsed.name || "",
      address: parsed.address || "",
      email: parsed.email || "",
      phone: parsed.phone || "",
      region: parsed.region || "",
      newDealer: "",
    });
  }, [isOpen]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (!company) return;

    setLoading(true);

    const updated = {
      ...company,
      name: form.name,
      address: form.address,
      email: form.email,
      phone: form.phone,
      region: form.region,
      // push new dealer if any
      dealers: form.newDealer
        ? [...(company.dealers || []), form.newDealer]
        : company.dealers,
    };

    try {
      const res = await fetch(siteConfig.links.org + form._id, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error("Failed to update company");

      const data = await res.json();
      toast.success("Company updated successfully");

      // update localStorage
      localStorage.removeItem("org");
      localStorage.setItem("org", JSON.stringify(data.company));
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong updating company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Company Info</DialogTitle>
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
          <Input
            placeholder="Region"
            value={form.region}
            onChange={(e) => handleChange("region", e.target.value)}
          />
          <Input
            placeholder="Add Dealer ID"
            value={form.newDealer}
            onChange={(e) => handleChange("newDealer", e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              "Update Company"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
