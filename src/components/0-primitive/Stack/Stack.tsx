import { Stack as VendorStack, type StackProps as VendorStackProps } from '@/vendor';

export type StackProps = VendorStackProps;

export function Stack(props: StackProps) {
  return <VendorStack {...props} />;
}
