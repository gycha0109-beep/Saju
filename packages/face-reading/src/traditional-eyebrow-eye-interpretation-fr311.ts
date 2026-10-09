export type TraditionalFaceSemanticTopicFR311 =
  | 'temperament'
  | 'intelligence'
  | 'wealth'
  | 'status'
  | 'career_reputation'
  | 'siblings'
  | 'spouse_relationship'
  | 'children_family'
  | 'longevity'
  | 'integrity_trust'
  | 'interpersonal_relations';

export type TraditionalMorphologyRegionFR311 = 'eyebrow' | 'eye';

export type TraditionalSourceVerificationFR311 =
  | 'scan_surface_linked_transcription_unreviewed'
  | 'existing_scan_checked_repository_lineage';

export interface TraditionalMorphologyTermFR311 {
  readonly termKey: string;
  readonly region: TraditionalMorphologyRegionFR311;
  readonly sourceExpression: string;
  readonly neutralGloss: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: TraditionalSourceVerificationFR311;
  readonly directMetricBindingAuthorized: false;
}

export interface TraditionalNamedFormFR311 {
  readonly formKey: string;
  readonly region: TraditionalMorphologyRegionFR311;
  readonly traditionalLabel: string;
  readonly sourceRefs: readonly string[];
  readonly sourceCatalogState: 'catalogued';
  readonly semanticExtractionState: 'pending' | 'partially_extracted';
  readonly neutralAliasAuthorized: false;
}

