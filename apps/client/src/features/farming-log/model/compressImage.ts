export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedPercentage: number;
}

/**
 * Client-side image compression using HTML5 Canvas API
 * Scales large photos to maximum 1600px width/height and compresses with 0.8 JPEG quality
 * Saves 4G mobile bandwidth for field ops while preserving critical plant details.
 */
export async function compressImage(
  file: File,
  maxDimension = 1600,
  quality = 0.8
): Promise<CompressionResult> {
  // Guard for non-image or environments without browser Image/Canvas (e.g. Node tests)
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !file.type.startsWith("image/")
  ) {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
      savedPercentage: 0,
    };
  }

  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          maxDimension = height;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve({
          file,
          originalSize: file.size,
          compressedSize: file.size,
          savedPercentage: 0,
        });
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return resolve({
              file,
              originalSize: file.size,
              compressedSize: file.size,
              savedPercentage: 0,
            });
          }

          const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          const savedPercentage = Math.max(
            0,
            Math.round(((file.size - compressedFile.size) / file.size) * 100)
          );

          resolve({
            file: compressedFile,
            originalSize: file.size,
            compressedSize: compressedFile.size,
            savedPercentage,
          });
        },
        "image/jpeg",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        file,
        originalSize: file.size,
        compressedSize: file.size,
        savedPercentage: 0,
      });
    };

    img.src = objectUrl;
  });
}
