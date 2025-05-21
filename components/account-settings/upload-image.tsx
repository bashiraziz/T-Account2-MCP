"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LuUpload, LuX } from "react-icons/lu";
import { useDeleteImage, useUploadImage } from "@/hooks";
import { LoadingSpinner } from "../common";

interface UploadImageProps {
  imageUrl?: string;
  setImageUrl?: (url: string) => void;
  isLoading: (value: boolean) => void;
}
export const UploadImage = ({
  imageUrl,
  setImageUrl,
  isLoading,
}: UploadImageProps) => {
  const [image, setImage] = useState<string | null>(imageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: uploadImage, isPending: uploadingImage } = useUploadImage();
  const { mutate: deleteImage, isPending: deletingImage } = useDeleteImage();

  console.log(image, "imageUrl");

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null); // Reset error on new upload
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImage(reader.result as string);
        reader.readAsDataURL(file);

        uploadImage(file, {
          onSuccess: (url) => {
            setImage(url);
            setImageUrl?.(url);
          },
          onError: () => {
            setError("Failed to upload image");
          },
        });
      }
    },
    [uploadImage, setImageUrl]
  );

  const onDropRejected = useCallback(() => {
    setError("Invalid file format. Please upload a PNG, JPG, JPEG, or GIF.");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
  });

  const handleDeleteImage = () => {
    if (!imageUrl) return;

    deleteImage(imageUrl, {
      onSuccess: () => {
        setImage(null);
        setImageUrl?.("");
      },
      onError: () => {
        console.error("Failed to delete image");
      },
    });
  };

  useEffect(() => {
    isLoading(uploadingImage || deletingImage);
  }, [uploadingImage, deletingImage, isLoading]);

  return (
    <div className="mt-2">
      <div
        {...getRootProps()}
        className={`relative w-32 h-32 border flex justify-center items-center text-center rounded-lg cursor-pointer ${
          image
            ? "border-solid border-gray-300"
            : "border-dashed border-primary"
        } ${isDragActive ? "bg-primaryLight" : ""}`}
      >
        <input {...getInputProps()} />

        {image ? (
          <div className="relative w-full h-full">
            {(uploadingImage || deletingImage) && (
              <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                <LoadingSpinner className="border-white" />
              </div>
            )}
            <Image
              src={image}
              width={0}
              height={0}
              sizes="100vw"
              alt="profile-image"
              className="w-full h-full object-cover object-top rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteImage();
              }}
              className="absolute -top-2 -right-2 z-10 w-6 h-6 flex justify-center items-center bg-gray-700 text-white rounded-full"
            >
              <LuX size={14} />
            </button>
          </div>
        ) : (
          <span className="flex flex-col items-center gap-2 text-primary text-xs font-medium leading-4">
            <LuUpload size={24} />
            {isDragActive ? "Drop the image here" : "Upload profile image"}
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};
