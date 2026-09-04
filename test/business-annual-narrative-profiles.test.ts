import { describe, expect, it } from 'vitest';
import {
  BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES,
  BUSINESS_ANNUAL_MANDATORY_QUALIFIER,
  BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/business-annual-narrative-profiles.js';
import {
  BUSINESS_ANNUAL_TENSION_CLAIM_TYPE,
  BUSINESS_ANNUAL_THEME_CLAIM_TYPE,
} from '../src/research/business-annual-reading-candidate.js';
import {
  BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES,
  BUSINESS_NATAL_PROHIBITED_OUTCOME_PHRASES,
} from '../src/research/business-natal-narrative-profiles.js';
import { BUSINESS_NATAL_READING_RULES } from '../src/research/business-natal-reading-candidate.js';

describe('MyeongHa Business Annual narrative profiles', () => {
  it('covers every Business Natal claim with bounded interpretation copy', () => {
    expect(BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(BUSINESS_NATAL_READING_RULES.length);
    expect(
      BUSINESS_NATAL_CLAIM_NARRATIVE_PROFILES.every(
        (profile) =>
          profile.allowedEpistemicTypes.length === 1 &&
          profile.allowedEpistemicTypes[0] === 'interpretation' &&
          profile.requiredMethodAttribution === true &&
          profile.prohibitedPhrases === BUSINESS_NATAL_PROHIBITED_OUTCOME_PHRASES,
      ),
    ).toBe(true);
  });

  it('provides ten semantic-specific annual themes plus four bounded clash tensions', () => {
    expect(BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES).toHaveLength(14);
    expect(
      BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === BUSINESS_ANNUAL_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(10);
    expect(
      BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === BUSINESS_ANNUAL_TENSION_CLAIM_TYPE,
      ),
    ).toHaveLength(4);
    expect(
      new Set(BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => profile.semanticKeys ?? [])).size,
    ).toBe(14);
  });

  it('keeps every annual profile future-tendency-only, method-attributed, qualified, and non-advisory', () => {
    for (const profile of BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(BUSINESS_ANNUAL_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toBe(BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES);
    }
    expect(BUSINESS_ANNUAL_MANDATORY_QUALIFIER).toContain('사업 결과를 확정하거나 재무 조언을 제공하지 않습니다');
  });

  it('contains no deterministic business-outcome promises in governed templates', () => {
    const renderableCopy = BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => [
      profile.mandatoryQualifier ?? '',
      ...(profile.templates ?? []).map((template) => template.text),
    ]).join('\n');
    for (const forbidden of BUSINESS_ANNUAL_PROHIBITED_FUTURE_PHRASES) {
      expect(renderableCopy).not.toContain(forbidden);
    }
  });

  it('bounds clash narrative to decision rights, allocation, coordination, and operating cadence', () => {
    const tensions = BUSINESS_ANNUAL_CLAIM_NARRATIVE_PROFILES.filter(
      (profile) => profile.claimType === BUSINESS_ANNUAL_TENSION_CLAIM_TYPE,
    );
    const encoded = JSON.stringify(tensions);
    expect(encoded).toContain('결정권');
    expect(encoded).toContain('자원 배분');
    expect(encoded).toContain('파트너 및 팀 조율');
    expect(encoded).toContain('운영 속도');
    expect(encoded).toContain('특정 사건의 예고로 확대하지 않고');
  });
});
