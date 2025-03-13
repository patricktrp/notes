import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { NavActions } from "@/components/layout/nav-actions";
import { useParams } from "react-router";
import { useNote } from "@/hooks/use-note";

const Note = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data, isLoading, isError, error } = useNote(Number(noteId));

  return (
    <div>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {data?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3">{<NavActions note={data} />}</div>
      </header>
      <div className="p-4">{data?.content}</div>
    </div>
  );
};

export default Note;
