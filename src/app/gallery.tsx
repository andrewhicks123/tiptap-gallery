import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UploadButton } from "@/utils/uploadthing";
import { addImageUploadDB, getUserImages } from "@/functions/app"

interface Image {
  userId: string;
  fileId: string;
  fileUrl: string;
  type: string;
  name: string;
  uploadDate: Date;
}

interface ImageButtonProps {
  onSelectImage: (url: string) => void;
}

export const ImageButton = ({ onSelectImage }: ImageButtonProps) => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    try {
      const userImages = await getUserImages();
      setImages(userImages);
    } catch (error) {
      console.error("Error fetching user images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon">
          <ImageIcon className="w-5 h-5" />
          <span className="sr-only">Link</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        <SheetHeader>
          <SheetTitle>Image Gallery</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-32 bg-gray-200 cursor-pointer"
              onClick={() => {
                onSelectImage(image.fileUrl);
                setOpen(false); // Close the sidebar after selecting an image
              }}
            >
              <img src={image.fileUrl} alt={image.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center mt-4">
          <p className="mb-2">Upload a new image</p>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              await addImageUploadDB(res[0]);
              console.log(res[0]);
              fetchImages(); // Reload images after upload
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};