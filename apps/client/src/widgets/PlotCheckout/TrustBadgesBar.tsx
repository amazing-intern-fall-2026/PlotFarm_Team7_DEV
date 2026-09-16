import * as React from "react";
import { Lock, ShieldCheck, Landmark, PhoneCall } from "lucide-react";
import {
  Box,
  Flex,
  Grid,
  Card,
  Heading,
  Text,
} from "@/shared/ui";
import { CHECKOUT_TEXTS } from "./checkout.constants";

export const TrustBadgesBar: React.FC = () => {
  const getBadgeIcon = (id: string) => {
    switch (id) {
      case "ssl":
        return <Lock className="w-5 h-5 text-emerald-600" />;
      case "napas":
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case "banks":
        return <Landmark className="w-5 h-5 text-emerald-600" />;
      case "support":
      default:
        return <PhoneCall className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <Card className="p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl shadow-xs">
      <Grid cols={1} colsSm={2} colsLg={4} gap={4}>
        {CHECKOUT_TEXTS.trustBadges.map((badge) => (
          <Flex key={badge.id} align="center" gap={3} className="p-2 rounded-xl bg-slate-50/60 dark:bg-slate-800/40">
            <Box className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/50 flex items-center justify-center shrink-0">
              {getBadgeIcon(badge.id)}
            </Box>
            <Box className="min-w-0">
              <Heading level={5} className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {badge.title}
              </Heading>
              <Text variant="caption" className="text-[11px] text-slate-500 truncate block mt-0.5">
                {badge.subtitle}
              </Text>
            </Box>
          </Flex>
        ))}
      </Grid>
    </Card>
  );
};
