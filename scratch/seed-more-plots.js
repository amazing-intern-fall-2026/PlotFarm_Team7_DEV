const { db } = require('d:/FOR_WORK/AMAZING/PlotFarm-DEV-Team7/packages/database/dist/index.js');

async function seedPlotsAndCrops() {
  console.log('--- Bắt đầu nâng cấp Data Plots & Crops ---');

  const farm = await db.farm.findFirst({ where: { slug: 'nong-trai-da-lat' } });
  if (!farm) {
    console.error('Không tìm thấy Farm!');
    process.exit(1);
  }

  const crops = await db.crop.findMany();
  if (!crops || crops.length === 0) {
    console.error('Không tìm thấy Crops!');
    process.exit(1);
  }

  console.log(`Tìm thấy ${crops.length} giống cây trong DB:`, crops.map(c => c.slug));

  // Gán defaultCropId cho 16 plot hiện có nếu đang bị null hoặc chưa khớp
  const existingPlots = await db.plot.findMany();
  for (let i = 0; i < existingPlots.length; i++) {
    const p = existingPlots[i];
    const crop = crops[i % crops.length];
    await db.plot.update({
      where: { id: p.id },
      data: { defaultCropId: crop.id },
    });
  }
  console.log(`Đã cập nhật defaultCropId cho ${existingPlots.length} ô đất hiện có.`);

  // Tạo thêm các ô đất mới để tổng số ô đất lên 36 - 40 ô đất
  // A05..A08, B05..B08, C05..C08, D05..D08, E01..E08
  const newPlotsData = [
    // Khu A: A05 - A08
    { code: 'PLT-A05', num: 'Khu A - Ô 05', area: 15, price: 1200000, status: 'AVAILABLE', cropIdx: 0 },
    { code: 'PLT-A06', num: 'Khu A - Ô 06', area: 20, price: 1500000, status: 'AVAILABLE', cropIdx: 1 },
    { code: 'PLT-A07', num: 'Khu A - Ô 07', area: 25, price: 1800000, status: 'RESERVED', cropIdx: 2 },
    { code: 'PLT-A08', num: 'Khu A - Ô 08', area: 20, price: 1500000, status: 'OCCUPIED', cropIdx: 3 },

    // Khu B: B05 - B08
    { code: 'PLT-B05', num: 'Khu B - Ô 05', area: 15, price: 1250000, status: 'AVAILABLE', cropIdx: 4 },
    { code: 'PLT-B06', num: 'Khu B - Ô 06', area: 20, price: 1600000, status: 'AVAILABLE', cropIdx: 5 },
    { code: 'PLT-B07', num: 'Khu B - Ô 07', area: 25, price: 1900000, status: 'AVAILABLE', cropIdx: 0 },
    { code: 'PLT-B08', num: 'Khu B - Ô 08', area: 20, price: 1550000, status: 'MAINTENANCE', cropIdx: 1 },

    // Khu C: C05 - C08
    { code: 'PLT-C05', num: 'Khu C - Ô 05', area: 15, price: 1200000, status: 'AVAILABLE', cropIdx: 2 },
    { code: 'PLT-C06', num: 'Khu C - Ô 06', area: 20, price: 1600000, status: 'OCCUPIED', cropIdx: 3 },
    { code: 'PLT-C07', num: 'Khu C - Ô 07', area: 20, price: 1500000, status: 'AVAILABLE', cropIdx: 4 },
    { code: 'PLT-C08', num: 'Khu C - Ô 08', area: 30, price: 2100000, status: 'AVAILABLE', cropIdx: 5 },

    // Khu D: D05 - D08
    { code: 'PLT-D05', num: 'Khu D - Ô 05', area: 20, price: 1650000, status: 'AVAILABLE', cropIdx: 0 },
    { code: 'PLT-D06', num: 'Khu D - Ô 06', area: 25, price: 1950000, status: 'AVAILABLE', cropIdx: 1 },
    { code: 'PLT-D07', num: 'Khu D - Ô 07', area: 20, price: 1600000, status: 'RESERVED', cropIdx: 2 },
    { code: 'PLT-D08', num: 'Khu D - Ô 08', area: 30, price: 2200000, status: 'AVAILABLE', cropIdx: 3 },

    // Khu E (Công Nghệ Cao): E01 - E08
    { code: 'PLT-E01', num: 'Khu E - Ô 01', area: 20, price: 1700000, status: 'AVAILABLE', cropIdx: 4 },
    { code: 'PLT-E02', num: 'Khu E - Ô 02', area: 20, price: 1700000, status: 'AVAILABLE', cropIdx: 5 },
    { code: 'PLT-E03', num: 'Khu E - Ô 03', area: 25, price: 2000000, status: 'OCCUPIED', cropIdx: 0 },
    { code: 'PLT-E04', num: 'Khu E - Ô 04', area: 25, price: 2000000, status: 'AVAILABLE', cropIdx: 1 },
    { code: 'PLT-E05', num: 'Khu E - Ô 05', area: 30, price: 2400000, status: 'AVAILABLE', cropIdx: 2 },
    { code: 'PLT-E06', num: 'Khu E - Ô 06', area: 20, price: 1700000, status: 'AVAILABLE', cropIdx: 3 },
    { code: 'PLT-E07', num: 'Khu E - Ô 07', area: 15, price: 1350000, status: 'MAINTENANCE', cropIdx: 4 },
    { code: 'PLT-E08', num: 'Khu E - Ô 08', area: 20, price: 1700000, status: 'AVAILABLE', cropIdx: 5 },
  ];

  for (const item of newPlotsData) {
    const existing = await db.plot.findFirst({ where: { plotCode: item.code } });
    const crop = crops[item.cropIdx % crops.length];
    if (!existing) {
      await db.plot.create({
        data: {
          farmId: farm.id,
          defaultCropId: crop.id,
          plotCode: item.code,
          plotNumber: item.num,
          name: item.num,
          area: item.area,
          areaSqm: item.area,
          status: item.status,
          pricePerMonth: item.price,
          soilTypeI18n: { vi: 'Đất đỏ Bazan sinh thái', en: 'Ecological Basalt' },
          streamUrl: `https://stream.plotfarm.vn/hls/${item.code.toLowerCase()}.m3u8`,
        },
      });
      console.log(`Đã thêm mới: ${item.code} (${item.num}) - Cây: ${crop.slug}`);
    } else {
      await db.plot.update({
        where: { id: existing.id },
        data: { defaultCropId: crop.id },
      });
      console.log(`Đã cập nhật ${item.code}`);
    }
  }

  const total = await db.plot.count();
  console.log(`=== Hoàn tất! Tổng số ô đất hiện có trong DB: ${total} ===`);
}

seedPlotsAndCrops()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Lỗi:', e);
    process.exit(1);
  });
