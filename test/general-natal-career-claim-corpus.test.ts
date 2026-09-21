import { describe, expect, it } from 'vitest';
import {
  R065_AUTHORITY,
  R065_CAREER_CLAIM_CORPUS_VERSION,
  R065_CLAIMS,
  R065_EXECUTION_GAPS,
  R065_REJECTED_JOB_MAPPINGS,
} from '../src/research/general-natal-career-claim-corpus.js';

describe('R065 career / official-status claim corpus', () => {
  it('preserves four distinct evidence/subject scopes', () => {
    expect(R065_CAREER_CLAIM_CORPUS_VERSION).toBe('0.1.0-research');
    expect(R065_CLAIMS).toHaveLength(4);
    expect(R065_CLAIMS).toEqual(expect.arrayContaining([
      expect.objectContaining({ evidenceClass: 'CONFIGURATION_LEVEL', subjectScope: 'NATIVE' }),
      expect.objectContaining({ evidenceClass: 'CASE_LEVEL', subjectScope: 'NATIVE' }),
      expect.objectContaining({ evidenceClass: 'ROLE_SCOPED', subjectScope: 'NATIVE_AS_OFFICIAL' }),
      expect.objectContaining({ evidenceClass: 'KIN_STATUS', subjectScope: 'RELATIVE' }),
    ]));
    expect(R065_CLAIMS.every((x) => x.modernOccupationClassAuthorized === false && x.executable === false)).toBe(true);
  });

  it('rejects one-symbol-to-one-modern-job mappings', () => {
    expect(R065_REJECTED_JOB_MAPPINGS).toContain('ZHENGGUAN_EQUALS_CIVIL_SERVANT');
    expect(R065_REJECTED_JOB_MAPPINGS).toContain('QISHA_EQUALS_MILITARY_POLICE_EXECUTIVE');
    expect(R065_REJECTED_JOB_MAPPINGS).toContain('ONE_TEN_GOD_ONE_JOB_FAMILY');
  });

  it('keeps historical translation and career outcome unresolved', () => {
    expect(R065_EXECUTION_GAPS).toContain('HISTORICAL_ROLE_TRANSLATION');
    expect(R065_EXECUTION_GAPS).toContain('MODERN_OCCUPATION_TAXONOMY');
    expect(R065_EXECUTION_GAPS).toContain('CAREER_OUTCOME_SETTLEMENT');
  });

  it('keeps the frontier research-only', () => {
    expect(R065_AUTHORITY).toEqual({
      status: 'VERIFIED_HISTORICAL_OFFICIAL_STATUS_CORPUS_ONLY',
      claimCount: 4,
      oneTenGodOneJobAuthorized: false,
      modernOccupationMappingAuthorized: false,
      guaranteedCareerOutcomeAuthorized: false,
      executableCareerClassifierAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
