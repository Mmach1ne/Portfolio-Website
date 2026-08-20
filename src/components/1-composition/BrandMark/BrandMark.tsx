import { Text } from '@/components/0-primitive';
import { tokens } from '@/theme';

type BrandMarkProps = {
  name: string;
};

export function BrandMark({ name }: BrandMarkProps) {
  return (
    <Text
      variant="title"
      component="span"
      sx={{ color: tokens.palette.accent, letterSpacing: '0.15em', fontSize: '1.1rem' }}
    >
      {name}
    </Text>
  );
}
