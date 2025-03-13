import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { SettingsDialog } from "@/components/features/settings/settings-dialog";
import SearchDialog from "@/components/search-dialog";

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="h-full">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <SettingsDialog />
      <SearchDialog />
    </>
  );
}
