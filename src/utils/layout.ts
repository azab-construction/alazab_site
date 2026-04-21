// Spacing scale
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
} as const;

// Responsive padding
export const responsivePadding = {
  section: 'px-4 md:px-6 lg:px-8',
  card: 'p-4 md:p-6',
  container: 'px-4 md:px-6 lg:px-8 py-8 md:py-12',
} as const;

// Grid layouts
export const gridLayouts = {
  twoCol: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  threeCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  fourCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  autoFit: 'grid auto-fit-max gap-6',
} as const;

// Flex layouts
export const flexLayouts = {
  center: 'flex items-center justify-center',
  between: 'flex items-center justify-between',
  start: 'flex items-center justify-start',
  end: 'flex items-center justify-end',
  spacedCol: 'flex flex-col justify-between',
} as const;

// Common sizing
export const sizing = {
  iconSmall: '16px',
  iconMedium: '24px',
  iconLarge: '32px',
  buttonHeight: '2.5rem',
  inputHeight: '2.375rem',
} as const;

// Animation timings
export const animations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;
