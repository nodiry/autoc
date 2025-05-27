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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";
import { Dealer } from "@/type";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dealer: Dealer;
}

export default function UpdateDealerProfileModal({
  isOpen,
  setIsOpen,
  dealer,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: "",
    firstname: "",
    lastname: "",
    age: 18,
    address: "",
    phone: "",
    email: "",
    passportId: "",
    chatEnabled: true,
    visible: true,
  });

  useEffect(() => {
    if (dealer) {
      setForm({
        id: dealer._id,
        firstname: dealer.firstname,
        lastname: dealer.lastname,
        age: dealer.age || 18,
        address: dealer.address,
        phone: dealer.phone,
        email: dealer.email,
        passportId: dealer.passportId || "",
        chatEnabled: dealer.settings.chatEnabled,
        visible: dealer.settings.visible,
      });
    }
  }, [dealer]);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      ...form,
      settings: {
        chatEnabled: form.chatEnabled,
        visible: form.visible,
      },
    };

    try {
      const res = await fetch(siteConfig.links.authdealer, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Profile updated");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="First Name"
            value={form.firstname}
            onChange={(e) => handleChange("firstname", e.target.value)}
          />
          <Input
            placeholder="Last Name"
            value={form.lastname}
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            placeholder="Passport ID (Optional)"
            value={form.passportId}
            onChange={(e) => handleChange("passportId", e.target.value)}
          />

          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={form.chatEnabled}
              onCheckedChange={(val) => handleChange("chatEnabled", !!val)}
            />
            <span>Enable Chat</span>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.visible}
              onCheckedChange={(val) => handleChange("visible", !!val)}
            />
            <span>Profile Visibility</span>
          </div>
        </div>

        <DialogFooter>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
