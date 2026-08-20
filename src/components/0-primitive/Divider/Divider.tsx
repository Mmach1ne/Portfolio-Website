import { Box } from '../Box';
export type DividerProps = { vertical?: boolean };
export function Divider({ vertical }: DividerProps) {
  return (
    <Box
      sx={{
        width: vertical ? '1px' : '100%',
        height: vertical ? '100%' : '1px',
        bgcolor: 'rgba(255,255,255,0.1)',
      }}
      role="separator"
    />
  );
}
