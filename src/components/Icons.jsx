function Svg({ children, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconClose() {
  return (
    <Svg>
      <path d="M6 6l12 12M18 6L6 18" {...stroke} />
    </Svg>
  );
}

export function IconChevronLeft() {
  return (
    <Svg size={16}>
      <path d="M14.5 5L8.5 12l6 7" {...stroke} />
    </Svg>
  );
}

export function IconArrowRight() {
  return (
    <Svg size={16}>
      <path d="M4 12h16M14 6l6 6-6 6" {...stroke} />
    </Svg>
  );
}

export function IconTrash() {
  return (
    <Svg>
      <path d="M4 7h16" {...stroke} />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" {...stroke} />
      <path d="M7 7l.8 12.2A1.5 1.5 0 0 0 9.3 20.5h5.4a1.5 1.5 0 0 0 1.5-1.3L17 7" {...stroke} />
      <path d="M10 11v5M14 11v5" {...stroke} />
    </Svg>
  );
}

export function IconPlay() {
  return (
    <Svg size={22}>
      <path d="M9 7.5v9l8-4.5-8-4.5z" {...stroke} />
    </Svg>
  );
}

export function IconStop() {
  return (
    <Svg size={22}>
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.5" {...stroke} />
    </Svg>
  );
}

export function IconUser() {
  return (
    <Svg>
      <circle cx="12" cy="9" r="3.25" {...stroke} />
      <path d="M6.5 18.5c.8-2.4 2.8-3.75 5.5-3.75s4.7 1.35 5.5 3.75" {...stroke} />
    </Svg>
  );
}

export function IconEye() {
  return (
    <Svg>
      <path d="M3 12s3.2-5.5 9-5.5S21 12 21 12s-3.2 5.5-9 5.5S3 12 3 12z" {...stroke} />
      <circle cx="12" cy="12" r="2.25" {...stroke} />
    </Svg>
  );
}

export function IconEyeOff() {
  return (
    <Svg>
      <path d="M4 5l16 14" {...stroke} />
      <path d="M9.5 9.7A3.2 3.2 0 0 0 12 15.2c.7 0 1.3-.2 1.8-.6" {...stroke} />
      <path d="M7.2 7.6C5 8.8 3.4 11 3 12c0 0 3.2 5.5 9 5.5 1.3 0 2.5-.3 3.6-.8M14.8 8.2A8.7 8.7 0 0 0 12 6.5C6.2 6.5 3 12 3 12" {...stroke} />
    </Svg>
  );
}

export function IconSun() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="3.25" {...stroke} />
      <path d="M12 3.5v1.8M12 18.7v1.8M3.5 12h1.8M18.7 12h1.8M6 6l1.3 1.3M16.7 16.7L18 18M18 6l-1.3 1.3M7.3 16.7L6 18" {...stroke} />
    </Svg>
  );
}

export function IconMoon() {
  return (
    <Svg>
      <path d="M15.5 4.8A7.2 7.2 0 1 0 19.2 15 5.6 5.6 0 0 1 15.5 4.8z" {...stroke} />
    </Svg>
  );
}
