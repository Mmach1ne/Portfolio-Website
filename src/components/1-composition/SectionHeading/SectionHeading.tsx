import { Box, Text } from '@/components/0-primitive';
import { tokens } from '@/theme';

type SectionHeadingProps = {
  title: string;
  underline?: boolean;
};

export function SectionHeading({ title, underline = false }: SectionHeadingProps) {
  return (
    <Box sx={{ position: 'relative', mb: 4 }}>
      <Text variant="title" component="h2">
        {title}
      </Text>
      {underline ? (
        <Box
          sx={{
            width: 60,
            height: 3,
            bgcolor: tokens.palette.accent,
            mt: 1,
          }}
        />
      ) : null}
    </Box>
  );
}
