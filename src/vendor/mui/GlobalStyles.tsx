import type { GlobalStylesProps as MuiGlobalStylesProps } from '@mui/material/GlobalStyles';
import MuiGlobalStyles from '@mui/material/GlobalStyles';

export type GlobalStylesProps = MuiGlobalStylesProps;

export function GlobalStyles(props: GlobalStylesProps) {
  return <MuiGlobalStyles {...props} />;
}
