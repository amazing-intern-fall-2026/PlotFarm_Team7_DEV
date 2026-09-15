import * as React from "react";
import {
  Card,
  Button,
  Badge,
  Box,
  Text,
} from "@/shared/ui";
import { type UploadedImageItem } from "../model/farmingLog.types";
import { Camera, UploadCloud, X, CheckCircle, Loader2 } from "lucide-react";

interface ImageDropzoneUploaderProps {
  images: UploadedImageItem[];
  onAddFiles: (files: FileList | File[]) => void;
  onRemoveImage: (id: string) => void;
  isCompressing?: boolean;
  isUploading?: boolean;
  uploadProgress?: number;
  hasError?: boolean;
}

export function ImageDropzoneUploader({
  images,
  onAddFiles,
  onRemoveImage,
  isCompressing = false,
  isUploading = false,
  uploadProgress = 0,
  hasError = false,
}: ImageDropzoneUploaderProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const cameraInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(e.dataTransfer.files);
    }
  };

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <Box className="space-y-3">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onAddFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onAddFiles(e.target.files);
            e.target.value = "";
          }
        }}
      />

      <Box className="flex items-center justify-between">
        <Text as="label" className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
          <Camera className="h-4 w-4 text-emerald-600" />
          <span>Hình ảnh thực tế tại vườn <Text as="span" className="text-destructive">*</Text></span>
        </Text>
        <Badge variant={images.length > 0 ? "success" : "secondary"} className="text-[10px]">
          {images.length} ảnh đã sẵn sàng
        </Badge>
      </Box>

      {/* Dropzone Container */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-5 sm:p-6 border-2 border-dashed transition-all rounded-3xl text-center relative overflow-hidden ${
          isDragOver
            ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 scale-[1.005]"
            : hasError
            ? "border-destructive bg-destructive/5 ring-2 ring-destructive/30"
            : "border-border hover:border-emerald-400 bg-muted/20"
        }`}
      >
        <Box className="flex flex-col items-center justify-center space-y-3">
          <Box className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 flex items-center justify-center shadow-xs">
            {isUploading ? (
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            ) : (
              <UploadCloud className="h-6 w-6" />
            )}
          </Box>

          <Box className="space-y-1 max-w-sm">
            <Text as="p" className="text-xs sm:text-sm font-bold text-foreground">
              Kéo thả ảnh vào đây hoặc bấm chọn từ thiết bị
            </Text>
            <Text variant="muted" className="text-[11px] leading-relaxed">
              Hỗ trợ PNG, JPG, WEBP (Tối đa 10MB/ảnh) • Tự động nén trước khi đồng bộ Cloudinary
            </Text>
          </Box>

          {/* Action buttons: Camera capture and File explorer */}
          <Box className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isUploading}
              leftIcon={<Camera className="h-4 w-4 text-emerald-600" />}
              className="text-xs font-bold rounded-xl"
            >
              Chụp từ Camera
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              leftIcon={<UploadCloud className="h-4 w-4" />}
              className="text-xs font-bold rounded-xl"
            >
              Chọn từ Thư viện
            </Button>
          </Box>
        </Box>

        {/* Upload Progress Bar */}
        {isUploading && (
          <Box className="mt-4 space-y-1.5 p-3 rounded-2xl bg-background border border-border shadow-xs animate-in fade-in">
            <Box className="flex items-center justify-between text-xs">
              <Text variant="muted" className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                {isCompressing ? "Đang nén ảnh phía client..." : "Đang tải ảnh lên Cloudinary..."}
              </Text>
              <Text as="strong" className="font-bold text-emerald-700">
                {uploadProgress}%
              </Text>
            </Box>
            <Box className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <Box
                className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </Box>
          </Box>
        )}
      </Card>

      {/* Error message for AC2 */}
      {hasError && (
        <Text as="p" className="text-xs text-destructive font-semibold">
          Vui lòng chọn mốc sinh trưởng và đính kèm ít nhất 1 ảnh thực tế.
        </Text>
      )}

      {/* Uploaded Thumbnails Grid (AC3: Remove image with X) */}
      {images.length > 0 && (
        <Box className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {images.map((img, index) => (
            <Card
              key={img.id}
              className="group relative overflow-hidden rounded-2xl border border-border p-0 shadow-xs hover:shadow-md transition-all"
            >
              {/* Image Preview */}
              <Box className="aspect-square w-full bg-black overflow-hidden relative">
                <img
                  src={img.previewUrl}
                  alt={`Ảnh chụp ${index + 1}`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />

                {/* Remove button (AC3) */}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => onRemoveImage(img.id)}
                  aria-label={`Xóa ảnh ${img.originalName}`}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-lg opacity-90 hover:opacity-100 p-0"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>

                {/* Cloudinary Synced Badge */}
                <Badge
                  variant="secondary"
                  className="absolute bottom-2 left-2 bg-black/70 text-emerald-300 text-[10px] backdrop-blur-xs flex items-center gap-1 py-0.5 px-2"
                >
                  <CheckCircle className="h-2.5 w-2.5 text-emerald-400" />
                  <span>Đã nén</span>
                </Badge>
              </Box>

              {/* Compression stat footer */}
              <Box className="p-2 text-[10px] bg-card border-t border-border flex items-center justify-between text-muted-foreground">
                <Text as="span" className="truncate max-w-[90px]">
                  {img.originalName}
                </Text>
                <Text as="span" className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {formatBytes(img.compressedSize || img.originalSize)}
                </Text>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
