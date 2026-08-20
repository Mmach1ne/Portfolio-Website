import {
  IconButton as VendorIconButton,
  type IconButtonProps as VendorIconButtonProps,
} from '@/vendor';

export type IconButtonProps = VendorIconButtonProps;

export function IconButton(props: IconButtonProps) {
  return <VendorIconButton {...props} />;
}
