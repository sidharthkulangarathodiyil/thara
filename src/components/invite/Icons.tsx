import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
const base = (p: IconProps) => ({
  width: p.size ?? 20,
  height: p.size ?? 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
    <circle cx="12" cy="9" r="2.6" />
  </svg>
);

export const CalendarIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M3 10h18M8 3v4M16 3v4" />
    <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FloralIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 10V5M12 14v5M10 12H5M14 12h5M9 9 6 6M15 9l3-3M9 15l-3 3M15 15l3 3" />
  </svg>
);

export const NavIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20.8 7.6a5.4 5.4 0 0 0-9-2.1L12 6.2l-.2-.2a5.4 5.4 0 0 0-8.6 6.5C5.6 17 12 21 12 21s6.4-4 8.8-8.5a5.4 5.4 0 0 0 0-4.9Z" />
  </svg>
);

export const WhatsAppIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.4 3.4l-4.9 1.1Z" />
    <path d="M8.5 9.5c.3 2.5 2.5 4.7 5 5l1.3-1.3 2.2 1c.2.1.3.3.2.5-.4 1.2-1.7 1.9-3 1.7-3.4-.5-6.1-3.2-6.6-6.6-.2-1.3.5-2.6 1.7-3 .2-.1.4 0 .5.2l1 2.2L8.5 9.5Z" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const SpeakerOnIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" />
  </svg>
);

export const SpeakerOffIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 9v6h4l5 4V5L8 9H4Z" />
    <path d="m22 9-6 6M16 9l6 6" />
  </svg>
);

export const GoogleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8M12 8v8" />
  </svg>
);

export const AppleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M16.5 13.5c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.7 0-1.7-.7-2.8-.7-1.4 0-2.7.8-3.5 2.1-1.5 2.6-.4 6.5 1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.7.7 2.8.7c1.2 0 2-1 2.6-2 .8-1.2 1.2-2.4 1.2-2.5 0 0-2.4-.9-2.4-3.8Z" />
    <path d="M14.5 6.5c.6-.7 1-1.7.9-2.7-.8 0-1.8.6-2.4 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.4-1.2Z" />
  </svg>
);

export const OutlookIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="6" width="11" height="12" rx="1.5" />
    <circle cx="8.5" cy="12" r="2.2" />
    <path d="M14 9.5h7v5l-3.5 2L14 14.5" />
  </svg>
);

export const ScrollIcon = (p: IconProps) => (
  <svg {...base(p)} viewBox="0 0 24 36">
    <rect x="6" y="2" width="12" height="22" rx="6" />
    <circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none" />
    <path d="M9 29l3 3 3-3" />
  </svg>
);

export const SparkleIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
    <path d="m6 6 3 3M18 18l-3-3M6 18l3-3M18 6l-3 3" />
  </svg>
);
