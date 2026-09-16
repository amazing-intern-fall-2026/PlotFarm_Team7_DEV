import * as React from "react";
import {
  Star,
  CheckCircle2,
  Award,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  Box,
  Flex,
  Card,
  CardContent,
  Heading,
  Text,
  Badge,
  Button,
  Avatar,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  FARMER_PROFILE,
  type FarmerProfile,
} from "./plot-detail.constants";

export interface FarmerProfileCardProps {
  farmer?: FarmerProfile;
  className?: string;
}

export const FarmerProfileCard: React.FC<FarmerProfileCardProps> = ({
  farmer = FARMER_PROFILE,
  className,
}) => {
  return (
    <Card className={cn("border border-emerald-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden", className)}>
      <CardContent className="p-5 sm:p-6 space-y-4">
        {/* Top Header: Account Info like Facebook / Shopee / Grab */}
        <Flex justify="between" align="start" className="flex-col sm:flex-row gap-4">
          <Flex align="start" gap={3.5} className="min-w-0">
            {/* Avatar with Verified Badge Overlay */}
            <Box className="relative shrink-0">
              <Avatar
                src={farmer.avatarUrl}
                name={farmer.name}
                size="lg"
                className="w-16 h-16 rounded-full ring-2 ring-emerald-500/30 ring-offset-2 dark:ring-offset-slate-900 shadow-md"
              />
              {farmer.isVerified && (
                <Box
                  title="Tài khoản kỹ sư đã xác minh chính chủ"
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 fill-white text-emerald-600" />
                </Box>
              )}
            </Box>

            {/* Name, Badge, Role */}
            <Box className="min-w-0 space-y-1">
              <Flex align="center" gap={2} className="flex-wrap">
                <Heading level={3} className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                  {farmer.name}
                </Heading>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold py-0.5 px-2 flex items-center gap-1"
                >
                  <Award className="w-3 h-3 text-emerald-600" />
                  {farmer.badgeTitle}
                </Badge>
              </Flex>

              <Flex align="center" gap={2} className="text-xs text-slate-500 dark:text-slate-400">
                <Flex align="center" gap={1}>
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <Text variant="caption" className="truncate">{farmer.location}</Text>
                </Flex>
                <Text variant="caption">•</Text>
                <Flex align="center" gap={1.5}>
                  <Box className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Text variant="caption" className="text-emerald-700 dark:text-emerald-400 font-medium">
                    Đang phụ trách tại vườn
                  </Text>
                </Flex>
              </Flex>

              <Text variant="muted" className="text-xs line-clamp-2 pt-0.5">
                {farmer.bio}
              </Text>
            </Box>
          </Flex>

          {/* Quick Action Button */}
          <Flex align="center" gap={2} className="w-full sm:w-auto shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="w-full sm:w-auto border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-950 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 h-9 px-3.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Chat với Kỹ sư
            </Button>
          </Flex>
        </Flex>

        {/* Stats Grid like Grab Driver / Shopee Official Store */}
        <Box className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <Box className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Flex align="center" justify="center" gap={1} className="text-amber-500 mb-0.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <Text variant="body1" className="font-black text-slate-900 dark:text-white text-sm">
                {farmer.rating}
              </Text>
            </Flex>
            <Text variant="caption" className="text-[10px] text-slate-500 block truncate">
              {farmer.reviewsCount} đánh giá tích cực
            </Text>
          </Box>

          <Box className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Flex align="center" justify="center" gap={1} className="text-emerald-700 dark:text-emerald-400 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <Text variant="body1" className="font-black text-slate-900 dark:text-white text-sm">
                {farmer.experienceYears} Năm
              </Text>
            </Flex>
            <Text variant="caption" className="text-[10px] text-slate-500 block truncate">
              Kinh nghiệm canh tác
            </Text>
          </Box>

          <Box className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <Flex align="center" justify="center" gap={1} className="text-emerald-700 dark:text-emerald-400 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <Text variant="body1" className="font-black text-slate-900 dark:text-white text-sm">
                {farmer.successfulCrops} Vụ
              </Text>
            </Flex>
            <Text variant="caption" className="text-[10px] text-slate-500 block truncate">
              Tỉ lệ vụ mùa 99.2%
            </Text>
          </Box>
        </Box>

        {/* Commitment line */}
        <Flex align="center" gap={1.5} className="pt-1 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <Text variant="caption" className="text-[11px] leading-tight">
            Kỹ sư phụ trách gửi báo cáo hình ảnh và chỉ số vi khí hậu 2 lần/tuần qua ứng dụng.
          </Text>
        </Flex>
      </CardContent>
    </Card>
  );
};
