import type { ReactNode } from "react";
import type {
  AppRole,
  TopbarBreadcrumbItem,
  HeaderNavItem,
  SidebarSection,
  NavigationItemProps,
} from "@/shared/ui";
import type { UserSummary } from "@/entities/user";

export type RootLayoutUser = UserSummary;
export type AppShellUser = UserSummary;

export interface RootLayoutProps {
  role: AppRole;
  user?: RootLayoutUser;
  activeNavId?: string;
  breadcrumbs?: TopbarBreadcrumbItem[];
  notificationCount?: number;
  onNavChange?: (id: string) => void;
  onNotificationsClick?: () => void;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  children: ReactNode;
  className?: string;
}

export type AppShellProps = RootLayoutProps;

export interface RootLayoutViewProps extends RootLayoutProps {
  activeId: string;
  handleNavChange: (id: string) => void;
  handleMobileTabChange: (index: number, items: NavigationItemProps[]) => void;
  customerNavItems: HeaderNavItem[];
  customerBottomItems: NavigationItemProps[];
  adminSidebarSections: SidebarSection[];
  farmerSidebarSections: SidebarSection[];
  adminBottomItems: NavigationItemProps[];
  farmerBottomItems: NavigationItemProps[];
  sidebarFooter: ReactNode;
  roleBadgeLabel: string;
  defaultBreadcrumbs: TopbarBreadcrumbItem[];
}
