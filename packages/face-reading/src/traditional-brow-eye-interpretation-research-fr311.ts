export type TraditionalBrowEyeRegionFR311 = 'eyebrow' | 'eye_pair';

export type TraditionalBrowEyeClaimDomainFR311 =
  | 'temperament'
  | 'moral_character'
  | 'wealth_property'
  | 'status_career'
  | 'sibling_kin'
  | 'spouse_relationship';

export type TraditionalBrowEyeSourceStateFR311 =
  | 'gujin_1725_scan_linked_unproofread_transcription'
  | 'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck';

export interface TraditionalBrowEyeMorphologyTermFR311 {
  readonly termKey: string;
  readonly region: TraditionalBrowEyeRegionFR311;
  readonly traditionalTerm: string;
  readonly koreanGloss: string;
  readonly neutralDescription: string;
  readonly sourceRefs: readonly string[];
  readonly sourceState: TraditionalBrowEyeSourceStateFR311;
  readonly machineThresholdAuthorized: false;
}

export interface TraditionalBrowEyeTraditionalClaimFR311 {
  readonly claimKey: string;
  readonly requiredTermKeys: readonly string[];
  readonly sourceClause: string;
  readonly traditionalReadingKo: string;
  readonly domains: readonly TraditionalBrowEyeClaimDomainFR311[];
  readonly sourceRefs: readonly string[];
  readonly sourceState: TraditionalBrowEyeSourceStateFR311;
  readonly historicalTraditionalClaimOnly: true;
  readonly modernScientificValidityAuthorized: false;
  readonly productionNarrativeAuthorized: false;
}

export interface TraditionalBrowEyeDirectCombinationFR311 {
  readonly combinationKey: string;
  readonly requiredTermKeys: readonly string[];
  readonly sourceClause: string;
  readonly traditionalReadingKo: string;
  readonly domains: readonly TraditionalBrowEyeClaimDomainFR311[];
  readonly sourceRefs: readonly string[];
  readonly directlyAttestedInScopedSource: true;
  readonly automaticGeneralizationAuthorized: false;
}

export interface TraditionalBrowEyeUnsupportedCombinationFR311 {
  readonly combinationKey: string;
  readonly requestedTermKeys: readonly string[];
  readonly requestedTopic: string;
  readonly supportState: 'no_direct_attestation_found_in_scoped_sources';
  readonly synthesisAuthorized: false;
  readonly note: string;
}

export interface TraditionalBrowEyeInterpretationResearchFR311 {
  readonly schemaVersion: 'fr311-v1';
  readonly contractId: 'traditional_brow_eye_interpretation_research_fr311';
  readonly authorityState: 'research_only';
  readonly regionLexiconRef: 'packages/face-reading/src/traditional-face-region-lexicon-fr309.ts';
  readonly morphologyTerms: readonly TraditionalBrowEyeMorphologyTermFR311[];
  readonly traditionalClaims: readonly TraditionalBrowEyeTraditionalClaimFR311[];
  readonly directCombinations: readonly TraditionalBrowEyeDirectCombinationFR311[];
  readonly unsupportedCombinations: readonly TraditionalBrowEyeUnsupportedCombinationFR311[];
  readonly authorityBoundary: {
    readonly issuesModernPersonalityFact: false;
    readonly issuesScientificPhysiognomyValidity: false;
    readonly issuesUnattestedCombinationMeaning: false;
    readonly issuesMachineThreshold: false;
    readonly issuesProductionNarrative: false;
  };
}

const GUJIN_BROW_REFS = Object.freeze([
  'source.gujin_1725.volume_473.page_30.shenxiang_brow',
  'source.gujin_1725.volume_473.page_31.shenxiang_brow',
]);

const NLC_EYE_REFS = Object.freeze([
  'github:issue/563',
  'github:issue/625',
  'github:issue/636',
  'witness.shenxiang_quanbian.nlc_1925',
]);

function browTerm(
  termKey: string,
  traditionalTerm: string,
  koreanGloss: string,
  neutralDescription: string,
): TraditionalBrowEyeMorphologyTermFR311 {
  return Object.freeze({
    termKey,
    region: 'eyebrow' as const,
    traditionalTerm,
    koreanGloss,
    neutralDescription,
    sourceRefs: GUJIN_BROW_REFS,
    sourceState: 'gujin_1725_scan_linked_unproofread_transcription' as const,
    machineThresholdAuthorized: false as const,
  });
}

