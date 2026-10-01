import type { SVGProps } from "react";

/* Simple 24px line icons. Decorative by default, so they are hidden from screen readers. */
const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

type IconProps = SVGProps<SVGSVGElement>;

export const DeskIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="10" width="18" height="8" rx="1.5" />
    <path d="M7 10V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v4" />
    <path d="M7 18v3M17 18v3" />
  </svg>
);

export const FolderIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const BoardIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8" cy="9" r="1.3" />
    <circle cx="16" cy="15" r="1.3" />
    <path d="M8 9l8 6" />
  </svg>
);

export const NotebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z" />
    <path d="M6 3v18M10 8h5M10 12h5" />
  </svg>
);

export const LabIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3h6M10 3v6l-5.5 9.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3" />
    <path d="M7.5 15h9" />
  </svg>
);

export const FlameIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2.2-4.2.2 1.8 1 2.7 2 2.9C10.5 8.5 10.8 5.5 12 3z" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} fill="currentColor" strokeWidth={1} {...p}>
    <path d="M12 2.5l2.9 6 6.6.8-4.9 4.5 1.3 6.5L12 17l-5.9 3.3 1.3-6.5L2.5 9.3l6.6-.8z" />
  </svg>
);

export const MagnifierIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="10" cy="10" r="6" />
    <path d="M14.5 14.5L20 20" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const KeyIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="12" r="4" />
    <path d="M12 12h9M18 12v3M21 12v2" />
  </svg>
);

export const CompassIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5z" />
  </svg>
);

export const LanternIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 3h6M12 3v2" />
    <rect x="7" y="5" width="10" height="13" rx="3" />
    <path d="M9 21h6M12 18v3" />
  </svg>
);

export const WatchIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9v4l2.5 1.5M10 3h4" />
  </svg>
);

export const HatIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 14V9a5 5 0 0 1 10 0v5" />
    <path d="M3 15c0-1 4-2 9-2s9 1 9 2-4 3-9 3-9-2-9-3z" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const LockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const ClockIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const ReadingIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z" />
    <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z" />
  </svg>
);

export const PlayIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M10.5 9.5v5l4-2.5z" />
  </svg>
);

export const DiagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="8" r="2.5" />
    <circle cx="12" cy="18" r="2.5" />
    <path d="M8.3 7l7.3.6M7.2 8.2l3.4 7.6M16.8 10.3l-3.6 5.8" />
  </svg>
);

export const PencilIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z" />
    <path d="M14.5 6.5l3 3" />
  </svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </svg>
);

export const CrossIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowUpIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const ArrowDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 4h6l-1 6 3 3H7l3-3z" />
    <path d="M12 13v7" />
  </svg>
);
