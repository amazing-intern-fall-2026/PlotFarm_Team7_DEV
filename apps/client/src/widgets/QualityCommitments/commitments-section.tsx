import * as React from "react";
import {
  ShieldCheck,
  Sprout,
  PackageCheck,
  Truck,
  Headphones,
  Sparkles,
} from "lucide-react";
import {
  Box,
  Flex,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent,
  Heading,
  Text,
  Badge,
  Button,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import {
  COMMITMENTS_HEADER,
  COMMITMENT_ITEMS,
  COMMITMENTS_SUPPORT_BAR,
  type CommitmentItem,
  type CommitmentIconType,
} from "./commitments.constants";

export interface CommitmentsSectionProps extends React.HTMLAttributes<HTMLElement> {
  onConsultClick?: () => void;
  title?: string;
  subtitle?: string;
  items?: CommitmentItem[];
  useContainer?: boolean;
}

function CommitmentIcon({
  name,
  className,
}: {
  name: CommitmentIconType;
  className?: string;
}) {
  switch (name) {
    case "ShieldCheck":
      return <ShieldCheck className={className} />;
    case "Sprout":
      return <Sprout className={className} />;
    case "PackageCheck":
      return <PackageCheck className={className} />;
    case "Truck":
      return <Truck className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

function CommitmentCard({ item }: { item: CommitmentItem }) {
  return (
    <Card
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "border border-slate-100 dark:border-border/80 bg-card",
        "p-5 sm:p-6 transition-all duration-300",
        "hover:shadow-md hover:-translate-y-0.5",
        item.colorTheme.borderHoverClass,
      )}
    >
      <CardHeader className="p-0 space-y-4">
        <Flex align="center" justify="between" className="gap-2">
          <Box
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-105",
              item.colorTheme.iconBgClass,
            )}
          >
            <CommitmentIcon
              name={item.icon}
              className={cn("w-5 h-5", item.colorTheme.iconTextClass)}
            />
          </Box>

          <Badge
            variant="outline"
            className={cn(
              "px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors",
              item.colorTheme.badgeClass,
            )}
          >
            {item.highlight}
          </Badge>
        </Flex>

        <Heading
          level={3}
          variant="h4"
          className="text-base sm:text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors"
        >
          {item.title}
        </Heading>
      </CardHeader>

      <CardContent className="p-0 pt-2">
        <Text
          variant="body2"
          className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3"
        >
          {item.description}
        </Text>
      </CardContent>
    </Card>
  );
}

function SupportActionBar({ onConsultClick }: { onConsultClick?: () => void }) {
  const handleAction = () => {
    if (onConsultClick) {
      onConsultClick();
    } else {
      window.open(
        `tel:${COMMITMENTS_SUPPORT_BAR.PHONE_HOTLINE.replace(/\s+/g, "")}`,
      );
    }
  };

  return (
    <Box className="rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/70 p-4 sm:p-5 md:p-6 transition-colors">
      <Flex
        direction="col"
        className="sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <Flex align="center" className="gap-3 sm:gap-4 min-w-0">
          <Box className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary/15 text-secondary border border-secondary/25 flex items-center justify-center shrink-0">
            <Headphones className="w-5 h-5 text-secondary" />
          </Box>

          <Box className="space-y-0.5 min-w-0">
            <Heading
              level={4}
              variant="h5"
              className="text-sm sm:text-base font-bold text-foreground"
            >
              {COMMITMENTS_SUPPORT_BAR.TITLE}
            </Heading>
            <Text
              variant="body2"
              className="text-xs sm:text-sm text-muted-foreground"
            >
              {COMMITMENTS_SUPPORT_BAR.SUBTITLE}
            </Text>
          </Box>
        </Flex>

        <Button
          variant="secondary"
          size="lg"
          onClick={handleAction}
          className={cn(
            "w-full sm:w-auto h-11 sm:h-12 px-6 rounded-xl font-bold text-sm",
            "bg-secondary hover:bg-secondary-hover text-secondary-foreground",
            "shadow-sm hover:shadow-md transition-all active:scale-[0.98] shrink-0",
          )}
          leftIcon={<Headphones className="w-4 h-4" />}
        >
          {COMMITMENTS_SUPPORT_BAR.CTA_TEXT}
        </Button>
      </Flex>
    </Box>
  );
}

export function CommitmentsSection({
  onConsultClick,
  title = COMMITMENTS_HEADER.TITLE,
  subtitle = COMMITMENTS_HEADER.SUBTITLE,
  items = COMMITMENT_ITEMS,
  useContainer = false,
  className,
  ...props
}: CommitmentsSectionProps) {
  const content = (
    <Box className="w-full rounded-3xl bg-white dark:bg-card border border-slate-100 dark:border-border/80 shadow-sm p-5 sm:p-8 md:p-10 lg:p-12 space-y-8 md:space-y-10">
      <Flex
        direction="col"
        align="center"
        className="text-center space-y-2.5 max-w-3xl mx-auto"
      >
        <Badge
          variant="outline"
          icon={<Sparkles className="w-3 h-3 text-emerald-600" />}
          className="px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full border-emerald-200 bg-emerald-50/80 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
        >
          {COMMITMENTS_HEADER.BADGE}
        </Badge>

        <Heading
          level={2}
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0d3b1e] dark:text-foreground tracking-tight"
        >
          {title}
        </Heading>

        <Text
          variant="body1"
          className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl"
        >
          {subtitle}
        </Text>
      </Flex>

      <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {items.map((item) => (
          <CommitmentCard key={item.id} item={item} />
        ))}
      </Grid>

      <SupportActionBar onConsultClick={onConsultClick} />
    </Box>
  );

  return (
    <Box
      as="section"
      aria-label="Cam kết chất lượng canh tác"
      className={cn("w-full", className)}
      {...props}
    >
      {useContainer ? <Container size="7xl">{content}</Container> : content}
    </Box>
  );
}

export { CommitmentsSection as QualityCommitments };
