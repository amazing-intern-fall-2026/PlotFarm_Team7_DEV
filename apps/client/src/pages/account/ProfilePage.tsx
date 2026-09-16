import * as React from "react";
import {
  Camera,
  CheckCircle2,
  Save,
  Plus,
  Trash2,
  MapPin,
  Bell,
  MessageSquare,
  Smartphone,
  Shield,
  LogOut,
  AlertTriangle,
} from "lucide-react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Input,
  Switch,
  Breadcrumb,
  Avatar,
  Separator,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { AccountSidebar } from "./AccountSidebar";
import {
  DEFAULT_USER_PROFILE,
  MOCK_SHIPPING_ADDRESSES,
  NOTIFICATION_MATRIX_SETTINGS,
  type UserProfileData,
  type ShippingAddressItem,
  type NotificationChannelSetting,
} from "./profile.constants";

export function ProfilePage() {
  const [profile, setProfile] = React.useState<UserProfileData>(DEFAULT_USER_PROFILE);
  const [addresses, setAddresses] = React.useState<ShippingAddressItem[]>(MOCK_SHIPPING_ADDRESSES);
  const [notifications, setNotifications] = React.useState<NotificationChannelSetting[]>(NOTIFICATION_MATRIX_SETTINGS);

  // Form states for adding address
  const [isAddingAddress, setIsAddingAddress] = React.useState(false);
  const [newAddressTitle, setNewAddressTitle] = React.useState("");
  const [newAddressLine, setNewAddressLine] = React.useState("");
  const [newAddressNote, setNewAddressNote] = React.useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordMsg, setPasswordMsg] = React.useState<string | null>(null);

  // Feedback banner
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, avatarUrl: fakeUrl }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleToggleNotification = (id: string, channel: "zalo" | "sms" | "push") => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [channel]: !item[channel],
            }
          : item,
      ),
    );
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    );
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressLine.trim()) return;
    const newAddr: ShippingAddressItem = {
      id: `addr-${Date.now()}`,
      title: newAddressTitle || "Địa chỉ mới",
      recipientName: profile.fullName,
      phone: profile.phone,
      addressLine: newAddressLine,
      floorNote: newAddressNote || "Giao tận tay trong giờ thuận tiện",
      deliveryWindow: "Sáng (07:00 - 09:30)",
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setNewAddressTitle("");
    setNewAddressLine("");
    setNewAddressNote("");
    setIsAddingAddress(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      setPasswordMsg("Vui lòng điền đầy đủ mật khẩu hiện tại và mật khẩu mới.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("Mật khẩu xác nhận không khớp. Vui lòng nhập lại.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg("Mật khẩu mới phải có tối thiểu 8 ký tự.");
      return;
    }
    setPasswordMsg("✓ Đã cập nhật mật khẩu mới thành công!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  return (
    <Box className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans pb-24 lg:pb-16 w-full max-w-full overflow-hidden">
      <Container size="7xl" className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-6">
        {/* Breadcrumb standard */}
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tài khoản", href: "/account/profile" },
            { label: "Hồ sơ & Cài đặt", isCurrent: true },
          ]}
        />

        {/* Page Header */}
        <Box className="space-y-1">
          <Typography.H2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Hồ sơ & Cài đặt tài khoản
          </Typography.H2>
          <Typography.Muted className="text-xs sm:text-sm text-muted-foreground">
            Quản lý thông tin định danh cư dân đồng canh tác, thiết lập điểm giao nhận rau lạnh và ma trận thông báo nông vụ.
          </Typography.Muted>
        </Box>

        {/* 2-Column Responsive Layout: Sidebar Left (280px) + Main Right */}
        <Box className="flex flex-col lg:flex-row gap-8 items-start">
          <AccountSidebar />

          <Box className="flex-1 w-full min-w-0">
            <Card className="border-border/80 bg-white dark:bg-slate-900 shadow-xs rounded-2xl overflow-hidden">
              <CardContent className="p-4 sm:p-8 space-y-6">
                {saveSuccess && (
                  <Box className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in-50">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <Typography.Text className="text-xs sm:text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                      Đã lưu thành công các thay đổi hồ sơ & cài đặt tài khoản của bạn!
                    </Typography.Text>
                  </Box>
                )}

                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="w-full justify-start overflow-x-auto">
                    <TabsTrigger value="personal">1. Thông tin cá nhân</TabsTrigger>
                    <TabsTrigger value="shipping">2. Địa chỉ nhận rau</TabsTrigger>
                    <TabsTrigger value="notifications">3. Thông báo & Bảo mật</TabsTrigger>
                  </TabsList>

                  {/* ────────────────────────────────────────────────────────
                      TAB 1: THÔNG TIN CÁ NHÂN
                     ──────────────────────────────────────────────────────── */}
                  <TabsContent value="personal" className="space-y-6 pt-2">
                    {/* Avatar Block */}
                    <Box className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col sm:flex-row items-center gap-6">
                      <Box className="relative group">
                        <Avatar
                          src={profile.avatarUrl}
                          name={profile.fullName}
                          size="xl"
                          className="h-20 w-20 ring-4 ring-emerald-500/20 shadow-md"
                        />
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                          aria-label="Tải ảnh đại diện mới"
                        />
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-md p-0 flex items-center justify-center"
                          title="Đổi ảnh đại diện"
                        >
                          <Camera className="w-3.5 h-3.5" />
                        </Button>
                      </Box>

                      <Box className="space-y-1 text-center sm:text-left min-w-0">
                        <Box className="flex items-center gap-2 justify-center sm:justify-start">
                          <Typography.H4 className="text-base font-bold text-foreground truncate">
                            {profile.fullName}
                          </Typography.H4>
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 text-[10px] font-bold">
                            Chủ vườn Green Farm
                          </Badge>
                        </Box>
                        <Typography.Muted className="text-xs text-muted-foreground block">
                          Tham gia canh tác từ ngày {profile.joinDate} • Hỗ trợ tải định dạng JPG, PNG (tối đa 5MB)
                        </Typography.Muted>
                      </Box>
                    </Box>

                    {/* Profile Fields Form */}
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                      <Box className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Họ và tên chủ tài khoản"
                          value={profile.fullName}
                          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                          placeholder="Nhập họ và tên..."
                          required
                        />

                        <Box className="space-y-1.5">
                          <Input
                            label="Email xác thực liên hệ"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            placeholder="name@domain.com"
                            required
                            rightIcon={
                              profile.isEmailVerified ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              ) : null
                            }
                          />
                          <Typography.Muted className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium block">
                            ✓ Đã xác thực bảo mật tài khoản
                          </Typography.Muted>
                        </Box>

                        <Box className="space-y-1.5">
                          <Input
                            label="Số điện thoại nhận tin Zalo / SMS"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            placeholder="09xx xxx xxx"
                            required
                          />
                          <Typography.Muted className="text-[11px] text-muted-foreground block">
                            Dùng để nhận mã OTP ký hợp đồng và shipper giao lạnh gọi trước khi đến
                          </Typography.Muted>
                        </Box>

                        <Input
                          label="Ngày kích hoạt tài khoản"
                          value={profile.joinDate}
                          disabled
                          hint="Hệ thống tự động đồng bộ theo hợp đồng đầu tiên"
                        />
                      </Box>

                      <Box className="pt-2 flex justify-end">
                        <Button
                          type="submit"
                          variant="default"
                          size="default"
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-2 shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          Lưu thông tin cá nhân
                        </Button>
                      </Box>
                    </form>
                  </TabsContent>

                  {/* ────────────────────────────────────────────────────────
                      TAB 2: ĐỊA CHỈ NHẬN RAU
                     ──────────────────────────────────────────────────────── */}
                  <TabsContent value="shipping" className="space-y-6 pt-2">
                    <Box className="flex items-center justify-between flex-wrap gap-3">
                      <Box>
                        <Typography.H4 className="text-sm font-bold text-foreground">
                          Danh sách địa chỉ giao rau định kỳ
                        </Typography.H4>
                        <Typography.Muted className="text-xs text-muted-foreground">
                          Rau thu hoạch sáng sớm tại Đà Lạt sẽ được đóng thùng lạnh và giao thẳng đến các địa chỉ bên dưới.
                        </Typography.Muted>
                      </Box>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsAddingAddress(true)}
                        className="border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 rounded-xl flex items-center gap-1.5 text-xs font-bold"
                      >
                        <Plus className="w-4 h-4" />
                        Thêm địa chỉ nhận rau
                      </Button>
                    </Box>

                    {isAddingAddress && (
                      <Card className="border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 rounded-2xl space-y-4 animate-in fade-in-50">
                        <Typography.H5 className="text-xs font-bold uppercase text-emerald-900 dark:text-emerald-300">
                          Thêm địa chỉ nhận rau mới
                        </Typography.H5>
                        <form onSubmit={handleAddAddress} className="space-y-3">
                          <Input
                            label="Tên gợi nhớ (Ví dụ: Nhà riêng, Cơ quan, Nhà ba mẹ)"
                            value={newAddressTitle}
                            onChange={(e) => setNewAddressTitle(e.target.value)}
                            placeholder="Nhà riêng..."
                            required
                          />
                          <Input
                            label="Địa chỉ chi tiết (Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP)"
                            value={newAddressLine}
                            onChange={(e) => setNewAddressLine(e.target.value)}
                            placeholder="Số 123 đường ABC, Phường X, Quận Y..."
                            required
                          />
                          <Input
                            label="Ghi chú giao hàng (Số tầng, Căn hộ, Gửi lễ tân/bảo vệ)"
                            value={newAddressNote}
                            onChange={(e) => setNewAddressNote(e.target.value)}
                            placeholder="Tầng 12 căn 12A, gọi trước 15 phút..."
                          />
                          <Box className="flex justify-end gap-2 pt-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsAddingAddress(false)}
                              className="text-xs"
                            >
                              Hủy bỏ
                            </Button>
                            <Button
                              type="submit"
                              variant="default"
                              size="sm"
                              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl"
                            >
                              Lưu địa chỉ
                            </Button>
                          </Box>
                        </form>
                      </Card>
                    )}

                    <Box className="space-y-3">
                      {addresses.map((addr) => (
                        <Box
                          key={addr.id}
                          className={cn(
                            "p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4",
                            addr.isDefault
                              ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 shadow-xs"
                              : "bg-card border-border/70 hover:border-border",
                          )}
                        >
                          <Box className="space-y-1.5 min-w-0 flex-1">
                            <Box className="flex items-center gap-2 flex-wrap">
                              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                              <Typography.H4 className="text-sm font-bold text-foreground">
                                {addr.title}
                              </Typography.H4>
                              {addr.isDefault && (
                                <Badge variant="secondary" className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5">
                                  Địa chỉ mặc định
                                </Badge>
                              )}
                            </Box>

                            <Typography.Text className="text-xs text-foreground font-medium block">
                              {addr.addressLine}
                            </Typography.Text>

                            <Box className="flex items-center gap-3 text-[11px] text-muted-foreground flex-wrap pt-0.5">
                              <Typography.Text className="text-[11px]">Người nhận: <Typography.Text className="font-bold">{addr.recipientName}</Typography.Text> ({addr.phone})</Typography.Text>
                              <Typography.Text className="text-[11px]">•</Typography.Text>
                              <Typography.Text className="text-[11px]">Khung giờ giao: <Typography.Text className="font-bold">{addr.deliveryWindow}</Typography.Text></Typography.Text>
                              <Typography.Text className="text-[11px]">•</Typography.Text>
                              <Typography.Text className="text-[11px] italic text-emerald-800 dark:text-emerald-300">{addr.floorNote}</Typography.Text>
                            </Box>
                          </Box>

                          <Box className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {!addr.isDefault && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                className="text-xs h-8 rounded-lg font-semibold"
                              >
                                Đặt làm mặc định
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-destructive hover:bg-rose-50 h-8 px-2 rounded-lg"
                              title="Xóa địa chỉ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </TabsContent>

                  {/* ────────────────────────────────────────────────────────
                      TAB 3: THÔNG BÁO & BẢO MẬT
                     ──────────────────────────────────────────────────────── */}
                  <TabsContent value="notifications" className="space-y-8 pt-2">
                    {/* Notification Matrix */}
                    <Box className="space-y-4">
                      <Box>
                        <Box className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-emerald-600" />
                          <Typography.H4 className="text-sm font-bold text-foreground">
                            Ma trận thông báo nông vụ (Notification Matrix)
                          </Typography.H4>
                        </Box>
                        <Typography.Muted className="text-xs text-muted-foreground mt-0.5">
                          Tùy chỉnh các kênh bạn muốn hệ thống gửi thông điệp khi có sự kiện diễn ra tại nông trại.
                        </Typography.Muted>
                      </Box>

                      <Box className="rounded-2xl border border-border/80 overflow-hidden bg-card divide-y divide-border/60">
                        {notifications.map((item) => (
                          <Box
                            key={item.id}
                            className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <Box className="space-y-1 max-w-xl min-w-0">
                              <Typography.Text className="text-xs sm:text-sm font-bold text-foreground block">
                                {item.title}
                              </Typography.Text>
                              <Typography.Muted className="text-xs text-muted-foreground leading-relaxed block">
                                {item.description}
                              </Typography.Muted>
                            </Box>

                            {/* 3 Switches: Zalo, SMS, Push App */}
                            <Box className="flex items-center gap-4 sm:gap-6 shrink-0 pt-1 sm:pt-0">
                              <Box className="flex items-center gap-2">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <Typography.Text className="text-xs font-semibold text-muted-foreground">Zalo</Typography.Text>
                                <Switch
                                  checked={item.zalo}
                                  onCheckedChange={() => handleToggleNotification(item.id, "zalo")}
                                />
                              </Box>

                              <Box className="flex items-center gap-2">
                                <Smartphone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <Typography.Text className="text-xs font-semibold text-muted-foreground">SMS</Typography.Text>
                                <Switch
                                  checked={item.sms}
                                  onCheckedChange={() => handleToggleNotification(item.id, "sms")}
                                />
                              </Box>

                              <Box className="flex items-center gap-2">
                                <Bell className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <Typography.Text className="text-xs font-semibold text-muted-foreground">App</Typography.Text>
                                <Switch
                                  checked={item.push}
                                  onCheckedChange={() => handleToggleNotification(item.id, "push")}
                                />
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    <Separator />

                    {/* Change Password & Security */}
                    <Box className="space-y-4">
                      <Box>
                        <Box className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-600" />
                          <Typography.H4 className="text-sm font-bold text-foreground">
                            Bảo mật & Đổi mật khẩu
                          </Typography.H4>
                        </Box>
                        <Typography.Muted className="text-xs text-muted-foreground mt-0.5">
                          Cập nhật mật khẩu định kỳ giúp bảo vệ quyền sở hữu số trên các ô đất của bạn.
                        </Typography.Muted>
                      </Box>

                      {passwordMsg && (
                        <Box className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-foreground flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                          <Typography.Text className="text-xs font-semibold">{passwordMsg}</Typography.Text>
                        </Box>
                      )}

                      <form onSubmit={handleChangePassword} className="space-y-3.5 max-w-lg">
                        <Input
                          label="Mật khẩu hiện tại"
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          showPasswordToggle
                          required
                        />
                        <Input
                          label="Mật khẩu mới (tối thiểu 8 ký tự)"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          showPasswordToggle
                          required
                        />
                        <Input
                          label="Xác nhận mật khẩu mới"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          showPasswordToggle
                          required
                        />

                        <Box className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                          <Button
                            type="submit"
                            variant="default"
                            size="default"
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs"
                          >
                            Cập nhật mật khẩu mới
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-destructive/40 text-destructive hover:bg-destructive/10 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
                            onClick={() => alert("Đã đăng xuất khỏi 2 phiên đăng nhập trên thiết bị khác thành công.")}
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            Đăng xuất các thiết bị khác
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
