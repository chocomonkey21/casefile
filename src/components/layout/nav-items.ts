import {
  BoardIcon,
  DeskIcon,
  FolderIcon,
  LabIcon,
  NotebookIcon,
} from "@/components/ui/Icons";
import { copy } from "@/lib/copy";

const n = copy.nav.items;

export const NAV_ITEMS = [
  { href: "/desk", label: n.desk.label, short: n.desk.short, Icon: DeskIcon },
  { href: "/cases", label: n.cases.label, short: n.cases.short, Icon: FolderIcon },
  { href: "/board", label: n.board.label, short: n.board.short, Icon: BoardIcon },
  { href: "/notebook", label: n.notebook.label, short: n.notebook.short, Icon: NotebookIcon },
  { href: "/lab", label: n.lab.label, short: n.lab.short, Icon: LabIcon },
] as const;

/** /cases/puddle/clues/evaporation still counts as "Cases" */
export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
