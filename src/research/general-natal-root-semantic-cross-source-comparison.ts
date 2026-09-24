export const R011_ROOT_SEMANTICS_COMPARISON_VERSION = '0.2.0-research' as const;

export type R011ComparisonVerdict =
  | 'SAME_SEMANTIC_SURFACE'
  | 'PARTIAL_OVERLAP'
  | 'DIFFERENT_SCOPE'
  | 'TEXTUAL_INHERITANCE_SUSPECTED'
  | 'INCONCLUSIVE';

export type R011EvidenceMode =
  | 'DIRECT_VISUAL_REGISTERED_SCAN'
  | 'REPO_GOVERNED_DIRECT_REVIEW';

export interface R011DirectVisualLocator {
  sourceKey: 'yuanhai_ntl_1926' | 'sanming_nlc_1926_juan12';
  witnessId: string;
  pageCount: number;
  humanFilePageNumber: number;
  zeroBasedFilePageIndex: number;
  printedPageLabel: string;
  visibleSection: string;
  visualAnchors: readonly string[];
  originalFileSha256: string | null;
  evidenceCaptureSha256: string | null;
  evidenceCaptureDimensions: readonly [number, number] | null;
  renderDimensions: readonly [number, number] | null;
  renderDpi: number | null;
  provenanceNote: string;
}

export interface R011SourceSurface {
  sourceKey:
    | 'yuanhai_ntl_1926'
    | 'sanming_nlc_1926_juan12'
    | 'ziping_zhenquan_pingzhu';
  work: string;
  sourceStratum: 'base_text' | 'base_text_plus_commentary';
  evidenceMode: R011EvidenceMode;
  lexicalForms: readonly string[];
  explicitlyDefinesTonggen: boolean;
  admitsWeightedRootClasses: boolean;
  statesMonthBranchPriority: boolean;
  requiresContainedElementInBoundedExample: boolean;
  observedUses: readonly string[];
  authorityBoundary: readonly string[];
}

export const R011_DIRECT_VISUAL_LOCATORS: readonly R011DirectVisualLocator[] =
  Object.freeze([
    {
      sourceKey: 'yuanhai_ntl_1926',
      witnessId: 'NTL-9900014380',
      pageCount: 164,
      humanFilePageNumber: 34,
      zeroBasedFilePageIndex: 33,
      printedPageLabel: '三三',
      visibleSection: '評註淵海子平卷四 / 身弱論',
      visualAnchors: [
        '評註淵海子平卷四',
        '身弱論',
        '陽木無根',
        '有根南旺',
      ],
      originalFileSha256: null,
      evidenceCaptureSha256:
        'b4b469b46cf023b1d97f5db0365419ebe21c46bde53f931edaaf5a57320fe288',
      evidenceCaptureDimensions: [538, 831],
      renderDimensions: null,
      renderDpi: null,
      provenanceNote:
        'Registered NTL 1926 scan identity and digital page 34 transition were already governed in repository direct-inspection evidence; 2026-09-24 direct visual user inspection of that registered scan page visibly confirms 身弱論 and 陽木無根 with printed marker 三三. The capture digest is recorded as a corroborating derivative, not as a replacement witness identity.',
    },
    {
      sourceKey: 'sanming_nlc_1926_juan12',
      witnessId: 'NLC416-13jh000624-42998',
      pageCount: 345,
      humanFilePageNumber: 341,
      zeroBasedFilePageIndex: 340,
      printedPageLabel: '四四',
      visibleSection: '三命通會 卷十二 / 身弱 sequence',
      visualAnchors: [
        '三命通會',
        '卷十二',
        '陽木無根',
        '有根南旺',
        '會逢根氣',
      ],
      originalFileSha256:
        'b90f9e722407fed6d564300eb71cbae55014f6a35a849ce9e2b940fae4b915bd',
      evidenceCaptureSha256: null,
      evidenceCaptureDimensions: null,
      renderDimensions: [1084, 1500],
      renderDpi: 200,
      provenanceNote:
        'User-supplied NLC 1926 PDF was inspected directly from the original uploaded binary. Page 341/345 was rendered at 200 DPI and visibly confirms the compared root sequence. SHA-256 binds this inspection to the exact uploaded file.',
    },
  ]);

