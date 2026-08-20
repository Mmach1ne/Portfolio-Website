import { Box } from '@/components/0-primitive';
import { SkillTile } from '@/components/1-composition';
import { skills } from '@/content';

export function SkillsGrid() {
  return (
    <Box className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {skills.map((skill) => (
        <SkillTile key={skill.label} file={skill.file} label={skill.label} />
      ))}
    </Box>
  );
}
