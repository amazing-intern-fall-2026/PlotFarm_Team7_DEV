import * as React from "react";
import {
  Users,
  ShieldCheck,
  Sprout,
  Tractor,
  Search,
  Plus,
  RefreshCw,
  Download,
  Key,
  Lock,
  Unlock,
  ChevronLeft,
  ChevronRight,
  Shield,
  Clock,
  RotateCcw,
  Ban,
  CheckCircle2,
  X,
} from "lucide-react";
import {
  Card,
  Button,
  Avatar,
} from "@/shared/ui";

interface RbacUser {
  id: string;
  name: string;
  subtitle?: string;
  avatar?: string;
  email: string;
  phone: string;
  role: "Customer" | "Farmer" | "Super Admin";
  joinedDate: string;
  linkedActivity: string;
  activityType: "plot" | "team" | "admin" | "expired";
  status: "active" | "locked";
}

const INITIAL_USERS: RbacUser[] = [];

const STORAGE_KEY_ADMIN_RBAC = "admin_managed_rbac_data_v2";

export function AdminRbacPage() {
  const [users, setUsers] = React.useState<RbacUser[]>(() => {
    try {
      localStorage.removeItem("admin_managed_rbac_data");
      localStorage.removeItem("admin_rbac_data");
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_RBAC);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const hasOldMocks = parsed.some((u: RbacUser) =>
            ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5", "usr-6", "usr-7", "usr-8"].includes(u?.id)
          );
          if (hasOldMocks) {
            localStorage.setItem(STORAGE_KEY_ADMIN_RBAC, JSON.stringify([]));
            return [];
          }
          return parsed;
        }
      }
    } catch {
      /* Ignore exception intentionally */
    }
    localStorage.setItem(STORAGE_KEY_ADMIN_RBAC, JSON.stringify([]));
    return [];
  });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showAuditModal, setShowAuditModal] = React.useState(false);
  const [showPolicyModal, setShowPolicyModal] = React.useState(false);
  const [editingUserRole, setEditingUserRole] = React.useState<RbacUser | null>(null);

  const [newUserName, setNewUserName] = React.useState("");
  const [newUserEmail, setNewUserEmail] = React.useState("");
  const [newUserPhone, setNewUserPhone] = React.useState("");
  const [newUserRole, setNewUserRole] = React.useState<"Customer" | "Farmer" | "Super Admin">("Farmer");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalUsers = users.length;
  const countCustomer = users.filter((u) => u.role === "Customer").length;
  const countFarmer = users.filter((u) => u.role === "Farmer").length;
  const countAdmin = users.filter((u) => u.role === "Super Admin").length;

  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.phone.includes(searchQuery);

      if (!matchSearch) return false;
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter !== "all" && u.status !== statusFilter) return false;

      return true;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleToggleLock = (user: RbacUser) => {
    const newStatus: "active" | "locked" = user.status === "active" ? "locked" : "active";
    const updated = users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u));
    setUsers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_RBAC, JSON.stringify(updated));
    } catch {
      /* Ignore exception intentionally */
    }
    showToast(
      newStatus === "locked"
        ? `🔒 Đã tạm khóa tài khoản của ${user.name}`
        : `🔓 Đã mở khóa kích hoạt tài khoản của ${user.name}`
    );
  };

  const handleResetPin = (user: RbacUser) => {
    showToast(`🔑 Đã gửi mã xác thực khôi phục PIN/mật khẩu đến ${user.email}`);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: RbacUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim() || "0900.xxx.000",
      role: newUserRole,
      joinedDate: new Date().toLocaleDateString("vi-VN"),
      linkedActivity: newUserRole === "Farmer" ? "Chưa phân luống canh tác" : "Khách hàng mới tạo",
      activityType: newUserRole === "Farmer" ? "team" : "plot",
      status: "active",
    };

    const updated = [newUser, ...users];
    setUsers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_RBAC, JSON.stringify(updated));
    } catch {
      /* Ignore exception intentionally */
    }
    setShowCreateModal(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPhone("");
    showToast(`✓ Đã tạo thành công tài khoản cho ${newUser.name} (${newUser.role})`);
  };

  const handleChangeRole = (userId: string, newRole: "Customer" | "Farmer" | "Super Admin") => {
    const updated = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    setUsers(updated);
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_RBAC, JSON.stringify(updated));
    } catch {
      /* Ignore exception intentionally */
    }
    setEditingUserRole(null);
    showToast(`🛡 Đã cập nhật quyền truy cập thành ${newRole}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-medium text-white shadow-2xl transition-all">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Hệ thống</span>
            <span>&gt;</span>
            <span className="text-emerald-700">Người dùng &amp; RBAC</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Quản lý Người dùng &amp; Phân quyền Hệ thống (RBAC)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý danh sách tài khoản, kiểm soát vai trò truy cập (Role Guard) và phân quyền chức năng
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#0F5132] px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-[#0c4128]"
        >
          <Plus className="h-4 w-4" />
          <span>Tạo tài khoản nhân sự mới</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">TỔNG CỘNG</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalUsers}</span>
            <span className="text-sm font-medium text-slate-500">Tài khoản</span>
          </div>
        </Card>

        <Card className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">KHÁCH HÀNG</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Sprout className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{countCustomer}</span>
            <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
              Customer
            </span>
          </div>
        </Card>

        <Card className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">NÔNG DÂN</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Tractor className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{countFarmer}</span>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              Farmer
            </span>
          </div>
        </Card>

        <Card className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">QUẢN TRỊ VIÊN</span>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{countAdmin.toString().padStart(2, "0")}</span>
            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-white">
              Admin
            </span>
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-3">
            <div className="relative min-w-[260px] flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên, email, số điện thoại..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-500 focus:bg-white"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Customer">Khách hàng (Customer)</option>
              <option value="Farmer">Nông dân (Farmer)</option>
              <option value="Super Admin">Quản trị viên (Super Admin)</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="locked">Tạm khóa</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setUsers(INITIAL_USERS);
                showToast("✓ Đã làm mới danh bạ người dùng");
              }}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              title="Làm mới"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={() => showToast("📥 Đã xuất 156 bản ghi người dùng sang file Excel/CSV.")}
              className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
              title="Xuất file"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="py-3.5 pl-6 pr-4">Người dùng</th>
                <th className="px-4 py-3.5">Email &amp; SĐT</th>
                <th className="px-4 py-3.5">Vai trò hệ thống</th>
                <th className="px-4 py-3.5">Ngày tham gia</th>
                <th className="px-4 py-3.5">Hoạt động liên kết</th>
                <th className="px-4 py-3.5">Trạng thái</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Chưa có tài khoản người dùng nào</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Nhấn "+ Tạo tài khoản nhân sự mới" ở góc trên để cấp tài khoản vào hệ thống.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="transition hover:bg-slate-50/80">
                    <td className="py-3.5 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        {user.avatar ? (
                          <Avatar src={user.avatar} name={user.name} size="sm" />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-[11px] font-bold text-white">
                            {user.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div>
                        <div className="text-slate-700">{user.email}</div>
                        <div className="text-[11px] text-slate-400">{user.phone}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {user.role === "Customer" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                          Customer
                        </span>
                      )}
                      {user.role === "Farmer" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Farmer
                        </span>
                      )}
                      {user.role === "Super Admin" && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-white">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Super Admin
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 font-mono text-[11px]">
                      {user.joinedDate}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 text-slate-700">
                        {user.activityType === "plot" && (
                          <>
                            <Sprout className="h-3.5 w-3.5 text-emerald-600" />
                            <span>{user.linkedActivity}</span>
                          </>
                        )}
                        {user.activityType === "team" && (
                          <>
                            <Tractor className="h-3.5 w-3.5 text-amber-600" />
                            <span>{user.linkedActivity}</span>
                          </>
                        )}
                        {user.activityType === "admin" && (
                          <>
                            <ShieldCheck className="h-3.5 w-3.5 text-slate-700" />
                            <span>{user.linkedActivity}</span>
                          </>
                        )}
                        {user.activityType === "expired" && (
                          <>
                            <Clock className="h-3.5 w-3.5 text-rose-500" />
                            <span className="text-rose-600">{user.linkedActivity}</span>
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      {user.status === "active" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Hoạt động
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                          Tạm khóa
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingUserRole(user)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700"
                          title="Phân quyền vai trò"
                        >
                          <Shield className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleResetPin(user)}
                          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-amber-600"
                          title="Khôi phục mã PIN/Mật khẩu"
                        >
                          <Key className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => handleToggleLock(user)}
                          className={`rounded-lg p-1.5 transition ${
                            user.status === "active"
                              ? "text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                              : "text-rose-600 hover:bg-emerald-50 hover:text-emerald-600"
                          }`}
                          title={user.status === "active" ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                        >
                          {user.status === "active" ? (
                            <Unlock className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4 text-rose-600" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 p-4 sm:flex-row text-xs text-slate-500">
          <span>
            Hiển thị <strong>{filteredUsers.length === 0 ? 0 : 1} - {filteredUsers.length}</strong> trên {totalUsers} tài khoản
          </span>

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-bold text-slate-800">1 / 1</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Card className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-8">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Kiểm soát Truy cập &amp; Role Guard (RBAC Policy)
                </h3>
              </div>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                Bảo vệ tầng Gateway
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Bảng tổng hợp đặc quyền truy cập và phân quyền thao tác cho từng nhóm vai trò định danh trong hệ thống nông trại:
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 pl-4 pr-3">Phân hệ chức năng</th>
                    <th className="px-3 py-3 text-emerald-800">Customer</th>
                    <th className="px-3 py-3 text-amber-800">Farmer</th>
                    <th className="px-3 py-3 text-slate-800">Super Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3 pl-4 pr-3 font-medium text-slate-700">Xem Camera &amp; Cảm biến IoT Ô đất</td>
                    <td className="px-3 py-3 font-semibold text-emerald-700">Chỉ ô thuê</td>
                    <td className="px-3 py-3 font-semibold text-amber-800">Khu vực giao</td>
                    <td className="px-3 py-3 font-bold text-slate-900">Toàn quyền</td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-4 pr-3 font-medium text-slate-700">Yêu cầu Chăm sóc &amp; Cắt tỉa</td>
                    <td className="px-3 py-3 font-semibold text-emerald-700">Tạo yêu cầu</td>
                    <td className="px-3 py-3 font-semibold text-amber-800">Cập nhật tiến độ</td>
                    <td className="px-3 py-3 font-bold text-slate-900">Điều phối / Duyệt</td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-4 pr-3 font-medium text-slate-700">Khai báo Thu hoạch &amp; Giao hàng</td>
                    <td className="px-3 py-3 text-slate-500">Xem lịch</td>
                    <td className="px-3 py-3 font-semibold text-amber-800">Cân &amp; Báo cáo</td>
                    <td className="px-3 py-3 font-bold text-slate-900">Tạo vận đơn</td>
                  </tr>
                  <tr>
                    <td className="py-3 pl-4 pr-3 font-medium text-slate-700">Quản trị Hệ thống &amp; Quản lý User</td>
                    <td className="px-3 py-3 text-slate-300">—</td>
                    <td className="px-3 py-3 text-slate-300">—</td>
                    <td className="px-3 py-3 font-bold text-slate-900">Toàn quyền</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Chính sách phân quyền RBAC được đồng bộ tự động mỗi 15 phút.
            </span>

            <button
              onClick={() => setShowPolicyModal(true)}
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              Tùy chỉnh vai trò chi tiết &rarr;
            </button>
          </div>
        </Card>

        <Card className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-4">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Nhật ký Bảo mật</h3>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Ghi nhận phiên bảo mật và thay đổi quyền gần nhất
            </p>

            <div className="mt-5 space-y-3">
              {users.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  Chưa có sự kiện kiểm toán bảo mật nào phát sinh
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-xs">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Đặt lại mã PIN xác thực 2FA</div>
                      <div className="text-[11px] text-slate-500">Bác Bảy • 10 phút trước</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-rose-50/60 p-3 text-xs">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-600 flex-shrink-0">
                      <Ban className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Tài khoản tạm khóa do hết hạn HĐ</div>
                      <div className="text-[11px] text-slate-500">Đặng Tuấn Kiệt • 2 giờ trước</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 text-xs">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-200 text-slate-700 flex-shrink-0">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">Đăng nhập từ IP quản trị mới</div>
                      <div className="text-[11px] text-slate-500">Super Admin (118.69.xxx.22) • Hôm qua</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAuditModal(true)}
              className="w-full rounded-xl border-slate-200 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              👁 Xem toàn bộ Audit Log
            </Button>
          </div>
        </Card>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Tạo tài khoản nhân sự mới</h3>
            <p className="mt-1 text-xs text-slate-500">
              Nhập thông tin nhân sự để cấp tài khoản truy cập hệ thống BioCloud
            </p>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">Họ và tên</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ví dụ: Lê Minh Trí"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Email đăng nhập</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="tri.le@cloudfarm.vn"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Số điện thoại liên hệ</label>
                <input
                  type="tel"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="0912.345.678"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">Vai trò hệ thống (Role)</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as "Customer" | "Farmer" | "Super Admin")}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-emerald-500"
                >
                  <option value="Farmer">Nông dân (Farmer - Vận hành vườn)</option>
                  <option value="Super Admin">Quản trị viên (Super Admin - Toàn quyền)</option>
                  <option value="Customer">Khách hàng (Customer - Thuê ô đất)</option>
                </select>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#0F5132] py-2 text-xs font-semibold text-white hover:bg-[#0c4128]"
                >
                  Xác nhận Tạo tài khoản
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl border-slate-200 px-4 py-2 text-xs text-slate-600"
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingUserRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Phân quyền vai trò</h3>
            <p className="mt-1 text-xs text-slate-500">
              Chọn vai trò mới cho tài khoản: <strong>{editingUserRole.name}</strong>
            </p>

            <div className="mt-4 space-y-2">
              {(["Customer", "Farmer", "Super Admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => handleChangeRole(editingUserRole.id, r)}
                  className={`w-full flex items-center justify-between rounded-xl border p-3 text-xs font-semibold transition ${
                    editingUserRole.role === r
                      ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{r}</span>
                  {editingUserRole.role === r && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </button>
              ))}
            </div>

            <div className="mt-5 text-right">
              <Button
                variant="outline"
                onClick={() => setEditingUserRole(null)}
                className="rounded-xl border-slate-200 text-xs"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {showAuditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Nhật ký Kiểm toán Bảo mật (Audit Log)</h3>
              </div>
              <button
                onClick={() => setShowAuditModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-2 text-xs">
              {users.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  Chưa có lịch sử kiểm toán bảo mật nào
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>[LOGIN_SUCCESS] Xác thực 2FA thành công qua Google Authenticator</span>
                      <span className="text-slate-400 font-mono">14:12 14/09/2026</span>
                    </div>
                    <div className="mt-1 text-slate-500">Tài khoản: Bác Bảy (NV-007) • IP: 14.162.19.45 (Viettel 4G)</div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>[ROLE_CHANGE] Nâng quyền tài khoản lên Quản trị viên</span>
                      <span className="text-slate-400 font-mono">09:30 13/09/2026</span>
                    </div>
                    <div className="mt-1 text-slate-500">Người thực hiện: Super Admin • Đối tượng: NV-019 (Cô Sáu)</div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>[API_GATEWAY] Làm mới Access Token định kỳ 15 phút</span>
                      <span className="text-slate-400 font-mono">08:00 13/09/2026</span>
                    </div>
                    <div className="mt-1 text-slate-500">Hệ thống IoT Gateways: 48 thiết bị kết nối hợp lệ</div>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>[ACCOUNT_LOCKED] Khóa tài khoản khách hàng do hết hạn</span>
                      <span className="text-slate-400 font-mono">18:00 12/09/2026</span>
                    </div>
                    <div className="mt-1 text-slate-500">Tài khoản: kiet.dang@email.com • Lý do: Hợp đồng #CTR-2025-091 kết thúc</div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              <span className="text-xs text-slate-400">Lưu trữ trên BioCloud Ledger SHA-256</span>
              <Button
                variant="outline"
                onClick={() => setShowAuditModal(false)}
                className="rounded-xl border-slate-200 text-xs"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}

      {showPolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900">Cấu hình Chính sách RBAC Policy</h3>
            <p className="mt-1 text-xs text-slate-500">
              Quy định quyền truy cập các endpoint REST API và WebSocket theo vai trò người dùng
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/60">
                <div>
                  <div className="font-semibold text-slate-800">Cho phép Nông dân xuất kho không qua QA</div>
                  <div className="text-[11px] text-slate-400">Yêu cầu quyền BypassQA đối với rau ăn lá ngắn ngày</div>
                </div>
                <input type="checkbox" defaultChecked={false} className="h-4 w-4 rounded text-emerald-600" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/60">
                <div>
                  <div className="font-semibold text-slate-800">Khách hàng được xem Camera 24/7 trực tiếp</div>
                  <div className="text-[11px] text-slate-400">Stream HLS bảo mật có watermark mã khách hàng</div>
                </div>
                <input type="checkbox" defaultChecked={true} className="h-4 w-4 rounded text-emerald-600" />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3 bg-slate-50/60">
                <div>
                  <div className="font-semibold text-slate-800">Tự động hủy session sau 30 phút không tương tác</div>
                  <div className="text-[11px] text-slate-400">Áp dụng bắt buộc cho tài khoản Admin &amp; Staff</div>
                </div>
                <input type="checkbox" defaultChecked={true} className="h-4 w-4 rounded text-emerald-600" />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPolicyModal(false)}
                className="rounded-xl border-slate-200 text-xs"
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setShowPolicyModal(false);
                  showToast("✓ Đã lưu cấu hình chính sách Role Guard");
                }}
                className="rounded-xl bg-[#0F5132] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0c4128]"
              >
                Áp dụng Chính sách
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
