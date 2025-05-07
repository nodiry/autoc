import { useRef, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { site, siteConfig } from "@/config/site";

interface ImageUploaderCarouselProps {
  onChange: (urls: string[]) => void;
}

export default function ImageUploaderCarousel({
  onChange,
}: ImageUploaderCarouselProps) {
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(siteConfig.links.dashboard + "image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json(); // assuming { url: string }
      const newImages = [...images, data.url];
      setImages(newImages);
      onChange(newImages); // pass to parent
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      // Reset file input so same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (index: number) => {
    const url = images[index];

    try {
      const res = await fetch(`${siteConfig.links.dashboard}image`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }), // send URL in body
      });

      if (!res.ok) throw new Error("Delete failed");

      const updated = [...images];
      updated.splice(index, 1);
      setImages(updated);
      onChange(updated);
      toast.success("Image deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete image");
    }
  };

  return (
<div className="grid grid-cols-3 gap-4 p-2">
{images.map((url, index) => (
        <div
          key={index}
          className="relative w-32 h-32 rounded-md border overflow-hidden"
        >
          <img
            src={site + url}
            alt={`car-${index}`}
            className="object-cover w-full h-full"
          />
          <button
            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            onClick={() => handleDelete(index)}
          >
            <Trash className="h-4 w-4 text-red-600" />
          </button>
        </div>
      ))}

      {/* Plus icon for uploading */}
      <div
        className="w-32 h-32 border rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100"
        onClick={() => fileInputRef.current?.click()}
      >
        <Plus className="h-6 w-6 text-gray-500" />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}
