import { Box } from '@/components/0-primitive';
import { tokens } from '@/theme';

type StatusDotProps = {
  status?: 'active' | 'idle';
};

export function StatusDot({ status = 'active' }: StatusDotProps) {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        bgcolor: status === 'active' ? tokens.palette.accent : 'rgba(255,255,255,0.3)',
        boxShadow: status === 'active' ? `0 0 8px ${tokens.palette.accent}` : 'none',
      }}
    />
  );
}
