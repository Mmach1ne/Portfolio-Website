export type HashNavItem = {
  id: 'home' | 'about' | 'projects' | 'contact';
  label: string;
  href: string;
  kind: 'hash';
};

export type RouteNavItem = {
  id: 'blog';
  label: string;
  href: string;
  kind: 'route';
};

export type NavItem = HashNavItem | RouteNavItem;

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home', kind: 'hash' },
  { id: 'about', label: 'About', href: '#about', kind: 'hash' },
  { id: 'projects', label: 'Projects', href: '#projects', kind: 'hash' },
  { id: 'contact', label: 'Contact', href: '#contact', kind: 'hash' },
  { id: 'blog', label: 'Blog', href: '/blog', kind: 'route' },
];

export const brandName = 'RAY XUE';
