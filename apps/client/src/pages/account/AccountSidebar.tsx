import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  User,
  FileText,
  Sprout,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  Avatar,
  Badge,
  Typography,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { ACCOUNT_NAV_ITEMS, DEFAULT_USER_PROFILE } from "./profile.constants";

interface AccountSidebarProps {
  className?: string;
}

export const AccountSidebar: React.FC<AccountSidebarProps> = ({ className }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavIcon = (id: string) => {
    switch (id) {
      case "profile":
        return <User className="w-4 h-4 shrink-0" />;
      case "contracts":
        return <FileText className="w-4 h-4 shrink-0" />;
      case "my-farm":
        return <Sprout className="w-4 h-4 shrink-0" />;
      case "organic-standards":
        return <ShieldCheck className="w-4 h-4 shrink-0" />;
      case "crop-insurance":
        return <ShieldAlert className="w-4 h-4 shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 shrink-0" />;
    }
  };

  return (
    <aside className={cn("w-full lg:w-72 shrink-0 space-y-4", className)}>
      {/* Mini Profile Card */}
      <Card className="border-border/80 bg-white dark:bg-slate-900 shadow-xs rounded-2xl overflow-hidden">
        <CardContent className="p-5 flex items-center gap-3.5">
          <Avatar
            src={DEFAULT_USER_PROFILE.avatarUrl}
            name={DEFAULT_USER_PROFILE.fullName}
            size="lg"
            className="ring-2 ring-emerald-500/20 shadow-xs"
          />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Typography.H4 className="text-sm font-bold text-foreground truncate">
                {DEFAULT_USER_PROFILE.fullName}
              </Typography.H4>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 text-[10px] font-bold px-1.5 py-0">
                Đã xác thực
              </Badge>
            </div>
            <Typography.Muted className="text-xs truncate text-muted-foreground">
              {DEFAULT_USER_PROFILE.email}
            </Typography.Muted>
          </div>
        </CardContent>
      </Card>

      {/* Navigation List */}
      <Card className="border-border/80 bg-white dark:bg-slate-900 shadow-xs rounded-2xl overflow-hidden">
        <div className="p-2 space-y-1">
          {ACCOUNT_NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl transition-all text-xs font-semibold group",
                  isActive
                    ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 shadow-2xs font-bold border border-emerald-200/60 dark:border-emerald-800/40"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/50",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-foreground",
                    )}
                  >
                    {getNavIcon(item.id)}
                  </div>
                  <div className="min-w-0 text-left">
                    <div className="truncate text-xs font-semibold">{item.title}</div>
                    <div className="text-[10px] text-muted-foreground truncate hidden sm:block">
                      {item.description}
                    </div>
                  </div>
                </div>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 shrink-0 transition-transform",
                    isActive ? "text-emerald-700 translate-x-0.5" : "text-slate-400 opacity-40 group-hover:opacity-100",
                  )}
                />
              </Link>
            );
          })}
        </div>
      </Card>

      {/* Hotline Support Quick Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 space-y-2 hidden lg:block">
        <Typography.Small className="font-bold text-emerald-900 dark:text-emerald-300 block">
          Cần hỗ trợ hợp đồng & pháp lý?
        </Typography.Small>
        <Typography.Muted className="text-xs text-emerald-800/80 dark:text-emerald-400/80 leading-relaxed block">
          Luật sư và kỹ sư phụ trách hỗ trợ giải đáp 24/7 qua tổng đài:
        </Typography.Muted>
        <a
          href="tel:19006868"
          className="inline-flex items-center gap-1.5 font-mono font-black text-sm text-emerald-700 dark:text-emerald-300 hover:underline pt-1"
        >
          1900 6868 (Phím 3)
        </a>
      </div>
    </aside>
  );
};