export const R011_SOURCE_SURFACES: readonly R011SourceSurface[] = Object.freeze([
  {
    sourceKey: 'yuanhai_ntl_1926',
    work: '評註淵海子平 卷四',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'DIRECT_VISUAL_REGISTERED_SCAN',
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
      'Direct visual closure of this page does not establish a universal negative root resolver.',
    ],
  },
  {
    sourceKey: 'sanming_nlc_1926_juan12',
    work: '三命通會 卷十二 / 文明書局 / 民國十五年 [1926]',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'DIRECT_VISUAL_REGISTERED_SCAN',
    lexicalForms: ['無根', '有根', '根氣'],
    explicitlyDefinesTonggen: false,
    admitsWeightedRootClasses: false,
    statesMonthBranchPriority: false,
    requiresContainedElementInBoundedExample: false,
    observedUses: [
      '身弱/棄命 case language',
      'root-presence changes case outcome',
      'sequence substantially overlaps the Yuanhai bounded root verses',
    ],
    authorityBoundary: [
      'Shared wording is not counted as independent corroboration.',
      'Textual inheritance is suspected but the exact mechanism remains inconclusive.',
      'The direct visual page does not create a generic 通根 definition.',
    ],
  },
  {
    sourceKey: 'ziping_zhenquan_pingzhu',
    work: '子平真詮 / 子平真詮評註 論十干得時不旺失時不弱',
    sourceStratum: 'base_text_plus_commentary',
    evidenceMode: 'REPO_GOVERNED_DIRECT_REVIEW',
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
    right: 'sanming_nlc_1926_juan12',
    verdict: 'TEXTUAL_INHERITANCE_SUSPECTED' as const,
    lineageMechanism: 'INCONCLUSIVE_DIRECT_OR_COMMON_SOURCE' as const,
    reason:
      'Directly inspected pages preserve substantially overlapping 身弱/root wording. The overlap is therefore not counted as an independent doctrinal vote, while the exact direction or common-source mechanism remains unresolved.',
  },
  {
    left: 'yuanhai_ntl_1926',
    right: 'ziping_zhenquan_pingzhu',
    verdict: 'PARTIAL_OVERLAP' as const,
    lineageMechanism: 'NOT_ASSERTED' as const,
    reason:
      'Both use root presence as material to strength/capacity, but the bounded Yuanhai surface is case-oriented while Ziping explicitly discusses root classes and 通根.',
  },
  {
    left: 'sanming_nlc_1926_juan12',
    right: 'ziping_zhenquan_pingzhu',
    verdict: 'DIFFERENT_SCOPE' as const,
    lineageMechanism: 'NOT_ASSERTED' as const,
    reason:
      'The bounded Sanming surface preserves case/verse root language; the selected Ziping passage supplies a more explicit generic root/Tonggen discussion.',
  },
] satisfies readonly {
  left: R011SourceSurface['sourceKey'];
  right: R011SourceSurface['sourceKey'];
  verdict: R011ComparisonVerdict;
  lineageMechanism: string;
  reason: string;
}[]);

export const R011_REJECTED_NORMALIZATIONS = Object.freeze([
  'THREE_SOURCE_FAMILIES_EQUAL_ONE_UNIVERSAL_TONGGEN_PREDICATE',
  'YUANHAI_SANMING_SHARED_WORDING_EQUALS_INDEPENDENT_CORROBORATION',
  'ROOT_PRESENCE_EQUALS_HIDDEN_STEM_CONTAINMENT_IN_ALL_SOURCES',
  'COMPARATIVE_HEAVY_LIGHT_LANGUAGE_EQUALS_NUMERIC_WEIGHT',
  'MONTH_BRANCH_PRIORITY_EQUALS_COMPLETE_TONGGEN_RESOLVER',
  'DIRECT_VISUAL_CLOSURE_EQUALS_GLOBAL_NEGATIVE_ROOT_RESOLVER',
  'DIRECT_VISUAL_CLOSURE_EQUALS_FINAL_QIANG_RUO_CLASSIFIER',
  'RESEARCH_CLOSURE_EQUALS_PRODUCTION_AUTHORITY',
] as const);

export const R011_AUTHORITY = Object.freeze({
  status: 'VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE' as const,
  researchOnly: true,
  crossSourceUniversalTonggenDefinition: false,
  universalRootResolverAuthorized: false,
  globalNegativeRootResolverAuthorized: false,
  rootWeightClassifierAuthorized: false,
  numericRootWeightsAuthorized: false,
  strengthClassifierAuthorized: false,
  productionAuthorityPromoted: false,
  directScanClosureComplete: true,
  yuanHaiDirectVisualPinned: true,
  sanmingDirectVisualPinned: true,
  exactLineageMechanismResolved: false,
  lineageDisposition: 'TEXTUAL_INHERITANCE_SUSPECTED_MECHANISM_INCONCLUSIVE' as const,
  remainingClosureBlockers: [] as const,
  optionalFollowUp: [
    'Resolve direct-vs-common-source lineage mechanism between the bounded Yuanhai and Sanming sequence if stronger stemmatic evidence becomes available.',
    'Materialize fully reusable R097 manifests if the original NTL 1926 binary checksum is later captured; this is reproducibility hardening, not an R011 semantic-closure blocker.',
  ] as const,
});
