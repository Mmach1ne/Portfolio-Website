import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import MuiLink from '@mui/material/Link';
import NextLink from 'next/link';

export type LinkProps = MuiLinkProps;

function isInternalHref(href: MuiLinkProps['href']): href is string {
  return typeof href === 'string' && (href.startsWith('/') || href.startsWith('#'));
}

export function Link({ sx, href, ...props }: LinkProps) {
  const baseSx = {
    color: '#64ffda',
    fontFamily: 'Inter, system-ui, sans-serif',
    ...sx,
  };

  if (href && isInternalHref(href)) {
    return <MuiLink component={NextLink} href={href} underline="hover" sx={baseSx} {...props} />;
  }

  return <MuiLink href={href} underline="hover" sx={baseSx} {...props} />;
}
