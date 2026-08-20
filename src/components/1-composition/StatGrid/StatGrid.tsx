import { memo } from 'react';
import { Box, Text } from '@/components/0-primitive';

type StatItem = {
  label: string;
  value: string;
};

type StatGridProps = {
  items: readonly StatItem[];
  columns?: number;
};

export const StatGrid = memo(function StatGrid({ items, columns = 2 }: StatGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 1.5,
      }}
    >
      {items.map((item) => (
        <Box key={item.label}>
          <Text variant="caption" sx={{ opacity: 0.65 }}>
            {item.label}
          </Text>
          <Text variant="subtitle" component="p" sx={{ m: 0, fontSize: '0.95rem' }}>
            {item.value}
          </Text>
        </Box>
      ))}
    </Box>
  );
});
