export type EarSemanticTopicFR311L =
  | 'learning_talent'
  | 'wealth'
  | 'status'
  | 'reputation'
  | 'livelihood'
  | 'longevity'
  | 'children_family'
  | 'spouse_relationship'
  | 'parents'
  | 'integrity_trust'
  | 'conduct_risk'
  | 'temperament'
  | 'interpersonal_relations'
  | 'traditional_health'
  | 'traditional_auspice'
  | 'life_course'
  | 'inheritance'
  | 'household'
  | 'legal_penalty';

export type EarRegionKeyFR311L =
  | 'ear_whole'
  | 'lun'
  | 'kuo'
  | 'ear_gate'
  | 'earlobe'
  | 'ear_root'
  | 'mingmen'
  | 'tianlun'
  | 'lower_ear_bone'
  | 'context';

export type EarPolarityFR311L =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type EarLifeStageFR311L =
  | 'whole_life'
  | 'early'
  | 'middle'
  | 'late';

export type EarCertaintyFR311L =
  | 'direct_clear'
  | 'phrase_uncertain';

export type EarObservationKindFR311L =
  | 'morphology'
  | 'color'
  | 'surface_mark'
  | 'hair'
  | 'relative_position'
  | 'front_visibility'
  | 'cross_region_context';

export type EarSourceSectionFR311L =
  | '相耳'
  | '相耳訣'
  | '許負相耳篇';

export interface EarTraditionalRegionFR311L {
  readonly regionKey: Exclude<EarRegionKeyFR311L, 'context'>;
  readonly traditionalLabel: string;
  readonly neutralGloss: string;
  readonly sourceRefs: readonly string[];
  readonly neutralGeometryBindingAuthorized: false;
}

