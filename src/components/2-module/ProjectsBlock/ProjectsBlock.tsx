import { Stack } from '@/components/0-primitive';
import { projects } from '@/content';
import { ProjectShowcase } from '../ProjectShowcase';

export function ProjectsBlock() {
  return (
    <Stack spacing={4}>
      {projects.map((project, index) => (
        <ProjectShowcase key={project.id} project={project} index={index} />
      ))}
    </Stack>
  );
}
