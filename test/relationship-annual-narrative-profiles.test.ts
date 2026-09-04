import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES,
  RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER,
  RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/relationship-annual-narrative-profiles.js';
import {
  RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
  RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
} from '../src/research/relationship-annual-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES,
  RELATIONSHIP_NATAL_PROHIBITED_OUTCOME_PHRASES,
} from '../src/research/relationship-natal-narrative-profiles.js';
import { RELATIONSHIP_NATAL_READING_RULES } from '../src/research/relationship-natal-reading-candidate.js';

describe('MyeongHa Relationship Annual narrative profiles', () => {
  it('covers every Relationship Natal claim with bounded interpretation copy', () => {
    expect(RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(
      RELATIONSHIP_NATAL_READING_RULES.length,
    );
    expect(
      RELATIONSHIP_NATAL_CLAIM_NARRATIVE_PROFILES.every(
        (profile) =>
          profile.allowedEpistemicTypes.length === 1 &&
          profile.allowedEpistemicTypes[0] === 'interpretation' &&
          profile.requiredMethodAttribution === true &&
          profile.prohibitedPhrases === RELATIONSHIP_NATAL_PROHIBITED_OUTCOME_PHRASES,
      ),
    ).toBe(true);
  });

  it('provides ten semantic-specific annual themes plus four bounded clash tensions', () => {
    expect(RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(14);
    expect(
      RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === RELATIONSHIP_ANNUAL_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(10);
    expect(
      RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
      ),
    ).toHaveLength(4);
    expect(
      new Set(
        RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES.flatMap(
          (profile) => profile.semanticKeys ?? [],
        ),
      ).size,
    ).toBe(14);
  });

  it('keeps every annual profile future-tendency-only, method-attributed, and qualified', () => {
    for (const profile of RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toBe(RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES);
    }
  });

  it('contains no deterministic relationship-event promises in governed templates', () => {
    const renderableCopy = RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => [
      profile.mandatoryQualifier ?? '',
      ...profile.templates.map((template) => template.text),
    ]).join('\n');
    for (const forbidden of RELATIONSHIP_ANNUAL_PROHIBITED_FUTURE_PHRASES) {
      expect(renderableCopy).not.toContain(forbidden);
    }
    expect(RELATIONSHIP_ANNUAL_MANDATORY_QUALIFIER).toContain('관계 결과를 확정하지 않습니다');
  });

  it('bounds clash narrative to communication, expectation, boundary, and pace adjustment', () => {
    const tensions = RELATIONSHIP_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
      (profile) => profile.claimType === RELATIONSHIP_ANNUAL_TENSION_CLAIM_TYPE,
    );
    const encoded = JSON.stringify(tensions);
    expect(encoded).toContain('소통 방식');
    expect(encoded).toContain('서로의 기대');
    expect(encoded).toContain('관계의 경계');
    expect(encoded).toContain('진행 속도');
    expect(encoded).toContain('특정 관계 사건의 예고로 확대하지 않고');
  });
});
