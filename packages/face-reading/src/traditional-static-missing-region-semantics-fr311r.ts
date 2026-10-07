export type StaticMissingRegionFR311R =
  | 'forehead'
  | 'cheekbone_pair'
  | 'left_cheekbone'
  | 'right_cheekbone'
  | 'chin'
  | 'jaw_lower_face'
  | 'whole_face';

export type StaticObservationKindFR311R =
  | 'morphology'
  | 'bone_structure'
  | 'proportion'
  | 'cross_region_configuration';

export type StaticSemanticTopicFR311R =
  | 'status'
  | 'wealth'
  | 'career_reputation'
  | 'life_course'
  | 'parents'
  | 'household'
  | 'interpersonal_relations'
  | 'traditional_auspice'
  | 'longevity'
  | 'integrity_trust';

export type StaticPolarityFR311R =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type StaticSourceSectionFR311R =
  | '神相全編一.十觀'
  | '神相全編一.面三停'
  | '神相全編二.五嶽'
  | '神相全編二.六府論'
  | '神相全編二.三才三停論'
  | '神相全編十二.額部相'
  | '神相全編十二.論額'
  | '神相全編十二.相骨節'
  | '神相全編十二.相面部骨格';

export interface StaticTraditionalRegionFR311R {
  readonly regionKey: StaticMissingRegionFR311R;
  readonly traditionalLabels: readonly string[];
  readonly neutralGloss: string;
  readonly sourceRefs: readonly string[];
  readonly neutralGeometryBindingAuthorized: false;
}

export interface StaticDirectRuleFR311R {
  readonly ruleId: string;
  readonly sourceSection: StaticSourceSectionFR311R;
  readonly region: StaticMissingRegionFR311R;
  readonly sourceExpression: string;
  readonly observationKind: StaticObservationKindFR311R;
  readonly meaningSummary: string;
  readonly topicKeys: readonly StaticSemanticTopicFR311R[];
  readonly polarity: StaticPolarityFR311R;
  readonly sourceRefs: readonly string[];
  readonly certainty: 'direct_clear' | 'phrase_uncertain';
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly parentOutcomePredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly moralityFactAuthorized: false;
  readonly criminalityFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
}

const GUJIN_631 = 'witness.gujin473.art631.wikisource';
const GUJIN_632 = 'witness.gujin473.art632.wikisource';
const GUJIN_633 = 'witness.gujin473.art633.wikisource';
const GUJIN_642 = 'witness.gujin473.art642.wikisource';

