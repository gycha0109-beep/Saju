import type { CanonicalSajuSnapshot, PillarSlot } from
  '../contracts/calculation.js';
import type { PairwiseSourceScopeHandoff } from
  './family-pair-source-scope-handoff.js';
import type { MaritalPalaceIntraChartResearchV1 } from
  './compatibility-marital-palace-intra-chart-research.js';
import {
  auditT102018DivorcedCoupleMethodBoundaryV1,
  type T102018DivorcedCoupleSourceBoundaryV1,
  type T102018SpouseAxisObservation,
} from './compatibility-t10-2018-marital-divorce-study-boundary.js';
import {
  buildT10RelationshipContextBoundaryV1,
  type T10RelationshipContextBoundaryV1,
} from './compatibility-t10-relationship-context-boundary.js';
import type { T10PairReadingBoundaryDraftV1 } from
  './compatibility-t10-pair-reading-boundary-draft.js';
import type { T10ProductReadingQualityReviewV1 } from
  './compatibility-t10-product-reading-quality-review.js';

export const T10_2018_MARITAL_RESEARCH_READING_VERSION =
  'saju-t10-2018-marital-factual-reading-v1' as const;

export interface T102018MaritalReadingSentence {
  readonly paragraph: string;
  readonly evidenceLevel: 'calculated_natal_fact' | 'source_method_limit';
  readonly personRef: string | null;
  readonly historicalRole: T102018SpouseAxisObservation['historicalRole'] | null;
  readonly observedFactPaths: readonly string[];
  readonly unavailableFactPaths: readonly string[];
  readonly sourceUrls: readonly string[];
  readonly sourceLayer: 'KCI_PUBLIC_ABSTRACT_AND_AUTHOR_INDEX_ONLY';
  readonly missingPrerequisites: readonly string[];
  readonly relationshipInterpretationAuthorized: false;
}

export interface T102018MaritalResearchReadingV1 {
  readonly version: typeof T10_2018_MARITAL_RESEARCH_READING_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly relationshipContext: 'married_couple';
  readonly subject: T10RelationshipContextBoundaryV1['subject'];
  readonly target: T10RelationshipContextBoundaryV1['target'];
  readonly sectionTitle: '2018년 이별 부부 연구 — 원국에서 확인된 사실';
  readonly sentences: readonly [
    T102018MaritalReadingSentence,
    T102018MaritalReadingSentence,
    T102018MaritalReadingSentence,
  ];
  readonly contextBoundedKoreanReading: string;
  readonly originalStudyFullTextVerified: false;
  readonly spouseStarStrengthEstablished: false;
  readonly palaceStarPriorityApplicableToThisPair: false;
  readonly interpersonalOutcomeValidated: false;
  readonly relationshipVerdict: null;
  readonly compatibilityScore: null;
  readonly eligibleForAnyT10Product: false;
  readonly mayPublish: false;
  readonly mayPersist: false;
  readonly maySell: false;
}

const PILLARS: Readonly<Record<PillarSlot, string>> = {
  year: '연주', month: '월주', day: '일주', hour: '시주',
};
const CHANNELS = { stem: '천간', branch: '지지' } as const;

function exactIdentity(
  left: T102018SpouseAxisObservation,
  source: CanonicalSajuSnapshot,
  personRef: string,
): boolean {
  return left.personRef === personRef &&
    left.snapshotId === source.snapshotId &&
    left.calculationHash === source.calculationHash;
}

function personSentence(
  scope: 'subject' | 'target',
  item: T102018SpouseAxisObservation,
  label: string,
  prerequisites: readonly string[],
  sourceUrl: string,
  authorIndexUrl: string,
): T102018MaritalReadingSentence {
  const dayText = item.palaceElements === null
    ? '일간과 일지의 오행을 아직 확정할 수 없습니다.'
    : `일간의 오행은 ${item.palaceElements.stem}, ` +
      `일지의 오행은 ${item.palaceElements.branch}이며 두 오행이 ` +
      (item.palaceState === 'same_element' ? '같습니다.' : '다릅니다.');
  const observed = item.visibleSpouseStarPositions.map(star =>
    `${star.value}(${PILLARS[star.pillar]} ${CHANNELS[star.channel]})`);
  const starText = item.visibleSpouseStarKind === null
    ? '원문이 전제한 역사적 남편·부인 분류 조건에 해당하지 않아 재성·관성 비교를 적용하지 않습니다.'
    : `역사적 ${item.historicalRole === 'husband' ? '남편' : '부인'} 조건에서 ` +
      (observed.length
        ? `${item.visibleSpouseStarKind}이 확인된 위치는 ${observed.join(', ')}입니다. `
        : `현재 확인된 ${item.inspectedStarFacts.length}개 위치에서는 ` +
          `${item.visibleSpouseStarKind}이 관측되지 않았습니다. `) +
      (item.unobservedStarFactPaths.length > 0
        ? '일부 계산 위치가 미상이라 전체 출현 여부도 확정할 수 없습니다. '
        : '') +
      '위치의 유무만으로 배우자성의 세력·강약을 판정할 수 없습니다.';
  return {
    paragraph: `${label}: ${dayText} ${starText}`,
    evidenceLevel: 'calculated_natal_fact',
    personRef: item.personRef,
    historicalRole: item.historicalRole,
    observedFactPaths: [
      ...item.palaceObservedFactPaths.map(path => scope + '.' + path),
      ...item.inspectedStarFacts.map(star => scope + '.' + star.factPath),
    ],
    unavailableFactPaths: item.unobservedStarFactPaths.map(path => scope + '.' + path),
    sourceUrls: [sourceUrl, authorIndexUrl],
    sourceLayer: 'KCI_PUBLIC_ABSTRACT_AND_AUTHOR_INDEX_ONLY',
    missingPrerequisites: [...prerequisites],
    relationshipInterpretationAuthorized: false,
  };
}

