import { describe, expect, it, vi } from 'vitest';
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
  resolveReadingLocaleV1,
  type ReadingLocalizationRendererV1,
} from '../src/reading/reading-localization.js';

function claim(): InterpretationClaim {
  return {
    claimId: 'claim-career-limited',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'bounded_context' },
    claimType: 'CAREER_CONTEXT_BOUNDED',
    subject: 'natal_chart',
    predicate: 'career_context',
    value: {
      headline: '확인된 직업 맥락',
      summary: '승인된 구조만 설명합니다.',
      predictsEmploymentAuthorized: false,
    },
    methodologyRef: { id: 'method-career', version: '1' },
    ruleRefs: [{ ruleId: 'rule-career', version: '1', evaluationId: 'eval-career' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-career'],
    state: 'active',
  };
}

function semantics(): CanonicalReadingSemanticBundleV1 {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    requestId: 'question-scope-A',
    purpose: 'section_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'interpretation-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [claim()],
    claimRelations: [],
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    constraints: {
      mayRecalculate: false,
      mayInventRules: false,
      mustPreserveMethodDifferences: true,
      mustDiscloseMaterialAmbiguity: true,
    },
  };
  return buildCanonicalReadingSemanticBundleV1({
    intent: { domain: 'career', temporalScope: 'natal' },
    evidence,
    targetClaimIds: ['claim-career-limited'],
    semanticQualifierBindings: [{
      targetClaimId: 'claim-career-limited',
      qualifier: {
        qualifierId: 'qualifier-no-future-events',
        kind: 'boundary',
        semanticScope: 'career:natal',
        semanticKeys: ['career_context'],
        canonicalText: { summary: '취업 시기를 예측하지 않습니다.' },
        prohibitedExtensions: ['predictsEmploymentAuthorized'],
        provenance: {
          admissionId: 'admission-1',
          admissionRegistryVersion: '1',
          researchId: 'research-1',
          researchVersion: '1',
          authorityState: 'research',
        },
      },
    }],
  });
}

function renderer(locale: ReadingLocalizationRendererV1['locale'] = 'ko-KR') {
  const render = vi.fn(async ({ plan }: { plan: ReturnType<typeof planReadingLocalizationV1> }) =>
    plan.primaryUnits.map((unit) => ({
      unitId: unit.unitId,
      claimId: unit.claimId,
      text: '확인된 구조만 설명합니다.',
      qualifiers: unit.qualifierIds.map((qualifierId) => ({
        qualifierId,
        text: '이 결과는 시기를 예측하지 않습니다.',
      })),
    })),
  );
  const adapter: ReadingLocalizationRendererV1 = {
    locale,
    rendererVersion: 'renderer-1',
    glossaryVersion: 'glossary-1',
    render,
  };
  return { adapter, render };
}

