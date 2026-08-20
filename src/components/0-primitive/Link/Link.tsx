import { Link as VendorLink, type LinkProps as VendorLinkProps } from '@/vendor';

export type LinkProps = VendorLinkProps & {
  external?: boolean;
};

export function Link({ external, href, target, rel, ...props }: LinkProps) {
  const isExternal =
    external ??
    (typeof href === 'string' && (href.startsWith('http') || href.startsWith('mailto:')));

  return (
    <VendorLink
      href={href ?? '#'}
      target={isExternal ? '_blank' : target}
      rel={isExternal ? 'noopener noreferrer' : rel}
      {...props}
    />
  );
}