/**
 * Only the declared marital research copy includes the author's 2018 study.
 * Rebuild both the earlier context and 2018 chart audit from their sources so
 * tampered person identities, star paths, prose and results cannot enter it.
 */
export function buildT102018MaritalResearchReadingV1(
  scope: T10RelationshipContextBoundaryV1,
  draft: T10PairReadingBoundaryDraftV1,
  quality: T10ProductReadingQualityReviewV1,
  study: T102018DivorcedCoupleSourceBoundaryV1,
  pair: PairwiseSourceScopeHandoff,
  palace: MaritalPalaceIntraChartResearchV1,
  subject: CanonicalSajuSnapshot,
  target: CanonicalSajuSnapshot,
): T102018MaritalResearchReadingV1 {
  if (scope.contextDeclaredByResearchCaller !== 'married_couple' ||
      scope.contextSourceApplicability !== 'marital_population_overlap_not_prediction' ||
      scope.mayPublish !== false || scope.maySell !== false ||
      scope.productInterpretationReady !== false ||
      study.lifecycle !== 'internal_research_only' ||
      study.source.fullArticleMethodRead !== false ||
      study.source.primaryCaseEvidenceAudited !== false ||
      study.weakStarConditionEstablished !== false ||
      study.palaceOutranksStarForThisPair !== false ||
      study.twoPersonOutcomeRuleEstablished !== false ||
      study.sourceQualifiedT10Conclusion !== null ||
      study.maySell !== false || study.mayPublish !== false ||
      !exactIdentity(study.subject, subject, scope.subject.personRef) ||
      !exactIdentity(study.target, target, scope.target.personRef) ||
      !scope.sourcePopulations.some(item =>
        item.name === 'NAM_KIM_2018_DIVORCED' &&
        item.declaredContextOverlapsStudyPopulation &&
        item.sourceUrl === study.source.abstractUrl)) {
    throw new TypeError('2018 Korean marital research requires source-qualified marital evidence.');
  }
  const rebuiltScope = buildT10RelationshipContextBoundaryV1(
    draft, quality, 'married_couple',
  );
  const rebuiltStudy = auditT102018DivorcedCoupleMethodBoundaryV1(
    pair, palace, subject, target,
  );
  if (JSON.stringify(scope) !== JSON.stringify(rebuiltScope) ||
      JSON.stringify(study) !== JSON.stringify(rebuiltStudy)) {
    throw new TypeError('2018 Korean marital reading rejects chart or source evidence substitution.');
  }
  const sourceUrls = [study.source.abstractUrl, study.source.authorIndexUrl];
  const sentences: T102018MaritalResearchReadingV1['sentences'] = [
    personSentence('subject', study.subject, '첫 번째 명식',
      study.missingPrerequisites, study.source.abstractUrl, study.source.authorIndexUrl),
    personSentence('target', study.target, '두 번째 명식',
      study.missingPrerequisites, study.source.abstractUrl, study.source.authorIndexUrl),
    {
      paragraph: '2018년 연구는 이별한 부부 사례의 배우자궁과 배우자성을 비교합니다. ' +
        '논문이 보고한 궁위 우선 주장을 이 두 사람의 우선순위·혼인 안정성·이혼 예측에 ' +
        '그대로 적용할 수 없습니다. 본문 사례와 강약·예외 조건은 미검증입니다.',
      evidenceLevel: 'source_method_limit',
      personRef: null,
      historicalRole: null,
      observedFactPaths: [],
      unavailableFactPaths: [],
      sourceUrls,
      sourceLayer: 'KCI_PUBLIC_ABSTRACT_AND_AUTHOR_INDEX_ONLY',
      missingPrerequisites: [...study.missingPrerequisites],
      relationshipInterpretationAuthorized: false,
    },
  ];
  const sectionTitle = '2018년 이별 부부 연구 — 원국에서 확인된 사실' as const;
  const contextBoundedKoreanReading = scope.contextBoundedKoreanDraft +
    '\n\n' + sectionTitle + '\n' +
    sentences.map(sentence => sentence.paragraph).join('\n');
  return {
    version: T10_2018_MARITAL_RESEARCH_READING_VERSION,
    lifecycle: 'internal_research_only',
    relationshipContext: 'married_couple',
    subject: scope.subject,
    target: scope.target,
    sectionTitle,
    sentences,
    contextBoundedKoreanReading,
    originalStudyFullTextVerified: false,
    spouseStarStrengthEstablished: false,
    palaceStarPriorityApplicableToThisPair: false,
    interpersonalOutcomeValidated: false,
    relationshipVerdict: null,
    compatibilityScore: null,
    eligibleForAnyT10Product: false,
    mayPublish: false,
    mayPersist: false,
    maySell: false,
  };
}
