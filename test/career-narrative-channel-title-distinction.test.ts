import { describe, expect, it } from 'vitest';
import type { ClaimNarrativeProfile } from '../src/contracts/narrative.js';
import {
  CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
  CAREER_NATAL_NARRATIVE_PROFILE_VERSION,
} from '../src/research/career-natal-narrative-profiles.js';

function templateText(profile: ClaimNarrativeProfile, templateKey: string): string {
  const template = profile.templates.find((candidate) => candidate.templateKey === templateKey);
  expect(template).toBeDefined();
  if (template === undefined) {
    throw new Error(`Missing ${templateKey} template for ${profile.claimType}.`);
  }
  return template.text;
}

describe('P7 Career narrative channel title distinction', () => {
  it('keeps every Career claim-profile section title distinct while preserving channel as existing semantics', () => {
    expect(CAREER_NATAL_NARRATIVE_PROFILE_VERSION).toBe('0.1.1-research');
    expect(CAREER_NATAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(20);

    const titles = CAREER_NATAL_CLAIM_NARRATIVE_PROFILES.map((profile) => ({
      claimType: profile.claimType,
      title: templateText(profile, 'headline'),
      summary: templateText(profile, 'summary'),
      semanticKeys: profile.semanticKeys,
    }));

    expect(new Set(titles.map((entry) => entry.title)).size).toBe(titles.length);

    for (const entry of titles) {
      expect(entry.semanticKeys).toContain('channel');
      if (entry.claimType.endsWith('_VISIBLE_STEMS')) {
        expect(entry.title).toMatch(/^겉으로 드러나는 업무 방식 — /);
        expect(entry.summary).toMatch(/^겉으로 드러나는 업무 방식에서 /);
        continue;
      }
      if (entry.claimType.endsWith('_BRANCHES')) {
        expect(entry.title).toMatch(/^일을 실제로 이어가는 바탕 — /);
        expect(entry.summary).toMatch(/^일을 실제로 이어가는 바탕에서 /);
        continue;
      }
      throw new Error(`Unexpected Career narrative claim type ${entry.claimType}.`);
    }
  });
});
