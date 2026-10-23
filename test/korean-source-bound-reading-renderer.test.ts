import { describe, expect, it } from 'vitest';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import {
  planReadingLocalizationV1,
  renderReadingOnDemandV1,
} from '../src/reading/reading-localization.js';
import {
  KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
  renderExistingKoreanReadingOnDemandV1,
} from '../src/reading/korean-source-bound-reading-renderer.js';

const HEADLINE = '이 명식에서 확인한 두 십신의 구조';
const SUMMARY = '기존 한국어 원문에 따르면 서로 다른 두 십신의 관점을 함께 읽습니다.';
const QUALIFIER = '미래의 특정 사건이나 결과를 확정하지 않습니다.';

function claim(options: { source?: boolean; text?: boolean } = {}): InterpretationClaim {
  return {
    claimId: 'claim-career-context-source',
    schemaVersion: 'test',
    snapshotId: 'snapshot-career-1',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'bounded_context' },
    claimType: 'CAREER_SOURCE_BOUNDED',
    subject: 'natal_chart',
    predicate: 'career_context',
    value: {
      ...(options.text === false ? {} : { headline: HEADLINE, summary: SUMMARY }),
      futureOutcomeAuthorized: false,
    },
    methodologyRef: { id: 'M-CAREER-SOURCE', version: '1' },
    ruleRefs: [{ ruleId: 'R-CAREER-SOURCE', version: '1', evaluationId: 'eval-1' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: options.source === false ? [] : ['SRC-CAREER-TRADITION'],
    state: 'active',
  };
}

function bundle(options: {
  source?: boolean;
  text?: boolean;
  admittedText?: boolean;
  qualifierText?: boolean;
} = {}): CanonicalReadingSemanticBundleV1 {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'read-career-1',
    purpose: 'section_reading',
    snapshotId: 'snapshot-career-1',
    interpretationRunId: 'interpretation-career-1',
    registrySnapshotId: 'registry-career-1',
    canonicalFacts: [],
    claims: [claim(options)],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  const provenance = {
    admissionId: 'admitted-career-text',
    admissionRegistryVersion: '1',
    researchId: 'career-research',
    researchVersion: '1',
    authorityState: 'research',
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'career', temporalScope: 'natal' },
    evidence,
    targetClaimIds: ['claim-career-context-source'],
    ...(options.admittedText === true ? {
      semanticTextBindings: [{
        targetClaimId: 'claim-career-context-source',
        canonicalText: { headline: HEADLINE, summary: SUMMARY },
        provenance,
      }],
    } : {}),
    semanticQualifierBindings: [{
      targetClaimId: 'claim-career-context-source',
      qualifier: {
        qualifierId: 'qualifier-no-future-claims',
        kind: 'boundary',
        semanticScope: 'career:natal',
        semanticKeys: ['career_context'],
        ...(options.qualifierText === false ? {} :
          { canonicalText: { summary: QUALIFIER } }),
        prohibitedExtensions: ['futureOutcomeAuthorized'],
        provenance,
      },
    }],
  });
}

describe('E-3: exact existing Korean source text on demand', () => {
  it('preserves original Korean Claim/qualifier word-for-word with internal-only authority', async () => {
    const semantics = bundle();
    const original = semantics.units.find(unit => unit.role === 'primary')!;
    const result = await renderExistingKoreanReadingOnDemandV1(
      semantics, 'authorized-subject:request:revision',
    );
    expect(result.state).toBe('internal_preview_only');
    expect(result.locale).toBe('ko-KR');
    expect(result.semanticHash).toBe(semantics.semanticHash);
    expect(result.units).toEqual([{
      unitId: original.unitId,
      claimId: original.claimId,
      text: HEADLINE + '\n' + SUMMARY,
      qualifiers: [{ qualifierId: 'qualifier-no-future-claims', text: QUALIFIER }],
    }]);
    expect(result.constraints).toMatchObject({
      mayRecalculate: false,
      mayGenerateClaims: false,
      mayDropRequiredQualifiers: false,
      mayPromoteResearchAuthority: false,
      mayExposeInternalIdsToConsumers: false,
      mayFallbackToAnotherLocale: false,
    });
    expect('reading' in result).toBe(false);
    expect('mayPublish' in result).toBe(false);
    expect('maySell' in result).toBe(false);
  });

  it('also reuses externally admitted Korean copy when the original Claim has no narrative text', async () => {
    const semantics = bundle({ text: false, admittedText: true });
    const original = semantics.units.find(unit => unit.role === 'primary')!;
    expect(original.canonicalTextProvenance?.authorityState).toBe('research');
    const internal = await renderExistingKoreanReadingOnDemandV1(
      semantics, 'authorized-subject:request:revision',
    );
    expect(internal.units[0]?.text).toBe(HEADLINE + '\n' + SUMMARY);
    expect(internal.units[0]?.qualifiers[0]?.text).toBe(QUALIFIER);
    expect(internal.state).toBe('internal_preview_only');
  });

  it('does not invent missing narrative, missing qualifier or a source-free interpretation', async () => {
    await expect(renderExistingKoreanReadingOnDemandV1(
      bundle({ text: false }), 'subject:request',
    )).rejects.toThrow('cannot generate missing Korean meaning');
    await expect(renderExistingKoreanReadingOnDemandV1(
      bundle({ qualifierText: false }), 'subject:request',
    )).rejects.toThrow('required qualifier');
    await expect(renderExistingKoreanReadingOnDemandV1(
      bundle({ source: false }), 'subject:request',
    )).rejects.toThrow('exact sourced');
  });

  it('does not change the underlying Claim on repeated Korean rendering or scope change', async () => {
    const semantics = bundle();
    const first = await renderExistingKoreanReadingOnDemandV1(semantics, 'subject-A:request-A');
    const replay = await renderExistingKoreanReadingOnDemandV1(semantics, 'subject-A:request-A');
    const other = await renderExistingKoreanReadingOnDemandV1(semantics, 'subject-B:request-A');
    expect(first).toEqual(replay);
    expect(first.units).toEqual(other.units);
    expect(first.contentHash).not.toBe(other.contentHash);
    expect(first.cacheKey).not.toBe(other.cacheKey);
    expect(first.semanticHash).toBe(other.semanticHash);
    expect(first.units[0]?.text).toBe(HEADLINE + '\n' + SUMMARY);
  });

  it('rejects non-Korean locale and mismatched policy without trying translation', async () => {
    const semantics = bundle();
    await expect(renderReadingOnDemandV1(
      semantics,
      { readingLocale: 'en-US', uiLocale: 'ko-KR' },
      'subject:request',
      KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
    )).rejects.toThrow('No registered renderer');
    expect(() => planReadingLocalizationV1(
      semantics, {}, '', KOREAN_SOURCE_BOUND_READING_RENDERER_V1,
    )).toThrow('requestScopeKey');
    await expect(renderExistingKoreanReadingOnDemandV1({
      ...semantics,
      semanticHash: '0'.repeat(64),
    }, 'subject:request')).rejects.toThrow('semanticHash');
  });
});
