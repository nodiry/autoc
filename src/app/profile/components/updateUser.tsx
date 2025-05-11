import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";

interface Props {
  open: boolean;
  onClose: () => void;
  user: {
    firstname: string;
    lastname: string;
    age: number;
    address: string;
    phone: string;
    email: string;
    passportId?: string;
    validated: boolean;
  };
}

const UpdateUserModal = ({ open, onClose, user }: Props) => {
  const [form, setForm] = useState({ ...user });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    key: keyof typeof form,
    value: string | number | boolean
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.profile, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        localStorage.setItem("user", JSON.stringify(updatedUser.user));
        toast("Updated successfully");
        onClose();
      } else {
        toast.error("Failed to update user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while updating");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid gap-1">
            <Label>First Name</Label>
            <Input
              value={form.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Last Name</Label>
            <Input
              value={form.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Age</Label>
            <Input
              type="number"
              min={18}
              value={form.age}
              onChange={(e) => handleChange("age", parseInt(e.target.value))}
            />
          </div>

          <div className="grid gap-1">
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="grid gap-1">
            <Label>Passport ID</Label>
            <Input
              value={form.passportId || ""}
              onChange={(e) => handleChange("passportId", e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserModal;
