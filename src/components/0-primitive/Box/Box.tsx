import { Box as VendorBox, type BoxProps as VendorBoxProps } from '@/vendor';

export type BoxProps = VendorBoxProps;

export function Box(props: BoxProps) {
  return <VendorBox {...props} />;
}
