import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { words } from "@/config/text";

const LangOption = () => {
    const [isMobile] = useState(window.innerWidth < 640); // Default to screen size
  const changeLang = (lang: string) => {
    localStorage.setItem("lang", lang);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button  variant={isMobile ? "outline" : "ghost"} className="w-full flex items-center gap-2">
           <Languages />
           <span className={`${isMobile ? "sr-only" : "block"}`}>{words.language}</span>
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={`w-48 p-2 shadow-lg rounded-lg `}>
        <DropdownMenuItem  onClick={() => changeLang("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang("uz")}>
          O'zbekcha
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLang("kr")}>
          한국어
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangOption;