import type {
  CanonicalSajuSnapshot, FiveElement, PillarSlot,
} from '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { T10ClassicalCrossTenGodResearch } from
  './compatibility-t10-classical-cross-ten-god.js';

export const T10_CLASSICAL_USEFUL_ELEMENT_VERSION =
  'saju-t10-classical-conditional-element-examples-v1' as const;

export const T10_CLASSICAL_USEFUL_ELEMENT_SOURCE = Object.freeze({
  author: '袁樹珊',
  work: '命理探源',
  section: '論男女合婚',
  url: 'https://asklingxi.com/zh-tw/books/mingli-tanyuan/05-huahe-xingchong/28-nannv-hehun',
  verifiedTextLayer: 'PUBLIC_CLASSICAL_TEXT',
  scope: 'TWO_HISTORICALLY_GENDERED_CONDITIONAL_ILLUSTRATIONS_ONLY',
  examplePrerequisites: [
    'MALE_WOOD_STRONG_AND_METAL_REQUIRED',
    'FEMALE_METAL_STRONG_AND_FIRE_PREFERRED',
  ] as const,
  originalProvidesDeterministicUsefulGodSelection: false,
  originalValidatesModernRelationshipOutcomes: false,
});

type ObservationRole = 'male' | 'female';
type IllustrationId = 'male_wood_strong_needs_metal' | 'female_metal_strong_prefers_fire';

export interface T10ClassicalVisibleElements {
  readonly personRef: string;
  readonly snapshotId: string;
  readonly calculationHash: string;
  readonly historicalRole: ObservationRole;
  readonly dayMasterElement: FiveElement | null;
  readonly completeness: 'all_eight_visible' | 'partly_unresolved';
  readonly observed: readonly Readonly<{
    path: string;
    pillar: PillarSlot;
    channel: 'stem' | 'branch';
    element: FiveElement;
  }>[];
  readonly unresolvedPaths: readonly string[];
  readonly actualUsefulGodSelected: false;
  readonly elementStrengthDetermined: false;
}

export interface T10ClassicalConditionalExample {
  readonly id: IllustrationId;
  readonly anchorPersonRef: string;
  readonly counterpartPersonRef: string;
  readonly requiresAnchorElement: FiveElement;
  readonly requiresAnchorElementStrength: 'strong_unverified';
  readonly requiresUsefulElement: FiveElement;
  readonly usefulElementSelectionVerified: false;
  readonly anchorDayMasterMatchesRequiredElement: boolean | null;
  readonly counterpartVisibleRequiredElementPaths: readonly string[];
  readonly counterpartVisibleGeneratingElementPaths: readonly string[];
  readonly otherChartElementStrengthVerified: false;
  readonly prerequisiteEstablished: false;
  readonly elementComplementVerdict: null;
  readonly sourceInterpretationScope: 'ILLUSTRATION_ONLY_NOT_ACTIONABLE';
}