export interface EarDirectRuleFR311L {
  readonly ruleId: string;
  readonly sourceSection: EarSourceSectionFR311L;
  readonly region: EarRegionKeyFR311L;
  readonly sourceExpression: string;
  readonly observationKind: EarObservationKindFR311L;
  readonly meaningSummary: string;
  readonly topicKeys: readonly EarSemanticTopicFR311L[];
  readonly polarity: EarPolarityFR311L;
  readonly lifeStage: EarLifeStageFR311L;
  readonly relationTarget: string | null;
  readonly certainty: EarCertaintyFR311L;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly spouseDeathPredictionAuthorized: false;
  readonly familyDeathPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly moralityFactAuthorized: false;
  readonly criminalityFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EarCrossRegionContextFR311L {
  readonly contextId: string;
  readonly sourceSection: EarSourceSectionFR311L | EarNamedFormLabelFR311L;
  readonly sourceExpression: string;
  readonly participatingRegions: readonly string[];
  readonly contextSummary: string;
  readonly certainty: EarCertaintyFR311L;
  readonly sourceRefs: readonly string[];
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EarNamedFormDescriptorFR311L {
  readonly descriptorId: string;
  readonly region: EarRegionKeyFR311L;
  readonly sourceFragment: string;
  readonly observationKind: EarObservationKindFR311L;
  readonly neutralGloss: string;
  readonly certainty: EarCertaintyFR311L;
  readonly neutralGeometryBindingAuthorized: false;
}

export interface EarNamedFormClaimFR311L {
  readonly claimId: string;
  readonly topicKey: EarSemanticTopicFR311L;
  readonly lifeStage: EarLifeStageFR311L;
  readonly polarity: EarPolarityFR311L;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly certainty: EarCertaintyFR311L;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly spouseDeathPredictionAuthorized: false;
  readonly familyDeathPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly moralityFactAuthorized: false;
  readonly criminalityFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export type EarNamedFormLabelFR311L =
  | '土耳'
  | '棋子耳'
  | '虎耳'
  | '箭羽耳'
  | '金耳'
  | '木耳'
  | '水耳'
  | '火耳'
  | '豬耳'
  | '低反耳'
  | '垂肩耳'
  | '貼腦耳'
  | '開花耳'
  | '扇風耳'
  | '鼠耳'
  | '驢耳';

export interface EarNamedFormSemanticRecordFR311L {
  readonly formKey: string;
  readonly traditionalLabel: EarNamedFormLabelFR311L;
  readonly sourceText: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin634_transcription_reviewed';
  readonly nlc1925DirectScanAdjudicated: false;
  readonly descriptors: readonly EarNamedFormDescriptorFR311L[];
  readonly claims: readonly EarNamedFormClaimFR311L[];
  readonly namedFormToNeutralClassifierAuthorized: false;
}

const GUJIN_634 = 'witness.gujin473.art634.wikisource';

export const EAR_TRADITIONAL_REGIONS_FR311L: readonly EarTraditionalRegionFR311L[] =
  Object.freeze([
    Object.freeze({ regionKey: 'ear_whole', traditionalLabel: '耳', neutralGloss: '전통 문헌에서 귀 전체를 지칭하는 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'lun', traditionalLabel: '輪', neutralGloss: '전통 귀 묘사에서 輪으로 지칭되는 외곽 계열 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'kuo', traditionalLabel: '廓 / 城廓', neutralGloss: '전통 귀 묘사에서 廓 또는 城廓으로 지칭되는 윤곽 계열 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'ear_gate', traditionalLabel: '耳門', neutralGloss: '전통 문헌의 귀문 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'earlobe', traditionalLabel: '垂珠 / 墜珠', neutralGloss: '전통 문헌의 귓불·수주 계열 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'ear_root', traditionalLabel: '耳根 / 根', neutralGloss: '전통 귀 명명형에서 귀의 뿌리로 표현되는 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'mingmen', traditionalLabel: '命門', neutralGloss: '許負相耳篇 안에서 귀의 세부 형상을 지칭하는 전통 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'tianlun', traditionalLabel: '天輪', neutralGloss: '金耳 명명형에서 사용되는 귀 세부 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'lower_ear_bone', traditionalLabel: '耳下骨', neutralGloss: '相耳訣에서 귀 아래 뼈를 지칭하는 전통 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  ]);

type RawRule = readonly [
  ruleId: string,
  sourceSection: EarSourceSectionFR311L,
  region: EarRegionKeyFR311L,
  sourceExpression: string,
  observationKind: EarObservationKindFR311L,
  meaningSummary: string,
  topicKeys: readonly EarSemanticTopicFR311L[],
  polarity: EarPolarityFR311L,
  lifeStage: EarLifeStageFR311L,
  relationTarget: string | null,
  certainty: EarCertaintyFR311L,
];

const RAW_DIRECT_RULES: readonly RawRule[] = [
  ['fr311l.ear.thick_firm_tall_long', '相耳', 'ear_whole', '厚而堅，聳而長，皆壽相也', 'morphology', '두껍고 단단하며 높고 긴 귀를 수명에 유리한 전통 판단과 연결한다.', ['longevity'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.outline_clear_intelligent', '相耳', 'ear_whole', '輪廓分明，聰悟', 'morphology', '윤곽이 분명한 귀를 총명함과 연결하는 전통 문구를 기록한다.', ['learning_talent'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.close_to_head_wealth', '相耳', 'ear_whole', '貼肉者富足', 'morphology', '귀가 살에 붙은 형태를 부유함과 연결한다.', ['wealth'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.inner_hair_longevity', '相耳', 'ear_whole', '耳內生毛者壽', 'hair', '귀 안에 털이 나는 조건을 장수와 연결한다.', ['longevity'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.black_mole_children', '相耳', 'ear_whole', '耳有黑子，生貴子', 'surface_mark', '귀의 검은 점을 귀한 자녀에 관한 전통 판단과 연결한다.', ['children_family'], 'favorable', 'whole_life', 'children', 'direct_clear'],
  ['fr311l.ear.black_mole_intelligence', '相耳', 'ear_whole', '耳有黑子，主聰明', 'surface_mark', '귀의 검은 점을 총명함과 연결한다.', ['learning_talent'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.gate_wide_far_wisdom', '相耳', 'ear_gate', '耳門闊，主智遠', 'morphology', '귀문이 넓은 조건을 원대한 지혜와 연결한다.', ['learning_talent'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.large_red_broad_official', '相耳', 'ear_whole', '大紅闊主官', 'color', '크고 붉으며 넓은 귀를 관직과 연결한다.', ['status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.white_reputation', '相耳', 'ear_whole', '白主名望', 'color', '흰 귀색을 명망과 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.red_black_poverty', '相耳', 'ear_whole', '赤黑貧賤', 'color', '적흑색 귀를 빈곤과 낮은 지위에 연결한다.', ['wealth', 'status'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.thin_forward_loses_fields', '相耳', 'ear_whole', '耳薄向前，賣盡田園', 'morphology', '얇고 앞으로 향한 귀를 전답 상실과 연결한다.', ['inheritance', 'wealth'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.reversed_sideways_no_house', '相耳', 'ear_whole', '反而偏側，居無屋宅', 'morphology', '뒤집히고 치우친 귀를 주거·가세의 불리함과 연결한다.', ['household', 'wealth'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.left_right_size_adversity', '相耳', 'ear_whole', '左右大小迍否，妨害', 'morphology', '좌우 귀 크기 차이를 막힘·방해와 연결하는 문구를 보존한다.', ['life_course'], 'challenging', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.luminous_glossy_reputation', '相耳', 'ear_whole', '光明潤澤，聲名遠播', 'color', '밝고 윤택한 귀를 널리 퍼지는 명성과 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.dusty_coarse_charred_dark', '相耳', 'ear_whole', '塵粗焦黑，貧薄愚鹵', 'color', '거칠고 검게 그을린 듯한 귀색·질감을 빈곤과 우둔함의 전통 판단에 연결한다.', ['wealth', 'learning_talent'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.upright_like_wood', '相耳', 'ear_whole', '其豎如木，到老不哭', 'morphology', '나무처럼 곧게 선 귀를 노년까지의 상태와 연결하는 문구를 원문 그대로 보존한다.', ['life_course'], 'neutral', 'late', null, 'phrase_uncertain'],
  ['fr311l.ear.long_tall_office', '相耳', 'ear_whole', '長而聳者祿位', 'morphology', '길고 높이 솟은 귀를 녹위와 연결한다.', ['status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.thick_round_livelihood', '相耳', 'ear_whole', '厚而圓者衣食', 'morphology', '두껍고 둥근 귀를 의식의 확보와 연결한다.', ['livelihood'], 'favorable', 'whole_life', null, 'direct_clear'],

  ['fr311l.ear.raised_reputation', '相耳訣', 'ear_whole', '耳如提起，名播人耳', 'morphology', '들어 올린 듯한 귀를 명성 전파와 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.shoulder_drooping_high_status', '相耳訣', 'ear_whole', '兩耳垂肩，貴不可言', 'morphology', '양 귀가 어깨에 드리운 듯한 형상을 큰 귀함과 연결한다.', ['status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.white_like_face_reputation', '相耳訣', 'ear_whole', '耳白如面，名滿天下', 'color', '얼굴처럼 흰 귀색을 천하에 이름이 난다는 판단과 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.chess_piece_household', '相耳訣', 'ear_whole', '棋子之耳，成家立計', 'morphology', '棋子耳 형상을 가업 성립과 연결한다.', ['household'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.black_flying_spots_break_house', '相耳訣', 'ear_whole', '耳黑飛花，離祖破家', 'surface_mark', '검은 반점성 표현을 조상과의 이탈·가세 파괴와 연결한다.', ['inheritance', 'household'], 'challenging', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.paper_thin_spouse_death', '相耳訣', 'ear_whole', '耳薄如紙，夫死無疑', 'morphology', '종이처럼 얇은 귀를 배우자 사망에 관한 전통 주장과 연결한다.', ['spouse_relationship'], 'challenging', 'whole_life', 'spouse', 'direct_clear'],
  ['fr311l.ear.peach_red_outline_temperament', '相耳訣', 'ear_whole', '輪廓桃紅，性最玲瓏', 'color', '윤곽의 도홍색을 영리한 성정에 관한 전통 판단과 연결한다.', ['temperament'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.paper_pair_poverty', '相耳訣', 'ear_whole', '兩耳如紙，貧窮無倚', 'morphology', '양 귀가 종이처럼 얇은 형태를 빈곤과 연결한다.', ['wealth'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.mouse_poverty_early_death', '相耳訣', 'ear_whole', '耳如鼠耳，貧賤早死', 'morphology', '鼠耳에 비유한 귀를 빈곤·낮은 지위·이른 죽음에 관한 전통 주장과 연결한다.', ['wealth', 'status', 'longevity'], 'challenging', 'early', null, 'direct_clear'],
  ['fr311l.ear.reversed_no_lun_inheritance', '相耳訣', 'lun', '耳反無輪，祖業如塵', 'morphology', '귀가 뒤집히고 輪이 없는 형태를 조상 재산의 소멸과 연결한다.', ['inheritance'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.earlobe_livelihood', '相耳訣', 'earlobe', '耳有垂珠，衣食自足', 'morphology', '귓불이 있는 조건을 의식의 자족과 연결한다.', ['livelihood'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.thin_rootless_short_life', '相耳訣', 'ear_root', '耳薄無根，必夭天年', 'morphology', '얇고 뿌리가 없는 귀를 불리한 수명 판단과 연결한다.', ['longevity'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.gate_broad_intelligent', '相耳訣', 'ear_gate', '耳門廣闊，聰明豁達', 'morphology', '귀문이 넓은 조건을 총명·활달과 연결한다.', ['learning_talent', 'temperament'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.city_outline_longevity', '相耳訣', 'kuo', '耳有城廓，壽命不促', 'morphology', '城廓이 있는 귀를 수명이 촉박하지 않다는 전통 판단과 연결한다.', ['longevity'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.lower_bone_round_no_surplus_money', '相耳訣', 'lower_ear_bone', '耳下骨員，未有餘錢', 'morphology', '귀 아래 뼈가 둥근 조건을 여유 재물이 없다는 판단과 연결한다.', ['wealth'], 'challenging', 'whole_life', null, 'direct_clear'],

  ['fr311l.ear.high_outline_comfort', '許負相耳篇', 'ear_whole', '耳高輪廓，亦主安樂', 'morphology', '높고 윤곽이 있는 귀를 안락함과 연결한다.', ['life_course'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.knife_ring_high_office', '許負相耳篇', 'ear_whole', '耳有刀環，五等高官', 'morphology', '刀環 표현의 귀 형상을 높은 관직과 연결한다.', ['status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.gate_drooping_thick_wealth', '許負相耳篇', 'ear_gate', '耳門垂厚，富貴長久', 'morphology', '귀문이 드리우고 두꺼운 조건을 오래 지속되는 부귀와 연결한다.', ['wealth', 'status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.gate_roomy_poverty_leaves', '許負相耳篇', 'ear_gate', '耳門容著，家貧易去', 'morphology', '귀문이 넉넉한 조건을 가난에서 벗어남과 연결하는 문구를 보존한다.', ['wealth'], 'favorable', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.fine_hair_longevity_wealth', '許負相耳篇', 'ear_whole', '耳有毫毛，長壽富貴，兼沒災殃', 'hair', '귀의 잔털을 장수·부귀·재앙 없음과 연결한다.', ['longevity', 'wealth', 'status', 'traditional_auspice'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.beast_like_self_settled', '許負相耳篇', 'ear_whole', '耳如獸耳，自安自止', 'morphology', '짐승 귀 같은 형상을 스스로 편안히 머문다는 전통 판단과 연결한다.', ['life_course'], 'neutral', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.gate_wide_intelligence_wealth', '許負相耳篇', 'ear_gate', '耳門寬大，聰明財足', 'morphology', '넓고 큰 귀문을 총명함과 재물의 충분함에 연결한다.', ['learning_talent', 'wealth'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.gate_thin_small_short_life_food', '許負相耳篇', 'ear_gate', '耳門薄小，命短食少', 'morphology', '얇고 작은 귀문을 불리한 수명과 적은 식록에 연결한다.', ['longevity', 'livelihood'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.white_face_reputation', '許負相耳篇', 'ear_whole', '耳白於面，名滿赤縣', 'color', '얼굴보다 흰 귀색을 널리 알려지는 명성과 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.clear_outline_earlobe_integrity', '許負相耳篇', 'ear_whole', '輪廓分明有墜珠，一生仁義最相宜', 'morphology', '윤곽이 분명하고 귓불이 있는 귀를 인의에 관한 전통 판단과 연결한다.', ['integrity_trust'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.wood_star_literature_fame', '許負相耳篇', 'ear_whole', '木星得地招文學，自有聲名達帝都', 'morphology', '木星得地 표현을 문학적 재능과 명성에 연결하는 문구를 보존한다.', ['learning_talent', 'reputation'], 'favorable', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.reversed_no_lun_bad', '許負相耳篇', 'lun', '耳反無輪最不堪', 'morphology', '귀가 뒤집히고 輪이 없는 형태를 매우 불리한 전통 길흉 판단과 연결한다.', ['traditional_auspice'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.arrow_feather_low_resources', '許負相耳篇', 'ear_whole', '又如箭羽少資糧', 'morphology', '箭羽耳에 비유한 귀를 적은 생활 자원과 연결한다.', ['livelihood'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.mingmen_empty_small_short_life', '許負相耳篇', 'mingmen', '命門空小人無壽', 'morphology', '命門이 비고 작은 조건을 불리한 수명 판단과 연결한다.', ['longevity'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.blue_black_coarse_foreign_place', '許負相耳篇', 'ear_whole', '青黑皮粗走異鄉', 'color', '청흑색이고 피부가 거친 귀를 타향으로 감과 연결한다.', ['life_course'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.close_flesh_outline_red_gloss_wealth_status', '許負相耳篇', 'ear_whole', '耳生貼肉廓輪成，紅光盡屬富而榮', 'color', '귀가 살에 붙고 윤곽이 갖추어지며 붉게 빛나는 조건을 부귀와 연결한다.', ['wealth', 'status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.exposed_reversed_thin_dry_poverty', '許負相耳篇', 'ear_whole', '露反薄乾貧苦相', 'morphology', '드러나고 뒤집히며 얇고 마른 귀를 빈곤과 연결한다.', ['wealth'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.long_hair_longevity', '許負相耳篇', 'ear_whole', '毛長出耳壽千春', 'hair', '귀 밖으로 긴 털이 난 조건을 장수와 연결한다.', ['longevity'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.white_beyond_face_reputation', '許負相耳篇', 'ear_whole', '耳白過面少高名', 'color', '얼굴보다 더 흰 귀색을 높은 명성에 관한 전통 판단과 연결한다.', ['reputation'], 'favorable', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.front_not_visible_wealth_status', '許負相耳篇', 'ear_whole', '前看不見富貴榮', 'front_visibility', '정면에서 귀가 보이지 않는 조건을 부귀와 연결한다.', ['wealth', 'status'], 'favorable', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.front_visible_poverty', '許負相耳篇', 'ear_whole', '前看見耳多貧苦', 'front_visibility', '정면에서 귀가 보이는 조건을 빈곤과 연결한다.', ['wealth'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.front_mark_deaf_poor', '許負相耳篇', 'ear_whole', '耳前生靨近聾貧', 'surface_mark', '귀 앞의 점·흔적 표현을 난청 및 빈곤에 관한 전통 주장과 연결한다.', ['traditional_health', 'wealth'], 'challenging', 'whole_life', null, 'phrase_uncertain'],
  ['fr311l.ear.upper_pointed_wolf_killing_mind', '許負相耳篇', 'ear_whole', '上尖狼耳心多殺', 'morphology', '위가 뾰족한 狼耳를 살해 성향에 관한 전통 주장과 연결한다.', ['conduct_risk'], 'challenging', 'whole_life', null, 'direct_clear'],
  ['fr311l.ear.lower_pointed_colorless_no_good', '許負相耳篇', 'ear_whole', '下尖無色亦無良', 'morphology', '아래가 뾰족하고 색이 없는 귀를 도덕성에 관한 부정적 전통 판단과 연결한다.', ['integrity_trust'], 'challenging', 'whole_life', null, 'direct_clear'],
];

function directRule(raw: RawRule): EarDirectRuleFR311L {
  const [ruleId, sourceSection, region, sourceExpression, observationKind, meaningSummary, topicKeys, polarity, lifeStage, relationTarget, certainty] = raw;
  return Object.freeze({
    ruleId,
    sourceSection,
    region,
    sourceExpression,
    observationKind,
    meaningSummary,
    topicKeys: Object.freeze([...topicKeys]),
    polarity,
    lifeStage,
    relationTarget,
    certainty,
    sourceRefs: Object.freeze([GUJIN_634]),
    historicalTraditionalDoctrineOnly: true as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    spouseDeathPredictionAuthorized: false as const,
    familyDeathPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    moralityFactAuthorized: false as const,
    criminalityFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const EAR_DIRECT_RULES_FR311L: readonly EarDirectRuleFR311L[] =
  Object.freeze(RAW_DIRECT_RULES.map(directRule));

export const EAR_CROSS_REGION_CONTEXTS_FR311L: readonly EarCrossRegionContextFR311L[] =
  Object.freeze([
    Object.freeze({
      contextId: 'fr311l.context.earlobe_toward_mouth',
      sourceSection: '相耳',
      sourceExpression: '垂珠朝口者，主財壽',
      participatingRegions: Object.freeze(['earlobe', 'mouth']),
      contextSummary: '귓불이 입을 향하는 직접 관계는 FR311K의 ear_mouth.earlobe_toward_mouth 근거와 중복되므로 FR311L에서 새 독립 규칙을 만들지 않는다.',
      certainty: 'direct_clear' as const,
      sourceRefs: Object.freeze([GUJIN_634]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      neutralGeometryBindingAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311l.context.ear_higher_than_eye',
      sourceSection: '許負相耳篇',
      sourceExpression: '耳高於目，合受他祿',
      participatingRegions: Object.freeze(['ear', 'eye']),
      contextSummary: '귀와 눈의 상대 높이 관계이므로 귀 단독 의미에서 분리하고 후속 교차부위 연구 대상으로 보존한다.',
      certainty: 'direct_clear' as const,
      sourceRefs: Object.freeze([GUJIN_634]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      neutralGeometryBindingAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311l.context.ear_one_inch_above_brow',
      sourceSection: '許負相耳篇',
      sourceExpression: '高，如眉一寸，永不踐貧困',
      participatingRegions: Object.freeze(['ear', 'eyebrow']),
      contextSummary: '귀와 눈썹의 상대 높이·거리 관계이므로 귀 단독 metric threshold로 변환하지 않는다.',
      certainty: 'phrase_uncertain' as const,
      sourceRefs: Object.freeze([GUJIN_634]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      neutralGeometryBindingAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311l.context.eye_can_see_ear',
      sourceSection: '許負相耳篇',
      sourceExpression: '目能自睹者吉',
      participatingRegions: Object.freeze(['eye', 'ear']),
      contextSummary: '눈과 귀의 가시성 관계로 읽히는 문구이며 귀 단독 의미로 승격하지 않는다.',
      certainty: 'phrase_uncertain' as const,
      sourceRefs: Object.freeze([GUJIN_634]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      neutralGeometryBindingAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }),
    Object.freeze({
      contextId: 'fr311l.context.earlobe_toward_mouth_xufu',
      sourceSection: '許負相耳篇',
      sourceExpression: '下有垂珠肉色光，更來朝口富榮昌',
      participatingRegions: Object.freeze(['earlobe', 'mouth']),
      contextSummary: '귓불과 입의 朝口 관계를 재확인하는 문구이며 FR311K의 기존 관계 evidence를 재사용한다.',
      certainty: 'direct_clear' as const,
      sourceRefs: Object.freeze([GUJIN_634]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      neutralGeometryBindingAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }),
  ]);

type RawDescriptor = readonly [
  region: EarRegionKeyFR311L,
  sourceFragment: string,
  observationKind: EarObservationKindFR311L,
  neutralGloss: string,
  certainty?: EarCertaintyFR311L,
];

type RawClaim = readonly [
  topicKey: EarSemanticTopicFR311L,
  lifeStage: EarLifeStageFR311L,
  polarity: EarPolarityFR311L,
  sourceFragment: string,
  meaningSummary: string,
  certainty?: EarCertaintyFR311L,
];

interface RawNamedForm {
  readonly key: string;
  readonly label: EarNamedFormLabelFR311L;
  readonly text: string;
  readonly d: readonly RawDescriptor[];
  readonly c: readonly RawClaim[];
}

const RAW_NAMED_FORMS: readonly RawNamedForm[] = [
  {
    key: 'ear.named.earth',
    label: '土耳',
    text: '土耳堅厚大且肥，潤紅姿色正堪宜。綿長富貴六親足，鶴髮童顏輔佐時。',
    d: [
      ['ear_whole', '堅厚大且肥', 'morphology', '단단하고 두껍고 크며 살집이 있다고 기술'],
      ['ear_whole', '潤紅', 'color', '윤택한 붉은 색으로 기술'],
      ['ear_whole', '綿長', 'morphology', '길게 이어지는 형태로 기술'],
    ],
    c: [
      ['wealth', 'whole_life', 'favorable', '富貴', '부귀와 연결한다.'],
      ['interpersonal_relations', 'whole_life', 'favorable', '六親足', '육친 관계의 충족과 연결한다.'],
      ['longevity', 'late', 'favorable', '鶴髮童顏', '노년의 장수 이미지와 연결하는 전통 표현을 기록한다.'],
      ['status', 'late', 'favorable', '輔佐時', '보좌하는 지위에 관한 전통 판단을 기록한다.'],
    ],
  },
  {
    key: 'ear.named.chess_piece',
    label: '棋子耳',
    text: '耳圓輪廓喜相扶，白手興家貴可圖。祖業平常自創立，中年富貴若陶朱。',
    d: [
      ['ear_whole', '耳圓', 'morphology', '귀가 둥글다고 기술'],
      ['ear_whole', '輪廓喜相扶', 'morphology', '輪과 廓이 서로 받쳐주는 형상으로 기술'],
    ],
    c: [
      ['household', 'whole_life', 'favorable', '白手興家', '스스로 가업을 일으킨다는 판단과 연결한다.'],
      ['status', 'whole_life', 'favorable', '貴可圖', '귀함을 도모할 수 있다는 판단과 연결한다.'],
      ['inheritance', 'whole_life', 'neutral', '祖業平常', '조상 재산은 평범하다고 기술한다.'],
      ['wealth', 'middle', 'favorable', '中年富貴若陶朱', '중년의 큰 부와 연결한다.'],
    ],
  },
  {
    key: 'ear.named.tiger',
    label: '虎耳',
    text: '耳小輪廓又缺破，對面不見始為奇。此耳此人多好險，亦能有貴有威儀。',
    d: [
      ['ear_whole', '耳小', 'morphology', '귀가 작다고 기술'],
      ['ear_whole', '輪廓又缺破', 'morphology', '輪廓에 결손·파손이 있다고 기술'],
      ['ear_whole', '對面不見始為奇', 'front_visibility', '정면에서 귀가 보이지 않는 조건을 명명형 구성으로 기술'],
    ],
    c: [
      ['temperament', 'whole_life', 'challenging', '多好險', '위험을 좋아한다는 전통 성정 판단과 연결한다.'],
      ['status', 'whole_life', 'favorable', '有貴有威儀', '귀함과 위의를 갖는다는 판단과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.arrow_feather',
    label: '箭羽耳',
    text: '上節高眉寸有餘，下生箭羽沒垂珠。父手祖財雖萬貫，尤能破散走東西。',
    d: [
      ['context', '上節高眉寸有餘', 'cross_region_context', '귀 윗부분과 눈썹의 상대 높이 문맥'],
      ['ear_whole', '下生箭羽', 'morphology', '아랫부분이 화살깃 같은 형상으로 기술'],
      ['earlobe', '沒垂珠', 'morphology', '귓불이 없다고 기술'],
    ],
    c: [
      ['inheritance', 'whole_life', 'challenging', '父手祖財雖萬貫，尤能破散', '많은 조상 재산도 흩어버린다는 전통 판단과 연결한다.'],
      ['life_course', 'whole_life', 'challenging', '走東西', '이리저리 떠도는 삶의 흐름과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.metal',
    label: '金耳',
    text: '高眉一寸天輪小，耳白過面並垂珠，富貴聞名於朝野，只嫌損子末時孤。',
    d: [
      ['context', '高眉一寸', 'cross_region_context', '귀와 눈썹의 상대 높이 문맥'],
      ['tianlun', '天輪小', 'morphology', '天輪이 작다고 기술'],
      ['ear_whole', '耳白過面', 'color', '귀가 얼굴보다 희다고 기술'],
      ['earlobe', '並垂珠', 'morphology', '귓불이 있다고 기술'],
    ],
    c: [
      ['wealth', 'whole_life', 'favorable', '富貴', '부와 귀함에 연결한다.'],
      ['reputation', 'whole_life', 'favorable', '聞名於朝野', '조정과 민간에 이름이 난다는 판단과 연결한다.'],
      ['children_family', 'late', 'challenging', '損子', '자녀 손실에 관한 전통 주장과 연결한다.'],
      ['interpersonal_relations', 'late', 'challenging', '末時孤', '말년의 고독과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.wood',
    label: '木耳',
    text: '輪飛廓反六親薄，尤恐資財不足家。面部若好碌碌度，不然貧苦定虛花。',
    d: [
      ['lun', '輪飛', 'morphology', '輪이 들려 퍼진 형상으로 기술'],
      ['kuo', '廓反', 'morphology', '廓이 뒤집힌 형상으로 기술'],
      ['context', '面部若好', 'cross_region_context', '얼굴 전체 상태를 조건으로 붙이는 문맥'],
    ],
    c: [
      ['interpersonal_relations', 'whole_life', 'challenging', '六親薄', '육친 관계가 박하다는 전통 판단과 연결한다.'],
      ['wealth', 'whole_life', 'challenging', '資財不足家', '재물이 집안에 부족하다는 판단과 연결한다.'],
      ['life_course', 'whole_life', 'neutral', '面部若好碌碌度', '다른 얼굴 조건이 좋으면 평범하게 지낸다는 조건부 서술을 보존한다.', 'phrase_uncertain'],
      ['wealth', 'whole_life', 'challenging', '不然貧苦定虛花', '그렇지 않으면 빈곤하다는 조건부 전통 판단과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.water',
    label: '水耳',
    text: '水耳厚圓高過目，又兼貼腦有垂珠，硬堅紅潤如卓立，宜是人間大丈夫。',
    d: [
      ['ear_whole', '厚圓', 'morphology', '두껍고 둥글다고 기술'],
      ['context', '高過目', 'cross_region_context', '귀와 눈의 상대 높이 문맥'],
      ['ear_whole', '貼腦', 'morphology', '귀가 머리에 붙는다고 기술'],
      ['earlobe', '有垂珠', 'morphology', '귓불이 있다고 기술'],
      ['ear_whole', '硬堅', 'morphology', '단단하고 견고하다고 기술'],
      ['ear_whole', '紅潤', 'color', '붉고 윤택하다고 기술'],
    ],
    c: [
      ['traditional_auspice', 'whole_life', 'favorable', '宜是人間大丈夫', '大丈夫에 적합하다는 전통적 호평을 기록한다.'],
    ],
  },
  {
    key: 'ear.named.fire',
    label: '火耳',
    text: '高眉輪尖廓且反，縱有垂珠不足誇，山根臥蠶若相應，末年無子壽彌加。',
    d: [
      ['context', '高眉', 'cross_region_context', '귀와 눈썹의 상대 위치 문맥'],
      ['lun', '輪尖', 'morphology', '輪이 뾰족하다고 기술'],
      ['kuo', '廓且反', 'morphology', '廓이 뒤집혔다고 기술'],
      ['earlobe', '有垂珠不足誇', 'morphology', '귓불이 있어도 충분한 장점이 아니라고 기술'],
      ['context', '山根臥蠶若相應', 'cross_region_context', '산근·와잠과의 대응 조건을 붙이는 문맥'],
    ],
    c: [
      ['children_family', 'late', 'challenging', '末年無子', '말년에 자녀가 없다는 전통 주장과 연결한다.'],
      ['longevity', 'late', 'favorable', '壽彌加', '말년의 수명이 더해진다는 전통 판단과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.pig',
    label: '豬耳',
    text: '無廓有輪耳雖厚，或前或後或垂珠。縱然富貴成何濟，晚景多兇災害生。',
    d: [
      ['kuo', '無廓', 'morphology', '廓이 없다고 기술'],
      ['lun', '有輪', 'morphology', '輪이 있다고 기술'],
      ['ear_whole', '耳雖厚', 'morphology', '귀가 두껍다고 기술'],
      ['ear_whole', '或前或後', 'morphology', '귀가 앞 또는 뒤로 치우친다고 기술'],
      ['earlobe', '或垂珠', 'morphology', '귓불이 나타날 수 있다고 기술'],
    ],
    c: [
      ['wealth', 'whole_life', 'mixed', '縱然富貴成何濟', '부귀가 있더라도 충분한 이익이 되지 않는다는 혼합 판단을 기록한다.'],
      ['life_course', 'late', 'challenging', '晚景多兇災害生', '말년에 재해가 많다는 전통 판단과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.low_reversed',
    label: '低反耳',
    text: '耳低廓反又輪開，年幼刑孤且損財。應有家財也消耗，他年恐死沒人埋。',
    d: [
      ['ear_whole', '耳低', 'morphology', '귀가 낮다고 기술'],
      ['kuo', '廓反', 'morphology', '廓이 뒤집혔다고 기술'],
      ['lun', '輪開', 'morphology', '輪이 벌어졌다고 기술'],
    ],
    c: [
      ['life_course', 'early', 'challenging', '年幼刑孤', '어린 시기의 고독·형극에 관한 전통 판단과 연결한다.'],
      ['wealth', 'early', 'challenging', '且損財', '어린 시기의 재물 손실과 연결한다.'],
      ['household', 'whole_life', 'challenging', '應有家財也消耗', '집안 재산의 소모와 연결한다.'],
      ['longevity', 'late', 'challenging', '他年恐死沒人埋', '훗날 죽음과 장례 부재에 관한 극단적 전통 주장을 기록한다.'],
    ],
  },
  {
    key: 'ear.named.shoulder_drooping',
    label: '垂肩耳',
    text: '耳厚廓豐珠橐肩，過眉潤澤色明鮮。頭圓額潤形容異，九五之尊奪尚賢。',
    d: [
      ['ear_whole', '耳厚', 'morphology', '귀가 두껍다고 기술'],
      ['kuo', '廓豐', 'morphology', '廓이 풍성하다고 기술'],
      ['earlobe', '珠橐肩', 'morphology', '귓불이 어깨 쪽으로 늘어진 형상으로 기술'],
      ['context', '過眉', 'cross_region_context', '귀와 눈썹의 상대 높이 문맥'],
      ['ear_whole', '潤澤色明鮮', 'color', '윤택하고 밝고 선명한 색으로 기술'],
      ['context', '頭圓額潤形容異', 'cross_region_context', '머리·이마 조건과 함께 제시되는 문맥'],
    ],
    c: [
      ['status', 'whole_life', 'favorable', '九五之尊奪尚賢', '최고 지위에 비유되는 귀함과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.close_to_brain',
    label: '貼腦耳',
    text: '兩耳貼腦輪廓堅，壓眉壓眼是高賢。六親昆玉皆豪貴，百世流芳樂自然。',
    d: [
      ['ear_whole', '兩耳貼腦', 'morphology', '양 귀가 머리에 붙는다고 기술'],
      ['ear_whole', '輪廓堅', 'morphology', '輪廓이 단단하다고 기술'],
      ['context', '壓眉壓眼', 'cross_region_context', '귀와 눈썹·눈의 상대 위치 문맥'],
    ],
    c: [
      ['status', 'whole_life', 'favorable', '是高賢', '높은 현인으로 평가하는 전통 판단과 연결한다.'],
      ['interpersonal_relations', 'whole_life', 'favorable', '六親昆玉皆豪貴', '육친·형제의 귀함과 연결한다.'],
      ['reputation', 'whole_life', 'favorable', '百世流芳', '오랫동안 명성이 전해진다는 판단과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.open_flower',
    label: '開花耳',
    text: '耳輪開花兼又薄，縱然骨破也徒然。巨萬貲財尤破盡，末年貧苦不如前。',
    d: [
      ['lun', '耳輪開花', 'morphology', '輪이 꽃처럼 벌어진 형상으로 기술'],
      ['ear_whole', '兼又薄', 'morphology', '귀가 얇다고 기술'],
      ['ear_whole', '骨破', 'morphology', '뼈대가 깨진 듯한 표현을 사용'],
    ],
    c: [
      ['wealth', 'whole_life', 'challenging', '巨萬貲財尤破盡', '큰 재산도 모두 소진한다는 전통 판단과 연결한다.'],
      ['wealth', 'late', 'challenging', '末年貧苦不如前', '말년의 빈곤과 연결한다.'],
    ],
  },
  {
    key: 'ear.named.fan_wind',
    label: '扇風耳',
    text: '兩耳向前且兜風，破盡家財及祖宗。少年享福中年敗，末歲貧苦受孤窮。',
    d: [
      ['ear_whole', '兩耳向前且兜風', 'morphology', '양 귀가 앞으로 향해 바람을 받는 형상으로 기술'],
    ],
    c: [
      ['household', 'whole_life', 'challenging', '破盡家財及祖宗', '가산과 조상 재산을 소진한다는 판단과 연결한다.'],
      ['life_course', 'early', 'favorable', '少年享福', '소년기의 복을 누린다는 판단과 연결한다.'],
      ['life_course', 'middle', 'challenging', '中年敗', '중년의 쇠퇴와 연결한다.'],
      ['wealth', 'late', 'challenging', '末歲貧苦', '말년의 빈곤과 연결한다.'],
      ['interpersonal_relations', 'late', 'challenging', '受孤窮', '말년의 고독과 곤궁에 연결한다.'],
    ],
  },
  {
    key: 'ear.named.mouse',
    label: '鼠耳',
    text: '鼠耳高飛根反尖，縱然過目不為亨。鼠盜狗偷常不改，末年破敗喪牢檐。',
    d: [
      ['ear_whole', '高飛', 'morphology', '귀가 높이 들린 형상으로 기술'],
      ['ear_root', '根反尖', 'morphology', '귀뿌리가 뒤집히고 뾰족하다고 기술'],
      ['context', '過目', 'cross_region_context', '귀와 눈의 상대 높이 문맥'],
    ],
    c: [
      ['traditional_auspice', 'whole_life', 'challenging', '不為亨', '형통하지 않다는 전통 판단과 연결한다.'],
      ['legal_penalty', 'whole_life', 'challenging', '鼠盜狗偷常不改', '절도 행위에 관한 전통 범죄성 주장을 기록한다.'],
      ['life_course', 'late', 'challenging', '末年破敗', '말년의 파탄과 연결한다.'],
      ['legal_penalty', 'late', 'challenging', '喪牢檐', '말년의 옥사·형벌에 관한 것으로 보이는 문구를 보존한다.', 'phrase_uncertain'],
    ],
  },
  {
    key: 'ear.named.donkey',
    label: '驢耳',
    text: '有輪有廓耳雖厚，又嫌軟弱反垂珠。此耳之人必貧苦，末年凶敗事躊躇。',
    d: [
      ['lun', '有輪', 'morphology', '輪이 있다고 기술'],
      ['kuo', '有廓', 'morphology', '廓이 있다고 기술'],
      ['ear_whole', '耳雖厚', 'morphology', '귀가 두껍다고 기술'],
      ['ear_whole', '軟弱', 'morphology', '귀가 무르고 약하다고 기술'],
      ['earlobe', '反垂珠', 'morphology', '귓불이 뒤집힌 듯한 형상으로 기술'],
    ],
    c: [
      ['wealth', 'whole_life', 'challenging', '必貧苦', '빈곤과 연결한다.'],
      ['life_course', 'late', 'challenging', '末年凶敗事躊躇', '말년의 불리한 쇠퇴와 연결한다.'],
    ],
  },
];

function descriptor(
  formKey: string,
  index: number,
  raw: RawDescriptor,
): EarNamedFormDescriptorFR311L {
  const [region, sourceFragment, observationKind, neutralGloss, certainty = 'direct_clear'] = raw;
  return Object.freeze({
    descriptorId: formKey + '.descriptor.' + (index + 1),
    region,
    sourceFragment,
    observationKind,
    neutralGloss,
    certainty,
    neutralGeometryBindingAuthorized: false as const,
  });
}

function claim(
  formKey: string,
  index: number,
  raw: RawClaim,
): EarNamedFormClaimFR311L {
  const [topicKey, lifeStage, polarity, sourceFragment, meaningSummary, certainty = 'direct_clear'] = raw;
  return Object.freeze({
    claimId: formKey + '.claim.' + (index + 1),
    topicKey,
    lifeStage,
    polarity,
    sourceFragment,
    meaningSummary,
    certainty,
    historicalTraditionalDoctrineOnly: true as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    spouseDeathPredictionAuthorized: false as const,
    familyDeathPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    moralityFactAuthorized: false as const,
    criminalityFactAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const EAR_NAMED_FORM_SEMANTICS_FR311L: readonly EarNamedFormSemanticRecordFR311L[] =
  Object.freeze(RAW_NAMED_FORMS.map((form) => Object.freeze({
    formKey: form.key,
    traditionalLabel: form.label,
    sourceText: form.text,
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed' as const,
    nlc1925DirectScanAdjudicated: false as const,
    descriptors: Object.freeze(form.d.map((item, index) => descriptor(form.key, index, item))),
    claims: Object.freeze(form.c.map((item, index) => claim(form.key, index, item))),
    namedFormToNeutralClassifierAuthorized: false as const,
  })));

export const FR311L_EAR_SUMMARY = Object.freeze({
  traditionalRegions: EAR_TRADITIONAL_REGIONS_FR311L.length,
  directRules: EAR_DIRECT_RULES_FR311L.length,
  crossRegionContexts: EAR_CROSS_REGION_CONTEXTS_FR311L.length,
  namedForms: EAR_NAMED_FORM_SEMANTICS_FR311L.length,
  namedFormDescriptors: EAR_NAMED_FORM_SEMANTICS_FR311L.reduce((sum, item) => sum + item.descriptors.length, 0),
  namedFormClaims: EAR_NAMED_FORM_SEMANTICS_FR311L.reduce((sum, item) => sum + item.claims.length, 0),
});

export const FR311L_EAR_AUTHORITY_BOUNDARY = Object.freeze({
  scoreAuthorized: false as const,
  aggregateGoodBadJudgementAuthorized: false as const,
  unsupportedSynthesisAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  traditionalRuleInferenceAuthorized: false as const,
  namedFormToNeutralClassifierAuthorized: false as const,
  traditionalRegionToNeutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  spouseDeathPredictionAuthorized: false as const,
  familyDeathPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  moralityFactAuthorized: false as const,
  criminalityFactAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error('fr311l_duplicate:' + path);
  }
}

export function assertEarSemanticsFR311L(): void {
  if (EAR_NAMED_FORM_SEMANTICS_FR311L.length !== 16) {
    throw new Error('fr311l_named_form_count_drift:' + EAR_NAMED_FORM_SEMANTICS_FR311L.length);
  }

  assertUnique(EAR_DIRECT_RULES_FR311L.map((item) => item.ruleId), 'direct_rule');
  assertUnique(EAR_CROSS_REGION_CONTEXTS_FR311L.map((item) => item.contextId), 'cross_region_context');
  assertUnique(EAR_NAMED_FORM_SEMANTICS_FR311L.map((item) => item.formKey), 'named_form');
  assertUnique(
    EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((item) => item.descriptors.map((descriptor) => descriptor.descriptorId)),
    'named_form_descriptor',
  );
  assertUnique(
    EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((item) => item.claims.map((entry) => entry.claimId)),
    'named_form_claim',
  );

  for (const rule of EAR_DIRECT_RULES_FR311L) {
    if (
      rule.historicalTraditionalDoctrineOnly !== true ||
      rule.modernScientificFactAuthorized !== false ||
      rule.healthDiagnosisAuthorized !== false ||
      rule.lifespanPredictionAuthorized !== false ||
      rule.spouseDeathPredictionAuthorized !== false ||
      rule.familyDeathPredictionAuthorized !== false ||
      rule.fertilityPredictionAuthorized !== false ||
      rule.childSexPredictionAuthorized !== false ||
      rule.personalityFactAuthorized !== false ||
      rule.moralityFactAuthorized !== false ||
      rule.criminalityFactAuthorized !== false ||
      rule.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311l_direct_authority_widening:' + rule.ruleId);
    }
  }

  for (const form of EAR_NAMED_FORM_SEMANTICS_FR311L) {
    if (form.namedFormToNeutralClassifierAuthorized !== false) {
      throw new Error('fr311l_classifier_authority_widening:' + form.formKey);
    }
    for (const descriptor of form.descriptors) {
      if (descriptor.neutralGeometryBindingAuthorized !== false) {
        throw new Error('fr311l_descriptor_geometry_widening:' + descriptor.descriptorId);
      }
    }
    for (const item of form.claims) {
      if (
        item.historicalTraditionalDoctrineOnly !== true ||
        item.modernScientificFactAuthorized !== false ||
        item.healthDiagnosisAuthorized !== false ||
        item.lifespanPredictionAuthorized !== false ||
        item.spouseDeathPredictionAuthorized !== false ||
        item.familyDeathPredictionAuthorized !== false ||
        item.fertilityPredictionAuthorized !== false ||
        item.childSexPredictionAuthorized !== false ||
        item.personalityFactAuthorized !== false ||
        item.moralityFactAuthorized !== false ||
        item.criminalityFactAuthorized !== false ||
        item.productInterpretationAuthorized !== false
      ) {
        throw new Error('fr311l_named_claim_authority_widening:' + item.claimId);
      }
    }
  }

  for (const context of EAR_CROSS_REGION_CONTEXTS_FR311L) {
    if (
      context.semanticCombinationAuthorized !== false ||
      context.relationInferenceAuthorized !== false ||
      context.neutralGeometryBindingAuthorized !== false ||
      context.productInterpretationAuthorized !== false
    ) {
      throw new Error('fr311l_context_authority_widening:' + context.contextId);
    }
  }

  for (const [key, value] of Object.entries(FR311L_EAR_AUTHORITY_BOUNDARY)) {
    if (value !== false) {
      throw new Error('fr311l_authority_boundary_widening:' + key);
    }
  }
}
