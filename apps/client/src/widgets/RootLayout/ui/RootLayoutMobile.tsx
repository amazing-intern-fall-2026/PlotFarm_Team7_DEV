import { Header, Footer, Topbar, Navigation, Container } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { useT } from "@/shared/lib/i18n";
import type { RootLayoutViewProps } from "../model/types";

export function RootLayoutMobile(props: RootLayoutViewProps) {
  const {
    role,
    user,
    children,
    className,
    activeId,
    handleMobileTabChange,
    customerNavItems,
    customerBottomItems,
    adminBottomItems,
    farmerBottomItems,
    roleBadgeLabel,
    defaultBreadcrumbs,
    notificationCount = 0,
    onNotificationsClick,
    onLoginClick,
    onLogoutClick,
  } = props;

  const { t } = useT();

  if (role === "customer") {
    const bottomIndex = customerBottomItems.findIndex((i) => i.id === activeId);

    return (
      <div className={cn("flex min-h-screen w-full max-w-full flex-col overflow-x-hidden", className)}>
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
            "flex-1 w-full max-w-full overflow-x-hidden pb-20",
            activeId === "home" || activeId === "explore" ? "" : "py-2 sm:py-4",
          )}
        >
          {activeId === "home" || activeId === "explore" ? (
            children
          ) : (
            <Container padding={false} className="w-full max-w-full overflow-x-hidden">
              {children}
            </Container>
          )}
        </main>

        <Footer />

        {/* Mobile Fixed Bottom Navigation with >= 44px Touch Targets */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
          <Navigation
            items={customerBottomItems}
            activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
            onTabChange={(i) => handleMobileTabChange(i, customerBottomItems)}
          />
        </div>
      </div>
    );
  }

  const isAdmin = role === "admin";
  const bottomItems = isAdmin ? adminBottomItems : farmerBottomItems;
  const bottomIndex = bottomItems.findIndex((i) => i.id === activeId);

  return (
    <div className={cn("flex h-screen w-full max-w-full flex-col overflow-x-hidden bg-muted/30", className)}>
      {/* Mobile Topbar without persistent desktop sidebar */}
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

      <main className="flex-1 w-full max-w-full overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 pb-20">
        {children}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
        <Navigation
          items={bottomItems}
          activeIndex={bottomIndex >= 0 ? bottomIndex : 0}
          onTabChange={(i) => handleMobileTabChange(i, bottomItems)}
        />
      </div>
    </div>
  );
}

export default RootLayoutMobile;