export const STATIC_TRADITIONAL_REGIONS_FR311R:
readonly StaticTraditionalRegionFR311R[] = Object.freeze([
  Object.freeze({
    regionKey: 'forehead',
    traditionalLabels: Object.freeze(['額', '天中', '天庭', '司空', '中正', '印堂']),
    neutralGloss: '전통 문헌에서 이마 전체와 이마 중앙 세부 부위를 지칭하는 명칭군',
    sourceRefs: Object.freeze([GUJIN_631, GUJIN_642]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'cheekbone_pair',
    traditionalLabels: Object.freeze(['兩顴', '顴骨']),
    neutralGloss: '좌우 광대뼈를 한 쌍으로 다루는 전통 표현',
    sourceRefs: Object.freeze([GUJIN_632, GUJIN_633, GUJIN_642]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'left_cheekbone',
    traditionalLabels: Object.freeze(['左顴', '東嶽']),
    neutralGloss: '전통 오악 문맥에서 좌측 광대에 부여된 지역 명칭',
    sourceRefs: Object.freeze([GUJIN_631, GUJIN_632]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'right_cheekbone',
    traditionalLabels: Object.freeze(['右顴', '西嶽']),
    neutralGloss: '전통 오악 문맥에서 우측 광대에 부여된 지역 명칭',
    sourceRefs: Object.freeze([GUJIN_631, GUJIN_632]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'chin',
    traditionalLabels: Object.freeze(['頦', '地閣']),
    neutralGloss: '전통 문헌에서 턱 중심 및 하부 종결부를 지칭하는 명칭군',
    sourceRefs: Object.freeze([GUJIN_631, GUJIN_632, GUJIN_642]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'jaw_lower_face',
    traditionalLabels: Object.freeze(['頤', '腮', '地閣', '承漿', '地倉', '懸壁', '燕頷']),
    neutralGloss: '턱선·볼 하부·하관의 골격과 연조직을 다루는 전통 명칭군',
    sourceRefs: Object.freeze([GUJIN_632, GUJIN_633, GUJIN_642]),
    neutralGeometryBindingAuthorized: false as const,
  }),
  Object.freeze({
    regionKey: 'whole_face',
    traditionalLabels: Object.freeze(['面', '頭面骨格']),
    neutralGloss: '얼굴 전체 비례·형태·골격 구성을 다루는 전통 범주',
    sourceRefs: Object.freeze([GUJIN_631, GUJIN_633, GUJIN_642]),
    neutralGeometryBindingAuthorized: false as const,
  }),
]);

type RuleSeed = readonly [
  ruleId: string,
  sourceSection: StaticSourceSectionFR311R,
  region: StaticMissingRegionFR311R,
  sourceExpression: string,
  observationKind: StaticObservationKindFR311R,
  meaningSummary: string,
  topicKeys: readonly StaticSemanticTopicFR311R[],
  polarity: StaticPolarityFR311R,
  sourceRef: string,
  certainty?: 'direct_clear' | 'phrase_uncertain',
];

const RULE_SEEDS: readonly RuleSeed[] = [
  [
    'fr311r.forehead.raised_broad',
    '神相全編十二.額部相',
    'forehead',
    '其骨欲隆然而起，聳然而闊',
    'bone_structure',
    '이마 골격이 솟고 넓은 조건을 귀한 전통 판단과 연결한다.',
    ['status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.steep_broad',
    '神相全編十二.額部相',
    'forehead',
    '其峻如立壁，其廣如覆肝',
    'morphology',
    '이마가 가파르고 넓은 형태를 유리한 전통 조건으로 기술한다.',
    ['status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.bright_square_long',
    '神相全編十二.額部相',
    'forehead',
    '明而澤，方而長者',
    'morphology',
    '밝고 윤택하며 네모지고 긴 이마를 귀함·수명과 연결하는 전통 문구를 보존한다.',
    ['status', 'longevity'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.small_narrow',
    '神相全編十二.額部相',
    'forehead',
    '小而狹者',
    'morphology',
    '작고 좁은 이마를 불리하게 판단하는 전통 문구를 보존한다.',
    ['life_course'],
    'challenging',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.defective_sunken',
    '神相全編十二.額部相',
    'forehead',
    '缺而陷者',
    'bone_structure',
    '결손·함몰된 이마를 불리하게 판단하는 전통 문구를 보존한다.',
    ['life_course'],
    'challenging',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.five_positions_upright_clear',
    '神相全編十二.額部相',
    'forehead',
    '天中、天庭、司空、中正、印堂五位，須得端正明淨',
    'cross_region_configuration',
    '이마 중앙의 다섯 전통 부위가 단정하고 맑은 조건을 유리하게 판단한다.',
    ['status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.narrow_low_hair',
    '神相全編十二.額部相',
    'forehead',
    '狹小而亂髮低覆者',
    'cross_region_configuration',
    '좁고 작으며 머리카락이 낮게 덮는 이마 조건을 불리하게 기술한다.',
    ['life_course'],
    'challenging',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.large_face_square',
    '神相全編十二.額部相',
    'forehead',
    '額大面方',
    'cross_region_configuration',
    '큰 이마와 네모진 얼굴의 결합을 길한 전통 조건으로 기록한다.',
    ['life_course'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.wide_face_broad',
    '神相全編十二.額部相',
    'forehead',
    '額闊面廣',
    'cross_region_configuration',
    '넓은 이마와 넓은 얼굴의 결합을 높은 지위와 연결한다.',
    ['status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.forehead.square_raised',
    '神相全編十二.額部相',
    'forehead',
    '額方峻起',
    'bone_structure',
    '네모지고 솟은 이마를 길한 전통 조건으로 기록한다.',
    ['traditional_auspice'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.cheekbones.bilateral_support',
    '神相全編二.六府論',
    'cheekbone_pair',
    '兩顴骨，欲其充實相輔，不欲支離孤露',
    'bone_structure',
    '양 광대가 충실하고 서로 받치며 고립·노출되지 않는 조건을 육부의 전통 기준으로 기록한다.',
    ['wealth'],
    'favorable',
    GUJIN_632,
  ],
  [
    'fr311r.cheekbones.tilted_exposed',
    '神相全編十二.相骨節',
    'cheekbone_pair',
    '兩顴欹更露',
    'bone_structure',
    '양 광대가 기울고 노출된 조건을 권세가 약해지는 전통 판단과 연결한다.',
    ['status'],
    'challenging',
    GUJIN_642,
  ],
  [
    'fr311r.cheekbone.left_east_mountain',
    '神相全編一.十觀',
    'left_cheekbone',
    '左顴為東岳，俱要中正，不可粗露傾塌',
    'bone_structure',
    '좌측 광대를 동악으로 두고 중정하며 거칠게 노출·기울거나 무너지지 않는 것을 요구한다.',
    ['status', 'wealth'],
    'conditional',
    GUJIN_631,
  ],
  [
    'fr311r.cheekbone.right_west_mountain',
    '神相全編一.十觀',
    'right_cheekbone',
    '右顴為西岳，亦與左顴相同',
    'bone_structure',
    '우측 광대를 서악으로 두며 좌측 광대와 같은 형태 원칙을 적용한다.',
    ['status', 'wealth'],
    'conditional',
    GUJIN_631,
  ],
  [
    'fr311r.chin.square_broad',
    '神相全編二.三才三停論',
    'chin',
    '頦為地，欲方而闊',
    'morphology',
    '턱을 지에 대응시키고 네모지고 넓은 형태를 전통적으로 유리하게 본다.',
    ['wealth'],
    'favorable',
    GUJIN_632,
  ],
  [
    'fr311r.chin.forehead_square_flat',
    '神相全編十二.相骨節',
    'chin',
    '頦額方且平',
    'cross_region_configuration',
    '턱과 이마가 함께 네모지고 평평한 조건을 귀하게 판단하는 전통 문구를 기록한다.',
    ['status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.lower_face.flat_full_upright_thick',
    '神相全編一.面三停',
    'jaw_lower_face',
    '下停平而滿，端而厚者',
    'morphology',
    '하관이 평평하고 충실하며 단정하고 두꺼운 조건을 재물과 연결한다.',
    ['wealth'],
    'favorable',
    GUJIN_631,
  ],
  [
    'fr311r.lower_face.long_narrow_sharp_thin',
    '神相全編一.面三停',
    'jaw_lower_face',
    '下停長而狹尖薄者',
    'morphology',
    '하관이 길고 좁으며 뾰족하고 얇은 조건을 불리한 생활·전택 판단과 연결한다.',
    ['household', 'life_course'],
    'challenging',
    GUJIN_631,
  ],
  [
    'fr311r.lower_face.di_ge_full_bone',
    '神相全編十二.相面部骨格',
    'jaw_lower_face',
    '地閣骨滿',
    'bone_structure',
    '지각 골격이 충실한 조건을 전택과 연결하는 전통 문구를 보존한다.',
    ['household'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.lower_face.chengjiang_full',
    '神相全編十二.相面部骨格',
    'jaw_lower_face',
    '承漿豐滿',
    'morphology',
    '승장이 충실한 조건을 생활의 풍족함과 연결하는 전통 문구를 보존한다.',
    ['wealth'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.lower_face.xuanbi_full',
    '神相全編十二.相面部骨格',
    'jaw_lower_face',
    '懸壁骨起，及肉滿',
    'bone_structure',
    '현벽의 골격과 살이 충실한 조건을 전통적으로 유리하게 본다.',
    ['interpersonal_relations'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.lower_face.yanhan_raised',
    '神相全編十二.相面部骨格',
    'jaw_lower_face',
    '燕頷骨起',
    'bone_structure',
    '연함 골격이 솟는 조건을 부귀와 연결하는 전통 문구를 보존한다.',
    ['wealth', 'status'],
    'favorable',
    GUJIN_642,
  ],
  [
    'fr311r.whole_face.long_square',
    '神相全編一.十觀',
    'whole_face',
    '面欲長而方',
    'morphology',
    '얼굴 전체가 길면서 네모진 형태를 전통적으로 유리하게 보는 기준을 기록한다.',
    ['status'],
    'favorable',
    GUJIN_631,
  ],
  [
    'fr311r.whole_face.five_mountains_three_divisions',
    '神相全編一.十觀',
    'whole_face',
    '五看五嶽及三停',
    'cross_region_configuration',
    '얼굴 전체 판단에서 오악과 삼정을 함께 살피는 전통 방법론의 존재를 기록한다.',
    ['status', 'wealth', 'life_course'],
    'conditional',
    GUJIN_631,
  ],
] as const;

function makeRule(seed: RuleSeed): StaticDirectRuleFR311R {
  const [
    ruleId,
    sourceSection,
    region,
    sourceExpression,
    observationKind,
    meaningSummary,
    topicKeys,
    polarity,
    sourceRef,
    certainty = 'direct_clear',
  ] = seed;
  return Object.freeze({
    ruleId,
    sourceSection,
    region,
    sourceExpression,
    observationKind,
    meaningSummary,
    topicKeys: Object.freeze([...topicKeys]),
    polarity,
    sourceRefs: Object.freeze([sourceRef]),
    certainty,
    historicalTraditionalDoctrineOnly: true as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    parentOutcomePredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    moralityFactAuthorized: false as const,
    criminalityFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    metricThresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
  });
}

export const STATIC_MISSING_REGION_DIRECT_RULES_FR311R:
readonly StaticDirectRuleFR311R[] = Object.freeze(RULE_SEEDS.map(makeRule));

export const FR311R_STATIC_REGION_SUMMARY = Object.freeze({
  traditionalRegions: STATIC_TRADITIONAL_REGIONS_FR311R.length,
  directRules: STATIC_MISSING_REGION_DIRECT_RULES_FR311R.length,
  foreheadRules: STATIC_MISSING_REGION_DIRECT_RULES_FR311R.filter(
    (item) => item.region === 'forehead',
  ).length,
  cheekboneRules: STATIC_MISSING_REGION_DIRECT_RULES_FR311R.filter(
    (item) => item.region.includes('cheekbone'),
  ).length,
  chinLowerFaceRules: STATIC_MISSING_REGION_DIRECT_RULES_FR311R.filter(
    (item) => item.region === 'chin' || item.region === 'jaw_lower_face',
  ).length,
  wholeFaceRules: STATIC_MISSING_REGION_DIRECT_RULES_FR311R.filter(
    (item) => item.region === 'whole_face',
  ).length,
});

export const FR311R_STATIC_REGION_AUTHORITY_BOUNDARY = Object.freeze({
  automaticTraditionalBindingAuthorized: false as const,
  providerLandmarkDirectBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  aggregateScoreAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertStaticMissingRegionSemanticsFR311R(): void {
  const requiredRegions: readonly StaticMissingRegionFR311R[] = [
    'forehead',
    'cheekbone_pair',
    'left_cheekbone',
    'right_cheekbone',
    'chin',
    'jaw_lower_face',
    'whole_face',
  ];

  if (FR311R_STATIC_REGION_SUMMARY.traditionalRegions !== requiredRegions.length) {
    throw new Error('fr311r_region_count_drift');
  }

  const presentRegions = new Set(
    STATIC_TRADITIONAL_REGIONS_FR311R.map((item) => item.regionKey),
  );
  for (const region of requiredRegions) {
    if (!presentRegions.has(region)) {
      throw new Error('fr311r_missing_region:' + region);
    }
  }

  const ruleIds = STATIC_MISSING_REGION_DIRECT_RULES_FR311R.map(
    (item) => item.ruleId,
  );
  if (new Set(ruleIds).size !== ruleIds.length) {
    throw new Error('fr311r_duplicate_rule_id');
  }

  for (const region of STATIC_TRADITIONAL_REGIONS_FR311R) {
    if (
      region.traditionalLabels.length === 0 ||
      region.sourceRefs.length === 0 ||
      region.neutralGeometryBindingAuthorized !== false
    ) {
      throw new Error('fr311r_invalid_region:' + region.regionKey);
    }
  }

  for (const rule of STATIC_MISSING_REGION_DIRECT_RULES_FR311R) {
    if (
      rule.sourceExpression.trim().length === 0 ||
      rule.sourceRefs.length === 0 ||
      rule.historicalTraditionalDoctrineOnly !== true ||
      rule.modernScientificFactAuthorized !== false ||
      rule.healthDiagnosisAuthorized !== false ||
      rule.lifespanPredictionAuthorized !== false ||
      rule.parentOutcomePredictionAuthorized !== false ||
      rule.personalityFactAuthorized !== false ||
      rule.moralityFactAuthorized !== false ||
      rule.criminalityFactAuthorized !== false ||
      rule.productInterpretationAuthorized !== false ||
      rule.neutralGeometryBindingAuthorized !== false ||
      rule.metricThresholdAuthorized !== false ||
      rule.populationNormAuthorized !== false
    ) {
      throw new Error('fr311r_authority_drift:' + rule.ruleId);
    }
  }

  for (const [key, value] of Object.entries(
    FR311R_STATIC_REGION_AUTHORITY_BOUNDARY,
  )) {
    if (value !== false) {
      throw new Error('fr311r_global_authority_widening:' + key);
    }
  }
}
