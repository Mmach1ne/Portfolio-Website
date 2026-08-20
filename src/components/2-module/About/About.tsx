import { Box, Image, Text } from '@/components/0-primitive';
import { SectionHeading } from '@/components/1-composition';
import { site } from '@/content';
import { SkillsGrid } from '../SkillsGrid';

export function About() {
  return (
    <Box>
      <SectionHeading title={site.about.heading} />
      <Box className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
          <Image
            src={site.about.profileImage}
            alt={site.name}
            width={150}
            height={150}
            style={{ borderRadius: '50%' }}
          />
          <Text variant="body">{site.about.bio}</Text>
        </Box>
        <SkillsGrid />
      </Box>
    </Box>
  );
}
