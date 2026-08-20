import type { ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';
import MuiToolbar from '@mui/material/Toolbar';

export type ToolbarProps = MuiToolbarProps;

export function Toolbar(props: ToolbarProps) {
  return <MuiToolbar {...props} />;
}
