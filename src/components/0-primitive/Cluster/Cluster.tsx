import { Box, type BoxProps } from '../Box';

export type ClusterProps = BoxProps;

export function Cluster({ sx, ...props }: ClusterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        ...sx,
      }}
      {...props}
    />
  );
}
