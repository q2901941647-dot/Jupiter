import type { ReactNode } from 'react';

export type IconName =
  | 'arrow'
  | 'arrowUpRight'
  | 'check'
  | 'close'
  | 'menu'
  | 'spark'
  | 'layers'
  | 'cube'
  | 'plus'
  | 'mail'
  | 'x'
  | 'linkedin'
  | 'instagram'
  | 'play'
  | 'chevronDown'
  | 'mouse'
  | 'user';

const paths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="M5 12.5l4 4L19 7" />,
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  spark: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </>
  ),
  cube: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
      <path d="M12 12L4 7.5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  x: (
    <>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </>
  ),
  linkedin: (
    <>
      <path d="M6 9v9" />
      <path d="M6 5v.01" />
      <path d="M10 18v-5a3 3 0 0 1 6 0v5" />
      <path d="M10 18v-9" />
    </>
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  play: <path d="M9 6l9 6-9 6V6z" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  mouse: (
    <>
      <rect x="8" y="3" width="8" height="14" rx="4" />
      <path d="M12 6v3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.4 3.1-5.6 7-5.6s7 2.2 7 5.6" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
