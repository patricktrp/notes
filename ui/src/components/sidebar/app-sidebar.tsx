import * as React from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/services/axios-instance";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SquarePen,
  Folder,
  Sparkles,
  Fullscreen,
  Search,
  ChevronsDownUp,
  ChevronsUpDown,
  BrainCircuit,
  ArrowUpNarrowWide,
  Settings,
} from "lucide-react";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarRail,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarMenu,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { useFolderTree } from "@/hooks/use-folder-tree";
import SidebarNoteItem from "./sidebar-note-item";
import { NoteOverview } from "@/types/types";
import SidebarFolderItem from "./sidebar-folder-item";
import { createNote } from "@/services/api";
import { useCreateNote } from "@/hooks/use-create-note";
import { useCreateFolder } from "@/hooks/use-create-folder";
import { f } from "node_modules/react-router/dist/development/fog-of-war-BALYJxf_.d.mts";
import SortNoteDropdown from "./sort-note-dropdown";

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
  const createNoteMutation = useCreateNote();
  const createFolderMutation = useCreateFolder();
  const queryClient = useQueryClient();
  const [fullTreeExpanded, setIsFullTreeExpanded] = useState(false);

  console.log(fullTreeExpanded);

  const toggleAll = () => {
    setIsFullTreeExpanded((prev) => !prev);
    console.log(fullTreeExpanded);
  };

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
          <SidebarSeparator className="mx-0" />
          <SidebarMenu>
            <div className="flex mt-1 gap-x-1 items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      onClick={() => createNoteMutation.mutate()}
                    >
                      <SquarePen className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>New Note</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"ghost"}
                      onClick={() => createFolderMutation.mutate()}
                    >
                      <Folder className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>New Folder</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <SortNoteDropdown>
                      <Button variant={"ghost"}>
                        <ArrowUpNarrowWide className="size-4" />
                      </Button>
                    </SortNoteDropdown>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Change Sorting</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"ghost"} onClick={toggleAll}>
                      {fullTreeExpanded ? (
                        <ChevronsDownUp className="size-4" />
                      ) : (
                        <ChevronsUpDown className="size-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{fullTreeExpanded ? "Collapse All" : "Expand All"}</p>
                  </TooltipContent>
                </Tooltip>

                <Button variant={"ghost"}>
                  <Fullscreen className="size-4" />
                </Button>
              </TooltipProvider>
            </div>
          </SidebarMenu>
          {/* <SidebarGroupLabel>Pinned Notes</SidebarGroupLabel> */}
          <SidebarGroupLabel>All Notes</SidebarGroupLabel>
          <SidebarGroupContent>
            <DndContext onDragEnd={handleDragEnd}>
              <SidebarMenu>
                {!isLoading && (
                  <Tree item={data} isAllExpanded={fullTreeExpanded} />
                )}
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

function Tree({ item, isAllExpanded }: { item: any; isAllExpanded: boolean }) {
  const [isCollapsed, setIsCollapsed] = useState(!isAllExpanded);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarMenuItem>
      {item.id ? (
        <Collapsible
          open={!isCollapsed}
          className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        >
          <SidebarFolderItem folder={item} toggleCollapse={toggleCollapse} />

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.folders.map((subfolder) => (
                <Tree
                  key={subfolder.id}
                  item={subfolder}
                  isAllExpanded={isAllExpanded}
                />
              ))}
              {item.notes.map((note: NoteOverview) => (
                <SidebarNoteItem note={note} key={note.id} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          {item.folders.map((subfolder) => (
            <Tree
              key={subfolder.id}
              item={subfolder}
              isAllExpanded={isAllExpanded}
            />
          ))}
          {item.notes.map((note: NoteOverview) => (
            <SidebarNoteItem note={note} key={note.id} />
          ))}
        </>
      )}
    </SidebarMenuItem>
  );
}
