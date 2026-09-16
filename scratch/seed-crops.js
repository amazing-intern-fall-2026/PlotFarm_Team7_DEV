const { db } = require("./packages/database");

const CROPS = [
  {
    slug: "cai-cau-vong-thuy-si",
    nameI18n: { vi: "Cải cầu vồng Thụy Sĩ (Rainbow Chard)", en: "Swiss Rainbow Chard" },
    descriptionI18n: {
      vi: "Giàu Vitamin A, C, khoáng chất vi lượng, màu sắc sống động bừng sáng bàn ăn.",
      en: "Rich in Vitamin A, C, vibrant colors for healthy meals."
    },
    durationDays: 60,
    idealTempMin: 15,
    idealTempMax: 24,
    idealMoistureMin: 65,
    idealMoistureMax: 75,
    expectedYieldKgPerSqm: 4.5,
    basePrice: 1400000,
    coverImageUrl: "/images/plot-2.jpg",
    isActive: true,
  },
  {
    slug: "xa-lach-bup-mo-da-lat",
    nameI18n: { vi: "Xà lách búp mỡ Đà Lạt", en: "Da Lat Butterhead Lettuce" },
    descriptionI18n: {
      vi: "Lá mỏng giòn béo, vị ngọt mát tự nhiên phù hợp món salad chuẩn hữu cơ mỗi ngày.",
      en: "Crisp, sweet, organic fresh salad greens."
    },
    durationDays: 45,
    idealTempMin: 14,
    idealTempMax: 22,
    idealMoistureMin: 60,
    idealMoistureMax: 70,
    expectedYieldKgPerSqm: 3.5,
    basePrice: 1100000,
    coverImageUrl: "/images/plot-3.jpg",
    isActive: true,
  },
  {
    slug: "cai-kale-xoan-da-lat",
    nameI18n: { vi: "Cải Kale xoăn Đà Lạt (Curly Kale)", en: "Da Lat Curly Kale" },
    descriptionI18n: {
      vi: "Nữ hoàng siêu thực phẩm, giàu canxi, chất chống oxy hóa và chất xơ hòa tan.",
      en: "Superfood rich in antioxidants, calcium and vitamins."
    },
    durationDays: 70,
    idealTempMin: 12,
    idealTempMax: 20,
    idealMoistureMin: 65,
    idealMoistureMax: 80,
    expectedYieldKgPerSqm: 4.0,
    basePrice: 1350000,
    coverImageUrl: "/images/plot-4.jpg",
    isActive: true,
  },
  {
    slug: "cai-bo-xoi-nhat",
    nameI18n: { vi: "Cải bó xôi Nhật (Spinach)", en: "Japanese Spinach" },
    descriptionI18n: {
      vi: "Hàm lượng sắt cao, ngọt tự nhiên khi nấu chín hoặc ép nước tươi mát.",
      en: "High in iron, sweet and nutritious for cooking or fresh juice."
    },
    durationDays: 50,
    idealTempMin: 14,
    idealTempMax: 23,
    idealMoistureMin: 65,
    idealMoistureMax: 75,
    expectedYieldKgPerSqm: 4.0,
    basePrice: 1200000,
    coverImageUrl: "/images/plot-1.jpg",
    isActive: true,
  },
  {
    slug: "ca-chua-bi-huu-co",
    nameI18n: { vi: "Cà chua bi hữu cơ Đà Lạt", en: "Da Lat Organic Cherry Tomatoes" },
    descriptionI18n: {
      vi: "Trái đỏ mọng, ngọt đậm đà, thu hái liên tục trong 30 ngày vụ mùa.",
      en: "Sweet, juicy cherry tomatoes harvested fresh."
    },
    durationDays: 75,
    idealTempMin: 16,
    idealTempMax: 26,
    idealMoistureMin: 60,
    idealMoistureMax: 70,
    expectedYieldKgPerSqm: 6.0,
    basePrice: 1600000,
    coverImageUrl: "/images/plot-6.jpg",
    isActive: true,
  },
];

async function seed() {
  console.log("Seeding seasonal crops...");
  for (const crop of CROPS) {
    await db.crop.upsert({
      where: { slug: crop.slug },
      update: crop,
      create: crop,
    });
    console.log(`- Seeded: ${crop.nameI18n.vi}`);
  }
  const total = await db.crop.count();
  console.log(`Done. Total crops in DB: ${total}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
