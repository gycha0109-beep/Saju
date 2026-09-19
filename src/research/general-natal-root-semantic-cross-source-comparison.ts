export const R011_ROOT_SEMANTICS_COMPARISON_VERSION = '0.1.0-research' as const;

export type R011ComparisonVerdict =
  | 'SAME_SEMANTIC_SURFACE'
  | 'PARTIAL_OVERLAP'
  | 'DIFFERENT_SCOPE'
  | 'TEXTUAL_INHERITANCE_SUSPECTED'
  | 'INCONCLUSIVE';

export interface R011SourceSurface {
  sourceKey: 'yuanhai_ntl_1926' | 'sanming_siku_juan12' | 'ziping_zhenquan_pingzhu';
  work: string;
  sourceStratum: 'base_text' | 'base_text_plus_commentary';
  evidenceMode: 'scan_search_surface' | 'edition_transcription' | 'repo_governed_direct_review';
  lexicalForms: readonly string[];
  explicitlyDefinesTonggen: boolean;
  admitsWeightedRootClasses: boolean;
  statesMonthBranchPriority: boolean;
  requiresContainedElementInBoundedExample: boolean;
  observedUses: readonly string[];
  authorityBoundary: readonly string[];
}

export const R011_SOURCE_SURFACES: readonly R011SourceSurface[] = Object.freeze([
  {
    sourceKey: 'yuanhai_ntl_1926',
    work: '評註淵海子平 卷四',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'scan_search_surface',
    lexicalForms: ['無根', '有根', '露根', '歸根', '根氣'],
    explicitlyDefinesTonggen: false,
    admitsWeightedRootClasses: false,
    statesMonthBranchPriority: false,
    requiresContainedElementInBoundedExample: false,
    observedUses: [
      '身弱論 condition language',
      '棄命/從殺 boundary language',
      'root-presence changes case outcome',
    ],
    authorityBoundary: [
      'No generic 通根 definition is established by the bounded inspected surface.',
      'No universal root-class table is inferred from case verses.',
    ],
  },
  {
    sourceKey: 'sanming_siku_juan12',
    work: '三命通會 四庫全書本 卷十二',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'edition_transcription',
    lexicalForms: ['無根', '有根', '歸根', '根氣', '寄根'],
    explicitlyDefinesTonggen: false,
    admitsWeightedRootClasses: false,
    statesMonthBranchPriority: false,
    requiresContainedElementInBoundedExample: false,
    observedUses: [
      '身弱/棄命 case language',
      'root-presence changes case outcome',
      'sequence substantially overlaps Yuanhai 四言獨步/root verses',
    ],
    authorityBoundary: [
      'Shared wording is not counted as independent corroboration.',
      'Textual inheritance is suspected but not proven by this artifact.',
    ],
  },
  {
    sourceKey: 'ziping_zhenquan_pingzhu',
    work: '子平真詮 / 子平真詮評註 論十干得時不旺失時不弱',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'repo_governed_direct_review',
    lexicalForms: ['四柱有根', '根之重者', '根之輕者', '明根', '通根'],
    explicitlyDefinesTonggen: true,
    admitsWeightedRootClasses: true,
    statesMonthBranchPriority: true,
    requiresContainedElementInBoundedExample: true,
    observedUses: [
      'root as capacity despite seasonal loss',
      '長生/祿旺 as heavier root class',
      '墓庫/餘氣 as lighter root class',
      'commentary requires applicable contained element for bounded 墓庫/餘氣 examples',
      'commentary gives month branch priority within 通根',
    ],
    authorityBoundary: [
      'Base text and later commentary must remain source-stratum separated.',
      'Comparative language is not a numeric weight scale.',
      'Month-branch priority does not itself define a universal Tonggen resolver.',
    ],
  },
]);

export const R011_PAIRWISE_VERDICTS = Object.freeze([
  {
    left: 'yuanhai_ntl_1926',
    right: 'sanming_siku_juan12',
    verdict: 'TEXTUAL_INHERITANCE_SUSPECTED' as const,
    reason:
      'The bounded 身弱/棄命/root sequence is substantially shared, so duplicate wording cannot be treated as independent doctrinal confirmation.',
  },
  {
    left: 'yuanhai_ntl_1926',
    right: 'ziping_zhenquan_pingzhu',
    verdict: 'PARTIAL_OVERLAP' as const,
    reason:
      'Both use root presence as material to strength/capacity, but the bounded Yuanhai surface is case-oriented while Ziping explicitly discusses root classes and 通根.',
  },
  {
    left: 'sanming_siku_juan12',
    right: 'ziping_zhenquan_pingzhu',
    verdict: 'DIFFERENT_SCOPE' as const,
    reason:
      'The bounded Sanming surface preserves case/verse root language; the selected Ziping passage supplies a more explicit generic root/Tonggen discussion.',
  },
] satisfies readonly {
  left: R011SourceSurface['sourceKey'];
  right: R011SourceSurface['sourceKey'];
  verdict: R011ComparisonVerdict;
  reason: string;
}[]);

export const R011_AUTHORITY = Object.freeze({
  status: 'research' as const,
  crossSourceUniversalTonggenDefinition: false,
  universalRootResolverAuthorized: false,
  rootWeightClassifierAuthorized: false,
  numericRootWeightsAuthorized: false,
  strengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
  directScanClosureComplete: false,
  remainingVerification: [
    'Visually inspect and pin the exact Yuanhai scan leaf/page for the bounded root sequence.',
    'Visually inspect and pin the exact Sanming witness page for the corresponding sequence.',
    'Resolve whether the Sanming/Yuanhai shared sequence is direct textual inheritance, common-source inheritance, or later compilation overlap.',
  ],
});
