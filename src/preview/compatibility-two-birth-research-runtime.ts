import type { BirthInput } from '../contracts/calculation.js';
import {
  buildT102018MaritalResearchReadingV1,
  type T102018MaritalResearchReadingV1,
} from '../research/compatibility-t10-2018-marital-reading.js';
import {
  auditT102018DivorcedCoupleMethodBoundaryV1,
  type T102018DivorcedCoupleSourceBoundaryV1,
} from '../research/compatibility-t10-2018-marital-divorce-study-boundary.js';
import {
  buildT10RelationshipContextBoundaryV1,
  type T10DeclaredRelationshipContext,
  type T10RelationshipContextBoundaryV1,
} from '../research/compatibility-t10-relationship-context-boundary.js';
import {
  auditT10ProductReadingQualityV1,
  type T10ProductReadingQualityReviewV1,
} from '../research/compatibility-t10-product-reading-quality-review.js';
import {
  buildT10PairReadingBoundaryDraftV1,
  type T10PairReadingBoundaryDraftV1,
} from '../research/compatibility-t10-pair-reading-boundary-draft.js';
import {
  compareT10CrossMethodEvidenceV1,
  type T10CrossMethodContrastResearchV1,
} from '../research/compatibility-t10-cross-method-contrast.js';
import {
  buildT10HistoricalDayYearObservation,
  type T10HistoricalDayYearObservation,
} from '../research/compatibility-t10-historical-day-year-observation.js';
import {
  buildT10ThreeMethodApplicabilityReadingV1,
  type T10ThreeMethodApplicabilityReadingV1,
} from '../research/compatibility-t10-three-method-applicability-reading.js';
import {
  buildT10SourceBoundObservationReadingV1,
  type T10SourceBoundObservationReadingV1,
} from '../research/compatibility-t10-source-bound-observation-reading.js';
import {
  auditT10MonthlyTransformationScopeV1,
  type T10MonthlyTransformationScopeResearchV1,
} from '../research/compatibility-t10-monthly-transformation-scope.js';
import {
  auditT10GejuRescueSourceBridgeV1,
  type T10GejuRescueBridgeResearchV1,
} from '../research/compatibility-t10-geju-rescue-source-bridge.js';
import {
  auditT10YongshenMethodScopeV1,
  type T10YongshenMethodScopeResearchV1,
} from '../research/compatibility-t10-yongshen-method-scope.js';
import {
  auditT10ClassicalUsefulElementExamplesV1,
  type T10ClassicalUsefulElementResearchV1,
} from '../research/compatibility-t10-classical-useful-element.js';
import {
  auditT10ClassicalCrossTenGodScopeV1,
  type T10ClassicalCrossTenGodResearch,
} from '../research/compatibility-t10-classical-cross-ten-god.js';
import {
  observeT102025DirectCombinationCandidates,
  type T102025DirectCombinationResearch,
} from '../research/compatibility-t10-2025-direct-combination-candidate.js';
import {
  reviewT102025SpouseCriteriaScopeV1,
  type T102025SpouseScopeReviewV1,
} from '../research/compatibility-t10-2025-spouse-criteria-scope.js';
import {
  auditT10DirectDayComparisonV1,
  type T10DirectDayComparisonResearchV1,
} from '../research/compatibility-t10-direct-day-comparison.js';
import {
  reviewCompatibilityT10CoexistingEvidenceV1,
  type CompatibilityT10CoexistingEvidenceReviewV1,
} from '../research/compatibility-t10-coexisting-evidence-review.js';
import {
  buildCompatibilityT10MethodCoverageV1,
  type CompatibilityT10MethodCoverageV1,
} from '../research/compatibility-t10-method-coverage.js';
import {
  buildMaritalPalaceIntraChartResearchV1,
  type MaritalPalaceIntraChartResearchV1,
} from '../research/compatibility-marital-palace-intra-chart-research.js';
import {
  buildMaritalDayBranchCandidateV1,
  type MaritalDayBranchCandidateV1,
} from '../research/compatibility-marital-day-branch-candidate.js';
import {
  evaluatePairwiseSourceScopeV1,
  type PairwiseSourceScopeHandoff,
} from '../research/family-pair-source-scope-handoff.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { createRelationshipNatalMultifactorRegistry } from
  '../research/relationship-natal-multifactor-candidate.js';
