import { memo, type ReactNode } from 'react';
import { Box, Text } from '@/components/0-primitive';

type WindowChromeProps = {
  title: string;
  children: ReactNode;
  compact?: boolean;
};

const ChromeHeader = memo(function ChromeHeader({ title }: { title: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#ff5f57' }} />
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#febc2e' }} />
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#28c840' }} />
      <Text variant="caption" sx={{ ml: 1 }}>
        {title}
      </Text>
    </Box>
  );
});

export function WindowChrome({ title, children, compact = false }: WindowChromeProps) {
  return (
    <Box
      data-testid="window-chrome"
      className="overflow-hidden rounded-2xl border border-white/20 bg-[#0c1018]/85 backdrop-blur-md"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.2)',
        background: 'rgba(12, 16, 24, 0.85)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <ChromeHeader title={title} />
      <Box sx={{ p: compact ? 1.5 : 2 }}>{children}</Box>
    </Box>
  );
}