export interface TraditionalInterpretationRuleFR311 {
  readonly ruleId: string;
  readonly regionScope: 'eyebrow' | 'eye' | 'eyebrow_eye';
  readonly sourceExpression: string;
  readonly morphologyTermKeys: readonly string[];
  readonly traditionalMeaningSummary: string;
  readonly topicKeys: readonly TraditionalFaceSemanticTopicFR311[];
  readonly sourceRefs: readonly string[];
  readonly verificationState: TraditionalSourceVerificationFR311;
  readonly directness: 'direct_source_single_or_compound' | 'direct_source_cross_region_combination';
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface TraditionalCombinationQueryResultFR311 {
  readonly status: 'direct_source_rule_found' | 'unsupported_no_direct_source_combination';
  readonly matchedRuleIds: readonly string[];
  readonly synthesisAuthorized: false;
  readonly reason: string;
}

const WITNESS_PAGE_30 = 'witness.gujin473.art633.page30.transcription';
const WITNESS_PAGE_31 = 'witness.gujin473.art633.page31.transcription';
const WITNESS_NLC_1925 = 'witness.shenxiang_quanbian.nlc_1925';
const ISSUE_FR182 = 'github:issue/625';

function term(
  termKey: string,
  region: TraditionalMorphologyRegionFR311,
  sourceExpression: string,
  neutralGloss: string,
  sourceRefs: readonly string[],
  verificationState: TraditionalSourceVerificationFR311,
): TraditionalMorphologyTermFR311 {
  return Object.freeze({
    termKey,
    region,
    sourceExpression,
    neutralGloss,
    sourceRefs: Object.freeze([...sourceRefs]),
    verificationState,
    directMetricBindingAuthorized: false as const,
  });
}

export const TRADITIONAL_MORPHOLOGY_TERMS_FR311: readonly TraditionalMorphologyTermFR311[] =
  Object.freeze([
    term('brow.fine', 'eyebrow', '細', '가늘거나 섬세하다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.flat', 'eyebrow', '平', '평평하거나 곧다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.broad', 'eyebrow', '闊', '폭이 넓다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.refined', 'eyebrow', '秀', '수려하다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.long', 'eyebrow', '長', '길다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.coarse', 'eyebrow', '粗', '거칠다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.dense', 'eyebrow', '濃', '짙거나 조밀하다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.reverse', 'eyebrow', '逆', '결이 거스른다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.disordered', 'eyebrow', '亂', '흐트러졌다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.short', 'eyebrow', '短', '짧다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.knit', 'eyebrow', '蹙', '찡그리듯 모이거나 좁혀진 상태로 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.extends_past_eye', 'eyebrow', '眉過眼', '눈의 가로 범위를 지나 길게 이어지는 것으로 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.not_cover_eye', 'eyebrow', '短不覆眼', '짧아 눈을 덮지 못한다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.press_eye', 'eyebrow', '壓眼', '눈을 누르듯 낮게 위치한다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.raised', 'eyebrow', '昂', '위로 들린 형태로 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.upright', 'eyebrow', '卓而豎', '치켜서거나 세워진 형태로 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.tail_down_over_eye', 'eyebrow', '尾垂眼', '눈썹 꼬리가 눈 쪽으로 처진다고 기술된 형태', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.heads_meet', 'eyebrow', '眉頭交', '양 눈썹 머리가 서로 만난다고 기술된 형태', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.reverse_growth', 'eyebrow', '眉逆生', '눈썹 털이 역방향으로 난다고 기술된 형태', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.high_forehead', 'eyebrow', '眉高居額中', '이마에서 높게 위치한다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.sparse', 'eyebrow', '疏', '성기다고 기술된 눈썹', [WITNESS_PAGE_30], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.clear', 'eyebrow', '清', '맑고 정돈된 인상으로 기술된 눈썹', [WITNESS_PAGE_30, WITNESS_PAGE_31], 'scan_surface_linked_transcription_unreviewed'),
    term('brow.tail_scattered', 'eyebrow', '尾散', '눈썹 꼬리가 흩어진다고 기술된 형태', [WITNESS_PAGE_31], 'scan_surface_linked_transcription_unreviewed'),

    term('eye.refined', 'eye', '秀', '수려하다고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.long', 'eye', '長', '길다고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.short', 'eye', '目短', '짧다고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.large', 'eye', '目大', '크다고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.bright', 'eye', '光', '빛나거나 광택이 있다고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.deep', 'eye', '深', '깊다고 기술된 눈', [WITNESS_PAGE_31], 'scan_surface_linked_transcription_unreviewed'),
    term('eye.triangular', 'eye', '目有三角', '삼각 형태를 가진 것으로 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.tail_down', 'eye', '目尾相垂', '눈꼬리가 아래로 처진 것으로 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.one_cun_long', 'eye', '目長一寸', '전통 단위로 한 촌 길이라고 기술된 눈', [WITNESS_NLC_1925, ISSUE_FR182], 'existing_scan_checked_repository_lineage'),
    term('eye.black_white_distinct', 'eye', '黑白分明', '검은자와 흰자가 분명하다고 기술된 눈', [WITNESS_PAGE_31], 'scan_surface_linked_transcription_unreviewed'),
    term('eye.contained_not_exposed', 'eye', '含神不露', '신이 드러나지 않고 안에 머문다고 기술된 눈', [WITNESS_PAGE_31], 'scan_surface_linked_transcription_unreviewed'),
  ]);

const BROW_NAMED_FORMS = [
  ['ghost', '鬼眉'],
  ['sparse_scattered', '疏散眉'],
  ['yellow_thin', '黃薄眉'],
  ['broom', '掃箒眉'],
  ['pointed_knife', '尖刀眉'],
  ['eight_character', '八字眉'],
  ['arhat', '羅漢眉'],
  ['dragon', '龍眉'],
  ['willow_leaf', '柳葉眉'],
  ['sword', '劍眉'],
  ['lion', '獅子眉'],
  ['clear_front_sparse_back', '前清後疏眉'],
  ['light_clear', '輕清眉'],
  ['short_refined', '短促秀眉'],
  ['spiral', '旋螺眉'],
  ['one_character', '一字眉'],
  ['silkworm', '臥蠶眉'],
  ['new_moon', '新月眉'],
  ['tiger', '虎眉'],
  ['small_broom', '小掃箒眉'],
  ['large_short', '大短促眉'],
  ['clear_refined', '清秀眉'],
  ['interrupted', '間斷眉'],
  ['crossed', '交加眉'],
] as const;

const EYE_NAMED_FORMS = [
  ['dragon', '龍眼'],
  ['phoenix', '鳳眼'],
  ['monkey', '猴眼'],
  ['elephant', '象眼'],
  ['turtle', '龜眼'],
  ['magpie', '鵲眼'],
  ['lion', '獅眼'],
  ['tiger', '虎眼'],
  ['ox', '牛眼'],
  ['peacock', '孔雀眼'],
  ['mandarin_duck', '鴛鴦眼'],
  ['calling_phoenix', '鳴鳳眼'],
  ['sleeping_phoenix', '睡鳳眼'],
  ['auspicious_phoenix', '瑞鳳眼'],
  ['wild_goose', '鴈眼'],
  ['yin_yang', '陰陽眼'],
  ['crane_shape', '鶴形眼'],
  ['goose', '鵝眼'],
  ['peach_blossom', '桃花眼'],
  ['drunken', '醉眼'],
  ['crane', '鶴眼'],
  ['sheep', '羊眼'],
  ['fish', '魚眼'],
  ['horse', '馬眼'],
  ['pig', '豬眼'],
  ['snake', '蛇眼'],
  ['pigeon', '鴿眼'],
  ['luan', '鸞眼'],
  ['wolf', '狼目'],
  ['fuxi', '伏犀眼'],
  ['egret', '鷺鷥眼'],
  ['ape', '猿眼'],
  ['deer', '鹿眼'],
  ['bear', '熊眼'],
  ['shrimp', '蝦眼'],
  ['crab', '蟹眼'],
  ['swallow', '燕眼'],
  ['partridge', '鷓鴣眼'],
  ['cat', '貓眼'],
] as const;

function namedForm(
  region: TraditionalMorphologyRegionFR311,
  key: string,
  traditionalLabel: string,
  sourceRef: string,
): TraditionalNamedFormFR311 {
  return Object.freeze({
    formKey: `${region}.named.${key}`,
    region,
    traditionalLabel,
    sourceRefs: Object.freeze([sourceRef]),
    sourceCatalogState: 'catalogued' as const,
    semanticExtractionState: (
      traditionalLabel === '一字眉' ||
      traditionalLabel === '輕清眉' ||
      traditionalLabel === '清秀眉' ||
      traditionalLabel === '獅眼' ||
      traditionalLabel === '鳳眼'
    ) ? 'partially_extracted' as const : 'pending' as const,
    neutralAliasAuthorized: false as const,
  });
}

export const TRADITIONAL_NAMED_FORMS_FR311: readonly TraditionalNamedFormFR311[] = Object.freeze([
  ...BROW_NAMED_FORMS.map(([key, label], index) =>
    namedForm('eyebrow', key, label, index < 11 ? WITNESS_PAGE_30 : WITNESS_PAGE_31)),
  ...EYE_NAMED_FORMS.map(([key, label]) => namedForm('eye', key, label, WITNESS_PAGE_31)),
]);

function rule(
  ruleId: string,
  regionScope: TraditionalInterpretationRuleFR311['regionScope'],
  sourceExpression: string,
  morphologyTermKeys: readonly string[],
  traditionalMeaningSummary: string,
  topicKeys: readonly TraditionalFaceSemanticTopicFR311[],
  sourceRefs: readonly string[],
  verificationState: TraditionalSourceVerificationFR311,
  directness: TraditionalInterpretationRuleFR311['directness'] = 'direct_source_single_or_compound',
): TraditionalInterpretationRuleFR311 {
  return Object.freeze({
    ruleId,
    regionScope,
    sourceExpression,
    morphologyTermKeys: Object.freeze([...morphologyTermKeys]),
    traditionalMeaningSummary,
    topicKeys: Object.freeze([...topicKeys]),
    sourceRefs: Object.freeze([...sourceRefs]),
    verificationState,
    directness,
    modernScientificFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const TRADITIONAL_INTERPRETATION_RULES_FR311: readonly TraditionalInterpretationRuleFR311[] =
  Object.freeze([
    rule(
      'fr311.brow.fine_flat_broad_refined_long',
      'eyebrow',
      '細平而闊、秀而長',
      ['brow.fine', 'brow.flat', 'brow.broad', 'brow.refined', 'brow.long'],
      '원문은 이 복합 눈썹 조건을 성정이 총명한 것으로 풀이한다.',
      ['temperament', 'intelligence'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.coarse_dense_reverse_disordered_short_knit',
      'eyebrow',
      '粗而濃、逆而亂、短而蹙',
      ['brow.coarse', 'brow.dense', 'brow.reverse', 'brow.disordered', 'brow.short', 'brow.knit'],
      '원문은 이 복합 눈썹 조건을 거칠고 완고한 성정으로 풀이한다.',
      ['temperament'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.extends_past_eye',
      'eyebrow',
      '眉過眼者富貴',
      ['brow.extends_past_eye'],
      '원문은 눈을 지나 길게 이어지는 눈썹을 부귀와 연결한다.',
      ['wealth', 'status'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.short_not_cover_eye',
      'eyebrow',
      '短不覆眼者乏財',
      ['brow.short', 'brow.not_cover_eye'],
      '원문은 짧아 눈을 덮지 못하는 눈썹을 재물이 부족한 해석과 연결한다.',
      ['wealth'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.press_eye',
      'eyebrow',
      '壓眼者窮逼',
      ['brow.press_eye'],
      '원문은 눈을 누르듯 낮은 눈썹을 곤궁한 상태와 연결한다.',
      ['wealth', 'status'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.raised',
      'eyebrow',
      '昂者氣剛',
      ['brow.raised'],
      '원문은 위로 들린 눈썹을 강한 기질과 연결한다.',
      ['temperament'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.upright',
      'eyebrow',
      '卓而豎者性豪',
      ['brow.upright'],
      '원문은 세워진 눈썹을 호방한 성정과 연결한다.',
      ['temperament'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.tail_down',
      'eyebrow',
      '尾垂眼者性懦',
      ['brow.tail_down_over_eye'],
      '원문은 눈썹 꼬리가 눈 쪽으로 처진 형태를 유약한 성정과 연결한다.',
      ['temperament'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.heads_meet',
      'eyebrow',
      '眉頭交者貧薄，妨兄弟',
      ['brow.heads_meet'],
      '원문은 눈썹 머리가 서로 만나는 형태를 빈박함 및 형제 관계의 불리함과 연결한다.',
      ['wealth', 'siblings'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.reverse_growth',
      'eyebrow',
      '眉逆生者不良，妨妻子',
      ['brow.reverse_growth'],
      '원문은 역방향으로 난 눈썹을 배우자·자녀 관계의 불리함과 연결한다.',
      ['spouse_relationship', 'children_family'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.brow.high_forehead',
      'eyebrow',
      '眉高居額中者，大貴',
      ['brow.high_forehead'],
      '원문은 이마에서 높게 자리한 눈썹을 높은 지위와 연결한다.',
      ['status'],
      [WITNESS_PAGE_30],
      'scan_surface_linked_transcription_unreviewed',
    ),
    rule(
      'fr311.eye.refined_long',
      'eye',
      '目秀而長，必近君王',
      ['eye.refined', 'eye.long'],
      '원문은 수려하고 긴 눈을 높은 지위에 가까운 해석과 연결한다.',
      ['status', 'career_reputation'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
    ),
    rule(
      'fr311.eye.large_bright',
      'eye',
      '目大而光，多進田莊',
      ['eye.large', 'eye.bright'],
      '원문은 크고 빛나는 눈을 전답·재산 증가와 연결한다.',
      ['wealth'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
    ),
    rule(
      'fr311.eye.triangular',
      'eye',
      '目有三角，其人必惡',
      ['eye.triangular'],
      '원문은 삼각형 눈을 부정적인 성정 판단과 연결한다.',
      ['temperament'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
    ),
    rule(
      'fr311.eye.one_cun_long',
      'eye',
      '目長一寸，必佐明王',
      ['eye.one_cun_long'],
      '원문은 한 촌 길이라고 표현된 눈을 높은 관직·보좌 역할과 연결한다.',
      ['status', 'career_reputation'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
    ),
    rule(
      'fr311.eye.tail_down',
      'eye',
      '目尾相垂，夫妻相離',
      ['eye.tail_down'],
      '원문은 눈꼬리가 처진 형태를 부부 관계의 이별 해석과 연결한다.',
      ['spouse_relationship'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
    ),
    rule(
      'fr311.combo.eye_short_brow_long',
      'eyebrow_eye',
      '目短眉長，愈益田莊',
      ['eye.short', 'brow.long'],
      '원문이 눈이 짧고 눈썹이 긴 조합을 전답·재산 증가와 직접 연결한다.',
      ['wealth'],
      [WITNESS_NLC_1925, ISSUE_FR182],
      'existing_scan_checked_repository_lineage',
      'direct_source_cross_region_combination',
    ),
  ]);

export const FR311_AUTHORITY_BOUNDARY = Object.freeze({
  namedFormEqualsNeutralMorphologyAuthorized: false as const,
  unsupportedCrossRegionSynthesisAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  providerGeometryBindingAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function exactSetEquals(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const a = [...left].sort();
  const b = [...right].sort();
  return a.every((value, index) => value === b[index]);
}

export function queryTraditionalCombinationFR311(
  morphologyTermKeys: readonly string[],
): TraditionalCombinationQueryResultFR311 {
  const matches = TRADITIONAL_INTERPRETATION_RULES_FR311.filter(
    (candidate) =>
      candidate.directness === 'direct_source_cross_region_combination' &&
      exactSetEquals(candidate.morphologyTermKeys, morphologyTermKeys),
  );

  if (matches.length > 0) {
    return Object.freeze({
      status: 'direct_source_rule_found' as const,
      matchedRuleIds: Object.freeze(matches.map((candidate) => candidate.ruleId)),
      synthesisAuthorized: false as const,
      reason: '원문이 이 정확한 부위 간 조합을 직접 명시한다. 연구 기록 조회만 허용하며 상품 해석 합성은 열지 않는다.',
    });
  }

  return Object.freeze({
    status: 'unsupported_no_direct_source_combination' as const,
    matchedRuleIds: Object.freeze([]),
    synthesisAuthorized: false as const,
    reason: '현재 FR311 직접 출전에는 이 정확한 부위 간 조합 규칙이 없다. 단일 규칙들을 임의 결합해 새 의미를 만들지 않는다.',
  });
}

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311_duplicate:${path}`);
}

export function assertTraditionalEyebrowEyeResearchFR311(): void {
  assertUnique(TRADITIONAL_MORPHOLOGY_TERMS_FR311.map((entry) => entry.termKey), 'term_key');
  assertUnique(TRADITIONAL_NAMED_FORMS_FR311.map((entry) => entry.formKey), 'form_key');
  assertUnique(TRADITIONAL_INTERPRETATION_RULES_FR311.map((entry) => entry.ruleId), 'rule_id');

  const termKeys = new Set(TRADITIONAL_MORPHOLOGY_TERMS_FR311.map((entry) => entry.termKey));
  for (const ruleEntry of TRADITIONAL_INTERPRETATION_RULES_FR311) {
    for (const termKey of ruleEntry.morphologyTermKeys) {
      if (!termKeys.has(termKey)) throw new Error(`fr311_unknown_term:${ruleEntry.ruleId}:${termKey}`);
    }
    if (ruleEntry.modernScientificFactAuthorized !== false) {
      throw new Error(`fr311_modern_fact_authority_widening:${ruleEntry.ruleId}`);
    }
    if (ruleEntry.productInterpretationAuthorized !== false) {
      throw new Error(`fr311_product_authority_widening:${ruleEntry.ruleId}`);
    }
  }

  for (const termEntry of TRADITIONAL_MORPHOLOGY_TERMS_FR311) {
    if (termEntry.directMetricBindingAuthorized !== false) {
      throw new Error(`fr311_metric_binding_widening:${termEntry.termKey}`);
    }
  }

  for (const named of TRADITIONAL_NAMED_FORMS_FR311) {
    if (named.neutralAliasAuthorized !== false) {
      throw new Error(`fr311_named_form_alias_widening:${named.formKey}`);
    }
  }

  for (const [key, flag] of Object.entries(FR311_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311_authority_boundary_widening:${key}`);
  }
}