import { buildRelationshipNatalMultifactorReport } from
  './relationship-natal-multifactor-report.js';
import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';

import {
  buildCompatibilityTwoChartIntakePreview,
  renderCompatibilityTwoChartIntakeHtml,
  type CompatibilityTwoChartIntakePreview,
  type CompatibilityPersonalRelationshipReading,
  type CompatibilityPersonalRelationshipContext,
} from './compatibility-two-chart-intake-preview.js';

export const COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION =
  'myeongha-compatibility-two-birth-research-runtime-v1' as const;

export interface CompatibilityTwoBirthResearchRequest {
  requestId: string;
  subjectPersonRef: string;
  targetPersonRef: string;
  /** Canonical UTC time used for both authorized calculations. */
  referenceDateTime: string;
  /** Research opt-in to the scope of the source. Never populated from consumer HTTP. */
  candidateScope?: 'traditional_marital_palace_comparison';
  /** Optional declared study context; no relationship type is inferred from birth data. */
  relationshipContext?: T10DeclaredRelationshipContext;
}

export interface CompatibilityTwoBirthResearchReading {
  version: typeof COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION;
  lifecycle: 'internal_research_only';
  availability: 'partial' | 'unavailable';
  meaning: 'two_person_calculation_only' | 'none';
  mayClaimInterpersonalMeaning: false;
  mayGrantOfficialAuthority: false;
  mayMarkMenuAvailable: false;
  mayPublish: false;
  mayPersist: false;
  maySell: false;
  report: CompatibilityTwoChartIntakePreview;
  personalRelationship: CompatibilityPersonalRelationshipContext;
  /** R068/R069 original source applicability only, never pairwise T10 meaning. */
  sourceScopeHandoff: PairwiseSourceScopeHandoff;
  maritalDayBranchCandidate?: MaritalDayBranchCandidateV1;
  maritalPalaceIntraChartResearch?: MaritalPalaceIntraChartResearchV1;
  /** Private method applicability audit; never two-person T10 meaning. */
  methodCoverage?: CompatibilityT10MethodCoverageV1;
  /** Source-limited co-presence inventory; never a T10 verdict. */
  coexistingEvidenceReview?: CompatibilityT10CoexistingEvidenceReviewV1;
  /** 2016 direct day-stem/day-branch method audit, protected research opt-in only. */
  directDayComparisonResearch?: T10DirectDayComparisonResearchV1;
  /** Sentence-by-sentence factual Korean reading, internal-only; no T10 verdict. */
  sourceBoundObservationReading?: T10SourceBoundObservationReadingV1;
  /** Palace / six-spirit / yongshin source prerequisites, not an outcome. */
  threeMethodApplicabilityReading?: T10ThreeMethodApplicabilityReadingV1;
  /** Source-bounded opposite structural cases and incompatible classical methods. */
  crossMethodContrastResearch?: T10CrossMethodContrastResearchV1;
  /** Cohesive factual Korean research draft and explicit interpretation HOLD. */
  pairReadingBoundaryDraft?: T10PairReadingBoundaryDraftV1;
  /** Internal three-composition reading quality and eligibility HOLD review. */
  productReadingQualityReview?: T10ProductReadingQualityReviewV1;
  /** Context-bounded Korean research copy: marital methods never leak to other contexts. */
  relationshipContextBoundary?: T10RelationshipContextBoundaryV1;
  /** 2018 divorced-couple abstract: personal palace and visible stars, no T10 rule. */
  divorceStudy2018MethodBoundary?: T102018DivorcedCoupleSourceBoundaryV1;
  /** Joined Korean marital-only fact reading, with 2018 abstract caveats. */
  maritalResearchReading2018?: T102018MaritalResearchReadingV1;
  /** 2025 author-posted research excerpt: per-person criteria, no T10 synthesis. */
  spouseCriteria2025Scope?: T102025SpouseScopeReviewV1;
  /** Direct two-chart historical clause, attributed via 2025 author text. */
  directCombination2025Research?: T102025DirectCombinationResearch;
  /** 2025 historical day-to-other-year matches, source-bound facts only. */
  historicalDayYearObservation?: T10HistoricalDayYearObservation;
  /** Contradictory traditional two-chart six-spirit methods; no admitted outcome. */
  classicalCrossTenGodResearch?: T10ClassicalCrossTenGodResearch;
  /** Classical useful-element examples: actual symbols only, never selected yongshin. */
  classicalUsefulElementResearch?: T10ClassicalUsefulElementResearchV1;
  /** Monthly-command geju vs conditional useful element: source-method boundary. */
  yongshenMethodScopeResearch?: T10YongshenMethodScopeResearchV1;
  /** Intra-chart geju rescue observations cannot cross people. */
  gejuRescueSourceBridge?: T10GejuRescueBridgeResearchV1;
  /** Exact natal month transformation exemplars; no cross-person outcome. */
  monthlyTransformationScopeResearch?: T10MonthlyTransformationScopeResearchV1;
  html: string;
}

