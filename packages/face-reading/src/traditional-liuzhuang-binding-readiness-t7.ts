import {
  FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS,
  FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS,
} from './traditional-liuzhuang-operationalization-t5.js';
import {
  FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE,
} from './traditional-liuzhuang-methodology-pack-t6.js';

export type TraditionalLiuzhuangBindingReadinessStateT7 =
  | 'governed_neutral_base_available_binding_blocked'
  | 'research_neutral_candidate_available_binding_blocked'
  | 'partial_neutral_evidence_binding_blocked'
  | 'blocked_missing_neutral_capability';

export interface TraditionalLiuzhuangDescriptorBindingReadinessT7 {
  readonly specId: string;
  readonly descriptorId: string;
  readonly state: TraditionalLiuzhuangBindingReadinessStateT7;
  readonly neutralEvidenceRefs: readonly string[];
  readonly availableNeutralEvidence: readonly string[];
  readonly blockers: readonly string[];
  readonly traditionalBindingAuthorized: false;
  readonly executableCriterionStateAuthorized: false;
  readonly productionAuthorization: false;
}

export interface TraditionalLiuzhuangSixFusBindingReadinessT7 {
  readonly sourceLocationTerm: '天倉' | '顴骨' | '地庫';
  readonly traditionalLabel: '上二府' | '中二府' | '下二府';
  readonly state: TraditionalLiuzhuangBindingReadinessStateT7;
  readonly neutralEvidenceRefs: readonly string[];
  readonly blockers: readonly string[];
  readonly traditionalBindingAuthorized: false;
  readonly productionAuthorization: false;
}

const FR14 =
  'packages/face-reading/src/neutral-provider-bindings-fr14.ts' as const;
const FR15 =
  'packages/face-reading/src/neutral-observation-schema-fr15.ts' as const;
const FR35 =
  'packages/face-reading/src/three-divisions-neutral-surface-extension-fr35.ts' as const;
const FR50 =
  'packages/face-reading/src/provider-independent-chin-contour-geometry-fr50.ts' as const;
const FR78 =
  'packages/face-reading/src/governed-metric-lips-surface-fr78.ts' as const;
const FR79 =
  'packages/face-reading/src/pose-normalized-lips-geometry-fr79.ts' as const;
const FR80 =
  'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts' as const;
const FR82 =
  'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts' as const;
const FR85 =
  'packages/face-reading/src/role-free-lips-contour-nesting-runtime-fr85.ts' as const;
const FR88 =
  'packages/face-reading/src/role-free-minimum-set-separation-runtime-fr88.ts' as const;
const FR98 =
  'packages/face-reading/src/role-free-arclength-mean-neutral-metric-value-runtime-fr98.ts' as const;

type ReadinessSeed = Omit<
  TraditionalLiuzhuangDescriptorBindingReadinessT7,
  'specId' | 'traditionalBindingAuthorized' |
  'executableCriterionStateAuthorized' | 'productionAuthorization'
>;

const seed = (
  descriptorId: string,
  state: TraditionalLiuzhuangBindingReadinessStateT7,
  neutralEvidenceRefs: readonly string[],
  availableNeutralEvidence: readonly string[],
  blockers: readonly string[],
): ReadinessSeed => ({
  descriptorId,
  state,
  neutralEvidenceRefs,
  availableNeutralEvidence,
  blockers,
});

