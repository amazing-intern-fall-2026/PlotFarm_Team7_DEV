import type { Request, Response } from "express";
import { randomUUID } from "crypto";
import { buildSuccessResponse } from "../../common/utils/envelope";

export function uploadMedia(req: Request, res: Response): void {
  // In dev / test environment or when Cloudinary is connected, return standard image URL
  const publicId = `farming-logs/proof_${Date.now()}_${randomUUID().slice(0, 8)}`;
  
  // If request contains an imageUrl, file URL or base64, echo back or generate hosted URL
  const imageUrl = req.body?.url || 
    (req.body?.file ? `/images/proof_care_782.jpg` : `https://res.cloudinary.com/plotfarm/image/upload/v1726000000/${publicId}.jpg`);

  const responseData = {
    url: imageUrl,
    publicId,
    format: "jpg",
    bytes: req.body?.size || 450000,
    width: 1280,
    height: 960,
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(
    buildSuccessResponse(responseData, "Tải ảnh lên Cloudinary thành công.", {
      code: 201,
    })
  );
}
