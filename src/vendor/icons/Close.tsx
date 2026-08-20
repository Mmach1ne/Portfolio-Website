import MuiCloseIcon from '@mui/icons-material/Close';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type CloseIconProps = SvgIconProps;

export function CloseIcon(props: CloseIconProps) {
  return <MuiCloseIcon {...props} />;
}
