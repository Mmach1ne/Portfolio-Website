import type { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import MuiDrawer from '@mui/material/Drawer';

export type DrawerProps = MuiDrawerProps;

export function Drawer({ sx, PaperProps, ...props }: DrawerProps) {
  return (
    <MuiDrawer
      PaperProps={{
        ...PaperProps,
        sx: {
          background: '#0a0a0a',
          color: '#fff',
          ...PaperProps?.sx,
        },
      }}
      sx={sx}
      {...props}
    />
  );
}
