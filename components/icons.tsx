type P = { className?: string; size?: number };

const base = (size: number, className?: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  "aria-hidden": true as const,
  className,
});

export const ArrowRight = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ArrowLeft = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="M15 8H2M6.5 3.5 2 8l4.5 4.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ArrowUpRight = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Chevron = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Plus = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Minus = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="M2 8h12" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Close = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const Check = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <path d="m2.5 8.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const Calendar = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <rect x="1.5" y="3" width="13" height="11.5" stroke="currentColor" strokeWidth="1.1" />
    <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

export const Guests = ({ className, size = 16 }: P) => (
  <svg {...base(size, className)}>
    <circle cx="8" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.1" />
    <path d="M2.5 14.5c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);

/** The LUXE mark: a horizon line under a setting sun. */
export const Mark = ({ className, size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
    <path d="M6 17a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 17h24M7 21h14M11 25h6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