const SEEDS = [
  seed('t4.liuzhuang.listening.color_clear', 'blocked_missing_neutral_capability', [], [], [
    'FR14/FR15 expose no governed ear appearance observation.',
    'No controlled ear color/appearance capture protocol is admitted.',
  ]),
  seed('t4.liuzhuang.listening.high_over_brow', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral brow regions',
    'governed pose quality',
  ], [
    'No governed neutral ear vertical reference exists.',
    'The source-local 高聳過於眉 relation has no methodology-scoped binding.',
  ]),
  seed('t4.liuzhuang.listening.contour_complete', 'blocked_missing_neutral_capability', [], [], [
    'No governed ear contour/structure surface is admitted.',
    '輪/廓/完成 construct semantics remain undefined.',
  ]),
  seed('t4.liuzhuang.listening.close_substantial', 'blocked_missing_neutral_capability', [], [], [
    'No governed ear attachment/projection/fullness observation is admitted.',
    'Depth/projection evidence and 貼肉敦厚 construct validity are absent.',
  ]),
  seed('t4.liuzhuang.listening.mingmen_broad', 'blocked_missing_neutral_capability', [], [], [
    'No governed neutral ear-region geometry suitable for 命門 review is admitted.',
    '柳莊 命門 identity and 寬大 construct remain unbound.',
  ]),

  seed('t4.liuzhuang.longevity.broad_clear_long', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral brow regions',
  ], [
    'Neutral brow geometry does not define 寬廣清長.',
    'No source-grounded compound binding or threshold is authorized.',
  ]),
  seed('t4.liuzhuang.longevity.into_temples', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral brow regions',
  ], [
    'No governed temporal-hair/鬢 boundary is admitted.',
    'The 入 relation and 柳莊 鬢 identity remain unbound.',
  ]),
  seed('t4.liuzhuang.longevity.xuanxi_new_moon', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed neutral brow curve evidence',
  ], [
    '玄犀/新月 comparanda are not source-grounded as executable constructs.',
    'Neutral curve geometry cannot acquire the figurative label automatically.',
  ]),
  seed('t4.liuzhuang.longevity.ends_full', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral brow regions',
  ], [
    'Source-local 首/尾 role binding and 豐盈 construct validity remain unresolved.',
  ]),
  seed('t4.liuzhuang.longevity.high_forehead_center', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral brow regions',
    'governed brow midline',
  ], [
    'No methodology-scoped 柳莊 額中 region binding exists.',
    'Neutral brow/midline evidence alone cannot establish 高居額中.',
  ]),

  seed('t4.liuzhuang.inspection.concealed', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral eye regions',
  ], [
    'Controlled gaze/expression evidence is not part of the FR14/FR15 neutral base.',
    '含藏不露 construct binding remains absent.',
  ]),
  seed('t4.liuzhuang.inspection.black_white_distinct', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral eye regions',
  ], [
    'Controlled illumination/exposure/white-balance appearance evidence is absent.',
    '黑白分明 cannot be inferred from uncontrolled appearance.',
  ]),
  seed('t4.liuzhuang.inspection.pupil_upright', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral eye regions',
  ], [
    'No governed iris/pupil alignment capability is admitted by FR14/FR15.',
    'Controlled gaze protocol is absent.',
  ]),
  seed('t4.liuzhuang.inspection.lustre', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral eye regions',
  ], [
    'No controlled highlight/appearance protocol separates 光彩 from camera specular effects.',
  ]),
  seed('t4.liuzhuang.inspection.phoenix_long_hidden', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed bilateral neutral eye-region geometry',
  ], [
    '鳳目細長藏秀 comparanda and compound semantics are not versioned.',
    'Neutral eye geometry cannot acquire 鳳目 semantics automatically.',
  ]),

  seed('t4.liuzhuang.discernment.bridge_straight', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
  ], [
    'FR14/FR15 nose region does not itself define 樑柱 or 明直.',
    'No 柳莊-specific bridge/axis binding is admitted.',
  ]),
  seed('t4.liuzhuang.discernment.root_to_yintang', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
    'governed brow midline candidate',
  ], [
    '山根/印堂 identities are not methodology-scoped bindings.',
    '明潤 requires controlled appearance evidence not supplied by the neutral base.',
  ]),
  seed('t4.liuzhuang.discernment.nianshou_high', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
  ], [
    '年壽 identity is unbound.',
    '2D neutral region evidence does not establish source-local 高隆 prominence.',
  ]),
  seed('t4.liuzhuang.discernment.no_joint', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
  ], [
    'No source-grounded 起節 construct binding or negative-criterion semantics are authorized.',
  ]),
  seed('t4.liuzhuang.discernment.tip_store_rise', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
  ], [
    '準頭/庫 identities are unbound.',
    'The admitted neutral base does not establish source-local 起 prominence.',
  ]),
  seed('t4.liuzhuang.discernment.suspended_gall', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed neutral nose-region geometry',
  ], [
    '懸膽 comparanda are not source-grounded as an executable construct.',
  ]),
  seed('t4.liuzhuang.discernment.cut_tube', 'governed_neutral_base_available_binding_blocked', [FR14, FR15], [
    'governed neutral nose-region geometry',
  ], [
    '截筒 comparanda are not source-grounded as an executable construct.',
  ]),
  seed('t4.liuzhuang.discernment.yellow_clear_flesh', 'partial_neutral_evidence_binding_blocked', [FR14, FR15], [
    'governed neutral nose region',
  ], [
    'Controlled lighting/white-balance/exposure evidence is absent.',
    '黃明色肉 cannot be inferred from uncontrolled RGB or sensitive-attribute inference.',
  ]),

  seed('t4.liuzhuang.intake.corners_bow', 'research_neutral_candidate_available_binding_blocked', [FR78, FR79, FR80], [
    'governed research lips contour surface',
    'pose-normalized unordered lips geometry',
    'neutral mouth contour aspect-ratio metric',
  ], [
    'The mouth chain explicitly carries no traditional semantic authority.',
    '角弓 figurative comparanda are not versioned.',
  ]),
  seed('t4.liuzhuang.intake.open_large_close_small', 'research_neutral_candidate_available_binding_blocked', [FR78, FR79, FR80, FR82], [
    'governed research lips contour surface',
    'pose-normalized neutral mouth geometry',
    'neutral mouth shape/relative-size metrics',
  ], [
    'Current mouth evidence is not a same-subject controlled open/closed state protocol.',
    'Single-state geometry cannot establish 開大合小.',
  ]),
  seed('t4.liuzhuang.intake.lip_teeth_square_relation', 'research_neutral_candidate_available_binding_blocked', [FR78, FR79, FR80, FR82, FR85, FR88, FR98], [
    'governed research lips contour surface',
    'pose-normalized role-free lips geometry',
    'neutral mouth contour/relative-size metrics',
    'role-free contour relation and separation metrics',
  ], [
    'The FR78-FR98 chain explicitly blocks traditional semantic assignment.',
    'Governed teeth evidence is absent.',
    '配/四方 compound semantics are not source-grounded as executable bindings.',
  ]),
] as const satisfies readonly ReadinessSeed[];

