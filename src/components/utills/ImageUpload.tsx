
import { useState } from "react";
import type { ChangeEvent } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { UploadTask } from "firebase/storage";
import { storage } from "@/firebase"; 
import {
  // Button,
  // Progress,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  // Avatar,
  // AvatarImage,
  // Input,
  // Label,
  // Badge,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { UploadCloud, Trash2 } from "lucide-react";
import { toast } from "sonner";


interface UploadProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
  task?: UploadTask;
}

const ImageUpload = ({
  onUploadComplete,
}: {
  onUploadComplete?: (urls: string[]) => void;
}) => {
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Validate files
      const invalidFiles = files.filter((file) => {
        return !file.type.match("image.*") || file.size > 5 * 1024 * 1024;
      });

      if (invalidFiles.length > 0) {
        toast.error("Some files are invalid (must be images under 5MB)");
        return;
      }

      // Add new files to upload queue
      const newUploads = files.map((file) => ({
        file,
        progress: 0,
      }));

      setUploads((prev) => [...prev, ...newUploads]);
    }
  };

  const handleUpload = async () => {
    if (uploads.length === 0) return;

    setIsUploading(true);

    // Filter out already completed uploads
    const uploadsToProcess = uploads.filter((u) => !u.url && !u.error);

    try {
      const uploadPromises = uploadsToProcess.map((upload) => {
        return new Promise<string>(async (resolve, reject) => {
          const storageRef = ref(
            storage,
            `images/${Date.now()}_${upload.file.name}`
          );
          const uploadTask: UploadTask = uploadBytesResumable(
            storageRef,
            upload.file
          );

          // Update state with the task for potential cancellation
          setUploads((prev) =>
            prev.map((u) =>
              u.file === upload.file ? { ...u, task: uploadTask } : u
            )
          );

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              // Update progress for this file
              setUploads((prev) =>
                prev.map((u) =>
                  u.file === upload.file ? { ...u, progress } : u
                )
              );
            },
            (error) => {
              // Handle unsuccessful uploads
              setUploads((prev) =>
                prev.map((u) =>
                  u.file === upload.file ? { ...u, error: error.message } : u
                )
              );
              reject(error);
            },
            async () => {
              // Handle successful upload
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                setUploads((prev) =>
                  prev.map((u) =>
                    u.file === upload.file
                      ? {
                          ...u,
                          url: downloadURL,
                          progress: 100,
                        }
                      : u
                  )
                );
                resolve(downloadURL);
              } catch (error) {
                setUploads((prev) =>
                  prev.map((u) =>
                    u.file === upload.file
                      ? {
                          ...u,
                          error: "Failed to get download URL",
                        }
                      : u
                  )
                );
                reject(error);
              }
            }
          );
        });
      });

      // Wait for all uploads to complete
      const urls = await Promise.all(uploadPromises);

      // Filter out successful URLs and call the completion handler
      const successfulUrls = urls.filter((url) => typeof url === "string");
      if (onUploadComplete && successfulUrls.length > 0) {
        onUploadComplete(successfulUrls);
        // toast({
        //   title: "Upload successful",
        //   description: `${successfulUrls.length} file(s) uploaded successfully`,
        // });
        toast.success(`${successfulUrls.length} file(s) uploaded successfully`);
      }
    } catch (error) {
      // toast({
      //   variant: "destructive",
      //   title: "Upload failed",
      //   description: "Some uploads failed. See individual files for details.",
      // });
      toast.error(`Some uploads failed. See individual files for details.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (file: File) => {
    // Cancel the upload if it's in progress
    const uploadToRemove = uploads.find((u) => u.file === file);
    if (uploadToRemove?.task) {
      uploadToRemove.task.cancel();
    }

    setUploads((prev) => prev.filter((u) => u.file !== file));
  };

  const handleRemoveAll = () => {
    // Cancel all in-progress uploads
    uploads.forEach((upload) => {
      if (upload.task && upload.progress < 100) {
        upload.task.cancel();
      }
    });

    setUploads([]);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">Upload Images</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Selected Files Preview */}
        {uploads.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">
              Selected Files ({uploads.length}):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {uploads.map((upload, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center gap-3 mb-2 w-full">
                    <Avatar className="w-14 h-14 rounded-md">
                      <AvatarImage src={URL.createObjectURL(upload.file)} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {upload.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(upload.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveImage(upload.file)}
                      disabled={isUploading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {upload.error ? (
                    <p className="text-xs text-destructive">
                      {upload.error}
                    </p>
                  ) : (
                    <Progress value={upload.progress} className="h-2" />
                  )}

                  {upload.url && !isUploading && (
                    <Input
                      value={upload.url}
                      readOnly
                      className="mt-2 text-xs h-8"
                    />
                  )}
                </Card>
              ))}
            </div>

            {uploads.length > 1 && (
              <Button
                onClick={handleRemoveAll}
                variant="outline"
                className="mt-2"
                disabled={isUploading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove All
              </Button>
            )}
          </div>
        )}

        {/* Upload Controls */}
        <div className="space-y-2">
          <Label htmlFor="image-upload-input">Choose Images</Label>
          <Input
            id="image-upload-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isUploading}
            multiple
            className="hidden"
          />
          <Button
            variant="outline"
            asChild
            disabled={isUploading}
            className="w-full"
          >
            <Label htmlFor="image-upload-input">
              <UploadCloud className="mr-2 h-4 w-4" />
              Select Files
            </Label>
          </Button>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={isUploading || uploads.length === 0}
          className="w-full"
        >
          {isUploading ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Uploading ({uploads.filter((u) => u.progress === 100).length}/
              {uploads.length})
            </>
          ) : (
            "Upload Images"
          )}
        </Button>
      </CardContent>
      <CardFooter>
        {!isUploading && uploads.some((u) => u.url) && (
          <Badge variant="outline" className="ml-auto">
            {uploads.filter((u) => u.url).length}/{uploads.length} uploaded
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageUpload;