export type MouthPhiltrumCrossRegionAuditClassFR311K =
  | 'direct_cross_region_relation'
  | 'direct_cross_region_combination'
  | 'named_form_context'
  | 'descriptive_companion'
  | 'phrase_boundary_uncertain'
  | 'excluded_non_relation';

export type MouthPhiltrumCrossRegionPolarityFR311K =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type MouthPhiltrumAnchorFR311K = 'philtrum' | 'mouth' | 'lip';

export interface MouthPhiltrumCrossRegionParticipantFR311K {
  readonly region: string;
  readonly sourceLocalKey: string;
}

export interface MouthPhiltrumCrossRegionAuditCandidateFR311K {
  readonly candidateId: string;
  readonly sourceVolume: 631 | 632 | 633 | 634;
  readonly sourceSection: string;
  readonly sourceExpression: string;
  readonly anchors: readonly MouthPhiltrumAnchorFR311K[];
  readonly otherParticipants: readonly MouthPhiltrumCrossRegionParticipantFR311K[];
  readonly adjudication: MouthPhiltrumCrossRegionAuditClassFR311K;
  readonly decisionReason: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'wikisource_transcription_reviewed' | 'phrase_boundary_uncertain';
  readonly generalizationAuthorized: boolean;
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface MouthPhiltrumCrossRegionDirectEvidenceFR311K {
  readonly evidenceId: string;
  readonly candidateId: string;
  readonly evidenceKind: 'direct_cross_region_relation' | 'direct_cross_region_combination';
  readonly relationKey: string | null;
  readonly combinationKey: string | null;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly polarity: MouthPhiltrumCrossRegionPolarityFR311K | null;
  readonly lifeStage: string | null;
  readonly relationTarget: string | null;
  readonly sourceRefs: readonly string[];
  readonly generalizationAuthorized: true;
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly reinforcementAuthorized: false;
  readonly cancellationAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly namedFormClassifierAuthorized: false;
  readonly modernScientificFactAuthorized: false;
  readonly healthDiagnosisAuthorized: false;
  readonly lifespanPredictionAuthorized: false;
  readonly fertilityPredictionAuthorized: false;
  readonly childSexPredictionAuthorized: false;
  readonly personalityFactAuthorized: false;
  readonly criminalityInferenceAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const SOURCE_631 = 'witness.gujin473.art631.wikisource';
const SOURCE_632 = 'witness.gujin473.art632.wikisource';
const SOURCE_633 = 'witness.gujin473.art633.wikisource';
const SOURCE_634 = 'witness.gujin473.art634.wikisource';

function participant(region: string, sourceLocalKey: string): MouthPhiltrumCrossRegionParticipantFR311K {
  return Object.freeze({ region, sourceLocalKey });
}

function candidate(value: Omit<
  MouthPhiltrumCrossRegionAuditCandidateFR311K,
  | 'relationInferenceAuthorized'
  | 'combinationInferenceAuthorized'
  | 'neutralGeometryBindingAuthorized'
  | 'namedFormClassifierAuthorized'
  | 'modernScientificFactAuthorized'
  | 'healthDiagnosisAuthorized'
  | 'lifespanPredictionAuthorized'
  | 'fertilityPredictionAuthorized'
  | 'childSexPredictionAuthorized'
  | 'personalityFactAuthorized'
  | 'criminalityInferenceAuthorized'
  | 'productInterpretationAuthorized'
>): MouthPhiltrumCrossRegionAuditCandidateFR311K {
  return Object.freeze({
    ...value,
    anchors: Object.freeze([...value.anchors]),
    otherParticipants: Object.freeze([...value.otherParticipants]),
    sourceRefs: Object.freeze([...value.sourceRefs]),
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    criminalityInferenceAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K:
readonly MouthPhiltrumCrossRegionAuditCandidateFR311K[] = Object.freeze([
  candidate({
    candidateId: 'fr311k.audit.631.rich_intelligent_eye_mouth_lip',
    sourceVolume: 631,
    sourceSection: '相容貴賤',
    sourceExpression: '欲知富貴聰明，須得眼如點漆，口如四字，脣似硃紅',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('eye', '眼如點漆')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '눈·입·입술 조건을 함께 제시한 뒤 부귀·총명을 직접 귀속한다.',
    sourceRefs: [SOURCE_631],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.631.shape_surplus_lip_teeth_whole_face',
    sourceVolume: 631,
    sourceSection: '論形有餘',
    sourceExpression: '額闊四方，脣紅齒白，耳圓成輪，鼻直如膽，眼分黑白，眉秀疏長',
    anchors: ['lip'],
    otherParticipants: [
      participant('teeth', '齒白'),
      participant('ear', '耳圓成輪'),
      participant('nose', '鼻直如膽'),
      participant('eye', '眼分黑白'),
      participant('eyebrow', '眉秀疏長'),
      participant('forehead_traditional', '額闊四方'),
    ],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '다부위 조건 묶음을 形有餘로 규정하고 뒤이어 장수·부귀 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_631],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.632.five_officials_late_fortune',
    sourceVolume: 632,
    sourceSection: '達摩五官總論',
    sourceExpression: '眉緊鼻端平，耳須聳又明，海口仰弓形，晚運必通亨',
    anchors: ['mouth'],
    otherParticipants: [
      participant('eyebrow', '眉緊'),
      participant('nose', '鼻端平'),
      participant('ear', '耳須聳又明'),
    ],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '여러 관의 조건을 한 묶음으로 제시하고 말년 운의 통달을 직접 귀속한다.',
    sourceRefs: [SOURCE_632],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.632.water_star_favorable',
    sourceVolume: 632,
    sourceSection: '五星六曜訣斷詩',
    sourceExpression: '須要脣紅闊四角，人中深，口齒端正有文章，為官食祿',
    anchors: ['mouth', 'lip', 'philtrum'],
    otherParticipants: [participant('teeth', '口齒端正')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '입·입술·인중·치아 조건을 묶어 문장·관록·식록을 직접 귀속한다.',
    sourceRefs: [SOURCE_632],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.632.water_star_challenging',
    sourceVolume: 632,
    sourceSection: '五星六曜訣斷詩',
    sourceExpression: '若脣齒麤，口角垂黃色，主貧賤',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('teeth', '齒麤')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '입술·치아·입꼬리 조건 묶음에 빈천 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_632],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.middle_noble_composite',
    sourceVolume: 633,
    sourceSection: '中貴格',
    sourceExpression: '鬚如鐵線，耳白過面，眼如點漆，上長下短，口如四字，三十六牙，龍吞虎吻，此為中貴之相也',
    anchors: ['mouth'],
    otherParticipants: [
      participant('beard', '鬚如鐵線'),
      participant('ear', '耳白過面'),
      participant('eye', '眼如點漆'),
      participant('teeth', '三十六牙'),
    ],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '다부위 조건 묶음 전체를 中貴格로 직접 판정한다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.small_noble_composite',
    sourceVolume: 633,
    sourceSection: '小貴格',
    sourceExpression: '天庭高聳，地閣方圓，齒白而大，眉疏目秀，口如弓角，脣似珠紅，此為小貴之相也',
    anchors: ['mouth', 'lip'],
    otherParticipants: [
      participant('forehead_traditional', '天庭高聳'),
      participant('chin_lower_face', '地閣方圓'),
      participant('teeth', '齒白而大'),
      participant('eyebrow', '眉疏'),
      participant('eye', '目秀'),
    ],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '다부위 조건 묶음 전체를 小貴格로 직접 판정한다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.wealth_cheek_mouth_chin',
    sourceVolume: 633,
    sourceSection: '富相口訣',
    sourceExpression: '左右顴起，口方，而地閣方圓四維有朝拱者，主富之相',
    anchors: ['mouth'],
    otherParticipants: [
      participant('cheek_mid_face', '左右顴起'),
      participant('chin_lower_face', '地閣方圓'),
    ],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '관골·입·지각 조건을 함께 만족하는 경우 富相 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.philtrum_teeth_alignment',
    sourceVolume: 633,
    sourceSection: '壽相格',
    sourceExpression: '人中著齒而齊者，福壽',
    anchors: ['philtrum'],
    otherParticipants: [participant('teeth', '齒')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '인중과 치아의 맞닿음·정렬 관계 자체에 福壽 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.beard_not_past_lip',
    sourceVolume: 633,
    sourceSection: '面上十大空亡',
    sourceExpression: '鬚不過脣為一空',
    anchors: ['lip'],
    otherParticipants: [participant('beard', '鬚')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '수염이 입술을 넘지 않는 상대적 범위 관계를 空亡으로 직접 규정한다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.lip_no_beard_uncertain',
    sourceVolume: 633,
    sourceSection: '面上十大空亡',
    sourceExpression: '脣無，鬚為一空',
    anchors: ['lip'],
    otherParticipants: [participant('beard', '鬚')],
    adjudication: 'phrase_boundary_uncertain',
    decisionReason: '현 전사와 구두점만으로 脣無鬚인지 脣無/鬚인지 문장 경계를 확정하기 어렵다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'phrase_boundary_uncertain',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.swallow_eye_mouth_context',
    sourceVolume: 633,
    sourceSection: '燕眼',
    sourceExpression: '口小脣紅更擺頭，眼深黑白朗明收',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('eye', '眼深黑白朗明收')],
    adjudication: 'named_form_context',
    decisionReason: '燕眼 명명형 시구 내부의 동반 조건이며 일반적인 눈×입 공식으로 분리되지 않는다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.human_face_total',
    sourceVolume: 633,
    sourceSection: '人面總論',
    sourceExpression: '準頭齊圓人中正，口好四字承漿闊，地閣朝歸倉庫盈',
    anchors: ['philtrum', 'mouth'],
    otherParticipants: [
      participant('nose', '準頭齊圓'),
      participant('lower_face', '承漿闊'),
      participant('chin_lower_face', '地閣朝歸'),
    ],
    adjudication: 'descriptive_companion',
    decisionReason: '좋은 얼굴의 연속 열거이며 각 부위 사이의 독립 관계 또는 특정 결합 귀속을 분리할 수 없다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.four_reversals',
    sourceVolume: 633,
    sourceSection: '四反格',
    sourceExpression: '耳無輪，口無稜，鼻仰孔，目無神',
    anchors: ['mouth'],
    otherParticipants: [
      participant('ear', '耳無輪'),
      participant('nose', '鼻仰孔'),
      participant('eye', '目無神'),
    ],
    adjudication: 'descriptive_companion',
    decisionReason: '四反格의 구성항목 목록이지만 본문에서 이 네 조건의 결합 결과 의미를 별도로 기술하지 않는다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.633.drowning_parallel_rules',
    sourceVolume: 633,
    sourceSection: '溺水格',
    sourceExpression: '人中交紋，溺水招魂。眉間黑子，初年水厄之憂。口角黑靨，末防水厄',
    anchors: ['philtrum', 'mouth'],
    otherParticipants: [participant('eyebrow_yintang', '眉間黑子')],
    adjudication: 'excluded_non_relation',
    decisionReason: '같은 절에 놓인 독립 규칙들의 병렬 나열이며 人中·口角과 眉間 사이의 관계/조합 조건이 아니다.',
    sourceRefs: [SOURCE_633],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.earlobe_toward_mouth',
    sourceVolume: 634,
    sourceSection: '許負相耳篇',
    sourceExpression: '下有垂珠肉色光，更來朝口富榮昌',
    anchors: ['mouth'],
    otherParticipants: [participant('ear', '垂珠朝口')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '귓불이 입을 향하는 朝口 관계 자체에 부귀 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.mouth_open_teeth_exposed',
    sourceVolume: 634,
    sourceSection: '相口',
    sourceExpression: '口開齒露者無機',
    anchors: ['mouth'],
    otherParticipants: [participant('teeth', '齒露')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '입을 열었을 때 치아가 드러나는 관계 조건에 직접 의미를 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.mouth_open_teeth_out',
    sourceVolume: 634,
    sourceSection: '許負相口篇',
    sourceExpression: '口開齒出，當失算數。必不久長，少即身故',
    anchors: ['mouth'],
    otherParticipants: [participant('teeth', '齒出')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '입을 열었을 때 치아가 나오는 관계 조건에 불리한 수명 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.large_tongue_small_mouth_wealth_life',
    sourceVolume: 634,
    sourceSection: '相口',
    sourceExpression: '舌大口小，貧薄折夭',
    anchors: ['mouth'],
    otherParticipants: [participant('tongue', '舌大')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '큰 혀와 작은 입의 조합에 빈곤·불리한 수명 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.wide_mouth_thin_tongue',
    sourceVolume: 634,
    sourceSection: '許負相口篇',
    sourceExpression: '口寬舌薄，必好歌樂',
    anchors: ['mouth'],
    otherParticipants: [participant('tongue', '舌薄')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '넓은 입과 얇은 혀의 조합에 노래·음악 선호를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.long_lip_short_teeth',
    sourceVolume: 634,
    sourceSection: '論脣',
    sourceExpression: '長脣短齒，長命不死',
    anchors: ['lip'],
    otherParticipants: [participant('teeth', '短齒')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '긴 입술과 짧은 치아 조합에 장수 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.red_lip_white_teeth',
    sourceVolume: 634,
    sourceSection: '許負相齒篇',
    sourceExpression: '脣紅齒白文章士',
    anchors: ['lip'],
    otherParticipants: [participant('teeth', '齒白')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '붉은 입술과 흰 치아 조합에 문장가 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.tongue_licks_lip',
    sourceVolume: 634,
    sourceSection: '論舌',
    sourceExpression: '未言而舌餂脣者，多淫逸',
    anchors: ['lip'],
    otherParticipants: [participant('tongue', '舌餂脣')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '말하기 전 혀가 입술에 닿는 동적 관계 자체에 전통 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.tongue_fills_mouth',
    sourceVolume: 634,
    sourceSection: '論舌',
    sourceExpression: '舌艷而吐滿口者，至富',
    anchors: ['mouth'],
    otherParticipants: [participant('tongue', '吐滿口')],
    adjudication: 'direct_cross_region_relation',
    decisionReason: '혀가 입 안을 가득 채우는 상대 관계에 부의 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.large_tongue_small_mouth_speech',
    sourceVolume: 634,
    sourceSection: '許負相舌篇',
    sourceExpression: '舌大口小，言不了了',
    anchors: ['mouth'],
    otherParticipants: [participant('tongue', '舌大')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '큰 혀와 작은 입의 조합에 말이 분명하지 않다는 의미를 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.small_tongue_large_mouth_speech',
    sourceVolume: 634,
    sourceSection: '許負相舌篇',
    sourceExpression: '舌小口大，言語捷快',
    anchors: ['mouth'],
    otherParticipants: [participant('tongue', '舌小')],
    adjudication: 'direct_cross_region_combination',
    decisionReason: '작은 혀와 큰 입의 조합에 빠른 언어 표현을 직접 귀속한다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: true,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.hawk_nose_lip',
    sourceVolume: 634,
    sourceSection: '鷹嘴鼻',
    sourceExpression: '又如鷹嘴鎖脣邊',
    anchors: ['lip'],
    otherParticipants: [participant('nose', '鷹嘴鼻')],
    adjudication: 'named_form_context',
    decisionReason: '鷹嘴鼻 명명형 내부 형태 문맥이며 이미 FR311H에서도 일반 코×입 공식으로 승격하지 않았다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.orangutan_nose_lip',
    sourceVolume: 634,
    sourceSection: '猩鼻',
    sourceExpression: '面闊脣掀身廣厚',
    anchors: ['lip'],
    otherParticipants: [
      participant('nose_named_form', '猩鼻'),
      participant('face', '面闊'),
      participant('body', '身廣厚'),
    ],
    adjudication: 'named_form_context',
    decisionReason: '猩鼻 명명형 원문 내부의 묶음 문맥이며 입술 단독/코×입 관계식으로 분리하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.ape_nose_mouth',
    sourceVolume: 634,
    sourceSection: '猿鼻',
    sourceExpression: '鼻竅小而口頗尖',
    anchors: ['mouth'],
    otherParticipants: [participant('nose_named_form', '猿鼻')],
    adjudication: 'named_form_context',
    decisionReason: '猿鼻 명명형 구성 문구로서 일반적인 鼻孔×口 관계 의미를 분리하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.square_mouth_teeth',
    sourceVolume: 634,
    sourceSection: '方口',
    sourceExpression: '方口齊脣不露牙，脣紅光潤似硃砂，笑而不露齒且白',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('teeth', '不露牙 / 齒白')],
    adjudication: 'named_form_context',
    decisionReason: '方口 명명형의 구성 조건이며 독립적인 입×치아 공식으로 일반화하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.upturned_moon_teeth',
    sourceVolume: 634,
    sourceSection: '仰月口',
    sourceExpression: '口如仰月上朝彎，齒白脣紅似抹丹',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('teeth', '齒白')],
    adjudication: 'named_form_context',
    decisionReason: '仰月口 명명형 내부의 치아·입술 동반 조건이다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.cherry_mouth_teeth',
    sourceVolume: 634,
    sourceSection: '櫻桃口',
    sourceExpression: '櫻桃口大脣胭脂，齒似榴牙密且宜',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('teeth', '齒似榴牙密且宜')],
    adjudication: 'named_form_context',
    decisionReason: '櫻桃口 명명형 내부의 치아 동반 조건이며 독립 조합식으로 승격하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.monkey_mouth_philtrum',
    sourceVolume: 634,
    sourceSection: '猴口',
    sourceExpression: '猴口兩脣喜又長，人中破竹更為良',
    anchors: ['mouth', 'lip', 'philtrum'],
    otherParticipants: [],
    adjudication: 'named_form_context',
    decisionReason: '人中破竹은 猴口 명명형 내부의 보조 조건이며 일반 口×人中 의미 공식으로 분리되지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.sheep_mouth_beard',
    sourceVolume: 634,
    sourceSection: '羊口',
    sourceExpression: '羊口無鬚長且尖',
    anchors: ['mouth'],
    otherParticipants: [participant('beard', '無鬚')],
    adjudication: 'named_form_context',
    decisionReason: '羊口 명명형 내부의 수염 조건이며 일반 입×수염 관계식으로 승격하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
  candidate({
    candidateId: 'fr311k.audit.634.lip_mouth_tongue_metaphor',
    sourceVolume: 634,
    sourceSection: '相口',
    sourceExpression: '脣為口舌之城郭，舌為口之鋒刃',
    anchors: ['mouth', 'lip'],
    otherParticipants: [participant('tongue', '舌')],
    adjudication: 'descriptive_companion',
    decisionReason: '부위 역할을 비유적으로 설명하지만 특정 관계 조건에 독립 의미를 귀속하지 않는다.',
    sourceRefs: [SOURCE_634],
    verificationState: 'wikisource_transcription_reviewed',
    generalizationAuthorized: false,
  }),
]);

function audit(candidateId: string): MouthPhiltrumCrossRegionAuditCandidateFR311K {
  const item = MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.find((candidate) => candidate.candidateId === candidateId);
  if (item === undefined) throw new Error('fr311k_missing_audit_candidate:' + candidateId);
  return item;
}

function directEvidence(value: Omit<
  MouthPhiltrumCrossRegionDirectEvidenceFR311K,
  | 'sourceExpression'
  | 'sourceRefs'
  | 'generalizationAuthorized'
  | 'relationInferenceAuthorized'
  | 'combinationInferenceAuthorized'
  | 'reinforcementAuthorized'
  | 'cancellationAuthorized'
  | 'neutralGeometryBindingAuthorized'
  | 'namedFormClassifierAuthorized'
  | 'modernScientificFactAuthorized'
  | 'healthDiagnosisAuthorized'
  | 'lifespanPredictionAuthorized'
  | 'fertilityPredictionAuthorized'
  | 'childSexPredictionAuthorized'
  | 'personalityFactAuthorized'
  | 'criminalityInferenceAuthorized'
  | 'productInterpretationAuthorized'
>): MouthPhiltrumCrossRegionDirectEvidenceFR311K {
  const source = audit(value.candidateId);
  if (source.adjudication !== value.evidenceKind || source.generalizationAuthorized !== true) {
    throw new Error('fr311k_direct_evidence_without_authorized_audit:' + value.candidateId);
  }
  return Object.freeze({
    ...value,
    sourceExpression: source.sourceExpression,
    sourceRefs: Object.freeze([...source.sourceRefs]),
    topicKeys: Object.freeze([...value.topicKeys]),
    generalizationAuthorized: true as const,
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    reinforcementAuthorized: false as const,
    cancellationAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    namedFormClassifierAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
    healthDiagnosisAuthorized: false as const,
    lifespanPredictionAuthorized: false as const,
    fertilityPredictionAuthorized: false as const,
    childSexPredictionAuthorized: false as const,
    personalityFactAuthorized: false as const,
    criminalityInferenceAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

export const MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K:
readonly MouthPhiltrumCrossRegionDirectEvidenceFR311K[] = Object.freeze([
  directEvidence({
    evidenceId: 'fr311k.relation.philtrum_teeth_aligned',
    candidateId: 'fr311k.audit.633.philtrum_teeth_alignment',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'philtrum_teeth.aligned_reaching',
    combinationKey: null,
    meaningSummary: '인중과 치아가 맞닿아 가지런한 관계를 福壽와 연결하는 전통 주장이다.',
    topicKeys: ['longevity', 'traditional_auspice'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.beard_not_past_lip',
    candidateId: 'fr311k.audit.633.beard_not_past_lip',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'beard_lip.beard_not_past_lip',
    combinationKey: null,
    meaningSummary: '수염이 입술을 넘지 않는 관계를 재물·후손·관계의 불리함과 연결하는 전통 주장이다.',
    topicKeys: ['wealth', 'children_family', 'interpersonal_relations'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: 'children',
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.earlobe_toward_mouth',
    candidateId: 'fr311k.audit.634.earlobe_toward_mouth',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'ear_mouth.earlobe_toward_mouth',
    combinationKey: null,
    meaningSummary: '귓불이 입을 향하는 관계를 부귀와 연결하는 전통 주장이다.',
    topicKeys: ['wealth', 'status'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.mouth_open_teeth_exposed_no_mechanism',
    candidateId: 'fr311k.audit.634.mouth_open_teeth_exposed',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'mouth_teeth.open_exposed',
    combinationKey: null,
    meaningSummary: '입을 열었을 때 치아가 드러나는 관계를 불리한 행실 판단과 연결하는 전통 문구다.',
    topicKeys: ['conduct_risk'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.mouth_open_teeth_exposed_short_life',
    candidateId: 'fr311k.audit.634.mouth_open_teeth_out',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'mouth_teeth.open_exposed',
    combinationKey: null,
    meaningSummary: '입을 열었을 때 치아가 드러나는 관계를 불리한 수명 판단과 연결하는 전통 문구다.',
    topicKeys: ['longevity'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.tongue_licks_lip_before_speech',
    candidateId: 'fr311k.audit.634.tongue_licks_lip',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'tongue_lip.licks_before_speech',
    combinationKey: null,
    meaningSummary: '말하기 전 혀가 입술에 닿는 행동 관계에 행실 관련 전통 판단을 붙인다.',
    topicKeys: ['conduct_risk'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.relation.tongue_fills_mouth',
    candidateId: 'fr311k.audit.634.tongue_fills_mouth',
    evidenceKind: 'direct_cross_region_relation',
    relationKey: 'tongue_mouth.fills_mouth',
    combinationKey: null,
    meaningSummary: '혀가 입 안을 가득 채우는 관계를 부에 유리한 전통 판단과 연결한다.',
    topicKeys: ['wealth'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.rich_intelligent_eye_mouth_lip',
    candidateId: 'fr311k.audit.631.rich_intelligent_eye_mouth_lip',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'whole_face.eye_mouth_lip_rich_intelligent',
    meaningSummary: '검은 눈·사자형 입·붉은 입술 묶음을 부귀·총명과 연결하는 전통 조합이다.',
    topicKeys: ['wealth', 'learning_talent'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.shape_surplus_lip_teeth_whole_face',
    candidateId: 'fr311k.audit.631.shape_surplus_lip_teeth_whole_face',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'whole_face.shape_surplus_with_red_lip_white_teeth',
    meaningSummary: '입술·치아를 포함한 다부위 形有餘 묶음을 장수·부귀와 연결하는 전통 조합이다.',
    topicKeys: ['longevity', 'wealth'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.five_officials_late_fortune',
    candidateId: 'fr311k.audit.632.five_officials_late_fortune',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'five_officials.brow_nose_ear_mouth_late_fortune',
    meaningSummary: '눈썹·코·귀·입의 지정 조건 묶음을 말년의 통달과 연결하는 전통 조합이다.',
    topicKeys: ['life_course'],
    polarity: 'favorable',
    lifeStage: 'late',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.water_star_favorable',
    candidateId: 'fr311k.audit.632.water_star_favorable',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'water_star.lip_philtrum_mouth_teeth_favorable',
    meaningSummary: '붉은 입술·깊은 인중·단정한 입과 치아 조합을 문장·관록·식록과 연결한다.',
    topicKeys: ['learning_talent', 'livelihood'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.water_star_challenging',
    candidateId: 'fr311k.audit.632.water_star_challenging',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'water_star.coarse_lip_teeth_drooping_mouth',
    meaningSummary: '거친 입술·치아와 처진 입꼬리 묶음을 빈천과 연결하는 전통 조합이다.',
    topicKeys: ['wealth'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.middle_noble',
    candidateId: 'fr311k.audit.633.middle_noble_composite',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'whole_face.middle_noble_composite',
    meaningSummary: '수염·귀·눈·입·치아 등의 조건 묶음을 中貴格로 규정한다.',
    topicKeys: ['status'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.small_noble',
    candidateId: 'fr311k.audit.633.small_noble_composite',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'whole_face.small_noble_composite',
    meaningSummary: '천정·지각·치아·눈썹·눈·입·입술 조건 묶음을 小貴格로 규정한다.',
    topicKeys: ['status'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.wealth_cheek_mouth_chin',
    candidateId: 'fr311k.audit.633.wealth_cheek_mouth_chin',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'cheek_mouth_chin.wealth',
    meaningSummary: '관골·방정한 입·방원한 지각의 조합을 富相과 연결한다.',
    topicKeys: ['wealth'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.large_tongue_small_mouth_wealth_life',
    candidateId: 'fr311k.audit.634.large_tongue_small_mouth_wealth_life',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'mouth_tongue.large_tongue_small_mouth',
    meaningSummary: '큰 혀와 작은 입 조합을 빈곤·불리한 수명과 연결한다.',
    topicKeys: ['wealth', 'longevity'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.wide_mouth_thin_tongue',
    candidateId: 'fr311k.audit.634.wide_mouth_thin_tongue',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'mouth_tongue.wide_mouth_thin_tongue',
    meaningSummary: '넓은 입과 얇은 혀 조합을 노래·음악 선호와 연결한다.',
    topicKeys: ['temperament'],
    polarity: 'neutral',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.long_lip_short_teeth',
    candidateId: 'fr311k.audit.634.long_lip_short_teeth',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'lip_teeth.long_lip_short_teeth',
    meaningSummary: '긴 입술과 짧은 치아 조합을 장수와 연결한다.',
    topicKeys: ['longevity'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.red_lip_white_teeth',
    candidateId: 'fr311k.audit.634.red_lip_white_teeth',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'lip_teeth.red_lip_white_teeth',
    meaningSummary: '붉은 입술과 흰 치아 조합을 문장가와 연결한다.',
    topicKeys: ['learning_talent'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.large_tongue_small_mouth_speech',
    candidateId: 'fr311k.audit.634.large_tongue_small_mouth_speech',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'mouth_tongue.large_tongue_small_mouth',
    meaningSummary: '큰 혀와 작은 입 조합을 불분명한 말과 연결한다.',
    topicKeys: ['speech_conduct'],
    polarity: 'challenging',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
  directEvidence({
    evidenceId: 'fr311k.combination.small_tongue_large_mouth_speech',
    candidateId: 'fr311k.audit.634.small_tongue_large_mouth_speech',
    evidenceKind: 'direct_cross_region_combination',
    relationKey: null,
    combinationKey: 'mouth_tongue.small_tongue_large_mouth',
    meaningSummary: '작은 혀와 큰 입 조합을 빠른 언어 표현과 연결한다.',
    topicKeys: ['speech_conduct'],
    polarity: 'favorable',
    lifeStage: 'whole_life',
    relationTarget: null,
  }),
]);

export interface MouthPhiltrumCrossRegionResolutionQueryFR311K {
  readonly relationKeys?: readonly string[];
  readonly combinationKeys?: readonly string[];
  readonly allowedTopicKeys?: readonly string[];
}

export interface MouthPhiltrumCrossRegionResolutionResultFR311K {
  readonly status: 'direct_source_combination' | 'direct_source_relation' | 'unsupported';
  readonly matchedEvidenceIds: readonly string[];
  readonly matchedRelationKeys: readonly string[];
  readonly matchedCombinationKeys: readonly string[];
  readonly semanticCombinationAuthorized: false;
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly reason: string;
}

function topicAllowed(
  topics: readonly string[],
  allowed: readonly string[] | undefined,
): boolean {
  if (allowed === undefined) return true;
  return topics.some((topic) => allowed.includes(topic));
}

export function resolveMouthPhiltrumCrossRegionEvidenceFR311K(
  query: MouthPhiltrumCrossRegionResolutionQueryFR311K,
): MouthPhiltrumCrossRegionResolutionResultFR311K {
  const relationSet = new Set(query.relationKeys ?? []);
  const combinationSet = new Set(query.combinationKeys ?? []);

  const combinations = MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.filter(
    (item) =>
      item.evidenceKind === 'direct_cross_region_combination' &&
      item.combinationKey !== null &&
      combinationSet.has(item.combinationKey) &&
      topicAllowed(item.topicKeys, query.allowedTopicKeys),
  );
  const relations = MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.filter(
    (item) =>
      item.evidenceKind === 'direct_cross_region_relation' &&
      item.relationKey !== null &&
      relationSet.has(item.relationKey) &&
      topicAllowed(item.topicKeys, query.allowedTopicKeys),
  );

  if (combinations.length > 0 || relations.length > 0) {
    const status = combinations.length > 0
      ? 'direct_source_combination' as const
      : 'direct_source_relation' as const;

    return Object.freeze({
      status,
      matchedEvidenceIds: Object.freeze([
        ...combinations.map((item) => item.evidenceId),
        ...relations.map((item) => item.evidenceId),
      ]),
      matchedRelationKeys: Object.freeze([...new Set(relations.flatMap((item) =>
        item.relationKey === null ? [] : [item.relationKey]
      ))]),
      matchedCombinationKeys: Object.freeze([...new Set(combinations.flatMap((item) =>
        item.combinationKey === null ? [] : [item.combinationKey]
      ))]),
      semanticCombinationAuthorized: false as const,
      relationInferenceAuthorized: false as const,
      combinationInferenceAuthorized: false as const,
      reason: combinations.length > 0
        ? '원문이 명시한 정확한 조합·관계 key만 함께 반환한다. 상태는 직접 조합을 우선 표시하지만 관계 근거를 버리거나 독립 특징에서 새 key를 추론하지 않는다.'
        : '원문이 명시한 정확한 부위 관계 key가 입력된 경우에만 해당 근거를 반환한다. 독립 특징들로부터 관계 key를 자동 추론하지 않는다.',
    });
  }

  return Object.freeze({
    status: 'unsupported' as const,
    matchedEvidenceIds: Object.freeze([]),
    matchedRelationKeys: Object.freeze([]),
    matchedCombinationKeys: Object.freeze([]),
    semanticCombinationAuthorized: false as const,
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    reason: '현재 FR311K 감사에서 승인된 직접 관계·조합 key가 없다. 명명형 문맥·동반 묘사·불확실 후보로 새 의미를 만들지 않는다.',
  });
}

const AUDIT_COUNTS = Object.freeze({
  directRelations: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'direct_cross_region_relation'
  ).length,
  directCombinations: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'direct_cross_region_combination'
  ).length,
  namedFormContexts: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'named_form_context'
  ).length,
  descriptiveCompanions: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'descriptive_companion'
  ).length,
  uncertain: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'phrase_boundary_uncertain'
  ).length,
  excluded: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
    (item) => item.adjudication === 'excluded_non_relation'
  ).length,
});

export const FR311K_CROSS_REGION_SUMMARY = Object.freeze({
  corpusVolumes: Object.freeze([631, 632, 633, 634] as const),
  auditCandidates: MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.length,
  ...AUDIT_COUNTS,
  directEvidenceRecords: MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.length,
  uniqueRelationKeys: new Set(
    MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.flatMap((item) =>
      item.relationKey === null ? [] : [item.relationKey]
    )
  ).size,
  uniqueCombinationKeys: new Set(
    MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.flatMap((item) =>
      item.combinationKey === null ? [] : [item.combinationKey]
    )
  ).size,
});

export const FR311K_AUTHORITY_BOUNDARY = Object.freeze({
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  contextSemanticPromotionAuthorized: false as const,
  scoreAuthorized: false as const,
  reinforcementAuthorized: false as const,
  cancellationAuthorized: false as const,
  sourcePriorityInferenceAuthorized: false as const,
  neutralGeometryBindingAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  healthDiagnosisAuthorized: false as const,
  lifespanPredictionAuthorized: false as const,
  fertilityPredictionAuthorized: false as const,
  childSexPredictionAuthorized: false as const,
  personalityFactAuthorized: false as const,
  criminalityInferenceAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) {
    throw new Error('fr311k_duplicate:' + path);
  }
}

export function assertMouthPhiltrumCrossRegionEvidenceFR311K(): void {
  assertUnique(MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.map((item) => item.candidateId), 'candidate');
  assertUnique(MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.map((item) => item.evidenceId), 'evidence');

  for (const candidate of MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K) {
    const shouldGeneralize =
      candidate.adjudication === 'direct_cross_region_relation' ||
      candidate.adjudication === 'direct_cross_region_combination';
    if (candidate.generalizationAuthorized !== shouldGeneralize) {
      throw new Error('fr311k_audit_generalization_drift:' + candidate.candidateId);
    }
    if (candidate.relationInferenceAuthorized !== false ||
        candidate.combinationInferenceAuthorized !== false ||
        candidate.neutralGeometryBindingAuthorized !== false ||
        candidate.namedFormClassifierAuthorized !== false ||
        candidate.modernScientificFactAuthorized !== false ||
        candidate.healthDiagnosisAuthorized !== false ||
        candidate.lifespanPredictionAuthorized !== false ||
        candidate.fertilityPredictionAuthorized !== false ||
        candidate.childSexPredictionAuthorized !== false ||
        candidate.personalityFactAuthorized !== false ||
        candidate.criminalityInferenceAuthorized !== false ||
        candidate.productInterpretationAuthorized !== false) {
      throw new Error('fr311k_audit_authority_widening:' + candidate.candidateId);
    }
  }

  for (const evidence of MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K) {
    const source = audit(evidence.candidateId);
    if (source.adjudication !== evidence.evidenceKind ||
        evidence.generalizationAuthorized !== true ||
        evidence.relationInferenceAuthorized !== false ||
        evidence.combinationInferenceAuthorized !== false ||
        evidence.reinforcementAuthorized !== false ||
        evidence.cancellationAuthorized !== false ||
        evidence.neutralGeometryBindingAuthorized !== false ||
        evidence.namedFormClassifierAuthorized !== false ||
        evidence.modernScientificFactAuthorized !== false ||
        evidence.healthDiagnosisAuthorized !== false ||
        evidence.lifespanPredictionAuthorized !== false ||
        evidence.fertilityPredictionAuthorized !== false ||
        evidence.childSexPredictionAuthorized !== false ||
        evidence.personalityFactAuthorized !== false ||
        evidence.criminalityInferenceAuthorized !== false ||
        evidence.productInterpretationAuthorized !== false) {
      throw new Error('fr311k_direct_authority_drift:' + evidence.evidenceId);
    }
  }

  for (const [key, value] of Object.entries(FR311K_AUTHORITY_BOUNDARY)) {
    if (value !== false) throw new Error('fr311k_authority_boundary_widening:' + key);
  }
}
