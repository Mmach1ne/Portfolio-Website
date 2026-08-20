import type { ContainerProps as MuiContainerProps } from '@mui/material/Container';
import MuiContainer from '@mui/material/Container';

export type ContainerProps = MuiContainerProps;

export function Container(props: ContainerProps) {
  return <MuiContainer maxWidth="lg" {...props} />;
}
