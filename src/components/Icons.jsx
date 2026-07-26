// Inline SVG icons — no CDN dependency, always works
const Icon = ({ d, size = 22, color = 'currentColor', strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
)

export const HomeIcon = (p) => <Icon {...p} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
export const UsersIcon = (p) => <Icon {...p} d={["M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2", "M23 21v-2a4 4 0 00-3-3.87", "M16 3.13a4 4 0 010 7.75", "M9 7a4 4 0 100 8 4 4 0 000-8z"]} />
export const ClipboardIcon = (p) => <Icon {...p} d={["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2", "M9 5a2 2 0 002 2h2a2 2 0 002-2", "M9 5a2 2 0 012-2h2a2 2 0 012 2", "M9 12h6", "M9 16h4"]} />
export const CalendarIcon = (p) => <Icon {...p} d={["M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"]} />
export const SettingsIcon = (p) => <Icon {...p} d={["M12 15a3 3 0 100-6 3 3 0 000 6z", "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"]} />
export const ChevronRight = (p) => <Icon {...p} d="M9 18l6-6-6-6" />
export const CheckIcon = (p) => <Icon {...p} d="M5 13l4 4L19 7" />
export const PencilIcon = (p) => <Icon {...p} d={["M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7", "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"]} />
export const LogoutIcon = (p) => <Icon {...p} d={["M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />
export const BellIcon = (p) => <Icon {...p} d={["M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 01-3.46 0"]} />
export const ShieldIcon = (p) => <Icon {...p} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
export const HelpIcon = (p) => <Icon {...p} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3", "M12 17h.01"]} />
export const InfoIcon = (p) => <Icon {...p} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 16v-4", "M12 8h.01"]} />
export const MoonIcon = (p) => <Icon {...p} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
export const ClockIcon = (p) => <Icon {...p} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 6v6l4 2"]} />
export const MailIcon = (p) => <Icon {...p} d={["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"]} />
export const SearchIcon = (p) => <Icon {...p} d={["M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"]} />
export const RunIcon = (p) => <Icon {...p} d={["M13 4a1 1 0 100-2 1 1 0 000 2z", "M7 21l3-6 2 2 2-4", "M17 9l-4 1-2-3-4 2"]} />
export const BoltIcon = (p) => <Icon {...p} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
export const TargetIcon = (p) => <Icon {...p} d={["M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 18a6 6 0 100-12 6 6 0 000 12z", "M12 14a2 2 0 100-4 2 2 0 000 4z"]} />
export const FlameIcon = (p) => <Icon {...p} d="M12 22c5.523 0 6-7 3-10 1 4-3 5-3 5s-2-3 1-6c-3 1-5 5-5 8a4 4 0 004 3z" />
export const ChessIcon = (p) => <Icon {...p} d={["M9 20h6", "M12 17v3", "M8 7h8", "M10 4h4v3l2 3H8l2-3V4z", "M5 20h14"]} />
export const CalendarStatsIcon = (p) => <Icon {...p} d={["M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", "M9 14h.01M12 14h.01M15 14h.01M9 17h.01M12 17h.01"]} />
export const ClipboardCheckIcon = (p) => <Icon {...p} d={["M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2", "M9 5a2 2 0 002 2h2a2 2 0 002-2", "M9 5a2 2 0 012-2h2a2 2 0 012 2", "M9 14l2 2 4-4"]} />