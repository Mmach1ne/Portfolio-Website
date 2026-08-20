import { Box, IconButton, Text } from '@/components/0-primitive';
import { SocialLinks } from '@/components/1-composition';
import { site, social } from '@/content';

export function SiteFooter() {
  return (
    <Box sx={{ textAlign: 'center', py: 4, position: 'relative', zIndex: 20 }}>
      <IconButton
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </IconButton>
      <Box sx={{ my: 2 }}>
        <SocialLinks {...social} />
      </Box>
      <Text variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.6 }}>
        Planet textures: Solar System Scope (CC BY 4.0) · See /textures/ATTRIBUTION.md
      </Text>
      <Text variant="caption">
        {site.name} ©{site.copyrightYear}
      </Text>
    </Box>
  );
}
