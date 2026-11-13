import type { CompatibilityPersonalRelationshipReading } from
  '../preview/compatibility-two-chart-intake-preview.js';
import type { T10ProductReadingEligibilityReview } from
  './compatibility-t10-product-reading-quality-review.js';
import {
  auditT10ReadingDifferentiationV1, type T10BoundedReadingCase,
} from './compatibility-t10-reading-differentiation-audit.js';

export const T10_THREE_COMPOSITION_ELIGIBILITY_AUDIT_VERSION =
  'saju-t10-three-composition-product-evidence-audit-v1' as const;

type Product = T10ProductReadingEligibilityReview['product'];
type Person = T10BoundedReadingCase['draft']['subject'];
type Pair = T10BoundedReadingCase;

export interface T10CompositionResearchEligibility {
  readonly product: Product;
  readonly subject: Person;
  readonly counterpart: Person;
  readonly pairedResearchReading: 'traceable_factual_draft_only';
  readonly relationshipOutcomeEvidenceEstablished: false;
  readonly individualT10InterpretationReady: false;
  readonly recordedResearchSentenceCount: number;
  readonly observedFactPaths: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly missingInterpretationPrerequisites: readonly string[];
  readonly natalT8ResearchStatus: 'not_included' | 'separate_research_not_a_t10_substitute';
  readonly eligibleToHandoffForSalesOrIssuance: false;
}

export interface T10ThreeCompositionEligibilityAuditV1 {
  readonly version: typeof T10_THREE_COMPOSITION_ELIGIBILITY_AUDIT_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly firstAndRepeatHaveSameSubjectIdentity: true;
  readonly repeatHasIndependentlyAuditedDifferentPersonRef: true;
  readonly sameBirthChartDoesNotImplySameCounterpart: true;
  readonly bundledNatalBoundToFirstSubject: true;
  readonly products: readonly [
    T10CompositionResearchEligibility,
    T10CompositionResearchEligibility,
    T10CompositionResearchEligibility,
  ];
  readonly overallT10InterpretationQualified: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

function samePerson(a: Person, b: Person): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash &&
    a.birthTimeKnown === b.birthTimeKnown;
}
function distinct(items: readonly string[]): string[] {
  return [...new Set(items)];
}
function checkProduct(caseData: Pair, product: Product): T10ProductReadingEligibilityReview {
  const entry = caseData.quality.productEligibility.find(item =>
    item.product === product);
  if (!entry ||
      caseData.quality.productEligibility.length !== 3 ||
      distinct(caseData.quality.productEligibility.map(item => item.product)).length !== 3 ||
      entry.t10ReadingCompleteness !== 'factual_observations_only' ||
      entry.t10IndependentInterpretationReady !== false ||
      entry.eligibleToHandoffForSalesOrIssuance !== false ||
      entry.pairIdentity !==
        'two_distinct_person_references_with_independent_snapshot_provenance' ||
      caseData.quality.actualCompatibilityReadingReady !== false ||
      caseData.quality.researchReadingQuality !== 'traceable_factual_draft_only' ||
      caseData.draft.maySell !== false || caseData.quality.maySell !== false ||
      caseData.quality.mayGrantOfficialAuthority !== false) {
    throw new TypeError('T10 product composition requires a traceable sale-blocked reading.');
  }
  return entry;
}

