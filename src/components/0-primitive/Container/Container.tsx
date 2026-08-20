import {
  Container as VendorContainer,
  type ContainerProps as VendorContainerProps,
} from '@/vendor';

export type ContainerProps = VendorContainerProps;

export function Container(props: ContainerProps) {
  return <VendorContainer {...props} />;
}
