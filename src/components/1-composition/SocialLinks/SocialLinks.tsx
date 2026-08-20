import { Cluster, Icon, Link } from '@/components/0-primitive';
import { EmailIcon, GitHubIcon, LinkedInIcon } from '@/vendor';

type SocialLinksProps = {
  github: string;
  linkedin: string;
  email: string;
  sourceRepo?: string;
};

export function SocialLinks({ github, linkedin, email, sourceRepo }: SocialLinksProps) {
  return (
    <Cluster sx={{ gap: 2 }}>
      <Link href={github} external aria-label="GitHub profile">
        <Icon label="GitHub">
          <GitHubIcon />
        </Icon>
      </Link>
      <Link href={linkedin} external aria-label="LinkedIn profile">
        <Icon label="LinkedIn">
          <LinkedInIcon />
        </Icon>
      </Link>
      <Link href={`mailto:${email}`} external aria-label="Email">
        <Icon label="Email">
          <EmailIcon />
        </Icon>
      </Link>
      {sourceRepo ? (
        <Link href={sourceRepo} external aria-label="Portfolio source code">
          Source
        </Link>
      ) : null}
    </Cluster>
  );
}