describe('On-demand multilingual reading contract', () => {
  it('selects explicit reading language before account/UI and rejects unsupported identifiers', () => {
    expect(resolveReadingLocaleV1({
      readingLocale: 'vi-VN',
      accountLocale: 'ja-JP',
      uiLocale: 'ko-KR',
    })).toBe('vi-VN');
    expect(resolveReadingLocaleV1({ accountLocale: 'ms-MY', uiLocale: 'en-US' }))
      .toBe('ms-MY');
    expect(resolveReadingLocaleV1({ uiLocale: 'id-ID' })).toBe('id-ID');
    expect(resolveReadingLocaleV1({})).toBe('ko-KR');
    expect(() => resolveReadingLocaleV1({ readingLocale: 'en' })).toThrow(RangeError);
    expect(() => resolveReadingLocaleV1({ readingLocale: 'fr-FR' })).toThrow(RangeError);
  });

  it('preserves semantic identity while changing only locale-specific cache identity', () => {
    const source = semantics();
    const korean = planReadingLocalizationV1(source, { readingLocale: 'ko-KR' }, 'subject-A:request-1', renderer().adapter);
    const japanese = planReadingLocalizationV1(source, { readingLocale: 'ja-JP' }, 'subject-A:request-1', renderer('ja-JP').adapter);
    expect(korean.semanticHash).toBe(source.semanticHash);
    expect(japanese.semanticHash).toBe(source.semanticHash);
    expect(japanese.cacheKey).not.toBe(korean.cacheKey);
    expect(planReadingLocalizationV1(source, {}, 'subject-A:request-1', renderer().adapter).cacheKey)
      .toBe(korean.cacheKey);
    expect(planReadingLocalizationV1(source, {}, 'subject-B:request-1', renderer().adapter).cacheKey)
      .not.toBe(korean.cacheKey);
    expect(planReadingLocalizationV1(source, {}, 'subject-A:request-2', renderer().adapter).cacheKey)
      .not.toBe(korean.cacheKey);
    expect(planReadingLocalizationV1(source, {}, 'subject-A:request-1', {
      ...renderer().adapter, glossaryVersion: 'glossary-2',
    }).cacheKey).not.toBe(korean.cacheKey);
  });

  it('runs only the selected renderer and retains primary claims, qualifiers and internal-only scope', async () => {
    const source = semantics();
    const selected = renderer('vi-VN');
    const other = renderer('ja-JP');
    const result = await renderReadingOnDemandV1(
      source, { uiLocale: 'ko-KR', readingLocale: 'vi-VN' }, 'subject-A:request-1', selected.adapter,
    );
    expect(selected.render).toHaveBeenCalledTimes(1);
    expect(other.render).not.toHaveBeenCalled();
    expect(result.locale).toBe('vi-VN');
    expect(result.state).toBe('internal_preview_only');
    expect(result.units.map((unit) => unit.claimId)).toEqual(['claim-career-limited']);
    expect(result.units[0]?.qualifiers[0]?.qualifierId).toBe('qualifier-no-future-events');
    expect(result.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(result.constraints.mayExposeInternalIdsToConsumers).toBe(false);
  });

  it('fails closed on renderer mismatch, missing scope and damaged semantic evidence', async () => {
    const source = semantics();
    const selected = renderer('ja-JP');
    await expect(renderReadingOnDemandV1(source, { readingLocale: 'ko-KR' }, 'scope', selected.adapter))
      .rejects.toThrow(RangeError);
    expect(selected.render).not.toHaveBeenCalled();
    expect(() => planReadingLocalizationV1(source, {}, '  ', renderer().adapter))
      .toThrow(TypeError);
    expect(() => planReadingLocalizationV1({
      ...source, semanticHash: 'tampered',
    }, {}, 'scope', renderer().adapter)).toThrow(TypeError);
  });

  it('rejects invented claims, missing qualifiers and duplicate primary results', async () => {
    const source = semantics();
    const base = renderer();
    const legitimate = (await base.adapter.render({
      semantics: source,
      plan: planReadingLocalizationV1(source, {}, 'scope', base.adapter),
    }))[0];
    if (legitimate === undefined) throw new Error('Test fixture requires an output unit');

    const broken = (units: readonly typeof legitimate[]) => ({
      ...base.adapter,
      render: async () => units,
    });
    await expect(renderReadingOnDemandV1(source, {}, 'scope', broken([{
      ...legitimate, claimId: 'invented-claim',
    }]))).rejects.toThrow(TypeError);
    await expect(renderReadingOnDemandV1(source, {}, 'scope', broken([{
      ...legitimate, qualifiers: [],
    }]))).rejects.toThrow(TypeError);
    await expect(renderReadingOnDemandV1(source, {}, 'scope', broken([
      legitimate, legitimate,
    ]))).rejects.toThrow(TypeError);
    await expect(renderReadingOnDemandV1(source, {}, 'scope', broken([{
      ...legitimate, text: ' ',
    }]))).rejects.toThrow(TypeError);
  });

  it('does not silently change language or swallow a rendering failure', async () => {
    const adapter: ReadingLocalizationRendererV1 = {
      ...renderer('id-ID').adapter,
      render: () => { throw new Error('renderer failed'); },
    };
    await expect(renderReadingOnDemandV1(
      semantics(), { readingLocale: 'id-ID' }, 'scope', adapter,
    )).rejects.toThrow('renderer failed');
  });
});
