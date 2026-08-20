import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import MuiIconButton from '@mui/material/IconButton';

export type IconButtonProps = MuiIconButtonProps;

export function IconButton({ sx, ...props }: IconButtonProps) {
  return (
    <MuiIconButton
      disableRipple
      sx={{
        color: '#fff',
        '&:hover': { background: 'rgba(255, 255, 255, 0.08)' },
        ...sx,
      }}
      {...props}
    />
  );
}
