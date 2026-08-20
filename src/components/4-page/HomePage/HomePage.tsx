'use client';

import { About } from '@/components/2-module/About';
import { ContactForm } from '@/components/2-module/ContactForm';
import { Hero } from '@/components/2-module/Hero';
import { ProjectsBlock } from '@/components/2-module/ProjectsBlock';
import { ScrollHint } from '@/components/2-module/ScrollHint';
import { SiteFooter } from '@/components/2-module/SiteFooter';
import { HashSection } from '@/components/3-layout/HashSection';
import { PageBackdrop } from '@/components/3-layout/PageBackdrop';
import { SiteShell } from '@/components/3-layout/SiteShell';

export function HomePage() {
  return (
    <>
      <PageBackdrop />
      <SiteShell footer={<SiteFooter />}>
        <HashSection id="home" minHeight="100vh">
          <Hero />
        </HashSection>
        <HashSection id="about">
          <About />
        </HashSection>
        <HashSection id="projects">
          <ProjectsBlock />
        </HashSection>
        <HashSection id="contact">
          <ContactForm />
        </HashSection>
        <ScrollHint />
      </SiteShell>
    </>
  );
}
