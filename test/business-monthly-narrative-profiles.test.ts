import { describe, expect, it } from 'vitest';
import {
  BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES,
  BUSINESS_MONTHLY_MANDATORY_QUALIFIER,
  BUSINESS_MONTHLY_PROHIBITED_FUTURE_PHRASES,
} from '../src/research/business-monthly-narrative-profiles.js';
import {
  BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
  BUSINESS_MONTHLY_THEME_CLAIM_TYPE,
} from '../src/research/business-monthly-reading-candidate.js';

describe('MyeongHa Business Monthly narrative profiles', () => {
  it('provides twenty segment-specific themes plus eight bounded clash tensions', () => {
    expect(BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES).toHaveLength(28);
    expect(
      BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === BUSINESS_MONTHLY_THEME_CLAIM_TYPE,
      ),
    ).toHaveLength(20);
    expect(
      BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
        (profile) => profile.claimType === BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
      ),
    ).toHaveLength(8);
    expect(
      new Set(BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => profile.semanticKeys ?? [])).size,
    ).toBe(28);
  });

  it('keeps every monthly profile future-tendency-only, method-attributed, qualified, and non-advisory', () => {
    for (const profile of BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES) {
      expect(profile.allowedEpistemicTypes).toEqual(['future_tendency']);
      expect(profile.requiredMethodAttribution).toBe(true);
      expect(profile.mandatoryQualifier).toBe(BUSINESS_MONTHLY_MANDATORY_QUALIFIER);
      expect(profile.prohibitedPhrases).toBe(BUSINESS_MONTHLY_PROHIBITED_FUTURE_PHRASES);
    }
    expect(BUSINESS_MONTHLY_MANDATORY_QUALIFIER).toContain(
      '사업 결과를 확정하거나 재무 조언을 제공하지 않습니다',
    );
  });

  it('preserves both before/after jeol labels in governed copy', () => {
    const encoded = JSON.stringify(BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES);
    expect(encoded).toContain('이번 달 절입 전 구간');
    expect(encoded).toContain('이번 달 절입 이후 구간');
  });

  it('contains no deterministic business-outcome promises in governed templates', () => {
    const renderableCopy = BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES.flatMap((profile) => [
      profile.mandatoryQualifier ?? '',
      ...(profile.templates ?? []).map((template) => template.text),
    ]).join('\n');
    for (const forbidden of BUSINESS_MONTHLY_PROHIBITED_FUTURE_PHRASES) {
      expect(renderableCopy).not.toContain(forbidden);
    }
  });

  it('bounds clash narrative to decision rights, allocation, coordination, and operating cadence', () => {
    const tensions = BUSINESS_MONTHLY_CLAIM_NARRATIVE_PROFILES.filter(
      (profile) => profile.claimType === BUSINESS_MONTHLY_TENSION_CLAIM_TYPE,
    );
    const encoded = JSON.stringify(tensions);
    expect(encoded).toContain('결정권');
    expect(encoded).toContain('자원 배분');
    expect(encoded).toContain('파트너 및 팀 조율');
    expect(encoded).toContain('운영 속도');
    expect(encoded).toContain('특정 사건의 예고로 확대하지 않고');
  });
});
