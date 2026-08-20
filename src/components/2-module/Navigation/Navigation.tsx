'use client';

import { useEffect, useState } from 'react';
import { Box, Cluster, IconButton, Stack } from '@/components/0-primitive';
import { BrandMark, NavItem, SocialLinks } from '@/components/1-composition';
import { brandName, navItems, social } from '@/content';
import { useHashSection } from '@/hooks/useHashSection';
import { useMedia } from '@/hooks/useMedia';
import { scrollToId } from '@/lib/scroll';
import { AppBar, CloseIcon, Drawer, Link, MenuIcon, Toolbar, usePathname } from '@/vendor';

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useHashSection();
  const pathname = usePathname();
  const isMobile = useMedia('md');
  const onHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHashClick = (event: { preventDefault: () => void }, id: string) => {
    if (!onHome) return;
    event.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  const resolveHref = (item: (typeof navItems)[number]) => {
    if (item.kind === 'route') return item.href;
    return onHome ? item.href : `/${item.href}`;
  };

  const navLinks = navItems.map((item) => {
    if (item.kind === 'route') {
      return (
        <Link key={item.id} href={item.href} onClick={() => setOpen(false)}>
          {item.label}
        </Link>
      );
    }

    return (
      <NavItem
        key={item.id}
        label={item.label}
        href={resolveHref(item)}
        active={onHome && activeSection === item.id}
        onClick={(event) => handleHashClick(event, item.id)}
      />
    );
  });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'rgba(10, 10, 10, 0.6)',
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <BrandMark name={brandName} />
          {!isMobile ? <Cluster sx={{ gap: 3 }}>{navLinks}</Cluster> : null}
          {isMobile ? (
            <IconButton aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <BrandMark name={brandName} />
            <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Stack spacing={2}>{navLinks}</Stack>
          <Box sx={{ mt: 4 }}>
            <SocialLinks {...social} />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