function identifier(value: string, field: string): string {
  if (typeof value !== 'string' || !value.trim() || value.length > 200) {
    throw new TypeError('Two-birth compatibility requires a bounded ' + field + '.');
  }
  return value.trim();
}

function individualRelationshipContext(
  snapshot: CanonicalSajuSnapshot,
  personRef: string,
  now: Date,
): CompatibilityPersonalRelationshipReading {
  // Existing research T5→T8 selection, never a new dyadic T10 execution.
  const registry = createRelationshipNatalMultifactorRegistry();
  const execution = runInterpretation(snapshot, registry, { now });
  const report = buildRelationshipNatalMultifactorReport(snapshot, execution, registry);
  if (report.snapshotId !== snapshot.snapshotId ||
      report.calculationHash !== snapshot.calculationHash ||
      !report.researchOnly || report.mayPublish || report.maySell ||
      report.usefulComplete ||
      report.sections.some(section =>
        section.sourceIds.length < 2 ||
        section.observedFactPaths.length < 2 ||
        section.upstreamClaimIds.length < 2 ||
        section.paragraph.trim().length === 0)) {
    throw new TypeError('Personal relationship research must retain each source-bound T8 chart.');
  }
  const sections = report.sections.map(section => ({
    title: section.headline,
    paragraph: section.paragraph,
    sourceIds: [...section.sourceIds],
    observedFactPaths: [...section.observedFactPaths],
  }));
  return {
    personRef,
    snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    coverage: sections.length > 0
      ? 'bounded_natal_t8_research' : 'insufficient_evidence',
    introduction: report.readingGuide?.paragraph ?? report.introduction,
    sections,
  };
}

/**
 * App-facing internal-only compatibility intake:
 * TWO separate authorized natal calculations -> existing two-person intake
 * facts and explicit T10 HOLD copy. Identical chart hashes are permitted for
 * two different individuals; identity is tied to distinct caller-supplied refs.
 *
 * Nothing in this workflow authorizes another person's data processing,
 * retention, a compatibility score, marriage outcome or official publication.
 * The host must enforce consent and access control independently.
 */
