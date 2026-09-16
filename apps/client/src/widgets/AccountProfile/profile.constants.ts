export interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  joinDate: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  defaultAddress: {
    street: string;
    ward: string;
    district: string;
    city: string;
    floorNote: string;
    preferredTime: string;
  };
}

export interface ShippingAddressItem {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  floorNote: string;
  deliveryWindow: string;
  isDefault: boolean;
}

export interface NotificationChannelSetting {
  id: string;
  title: string;
  description: string;
  zalo: boolean;
  sms: boolean;
  push: boolean;
}

export const DEFAULT_USER_PROFILE: UserProfileData = {
  fullName: "Nguyễn Văn An",
  email: "an.nguyen@biocloud.vn",
  phone: "0912 345 678",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  joinDate: "15/10/2025",
  isEmailVerified: true,
  isPhoneVerified: true,
  defaultAddress: {
    street: "Tòa Landmark 4, 208 Nguyễn Hữu Cảnh",
    ward: "Phường 22",
    district: "Quận Bình Thạnh",
    city: "TP. Hồ Chí Minh",
    floorNote: "Tầng 18, Căn hộ L4-18.06 (Gửi lễ tân nếu vắng mặt)",
    preferredTime: "7:00 - 9:00 Sáng thứ 4 & thứ 7",
  },
};

export const MOCK_SHIPPING_ADDRESSES: ShippingAddressItem[] = [
  {
    id: "addr-1",
    title: "Nhà riêng (Căn hộ chung cư)",
    recipientName: "Nguyễn Văn An",
    phone: "0912 345 678",
    addressLine: "Tòa Landmark 4, 208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, TP. HCM",
    floorNote: "Căn L4-18.06, bấm chuông hoặc gửi bảo vệ sảnh A",
    deliveryWindow: "Sáng sớm (06:30 - 08:30)",
    isDefault: true,
  },
  {
    id: "addr-2",
    title: "Văn phòng công ty",
    recipientName: "Nguyễn Văn An (Bộ phận R&D)",
    phone: "0912 345 678",
    addressLine: "Tầng 9, Tòa nhà Bitexco, Số 2 Hải Triều, P. Bến Nghé, Quận 1, TP. HCM",
    floorNote: "Giao quầy lễ tân tầng trệt trong giờ hành chính",
    deliveryWindow: "Giờ hành chính (09:00 - 16:30)",
    isDefault: false,
  },
];

export const NOTIFICATION_MATRIX_SETTINGS: NotificationChannelSetting[] = [
  {
    id: "sensor-alert",
    title: "Cảm biến đất & vi khí hậu báo động",
    description: "Cảnh báo khẩn cấp khi độ ẩm đất < 40%, nhiệt độ vòm lá vượt 32°C hoặc lưu lượng tưới nhỏ giọt bất thường.",
    zalo: true,
    sms: true,
    push: true,
  },
  {
    id: "fertilizer-done",
    title: "Kỹ sư nông học hoàn thành bón phân hữu cơ",
    description: "Thông báo nghiệm thu kèm hình ảnh thực tế khi kỹ thuật viên hoàn tất bón phân trùn quế / phun vi sinh đối kháng.",
    zalo: true,
    sms: false,
    push: true,
  },
  {
    id: "harvest-ready",
    title: "Rau đến ngày thu hoạch tiêu chuẩn",
    description: "Nhắc nhở xác nhận ngày cắt rau, đóng gói và chọn giờ giao lạnh tận nơi cho gia đình.",
    zalo: true,
    sms: true,
    push: true,
  },
  {
    id: "cold-chain-dispatch",
    title: "Đóng gói & Giao lạnh xuất bến Đà Lạt",
    description: "Cập nhật định vị xe lạnh chuyên dụng từ nông trại Đạ Sar về TP.HCM kèm mã vận đơn đối soát.",
    zalo: true,
    sms: false,
    push: true,
  },
];

export const ACCOUNT_NAV_ITEMS = [
  {
    id: "profile",
    title: "Hồ sơ & Cài đặt tài khoản",
    description: "Thông tin cá nhân, mật khẩu và nhận tin",
    href: "/account/profile",
    badge: undefined,
  },
  {
    id: "contracts",
    title: "Hợp đồng thuê đất số",
    description: "Quản lý pháp lý, chữ ký số và mùa vụ",
    href: "/account/contracts",
    badge: "1 Chờ ký",
  },
  {
    id: "my-farm",
    title: "Vườn rau của tôi",
    description: "Giám sát camera 24/7 và cảm biến",
    href: "/my-farm",
    badge: undefined,
  },
  {
    id: "organic-standards",
    title: "Cam kết chuẩn hữu cơ",
    description: "Quy chuẩn kỹ thuật & an toàn sinh học",
    href: "/about#organic-standards",
    badge: undefined,
  },
  {
    id: "crop-insurance",
    title: "Bảo hiểm rủi ro mùa vụ",
    description: "Chính sách bồi hoàn 100% khi có sự cố",
    href: "/about#crop-insurance",
    badge: undefined,
  },
];

