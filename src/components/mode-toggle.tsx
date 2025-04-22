import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { words } from "@/config/text"
import { useState } from "react"

export function ModeToggle() {
  const [isMobile] = useState(window.innerWidth < 640); // Default to screen size
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button  variant={isMobile ? "outline" : "ghost"} className="w-full gap-2">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className={`${isMobile ? "sr-only" : "block"}`}>{words.theme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          setTheme("light"), window.location.reload();}}>
          {words.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setTheme("dark"), window.location.reload();}}>
          {words.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          setTheme("system"), window.location.reload();}}>
          {words.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
