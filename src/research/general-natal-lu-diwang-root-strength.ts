export const R017_LU_DIWANG_VERSION = '0.1.0-research' as const;

export type R017SemanticTerm = 'LU' | 'WANG' | 'LINGUAN' | 'DIWANG';

export interface R017AuthoritySurface {
  term: R017SemanticTerm;
  semanticClass:
    | 'HEAVY_ROOT_CLASS'
    | 'TWELVE_GROWTH_STAGE'
    | 'COMMENTARY_TERM_BINDING';
  state:
    | 'GOVERNED_RESEARCH_ONLY'
    | 'SUPPORTED_BOUNDED'
    | 'UNRESOLVED';
  sourceBoundary: string;
}

export const R017_AUTHORITY_SURFACES: readonly R017AuthoritySurface[] = Object.freeze([
  {
    term: 'LU',
    semanticClass: 'HEAVY_ROOT_CLASS',
    state: 'SUPPORTED_BOUNDED',
    sourceBoundary:
      '子平真詮/評註 selected source states 長生祿旺，根之重者也; executable Lu positives remain bounded to already-governed scope.',
  },
  {
    term: 'WANG',
    semanticClass: 'HEAVY_ROOT_CLASS',
    state: 'GOVERNED_RESEARCH_ONLY',
    sourceBoundary:
      'Existing #561/#575 five-element source-native 旺 matcher; not derived from Twelve-Growth 帝旺 cells.',
  },
  {
    term: 'LINGUAN',
    semanticClass: 'TWELVE_GROWTH_STAGE',
    state: 'GOVERNED_RESEARCH_ONLY',
    sourceBoundary:
      'Existing #547 Twelve-Growth mapping substrate from 命理探源; no automatic Lu bridge.',
  },
  {
    term: 'DIWANG',
    semanticClass: 'TWELVE_GROWTH_STAGE',
    state: 'GOVERNED_RESEARCH_ONLY',
    sourceBoundary:
      'Existing #547 Twelve-Growth mapping substrate from 命理探源; no automatic Wang-root bridge.',
  },
]);

export const R017_COMMENTARY_BINDINGS = Object.freeze([
  {
    proposition: '寅申巳亥：五行長生臨官之地；四生（亦是四祿）之地',
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    state: 'BOUNDED_COMMENTARY_ASSOCIATION' as const,
    executableBridgeAuthorized: false,
  },
  {
    proposition: '卯：春木專旺之地，故稱帝旺；子午卯酉為專旺之方',
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    state: 'BOUNDED_COMMENTARY_ASSOCIATION' as const,
    executableBridgeAuthorized: false,
  },
]);

export const R017_CROSS_SOURCE_BRIDGES = Object.freeze({
  twelveGrowthLinguanToLuHeavyRoot: false,
  twelveGrowthDiwangToWangHeavyRoot: false,
  reason:
    'The governed Twelve-Growth table and governed Lu/Wang root semantics have separate source authorities; lexical/commentary association is not silently promoted into an executable cross-source bridge.',
});

export const R017_SCOPE_GAPS = Object.freeze({
  yinLuResolved: false,
  earthLuResolved: false,
  sameSourceXuCommentaryStemBranchBridgeReviewed: true,
  sameSourceXuCommentaryCompleteStemBranchBridgeAvailable: false,
  glyphExactScanClosureComplete: false,
});

export const R017_AUTHORITY = Object.freeze({
  status: 'VERIFIED_BOUNDED_CROSS_SOURCE_BRIDGE_REJECTED' as const,
  luHeavyRootSupportedBounded: true,
  wangHeavyRootGovernedResearchOnly: true,
  diwangStageGovernedResearchOnly: true,
  diwangEqualsWangRootClass: false,
  linguanEqualsLuExecutableBridge: false,
  numericRootStrengthAuthorized: false,
  finalQiangRuoAuthorized: false,
  finalWangShuaiAuthorized: false,
  productionAuthorityPromoted: false,
});
