import type { MaritalDayBranchCandidateV1 } from './compatibility-marital-day-branch-candidate.js';
import type { MaritalPalaceIntraChartResearchV1 } from './compatibility-marital-palace-intra-chart-research.js';
import type { PairwiseSourceScopeHandoff } from './family-pair-source-scope-handoff.js';

export const COMPATIBILITY_T10_METHOD_COVERAGE_VERSION =
  'saju-compatibility-t10-method-coverage-research-v1' as const;

type R069Surface = PairwiseSourceScopeHandoff['comparedSourceSurfaces'][number];

export interface CompatibilityT10MethodCoverageV1 {
  readonly version: typeof COMPATIBILITY_T10_METHOD_COVERAGE_VERSION;
  readonly lifecycle: 'internal_research_only';
  readonly sourceScope: 'traditional_marital_research_only';
  readonly palace: {
    readonly status: 'bounded_factual_observations';
    readonly crossChartDayBranch: MaritalDayBranchCandidateV1;
    readonly personalDayPalace: MaritalPalaceIntraChartResearchV1;
  };
  readonly sixSpirits: {
    readonly status: 'historical_single_chart_only';
    readonly sourceCorpus: 'R069';
    readonly originalSourceSurfaces: readonly Readonly<{
      originalClaimId: string;
      sourceSurface: string;
      historicalSexScope: string | undefined;
      eligiblePairwiseClaim: false;
      missingPrerequisites: readonly string[];
    }>[];
    readonly crossChartMethodEstablished: false;
  };
  readonly usefulGod: {
    readonly status: 'pairwise_rule_not_established_in_reviewed_sources';
    readonly researchMethodSource: Readonly<{
      title: '자평사주 궁합론 연구';
      authorYear: '주미강(2014)';
      originalTextLayer: 'RISS_ABSTRACT';
      url: 'https://www.riss.kr/link?id=T13562621';
    }>;
    readonly missingPrerequisites: readonly [
      'SOURCE_VERIFIED_INDIVIDUAL_YONGSHIN_DETERMINATION',
      'SOURCE_VERIFIED_CROSS_CHART_COMPLEMENT_RULE',
    ];
  };
  readonly unresolvedMethodConflicts: readonly [
    'NO_VERIFIED_THREE_METHOD_PRECEDENCE',
    'NO_VERIFIED_CROSS_CHART_T10_SYNTHESIS',
  ];
  readonly pairwiseT10Admitted: false;
  readonly mayClaimRelationshipOutcome: false;
  readonly mayGrantOfficialAuthority: false;
  readonly mayPublish: false;
  readonly maySell: false;
}

function matchesIdentity(
  a: PairwiseSourceScopeHandoff['subject'],
  b: { readonly personRef: string; readonly snapshotId: string; readonly calculationHash: string },
): boolean {
  return a.personRef === b.personRef &&
    a.snapshotId === b.snapshotId &&
    a.calculationHash === b.calculationHash;
}

/**
 * Classifies EXISTING research evidence; never determines compatibility.
 * The three lenses are identified in the 2014 RISS abstract, but the text
 * does not admit an executable cross-chart rule, usefulness judgment, or
 * priority among historical schools. The 2018 KCI paper is a marital sample.
 */
export function buildCompatibilityT10MethodCoverageV1(
  pair: PairwiseSourceScopeHandoff,
  dayBranch: MaritalDayBranchCandidateV1,
  singleChartPalace: MaritalPalaceIntraChartResearchV1,
): CompatibilityT10MethodCoverageV1 {
  if (pair.owner !== 'R068_R069' ||
      pair.pairwiseT10Admitted !== false ||
      pair.mayPublish !== false || pair.maySell !== false ||
      dayBranch.pairwiseT10Admitted !== false ||
      dayBranch.review !== 'unreviewed' ||
      singleChartPalace.pairwiseT10Admitted !== false ||
      singleChartPalace.mayPublish !== false || singleChartPalace.maySell !== false ||
      !matchesIdentity(pair.subject, dayBranch.subject) ||
      !matchesIdentity(pair.target, dayBranch.target) ||
      !matchesIdentity(pair.subject, singleChartPalace.subject) ||
      !matchesIdentity(pair.target, singleChartPalace.target) ||
      !singleChartPalace.source.verifiedTextLayer.includes('ABSTRACT_ONLY')) {
    throw new TypeError('Compatibility research evidence must retain exact people and HOLD authority.');
  }

  if (dayBranch.state === 'candidate_factor' &&
      !pair.crossChartStructuralMatches.some(match =>
        match.relationId === dayBranch.evidence.relationId &&
        match.kind === dayBranch.evidence.kind &&
        match.subject.factPath === dayBranch.evidence.subject.factPath &&
        match.target.factPath === dayBranch.evidence.target.factPath &&
        match.definitionContentHash === dayBranch.evidence.definitionContentHash &&
        match.pairwiseMeaningAuthorized === false)) {
    throw new TypeError('Marital day-branch candidate must match existing sourced chart facts.');
  }

  const spouseSurfaces: readonly R069Surface[] = pair.comparedSourceSurfaces
    .filter(item => item.corpusId === 'R069');
  if (spouseSurfaces.length === 0 || spouseSurfaces.some(item =>
    item.eligiblePairwiseClaim !== false || item.disposition !== 'REJECTED')) {
    throw new TypeError('R069 cannot grant two-person meaning.');
  }

  return {
    version: COMPATIBILITY_T10_METHOD_COVERAGE_VERSION,
    lifecycle: 'internal_research_only',
    sourceScope: 'traditional_marital_research_only',
    palace: {
      status: 'bounded_factual_observations',
      crossChartDayBranch: dayBranch,
      personalDayPalace: singleChartPalace,
    },
    sixSpirits: {
      status: 'historical_single_chart_only',
      sourceCorpus: 'R069',
      originalSourceSurfaces: spouseSurfaces.map(surface => ({
        originalClaimId: surface.originalClaimId,
        sourceSurface: surface.sourceSurface,
        historicalSexScope: surface.historicalSexScope,
        eligiblePairwiseClaim: false,
        missingPrerequisites: [...surface.missingPrerequisites],
      })),
      crossChartMethodEstablished: false,
    },
    usefulGod: {
      status: 'pairwise_rule_not_established_in_reviewed_sources',
      researchMethodSource: {
        title: '자평사주 궁합론 연구',
        authorYear: '주미강(2014)',
        originalTextLayer: 'RISS_ABSTRACT',
        url: 'https://www.riss.kr/link?id=T13562621',
      },
      missingPrerequisites: [
        'SOURCE_VERIFIED_INDIVIDUAL_YONGSHIN_DETERMINATION',
        'SOURCE_VERIFIED_CROSS_CHART_COMPLEMENT_RULE',
      ],
    },
    unresolvedMethodConflicts: [
      'NO_VERIFIED_THREE_METHOD_PRECEDENCE',
      'NO_VERIFIED_CROSS_CHART_T10_SYNTHESIS',
    ],
    pairwiseT10Admitted: false,
    mayClaimRelationshipOutcome: false,
    mayGrantOfficialAuthority: false,
    mayPublish: false,
    maySell: false,
  };
}