function eyeTerm(
  termKey: string,
  traditionalTerm: string,
  koreanGloss: string,
  neutralDescription: string,
): TraditionalBrowEyeMorphologyTermFR311 {
  return Object.freeze({
    termKey,
    region: 'eye_pair' as const,
    traditionalTerm,
    koreanGloss,
    neutralDescription,
    sourceRefs: NLC_EYE_REFS,
    sourceState: 'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck' as const,
    machineThresholdAuthorized: false as const,
  });
}

export const FR311_BROW_EYE_MORPHOLOGY_TERMS: readonly TraditionalBrowEyeMorphologyTermFR311[] =
  Object.freeze([
    browTerm('brow_fine', '細', '가늘다', '눈썹 털 또는 전체 인상이 가는 상태. 수치 임계값은 정하지 않는다.'),
    browTerm('brow_level', '平', '평평하다', '눈썹의 전체 흐름이 수평적이라고 기술된 상태. 현대 각도 기준은 아직 없다.'),
    browTerm('brow_broad', '闊', '넓다', '원문이 넓다고 기술하는 눈썹 형태. 폭의 수치 기준은 아직 없다.'),
    browTerm('brow_elegant', '秀', '수려하다', '원문에서 눈썹의 정돈되고 수려한 인상을 가리키는 질적 표현.'),
    browTerm('brow_long', '長', '길다', '눈썹 길이가 길다고 기술되는 상태. 눈과의 상대관계는 별도 항목으로 둔다.'),
    browTerm('brow_coarse', '粗', '굵고 거칠다', '눈썹이 굵거나 거칠다고 기술되는 상태.'),
    browTerm('brow_dense', '濃', '짙다', '눈썹 털이 짙거나 농밀하다고 기술되는 상태.'),
    browTerm('brow_reverse_growth', '逆', '거슬러 난다', '털의 흐름이 정상 방향과 반대로 자란다고 기술되는 상태.'),
    browTerm('brow_disordered', '亂', '흐트러지다', '눈썹 털의 흐름이 어지럽다고 기술되는 상태.'),
    browTerm('brow_short', '短', '짧다', '눈썹 길이가 짧다고 기술되는 상태.'),
    browTerm('brow_contracting', '蹙', '찡그리듯 모이다', '눈썹이 조이거나 모여 보인다고 기술되는 상태.'),
    browTerm('brow_extends_past_eye', '過眼', '눈보다 길게 뻗는다', '눈의 가로 범위를 넘어 눈썹이 이어진다고 기술되는 관계.'),
    browTerm('brow_does_not_cover_eye', '短不覆眼', '눈을 덮지 못할 만큼 짧다', '눈썹 길이가 눈의 범위를 충분히 덮지 못한다고 기술되는 관계.'),
    browTerm('brow_presses_eye', '壓眼', '눈을 누르듯 낮다', '눈썹이 눈에 가깝고 눌러 보인다고 기술되는 관계.'),
    browTerm('brow_raised', '昂', '치켜 올라가다', '눈썹이 위로 치켜 올라간다고 기술되는 상태.'),
    browTerm('brow_upright', '卓而豎', '도드라져 서다', '눈썹이 도드라지고 세워진 듯한 상태.'),
    browTerm('brow_tail_droops_toward_eye', '尾垂眼', '눈썹 꼬리가 눈 쪽으로 처지다', '눈썹 꼬리가 아래로 내려와 눈 방향을 향한다고 기술되는 상태.'),
    browTerm('brow_heads_meet', '眉頭交', '눈썹 머리가 서로 만나다', '양쪽 눈썹의 안쪽 시작부가 서로 교차하거나 붙는다고 기술되는 상태.'),
    browTerm('brow_high_forehead', '眉高居額中', '눈썹이 이마 쪽에 높다', '눈썹이 눈에서 멀고 이마 중앙 쪽에 높게 자리한다고 기술되는 상태.'),
    browTerm('brow_sparse', '疏', '성기다', '눈썹 털의 밀도가 성기다고 기술되는 상태.'),
    browTerm('brow_clear', '清', '맑고 정돈되다', '원문에서 눈썹이 맑고 정돈되었다고 평가하는 질적 상태.'),
    browTerm('brow_tail_scattered', '尾散', '눈썹 꼬리가 흩어지다', '눈썹 꼬리 쪽 털이 퍼지거나 흩어진다고 기술되는 상태.'),

    eyeTerm('eye_long', '目長', '눈이 길다', '눈의 가로 길이가 길다고 기술되는 상태.'),
    eyeTerm('eye_short', '目短', '눈이 짧다', '눈의 가로 길이가 짧다고 기술되는 상태.'),
    eyeTerm('eye_large_bright', '目大而光', '크고 빛나다', '눈이 크고 빛이 있다고 함께 기술되는 상태.'),
    eyeTerm('eye_triangular', '目有三角', '삼각형 기미가 있다', '눈 형태가 삼각형으로 기술되는 상태.'),
    eyeTerm('eye_tail_droops', '目尾相垂', '눈꼬리가 처지다', '눈의 바깥 꼬리가 아래로 처진다고 기술되는 상태.'),
    eyeTerm('eye_fine_long', '細而長', '가늘고 길다', '눈이 가늘면서 길다고 함께 기술되는 복합 상태.'),
    eyeTerm('eye_elegant_long', '目秀而長', '수려하고 길다', '눈이 수려하면서 길다고 함께 기술되는 복합 상태.'),
  ]);

