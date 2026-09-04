import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES,
  RELATIONSHIP_MONTHLY_MANDATORY_QUALIFIER,
  RELATIONSHIP_MONTHLY_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/relationship-monthly-narrative-profiles.js';
import {
  RELATIONSHIP_MONTHLY_TENSION_CLAIM_TYPE,
  RELATIONSHIP_MONTHLY_THEME_CLAIM_TYPE,
} from '../src/research/relationship-monthly-reading-candidate.js';

describe('MyeongHa Relationship Monthly narrative profiles', () => {
  it('provides twenty segmented themes plus eight bounded clash tensions', () => {
    expect(RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES).toHaveLength(28);
    expect(
      RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === RELATIONSHIP_MONTHLY_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(20);
    expect(
      RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === RELATIONSHIP_MONTHLY_TENSION_CLAIM_TYPE,
      ),
    ).toHaveLength(8);
    expect(
      new Set(
        RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES.flatMap(
          (profile) => profile.semanticKeys ?? [],
        ),
      ).size,
    ).toBe(28);
  });

  it('keeps every monthly profile future-tendency-only, method-attributed, and qualified', () => {
    for (const profile of RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(RELATIONSHIP_MONTHLY_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toBe(RELATIONSHIP_MONTHLY_PROHIBITED_FUTURE_PHRASES);
    }
  });

  it('renders both exact jeol segments without deterministic relationship-event promises', () => {
    const renderableCopy = RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => [
      profile.mandatoryQualifier ?? '',
      ...(profile.templates ?? []).map((template) => template.text),
    ]).join('\n');

    expect(renderableCopy).toContain('이번 달 절입 전 구간');
    expect(renderableCopy).toContain('이번 달 절입 이후 구간');
    for (const forbidden of RELATIONSHIP_MONTHLY_PROHIBITED_FUTURE_PHRASES) {
      expect(renderableCopy).not.toContain(forbidden);
    }
    expect(RELATIONSHIP_MONTHLY_MANDATORY_QUALIFIER).toContain('관계 결과를 확정하지 않습니다');
  });

  it('bounds clash narrative to communication, expectation, boundary, and pace adjustment', () => {
    const tensions = RELATIONSHIP_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
      (profile) => profile.claimType === RELATIONSHIP_MONTHLY_TENSION_CLAIM_TYPE,
    );
    const encoded = JSON.stringify(tensions);
    expect(encoded).toContain('소통 방식');
    expect(encoded).toContain('서로의 기대');
    expect(encoded).toContain('관계의 경계');
    expect(encoded).toContain('진행 속도');
    expect(encoded).toContain('특정 관계 사건의 예고로 확대하지 않고');
  });
});
