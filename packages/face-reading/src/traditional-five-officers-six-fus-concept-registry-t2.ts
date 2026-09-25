export type FiveOfficersSixFusEvidenceStateT2 =
  | 'scan_checked_successor'
  | 'electronic_unverified'
  | 'mixed_authority';

export interface TraditionalOfficerMappingT2 {
  readonly feature: 'ear' | 'brow' | 'eye' | 'nose' | 'mouth';
  readonly traditionalOfficerName: string;
}

export interface TraditionalFiveOfficersConceptSenseT2 {
  readonly conceptId: string;
  readonly tradition: 'shenxiang' | 'liuzhuang';
  readonly traditionalTerm: '五官';
  readonly sourceRefs: readonly string[];
  readonly evidenceState: FiveOfficersSixFusEvidenceStateT2;
  readonly officerMappings: readonly TraditionalOfficerMappingT2[];
  readonly mappingAuthorityStatus:
    | 'direct_scan_page_not_yet_pinned'
    | 'electronic_mapping_only';
  readonly formationCriteriaAuthority:
    | 'mixed_only_intake_scan_checked'
    | 'not_admitted';
  readonly limitations: readonly string[];
}

export interface TraditionalOfficerFormationSenseT2 {
  readonly conceptId: string;
  readonly parentFiveOfficersConceptId: string;
  readonly traditionalOfficerName: '出納官';
  readonly anatomicalTarget: 'mouth';
  readonly sourceRefs: readonly string[];
  readonly methodologyRef: string;
  readonly evidenceState: 'scan_checked_successor';
  readonly sourceConcepts: readonly [
    '方大',
    '唇紅端厚',
    '角弓',
    '開大合小',
  ];
  readonly semanticExecutionAuthorized: false;
  readonly limitations: readonly string[];
}

export interface TraditionalSixFusConceptSenseT2 {
  readonly conceptId: string;
  readonly tradition: 'shenxiang' | 'liuzhuang';
  readonly traditionalTerm: '六府';
  readonly sourceRefs: readonly string[];
  readonly evidenceState: 'electronic_unverified';
  readonly pairs: readonly {
    readonly pairRole: 'upper' | 'middle' | 'lower';
    readonly traditionalLabel: string;
    readonly sourceLocationTerms: readonly string[];
  }[];
  readonly regionIdentitySharedAcrossTraditions: false;
  readonly limitations: readonly string[];
}

export const FACE_TRADITIONAL_T2_FIVE_OFFICERS_CONCEPTS = [
  {
    conceptId: 'trad.face.shenxiang.five_officers.mapping',
    tradition: 'shenxiang',
    traditionalTerm: '五官',
    sourceRefs: [
      'passage.shenxiang.five_officers.mapping',
    ],
    evidenceState: 'mixed_authority',
    officerMappings: [
      { feature: 'ear', traditionalOfficerName: '採聽官' },
      { feature: 'brow', traditionalOfficerName: '保壽官' },
      { feature: 'eye', traditionalOfficerName: '監察官' },
      { feature: 'nose', traditionalOfficerName: '審辨官' },
      { feature: 'mouth', traditionalOfficerName: '出納官' },
    ],
    mappingAuthorityStatus:
      'direct_scan_page_not_yet_pinned',
    formationCriteriaAuthority:
      'mixed_only_intake_scan_checked',
    limitations: [
      'The 五官 mapping passage remains electronic/unverified in the v0 registry.',
      'A scan-checked 出納官 criterion passage does not by itself promote the full five-officer mapping or the other four 官成 sections.',
      'The mapping relation and 官成 criteria are separate source-authority questions.',
    ],
  },
  {
    conceptId: 'trad.face.liuzhuang.five_officers.mapping',
    tradition: 'liuzhuang',
    traditionalTerm: '五官',
    sourceRefs: [
      'passage.liuzhuang.five_officers.mapping',
    ],
    evidenceState: 'electronic_unverified',
    officerMappings: [
      { feature: 'brow', traditionalOfficerName: '保壽官' },
      { feature: 'eye', traditionalOfficerName: '監察官' },
      { feature: 'nose', traditionalOfficerName: '審判官' },
      { feature: 'ear', traditionalOfficerName: '採聽官' },
      { feature: 'mouth', traditionalOfficerName: '出納官' },
    ],
    mappingAuthorityStatus: 'electronic_mapping_only',
    formationCriteriaAuthority: 'not_admitted',
    limitations: [
      'The current locator is an electronic-text passage and remains unverified_ocr.',
      '審判官 must not be normalized to 神相全編 審辨官 until a controlled witness comparison resolves the variant.',
      'Shared officer-feature correspondences do not establish independent corroboration without genealogy review.',
    ],
  },
] as const satisfies readonly TraditionalFiveOfficersConceptSenseT2[];