function traditionalClaim(
  claimKey: string,
  requiredTermKeys: readonly string[],
  sourceClause: string,
  traditionalReadingKo: string,
  domains: readonly TraditionalBrowEyeClaimDomainFR311[],
  sourceRefs: readonly string[],
  sourceState: TraditionalBrowEyeSourceStateFR311,
): TraditionalBrowEyeTraditionalClaimFR311 {
  return Object.freeze({
    claimKey,
    requiredTermKeys: Object.freeze([...requiredTermKeys]),
    sourceClause,
    traditionalReadingKo,
    domains: Object.freeze([...domains]),
    sourceRefs: Object.freeze([...sourceRefs]),
    sourceState,
    historicalTraditionalClaimOnly: true as const,
    modernScientificValidityAuthorized: false as const,
    productionNarrativeAuthorized: false as const,
  });
}

export const FR311_TRADITIONAL_CLAIMS: readonly TraditionalBrowEyeTraditionalClaimFR311[] =
  Object.freeze([
    traditionalClaim(
      'brow_fine_level_broad_elegant_long_intelligence',
      ['brow_fine', 'brow_level', 'brow_broad', 'brow_elegant', 'brow_long'],
      '細平而闊、秀而長',
      '이 조합을 전통적으로 총명한 성정과 연결한다.',
      ['temperament'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_coarse_dense_reverse_disordered_short_contracting_harsh',
      ['brow_coarse', 'brow_dense', 'brow_reverse_growth', 'brow_disordered', 'brow_short', 'brow_contracting'],
      '粗而濃、逆而亂、短而蹙',
      '이 조합을 전통적으로 거칠고 완고한 성정과 연결한다.',
      ['temperament', 'moral_character'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_extends_past_eye_wealth_status',
      ['brow_extends_past_eye'],
      '眉過眼',
      '눈썹이 눈보다 길게 뻗는 모습을 전통적으로 부귀와 연결한다.',
      ['wealth_property', 'status_career'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_does_not_cover_eye_lack_wealth',
      ['brow_does_not_cover_eye'],
      '短不覆眼',
      '눈썹이 눈을 덮지 못할 만큼 짧은 모습을 전통적으로 재물 부족과 연결한다.',
      ['wealth_property'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_presses_eye_constraint',
      ['brow_presses_eye'],
      '壓眼',
      '눈썹이 눈을 누르듯 낮은 모습을 전통적으로 곤궁함과 연결한다.',
      ['wealth_property', 'status_career'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_raised_forceful_temperament',
      ['brow_raised'],
      '昂',
      '치켜 올라간 눈썹을 전통적으로 강한 기질과 연결한다.',
      ['temperament'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_upright_bold_temperament',
      ['brow_upright'],
      '卓而豎',
      '도드라져 선 눈썹을 전통적으로 호방한 성정과 연결한다.',
      ['temperament'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_tail_droops_timid_temperament',
      ['brow_tail_droops_toward_eye'],
      '尾垂眼',
      '눈썹 꼬리가 눈 쪽으로 처지는 모습을 전통적으로 유약한 성정과 연결한다.',
      ['temperament'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_heads_meet_wealth_sibling',
      ['brow_heads_meet'],
      '眉頭交',
      '양 눈썹 머리가 만나는 모습을 전통적으로 재물의 박함과 형제 관계의 불리함에 연결한다.',
      ['wealth_property', 'sibling_kin'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'brow_high_forehead_status',
      ['brow_high_forehead'],
      '眉高居額中',
      '눈썹이 이마 쪽에 높게 자리한 모습을 전통적으로 높은 귀격과 연결한다.',
      ['status_career'],
      GUJIN_BROW_REFS,
      'gujin_1725_scan_linked_unproofread_transcription',
    ),
    traditionalClaim(
      'eye_tail_droops_spouse_separation',
      ['eye_tail_droops'],
      '目尾相垂',
      '눈꼬리가 처지는 모습을 전통적으로 부부의 이별·분리와 연결한다.',
      ['spouse_relationship'],
      NLC_EYE_REFS,
      'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck',
    ),
    traditionalClaim(
      'eye_large_bright_property',
      ['eye_large_bright'],
      '目大而光',
      '크고 빛나는 눈을 전통적으로 재산·토지의 증가와 연결한다.',
      ['wealth_property'],
      NLC_EYE_REFS,
      'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck',
    ),
    traditionalClaim(
      'eye_triangular_moral_judgment',
      ['eye_triangular'],
      '目有三角',
      '삼각형 기미가 있는 눈을 전통 문헌에서 부정적인 인품 판단과 연결한다.',
      ['moral_character'],
      NLC_EYE_REFS,
      'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck',
    ),
    traditionalClaim(
      'eye_elegant_long_status',
      ['eye_elegant_long'],
      '目秀而長',
      '수려하고 긴 눈을 전통적으로 높은 지위와 가까운 상태에 연결한다.',
      ['status_career'],
      NLC_EYE_REFS,
      'nlc_1925_existing_exact_page_authority_with_transcription_crosscheck',
    ),
  ]);

export const FR311_DIRECT_COMBINATIONS: readonly TraditionalBrowEyeDirectCombinationFR311[] =
  Object.freeze([
    Object.freeze({
      combinationKey: 'eye_short_brow_long_property_growth',
      requiredTermKeys: Object.freeze(['eye_short', 'brow_long']),
      sourceClause: '目短眉長',
      traditionalReadingKo: '눈은 짧고 눈썹은 긴 조합을 전통적으로 재산·토지의 증가와 연결한다.',
      domains: Object.freeze(['wealth_property'] as const),
      sourceRefs: NLC_EYE_REFS,
      directlyAttestedInScopedSource: true as const,
      automaticGeneralizationAuthorized: false as const,
    }),
  ]);

export const FR311_UNSUPPORTED_COMBINATIONS: readonly TraditionalBrowEyeUnsupportedCombinationFR311[] =
  Object.freeze([
    Object.freeze({
      combinationKey: 'brow_level_plus_eye_tail_droops_social_support',
      requestedTermKeys: Object.freeze(['brow_level', 'eye_tail_droops']),
      requestedTopic: '인복/대인관계',
      supportState: 'no_direct_attestation_found_in_scoped_sources' as const,
      synthesisAuthorized: false as const,
      note: '현재 검토 범위에서는 평평한 눈썹과 처진 눈을 함께 묶어 인복이나 대인관계로 해석하는 직접 문구를 확인하지 못했다. 각 단일 근거를 임의 합성하지 않는다.',
    }),
  ]);

export const TRADITIONAL_BROW_EYE_INTERPRETATION_RESEARCH_FR311: TraditionalBrowEyeInterpretationResearchFR311 =
  Object.freeze({
    schemaVersion: 'fr311-v1',
    contractId: 'traditional_brow_eye_interpretation_research_fr311',
    authorityState: 'research_only',
    regionLexiconRef: 'packages/face-reading/src/traditional-face-region-lexicon-fr309.ts',
    morphologyTerms: FR311_BROW_EYE_MORPHOLOGY_TERMS,
    traditionalClaims: FR311_TRADITIONAL_CLAIMS,
    directCombinations: FR311_DIRECT_COMBINATIONS,
    unsupportedCombinations: FR311_UNSUPPORTED_COMBINATIONS,
    authorityBoundary: Object.freeze({
      issuesModernPersonalityFact: false,
      issuesScientificPhysiognomyValidity: false,
      issuesUnattestedCombinationMeaning: false,
      issuesMachineThreshold: false,
      issuesProductionNarrative: false,
    }),
  });

function assertUnique(values: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311_duplicate:${label}`);
}

export function assertTraditionalBrowEyeInterpretationResearchFR311(
  value: TraditionalBrowEyeInterpretationResearchFR311,
): void {
  if (value.schemaVersion !== 'fr311-v1') throw new Error('fr311_schema_version_drift');
  if (value.contractId !== 'traditional_brow_eye_interpretation_research_fr311') {
    throw new Error('fr311_contract_id_drift');
  }
  if (value.authorityState !== 'research_only') throw new Error('fr311_authority_state_widening');

  assertUnique(value.morphologyTerms.map((term) => term.termKey), 'term_key');
  assertUnique(value.traditionalClaims.map((claim) => claim.claimKey), 'claim_key');
  assertUnique(value.directCombinations.map((rule) => rule.combinationKey), 'combination_key');
  assertUnique(value.unsupportedCombinations.map((rule) => rule.combinationKey), 'unsupported_combination_key');

  const termKeys = new Set(value.morphologyTerms.map((term) => term.termKey));
  for (const term of value.morphologyTerms) {
    if (term.sourceRefs.length === 0) throw new Error(`fr311_missing_term_source:${term.termKey}`);
    if (term.machineThresholdAuthorized !== false) throw new Error(`fr311_threshold_widening:${term.termKey}`);
  }

  for (const claim of value.traditionalClaims) {
    if (claim.requiredTermKeys.length === 0) throw new Error(`fr311_claim_terms_empty:${claim.claimKey}`);
    for (const key of claim.requiredTermKeys) {
      if (!termKeys.has(key)) throw new Error(`fr311_unknown_claim_term:${claim.claimKey}:${key}`);
    }
    if (!claim.historicalTraditionalClaimOnly) throw new Error(`fr311_historical_boundary_drift:${claim.claimKey}`);
    if (claim.modernScientificValidityAuthorized !== false) throw new Error(`fr311_scientific_validity_widening:${claim.claimKey}`);
    if (claim.productionNarrativeAuthorized !== false) throw new Error(`fr311_production_widening:${claim.claimKey}`);
  }

  for (const rule of value.directCombinations) {
    if (rule.requiredTermKeys.length < 2) throw new Error(`fr311_combination_not_multi_term:${rule.combinationKey}`);
    for (const key of rule.requiredTermKeys) {
      if (!termKeys.has(key)) throw new Error(`fr311_unknown_combination_term:${rule.combinationKey}:${key}`);
    }
    if (!rule.directlyAttestedInScopedSource) throw new Error(`fr311_combination_attestation_drift:${rule.combinationKey}`);
    if (rule.automaticGeneralizationAuthorized !== false) throw new Error(`fr311_combination_generalization_widening:${rule.combinationKey}`);
  }

  for (const rule of value.unsupportedCombinations) {
    for (const key of rule.requestedTermKeys) {
      if (!termKeys.has(key)) throw new Error(`fr311_unknown_unsupported_term:${rule.combinationKey}:${key}`);
    }
    if (rule.supportState !== 'no_direct_attestation_found_in_scoped_sources') {
      throw new Error(`fr311_unsupported_support_state_drift:${rule.combinationKey}`);
    }
    if (rule.synthesisAuthorized !== false) throw new Error(`fr311_unsupported_synthesis_widening:${rule.combinationKey}`);
  }

  for (const [key, flag] of Object.entries(value.authorityBoundary)) {
    if (flag !== false) throw new Error(`fr311_authority_boundary_widening:${key}`);
  }
}
