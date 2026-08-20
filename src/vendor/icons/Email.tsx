import MuiEmailIcon from '@mui/icons-material/Email';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type EmailIconProps = SvgIconProps;

export function EmailIcon(props: EmailIconProps) {
  return <MuiEmailIcon {...props} />;
}
