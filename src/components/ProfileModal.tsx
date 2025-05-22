import { useNavigate } from "react-router-dom";
import { words } from "../config/text";
import { Ellipsis, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
         DropdownMenuItem } from "@/components/ui/dropdown-menu";
import LangOption from "./LangOption";

const ProfileModal = () => {
  const navigate = useNavigate();

const logout = async () => {
  await fetch("/logout", { method: "POST", credentials: "include" });
};
  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return ( 
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button variant="outline"> <User /> </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end"
          className="w-48 shadow-lg rounded-lg items-center" >

          <DropdownMenuItem onClick={() => navigate("/profile")}>
            <Button variant='ghost' className="w-full gap-2">
            <Ellipsis className="mr-2" /> {words.profile}
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem >
          <LangOption/> 
          </DropdownMenuItem>
          <DropdownMenuItem >
          </DropdownMenuItem>
          <hr className="my-2" />
          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <Button variant='ghost' className="w-full">
              <LogOut className="mr-2" /> {words.signout}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
      )};

export default ProfileModal;

