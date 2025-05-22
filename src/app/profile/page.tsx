import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SignedNavBar from "@/components/shared/SignedNavBar";
import Navbar from "@/components/shared/NavBar";
import UpdateUserModal from "./components/updateUser";
import TerminateAccountModal from "./components/TerminateModal";
import Footer from "@/components/shared/Footer";

interface User {
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  passportId?: string;
  validated: boolean;
  interests: { brand: string; type: string }[];
  owner: { brand: string; type: string }[];
}

const UserProfile = () => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [terminateOpen, setTerminateOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return <p className="text-center mt-10">No user found</p>;

  return (
    <div className="flex flex-col items-center ">
      {user ? <SignedNavBar /> : <Navbar />}
      <Card className="w-full max-w-2xl shadow-md my-20">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">User Profile</h2>
          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Username</p>
              <p>{user.username}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Full Name</p>
              <p>
                {user.firstname} {user.lastname}
              </p>
            </div>
            <div>
              <p className="font-medium">Age</p>
              <p>{user.age}</p>
            </div>
            <div>
              <p className="font-medium">Address</p>
              <p>{user.address || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Phone</p>
              <p>{user.phone}</p>
            </div>
            <div>
              <p className="font-medium">Passport ID</p>
              <p>{user.passportId || "N/A"}</p>
            </div>
            <div>
              <p className="font-medium">Validated</p>
              <p>{user.validated ? "Yes" : "No"}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={() => setUpdateOpen(true)}>Update Info</Button>
            <Button
              variant="destructive"
              onClick={() => setTerminateOpen(true)}
            >
              Terminate Account{" "}
            </Button>
          </div>
        </CardContent>
      </Card>
      <UpdateUserModal
        user={user}
        open={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
      <TerminateAccountModal
        open={terminateOpen}
        onClose={() => setTerminateOpen(false)}
        username={user.username}
      />
      <Footer />
    </div>
  );
};

export default UserProfile;