function collect(
  product: Product, pair: Pair,
  natalStatus: T10CompositionResearchEligibility['natalT8ResearchStatus'],
): T10CompositionResearchEligibility {
  const eligible = checkProduct(pair, product);
  const sentences = pair.draft.sections.flatMap(section => [...section.sentences]);
  const observedFactPaths = distinct(sentences.flatMap(item =>
    [...item.observedFactPaths]));
  const sourceUrls = distinct(sentences.flatMap(item => [...item.sourceUrls]));
  if (!sentences.length || !observedFactPaths.length || !sourceUrls.length ||
      !sentences.some(item => item.missingPrerequisites.includes(
        'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD'))) {
    throw new TypeError('T10 product composition cannot use an empty factual report.');
  }
  return {
    product,
    subject: pair.draft.subject,
    counterpart: pair.draft.target,
    pairedResearchReading: 'traceable_factual_draft_only',
    relationshipOutcomeEvidenceEstablished: false,
    individualT10InterpretationReady: false,
    recordedResearchSentenceCount: sentences.length,
    observedFactPaths,
    sourceUrls,
    missingInterpretationPrerequisites: distinct([
      ...eligible.missingInterpretationPrerequisites,
      'SOURCE_VALIDATED_RELATIONSHIP_OUTCOME_METHOD',
    ]),
    natalT8ResearchStatus: natalStatus,
    eligibleToHandoffForSalesOrIssuance: false,
  };
}

/**
 * Stage 5: evaluate *real* first, additional and bundled pairs separately.
 * The subject remains the same chart owner across the first two cases.
 * A different personRef identifies a different counterpart even if two
 * counterparts share identical birth details and calculation hashes.
 * T8 is natal-only research and cannot fill the absent T10 relationship model.
 */
export function auditT10ThreeCompositionEligibilityV1(
  first: T10BoundedReadingCase,
  repeat: T10BoundedReadingCase,
  subjectNatal: CompatibilityPersonalRelationshipReading,
): T10ThreeCompositionEligibilityAuditV1 {
  auditT10ReadingDifferentiationV1(first, repeat);
  if (!samePerson(first.draft.subject, repeat.draft.subject) ||
      first.draft.target.personRef === repeat.draft.target.personRef ||
      first.draft.target.personRef === first.draft.subject.personRef ||
      repeat.draft.target.personRef === repeat.draft.subject.personRef ||
      subjectNatal.personRef !== first.draft.subject.personRef ||
      subjectNatal.snapshotId !== first.draft.subject.snapshotId ||
      subjectNatal.calculationHash !== first.draft.subject.calculationHash ||
      !subjectNatal.introduction.trim() ||
      subjectNatal.sections.some(section =>
        !section.title.trim() || !section.paragraph.trim() ||
        section.sourceIds.length < 2 || section.observedFactPaths.length < 2) ||
      (subjectNatal.coverage === 'bounded_natal_t8_research') !==
        (subjectNatal.sections.length > 0)) {
    throw new TypeError('T10 product composition requires original subject and distinct counterpart boundaries.');
  }
  const firstProduct = collect('first_comparison', first, 'not_included');
  const repeatProduct = collect('repeat_comparison', repeat, 'not_included');
  const bundledProduct = collect(
    'natal_and_first_comparison', first, 'separate_research_not_a_t10_substitute');
  if (!repeatProduct.missingInterpretationPrerequisites.includes(
        'EACH_NEW_COUNTERPART_REQUIRES_ITS_OWN_INDEPENDENT_T10_INTERPRETATION') ||
      !bundledProduct.missingInterpretationPrerequisites.includes(
        'T8_ONLY_PERSONAL_READING_CANNOT_SUBSTITUTE_MISSING_T10') ||
      first.quality.productEligibility[2]?.t8StandaloneEligibility !==
        'not_evaluated_here') {
    throw new TypeError('Three T10 compositions cannot reuse T8 as a relationship interpretation.');
  }
  return {
    version: T10_THREE_COMPOSITION_ELIGIBILITY_AUDIT_VERSION,
    lifecycle: 'internal_research_only',
    firstAndRepeatHaveSameSubjectIdentity: true,
    repeatHasIndependentlyAuditedDifferentPersonRef: true,
    sameBirthChartDoesNotImplySameCounterpart: true,
    bundledNatalBoundToFirstSubject: true,
    products: [firstProduct, repeatProduct, bundledProduct],
    overallT10InterpretationQualified: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
