import { Box, Image, Text } from '@/components/0-primitive';

type SkillTileProps = {
  file: string;
  label: string;
};

export function SkillTile({ file, label }: SkillTileProps) {
  return (
    <Box
      data-testid="skill-tile"
      className="flex min-h-[120px] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white px-2 py-2 transition-transform duration-300 hover:-translate-y-1"
      sx={{ textAlign: 'center' }}
    >
      <Image src={`/Logos/${file}`} alt={label} width={80} height={80} />
      <Text variant="caption" component="span" sx={{ display: 'block', mt: 1 }}>
        {label}
      </Text>
    </Box>
  );
}
