import { useMediaQuery, useTheme } from '@/vendor';

export function useMedia(breakpoint: 'md' = 'md'): boolean {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
}
