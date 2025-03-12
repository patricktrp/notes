import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Outlet } from "react-router";
import { NavActions } from "@/components/layout/nav-actions";
import { SettingsDialog } from "@/components/features/settings/settings-dialog";

export default function Layout() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      Project Management
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">{<NavActions />}</div>
          </header> */}
          <div className="h-full">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <SettingsDialog />
    </>
  );
}