export const FACE_TRADITIONAL_T2_INTAKE_FORMATION_SENSE: TraditionalOfficerFormationSenseT2 =
  Object.freeze({
    conceptId:
      'trad.face.shenxiang.five_officers.intake_formation_criteria',
    parentFiveOfficersConceptId:
      'trad.face.shenxiang.five_officers.mapping',
    traditionalOfficerName: '出納官',
    anatomicalTarget: 'mouth',
    sourceRefs: [
      'passage.shenxiang.five_officers.intake.nlc_1925',
    ],
    methodologyRef:
      'method.shenxiang.five_officers.intake_criteria@0.2.0',
    evidenceState: 'scan_checked_successor',
    sourceConcepts: [
      '方大',
      '唇紅端厚',
      '角弓',
      '開大合小',
    ],
    semanticExecutionAuthorized: false,
    limitations: [
      'FR117–FR123 establish a witness-qualified NLC-1925 successor path for the 出納官 criterion passage only.',
      'The source compound does not authorize automatic decomposition into numeric image metrics.',
      'FR132 keeps construct validity, traditional metric binding, calibration, thresholds, and automatic criterion states unauthorized.',
      'This stronger criterion authority does not resolve the parent 五官 mapping passage authority.',
    ],
  });

export const FACE_TRADITIONAL_T2_SIX_FUS_CONCEPTS = [
  {
    conceptId: 'trad.face.shenxiang.six_fus.mapping',
    tradition: 'shenxiang',
    traditionalTerm: '六府',
    sourceRefs: [
      'passage.shenxiang.six_fus.mapping',
    ],
    evidenceState: 'electronic_unverified',
    pairs: [
      {
        pairRole: 'upper',
        traditionalLabel: '天府',
        sourceLocationTerms: ['天庭', '日角', '月角'],
      },
      {
        pairRole: 'middle',
        traditionalLabel: '人府',
        sourceLocationTerms: ['兩顴'],
      },
      {
        pairRole: 'lower',
        traditionalLabel: '地府',
        sourceLocationTerms: ['地角', '邊腮'],
      },
    ],
    regionIdentitySharedAcrossTraditions: false,
    limitations: [
      'The current source passage remains unverified_ocr.',
      'Traditional location terms are preserved as source semantics only; no modern region geometry is authorized here.',
    ],
  },
  {
    conceptId: 'trad.face.liuzhuang.six_fus.mapping',
    tradition: 'liuzhuang',
    traditionalTerm: '六府',
    sourceRefs: [
      'passage.liuzhuang.six_fus.mapping',
    ],
    evidenceState: 'electronic_unverified',
    pairs: [
      {
        pairRole: 'upper',
        traditionalLabel: '上二府',
        sourceLocationTerms: ['天倉'],
      },
      {
        pairRole: 'middle',
        traditionalLabel: '中二府',
        sourceLocationTerms: ['顴骨'],
      },
      {
        pairRole: 'lower',
        traditionalLabel: '下二府',
        sourceLocationTerms: ['地庫'],
      },
    ],
    regionIdentitySharedAcrossTraditions: false,
    limitations: [
      'The current source passage remains unverified_ocr.',
      '上二府/中二府/下二府 must not be rewritten as the 神相 天府/人府/地府 mapping.',
      'The NLC-1925 witness exists, but the target passage must be scan-pinned before source promotion.',
    ],
  },
] as const satisfies readonly TraditionalSixFusConceptSenseT2[];

export const FACE_TRADITIONAL_T2_FIVE_OFFICERS_SIX_FUS_RELATIONS =
  Object.freeze({
    fiveOfficersEqualsFiveAnatomicalFeatures: false as const,
    fiveOfficersMappingEqualsFormationCriteria: false as const,
    intakeCriterionSuccessorPromotesAllFiveOfficers: false as const,
    shenxiangAndLiuzhuangOfficerTitleVariantResolved: false as const,
    sixFusRegionIdentitySharedAcrossTraditions: false as const,
    repeatedElectronicTextCountsAsIndependentCorroboration:
      false as const,
    crossLineageNormalizationAuthorized: false as const,
    productionAuthorization: false as const,
  });

export const FACE_TRADITIONAL_T2_FIVE_OFFICERS_SIX_FUS_SOURCE_GATES =
  Object.freeze([
    {
      gateId: 't2.fo.gate.shenxiang_mapping',
      targetConceptId:
        'trad.face.shenxiang.five_officers.mapping',
      nextRequirement:
        'Pin and scan-check the controlled 神相全編 五官說 mapping passage.',
      status: 'blocked_pending_direct_witness_page',
    },
    {
      gateId: 't2.fo.gate.shenxiang_non_intake_formation',
      targetConceptId:
        'trad.face.shenxiang.five_officers.non_intake_formation_criteria',
      nextRequirement:
        'Pin direct witness pages for 採聽官 / 保壽官 / 監察官 / 審辨官 criterion sections independently.',
      status: 'blocked_pending_direct_witness_pages',
    },
    {
      gateId: 't2.fo.gate.liuzhuang_mapping',
      targetConceptId:
        'trad.face.liuzhuang.five_officers.mapping',
      nextRequirement:
        'Scan-check the 柳莊 NLC-1925 五官 target passage and adjudicate 審判官 / 審辨官 without OCR normalization.',
      status: 'blocked_pending_direct_witness_page',
    },
    {
      gateId: 't2.sixfu.gate.shenxiang',
      targetConceptId:
        'trad.face.shenxiang.six_fus.mapping',
      nextRequirement:
        'Pin and scan-check the 神相全編 六府 mapping passage.',
      status: 'blocked_pending_direct_witness_page',
    },
    {
      gateId: 't2.sixfu.gate.liuzhuang',
      targetConceptId:
        'trad.face.liuzhuang.six_fus.mapping',
      nextRequirement:
        'Pin and scan-check the 柳莊 NLC-1925 六府 mapping passage.',
      status: 'blocked_pending_direct_witness_page',
    },
  ] as const);
