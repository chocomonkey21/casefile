import {
  BoardIcon,
  DeskIcon,
  FolderIcon,
  LabIcon,
  NotebookIcon,
  PlayIcon,
} from "@/components/ui/Icons";
import { copy } from "@/lib/copy";

const n = copy.nav.items;

export const NAV_ITEMS = [
  { href: "/home", label: n.desk.label, short: n.desk.short, Icon: DeskIcon },
  { href: "/chapters", label: n.cases.label, short: n.cases.short, Icon: FolderIcon },
  { href: "/study-board", label: n.board.label, short: n.board.short, Icon: BoardIcon },
  { href: "/notes", label: n.notebook.label, short: n.notebook.short, Icon: NotebookIcon },
  { href: "/progress", label: n.lab.label, short: n.lab.short, Icon: LabIcon },
  { href: "/videos", label: n.videos.label, short: n.videos.short, Icon: PlayIcon },
] as const;

/** /chapters/puddle/lessons/evaporation still counts as "Cases" */
export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
