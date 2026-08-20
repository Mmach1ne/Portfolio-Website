import { Typography, type TypographyProps } from '@/vendor';
export type TextProps = TypographyProps;
export function Text(props: TextProps) {
  return <Typography {...props} />;
}
