import type { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@/vendor';
import { theme } from './theme';

type PortfolioThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: PortfolioThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
