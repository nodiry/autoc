import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  username: string;
}

const TerminateAccountModal = ({ open, onClose, username }: Props) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTerminate = async () => {
    if (input !== "DELETE") {
      toast("Type DELETE to confirm");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(siteConfig.links.profile, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (res.ok) {
        toast.info("Account deleted");
        localStorage.clear();
        navigate("/");
      } else {
        toast.error("Failed to delete account");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while deleting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Terminate Account</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This action is <strong>permanent</strong>. To confirm, type{" "}
          <span className="font-semibold">DELETE</span> below.
        </p>

        <div className="grid gap-1 pt-2">
          <Label htmlFor="confirm-delete">Type DELETE</Label>
          <Input
            id="confirm-delete"
            placeholder="DELETE"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleTerminate}
            disabled={loading || input !== "DELETE"}
          >
            {loading ? "Deleting..." : "Confirm Termination"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TerminateAccountModal;
