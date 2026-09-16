import * as React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { State } from "../State";
import { Box } from "../Box";
import { Container } from "../Container";
import { Typography } from "../Typography";
import { useT } from "@/shared/lib/i18n";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  /** Trạng thái skeleton loading khi đang tải cấu hình hoặc dữ liệu trang trại */
  isLoading?: boolean;
}

/**
 * Footer component — Chuẩn giao diện BioCloud Farming
 * Tuân thủ nghiêm ngặt Design Tokens và Theme của Global CSS (font Plus Jakarta Sans, màu Bio Green & Harvest Amber):
 * 1. BioCloud Farming (Logo tròn mầm cây Bio Green, mô tả kết nối cư dân đô thị đồng canh tác)
 * 2. 3 huy hiệu tiêu chuẩn: VietGAP Certified, GlobalGAP 100%, Organic Bio
 * 3. Cột "Phân Hệ Canh Tác"
 * 4. Cột "Tài Khoản & Pháp Lý"
 * 5. Cột "Trang Trại Đà Lạt" (Địa chỉ, Hotline kỹ sư nông học, Email kỹ thuật)
 * 6. Bottom bar: Bản quyền © 2026 BioCloud Farming & liên kết Bảo mật dữ liệu IoT, Tiêu chuẩn nông sản sạch
 * 7. Tích hợp Skeleton Loading State có tính tái sử dụng cao thông qua component State
 * 8. Chuẩn hóa i18n toàn diện qua useT(), loại bỏ hoàn toàn việc fix cứng text
 * 9. Bọc trong component Container chuẩn hóa bố cục
 */
export function Footer({
  className,
  brandName = "Green Farm",
  isLoading = false,
  ...props
}: FooterProps) {
  const { t } = useT();

  if (isLoading) {
    return (
      <footer
        aria-label="Đang tải chân trang"
        className={cn(
          "border-t border-border bg-muted/40 text-foreground font-sans mt-auto py-10",
          className,
        )}
      >
        <Container>
          <State variant="skeleton" skeletonPreset="grid" skeletonCount={4} />
        </Container>
      </footer>
    );
  }

  return (
    <footer
      className={cn(
        "border-t border-border bg-muted/40 text-foreground font-sans mt-auto",
        className,
      )}
      {...props}
    >
      <Container className="pt-12 pb-8">
        <Box className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <Box className="space-y-4">
            <Box className="flex items-center gap-2.5">
              <img
                src="/images/logo-1.png"
                alt="Green Farm Logo"
                className="h-9 w-9 shrink-0 object-contain"
              />
              <Typography.H4 className="text-lg font-bold tracking-tight text-primary">
                {brandName}
              </Typography.H4>
            </Box>

            <Typography.P className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t("footer.desc")}
            </Typography.P>

            <Box className="space-y-2 pt-1">
              <Box className="flex flex-wrap items-center gap-2">
                <Typography.Small className="rounded-full bg-background border border-border px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  VietGAP Certified
                </Typography.Small>
                <Typography.Small className="rounded-full bg-background border border-border px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  GlobalGAP 100%
                </Typography.Small>
              </Box>
              <Box>
                <Typography.Small className="inline-block rounded-full bg-background border border-border px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs hover:border-primary/40 hover:text-foreground transition-colors">
                  Organic Bio
                </Typography.Small>
              </Box>
            </Box>
          </Box>

          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer.col_farming")}
            </Typography.H5>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="/plots"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_explore_plots")}
                </a>
              </li>
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_my_farm")}
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_crop_journal")}
                </a>
              </li>
              <li>
                <a
                  href="/journal"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_gallery")}
                </a>
              </li>
            </ul>
          </Box>

          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer.col_legal")}
            </Typography.H5>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="/my-farm"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_account_settings")}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_contracts")}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_organic_commitment")}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-primary transition-colors inline-block"
                >
                  {t("footer.link_crop_insurance")}
                </a>
              </li>
            </ul>
          </Box>

          <Box className="space-y-3.5">
            <Typography.H5 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t("footer.col_farm_dalat")}
            </Typography.H5>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <Typography.Text className="text-sm leading-relaxed text-muted-foreground">
                  {t("footer.address_dalat")}
                </Typography.Text>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-secondary shrink-0" />
                <Typography.Text className="text-sm text-muted-foreground">
                  {t("footer.hotline_label")}{" "}
                  <a
                    href="tel:19006868"
                    className="font-bold text-foreground hover:text-secondary transition-colors"
                  >
                    1900 6868
                  </a>
                </Typography.Text>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:kythuat@greenfarm.dalat.vn"
                  className="hover:text-primary transition-colors text-sm"
                >
                  kythuat@greenfarm.dalat.vn
                </a>
              </li>
            </ul>
          </Box>
        </Box>

        {/* Thanh bản quyền & pháp lý dưới đáy */}
        <Box className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <Typography.P className="text-center sm:text-left text-xs text-muted-foreground">
            {t("footer.copyright")}
          </Typography.P>
          <Box className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <a
              href="/about"
              className="hover:text-primary transition-colors"
            >
              {t("footer.privacy_iot")}
            </a>
            <a
              href="/about"
              className="hover:text-primary transition-colors"
            >
              {t("footer.clean_agri_standards")}
            </a>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}
