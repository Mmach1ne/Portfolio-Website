import { Box, Text } from '@/components/0-primitive';
import { tokens } from '@/theme';

type MetricBarProps = {
  label: string;
  value: number;
  status?: 'active' | 'idle';
};

export function MetricBar({ label, value, status = 'active' }: MetricBarProps) {
  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Text variant="caption">{label}</Text>
        <Text variant="caption">{value}%</Text>
      </Box>
      <Box sx={{ height: 6, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1 }}>
        <Box
          sx={{
            width: `${value}%`,
            height: '100%',
            borderRadius: 1,
            bgcolor: status === 'active' ? tokens.palette.accent : 'rgba(255,255,255,0.3)',
          }}
        />
      </Box>
    </Box>
  );
}
