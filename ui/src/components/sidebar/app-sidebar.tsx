import * as React from "react";
import {
  ChevronRight,
  File,
  Folder,
  Sparkles,
  Search,
  BrainCircuit,
  Settings,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import { useFolderTree } from "@/hooks/use-folder-tree";

const navData = {
  user: {
    name: "Patrick Treppmann",
    email: "patrick@treppmann.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
      shortcut: "S",
    },
    {
      title: "Ask AI",
      url: "#",
      icon: Sparkles,
      shortcut: "A",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading } = useFolderTree();
  console.log(data);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <BrainCircuit className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">DeepNote</span>
                  <span className="truncate text-xs">Pro</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <NavMain items={navData.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {!isLoading && <Tree item={data} />}
              {/* {data.newTree.folders.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
              {data.newTree.notes.map((note) => (
                <SidebarMenuButton
                  key={note.id}
                  // isActive={name === "button.tsx"}
                  className="data-[active=true]:bg-transparent"
                >
                  <File />
                  {note.title}
                </SidebarMenuButton>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarRail /> */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

function Tree({ item }: any) {
  return (
    <SidebarMenuItem>
      {item.id ? (
        <Collapsible
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          // defaultOpen={name === "components" || name === "ui"}
        >
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <ChevronRight className="transition-transform" />
              <Folder />
              {item.name}
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.folders.map((subfolder) => (
                <Tree key={subfolder.id} item={subfolder} />
              ))}
              {item.notes.map((note) => (
                <SidebarMenuButton
                  key={note.id}
                  // isActive={name === "button.tsx"}
                  className="data-[active=true]:bg-transparent"
                >
                  <File />
                  {note.title}
                </SidebarMenuButton>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          {item.folders.map((subfolder) => (
            <Tree key={subfolder.id} item={subfolder} />
          ))}
          {item.notes.map((note) => (
            <SidebarMenuButton
              key={note.id}
              // isActive={name === "button.tsx"}
              className="data-[active=true]:bg-transparent"
            >
              <File />
              {note.title}
            </SidebarMenuButton>
          ))}
        </>
      )}
    </SidebarMenuItem>
  );
}
