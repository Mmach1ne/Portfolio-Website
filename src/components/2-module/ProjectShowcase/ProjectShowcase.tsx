'use client';

import { type ComponentType, memo, Suspense } from 'react';
import { Box, Button, Cluster, Link, Stack, Text } from '@/components/0-primitive';
import { SectionHeading } from '@/components/1-composition';
import type { Project } from '@/content';
import { useMedia } from '@/hooks/useMedia';
import { useRouter } from '@/vendor/router';
import { getProjectVisual } from '../projectVisuals';

type ProjectShowcaseProps = {
  project: Project;
  index?: number;
};

function linkVariant(kind: Project['links'][number]['kind']): 'primary' | 'secondary' | 'demo' {
  if (kind === 'demo') return 'demo';
  if (kind === 'github' || kind === 'pdf') return 'secondary';
  return 'primary';
}

const VisualFrame = memo(function VisualFrame({ Visual }: { Visual: ComponentType }) {
  const isCompact = useMedia('md');

  return (
    <Box className={`min-w-0 ${isCompact ? 'min-h-[220px]' : ''}`}>
      <Suspense fallback={<Box sx={{ minHeight: isCompact ? 220 : 240 }} />}>
        <Visual />
      </Suspense>
    </Box>
  );
});

const ProjectCopy = memo(function ProjectCopy({
  project,
  copyFirst,
}: {
  project: Project;
  copyFirst: boolean;
}) {
  const router = useRouter();

  const handleLinkClick = (href: string, kind: Project['links'][number]['kind']) => {
    if (kind === 'comingSoon') {
      router.push(href);
    }
  };

  return (
    <Stack
      spacing={2}
      data-testid="project-showcase-copy"
      className={`min-w-0 ${copyFirst ? 'md:order-first' : ''}`}
    >
      <Text variant="title" component="h3">
        {project.title}
      </Text>
      <Text variant="subtitle" component="h4">
        {project.subtitle}
      </Text>
      <Text variant="body">{project.description}</Text>
      <Cluster>
        {project.tech.map((item) => (
          <Text
            key={item}
            variant="caption"
            sx={{
              px: 1.5,
              py: 0.5,
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 1,
              transition: 'border-color 160ms ease, color 160ms ease',
              '&:hover': {
                borderColor: '#64ffda',
                color: '#64ffda',
              },
            }}
          >
            {item}
          </Text>
        ))}
      </Cluster>
      <Cluster>
        {project.links.map((link) => {
          if (link.kind === 'comingSoon') {
            return (
              <Button
                key={link.label}
                variant="secondary"
                onClick={() => handleLinkClick(link.href, link.kind)}
              >
                {link.label}
              </Button>
            );
          }

          if (link.kind === 'pdf') {
            return (
              <Link key={link.label} href={link.href} download>
                <Button variant={linkVariant(link.kind)} component="span">
                  {link.label}
                </Button>
              </Link>
            );
          }

          return (
            <Link key={link.label} href={link.href} external>
              <Button variant={linkVariant(link.kind)} component="span">
                {link.label}
              </Button>
            </Link>
          );
        })}
      </Cluster>
    </Stack>
  );
});

export const ProjectShowcase = memo(function ProjectShowcase({
  project,
  index = 0,
}: ProjectShowcaseProps) {
  const Visual = getProjectVisual(project.visual);
  const copyFirst = index % 2 === 1;

  return (
    <Box sx={{ py: 6 }}>
      {project.showProjectsHeading ? <SectionHeading title="Projects" /> : null}
      <Box
        data-testid="project-showcase"
        className="rounded-3xl border border-white/15 bg-[#0a0a0a]/75 p-5 backdrop-blur-md md:p-8"
        sx={{
          borderRadius: 3,
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(10, 10, 10, 0.75)',
          backdropFilter: 'blur(14px)',
          p: { xs: 2.5, md: 4 },
        }}
      >
        <Box
          data-testid="project-showcase-grid"
          className="grid grid-cols-1 items-center gap-8 md:grid-cols-2"
        >
          <VisualFrame Visual={Visual} />
          <ProjectCopy project={project} copyFirst={copyFirst} />
        </Box>
      </Box>
    </Box>
  );
});
