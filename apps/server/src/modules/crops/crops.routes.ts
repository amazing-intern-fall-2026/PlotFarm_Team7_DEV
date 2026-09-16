import { Router, Request, Response } from "express";
import { db } from "@repo/database";

const router: Router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const crops = await db.crop.findMany({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: {
        items: crops,
        total: crops.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "Không thể tải danh sách cây trồng",
      },
    });
  }
});

export const cropsRoutes: Router = router;
