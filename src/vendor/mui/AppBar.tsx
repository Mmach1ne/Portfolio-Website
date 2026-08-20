import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiAppBar from '@mui/material/AppBar';

export type AppBarProps = MuiAppBarProps;

export function AppBar({ sx, ...props }: AppBarProps) {
  return (
    <MuiAppBar
      elevation={0}
      sx={{
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        ...sx,
      }}
      {...props}
    />
  );
}
