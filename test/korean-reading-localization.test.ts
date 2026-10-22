import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type { InterpretationClaim } from '../src/contracts/interpretation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createI7SeasonalSupportRegistry } from '../src/research/i7-seasonal-support-pack.js';
import { requestProductReading } from '../src/reading/product-reading-service.js';
import type { ReadingArtifact } from '../src/contracts/reading.js';
import {
  buildCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from '../src/reading/canonical-reading-semantics.js';
import {
  GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
  type GovernedReadingEvidenceBundleV1,
} from '../src/reading/governed-reading-evidence.js';
import {
  createKoreanSourceBoundRendererV1,
  preserveExistingKoreanReadingResponseV1,
  renderKoreanSourceBoundOnDemandV1,
  runExistingKoreanReadingLocalizedV1,
} from '../src/reading/korean-reading-localization.js';
import type { ProductReadingDeliveryResult } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';

function claim(withText = true): InterpretationClaim {
  return {
    claimId: 'claim-career-1',
    schemaVersion: 'test',
    snapshotId: 'snapshot-1',
    taxonomy: { tier: 'T8', category: 'career', subcategory: 'bounded' },
    claimType: 'CAREER_NATAL_BOUNDED_TEST',
    subject: 'natal_chart',
    predicate: 'career_context',
    value: {
      ...(withText
        ? { headline: '직업의 구조적 맥락', summary: '원국에서 확인된 구조만 설명합니다.' }
        : { boundedObservation: true }),
      predictsCareerSuccessAuthorized: false,
    },
    methodologyRef: { id: 'method-career', version: '1' },
    ruleRefs: [{ ruleId: 'rule-career', version: '1', evaluationId: 'eval-career' }],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-career'],
    state: 'active',
  };
}

function semantics(withText = true, withQualifierText = true): CanonicalReadingSemanticBundleV1 {
  const evidence: GovernedReadingEvidenceBundleV1 = {
    schemaVersion: GOVERNED_READING_EVIDENCE_SCHEMA_VERSION,
    requestId: 'request-1',
    purpose: 'section_reading',
    snapshotId: 'snapshot-1',
    interpretationRunId: 'run-1',
    registrySnapshotId: 'registry-1',
    canonicalFacts: [],
    claims: [claim(withText)],
    claimRelations: [],
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
    targetClaimIds: ['claim-career-1'],
    semanticQualifierBindings: [{
      targetClaimId: 'claim-career-1',
      qualifier: {
        qualifierId: 'boundary-1',
        kind: 'boundary',
        semanticScope: 'career:natal',
        semanticKeys: ['career_context'],
        ...(withQualifierText
          ? { canonicalText: { summary: '취업 결과를 예측하지 않습니다.' } }
          : {}),
        prohibitedExtensions: ['predictsCareerSuccessAuthorized'],
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

function artifact(): ReadingArtifact {
  return {
    readingId: 'reading-1',
    schemaVersion: 'private-schema',
    status: 'ready',
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      birthInputDisplay: {
        calendarType: 'solar',
        date: '2000-01-01',
        timeKnown: false,
      },
      calculationState: 'partially_ambiguous',
    },
    calculationSummary: {
      pillars: {
        year: { label: '년주', value: '경진', status: 'resolved' },
        month: { label: '월주', value: '정축', status: 'resolved' },
        day: { label: '일주', value: '갑자', status: 'resolved' },
        hour: { label: '시주', status: 'unavailable' },
      },
    },
    sections: [{
      sectionId: 'secret-section',
      sectionType: 'career',
      title: '직업·커리어',
      blocks: [
        { type: 'paragraph', text: '근거가 확인된 범위만 설명합니다.' },
        { type: 'source_hint', text: '근거를 확인할 수 있습니다.', explainabilityRef: 'private-explain' },
      ],
      state: 'partial',
      explainabilityRefs: ['private-explain'],
    }],
    disclosures: [{
      disclosureId: 'disclosure-1',
      type: 'scope_limitation',
      text: '시간을 알 수 없어 일부 풀이가 제한됩니다.',
    }],
    explainability: { entries: [{
      explainabilityRef: 'private-explain',
      claimIds: ['private-claim'],
      factRefs: ['private-fact'],
      methodologyIds: ['private-method'],
      sourceIds: ['private-source'],
    }] },
    provenance: {
      snapshotId: 'snapshot-1',
      interpretationRunId: 'run-1',
      readingVersion: '1',
    },
    generatedAt: '2026-10-22T00:00:00.000Z',
  };
}

const constraints = {
  mayExposeInternalClaimIds: false,
  mayExposeRawInternalReasonCodes: false,
  mayExposeResearchAuthorityStateAsConsumerMeaning: false,
  mayRenderCoverageAsFortuneJudgment: false,
  maySynthesizeMissingReadingText: false,
  mayTreatClarificationCandidateAsSelectedIntent: false,
  mayTreatFallbackAsNewInterpretationAuthority: false,
} as const;

function delivered(): ProductReadingDeliveryResult {
  return {
    deliveryId: 'delivery-1',
    deliveryVersion: 'test',
    state: 'delivered',
    messageCode: 'READING_DELIVERED',
    requiredAction: 'none',
    artifact: artifact(),
    audit: { executionId: 'run-1', preparationId: 'preparation-1' },
    constraints,
  };
}

function insufficient(): ProductReadingDeliveryResult {
  return {
    deliveryId: 'delivery-insufficient',
    deliveryVersion: 'test',
    state: 'insufficient_evidence',
    messageCode: 'READING_EVIDENCE_INSUFFICIENT',
    requiredAction: 'none',
    coverage: {
      state: 'insufficient',
      hasAvailableEvidence: false,
      missingRequirementCount: 2,
      explanation: '근거가 부족합니다.',
    },
    audit: { executionId: 'run-1', preparationId: 'preparation-1' },
    constraints,
  };
}

describe('Korean localization bridge (internal only)', () => {
  it('renders only actual source-owned Korean text and its bounded qualifier', async () => {
    const source = semantics();
    const result = await renderKoreanSourceBoundOnDemandV1(
      source, { readingLocale: 'ko-KR' }, 'userA:reading1',
    );
    expect(result.state).toBe('internal_preview_only');
    expect(result.locale).toBe('ko-KR');
    expect(result.semanticHash).toBe(source.semanticHash);
    expect(result.units).toEqual([{
      unitId: source.units[0]?.unitId,
      claimId: 'claim-career-1',
      text: '직업의 구조적 맥락\n원국에서 확인된 구조만 설명합니다.',
      qualifiers: [{ qualifierId: 'boundary-1', text: '취업 결과를 예측하지 않습니다.' }],
    }]);
    expect(result.constraints.mayPromoteResearchAuthority).toBe(false);
    expect(createKoreanSourceBoundRendererV1().locale).toBe('ko-KR');
  });

  it('does not invent content when source copy or required qualifier is missing', async () => {
    await expect(renderKoreanSourceBoundOnDemandV1(
      semantics(false), {}, 'scope',
    )).rejects.toThrow(TypeError);
    await expect(renderKoreanSourceBoundOnDemandV1(
      semantics(true, false), {}, 'scope',
    )).rejects.toThrow(TypeError);
  });

  it('does not render Korean when reading locale is English or Japanese', async () => {
    await expect(renderKoreanSourceBoundOnDemandV1(
      semantics(), { readingLocale: 'en-US', uiLocale: 'ko-KR' }, 'scope',
    )).rejects.toThrow(RangeError);
    await expect(renderKoreanSourceBoundOnDemandV1(
      semantics(), { readingLocale: 'ja-JP' }, 'scope',
    )).rejects.toThrow(RangeError);
  });

  it('preserves real Korean consumer response text, identifiers redaction and disclosure unchanged', () => {
    const delivery = delivered();
    const response = buildProductReadingResponse(delivery);
    const result = preserveExistingKoreanReadingResponseV1({
      delivery,
      response,
      canonicalSemantics: semantics(),
    }, { readingLocale: 'ko-KR' });

    expect(result.consumerResponse).toBe(response);
    expect(result.internalSemanticHash).toBe(semantics().semanticHash);
    expect(result.consumerResponse.reading?.sections[0]?.blocks).toEqual([
      { type: 'paragraph', text: '근거가 확인된 범위만 설명합니다.' },
      { type: 'source_hint', text: '근거를 확인할 수 있습니다.' },
    ]);
    const json = JSON.stringify(result.consumerResponse);
    expect(json).not.toContain('private-claim');
    expect(json).not.toContain('private-source');
    expect(json).not.toContain(result.internalSemanticHash);
    expect(result.consumerResponse.reading?.disclosures[0]?.text)
      .toBe('시간을 알 수 없어 일부 풀이가 제한됩니다.');
  });

  it('keeps insufficient evidence response unchanged and never converts it into a reading', () => {
    const delivery = insufficient();
    const response = buildProductReadingResponse(delivery);
    const result = preserveExistingKoreanReadingResponseV1({ delivery, response }, {});
    expect(result.consumerResponse).toBe(response);
    expect(result.consumerResponse.state).toBe('insufficient_evidence');
    expect(result.consumerResponse.reading).toBeUndefined();
    expect(result.consumerResponse.coverage?.missingRequirementCount).toBe(2);
    expect(result.internalSemanticHash).toBeUndefined();
  });

  it('rejects unrelated execution, altered consumer response and language substitution', () => {
    const delivery = delivered();
    const response = buildProductReadingResponse(delivery);
    expect(() => preserveExistingKoreanReadingResponseV1({
      delivery, response: { ...response, state: 'insufficient_evidence' },
    }, {})).toThrow(TypeError);
    expect(() => preserveExistingKoreanReadingResponseV1({
      delivery, response, canonicalSemantics: {
        ...semantics(), snapshotId: 'unrelated',
      },
    }, {})).toThrow(TypeError);
    expect(() => preserveExistingKoreanReadingResponseV1({
      delivery, response,
    }, { readingLocale: 'vi-VN' })).toThrow(RangeError);
  });
  it('runs the actual existing governed Korean service without changing its consumer response', async () => {
    const policy: CalculationPolicySnapshot = {
      policyId: 'myeonghwa/korean-localization-integration-test',
      policyVersion: '1',
      dayBoundary: 'midnight',
      trueSolarTime: {
        enabled: false,
        longitudeSource: 'not-applicable',
        applyEquationOfTime: false,
        applyHistoricalDst: false,
      },
      timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
      unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
    };
    const current = calculateCanonicalSajuSnapshot({
      calendarType: 'solar',
      date: { year: 2024, month: 3, day: 10 },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    }, policy, { now: new Date('2026-08-24T00:00:00.000Z') });
    const registry = createI7SeasonalSupportRegistry();
    const base = runInterpretation(current, registry, {
      now: new Date('2026-08-24T00:05:00.000Z'),
    });
    const boundedWealth: InterpretationClaim = {
      ...claim(),
      claimId: 'claim-wealth-existing-korean',
      snapshotId: current.snapshotId,
      taxonomy: { tier: 'T8', category: 'wealth', subcategory: 'friction' },
      claimType: 'WEALTH_NATAL_BOUNDED_TEST',
      predicate: 'wealth_conclusion',
      value: {
        wealthKind: 'friction',
        headline: '준비와 결과 사이의 긴장',
        summary: '원국의 관계만 설명합니다.',
        futureMoneyTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
    };
    const interpretation = {
      ...base,
      claims: [boundedWealth],
      claimRelations: [],
      integrity: { valid: true, errors: [] },
      evidenceIndex: {},
    };
    const request = { requestId: 'korean-source-existing-reading', text: '재물운' };
    const options = {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'korean-localization-integration-test',
      artifactGeneratedAt: new Date('2026-10-22T00:00:00.000Z'),
    };
    const existing = await requestProductReading(current, interpretation, registry, request, options);
    const localized = await runExistingKoreanReadingLocalizedV1(
      current, interpretation, registry, request, options,
      { readingLocale: 'ko-KR', uiLocale: 'en-US' },
    );
    expect(existing.state).toBe('delivered');
    expect(localized.consumerResponse).toEqual(existing);
    expect(localized.locale).toBe('ko-KR');
    expect(localized.consumerResponse.reading?.sections.length).toBeGreaterThan(0);
    expect(JSON.stringify(localized.consumerResponse)).not.toContain('claim-wealth-existing-korean');

    const noEvidence = await runExistingKoreanReadingLocalizedV1(
      current, { ...interpretation, claims: [] }, registry, request, options,
      { readingLocale: 'ko-KR' },
    );
    expect(noEvidence.consumerResponse.reading).toBeUndefined();
    expect(noEvidence.consumerResponse.state).not.toBe('delivered');
  });

});
