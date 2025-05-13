// components/shared/AISearchInput.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface AISearchInputProps {
  loading?: boolean;
  onSubmit: (query: string) => void;
}

const AISearchInput = ({ loading = false, onSubmit }: AISearchInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSubmit(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex w-full gap-2 items-center">
      <Input
        placeholder="Describe the car you need..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        className="flex-1"
      />
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="flex gap-1"
      >
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        Search
      </Button>
    </div>
  );
};

export default AISearchInput;
