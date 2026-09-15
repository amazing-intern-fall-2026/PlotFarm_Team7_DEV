import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FarmingLogFormSchema,
  type FarmingLogFormData,
  type UploadedImageItem,
  type GrowthStageId,
  type ContractStatus,
  type FarmingLogDraft,
  GROWTH_STAGES,
  validateFarmingLogEligibility,
} from "./farmingLog.types";
import { compressImage } from "./compressImage";
import { farmingLogApi } from "../api/farmingLogApi";

const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

interface UseFarmingLogFormProps {
  contractId?: string;
  contractStatus?: ContractStatus;
  isAssignedToFarmer?: boolean;
  initialStage?: GrowthStageId;
  initialTemperature?: number;
  initialAirHumidity?: number;
  initialSoilMoisture?: number;
  onSuccess?: (createdLog: unknown) => void;
}

export function useFarmingLogForm({
  contractId = "CONTRACT-A104",
  contractStatus = "ACTIVE",
  isAssignedToFarmer = true,
  initialStage,
  initialTemperature = 24.5,
  initialAirHumidity = 72,
  initialSoilMoisture = 68,
  onSuccess,
}: UseFarmingLogFormProps = {}) {
  const [uploadedImages, setUploadedImages] = React.useState<UploadedImageItem[]>([]);
  const [isCompressing, setIsCompressing] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);
  const [hasRestoredDraft, setHasRestoredDraft] = React.useState(false);

  const draftKey = `farming_log_draft_${contractId}`;

  // Evaluate business eligibility
  const eligibility = React.useMemo(
    () => validateFarmingLogEligibility(contractStatus, isAssignedToFarmer),
    [contractStatus, isAssignedToFarmer]
  );

  const form = useForm<FarmingLogFormData>({
    resolver: zodResolver(FarmingLogFormSchema),
    defaultValues: {
      selectedStage: initialStage,
      notes: "",
      photoUrls: [],
      temperature: initialTemperature,
      airHumidity: initialAirHumidity,
      soilMoisture: initialSoilMoisture,
    },
    mode: "onTouched",
  });

  const { setValue, watch, trigger, reset, formState } = form;
  const currentStage = watch("selectedStage");
  const currentPhotoUrls = watch("photoUrls");
  const notes = watch("notes");
  const temperature = watch("temperature");
  const airHumidity = watch("airHumidity");
  const soilMoisture = watch("soilMoisture");

  // Monitor online / offline state
  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Restore draft from LocalStorage on mount if available
  React.useEffect(() => {
    try {
      const savedDraftRaw = localStorage.getItem(draftKey);
      if (savedDraftRaw) {
        const draft: FarmingLogDraft = JSON.parse(savedDraftRaw);
        if (draft.notes || draft.selectedStage || (draft.uploadedImages && draft.uploadedImages.length > 0)) {
          reset({
            selectedStage: draft.selectedStage as GrowthStageId | undefined,
            notes: draft.notes || "",
            photoUrls: (draft.uploadedImages || []).map((img) => img.url),
            temperature: draft.temperature ?? initialTemperature,
            airHumidity: draft.airHumidity ?? initialAirHumidity,
            soilMoisture: draft.soilMoisture ?? initialSoilMoisture,
          });
          if (draft.uploadedImages && draft.uploadedImages.length > 0) {
            setUploadedImages(draft.uploadedImages);
          }
          setHasRestoredDraft(true);
        }
      }
    } catch {
      // Ignore JSON parse errors in localStorage
    }
  }, [draftKey, initialTemperature, initialAirHumidity, initialSoilMoisture, reset]);

  // Auto-save draft to LocalStorage when user makes changes
  React.useEffect(() => {
    if (!notes && !currentStage && uploadedImages.length === 0) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const draft: FarmingLogDraft = {
          contractId,
          selectedStage: currentStage,
          notes: notes || "",
          uploadedImages,
          temperature,
          airHumidity,
          soilMoisture,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(draftKey, JSON.stringify(draft));
      } catch {
        // Ignore localStorage quota errors
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [contractId, currentStage, notes, uploadedImages, temperature, airHumidity, soilMoisture, draftKey]);

  const handleClearDraft = React.useCallback(() => {
    localStorage.removeItem(draftKey);
    setHasRestoredDraft(false);
    setUploadedImages([]);
    reset({
      selectedStage: undefined,
      notes: "",
      photoUrls: [],
      temperature: initialTemperature,
      airHumidity: initialAirHumidity,
      soilMoisture: initialSoilMoisture,
    });
  }, [draftKey, initialTemperature, initialAirHumidity, initialSoilMoisture, reset]);

  // Keep form's photoUrls in sync with uploadedImages
  React.useEffect(() => {
    const urls = uploadedImages.map((img) => img.url);
    setValue("photoUrls", urls, { shouldValidate: true });
  }, [uploadedImages, setValue]);

  // Stage selection handler
  const handleSelectStage = (stageId: GrowthStageId) => {
    setValue("selectedStage", stageId, { shouldValidate: true, shouldDirty: true });
  };

  // Image Upload handler with client-side compression (US-23)
  const handleAddFiles = async (files: FileList | File[]) => {
    const rawFiles = Array.from(files);
    if (rawFiles.length === 0) return;

    // Validate mime types
    const invalidType = rawFiles.find((f) => !ALLOWED_IMAGE_MIME_TYPES.includes(f.type.toLowerCase()));
    if (invalidType) {
      setSubmitError("Định dạng ảnh không hợp lệ. Vui lòng chọn ảnh PNG, JPG hoặc WEBP.");
      return;
    }

    // Validate size limit (< 10MB)
    const oversizedFile = rawFiles.find((f) => f.size > MAX_IMAGE_SIZE_BYTES);
    if (oversizedFile) {
      setSubmitError(`Tệp ảnh "${oversizedFile.name}" vượt quá giới hạn 10MB (${(oversizedFile.size / (1024 * 1024)).toFixed(1)} MB).`);
      return;
    }

    setSubmitError(null);
    setIsCompressing(true);
    setIsUploading(true);
    setUploadProgress(10);

    try {
      for (let i = 0; i < rawFiles.length; i++) {
        const file = rawFiles[i];

        // 1. Client-side compression
        const compression = await compressImage(file, 1600, 0.8);
        setIsCompressing(false);

        // 2. Upload to Cloudinary API
        const uploadResult = await farmingLogApi.uploadMedia(
          compression.file,
          (percent) => {
            const overallProgress = Math.round(
              ((i + percent / 100) / rawFiles.length) * 100
            );
            setUploadProgress(overallProgress);
          }
        );

        const newImageItem: UploadedImageItem = {
          id: `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          url: uploadResult.url,
          originalName: file.name,
          originalSize: compression.originalSize,
          compressedSize: compression.compressedSize,
          previewUrl: uploadResult.url,
        };

        setUploadedImages((prev) => [...prev, newImageItem]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Tải ảnh thất bại. Vui lòng thử lại.";
      setSubmitError(msg);
    } finally {
      setIsCompressing(false);
      setIsUploading(false);
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(0), 1000);
      trigger("photoUrls");
    }
  };

  // Remove thumbnail handler (AC3)
  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // IoT sync helper
  const handleSyncSensors = (temp: number, humidity: number, moisture: number) => {
    setValue("temperature", temp, { shouldValidate: true });
    setValue("airHumidity", humidity, { shouldValidate: true });
    setValue("soilMoisture", moisture, { shouldValidate: true });
  };

  // Submit handler (AC1 & AC2)
  const handleSubmitForm = form.handleSubmit(async (data) => {
    setSubmitError(null);

    // Business check: contract status & assignment
    if (!eligibility.eligible) {
      setSubmitError(eligibility.message || "Bạn không đủ điều kiện đăng nhật ký cho ô đất này.");
      return;
    }

    // Offline check: allow local saving
    if (isOffline) {
      setSubmitError("Đang ngoại tuyến (Offline). Bản nháp đã được lưu vào thiết bị. Vui lòng kết nối Internet để gửi bài viết lên hệ thống.");
      return;
    }

    const stageDef = GROWTH_STAGES.find((s) => s.id === data.selectedStage);
    const progress = stageDef?.progressPercent ?? 50;

    try {
      const result = await farmingLogApi.createFarmingLog(contractId, {
        actionType: "LOG_GROWTH",
        title: `Nhật ký sinh trưởng • ${stageDef?.label ?? "Phát triển thân lá"}`,
        description: data.notes,
        growthStage: data.selectedStage,
        progressPercent: progress,
        photoUrls: data.photoUrls,
        sensorSnapshot: {
          temperature: data.temperature,
          humidity: data.airHumidity,
          soilMoisture: data.soilMoisture,
        },
      });

      // Clear draft on successful submission
      localStorage.removeItem(draftKey);
      setHasRestoredDraft(false);

      setIsSuccessModalOpen(true);
      onSuccess?.(result);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Có lỗi xảy ra khi lưu bài viết nhật ký. Vui lòng thử lại.";
      setSubmitError(msg);
    }
  });

  const canSubmit = eligibility.eligible && !formState.isSubmitting && !isUploading;

  return {
    form,
    currentStage,
    currentPhotoUrls,
    uploadedImages,
    isCompressing,
    isUploading,
    uploadProgress,
    submitError,
    isSubmitting: formState.isSubmitting,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    isOffline,
    hasRestoredDraft,
    eligibility,
    canSubmit,
    handleSelectStage,
    handleAddFiles,
    handleRemoveImage,
    handleSyncSensors,
    handleSubmitForm,
    handleClearDraft,
  };
}

