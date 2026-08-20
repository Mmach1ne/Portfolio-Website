import MuiMenuIcon from '@mui/icons-material/Menu';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type MenuIconProps = SvgIconProps;

export function MenuIcon(props: MenuIconProps) {
  return <MuiMenuIcon {...props} />;
}
