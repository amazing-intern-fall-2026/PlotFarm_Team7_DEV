import { PrismaClient, PlotStatus, UserRole } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting PlotFarm Database Seeding (Single Farm Edition)...");

  // 1. Ensure Manager / Admin User
  let manager = await prisma.user.findFirst({
    where: { role: UserRole.ADMIN },
  });

  if (!manager) {
    manager = await prisma.user.create({
      data: {
        email: "admin@plotfarm.vn",
        fullName: "Quản Trị Viên PlotFarm",
        passwordHash: "$2a$10$wE9mYpB6Tq7mY8x...mockhash...",
        role: UserRole.ADMIN,
        isVerified: true,
        userCode: "USR-ADMIN-01",
      },
    });
    console.log("✅ Created default Admin User:", manager.email);
  } else {
    console.log("ℹ️ Existing Admin User found:", manager.email);
  }

  // 2. Ensure Staff User
  let staff = await prisma.user.findFirst({
    where: { role: UserRole.STAFF },
  });

  if (!staff) {
    staff = await prisma.user.create({
      data: {
        email: "staff@plotfarm.vn",
        fullName: "Kỹ Thuật Viên Nông Nghiệp",
        passwordHash: "$2a$10$wE9mYpB6Tq7mY8x...mockhash...",
        role: UserRole.STAFF,
        isVerified: true,
        userCode: "USR-STAFF-01",
      },
    });
    console.log("✅ Created default Staff User:", staff.email);
  }

  // 3. Create EXACTLY 1 Primary Farm
  const primaryFarmData = {
    slug: "farm-dalat-organic",
    nameI18n: { vi: "Nông Trại Sinh Thái Đà Lạt Organic", en: "Da Lat Organic Eco Farm" },
    addressI18n: { vi: "Đường Hoa Hồng, Phường 4, TP. Đà Lạt, Lâm Đồng", en: "Hoa Hong Street, Ward 4, Da Lat City" },
    latitude: 11.9404,
    longitude: 108.4583,
    totalAreaSqm: 100000,
    contactPhone: "0901234567",
    managerId: manager.id,
  };

  const primaryFarm = await prisma.farm.upsert({
    where: { slug: primaryFarmData.slug },
    update: primaryFarmData,
    create: primaryFarmData,
  });

  console.log("✅ Primary Farm created/updated:", primaryFarm.slug);

  // Re-assign all existing plots to this single farm
  await prisma.plot.updateMany({
    data: { farmId: primaryFarm.id },
  });

  // Delete all other farms so only 1 farm exists
  const deletedFarms = await prisma.farm.deleteMany({
    where: { id: { not: primaryFarm.id } },
  });
  console.log(`🧹 Cleaned up ${deletedFarms.count} extra farms. Remaining farms: 1`);

  // 4. Create 20 Diverse Crops
  const cropList = [
    {
      slug: "cai-cuc-tan-o",
      nameI18n: { vi: "Cải Cúc (Tần Ô)", en: "Crown Daisy / Garland Chrysanthemum" },
      descriptionI18n: { vi: "Rau cải cúc hữu cơ thanh mát, giàu vitamin A & C, thích hợp nấu canh và ăn lẩu.", en: "Fresh organic crown daisy rich in vitamins A & C." },
      guideI18n: { vi: "Tưới nước 2 lần/ngày sáng sớm và chiều mát. Thu hoạch sau 30-35 ngày.", en: "Water twice daily. Harvest in 30-35 days." },
      durationDays: 32,
      idealTempMin: 18.0,
      idealTempMax: 26.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 80.0,
      expectedYieldKgPerSqm: 2.8,
      basePrice: 45000,
      iconUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "cai-bo-xoi-nhat",
      nameI18n: { vi: "Cải Bó Xôi Nhật (Spinach)", en: "Japanese Spinach" },
      descriptionI18n: { vi: "Rau bina hữu cơ giàu sắt, chất xơ và chất chống oxy hóa cao.", en: "Organic spinach rich in iron, fiber, and antioxidants." },
      guideI18n: { vi: "Duy trì độ ẩm đất 70%. Giữ nhiệt độ mát mẻ.", en: "Maintain 70% soil moisture. Keep cool." },
      durationDays: 40,
      idealTempMin: 15.0,
      idealTempMax: 24.0,
      idealMoistureMin: 70.0,
      idealMoistureMax: 85.0,
      expectedYieldKgPerSqm: 3.2,
      basePrice: 60000,
      iconUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "cai-cau-vong-thuy-si",
      nameI18n: { vi: "Cải Cầu Vồng Thụy Sĩ", en: "Swiss Rainbow Chard" },
      descriptionI18n: { vi: "Dòng cải nhiều màu sắc bắt mắt, vị ngọt mát nhẹ, siêu giàu dinh dưỡng.", en: "Colorful nutrient-rich Swiss rainbow chard." },
      guideI18n: { vi: "Thu hoạch lá ngoài để cây tiếp tục phát triển lá mới.", en: "Harvest outer leaves to encourage continuous growth." },
      durationDays: 45,
      idealTempMin: 16.0,
      idealTempMax: 28.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 78.0,
      expectedYieldKgPerSqm: 3.5,
      basePrice: 75000,
      iconUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "cai-kale-xoan-da-lat",
      nameI18n: { vi: "Cải Xoăn Kale Đà Lạt", en: "Da Lat Curly Kale" },
      descriptionI18n: { vi: "Nữ hoàng rau xanh với hàm lượng dinh dưỡng và khoáng chất vượt trội.", en: "Superfood curly kale grown organically in Da Lat." },
      guideI18n: { vi: "Bón phân hữu cơ vi sinh định kỳ 10 ngày/lần.", en: "Apply bio-organic fertilizer every 10 days." },
      durationDays: 50,
      idealTempMin: 14.0,
      idealTempMax: 23.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 80.0,
      expectedYieldKgPerSqm: 3.0,
      basePrice: 85000,
      iconUrl: "https://images.unsplash.com/photo-1524179091875-bf98a9a6ae57?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1524179091875-bf98a9a6ae57?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "ca-chua-bi-huu-co",
      nameI18n: { vi: "Cà Chua Bi Hữu Cơ Đà Lạt", en: "Da Lat Organic Cherry Tomato" },
      descriptionI18n: { vi: "Trái đỏ mọng, vị chua ngọt đậm đà, mọc thành từng chùm trĩu quả.", en: "Sweet and tangy juicy organic cherry tomatoes." },
      guideI18n: { vi: "Làm giàn leo vững chắc khi cây đạt chiều cao 30cm.", en: "Trellis plants when they reach 30cm in height." },
      durationDays: 75,
      idealTempMin: 18.0,
      idealTempMax: 29.0,
      idealMoistureMin: 55.0,
      idealMoistureMax: 70.0,
      expectedYieldKgPerSqm: 5.5,
      basePrice: 90000,
      iconUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "xa-lach-bup-mo-da-lat",
      nameI18n: { vi: "Xà Lách Búp Mỡ Đà Lạt", en: "Da Lat Butterhead Lettuce" },
      descriptionI18n: { vi: "Lá mỏng mềm, cuộn búp giòn ngọt, thích hợp làm món salad tươi mát.", en: "Crisp and buttery lettuce perfect for fresh salads." },
      guideI18n: { vi: "Tưới phun sương nhẹ tránh làm dập búp xà lách.", en: "Mist gently to protect delicate leaves." },
      durationDays: 35,
      idealTempMin: 15.0,
      idealTempMax: 25.0,
      idealMoistureMin: 70.0,
      idealMoistureMax: 85.0,
      expectedYieldKgPerSqm: 2.5,
      basePrice: 50000,
      iconUrl: "https://images.unsplash.com/photo-1556801712-76c8eb07ebb9?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1556801712-76c8eb07ebb9?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "ca-rot-ti-hon-da-lat",
      nameI18n: { vi: "Cà Rốt Tí Hon Đà Lạt", en: "Da Lat Baby Carrot" },
      descriptionI18n: { vi: "Củ cà rốt nhỏ xinh ngọt đậm, mọng nước, giàu Beta-Carotene.", en: "Sweet mini organic carrots packed with Beta-Carotene." },
      guideI18n: { vi: "Xới đất tơi xốp độ sâu 20cm để củ phát triển tròn đẹp.", en: "Loosen soil to 20cm depth for optimal root formation." },
      durationDays: 60,
      idealTempMin: 16.0,
      idealTempMax: 26.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 4.0,
      basePrice: 70000,
      iconUrl: "https://images.unsplash.com/photo-1598170845058-12ef4a457c4f?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1598170845058-12ef4a457c4f?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "ot-chuong-da-lat-3-mau",
      nameI18n: { vi: "Ớt Chuông Đà Lạt 3 Màu", en: "Da Lat Tricolor Bell Pepper" },
      descriptionI18n: { vi: "Ớt chuông đỏ, vàng, xanh dày thịt, mọng nước, nhiều vitamin C.", en: "Crisp red, yellow, and green bell peppers rich in vitamin C." },
      guideI18n: { vi: "Cần nhiều ánh sáng tự nhiên và bón phân hữu cơ đậm đà.", en: "Requires high sunlight exposure and rich organic compost." },
      durationDays: 80,
      idealTempMin: 20.0,
      idealTempMax: 30.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 4.8,
      basePrice: 95000,
      iconUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "sup-lo-xanh-broccoli",
      nameI18n: { vi: "Súp Lơ Xanh (Broccoli)", en: "Organic Broccoli" },
      descriptionI18n: { vi: "Bông lơ xanh săn chắc, giàu sulforaphane phòng chống oxy hóa.", en: "Firm broccoli heads loaded with healthy nutrients." },
      guideI18n: { vi: "Thu hoạch khi búp lơ còn chặt nén, chưa nở hoa vàng.", en: "Harvest while head is dense before yellow flowers bloom." },
      durationDays: 65,
      idealTempMin: 15.0,
      idealTempMax: 24.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 80.0,
      expectedYieldKgPerSqm: 3.8,
      basePrice: 80000,
      iconUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "dua-luoi-huu-co",
      nameI18n: { vi: "Dưa Lưới Hoàng Kim Hữu Cơ", en: "Organic Golden Cantaloupe" },
      descriptionI18n: { vi: "Dưa lưới ruột cam ngọc ngọt lịm, hương thơm nồng nàn hấp dẫn.", en: "Sweet and aromatic golden cantaloupe melon." },
      guideI18n: { vi: "Treo quả bằng lưới đỡ khi dưa đạt trọng lượng 1kg.", en: "Support fruit with netting when reaching 1kg." },
      durationDays: 85,
      idealTempMin: 22.0,
      idealTempMax: 33.0,
      idealMoistureMin: 50.0,
      idealMoistureMax: 68.0,
      expectedYieldKgPerSqm: 6.0,
      basePrice: 120000,
      iconUrl: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1571575173700-afb9492e6a50?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "dua-leo-baby",
      nameI18n: { vi: "Dưa Leo Baby Hữu Cơ", en: "Organic Baby Cucumber" },
      descriptionI18n: { vi: "Trái nhỏ xinh giòn tan, không đắng, vỏ mỏng ăn liền.", en: "Crispy and juicy mini cucumbers with thin skin." },
      guideI18n: { vi: "Thu hoạch hàng ngày khi trái đạt 8-10cm.", en: "Harvest daily when cucumbers reach 8-10cm." },
      durationDays: 42,
      idealTempMin: 20.0,
      idealTempMax: 32.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 85.0,
      expectedYieldKgPerSqm: 5.0,
      basePrice: 55000,
      iconUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "bi-ngoi-xanh",
      nameI18n: { vi: "Bí Ngòi Xanh Đà Lạt", en: "Da Lat Green Zucchini" },
      descriptionI18n: { vi: "Bí ngòi tươi mọng, thích hợp xào nướng hoặc làm món ăn kiêng.", en: "Fresh green zucchini ideal for grilling and stir-fries." },
      guideI18n: { vi: "Thu hoạch khi trái dài khoảng 18-20cm.", en: "Harvest when fruit length reaches 18-20cm." },
      durationDays: 48,
      idealTempMin: 18.0,
      idealTempMax: 28.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 78.0,
      expectedYieldKgPerSqm: 4.5,
      basePrice: 65000,
      iconUrl: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "rau-muong-thuy-canh",
      nameI18n: { vi: "Rau Muống Thủy Canh", en: "Hydroponic Water Spinach" },
      descriptionI18n: { vi: "Rau muống cọng mập giòn ngọt, nhân giống và trồng công nghệ cao.", en: "Hydroponic water spinach with extra crispy stems." },
      guideI18n: { vi: "Cắt sát gốc 5cm để rau tiếp tục đẻ nhánh cho lứa sau.", en: "Cut 5cm above root to encourage regrowth." },
      durationDays: 25,
      idealTempMin: 22.0,
      idealTempMax: 35.0,
      idealMoistureMin: 75.0,
      idealMoistureMax: 90.0,
      expectedYieldKgPerSqm: 3.6,
      basePrice: 35000,
      iconUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "dau-tay-da-lat",
      nameI18n: { vi: "Dâu Tây Giống Nhật Đà Lạt", en: "Da Lat Japanese Strawberry" },
      descriptionI18n: { vi: "Dâu tây quả to mọng, hương thơm nức, vị ngọt thanh tao.", en: "Premium Japanese variety organic strawberries." },
      guideI18n: { vi: "Trồng trên giá thể xơ dừa sạch, tưới nhỏ giọt dinh dưỡng.", en: "Grow in coco-peat substrate with drip irrigation." },
      durationDays: 90,
      idealTempMin: 14.0,
      idealTempMax: 22.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 3.2,
      basePrice: 180000,
      iconUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "mang-tay-xanh-da-lat",
      nameI18n: { vi: "Măng Tây Xanh Thượng Hạng", en: "Premium Green Asparagus" },
      descriptionI18n: { vi: "Măng tây giòn ngọt, giàu chất xơ và amino acid quý giá.", en: "Nutrient-rich tender green asparagus spears." },
      guideI18n: { vi: "Thu hoạch vào buổi sáng sớm khi măng cao 22-25cm.", en: "Harvest early morning when spears are 22-25cm tall." },
      durationDays: 120,
      idealTempMin: 18.0,
      idealTempMax: 28.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 2.2,
      basePrice: 160000,
      iconUrl: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "bap-cai-tim",
      nameI18n: { vi: "Bắp Cải Tím Đà Lạt", en: "Da Lat Purple Cabbage" },
      descriptionI18n: { vi: "Bắp cải tím cuộn chặt, màu sắc rực rỡ, giàu Anthocyanin.", en: "Dense purple cabbage rich in antioxidant Anthocyanin." },
      guideI18n: { vi: "Cần thời gian cuộn búp dài trong khí hậu mát.", en: "Requires cool climate for tight head formation." },
      durationDays: 70,
      idealTempMin: 15.0,
      idealTempMax: 23.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 80.0,
      expectedYieldKgPerSqm: 4.2,
      basePrice: 68000,
      iconUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "cu-cai-do",
      nameI18n: { vi: "Củ Cải Đỏ Baby", en: "Red Radish Baby" },
      descriptionI18n: { vi: "Củ cải đỏ xinh xắn, vị hăng nhẹ giòn rụm cho món trang trí.", en: "Crispy red radishes perfect for garnishing & salads." },
      guideI18n: { vi: "Thu hoạch nhanh sau 28-30 ngày tránh bị hăng xơ.", en: "Harvest early within 30 days to avoid woodiness." },
      durationDays: 28,
      idealTempMin: 16.0,
      idealTempMax: 25.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 2.9,
      basePrice: 48000,
      iconUrl: "https://images.unsplash.com/photo-1566842600175-e7dca489844f?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1566842600175-e7dca489844f?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "can-tay-my",
      nameI18n: { vi: "Cần Tây Mỹ Ép Nước", en: "Juicing Celery" },
      descriptionI18n: { vi: "Cọng cần tây to béo, mọng nước, chuyên dùng ép nước detox thanh lọc cơ thể.", en: "Crispy thick celery stalks perfect for detox juices." },
      guideI18n: { vi: "Giữ độ ẩm đất liên tục 75-80%.", en: "Keep soil consistently moist at 75-80%." },
      durationDays: 65,
      idealTempMin: 16.0,
      idealTempMax: 26.0,
      idealMoistureMin: 70.0,
      idealMoistureMax: 85.0,
      expectedYieldKgPerSqm: 4.0,
      basePrice: 72000,
      iconUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "rau-mong-toi-huu-co",
      nameI18n: { vi: "Rau Mồng Tơi Hữu Cơ", en: "Organic Malabar Spinach" },
      descriptionI18n: { vi: "Rau mồng tơi lá dày xanh mướt, giải nhiệt mùa hè tuyệt vời.", en: "Cooling Malabar spinach perfect for summer soups." },
      guideI18n: { vi: "Trồng nơi nhiều nắng, ngắt ngọn để cây đẻ nhánh.", en: "Plant in full sun, pinch tips for branching." },
      durationDays: 35,
      idealTempMin: 22.0,
      idealTempMax: 34.0,
      idealMoistureMin: 65.0,
      idealMoistureMax: 85.0,
      expectedYieldKgPerSqm: 3.2,
      basePrice: 40000,
      iconUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      slug: "dau-ha-lan",
      nameI18n: { vi: "Đậu Hà Lan Hữu Cơ", en: "Organic Snow Pea" },
      descriptionI18n: { vi: "Quả đậu giòn ngọt ăn cả vỏ, giàu protein thực vật.", en: "Sweet and crunchy tender snow pea pods." },
      guideI18n: { vi: "Dựng giàn lưới cho cây leo xum xuê.", en: "Set up trellis netting for climbing vines." },
      durationDays: 55,
      idealTempMin: 15.0,
      idealTempMax: 24.0,
      idealMoistureMin: 60.0,
      idealMoistureMax: 75.0,
      expectedYieldKgPerSqm: 2.6,
      basePrice: 88000,
      iconUrl: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=120&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const crops = [];
  for (const cropData of cropList) {
    const crop = await prisma.crop.upsert({
      where: { slug: cropData.slug },
      update: cropData,
      create: cropData,
    });
    crops.push(crop);
  }
  console.log(`✅ Upserted ${crops.length} Crops.`);

  // 5. Create 200 Plots (ALL ASSIGNED TO THE SINGLE FARM)
  console.log("🌱 Creating 200 Plots for Primary Farm...");

  const soilTypes = [
    { vi: "Đất đỏ Bazan giàu mùn organic", en: "Humus-rich Red Basalt Soil" },
    { vi: "Đất phù sa sông Hồng màu mỡ", en: "Fertile Red River Alluvial Soil" },
    { vi: "Đất thịt nhẹ tơi xốp vi sinh", en: "Loamy Micro-organic Soil" },
    { vi: "Đất hữu cơ xơ dừa cao cấp", en: "Premium Coco-coir Organic Mix" },
  ];

  const statuses: PlotStatus[] = [
    PlotStatus.AVAILABLE,
    PlotStatus.AVAILABLE,
    PlotStatus.AVAILABLE,
    PlotStatus.AVAILABLE,
    PlotStatus.RESERVED,
    PlotStatus.OCCUPIED,
    PlotStatus.MAINTENANCE,
  ];

  const mockStreamUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  // 5. Create 200 Plots across 8 Zones (A, B, C, D, E, F, N, P)
  console.log("🌱 Creating 200 Plots across 8 Zones (A, B, C, D, E, F, N, P)...");

  const zones = ["A", "B", "C", "D", "E", "F", "N", "P"];
  const plotsPerZone = 25; // 8 zones x 25 plots = 200 plots total
  const validPlotCodes = new Set<string>();
  let createdPlotsCount = 0;

  for (let z = 0; z < zones.length; z++) {
    const zoneName = zones[z];
    for (let p = 1; p <= plotsPerZone; p++) {
      const globalIndex = z * plotsPerZone + (p - 1);
      const plotNumStr = String(p).padStart(3, "0");
      const plotCode = `PLT-${zoneName}-${plotNumStr}`;
      const plotNumber = `${zoneName}-${plotNumStr}`;
      const name = `Khu ${zoneName} - Lô ${p}`;
      validPlotCodes.add(plotCode);

      // Select default crop sequentially
      const crop = crops[globalIndex % crops.length];
      // Soil type
      const soilType = soilTypes[globalIndex % soilTypes.length];
      // Status
      const status = statuses[globalIndex % statuses.length];

      // Standard plot areas strictly set to [20, 25, 30, 35, 40] sqm
      const allowedAreas = [20, 25, 30, 35, 40];
      const areaVal = allowedAreas[globalIndex % allowedAreas.length];
      // Price per month proportional to plot area (25,000 VND / sqm)
      const priceVal = areaVal * 25000;

      await prisma.plot.upsert({
        where: { plotCode },
        update: {
          farmId: primaryFarm.id,
          defaultCropId: crop.id,
          assignedStaffId: staff.id,
          plotNumber,
          name,
          area: areaVal,
          areaSqm: areaVal,
          soilTypeI18n: soilType,
          pricePerMonth: priceVal,
          status,
          streamUrl: mockStreamUrl,
        },
        create: {
          plotCode,
          plotNumber,
          name,
          farmId: primaryFarm.id,
          defaultCropId: crop.id,
          assignedStaffId: staff.id,
          area: areaVal,
          areaSqm: areaVal,
          soilTypeI18n: soilType,
          pricePerMonth: priceVal,
          status,
          streamUrl: mockStreamUrl,
        },
      });

      createdPlotsCount++;
    }
  }

  // Clean up any old plots (e.g. PLOT-001..200) not in the new zoned set
  const extraPlots = await prisma.plot.deleteMany({
    where: {
      plotCode: { notIn: Array.from(validPlotCodes) },
      contracts: { none: {} },
    },
  });
  if (extraPlots.count > 0) {
    console.log(`🧹 Cleaned up ${extraPlots.count} old non-zoned plots.`);
  }


  console.log(`🎉 Successfully seeded ${createdPlotsCount} Plots into Farm: ${primaryFarmData.nameI18n.vi}!`);
  console.log("✨ All database seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
