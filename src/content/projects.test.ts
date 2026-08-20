import { describe, expect, it } from 'vitest';
import { projects } from './projects';

const allowedHrefPattern = /^(\/coming-soon|\/|mailto:.+|https:.+|\/.*\.pdf)$/;

describe('projects content', () => {
  it('has unique ids', () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses allowed link href patterns', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.href).toMatch(allowedHrefPattern);
      }
    }
  });
});