export interface T10ClassicalUsefulElementResearchV1 {
  readonly version: typeof T10_CLASSICAL_USEFUL_ELEMENT_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly source: typeof T10_CLASSICAL_USEFUL_ELEMENT_SOURCE;
  readonly subject: PairwiseSourceScopeHandoff['subject'];
  readonly target: PairwiseSourceScopeHandoff['target'];
  readonly historicalScope: 'male_female_role_matched' | 'historical_sex_scope_not_matched';
  readonly male: T10ClassicalVisibleElements | null;
  readonly female: T10ClassicalVisibleElements | null;
  readonly hypotheticalExamples: readonly T10ClassicalConditionalExample[];
  readonly observedElementsCannotEstablishBalance: true;
  readonly missingPrerequisites: readonly [
    'INDIVIDUAL_STRENGTH_NOT_VERIFIED',
    'USEFUL_ELEMENT_SELECTION_NOT_VERIFIED',
    'OTHER_CHART_ELEMENT_STRENGTH_NOT_VERIFIED',
    'LUCK_AND_CONFLICT_RECONCILIATION_NOT_VERIFIED',
  ];
  readonly usefulGodComparisonAuthorized: false;
  readonly compatibilityVerdict: null;
  readonly pairwiseT10Admitted: false;
  readonly mayClaimInterpersonalMeaning: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

const SLOTS = ['year', 'month', 'day', 'hour'] as const satisfies readonly PillarSlot[];
const CHANNELS = ['stem', 'branch'] as const;

function observeVisibleElements(
  snapshot: CanonicalSajuSnapshot, personRef: string, historicalRole: ObservationRole,
): T10ClassicalVisibleElements {
  const observed: T10ClassicalVisibleElements['observed'][number][] = [];
  const unresolvedPaths: string[] = [];
  for (const pillar of SLOTS) {
    const fact = snapshot.pillars[pillar];
    for (const channel of CHANNELS) {
      const path = `pillars.${pillar}.value.${channel}.element`;
      if (fact.status !== 'resolved') {
        unresolvedPaths.push(path);
      } else {
        observed.push({ path, pillar, channel, element: fact.value[channel].element });
      }
    }
  }
  const day = snapshot.pillars.day;
  return {
    personRef, snapshotId: snapshot.snapshotId,
    calculationHash: snapshot.calculationHash,
    historicalRole,
    dayMasterElement: day.status === 'resolved' ? day.value.stem.element : null,
    completeness: unresolvedPaths.length === 0 ? 'all_eight_visible' : 'partly_unresolved',
    observed, unresolvedPaths,
    actualUsefulGodSelected: false, elementStrengthDetermined: false,
  };
}

function conditionalExample(
  id: IllustrationId, anchor: T10ClassicalVisibleElements,
  counterpart: T10ClassicalVisibleElements,
  anchorElement: FiveElement, requiredElement: FiveElement, generatingElement: FiveElement,
): T10ClassicalConditionalExample {
  return {
    id, anchorPersonRef: anchor.personRef, counterpartPersonRef: counterpart.personRef,
    requiresAnchorElement: anchorElement,
    requiresAnchorElementStrength: 'strong_unverified',
    requiresUsefulElement: requiredElement,
    usefulElementSelectionVerified: false,
    anchorDayMasterMatchesRequiredElement: anchor.dayMasterElement === null
      ? null : anchor.dayMasterElement === anchorElement,
    counterpartVisibleRequiredElementPaths: counterpart.observed
      .filter(x => x.element === requiredElement).map(x => x.path),
    counterpartVisibleGeneratingElementPaths: counterpart.observed
      .filter(x => x.element === generatingElement).map(x => x.path),
    otherChartElementStrengthVerified: false,
    prerequisiteEstablished: false,
    elementComplementVerdict: null,
    sourceInterpretationScope: 'ILLUSTRATION_ONLY_NOT_ACTIONABLE',
  };
}

/**
 * Only source examples are instantiated. The author requires a separate
 * strong/weak assessment and useful-element selection; raw eight symbols
 * do NOT prove strength, need, benefit, relationship quality or spouse outcomes.
 */
export function auditT10ClassicalUsefulElementExamplesV1(
  pair: PairwiseSourceScopeHandoff,
  prior: T10ClassicalCrossTenGodResearch,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T10ClassicalUsefulElementResearchV1 {
  if (pair.owner !== 'R068_R069' || pair.researchOnly !== true ||
      pair.pairwiseT10Admitted !== false || pair.mayPublish !== false ||
      pair.maySell !== false || pair.mayGrantOfficialAuthority !== false ||
      prior.lifecycle !== 'internal_research_only' ||
      prior.pairwiseT10Admitted !== false || prior.maySell !== false ||
      prior.methodConflict !== 'PRIMARY_TEXT_DISPUTES_RAW_PAIRING_AS_SUFFICIENT' ||
      prior.subject.personRef !== pair.subject.personRef ||
      prior.target.personRef !== pair.target.personRef ||
      pair.subject.personRef === pair.target.personRef ||
      pair.subject.snapshotId !== subject.snapshotId ||
      pair.target.snapshotId !== target.snapshotId ||
      pair.subject.calculationHash !== subject.calculationHash ||
      pair.target.calculationHash !== target.calculationHash) {
    throw new TypeError('Classical useful-element source audit requires protected independent charts.');
  }
  let male: T10ClassicalVisibleElements | null = null;
  let female: T10ClassicalVisibleElements | null = null;
  if (prior.historicalScope === 'male_female_role_matched') {
    if (!prior.male || !prior.female) {
      throw new TypeError('Matched historical roles require two sourced role assignments.');
    }
    const maleSnapshot = prior.male.personRef === pair.subject.personRef ? subject : target;
    const femaleSnapshot = prior.female.personRef === pair.subject.personRef ? subject : target;
    if (maleSnapshot.snapshotId !== prior.male.snapshotId ||
        femaleSnapshot.snapshotId !== prior.female.snapshotId ||
        maleSnapshot.calculationHash !== prior.male.calculationHash ||
        femaleSnapshot.calculationHash !== prior.female.calculationHash ||
        maleSnapshot.snapshotId === femaleSnapshot.snapshotId &&
        prior.male.personRef === prior.female.personRef) {
      throw new TypeError('Historical role assignment and calculated birth charts disagree.');
    }
    male = observeVisibleElements(maleSnapshot, prior.male.personRef, 'male');
    female = observeVisibleElements(femaleSnapshot, prior.female.personRef, 'female');
  } else if (prior.male !== null || prior.female !== null) {
    throw new TypeError('Non-applicable historical roles must not infer person identities.');
  }

  const hypotheticalExamples = male && female ? [
    conditionalExample('male_wood_strong_needs_metal', male, female, '목', '금', '토'),
    conditionalExample('female_metal_strong_prefers_fire', female, male, '금', '화', '목'),
  ] : [];

  return {
    version: T10_CLASSICAL_USEFUL_ELEMENT_VERSION,
    lifecycle: 'internal_research_only',
    source: T10_CLASSICAL_USEFUL_ELEMENT_SOURCE,
    subject: pair.subject, target: pair.target,
    historicalScope: prior.historicalScope,
    male, female, hypotheticalExamples,
    observedElementsCannotEstablishBalance: true,
    missingPrerequisites: [
      'INDIVIDUAL_STRENGTH_NOT_VERIFIED',
      'USEFUL_ELEMENT_SELECTION_NOT_VERIFIED',
      'OTHER_CHART_ELEMENT_STRENGTH_NOT_VERIFIED',
      'LUCK_AND_CONFLICT_RECONCILIATION_NOT_VERIFIED',
    ],
    usefulGodComparisonAuthorized: false,
    compatibilityVerdict: null,
    pairwiseT10Admitted: false,
    mayClaimInterpersonalMeaning: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