const t5SpecByDescriptor = new Map(
  FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.map((specification) => [
    specification.descriptorId,
    specification,
  ]),
);

export const FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS:
  readonly TraditionalLiuzhuangDescriptorBindingReadinessT7[] =
  Object.freeze(SEEDS.map((entry) => {
    const specification = t5SpecByDescriptor.get(entry.descriptorId);
    if (!specification) {
      throw new Error(`T7 readiness seed has no T5 specification: ${entry.descriptorId}`);
    }
    return Object.freeze({
      ...entry,
      specId: specification.specId,
      traditionalBindingAuthorized: false as const,
      executableCriterionStateAuthorized: false as const,
      productionAuthorization: false as const,
    });
  }));

export const FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS:
  readonly TraditionalLiuzhuangSixFusBindingReadinessT7[] = Object.freeze([
    Object.freeze({
      sourceLocationTerm: '天倉' as const,
      traditionalLabel: '上二府' as const,
      state: 'blocked_missing_neutral_capability' as const,
      neutralEvidenceRefs: [] as const,
      blockers: [
        'No governed upper-lateral temporal region candidate is admitted by the audited neutral base.',
        'Neutral temple geometry would still require a separate 柳莊 天倉 methodology-scoped binding.',
      ] as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    Object.freeze({
      sourceLocationTerm: '顴骨' as const,
      traditionalLabel: '中二府' as const,
      state: 'blocked_missing_neutral_capability' as const,
      neutralEvidenceRefs: [] as const,
      blockers: [
        'No governed zygomatic/cheek-region candidate is admitted by the audited neutral base.',
        'Modern cheek/zygomatic anatomy would not by itself establish 柳莊 顴骨 semantics.',
      ] as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
    Object.freeze({
      sourceLocationTerm: '地庫' as const,
      traditionalLabel: '下二府' as const,
      state: 'research_neutral_candidate_available_binding_blocked' as const,
      neutralEvidenceRefs: [FR35, FR50] as const,
      blockers: [
        'FR35/FR50 provide lower-face/chin research surfaces without 柳莊 traditional semantics.',
        '地庫 requires a separate methodology-scoped region identity and extent adjudication.',
      ] as const,
      traditionalBindingAuthorized: false as const,
      productionAuthorization: false as const,
    }),
  ]);

export const FACE_TRADITIONAL_T7_LIUZHUANG_BINDING_READINESS_AUTHORITY =
  Object.freeze({
    phase: 'T7_BINDING_READINESS_AUDIT' as const,
    predecessorPackRef:
      `${FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE.packId}@${FACE_TRADITIONAL_T6_LIUZHUANG_1925_PACK_CANDIDATE.version}`,
    descriptorSpecCount:
      FACE_TRADITIONAL_T7_LIUZHUANG_DESCRIPTOR_BINDING_READINESS.length,
    expectedDescriptorSpecCount:
      FACE_TRADITIONAL_T5_LIUZHUANG_OPERATIONALIZATION_SPECS.length,
    sixFusRequirementCount:
      FACE_TRADITIONAL_T7_LIUZHUANG_SIX_FUS_BINDING_READINESS.length,
    expectedSixFusRequirementCount:
      FACE_TRADITIONAL_T5_LIUZHUANG_SIX_FUS_BINDING_REQUIREMENTS.length,
    admittedTraditionalBindings: 0 as const,
    admittedExecutableCriteria: 0 as const,
    admittedProductionTiers: 0 as const,
    neutralEvidenceMayAutoAcquireLiuzhuangLabel: false as const,
    shenxiangBindingInheritanceAuthorized: false as const,
    numericThresholdAuthorized: false as const,
    booleanFormationEvaluatorAuthorized: false as const,
    partialSatisfactionScoringAuthorized: false as const,
    historicalOutcomeClaimAuthorized: false as const,
    productionAuthorization: false as const,
    nextGate:
      'fill_missing_neutral_capabilities_and_review_methodology_scoped_bindings_one_construct_at_a_time' as const,
  });
