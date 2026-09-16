import { Header, Footer, Sidebar, Topbar, Container } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useT } from "@/shared/lib/i18n";
import type { RootLayoutViewProps } from "../model/types";

export function RootLayoutDesktop(props: RootLayoutViewProps) {
  const {
    role,
    user,
    children,
    className,
    activeId,
    customerNavItems,
    adminSidebarSections,
    farmerSidebarSections,
    sidebarFooter,
    roleBadgeLabel,
    defaultBreadcrumbs,
    notificationCount = 0,
    onNotificationsClick,
    onLoginClick,
    onLogoutClick,
  } = props;

  const { t } = useT();

  if (role === "customer") {
    return (
      <div className={cn("flex min-h-screen flex-col", className)}>
        <Header
          role="customer"
          navItems={customerNavItems}
          user={user ?? null}
          notificationCount={notificationCount}
          notificationsLabel={t("nav.notifications")}
          loginLabel={t("nav.login")}
          menuLabel={t("shell.menu")}
          onNotificationsClick={onNotificationsClick}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        <main
          className={cn(
            "flex-1 w-full",
            activeId === "home" || activeId === "explore" ? "pb-0" : "py-6 pb-6",
          )}
        >
          {activeId === "home" || activeId === "explore" ? (
            children
          ) : (
            <Container>{children}</Container>
          )}
        </main>

        <Footer />
      </div>
    );
  }

  const isAdmin = role === "admin";
  const sidebarSections = isAdmin ? adminSidebarSections : farmerSidebarSections;

  return (
    <div className={cn("flex h-screen overflow-hidden bg-muted/30", className)}>
      <Sidebar
        sections={sidebarSections}
        activeItemId={activeId}
        collapseLabel={t("shell.collapse")}
        expandLabel={t("shell.expand")}
        brandText={isAdmin ? "BioCloud" : "Green Farm"}
        footer={sidebarFooter}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          user={user ? { ...user, role } : undefined}
          breadcrumbs={defaultBreadcrumbs}
          notificationCount={notificationCount}
          searchPlaceholder={t("shell.search_placeholder")}
          notificationsLabel={t("nav.notifications")}
          menuLabel={t("shell.menu")}
          roleBadgeLabel={roleBadgeLabel}
          onNotificationsClick={onNotificationsClick}
          onLoginClick={onLoginClick}
          onLogoutClick={onLogoutClick}
        />

        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 pb-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default RootLayoutDesktop;
