import MuiGitHubIcon from '@mui/icons-material/GitHub';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export type GitHubIconProps = SvgIconProps;

export function GitHubIcon(props: GitHubIconProps) {
  return <MuiGitHubIcon {...props} />;
}
