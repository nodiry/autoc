import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Dealer } from "@/type";

export default function ContactDealerModal({ dealer }: { dealer: Dealer }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Contact Dealer</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact Dealer</DialogTitle>
          <DialogDescription>
            Here is how you can reach the dealer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Full Name</p>
            <p>
              {dealer.firstname} {dealer.lastname}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>{dealer.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>{dealer.email}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
