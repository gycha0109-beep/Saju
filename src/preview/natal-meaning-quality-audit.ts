import type {
  ProductReadingResponse,
} from '../reading/product-reading-response.js';
import {
  buildNatalPersonalizationBaselineReport,
  type NatalPersonalizationBaselineInput,
  type NatalPersonalizationBaselineReport,
} from './natal-personalization-baseline.js';
import {
  GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX,
} from './general-natal-consumer-fact-context.js';
import { GENERAL_NATAL_ROLE_OBSERVATION_PREFIX } from './general-natal-consumer-role-observation.js';

export const NATAL_MEANING_QUALITY_AUDIT_VERSION =
  'saju-natal-n6-meaning-versus-fact-audit-v1' as const;

export interface NatalMeaningQualityAudit {
  version: typeof NATAL_MEANING_QUALITY_AUDIT_VERSION;
  lifecycle: 'internal_quality_audit';
  mayPublish: false;
  maySell: false;
  realConsumerCaseCount: number;
  distinctDisplayedCharts: number;
  consumerTextUnique: number;
  meaningTextUnique: number;
  actualRepeatedConsumerPairs: number;
  repeatedMeaningPairs: number;
  pairsSeparatedOnlyByCalculatedFacts: number;
  factOnlySeparatedCasePairs: readonly { left: string; right: string }[];
  casesWithoutMeaning: readonly string[];
  semanticCompletionGranted: false;
  limitations: readonly string[];
}

export function stripCalculatedParagraph(response: ProductReadingResponse): ProductReadingResponse {
  const reading = response.reading;
  if (reading === undefined) return response;

  let count = 0;
  let roleCount = 0;
  const sections = reading.sections.map((section) => ({
    ...section,
    blocks: section.blocks.filter((block) => {
      if (block.type !== 'paragraph') return true;
      if (block.text.startsWith(GENERAL_NATAL_ROLE_OBSERVATION_PREFIX)) {
        if (!block.text.endsWith('이는 실제 원국에서 계산된 십신의 위치 기록이며, 이 정보만으로 성격·진로·재물·관계의 결과나 강약을 판단하지 않습니다.')) {
          throw new TypeError('Calculated Ten God observation has unexpected semantic text.');
        }
        roleCount += 1;
        return false;
      }
      if (!block.text.startsWith(GENERAL_NATAL_CALCULATED_CONTEXT_PREFIX)) {
        return true;
      }
      // A marker alone cannot hide arbitrary interpretive content.
      if (!block.text.includes('이 계산 사실만으로 성격·길흉·미래 결과를 단정하지 않습니다.')) {
        throw new TypeError('Calculated context marker is not a recognized N5 bounded fact passage.');
      }
      count += 1;
      return false;
    }),
  }));
  if (count > 1) throw new TypeError('Natal factual context appears more than once.');
  if (roleCount > 1) throw new TypeError('Natal calculated Ten God context appears more than once.');
  if (count === 0 && roleCount === 0) return response;
  return { ...response, reading: { ...reading, sections } };
}

/**
 * N6 quality gate: compare exact consumer responses against their original
 * interpretation *without* the purely calculated fact paragraph.
 * A unique pillar string must never masquerade as a unique interpretation.
 */
export function buildNatalMeaningQualityAudit(
  inputs: readonly NatalPersonalizationBaselineInput[],
): {
  consumer: NatalPersonalizationBaselineReport;
  meaning: NatalPersonalizationBaselineReport;
  quality: NatalMeaningQualityAudit;
} {
  const consumer = buildNatalPersonalizationBaselineReport(inputs);
  const meaning = buildNatalPersonalizationBaselineReport(inputs.map((input) => ({
    ...input,
    response: stripCalculatedParagraph(input.response),
  })));

  const consumerCollisions = new Set(consumer.contrasts
    .filter((pair) => pair.kind === 'different_facts_same_interpretation')
    .map((pair) => `${pair.left}\u0000${pair.right}`));
  const meaningCollisions = meaning.contrasts
    .filter((pair) => pair.kind === 'different_facts_same_interpretation');
  const factOnlySeparatedCasePairs = meaningCollisions
    .filter((pair) => !consumerCollisions.has(`${pair.left}\u0000${pair.right}`))
    .map(({ left, right }) => ({ left, right }));

  const quality: NatalMeaningQualityAudit = {
    version: NATAL_MEANING_QUALITY_AUDIT_VERSION,
    lifecycle: 'internal_quality_audit',
    mayPublish: false,
    maySell: false,
    realConsumerCaseCount: consumer.numberOfCases,
    distinctDisplayedCharts: consumer.uniqueFactFingerprints,
    consumerTextUnique: consumer.uniqueInterpretationFingerprints,
    meaningTextUnique: meaning.uniqueInterpretationFingerprints,
    actualRepeatedConsumerPairs: consumerCollisions.size,
    repeatedMeaningPairs: meaningCollisions.length,
    pairsSeparatedOnlyByCalculatedFacts: factOnlySeparatedCasePairs.length,
    factOnlySeparatedCasePairs,
    casesWithoutMeaning: [...meaning.casesWithoutInterpretation],
    semanticCompletionGranted: false,
    limitations: [
      'Calculated four-pillar labels are real factual personalization, not semantic interpretation differentiation.',
      'The meaning baseline removes ONLY exact recognized N5/N7 calculated fact passages; original admitted interpretation text remains unchanged.',
      'Same text may be appropriate for different charts; collisions require independently reproducible chart-specific facts, source-scoped counterexamples and regression review, not forced variation or mandatory external expert sign-off.',
      'Research rule matches remain separate evidence and never authorize Production interpretation, commerce or publication.',
    ],
  };
  return { consumer, meaning, quality };
}
