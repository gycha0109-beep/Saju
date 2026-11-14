import type { T10PairReadingBoundaryDraftV1 } from
  './compatibility-t10-pair-reading-boundary-draft.js';
import type { T10ProductReadingQualityReviewV1 } from
  './compatibility-t10-product-reading-quality-review.js';
import type { T10CrossMethodContrastResearchV1 } from
  './compatibility-t10-cross-method-contrast.js';

export const T10_READING_DIFFERENTIATION_AUDIT_VERSION =
  'saju-t10-pair-reading-differentiation-audit-v1' as const;

export interface T10BoundedReadingCase {
  readonly draft: T10PairReadingBoundaryDraftV1;
  readonly quality: T10ProductReadingQualityReviewV1;
  readonly contrast: T10CrossMethodContrastResearchV1;
}

/** Compare actual research readings without inferring a relationship from them. */
export interface T10ReadingDifferentiationAuditV1 {
  readonly version: typeof T10_READING_DIFFERENTIATION_AUDIT_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly pairComparison:
    'same_calculated_pair' | 'reversed_calculated_pair' |
    'distinct_calculated_pair';
  readonly sameTraditionalStructuralCase: boolean;
  readonly sameDayPillarPair: boolean | null;
  readonly sameInputsHaveIdenticalReading: true | null;
  readonly differentDayValuesHaveDifferentEvidenceText: true | null;
  readonly sourceBoundEvidenceVerified: true;
  readonly methodConclusionAndRelationshipOutcomeUnresolved: true;
  readonly authorizedRelationshipInterpretation: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

type ChartIdentity = T10PairReadingBoundaryDraftV1['subject'];

function sameChart(a: ChartIdentity, b: ChartIdentity): boolean {
  return a.calculationHash === b.calculationHash &&
    a.snapshotId === b.snapshotId &&
    a.birthTimeKnown === b.birthTimeKnown;
}
function sameAttachedPerson(
  a: ChartIdentity,
  b: ChartIdentity,
): boolean {
  return a.personRef === b.personRef && sameChart(a, b);
}
function verifiedSourceCase(input: T10BoundedReadingCase): void {
  const { draft, quality, contrast } = input;
  const synthesis = draft.sections.find(item => item.id === 'synthesis_hold');
  const prose = synthesis?.sentences[0];
  const source = contrast.synthesisDecision;
  if (draft.lifecycle !== 'internal_research_only' ||
      draft.mode !== 'source_bounded_factual_research_not_compatibility' ||
      draft.permissionToChooseBestEvidence !== false ||
      draft.mayInterpretOverallCompatibility !== false ||
      draft.relationshipOutcome !== null || draft.compatibilityScore !== null ||
      draft.mayPublish !== false || draft.maySell !== false ||
      quality.lifecycle !== 'internal_research_only' ||
      quality.traceAudit.exactSourceDerivedDraft !== true ||
      quality.actualCompatibilityReadingReady !== false ||
      quality.mayPublish !== false || quality.maySell !== false ||
      quality.productEligibility.length !== 3 ||
      quality.productEligibility.some(x =>
        x.eligibleToHandoffForSalesOrIssuance !== false) ||
      contrast.lifecycle !== 'internal_research_only' ||
      contrast.state !== 'competing_observations_no_admitted_precedence' ||
      contrast.interpersonalConclusion !== null ||
      contrast.compatibilityScore !== null ||
      contrast.mayPublish !== false || contrast.maySell !== false ||
      source.relationshipConclusion !== null ||
      source.compatibilityScore !== null ||
      source.sourceQualifiedPriorityEstablished !== false ||
      source.qualitativeCounterexample.currentPairOutcomeInferred !== false ||
      !sameAttachedPerson(draft.subject, quality.subject) ||
      !sameAttachedPerson(draft.target, quality.target) ||
      !sameAttachedPerson(draft.subject, contrast.subject) ||
      !sameAttachedPerson(draft.target, contrast.target) ||
      draft.subject.personRef === draft.target.personRef ||
      synthesis?.sentences.length !== 1 ||
      prose?.paragraph !== source.paragraph ||
      JSON.stringify(prose.observedFactPaths) !==
        JSON.stringify(source.observedFactPaths) ||
      JSON.stringify(prose.consideredButUnverifiedFactPaths) !==
        JSON.stringify(source.unverifiedFactPaths) ||
      JSON.stringify(prose.sourceUrls) !== JSON.stringify(source.sourceUrls) ||
      !prose.missingPrerequisites.includes(
        'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD') ||
      draft.koreanReadingDraft !== draft.sections.map(section =>
        section.title + '\n' + section.sentences.map(sentence =>
          sentence.paragraph).join('\n')).join('\n\n')) {
    throw new TypeError('T10 comparison needs two independently audited original readings.');
  }
  const day = source.dayPillarFacts;
  if ((day.sourceStatus === 'both_resolved' &&
        (!day.subject || !day.target ||
         !source.observedFactPaths.includes('subject.pillars.day') ||
         !source.observedFactPaths.includes('target.pillars.day') ||
         !prose.paragraph.includes('첫 번째 사람의 일주는 ' + day.subject) ||
         !prose.paragraph.includes('두 번째 사람의 일주는 ' + day.target))) ||
      (day.sourceStatus === 'incomplete' &&
        (day.subject !== null || day.target !== null))) {
    throw new TypeError('T10 paired narrative must retain each real original day pillar.');
  }
}

/** Quality regression utility for roadmap stage 4; not a product evaluator. */
export function auditT10ReadingDifferentiationV1(
  first: T10BoundedReadingCase,
  second: T10BoundedReadingCase,
): T10ReadingDifferentiationAuditV1 {
  verifiedSourceCase(first);
  verifiedSourceCase(second);
  const a = first.draft;
  const b = second.draft;
  const same = sameChart(a.subject, b.subject) && sameChart(a.target, b.target);
  const reverse = !same &&
    sameChart(a.subject, b.target) && sameChart(a.target, b.subject);
  const dayA = first.contrast.synthesisDecision.dayPillarFacts;
  const dayB = second.contrast.synthesisDecision.dayPillarFacts;
  const completeDays = dayA.sourceStatus === 'both_resolved' &&
    dayB.sourceStatus === 'both_resolved';
  const equalDays = completeDays
    ? dayA.subject === dayB.subject && dayA.target === dayB.target
    : null;
  if (same && a.koreanReadingDraft !== b.koreanReadingDraft) {
    throw new TypeError('Identical calculated birth charts cannot generate artificial prose differences.');
  }
  const differentDays = completeDays && !equalDays;
  if (differentDays && (
    first.contrast.synthesisDecision.paragraph ===
      second.contrast.synthesisDecision.paragraph ||
    a.koreanReadingDraft === b.koreanReadingDraft)) {
    throw new TypeError('Distinct original day pillars must remain visible in the reading.');
  }
  return {
    version: T10_READING_DIFFERENTIATION_AUDIT_VERSION,
    lifecycle: 'internal_research_only',
    pairComparison: same ? 'same_calculated_pair'
      : reverse ? 'reversed_calculated_pair' : 'distinct_calculated_pair',
    sameTraditionalStructuralCase:
      first.contrast.synthesisDecision.caseId ===
        second.contrast.synthesisDecision.caseId,
    sameDayPillarPair: equalDays,
    sameInputsHaveIdenticalReading: same ? true : null,
    differentDayValuesHaveDifferentEvidenceText: differentDays ? true : null,
    sourceBoundEvidenceVerified: true,
    methodConclusionAndRelationshipOutcomeUnresolved: true,
    authorizedRelationshipInterpretation: false,
    mayPublish: false,
    maySell: false,
  };
}
