import * as React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/axios-instance";
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
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import { useFolderTree } from "@/hooks/use-folder-tree";
import SidebarNoteItem from "./sidebar-note-item";
import { NoteOverview } from "@/types/types";
import SidebarFolderItem from "./sidebar-folder-item";
import DroppableFolder from "./sidebar-folder-item";
import { useMoveNote } from "@/hooks/use-move-note";
import { moveNote } from "@/services/api";

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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (info) => {
      return apiClient.put(`/notes/${info.noteId}/move`, {
        folderId: info.folderId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("folderTree");
    },
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) return;
    console.log(event);
    const folderId = event.over.id;
    const noteId = event.active.id;
    mutation.mutate({ noteId: noteId, folderId: folderId });
  };

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
            <DndContext onDragEnd={handleDragEnd}>
              <SidebarMenu>
                {!isLoading && <Tree item={data} />}
                {/* TODO: ADD LOADER */}
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
            </DndContext>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

function Tree({ item }: any) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev); // Toggle collapse state
  };

  return (
    <SidebarMenuItem>
      {item.id ? (
        <Collapsible
          open={!isCollapsed}
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
          // defaultOpen={name === "components" || name === "ui"}
        >
          <SidebarFolderItem folder={item} toggleCollapse={toggleCollapse} />
          {/* <CollapsibleTrigger className="w-full" asChild> */}
          {/* <SidebarMenuButton onClick={toggleCollapse}>
            <ChevronRight className="transition-transform" />
            <Folder />
            {item.name}
          </SidebarMenuButton> */}
          {/* </CollapsibleTrigger> */}

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.folders.map((subfolder) => (
                <Tree key={subfolder.id} item={subfolder} />
              ))}
              {item.notes.map((note: NoteOverview) => (
                <SidebarNoteItem note={note} />
                // <SidebarMenuButton
                //   key={note.id}
                //   // isActive={name === "button.tsx"}
                //   className="data-[active=true]:bg-transparent"
                // >
                //   <File />
                //   {note.title}
                // </SidebarMenuButton>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          {item.folders.map((subfolder) => (
            <Tree key={subfolder.id} item={subfolder} />
          ))}
          {item.notes.map((note: NoteOverview) => (
            <SidebarNoteItem note={note} />
            // <SidebarMenuButton
            //   key={note.id}
            //   // isActive={name === "button.tsx"}
            //   className="data-[active=true]:bg-transparent"
            // >
            //   <File />
            //   {note.title}
            // </SidebarMenuButton>
          ))}
        </>
      )}
    </SidebarMenuItem>
  );
}
