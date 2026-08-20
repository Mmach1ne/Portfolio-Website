import { Button as VendorButton, type ButtonProps as VendorButtonProps } from '@/vendor';

export type ButtonProps = VendorButtonProps & {
  loadingText?: string;
  loading?: boolean;
};

export function Button({ loading, loadingText, children, disabled, ...props }: ButtonProps) {
  return (
    <VendorButton disabled={disabled || loading} {...props}>
      {loading ? (loadingText ?? children) : children}
    </VendorButton>
  );
}
