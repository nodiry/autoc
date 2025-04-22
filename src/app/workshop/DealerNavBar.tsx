import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Plus } from "lucide-react";
import { logout } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AddCarModal from "./AddCar";
import CreateCompanyModal from "./CreateCompany";
import UpdateCompanyModal from "./UpdateCompany";
import UpdateDealerProfileModal from "./UpdateDealer";

const DealerNavBar = () => {
  const isMobile = window.innerWidth < 640;
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false); // state for modal
  const [companyModal, setCompanyModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      console.warn("No valid user. Redirecting...");
      localStorage.clear();
      window.location.href = "/";
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 flex-row items-center ">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-2 text-xl font-bold text-gray-800"
              >
                <img src="/logo.png" alt="Logo" width={130} height={120} />
              </motion.span>
            </Link>
          </div>
          <CreateCompanyModal dealerId={user?.id} />
          <Button onClick={() => setCompanyModal(true)}>
            <Plus className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Edit Company</span>
          </Button>

          <div className="flex gap-2 items-center">
            <Button
              onClick={() => setOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              <Plus className=" h-4 w-4" />
              <span className={isMobile ? "sr-only" : ""}>Add A New Car</span>
            </Button>

            <UpdateDealerProfileModal
              isOpen={openProfile}
              setIsOpen={setOpenProfile}
              dealer={user}
            />

            <Button onClick={() => setOpenProfile(true)}>Edit Profile</Button>
            <Button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md"
            >
              <LogOut className=" h-4 w-4" />
              <span className={isMobile ? "sr-only" : "font-medium"}>
                Log out
              </span>
            </Button>
          </div>
        </div>
      </div>

      <UpdateCompanyModal isOpen={companyModal} setIsOpen={setCompanyModal} />
      {/* Modal hook-up */}
      <AddCarModal
        isOpen={open}
        setIsOpen={setOpen} // ✅ this was missing!
        dealer={user?.id}
        company={user?.company}
      />
    </nav>
  );
};

export default DealerNavBar;
