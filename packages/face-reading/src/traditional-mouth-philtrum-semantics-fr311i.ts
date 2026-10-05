export type MouthPhiltrumSemanticTopicFR311I =
  | 'learning_talent'
  | 'wealth'
  | 'status'
  | 'wealth_status'
  | 'reputation'
  | 'livelihood'
  | 'longevity'
  | 'children_family'
  | 'spouse_relationship'
  | 'parents'
  | 'integrity_trust'
  | 'conduct_risk'
  | 'speech_conduct'
  | 'temperament'
  | 'interpersonal_relations'
  | 'traditional_health'
  | 'traditional_auspice'
  | 'life_course'
  | 'inheritance'
  | 'household'
  | 'legal_penalty';

export type MouthPhiltrumRegionKeyFR311I =
  | 'philtrum'
  | 'mouth_whole'
  | 'mouth_corner'
  | 'upper_lip'
  | 'lower_lip'
  | 'lips_pair'
  | 'lip_color'
  | 'context';

export type MouthPhiltrumPolarityFR311I =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type MouthPhiltrumLifeStageFR311I =
  | 'whole_life'
  | 'early'
  | 'middle'
  | 'late';

export type MouthPhiltrumCertaintyFR311I =
  | 'direct_clear'
  | 'phrase_uncertain';

export type MouthPhiltrumObservationKindFR311I =
  | 'morphology'
  | 'color'
  | 'surface_mark'
  | 'wrinkle_or_line'
  | 'dynamic_behavior'
  | 'cross_region_context';

export type MouthPhiltrumSourceSectionFR311I =
  | '人中論'
  | '相人中篇'
  | '相口'
  | '許負相口篇'
  | '論脣'
  | '許負相脣篇';

export interface MouthPhiltrumTraditionalRegionFR311I {
  readonly regionKey: Exclude<MouthPhiltrumRegionKeyFR311I, 'lip_color' | 'context'>;
  readonly traditionalLabel: string;
  readonly neutralGloss: string;
  readonly sourceRefs: readonly string[];
  readonly neutralGeometryBindingAuthorized: false;
}

