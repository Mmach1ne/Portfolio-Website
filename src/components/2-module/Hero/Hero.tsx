import { Button, Stack, Text } from '@/components/0-primitive';
import { site } from '@/content';
import { scrollToId } from '@/lib/scroll';

export function Hero() {
  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: '100vh',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        pt: '20vh',
      }}
    >
      <Text variant="display" component="h1">
        {site.hero.title}
      </Text>
      <Text variant="subtitle" component="p">
        {site.hero.subtitle}
      </Text>
      <Button variant="primary" onClick={() => scrollToId('about')}>
        {site.hero.cta}
      </Button>
    </Stack>
  );
}