export function buildCompatibilityTwoBirthResearchReading(
  subjectBirth: BirthInput,
  targetBirth: BirthInput,
  input: CompatibilityTwoBirthResearchRequest,
): CompatibilityTwoBirthResearchReading {
  const requestId = identifier(input.requestId, 'requestId');
  const subjectRef = identifier(input.subjectPersonRef, 'subjectPersonRef');
  const targetRef = identifier(input.targetPersonRef, 'targetPersonRef');
  if (subjectRef === targetRef) {
    throw new TypeError('Two-birth compatibility requires two distinct person references.');
  }
  if (typeof input.referenceDateTime !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(input.referenceDateTime)) {
    throw new TypeError('Two-birth compatibility requires an explicit canonical UTC timestamp.');
  }
  if (input.relationshipContext !== undefined &&
      input.candidateScope !== 'traditional_marital_palace_comparison') {
    throw new TypeError('Research relationship context requires explicit private source opt-in.');
  }
  const now = new Date(input.referenceDateTime);
  if (!Number.isFinite(now.getTime()) ||
      now.toISOString() !== input.referenceDateTime) {
    throw new RangeError('Two-birth compatibility reference clock must be a real instant.');
  }
  // Both people must be calculated separately under the same authorized
  // policy and reference clock; no merger or implied interpersonal T10 rule.
  const subject = calculateAuthorizedMyeonghwaProductionSnapshot(
    subjectBirth, { now },
  ).snapshot;
  const target = calculateAuthorizedMyeonghwaProductionSnapshot(
    targetBirth, { now },
  ).snapshot;
  const request: ReadingRequest = {
    requestId,
    intent: { domain: 'compatibility', temporalScope: 'natal' },
    targetPersonRef: targetRef,
  };
  const report = buildCompatibilityTwoChartIntakePreview(
    request,
    { personRef: subjectRef, snapshot: subject },
    { personRef: targetRef, snapshot: target },
  );
  if (!report.researchOnly || report.usefulComplete ||
      report.mayPublish || report.maySell ||
      report.mode !== 'two_person_calculation_only' ||
      report.readingStatus !== 'insufficient_interpersonal_meaning_authority' ||
      report.subject.personRef !== subjectRef ||
      report.target.personRef !== targetRef ||
      report.subject.snapshotId !== subject.snapshotId ||
      report.target.snapshotId !== target.snapshotId ||
      report.subject.calculationHash !== subject.calculationHash ||
      report.target.calculationHash !== target.calculationHash) {
    throw new TypeError('Two-birth intake cannot admit an ungrounded compatibility meaning.');
  }
  // R068/R069 historical wording belongs to the exact two separately
  // calculated people. It must not be confused with authorized dyadic T10.
  const sourceScopeHandoff = evaluatePairwiseSourceScopeV1(
    { personRef: subjectRef, snapshot: subject },
    { personRef: targetRef, snapshot: target },
  );
  if (sourceScopeHandoff.subject.personRef !== subjectRef ||
      sourceScopeHandoff.target.personRef !== targetRef ||
      sourceScopeHandoff.subject.snapshotId !== subject.snapshotId ||
      sourceScopeHandoff.target.snapshotId !== target.snapshotId ||
      sourceScopeHandoff.subject.calculationHash !== subject.calculationHash ||
      sourceScopeHandoff.target.calculationHash !== target.calculationHash ||
      sourceScopeHandoff.pairwiseDisposition !== 'INCONCLUSIVE' ||
      sourceScopeHandoff.pairwiseT10Admitted !== false ||
      sourceScopeHandoff.researchOnly !== true ||
      sourceScopeHandoff.mayGrantOfficialAuthority !== false ||
      sourceScopeHandoff.mayMarkMenuAvailable !== false ||
      sourceScopeHandoff.mayPersist !== false ||
      sourceScopeHandoff.mayPublish !== false ||
      sourceScopeHandoff.maySell !== false ||
      sourceScopeHandoff.factualPairObservations.some(item =>
        item.pairwiseMeaningAuthorized !== false) ||
      sourceScopeHandoff.comparedSourceSurfaces.some(item =>
        item.eligiblePairwiseClaim !== false)) {
    throw new TypeError('R068/R069 source research cannot authorize two-person T10 meaning.');
  }
  const personalRelationship: CompatibilityPersonalRelationshipContext = {
    subject: individualRelationshipContext(subject, subjectRef, now),
    target: individualRelationshipContext(target, targetRef, now),
  };
  const bothHaveFacts = [report.subject, report.target].every(person =>
    person.pillars.some(pillar => pillar.status === 'resolved'));
  const maritalDayBranchCandidate = input.candidateScope === 'traditional_marital_palace_comparison'
    ? buildMaritalDayBranchCandidateV1(sourceScopeHandoff) : undefined;
  const maritalPalaceIntraChartResearch = maritalDayBranchCandidate === undefined
    ? undefined : buildMaritalPalaceIntraChartResearchV1(
      { personRef: subjectRef, snapshot: subject },
      { personRef: targetRef, snapshot: target },
    );
  const divorceStudy2018MethodBoundary = maritalPalaceIntraChartResearch
    ? auditT102018DivorcedCoupleMethodBoundaryV1(
      sourceScopeHandoff, maritalPalaceIntraChartResearch, subject, target,
    ) : undefined;
  const methodCoverage = maritalDayBranchCandidate && maritalPalaceIntraChartResearch
    ? buildCompatibilityT10MethodCoverageV1(
      sourceScopeHandoff, maritalDayBranchCandidate, maritalPalaceIntraChartResearch,
    ) : undefined;
  const coexistingEvidenceReview = methodCoverage
    ? reviewCompatibilityT10CoexistingEvidenceV1(sourceScopeHandoff, methodCoverage)
    : undefined;
  const directDayComparisonResearch = methodCoverage && maritalPalaceIntraChartResearch
    ? auditT10DirectDayComparisonV1(
      sourceScopeHandoff, maritalPalaceIntraChartResearch,
    ) : undefined;
  const sourceBoundObservationReading = directDayComparisonResearch &&
    coexistingEvidenceReview
    ? buildT10SourceBoundObservationReadingV1(
      directDayComparisonResearch, coexistingEvidenceReview,
    ) : undefined;
  const spouseCriteria2025Scope = methodCoverage && maritalPalaceIntraChartResearch
    ? reviewT102025SpouseCriteriaScopeV1(
      sourceScopeHandoff, maritalPalaceIntraChartResearch, subject, target,
    ) : undefined;
  const directCombination2025Research = methodCoverage
    ? observeT102025DirectCombinationCandidates(sourceScopeHandoff) : undefined;
  const historicalDayYearObservation = directCombination2025Research
    ? buildT10HistoricalDayYearObservation(
      sourceScopeHandoff, directCombination2025Research,
    ) : undefined;
  const classicalCrossTenGodResearch = methodCoverage
    ? auditT10ClassicalCrossTenGodScopeV1(sourceScopeHandoff, subject, target)
    : undefined;
  const classicalUsefulElementResearch = classicalCrossTenGodResearch
    ? auditT10ClassicalUsefulElementExamplesV1(
      sourceScopeHandoff, classicalCrossTenGodResearch, subject, target,
    ) : undefined;
  const yongshenMethodScopeResearch = methodCoverage
    ? auditT10YongshenMethodScopeV1(sourceScopeHandoff, subject, target)
    : undefined;
  const threeMethodApplicabilityReading = sourceBoundObservationReading &&
    classicalCrossTenGodResearch && classicalUsefulElementResearch &&
    yongshenMethodScopeResearch
    ? buildT10ThreeMethodApplicabilityReadingV1(
      sourceBoundObservationReading, classicalCrossTenGodResearch,
      classicalUsefulElementResearch, yongshenMethodScopeResearch,
    ) : undefined;
  const crossMethodContrastResearch = coexistingEvidenceReview &&
    classicalCrossTenGodResearch && classicalUsefulElementResearch &&
    threeMethodApplicabilityReading
    ? compareT10CrossMethodEvidenceV1(
      sourceScopeHandoff, coexistingEvidenceReview,
      classicalCrossTenGodResearch, classicalUsefulElementResearch,
      threeMethodApplicabilityReading,
    ) : undefined;
  const pairReadingBoundaryDraft = sourceBoundObservationReading &&
    historicalDayYearObservation && crossMethodContrastResearch &&
    threeMethodApplicabilityReading
    ? buildT10PairReadingBoundaryDraftV1(
      sourceBoundObservationReading, historicalDayYearObservation,
      crossMethodContrastResearch, threeMethodApplicabilityReading,
    ) : undefined;
  const productReadingQualityReview = pairReadingBoundaryDraft &&
    sourceBoundObservationReading && historicalDayYearObservation &&
    crossMethodContrastResearch && threeMethodApplicabilityReading
    ? auditT10ProductReadingQualityV1(
      pairReadingBoundaryDraft, sourceBoundObservationReading,
      historicalDayYearObservation, crossMethodContrastResearch,
      threeMethodApplicabilityReading,
    ) : undefined;
  const relationshipContextBoundary = pairReadingBoundaryDraft &&
    productReadingQualityReview
    ? buildT10RelationshipContextBoundaryV1(
      pairReadingBoundaryDraft, productReadingQualityReview,
      input.relationshipContext ?? 'unspecified',
    ) : undefined;
  const maritalResearchReading2018 = input.relationshipContext === 'married_couple' &&
    relationshipContextBoundary && pairReadingBoundaryDraft &&
    productReadingQualityReview && divorceStudy2018MethodBoundary &&
    maritalPalaceIntraChartResearch
    ? buildT102018MaritalResearchReadingV1(
      relationshipContextBoundary, pairReadingBoundaryDraft,
      productReadingQualityReview, divorceStudy2018MethodBoundary,
      sourceScopeHandoff, maritalPalaceIntraChartResearch, subject, target,
    ) : undefined;
  const gejuRescueSourceBridge = yongshenMethodScopeResearch
    ? auditT10GejuRescueSourceBridgeV1(
      sourceScopeHandoff, yongshenMethodScopeResearch, subject, target,
    ) : undefined;
  const monthlyTransformationScopeResearch = yongshenMethodScopeResearch
    ? auditT10MonthlyTransformationScopeV1(
      sourceScopeHandoff, yongshenMethodScopeResearch, subject, target,
    ) : undefined;
  return {
    version: COMPATIBILITY_TWO_BIRTH_RESEARCH_RUNTIME_VERSION,
    lifecycle: 'internal_research_only',
    availability: bothHaveFacts ? 'partial' : 'unavailable',
    meaning: bothHaveFacts ? 'two_person_calculation_only' : 'none',
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayMarkMenuAvailable: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
    report,
    personalRelationship,
    sourceScopeHandoff,
    ...(methodCoverage && maritalDayBranchCandidate && maritalPalaceIntraChartResearch &&
        coexistingEvidenceReview ? {
      maritalDayBranchCandidate,
      maritalPalaceIntraChartResearch,
      methodCoverage,
      coexistingEvidenceReview,
      ...(directDayComparisonResearch ? { directDayComparisonResearch } : {}),
      ...(sourceBoundObservationReading ? { sourceBoundObservationReading } : {}),
      ...(threeMethodApplicabilityReading ? { threeMethodApplicabilityReading } : {}),
      ...(crossMethodContrastResearch ? { crossMethodContrastResearch } : {}),
      ...(pairReadingBoundaryDraft ? { pairReadingBoundaryDraft } : {}),
      ...(productReadingQualityReview ? { productReadingQualityReview } : {}),
      ...(relationshipContextBoundary ? { relationshipContextBoundary } : {}),
      ...(divorceStudy2018MethodBoundary ? { divorceStudy2018MethodBoundary } : {}),
      ...(maritalResearchReading2018 ? { maritalResearchReading2018 } : {}),
      ...(spouseCriteria2025Scope ? { spouseCriteria2025Scope } : {}),
      ...(directCombination2025Research ? { directCombination2025Research } : {}),
      ...(historicalDayYearObservation ? { historicalDayYearObservation } : {}),
      ...(classicalCrossTenGodResearch ? { classicalCrossTenGodResearch } : {}),
      ...(classicalUsefulElementResearch ? { classicalUsefulElementResearch } : {}),
      ...(yongshenMethodScopeResearch ? { yongshenMethodScopeResearch } : {}),
      ...(gejuRescueSourceBridge ? { gejuRescueSourceBridge } : {}),
      ...(monthlyTransformationScopeResearch ? { monthlyTransformationScopeResearch } : {}),
    } : {}),
    html: renderCompatibilityTwoChartIntakeHtml(report, personalRelationship),
  };
}