export interface MouthPhiltrumDirectRuleFR311I {
  readonly ruleId: string;
  readonly sourceSection: MouthPhiltrumSourceSectionFR311I;
  readonly region: MouthPhiltrumRegionKeyFR311I;
  readonly sourceExpression: string;
  readonly observationKind: MouthPhiltrumObservationKindFR311I;
  readonly meaningSummary: string;
  readonly topicKeys: readonly MouthPhiltrumSemanticTopicFR311I[];
  readonly polarity: MouthPhiltrumPolarityFR311I;
  readonly lifeStage: MouthPhiltrumLifeStageFR311I;
  readonly relationTarget: string | null;
  readonly certainty: MouthPhiltrumCertaintyFR311I;
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface MouthNamedFormDescriptorFR311I {
  readonly descriptorId: string;
  readonly region: MouthPhiltrumRegionKeyFR311I;
  readonly sourceFragment: string;
  readonly observationKind: MouthPhiltrumObservationKindFR311I;
  readonly neutralGloss: string;
  readonly certainty: MouthPhiltrumCertaintyFR311I;
  readonly neutralGeometryBindingAuthorized: false;
}

export interface MouthNamedFormClaimFR311I {
  readonly claimId: string;
  readonly topicKey: MouthPhiltrumSemanticTopicFR311I;
  readonly lifeStage: MouthPhiltrumLifeStageFR311I;
  readonly polarity: MouthPhiltrumPolarityFR311I;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface MouthNamedFormSemanticRecordFR311I {
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly sourceText: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin634_transcription_reviewed';
  readonly nlc1925DirectScanAdjudicated: false;
  readonly descriptors: readonly MouthNamedFormDescriptorFR311I[];
  readonly claims: readonly MouthNamedFormClaimFR311I[];
  readonly namedFormToNeutralClassifierAuthorized: false;
}

const GUJIN_632 = 'witness.gujin473.art632.wikisource';
const GUJIN_634 = 'witness.gujin473.art634.wikisource';

export const MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I:
readonly MouthPhiltrumTraditionalRegionFR311I[] = Object.freeze([
  Object.freeze({ regionKey: 'philtrum', traditionalLabel: '人中', neutralGloss: '전통 문헌의 인중 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  Object.freeze({ regionKey: 'mouth_whole', traditionalLabel: '口', neutralGloss: '전통 문헌의 입 전체 명칭', sourceRefs: Object.freeze([GUJIN_632, GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  Object.freeze({ regionKey: 'mouth_corner', traditionalLabel: '口角', neutralGloss: '전통 문헌의 입 양끝·입꼬리 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  Object.freeze({ regionKey: 'upper_lip', traditionalLabel: '上脣', neutralGloss: '전통 문헌의 윗입술 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  Object.freeze({ regionKey: 'lower_lip', traditionalLabel: '下脣', neutralGloss: '전통 문헌의 아랫입술 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  Object.freeze({ regionKey: 'lips_pair', traditionalLabel: '兩脣 / 上下脣', neutralGloss: '전통 문헌에서 양 입술을 함께 다루는 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
]);

const RAW_DIRECT_RULES = [
  [
    "fr311i.philtrum.thin_narrow",
    "人中論",
    "philtrum",
    "細而狹者，衣食逼迫",
    "인중이 가늘고 좁은 조건을 의식의 압박과 연결한다.",
    [
      "livelihood"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.full_flat",
    "人中論",
    "philtrum",
    "滿而平者，迍邅災滯",
    "인중이 차고 평평한 조건을 막힘과 재난의 전통 판단에 연결한다.",
    [
      "life_course"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.upper_narrow_lower_wide",
    "人中論",
    "philtrum",
    "上狹下廣者多子孫",
    "위가 좁고 아래가 넓은 인중을 자손이 많다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.upper_wide_lower_narrow",
    "人中論",
    "philtrum",
    "上廣下狹者，少兒息",
    "위가 넓고 아래가 좁은 인중을 자녀가 적다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.both_narrow_center_wide",
    "人中論",
    "philtrum",
    "上下俱狹而中心闊者，子息疾苦而難成",
    "위아래가 좁고 가운데가 넓은 인중을 자녀의 질고와 성장 곤란에 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.straight_deep",
    "人中論",
    "philtrum",
    "上下直而深者，子息滿堂",
    "위아래가 곧고 깊은 인중을 자녀가 많다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.flat_shallow",
    "人中論",
    "philtrum",
    "上下平而淺者，子息不生",
    "평평하고 얕은 인중을 자녀가 없다는 전통 판단과 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.deep_long",
    "人中論",
    "philtrum",
    "深而長者長壽",
    "깊고 긴 인중을 장수와 연결한다.",
    [
      "longevity"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.shallow_short",
    "人中論",
    "philtrum",
    "淺而短者夭亡",
    "얕고 짧은 인중을 불리한 수명 판단과 연결한다.",
    [
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.crooked",
    "人中論",
    "philtrum",
    "人中屈曲者，無信之人",
    "굽은 인중을 신의가 없다는 전통 판단과 연결한다.",
    [
      "integrity_trust"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.upright",
    "人中論",
    "philtrum",
    "人中端直者，忠義之士",
    "반듯한 인중을 충의와 연결한다.",
    [
      "integrity_trust"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.upright_drooping",
    "人中論",
    "philtrum",
    "正而垂者富壽",
    "바르고 아래로 이어지는 인중을 부와 수명에 유리한 전통 판단과 연결한다.",
    [
      "wealth",
      "longevity"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.bent_shrunken",
    "人中論",
    "philtrum",
    "蹇而縮者，夭賤",
    "비뚤고 줄어든 인중을 수명과 지위에 불리한 전통 판단과 연결한다.",
    [
      "longevity",
      "status"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.clear_split_bamboo",
    "人中論",
    "philtrum",
    "明如破竹者，二千石祿",
    "대나무를 가른 듯 분명한 인중을 높은 녹봉·지위와 연결한다.",
    [
      "status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.thin_hanging_needle",
    "人中論",
    "philtrum",
    "細如懸針者，絕子，貧寒",
    "바늘처럼 가는 인중을 자녀와 재물에 불리한 전통 판단과 연결한다.",
    [
      "children_family",
      "wealth"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.flat_long",
    "相人中篇",
    "philtrum",
    "人中平長，至老吉昌",
    "평평하고 긴 인중을 노년까지 길하다는 판단과 연결한다.",
    [
      "life_course"
    ],
    "favorable",
    "late",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.short_compact",
    "相人中篇",
    "philtrum",
    "人中短促子孫不足",
    "짧고 촉박한 인중을 자손 부족과 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.high_thick",
    "相人中篇",
    "philtrum",
    "人中高厚，壽年不久",
    "높고 두터운 인중을 불리한 수명 판단과 연결한다.",
    [
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.philtrum.broad_flat",
    "相人中篇",
    "philtrum",
    "人中廣平，養子不成",
    "넓고 평평한 인중을 자녀 양육의 불리함과 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.broad_thick",
    "相人中篇",
    "philtrum",
    "人中廣厚，奸淫未足",
    "넓고 두터운 인중에 행실 관련 부정적 판단을 붙이는 문구를 보존한다.",
    [
      "conduct_risk"
    ],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.square_broad_ridged",
    "相口",
    "mouth_whole",
    "方闊有稜者主壽貴",
    "방정하고 넓으며 윤곽이 있는 입을 수명과 귀함에 연결한다.",
    [
      "longevity",
      "status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.angular_bow",
    "相口",
    "mouth_whole",
    "形如角弓者主官祿",
    "각궁 같은 입 모양을 관록과 연결한다.",
    [
      "status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.horizontal_broad_thick",
    "相口",
    "mouth_whole",
    "橫闊而厚者福富",
    "가로로 넓고 두터운 입을 복과 부에 연결한다.",
    [
      "wealth",
      "traditional_auspice"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.upright_thick",
    "相口",
    "mouth_whole",
    "正而不偏，厚而不薄者，衣食如四字富",
    "바르고 치우치지 않으며 두터운 입을 의식과 부에 유리한 판단과 연결한다.",
    [
      "livelihood",
      "wealth"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.horse_motion",
    "相口",
    "mouth_whole",
    "口動又如馬口飢餓",
    "말의 입처럼 움직이는 입을 굶주림의 전통 판단과 연결한다.",
    [
      "livelihood"
    ],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.mouse_slander",
    "相口",
    "mouth_whole",
    "鼠口謗毀嫉妒",
    "쥐 입에 비유한 형태를 비방·질투의 전통 판단과 연결한다.",
    [
      "speech_conduct",
      "integrity_trust"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.blowing_fire_lonely",
    "相口",
    "mouth_whole",
    "如吹火孤獨",
    "불을 부는 듯한 입을 고독과 연결한다.",
    [
      "interpersonal_relations"
    ],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.purple_black_stagnant",
    "相口",
    "mouth_whole",
    "紫黑者多滯",
    "입의 자흑색을 막힘과 연결하는 전통 색 판단을 기록한다.",
    [
      "life_course"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.cinnabar",
    "相口",
    "mouth_whole",
    "口如含丹，不受饑寒",
    "단사를 머금은 듯한 입을 굶주림·추위를 면하는 판단과 연결한다.",
    [
      "livelihood"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.pinched",
    "相口",
    "mouth_whole",
    "口如一撮者貧薄",
    "한 줌처럼 오므라든 입을 빈곤과 연결한다.",
    [
      "wealth"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.contains_fist",
    "相口",
    "mouth_whole",
    "口能容拳者出入將相",
    "주먹을 넣을 수 있을 만큼 큰 입을 장상 지위와 연결한다.",
    [
      "status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.broad_full",
    "相口",
    "mouth_whole",
    "口闊而豐，食祿萬鍾",
    "넓고 풍성한 입을 큰 식록과 연결한다.",
    [
      "status",
      "wealth"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.small_short",
    "相口",
    "mouth_whole",
    "口小而短者貧",
    "작고 짧은 입을 빈곤과 연결한다.",
    [
      "wealth"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.corner_bow",
    "許負相口篇",
    "mouth_corner",
    "口角如弓，位至三公",
    "입꼬리가 활 같은 조건을 높은 지위와 연결한다.",
    [
      "status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.shrunken_bag",
    "許負相口篇",
    "mouth_whole",
    "口如縮囊，饑死無糧",
    "오그라든 자루 같은 입을 식량 부족과 극단적으로 불리한 생활 판단에 연결한다.",
    [
      "livelihood",
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.blowing_fire",
    "許負相口篇",
    "mouth_whole",
    "口如吹火，饑寒獨坐",
    "불을 부는 듯한 입을 굶주림·추위·고독과 연결한다.",
    [
      "livelihood",
      "interpersonal_relations"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.horse_greed",
    "許負相口篇",
    "mouth_whole",
    "口如馬口，妒害貪醜",
    "말 입에 비유한 형태를 질투·해침·탐욕의 전통 비난과 연결한다.",
    [
      "integrity_trust",
      "conduct_risk"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.four_character_trust",
    "許負相口篇",
    "mouth_whole",
    "口方四字信宜真",
    "사자형으로 방정한 입을 신의와 연결한다.",
    [
      "integrity_trust"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.corners_droop_bad_speech",
    "許負相口篇",
    "mouth_corner",
    "兩角低垂說惡聲",
    "양 입꼬리가 아래로 처진 조건을 좋지 않은 말과 연결한다.",
    [
      "speech_conduct"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.blowing_fire_few_children",
    "許負相口篇",
    "mouth_whole",
    "口如吹火少兒孫",
    "불을 부는 듯한 입을 자손이 적다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.mouth.corner_purple_greed",
    "許負相口篇",
    "mouth_corner",
    "口邊紫色，貪財妨害",
    "입가의 자색을 탐재와 방해의 전통 판단에 연결한다.",
    [
      "conduct_risk"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.open_teeth_short_life",
    "許負相口篇",
    "mouth_whole",
    "口開齒出，當失算數。必不久長，少即身故",
    "입을 벌렸을 때 치아가 드러나는 조건을 불리한 수명 판단과 연결하는 문구를 보존한다.",
    [
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.red_cinnabar",
    "論脣",
    "lip_color",
    "脣色紅如丹砂者貴而福",
    "붉은 단사 같은 입술색을 귀함과 복에 연결한다.",
    [
      "status",
      "traditional_auspice"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.blue_indigo",
    "論脣",
    "lip_color",
    "青如藍靛者災而夭",
    "청람색 입술을 재앙과 불리한 수명 판단에 연결한다.",
    [
      "life_course",
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.dark_black",
    "論脣",
    "lip_color",
    "色昏黑者苦疾惡死",
    "어둡고 검은 입술색을 질고와 불리한 죽음 판단에 연결한다.",
    [
      "traditional_health",
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.purple_bright",
    "論脣",
    "lip_color",
    "色紫光者快樂衣食",
    "자색으로 빛나는 입술을 즐거움과 의식에 연결한다.",
    [
      "livelihood",
      "traditional_auspice"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.white_bright",
    "論脣",
    "lip_color",
    "色白而艷者招貴妾",
    "희고 윤택한 입술색을 배우자 관계의 전통 판단과 연결한다.",
    [
      "spouse_relationship"
    ],
    "favorable",
    "whole_life",
    "spouse",
    "direct_clear"
  ],
  [
    "fr311i.lip.yellow_red",
    "論脣",
    "lip_color",
    "色黃而紅者招貴子",
    "황홍색 입술을 귀한 자녀와 연결한다.",
    [
      "children_family"
    ],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.lip.shrunken",
    "論脣",
    "lips_pair",
    "蹇縮者夭亡",
    "오그라든 입술을 불리한 수명 판단과 연결한다.",
    [
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.thin_weak",
    "論脣",
    "lips_pair",
    "薄弱者貧賤",
    "얇고 약한 입술을 빈곤·낮은 지위와 연결한다.",
    [
      "wealth",
      "status"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.upper_long",
    "論脣",
    "upper_lip",
    "上脣長者先妨父",
    "윗입술이 긴 조건을 부친 관련 불리한 전통 판단과 연결한다.",
    [
      "parents"
    ],
    "challenging",
    "whole_life",
    "father",
    "direct_clear"
  ],
  [
    "fr311i.lip.lower_long",
    "論脣",
    "lower_lip",
    "下脣長者先妨母",
    "아랫입술이 긴 조건을 모친 관련 불리한 전통 판단과 연결한다.",
    [
      "parents"
    ],
    "challenging",
    "whole_life",
    "mother",
    "direct_clear"
  ],
  [
    "fr311i.lip.upper_thin",
    "論脣",
    "upper_lip",
    "上脣薄者言語狡詐",
    "윗입술이 얇은 조건을 말의 교활함이라는 전통 판단과 연결한다.",
    [
      "speech_conduct",
      "integrity_trust"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.lower_thin",
    "論脣",
    "lower_lip",
    "下脣薄者，貧賤蹇滯",
    "아랫입술이 얇은 조건을 빈곤·낮은 지위·막힘과 연결한다.",
    [
      "wealth",
      "status",
      "life_course"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.both_thick",
    "論脣",
    "lips_pair",
    "上下俱厚者，忠信之人",
    "위아래 입술이 모두 두꺼운 조건을 충직·신의와 연결한다.",
    [
      "integrity_trust"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.both_thin",
    "論脣",
    "lips_pair",
    "上下俱薄者，妄語",
    "위아래 입술이 모두 얇은 조건을 망언의 전통 판단과 연결한다.",
    [
      "speech_conduct"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.not_overlapping",
    "論脣",
    "lips_pair",
    "兩脣上下不相覆者，貧寒偷盜",
    "위아래 입술이 서로 덮이지 않는 조건을 빈곤과 절도의 전통 판단에 연결한다.",
    [
      "wealth",
      "conduct_risk"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.matched",
    "論脣",
    "lips_pair",
    "上下兩相稱者，言語正直",
    "위아래 입술이 서로 균형인 조건을 바른 말과 연결한다.",
    [
      "speech_conduct",
      "integrity_trust"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.dragon",
    "論脣",
    "lips_pair",
    "龍脣者，富貴",
    "용순을 부귀와 연결한다.",
    [
      "wealth_status"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.sheep",
    "論脣",
    "lips_pair",
    "羊脣者，貧賤",
    "양순을 빈천과 연결한다.",
    [
      "wealth_status"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.pointed_pursed",
    "論脣",
    "lips_pair",
    "脣尖撮者，貧死",
    "뾰족하고 오므라든 입술을 빈곤과 불리한 수명 판단에 연결한다.",
    [
      "wealth",
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.drooping",
    "論脣",
    "lips_pair",
    "脣墜下者，孤寒",
    "아래로 처진 입술을 고독과 빈한함에 연결한다.",
    [
      "interpersonal_relations",
      "livelihood"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.lines_present",
    "論脣",
    "lips_pair",
    "有紋理，多子孫",
    "입술에 무늬가 있는 조건을 자손이 많다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.lip.no_lines",
    "論脣",
    "lips_pair",
    "無紋理，性孤獨",
    "입술에 무늬가 없는 조건을 고독한 성정이라는 판단과 연결한다.",
    [
      "temperament",
      "interpersonal_relations"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.upper_thick_short_life",
    "許負相脣篇",
    "upper_lip",
    "上脣厚，命非久",
    "윗입술이 두꺼운 조건을 불리한 수명 판단과 연결하는 별도 전통 문구를 보존한다.",
    [
      "longevity"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.lower_thin_gluttony",
    "許負相脣篇",
    "lower_lip",
    "下脣薄，主貪食",
    "아랫입술이 얇은 조건을 탐식의 전통 판단과 연결한다.",
    [
      "conduct_risk"
    ],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.equal_speech_learning",
    "許負相脣篇",
    "lips_pair",
    "脣上下相當，語音易善，好集文章",
    "위아래 입술이 서로 맞는 조건을 말과 글에 관한 유리한 전통 판단과 연결한다.",
    [
      "speech_conduct",
      "learning_talent"
    ],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.lip.many_lines_children",
    "許負相脣篇",
    "lips_pair",
    "脣多紋理兒多無比",
    "입술 무늬가 많은 조건을 자녀가 많다는 판단과 연결한다.",
    [
      "children_family"
    ],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.lip.thick_quiet_thin_litigious",
    "許負相脣篇",
    "lips_pair",
    "脣厚少語薄多訟",
    "두꺼운 입술은 말이 적고 얇은 입술은 송사가 많다고 대비하는 전통 문구를 보존한다.",
    [
      "speech_conduct",
      "legal_penalty"
    ],
    "neutral",
    "whole_life",
    null,
    "direct_clear"
  ]

  [
    "fr311i.philtrum.upper_black_mark_many_children",
    "人中論",
    "philtrum",
    "上有黑子者，多子",
    "인중 위쪽의 흑점을 자녀가 많다는 전통 판단과 연결한다.",
    ["children_family"],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.lower_black_mark_many_daughters",
    "人中論",
    "philtrum",
    "下有黑子者多女",
    "인중 아래쪽의 흑점을 딸이 많다는 전통 판단과 연결한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.middle_black_mark_marriage_child_rearing",
    "人中論",
    "philtrum",
    "中有黑子者婚妻易而養兒難",
    "인중 가운데 흑점을 혼인과 자녀 양육에 관한 전통 판단과 연결한다.",
    ["spouse_relationship","children_family"],
    "mixed",
    "whole_life",
    "family",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.two_black_marks_twins",
    "人中論",
    "philtrum",
    "有兩黑子者，主雙生",
    "인중의 두 흑점을 쌍생에 관한 전통 판단과 연결한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.horizontal_line_no_children",
    "人中論",
    "philtrum",
    "有橫理者至老無兒",
    "인중의 가로 결을 노년까지 자녀가 없다는 전통 판단과 연결한다.",
    ["children_family","life_course"],
    "challenging",
    "late",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.vertical_line_raise_other_child",
    "人中論",
    "philtrum",
    "有豎理者，主養他子",
    "인중의 세로 결을 타인의 자녀를 기른다는 전통 판단과 연결한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.longitudinal_line_child_illness",
    "人中論",
    "philtrum",
    "有縱理者，主兒宿疾",
    "인중의 세로 결을 자녀의 오래된 질병에 관한 전통 주장과 연결한다.",
    ["children_family","traditional_health"],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.flat_absent_hollow",
    "人中論",
    "philtrum",
    "若人中漫漫平而無者，是謂傾陷，至老絕嗣，窮苦之相也",
    "인중이 평평해 거의 드러나지 않는 조건을 노년의 자손 단절과 빈곤에 연결한다.",
    ["children_family","wealth","life_course"],
    "challenging",
    "late",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.two_black_uncertain",
    "相人中篇",
    "philtrum",
    "人中兩黑，的生可儗",
    "인중의 두 검은 표식에 관한 문구를 전사 경계가 불안정한 상태로 보존한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "phrase_uncertain"
  ],
  [
    "fr311i.philtrum.flat_shallow_short_no_trust_children",
    "相人中篇",
    "philtrum",
    "人中平淺短何堪，無信無兒見者嫌",
    "평평하고 얕고 짧은 인중을 신의와 자녀에 불리한 전통 판단과 연결한다.",
    ["integrity_trust","children_family"],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.straight_deep_long_children",
    "相人中篇",
    "philtrum",
    "若見直深長一寸，定知兒女轉加添",
    "곧고 깊고 긴 인중을 자녀 증가에 관한 전통 판단과 연결한다.",
    ["children_family"],
    "favorable",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.flat_children_fail",
    "相人中篇",
    "philtrum",
    "人中平平子不成",
    "평평한 인중을 자녀에 불리한 전통 판단과 연결한다.",
    ["children_family"],
    "challenging",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.philtrum.well_horizontal_line_travel_risk",
    "相人中篇",
    "philtrum",
    "人中井部水橫紋，每到臨船莫進程",
    "인중의 특정 가로 결을 배를 타는 이동을 피하라는 전통 경계와 연결한다.",
    ["conduct_risk","life_course"],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.philtrum.left_right_child_sex",
    "相人中篇",
    "philtrum",
    "偏左生兒右生女",
    "인중의 좌우 치우침을 자녀 성별과 연결하는 전통 주장을 보존한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "direct_clear"
  ],
  [
    "fr311i.mouth.dog_vertical_lines_hunger",
    "相口",
    "mouth_whole",
    "狗口平下縱紋，入口飢餓",
    "개 입에 비유한 형태와 입으로 들어가는 세로 결을 굶주림에 연결한다.",
    ["livelihood"],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.open_teeth_no_mechanism",
    "相口",
    "context",
    "口開齒露者無機",
    "입을 벌릴 때 치아가 드러나는 조건을 불리한 전통 판단과 연결한다.",
    ["conduct_risk"],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.black_mark_food_drink",
    "相口",
    "mouth_whole",
    "有黑子者主酒食",
    "입의 흑점을 음식과 술에 관한 전통 판단과 연결한다.",
    ["livelihood"],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.speaks_alone",
    "相口",
    "mouth_whole",
    "無人獨語者，其賤如鼠",
    "사람이 없을 때 혼자 말하는 행동을 낮은 신분에 관한 전통 판단과 연결한다.",
    ["status","speech_conduct"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.large_tongue_small_mouth",
    "相口",
    "context",
    "舌大口小，貧薄折夭",
    "큰 혀와 작은 입의 조합을 빈곤과 불리한 수명 판단에 연결한다.",
    ["wealth","longevity"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.sprinkled_cinnabar",
    "相口",
    "mouth_whole",
    "口如潑砂，食祿榮華",
    "입을 붉은 모래를 뿌린 듯한 상태로 묘사하며 식록과 영화에 연결한다.",
    ["wealth","status"],
    "favorable",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.red_vermilion",
    "相口",
    "mouth_whole",
    "口如紅硃，富貴相宜",
    "붉은 주사 같은 입을 부귀와 연결한다.",
    ["wealth_status"],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.gathered_pursed_serving",
    "許負相口篇",
    "mouth_whole",
    "口如撮聚，供承人後，虛用心情",
    "오므라든 입을 타인을 받드는 생활과 헛된 마음씀에 연결하는 전통 문구를 보존한다.",
    ["life_course","conduct_risk"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.shrunken_snail_solitary_song",
    "許負相口篇",
    "mouth_whole",
    "口如縮螺，常樂獨歌",
    "달팽이처럼 오므라든 입을 혼자 노래하기를 즐기는 행동과 연결한다.",
    ["interpersonal_relations","speech_conduct"],
    "neutral",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.wide_thin_tongue_music",
    "許負相口篇",
    "context",
    "口寬舌薄，必好歌樂",
    "넓은 입과 얇은 혀의 조합을 노래와 음악을 좋아한다는 전통 판단에 연결한다.",
    ["temperament"],
    "neutral",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.vertical_line_hunger",
    "許負相口篇",
    "mouth_whole",
    "縱理入口，饑死不久",
    "입으로 들어가는 세로 결을 극단적으로 불리한 식생활·수명 판단에 연결한다.",
    ["livelihood","longevity"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.inner_lines_wealth",
    "許負相口篇",
    "mouth_whole",
    "口中有理，長相對益。豐財足祿，終無妨害",
    "입 안의 결을 재물과 식록에 유리한 전통 판단과 연결한다.",
    ["wealth","livelihood"],
    "favorable",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.lip_moves_before_speech",
    "許負相口篇",
    "mouth_whole",
    "口末語，將脣起，奸邪在心，常懷不足",
    "말하기 전 입술이 먼저 움직이는 행동을 간사함과 불만에 연결하는 전통 주장을 보존한다.",
    ["speech_conduct","integrity_trust"],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.black_mark_food",
    "許負相口篇",
    "mouth_whole",
    "口中黑子，食噉皆美",
    "입 안의 흑점을 음식에 관한 유리한 전통 판단과 연결한다.",
    ["livelihood"],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.water_star_square",
    "許負相口篇",
    "mouth_whole",
    "水星得地口脣方，榮貴肥家子息昌",
    "방정한 입술과 수성의 득지라는 전통 표현을 영화·가문·자손과 연결한다.",
    ["status","household","children_family"],
    "favorable",
    "whole_life",
    "family",
    "direct_clear"
  ],
  [
    "fr311i.mouth.biased_thin_edges_slander",
    "許負相口篇",
    "lips_pair",
    "上下各偏稜角薄，出言毀謗大難防",
    "위아래가 치우치고 모서리가 얇은 입술을 비방하는 말과 연결한다.",
    ["speech_conduct"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.left_bias_spouse",
    "許負相口篇",
    "mouth_whole",
    "偏左妨妻婦死迍",
    "왼쪽으로 치우친 입에 배우자 관련 불리한 전통 판단을 붙인 문구를 보존한다.",
    ["spouse_relationship"],
    "challenging",
    "whole_life",
    "spouse",
    "phrase_uncertain"
  ],
  [
    "fr311i.mouth.right_vertical_property",
    "許負相口篇",
    "mouth_whole",
    "右畔豎門田產破",
    "오른쪽의 세로 표식을 전답 손실에 연결하는 전통 문구를 보존한다.",
    ["inheritance","wealth"],
    "challenging",
    "whole_life",
    null,
    "phrase_uncertain"
  ],
  [
    "fr311i.lip.black_mark_poison",
    "許負相口篇",
    "lips_pair",
    "黑子當脣藥毒頻",
    "입술의 흑점을 약독과 연결하는 전통 건강 문구를 보존한다.",
    ["traditional_health"],
    "challenging",
    "whole_life",
    null,
    "direct_clear"
  ],
  [
    "fr311i.mouth.three_lips_adopted_child",
    "許負相口篇",
    "context",
    "面上三脣有義兒",
    "얼굴에 세 입술이라는 표현을 의자에 관한 전통 판단과 연결하며 문구 자체를 불확실하게 보존한다.",
    ["children_family"],
    "neutral",
    "whole_life",
    "children",
    "phrase_uncertain"
  ],
  [
    "fr311i.lip.red_many_lines_wealth",
    "許負相脣篇",
    "lips_pair",
    "脣上紋多紅似花，一生富貴足榮華",
    "입술 위의 많은 붉은 주름을 평생의 부귀영화와 연결한다.",
    ["wealth_status","life_course"],
    "favorable",
    "whole_life",
    null,
    "direct_clear"
  ],
] as const;

function classifyObservationKindFR311I(
  region: MouthPhiltrumRegionKeyFR311I,
  sourceExpression: string,
): MouthPhiltrumObservationKindFR311I {
  if (region === 'context') return 'cross_region_context';
  if (sourceExpression.includes('黑子')) return 'surface_mark';
  if (sourceExpression.includes('紋') || sourceExpression.includes('理')) return 'wrinkle_or_line';
  if (
    region === 'lip_color' ||
    /色|紅|青|紫|黃|丹砂|硃|丹/.test(sourceExpression)
  ) return 'color';
  if (
    /口動|獨語|將脣起|歌樂|涎流|笑而|語音/.test(sourceExpression)
  ) return 'dynamic_behavior';
  return 'morphology';
}

export const MOUTH_PHILTRUM_DIRECT_RULES_FR311I:
readonly MouthPhiltrumDirectRuleFR311I[] = Object.freeze(
  RAW_DIRECT_RULES.map((
    [ruleId, sourceSection, region, sourceExpression, meaningSummary, topicKeys, polarity, lifeStage, relationTarget, certainty],
  ) => Object.freeze({
    ruleId,
    sourceSection,
    region,
    sourceExpression,
    observationKind: classifyObservationKindFR311I(region, sourceExpression),
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
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    criminalityInferenceAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  })),
);

const RAW_NAMED_FORMS = [
  {
    "key": "mouth.named.four_character",
    "label": "四字口",
    "text": "口角光明脣兩齊，兩頭略仰不垂低。聰明更有多才學，富貴應須著紫衣。",
    "d": [
      [
        "mouth_corner",
        "口角光明",
        "입꼬리가 밝다고 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "脣兩齊",
        "양 입술이 가지런하다고 기술",
        "direct_clear"
      ],
      [
        "mouth_corner",
        "兩頭略仰不垂低",
        "양 끝이 약간 올라가고 처지지 않는다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "learning_talent",
        "whole_life",
        "favorable",
        "聰明更有多才學",
        "총명하고 재학이 많다고 기술한다."
      ],
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "富貴應須著紫衣",
        "부귀와 관복에 연결한다."
      ]
    ]
  },
  {
    "key": "mouth.named.square",
    "label": "方口",
    "text": "方口齊脣不露牙，脣紅光潤似硃砂，笑而不露齒且白，定知富貴享榮華。",
    "d": [
      [
        "mouth_whole",
        "方口",
        "방정한 입으로 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "齊脣",
        "입술이 가지런하다고 기술",
        "direct_clear"
      ],
      [
        "context",
        "不露牙",
        "치아가 드러나지 않는 동반 조건",
        "direct_clear"
      ],
      [
        "lip_color",
        "脣紅光潤似硃砂",
        "입술이 붉고 윤택해 주사 같다고 기술",
        "direct_clear"
      ],
      [
        "context",
        "笑而不露齒且白",
        "웃을 때 치아가 드러나지 않고 희다는 동반 조건",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "富貴享榮華",
        "부귀영화와 연결한다."
      ]
    ]
  },
  {
    "key": "mouth.named.upturned_moon",
    "label": "仰月口",
    "text": "口如仰月上朝彎，齒白脣紅似抹丹。滿腹文章聲價美，竟能富貴列朝班。",
    "d": [
      [
        "mouth_whole",
        "口如仰月上朝彎",
        "위로 휜 초승달 같은 입으로 기술",
        "direct_clear"
      ],
      [
        "context",
        "齒白",
        "치아가 희다는 동반 조건",
        "direct_clear"
      ],
      [
        "lip_color",
        "脣紅似抹丹",
        "입술이 붉어 단사를 바른 듯하다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "learning_talent",
        "whole_life",
        "favorable",
        "滿腹文章",
        "글과 학문이 가득하다고 기술한다."
      ],
      [
        "reputation",
        "whole_life",
        "favorable",
        "聲價美",
        "평판이 좋다고 기술한다."
      ],
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "富貴列朝班",
        "부귀와 조정의 지위에 연결한다."
      ]
    ]
  },
  {
    "key": "mouth.named.curved_bow",
    "label": "彎弓口",
    "text": "口似彎弓乍上弦，兩脣豐厚若丹鮮。神清氣爽終為用，富貴終年福自然。",
    "d": [
      [
        "mouth_whole",
        "口似彎弓乍上弦",
        "시위를 막 건 활 같은 입으로 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "兩脣豐厚",
        "양 입술이 풍후하다고 기술",
        "direct_clear"
      ],
      [
        "lip_color",
        "若丹鮮",
        "선명한 단사색 같다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "favorable",
        "神清氣爽",
        "신기가 맑고 기운이 상쾌하다고 기술한다."
      ],
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "富貴終年",
        "부귀와 연결한다."
      ],
      [
        "traditional_auspice",
        "whole_life",
        "favorable",
        "福自然",
        "복이 자연히 따른다고 기술한다."
      ]
    ]
  },
  {
    "key": "mouth.named.ox",
    "label": "牛口",
    "text": "牛口雙脣厚且豐，平生衣祿更昌隆。濁中帶清心靈巧，富貴康寧福若松。",
    "d": [
      [
        "lips_pair",
        "雙脣厚且豐",
        "양 입술이 두껍고 풍성하다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "livelihood",
        "whole_life",
        "favorable",
        "平生衣祿更昌隆",
        "평생 의록이 성한다고 기술한다."
      ],
      [
        "learning_talent",
        "whole_life",
        "favorable",
        "心靈巧",
        "마음이 영리하고 재주가 있다고 기술한다."
      ],
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "traditional_health",
        "whole_life",
        "favorable",
        "康寧",
        "편안하고 평안하다는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.dragon",
    "label": "龍口",
    "text": "龍口兩脣豐且齊，光明口角更清奇。聚呼喝散權通變，玉帶圍腰世罕稀。",
    "d": [
      [
        "lips_pair",
        "兩脣豐且齊",
        "양 입술이 풍성하고 가지런하다고 기술",
        "direct_clear"
      ],
      [
        "mouth_corner",
        "光明口角",
        "입꼬리가 밝다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "status",
        "whole_life",
        "favorable",
        "玉帶圍腰世罕稀",
        "옥대를 두르는 높은 지위와 연결한다."
      ],
      [
        "temperament",
        "whole_life",
        "favorable",
        "權通變",
        "권변에 통한다는 전통 평가를 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.tiger",
    "label": "虎口",
    "text": "虎口闊大有收拾，須知此口必容拳。若然不貴且大富，積玉堆金樂自然。",
    "d": [
      [
        "mouth_whole",
        "闊大有收拾",
        "넓고 크면서 수렴된 형태로 기술",
        "direct_clear"
      ],
      [
        "mouth_whole",
        "必容拳",
        "주먹을 넣을 수 있을 만큼 크다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "wealth_status",
        "whole_life",
        "favorable",
        "不貴且大富",
        "귀하지 않더라도 크게 부유하다고 기술한다."
      ],
      [
        "wealth",
        "whole_life",
        "favorable",
        "積玉堆金",
        "재물이 크게 쌓인다고 기술한다."
      ],
      [
        "traditional_auspice",
        "whole_life",
        "favorable",
        "樂自然",
        "즐거움이 자연히 따른다고 기술한다."
      ]
    ]
  },
  {
    "key": "mouth.named.sheep",
    "label": "羊口",
    "text": "羊口無鬚長且尖，兩脣又薄得人嫌。口尖食物如狗樣，賤且貧而兇又邅。",
    "d": [
      [
        "context",
        "無鬚",
        "수염이 없다는 동반 조건",
        "direct_clear"
      ],
      [
        "mouth_whole",
        "長且尖",
        "입이 길고 뾰족하다고 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "兩脣又薄",
        "양 입술이 얇다고 기술",
        "direct_clear"
      ],
      [
        "mouth_whole",
        "口尖食物如狗樣",
        "뾰족한 입으로 먹는 모습을 개에 비유",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "status",
        "whole_life",
        "challenging",
        "賤",
        "낮은 지위와 연결한다."
      ],
      [
        "wealth",
        "whole_life",
        "challenging",
        "貧",
        "빈곤과 연결한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "兇又邅",
        "흉하고 막힘이 있다고 기술한다."
      ]
    ]
  },
  {
    "key": "mouth.named.pig",
    "label": "豬口",
    "text": "豬口上脣長粗闊，下脣尖小角涎流。誘人訕謗心奸險，落在途中半路休。",
    "d": [
      [
        "upper_lip",
        "上脣長粗闊",
        "윗입술이 길고 거칠며 넓다고 기술",
        "direct_clear"
      ],
      [
        "lower_lip",
        "下脣尖小",
        "아랫입술이 뾰족하고 작다고 기술",
        "direct_clear"
      ],
      [
        "mouth_corner",
        "角涎流",
        "입꼬리에서 침이 흐르는 모습으로 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "speech_conduct",
        "whole_life",
        "challenging",
        "誘人訕謗",
        "사람을 꾀어 비방한다고 기술한다."
      ],
      [
        "integrity_trust",
        "whole_life",
        "challenging",
        "心奸險",
        "마음이 간험하다는 전통 비난을 기록한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "落在途中半路休",
        "삶의 중도에 그친다는 극단적 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.blowing_fire",
    "label": "吹火口",
    "text": "口中吹火開不收，嘴尖衣食苦強求。生成此口多貧夭，廕下須教破且休。",
    "d": [
      [
        "mouth_whole",
        "開不收",
        "입이 열리고 잘 다물리지 않는다고 기술",
        "direct_clear"
      ],
      [
        "mouth_whole",
        "嘴尖",
        "입이 뾰족하다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "livelihood",
        "whole_life",
        "challenging",
        "衣食苦強求",
        "의식을 어렵게 구한다고 기술한다."
      ],
      [
        "wealth",
        "whole_life",
        "challenging",
        "多貧",
        "빈곤과 연결한다."
      ],
      [
        "longevity",
        "whole_life",
        "challenging",
        "夭",
        "불리한 수명 판단을 기록한다."
      ],
      [
        "inheritance",
        "whole_life",
        "challenging",
        "廕下須教破且休",
        "물려받은 기반의 파손과 연결하는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.wrinkled",
    "label": "皺紋口",
    "text": "脣上皺紋似哭顏，縱然有壽主孤單。早年安樂末年敗，若有一子屬幽關。",
    "d": [
      [
        "upper_lip",
        "脣上皺紋",
        "윗입술에 주름이 있다고 기술",
        "direct_clear"
      ],
      [
        "context",
        "似哭顏",
        "우는 얼굴 같은 동반 인상으로 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "interpersonal_relations",
        "whole_life",
        "challenging",
        "主孤單",
        "고독과 연결한다."
      ],
      [
        "life_course",
        "early",
        "favorable",
        "早年安樂",
        "초년의 안락을 기술한다."
      ],
      [
        "life_course",
        "late",
        "challenging",
        "末年敗",
        "말년의 쇠퇴를 기술한다."
      ],
      [
        "children_family",
        "whole_life",
        "challenging",
        "若有一子屬幽關",
        "자녀에 관한 불리한 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.cherry",
    "label": "櫻桃口",
    "text": "櫻桃口大脣胭脂，齒似榴牙密且宜。笑如含蓮情和暢，聰明拔萃紫袍衣。",
    "d": [
      [
        "mouth_whole",
        "口大",
        "입이 크다고 기술",
        "direct_clear"
      ],
      [
        "lip_color",
        "脣胭脂",
        "입술이 연지색이라고 기술",
        "direct_clear"
      ],
      [
        "context",
        "齒似榴牙密且宜",
        "치아가 석류알처럼 촘촘하다는 동반 조건",
        "direct_clear"
      ],
      [
        "context",
        "笑如含蓮",
        "웃는 모습이 연꽃을 머금은 듯하다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "favorable",
        "情和暢",
        "정서가 온화하고 화창하다고 기술한다."
      ],
      [
        "learning_talent",
        "whole_life",
        "favorable",
        "聰明拔萃",
        "총명하고 뛰어나다고 기술한다."
      ],
      [
        "status",
        "whole_life",
        "favorable",
        "紫袍衣",
        "높은 관직을 상징하는 자색 관복과 연결한다."
      ]
    ]
  },
  {
    "key": "mouth.named.monkey",
    "label": "猴口",
    "text": "猴口兩脣喜又長，人中破竹更為良。平生衣祿皆榮足，鶴算龜齡福壽康。",
    "d": [
      [
        "lips_pair",
        "兩脣喜又長",
        "양 입술이 길다고 기술",
        "direct_clear"
      ],
      [
        "context",
        "人中破竹更為良",
        "인중이 대나무를 가른 듯한 동반 조건을 좋게 본다고 기술",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "livelihood",
        "whole_life",
        "favorable",
        "平生衣祿皆榮足",
        "평생 의록이 풍족하다고 기술한다."
      ],
      [
        "longevity",
        "whole_life",
        "favorable",
        "鶴算龜齡",
        "학·거북에 비유한 장수 판단을 기록한다."
      ],
      [
        "traditional_auspice",
        "whole_life",
        "favorable",
        "福壽康",
        "복·수·평안을 기술한다."
      ]
    ]
  },
  {
    "key": "mouth.named.catfish",
    "label": "鯰魚口",
    "text": "鯰魚口闊角低尖，梟薄雙脣又欠圓。如此之人主貧賤，須臾一命喪黃泉。",
    "d": [
      [
        "mouth_whole",
        "口闊",
        "입이 넓다고 기술",
        "direct_clear"
      ],
      [
        "mouth_corner",
        "角低尖",
        "입꼬리가 낮고 뾰족하다고 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "梟薄雙脣又欠圓",
        "양 입술이 얇고 둥글지 않다고 기술",
        "phrase_uncertain"
      ]
    ],
    "c": [
      [
        "wealth_status",
        "whole_life",
        "challenging",
        "主貧賤",
        "빈곤과 낮은 지위에 연결한다."
      ],
      [
        "longevity",
        "whole_life",
        "challenging",
        "須臾一命喪黃泉",
        "극단적으로 불리한 수명 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "mouth.named.crucian_carp",
    "label": "鯽魚口",
    "text": "鯽魚口小主貧窮，一生衣食不豐隆，更兼氣濁神枯澀，破敗漂蓬運不通。",
    "d": [
      [
        "mouth_whole",
        "口小",
        "입이 작다고 기술",
        "direct_clear"
      ],
      [
        "context",
        "氣濁神枯澀",
        "기와 신이 탁하고 메마르다는 동반 전통 묘사",
        "direct_clear"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "challenging",
        "主貧窮",
        "빈곤과 연결한다."
      ],
      [
        "livelihood",
        "whole_life",
        "challenging",
        "一生衣食不豐隆",
        "평생 의식이 풍족하지 않다고 기술한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "破敗漂蓬運不通",
        "파패·표박·운의 막힘과 연결한다."
      ]
    ]
  },
  {
    "key": "mouth.named.overturned_boat",
    "label": "覆船口",
    "text": "口角渾如覆破船，兩脣牛肉色煙聯。人逢此口多為丐，一生貧苦不須言。",
    "d": [
      [
        "mouth_corner",
        "口角渾如覆破船",
        "입꼬리가 뒤집힌 배처럼 보인다고 기술",
        "direct_clear"
      ],
      [
        "lips_pair",
        "兩脣牛肉色煙聯",
        "양 입술의 형태·색을 비유적으로 기술한 전사 문구",
        "phrase_uncertain"
      ]
    ],
    "c": [
      [
        "livelihood",
        "whole_life",
        "challenging",
        "多為丐",
        "구걸과 연결하는 전통 판단을 기록한다."
      ],
      [
        "wealth",
        "whole_life",
        "challenging",
        "一生貧苦",
        "평생 빈곤과 고생을 기술한다."
      ]
    ]
  }
] as const;

export const MOUTH_NAMED_FORM_SEMANTICS_FR311I:
readonly MouthNamedFormSemanticRecordFR311I[] = Object.freeze(
  RAW_NAMED_FORMS.map((raw) => Object.freeze({
    formKey: raw.key,
    traditionalLabel: raw.label,
    sourceText: raw.text,
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed' as const,
    nlc1925DirectScanAdjudicated: false as const,
    descriptors: Object.freeze(raw.d.map(([region, sourceFragment, neutralGloss, certainty], index) => Object.freeze({
      descriptorId: `fr311i.${raw.key}.descriptor.${index + 1}`,
      region,
      sourceFragment,
      observationKind: classifyObservationKindFR311I(region, sourceFragment),
      neutralGloss,
      certainty,
      neutralGeometryBindingAuthorized: false as const,
    }))),
    claims: Object.freeze(raw.c.map(([topicKey, lifeStage, polarity, sourceFragment, meaningSummary], index) => Object.freeze({
      claimId: `fr311i.${raw.key}.claim.${index + 1}`,
      topicKey,
      lifeStage,
      polarity,
      sourceFragment,
      meaningSummary,
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      healthDiagnosisAuthorized: false as const,
      lifespanPredictionAuthorized: false as const,
      fertilityPredictionAuthorized: false as const,
      childSexPredictionAuthorized: false as const,
      personalityFactAuthorized: false as const,
      criminalityInferenceAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }))),
    namedFormToNeutralClassifierAuthorized: false as const,
  })),
);

export const FR311I_SEMANTIC_SUMMARY = Object.freeze({
  traditionalRegions: MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I.length,
  directRules: MOUTH_PHILTRUM_DIRECT_RULES_FR311I.length,
  philtrumDirectRules: MOUTH_PHILTRUM_DIRECT_RULES_FR311I.filter((item) => item.region === 'philtrum').length,
  mouthNamedForms: MOUTH_NAMED_FORM_SEMANTICS_FR311I.length,
  namedFormDescriptors: MOUTH_NAMED_FORM_SEMANTICS_FR311I.reduce((sum, item) => sum + item.descriptors.length, 0),
  namedFormClaims: MOUTH_NAMED_FORM_SEMANTICS_FR311I.reduce((sum, item) => sum + item.claims.length, 0),
});

export const FR311I_SOURCE_BOUNDARY = Object.freeze({
  mouthOfficerBaselineSourceRef: GUJIN_632,
  semanticSourceRef: GUJIN_634,
  neutralGeometryEqualsTraditionalRegion: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  colorMedicalInferenceAuthorized: false as const,
  markOrLineProductionInterpretationAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311i_duplicate:${path}`);
}

export function assertMouthPhiltrumTraditionalSemanticsFR311I(): void {
  if (MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I.length !== 6) {
    throw new Error('fr311i_requires_6_regions');
  }
  if (MOUTH_PHILTRUM_DIRECT_RULES_FR311I.length !== 104) {
    throw new Error(`fr311i_direct_rule_count_drift:${MOUTH_PHILTRUM_DIRECT_RULES_FR311I.length}`);
  }
  if (MOUTH_NAMED_FORM_SEMANTICS_FR311I.length !== 16) {
    throw new Error('fr311i_requires_16_mouth_named_forms');
  }
  if (FR311I_SEMANTIC_SUMMARY.namedFormDescriptors !== 43) {
    throw new Error(`fr311i_descriptor_count_drift:${FR311I_SEMANTIC_SUMMARY.namedFormDescriptors}`);
  }
  if (FR311I_SEMANTIC_SUMMARY.namedFormClaims !== 45) {
    throw new Error(`fr311i_claim_count_drift:${FR311I_SEMANTIC_SUMMARY.namedFormClaims}`);
  }

  assertUnique(MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I.map((item) => item.regionKey), 'region_key');
  assertUnique(MOUTH_PHILTRUM_DIRECT_RULES_FR311I.map((item) => item.ruleId), 'direct_rule');
  assertUnique(MOUTH_NAMED_FORM_SEMANTICS_FR311I.map((item) => item.formKey), 'named_form');
  assertUnique(
    MOUTH_NAMED_FORM_SEMANTICS_FR311I.flatMap((item) => item.descriptors.map((descriptor) => descriptor.descriptorId)),
    'descriptor_id',
  );
  assertUnique(
    MOUTH_NAMED_FORM_SEMANTICS_FR311I.flatMap((item) => item.claims.map((claim) => claim.claimId)),
    'claim_id',
  );

  for (const region of MOUTH_PHILTRUM_TRADITIONAL_REGIONS_FR311I) {
    if (region.neutralGeometryBindingAuthorized !== false) {
      throw new Error(`fr311i_region_binding_widening:${region.regionKey}`);
    }
  }

  for (const rule of MOUTH_PHILTRUM_DIRECT_RULES_FR311I) {
    if (rule.historicalTraditionalDoctrineOnly !== true ||
        rule.modernScientificFactAuthorized !== false ||
        rule.healthDiagnosisAuthorized !== false ||
        rule.lifespanPredictionAuthorized !== false ||
        rule.fertilityPredictionAuthorized !== false ||
        rule.childSexPredictionAuthorized !== false ||
        rule.personalityFactAuthorized !== false ||
        rule.criminalityInferenceAuthorized !== false ||
        rule.productInterpretationAuthorized !== false) {
      throw new Error(`fr311i_direct_rule_authority_drift:${rule.ruleId}`);
    }
  }

  for (const form of MOUTH_NAMED_FORM_SEMANTICS_FR311I) {
    if (form.namedFormToNeutralClassifierAuthorized !== false ||
        form.nlc1925DirectScanAdjudicated !== false) {
      throw new Error(`fr311i_named_form_authority_drift:${form.formKey}`);
    }
    for (const descriptor of form.descriptors) {
      if (!form.sourceText.includes(descriptor.sourceFragment)) {
        throw new Error(`fr311i_descriptor_source_drift:${descriptor.descriptorId}`);
      }
      if (descriptor.neutralGeometryBindingAuthorized !== false) {
        throw new Error(`fr311i_descriptor_binding_widening:${descriptor.descriptorId}`);
      }
    }
    for (const claim of form.claims) {
      if (!form.sourceText.includes(claim.sourceFragment)) {
        throw new Error(`fr311i_claim_source_drift:${claim.claimId}`);
      }
      if (claim.historicalTraditionalDoctrineOnly !== true ||
          claim.modernScientificFactAuthorized !== false ||
          claim.healthDiagnosisAuthorized !== false ||
          claim.lifespanPredictionAuthorized !== false ||
          claim.fertilityPredictionAuthorized !== false ||
          claim.childSexPredictionAuthorized !== false ||
          claim.personalityFactAuthorized !== false ||
          claim.criminalityInferenceAuthorized !== false ||
          claim.productInterpretationAuthorized !== false) {
        throw new Error(`fr311i_claim_authority_drift:${claim.claimId}`);
      }
    }
  }

  for (const [key, value] of Object.entries(FR311I_SOURCE_BOUNDARY)) {
    if (typeof value === 'boolean' && value !== false) {
      throw new Error(`fr311i_source_boundary_widening:${key}`);
    }
  }
}
