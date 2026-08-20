import { useEffect, useState } from 'react';
import { IconButton } from '@/components/0-primitive';
import { scrollToId } from '@/lib/scroll';
import { ChevronDownIcon } from '@/vendor';

export function ScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const contact = document.getElementById('contact');
      if (!contact) return;
      const { top } = contact.getBoundingClientRect();
      setVisible(top > window.innerHeight * 0.75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <IconButton
      aria-label="Scroll to about section"
      onClick={() => scrollToId('about')}
      sx={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}
    >
      <ChevronDownIcon />
    </IconButton>
  );
}
