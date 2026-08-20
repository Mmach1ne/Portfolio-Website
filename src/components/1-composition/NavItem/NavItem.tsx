import { Link } from '@/components/0-primitive';
import { tokens } from '@/theme';

type NavItemProps = {
  label: string;
  href: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function NavItem({ label, href, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      sx={{
        color: active ? tokens.palette.accent : tokens.palette.text,
        textDecoration: 'none',
        position: 'relative',
        pb: 0.5,
        textShadow: active ? '0 0 12px rgba(100, 255, 218, 0.45)' : undefined,
        '&::after': active
          ? {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '2px',
              background: tokens.palette.accent,
            }
          : undefined,
      }}
    >
      {label}
    </Link>
  );
}
