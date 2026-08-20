import { memo, type ReactNode } from 'react';
import { Box, Text } from '@/components/0-primitive';

type CodeBlockProps = {
  lines?: readonly string[];
  children?: ReactNode;
};

export const CodeBlock = memo(function CodeBlock({ lines, children }: CodeBlockProps) {
  return (
    <Box
      component="pre"
      data-testid="code-block"
      sx={{
        m: 0,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: '0.8rem',
        lineHeight: 1.5,
        color: '#cbd5e1',
      }}
    >
      {lines
        ? lines.map((line, index) => (
            // Index keys are intentional so duplicate lines keep distinct line numbers.
            // biome-ignore lint/suspicious/noArrayIndexKey: static code lines keyed by position
            <Box key={index} sx={{ display: 'flex', gap: 2 }}>
              <Text variant="code" component="span" sx={{ opacity: 0.5, minWidth: 24 }}>
                {index + 1}
              </Text>
              <Text variant="code" component="span">
                {line}
              </Text>
            </Box>
          ))
        : children}
    </Box>
  );
});
