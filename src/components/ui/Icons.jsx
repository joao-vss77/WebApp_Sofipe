export const Icon = ({ d, children, size = 24, sw = 2, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export const ArrowUR = () => <Icon sw={2.5} d="M7 17 17 7M8 7h9v9" />;
export const PlusIcon = (p) => <Icon {...p} d="M12 5v14M5 12h14" />;
export const MenuIcon = (p) => <Icon {...p} d="M4 7h16M4 12h16M4 17h16" />;
export const CloseIcon = (p) => <Icon {...p} d="M6 6l12 12M18 6 6 18" />;
export const Bolt = (p) => <Icon {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />;

export const Shield = (p) => (
  <Icon {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></Icon>
);
export const Lock = (p) => (
  <Icon {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Icon>
);
export const Star = (p) => (
  <Icon {...p}><path d="m12 3 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.4l6-.9L12 3Z" /></Icon>
);
export const Users = (p) => (
  <Icon {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c1.8.8 3 2.5 3.5 5.2" /></Icon>
);
export const Pin = (p) => (
  <Icon {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
);
export const Robot = (p) => (
  <Icon {...p}>
    <path d="M12 3v2" /><rect x="4" y="6" width="16" height="12" rx="4" />
    <circle cx="9" cy="12" r="1" fill="currentColor" /><circle cx="15" cy="12" r="1" fill="currentColor" />
    <path d="M9 21h6" />
  </Icon>
);
