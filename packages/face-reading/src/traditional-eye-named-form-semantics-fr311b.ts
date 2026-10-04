import { TRADITIONAL_NAMED_FORMS_FR311 } from './traditional-eyebrow-eye-interpretation-fr311.js';

export type EyeSemanticTopicFR311B =
  | 'temperament'
  | 'intelligence'
  | 'ability'
  | 'integrity_trust'
  | 'conduct_risk'
  | 'wealth'
  | 'status'
  | 'career_reputation'
  | 'reputation'
  | 'siblings'
  | 'parents'
  | 'spouse_relationship'
  | 'children_family'
  | 'interpersonal_relations'
  | 'patron_support'
  | 'longevity'
  | 'longevity_mortality'
  | 'legal_penalty'
  | 'traditional_auspice'
  | 'sexuality'
  | 'life_course'
  | 'labor_livelihood'
  | 'filial_support';

export type EyeRelationTargetFR311B =
  | 'none'
  | 'parents'
  | 'siblings'
  | 'spouse'
  | 'children'
  | 'descendants'
  | 'patron';

export type EyeLifeStageFR311B =
  | 'unspecified'
  | 'early'
  | 'middle'
  | 'late'
  | 'later'
  | 'middle_late'
  | 'whole_life';

export type EyeTraditionalPolarityFR311B =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type EyeClaimCertaintyFR311B =
  | 'direct_clear'
  | 'phrase_uncertain';

export interface EyeFormDescriptorFR311B {
  readonly descriptorId: string;
  readonly origin: 'eye' | 'context';
  readonly sourceFragment: string;
  readonly neutralGloss: string;
  readonly neutralMorphologyBindingAuthorized: false;
}

export interface EyeMeaningClaimFR311B {
  readonly claimId: string;
  readonly topicKey: EyeSemanticTopicFR311B;
  readonly relationTarget: EyeRelationTargetFR311B;
  readonly lifeStage: EyeLifeStageFR311B;
  readonly polarity: EyeTraditionalPolarityFR311B;
  readonly certainty: EyeClaimCertaintyFR311B;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EyeNamedFormSemanticRecordFR311B {
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly sourceText: string;
  readonly sourceLocator: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin633_transcription_reviewed';
  readonly transcriptionState: 'reviewed_clear' | 'reviewed_with_uncertainty';
  readonly nlc1925DirectScanAdjudicated: false;
  readonly descriptors: readonly EyeFormDescriptorFR311B[];
  readonly claims: readonly EyeMeaningClaimFR311B[];
  readonly namedFormToNeutralClassifierAuthorized: false;
}

const GUJIN_633 =
  'https://zh.wikisource.org/zh-hant/%E6%AC%BD%E5%AE%9A%E5%8F%A4%E4%BB%8A%E5%9C%96%E6%9B%B8%E9%9B%86%E6%88%90/%E5%8D%9A%E7%89%A9%E5%BD%99%E7%B7%A8/%E8%97%9D%E8%A1%93%E5%85%B8/%E7%AC%AC633%E5%8D%B7';

const SOURCE_REFS = Object.freeze([
  'work.shenxiang_quanbian',
  'witness.gujin473.art633.wikisource',
  'witness.shenxiang_quanbian.nlc_1925',
] as const);

const RAW_FORMS = [
  {
    "key": "eye.named.dragon",
    "label": "龍眼",
    "state": "reviewed_clear",
    "text": "黑白分明精神彩，波長眼大氣神藏。如此富貴非小可，竟能受祿輔明皇。",
    "d": [
      [
        "eye",
        "黑白分明",
        "흑백이 분명하다고 기술"
      ],
      [
        "eye",
        "波長",
        "눈의 물결·가로 길이가 길다고 기술"
      ],
      [
        "eye",
        "眼大",
        "눈이 크다고 기술"
      ],
      [
        "eye",
        "氣神藏",
        "기운과 신이 안에 머문다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴非小可",
        "큰 부귀와 연결한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "受祿",
        "녹을 받는 신분과 연결한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "輔明皇",
        "군주를 보좌하는 지위와 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.phoenix",
    "label": "鳳眼",
    "state": "reviewed_clear",
    "text": "鳳眼波長貴自成，影光秀氣又神清。聰明智慧功名遂，拔萃超群壓眾英。",
    "d": [
      [
        "eye",
        "波長",
        "눈이 길다고 기술"
      ],
      [
        "eye",
        "影光秀氣",
        "빛과 수려한 기운을 기술"
      ],
      [
        "eye",
        "神清",
        "신이 맑다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "貴自成",
        "귀함과 연결한다."
      ],
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "聰明智慧",
        "총명과 지혜를 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "功名遂",
        "공명 성취와 연결한다."
      ],
      [
        "reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "拔萃超群壓眾英",
        "무리에서 뛰어남을 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.monkey",
    "label": "猴眼",
    "state": "reviewed_clear",
    "text": "黑睛昂上波紋矗。轉動機關亦有宜。此相若全真富貴。好餐果品坐頭低。",
    "d": [
      [
        "eye",
        "黑睛昂上",
        "검은 눈동자가 위로 올라간다고 기술"
      ],
      [
        "eye",
        "波紋矗",
        "눈 주위 물결무늬가 솟는다고 기술"
      ],
      [
        "eye",
        "轉動",
        "눈의 움직임을 기술"
      ],
      [
        "context",
        "坐頭低",
        "앉을 때 머리가 낮다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "conditional",
        "direct_clear",
        "此相若全真富貴",
        "조건이 온전히 맞으면 부귀와 연결한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "neutral",
        "phrase_uncertain",
        "轉動機關亦有宜",
        "기민한 움직임을 긍정적으로 언급하나 정확한 현대 의미는 확정하지 않는다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "neutral",
        "direct_clear",
        "好餐果品",
        "과실류를 즐긴다는 생활 습관 묘사를 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.elephant",
    "label": "象眼",
    "state": "reviewed_clear",
    "text": "上下波紋秀氣多，波長眼細亦仁和。及時富貴皆為妙，遐筭清平樂且歌。",
    "d": [
      [
        "eye",
        "上下波紋秀氣多",
        "상하 눈주름과 수려한 기운을 기술"
      ],
      [
        "eye",
        "波長",
        "눈이 길다고 기술"
      ],
      [
        "eye",
        "眼細",
        "눈이 가늘다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "仁和",
        "인하고 온화한 성정과 연결한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "遐筭",
        "장수와 연결한다."
      ],
      [
        "life_course",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "清平樂且歌",
        "평안한 삶으로 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.turtle",
    "label": "龜眼",
    "state": "reviewed_clear",
    "text": "龜眼睛圓藏秀氣，數條上有細紋波，康寧福壽豐衣足，悠遠綿綿及子孫。",
    "d": [
      [
        "eye",
        "睛圓",
        "눈동자가 둥글다고 기술"
      ],
      [
        "eye",
        "藏秀氣",
        "수려한 기운이 감춰져 있다고 기술"
      ],
      [
        "eye",
        "數條上有細紋波",
        "위쪽에 여러 가는 주름이 있다고 기술"
      ]
    ],
    "c": [
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "康寧福壽",
        "건강·복·수명을 좋게 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "豐衣足",
        "생활 물자가 풍족하다고 기술한다."
      ],
      [
        "children_family",
        "descendants",
        "later",
        "favorable",
        "direct_clear",
        "悠遠綿綿及子孫",
        "후손까지 이어지는 복을 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.magpie",
    "label": "鵲眼",
    "state": "reviewed_clear",
    "text": "上有如紋秀且長，平生信實有忠良。少年發達如平淡，終末之時更吉昌。",
    "d": [
      [
        "eye",
        "上有如紋",
        "위쪽에 무늬가 있다고 기술"
      ],
      [
        "eye",
        "秀且長",
        "수려하고 길다고 기술"
      ]
    ],
    "c": [
      [
        "integrity_trust",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "平生信實有忠良",
        "신실함과 충량함을 기술한다."
      ],
      [
        "life_course",
        "none",
        "early",
        "neutral",
        "direct_clear",
        "少年發達如平淡",
        "초년의 발달은 평담하다고 기술한다."
      ],
      [
        "life_course",
        "none",
        "late",
        "favorable",
        "direct_clear",
        "終末之時更吉昌",
        "말년이 더 길창하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.lion",
    "label": "獅眼",
    "state": "reviewed_clear",
    "text": "眼大威嚴性略狂，粗眉趁此又端莊。不貪不酷施仁政，富貴榮華福壽康。",
    "d": [
      [
        "eye",
        "眼大",
        "눈이 크다고 기술"
      ],
      [
        "eye",
        "威嚴",
        "위엄 있는 눈으로 기술"
      ],
      [
        "context",
        "粗眉",
        "거친 눈썹을 동반 조건으로 언급"
      ],
      [
        "context",
        "端莊",
        "전체 인상이 단정하다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "性略狂",
        "성정이 다소 거칠거나 호방하다고 기술한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "不貪不酷",
        "탐욕스럽거나 혹독하지 않다고 기술한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "施仁政",
        "어진 정치를 베푸는 역할과 연결한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴榮華",
        "부귀영화와 연결한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "福壽康",
        "복·수명·건강을 좋게 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.tiger",
    "label": "虎眼",
    "state": "reviewed_clear",
    "text": "眼大睛黃淡金色，瞳人或短有時長，性剛沉重而無患，富貴終年子有傷。",
    "d": [
      [
        "eye",
        "眼大",
        "눈이 크다고 기술"
      ],
      [
        "eye",
        "睛黃淡金色",
        "눈동자 색을 옅은 금빛으로 기술"
      ],
      [
        "eye",
        "瞳人或短有時長",
        "동공·눈동자 모양이 때로 짧고 길다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "性剛沉重",
        "강하고 무거운 성정으로 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴終年",
        "평생 부귀와 연결한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "challenging",
        "direct_clear",
        "子有傷",
        "자녀 관련 손상을 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.ox",
    "label": "牛眼",
    "state": "reviewed_clear",
    "text": "眼大睛圓視見風，見之遠近不分明，興財巨萬無差跌，壽算綿長福祿終。",
    "d": [
      [
        "eye",
        "眼大睛圓",
        "눈이 크고 눈동자가 둥글다고 기술"
      ],
      [
        "eye",
        "遠近不分明",
        "원근 시야가 분명하지 않다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "興財巨萬無差跌",
        "큰 재물과 안정적 재산을 기술한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "壽算綿長",
        "장수를 기술한다."
      ],
      [
        "traditional_auspice",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "福祿終",
        "복록이 끝까지 이어진다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.peacock",
    "label": "孔雀眼",
    "state": "reviewed_clear",
    "text": "眼有波明睛黑光。青多白少惡兇強。素廉清潔嫌乍煖。始末興隆姓氏揚。",
    "d": [
      [
        "eye",
        "波明",
        "눈의 물결·윤곽이 밝다고 기술"
      ],
      [
        "eye",
        "睛黑光",
        "검은 눈동자의 광택을 기술"
      ],
      [
        "eye",
        "青多白少",
        "푸른·검은 부분이 많고 흰 부분이 적다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "惡兇強",
        "강하고 사나운 성정을 언급한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "素廉清潔",
        "청렴하고 깨끗함을 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "始末興隆姓氏揚",
        "처음부터 끝까지 흥하고 이름이 드러난다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.mandarin_duck",
    "label": "鴛鴦眼",
    "state": "reviewed_clear",
    "text": "眼秀睛紅潤有紗，眼圓略露帶桃花。夫妻情順又且美，若還富貴恐淫些。",
    "d": [
      [
        "eye",
        "眼秀",
        "눈이 수려하다고 기술"
      ],
      [
        "eye",
        "睛紅潤有紗",
        "붉고 윤택하며 비단 같은 기운을 기술"
      ],
      [
        "eye",
        "眼圓略露",
        "둥글고 약간 드러난다고 기술"
      ],
      [
        "eye",
        "帶桃花",
        "도화적 특징을 동반한다고 기술"
      ]
    ],
    "c": [
      [
        "spouse_relationship",
        "spouse",
        "whole_life",
        "favorable",
        "direct_clear",
        "夫妻情順又且美",
        "부부 관계가 순조롭고 좋다고 기술한다."
      ],
      [
        "sexuality",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "若還富貴恐淫些",
        "부귀한 경우 음란 성향을 우려하는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.calling_phoenix",
    "label": "鳴鳳眼",
    "state": "reviewed_clear",
    "text": "上層波起亦分明，視耳睜睜不露神。敢取中年而遇貴，榮宗耀祖改門庭。",
    "d": [
      [
        "eye",
        "上層波起亦分明",
        "위쪽 눈주름이 일어나고 분명하다고 기술"
      ],
      [
        "eye",
        "睜睜不露神",
        "눈을 뜨되 신을 드러내지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "patron_support",
        "patron",
        "middle",
        "favorable",
        "direct_clear",
        "中年而遇貴",
        "중년에 귀인을 만난다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "middle_late",
        "favorable",
        "direct_clear",
        "榮宗耀祖改門庭",
        "가문을 빛내고 집안을 바꿀 만큼 출세한다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.sleeping_phoenix",
    "label": "睡鳳眼",
    "state": "reviewed_clear",
    "text": "平平瞻視不偏斜，笑帶和容秀氣華。天性容人而有量，須知富貴足堪誇。",
    "d": [
      [
        "eye",
        "瞻視不偏斜",
        "시선이 치우치지 않는다고 기술"
      ],
      [
        "context",
        "笑帶和容",
        "웃음과 온화한 표정을 동반"
      ],
      [
        "eye",
        "秀氣華",
        "수려한 기운을 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "天性容人而有量",
        "포용력과 도량을 좋게 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴足堪誇",
        "부귀와 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.auspicious_phoenix",
    "label": "瑞鳳眼",
    "state": "reviewed_clear",
    "text": "日月分明兩角齊，二波長秀笑微微。流而不動神光色，翰苑聲名達鳳池。",
    "d": [
      [
        "eye",
        "日月分明",
        "양 눈이 분명하다고 기술"
      ],
      [
        "eye",
        "兩角齊",
        "양 눈꼬리가 고르다고 기술"
      ],
      [
        "eye",
        "二波長秀",
        "두 눈의 윤곽이 길고 수려하다고 기술"
      ],
      [
        "context",
        "笑微微",
        "미소를 동반"
      ],
      [
        "eye",
        "流而不動神光色",
        "빛은 흐르되 신이 함부로 움직이지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "翰苑聲名",
        "문한·학술 관직의 명성과 연결한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "達鳳池",
        "고위 관직에 이르는 것으로 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.wild_goose",
    "label": "鴈眼",
    "state": "reviewed_clear",
    "text": "睛如黑漆帶金黃，上下波紋二樣長。入相為官恭且蘊，連枝同氣姓名香。",
    "d": [
      [
        "eye",
        "睛如黑漆帶金黃",
        "눈동자가 검은 옻 같고 금빛을 띤다고 기술"
      ],
      [
        "eye",
        "上下波紋二樣長",
        "상하 눈주름이 길다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "入相為官",
        "재상·관직과 연결한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "恭且蘊",
        "공손하고 내실 있다고 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "direct_clear",
        "連枝同氣姓名香",
        "형제·동기간의 명예가 좋다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.yin_yang",
    "label": "陰陽眼",
    "state": "reviewed_clear",
    "text": "兩目雌雄睛大小，精神光彩視人斜，心非口是無誠實，富積奸謀詭不奢。",
    "d": [
      [
        "eye",
        "兩目雌雄睛大小",
        "양 눈의 크기·성격이 다르다고 기술"
      ],
      [
        "eye",
        "視人斜",
        "사시·곁눈질로 기술"
      ],
      [
        "eye",
        "精神光彩",
        "눈의 광택을 언급"
      ]
    ],
    "c": [
      [
        "integrity_trust",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "心非口是無誠實",
        "말과 마음이 다르고 성실하지 않다고 기술한다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "奸謀詭",
        "간계와 속임을 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "mixed",
        "phrase_uncertain",
        "富積",
        "재물 축적을 언급하나 뒤 구절과의 문맥은 별도 대조 대상이다."
      ]
    ]
  },
  {
    "key": "eye.named.crane_shape",
    "label": "鶴形眼",
    "state": "reviewed_clear",
    "text": "上層波秀到奸門，黑白分明清秀瞳，正視無偏人可愛，高明廣大貴而榮。",
    "d": [
      [
        "eye",
        "上層波秀到奸門",
        "위쪽 눈주름이 간문까지 수려하게 이어진다고 기술"
      ],
      [
        "eye",
        "黑白分明",
        "흑백이 분명하다고 기술"
      ],
      [
        "eye",
        "清秀瞳",
        "동공이 맑고 수려하다고 기술"
      ],
      [
        "eye",
        "正視無偏",
        "정면을 보고 치우치지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "interpersonal_relations",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "人可愛",
        "타인이 사랑할 만하다고 기술한다."
      ],
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "高明廣大",
        "고명하고 넓은 판단을 기술한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "貴而榮",
        "귀하고 영화롭다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.goose",
    "label": "鵝眼",
    "state": "reviewed_clear",
    "text": "數波紋秀射天倉，視物分明神更長。白少黑多心且善，綿綿福祿老安祥。",
    "d": [
      [
        "eye",
        "數波紋秀射天倉",
        "여러 눈주름이 천창 방향으로 수려하게 뻗는다고 기술"
      ],
      [
        "eye",
        "視物分明",
        "시선·시야가 분명하다고 기술"
      ],
      [
        "eye",
        "白少黑多",
        "흰자보다 검은 부분이 많다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "心且善",
        "선한 마음과 연결한다."
      ],
      [
        "traditional_auspice",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "福祿",
        "복록과 연결한다."
      ],
      [
        "life_course",
        "none",
        "late",
        "favorable",
        "direct_clear",
        "老安祥",
        "노년의 안상함을 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.peach_blossom",
    "label": "桃花眼",
    "state": "reviewed_clear",
    "text": "男女桃花眼不宜，逢人微笑水光迷。眼皮濕淚兼斜視，自足歡娛樂且嬉。",
    "d": [
      [
        "eye",
        "微笑水光迷",
        "웃을 때 물빛처럼 흐린 광택을 기술"
      ],
      [
        "eye",
        "眼皮濕淚",
        "눈꺼풀이 젖고 눈물이 맺힌 듯하다고 기술"
      ],
      [
        "eye",
        "斜視",
        "비스듬히 보는 시선을 기술"
      ]
    ],
    "c": [
      [
        "sexuality",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "桃花眼不宜",
        "도화안 자체를 전통적으로 불리하게 평가한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "歡娛樂且嬉",
        "즐거움과 유희를 추구하는 성향으로 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.drunken",
    "label": "醉眼",
    "state": "reviewed_clear",
    "text": "紅黃混雜卻流光，如醉如癡心昧昂。女犯貪淫男必夭，僧人道士亦淫荒。",
    "d": [
      [
        "eye",
        "紅黃混雜",
        "붉고 누른 색이 섞였다고 기술"
      ],
      [
        "eye",
        "流光",
        "흐르는 광택을 기술"
      ],
      [
        "eye",
        "如醉如癡",
        "취하거나 멍한 듯한 눈으로 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "心昧",
        "마음이 어둡다고 기술한다."
      ],
      [
        "sexuality",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "貪淫",
        "성적 방종에 대한 전통적 비난을 기록한다."
      ],
      [
        "longevity_mortality",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "男必夭",
        "남성의 요절을 단정하는 전통 문구를 역사적 주장으로만 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.crane",
    "label": "鶴眼",
    "state": "reviewed_clear",
    "text": "眼秀精神黑白清，藏神不露顯功名。昂昂志氣衝牛斗，富貴須當達上卿。",
    "d": [
      [
        "eye",
        "眼秀",
        "눈이 수려하다고 기술"
      ],
      [
        "eye",
        "黑白清",
        "흑백이 맑다고 기술"
      ],
      [
        "eye",
        "藏神不露",
        "신을 감추고 드러내지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "顯功名",
        "공명을 드러낸다고 기술한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "昂昂志氣",
        "높은 기개를 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "達上卿",
        "상경급 고위 지위와 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.sheep",
    "label": "羊眼",
    "state": "reviewed_clear",
    "text": "黑淡微黃神不清，瞳人紗樣卻昏睛，祖財縱有無緣享，晚歲中年又且貧。",
    "d": [
      [
        "eye",
        "黑淡微黃",
        "검은 부분이 옅고 약간 누렇다고 기술"
      ],
      [
        "eye",
        "神不清",
        "신이 맑지 않다고 기술"
      ],
      [
        "eye",
        "瞳人紗樣",
        "동공이 비단·안개 같은 모습으로 기술"
      ],
      [
        "eye",
        "昏睛",
        "눈이 흐리다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "祖財縱有無緣享",
        "조상 재산이 있어도 누리기 어렵다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "middle_late",
        "challenging",
        "direct_clear",
        "晚歲中年又且貧",
        "중년과 말년에 가난하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.fish",
    "label": "魚眼",
    "state": "reviewed_clear",
    "text": "睛露神昏若水光，定睛遠近視汪洋，如逢此眼皆亡早，百日須驚歎夭殤。",
    "d": [
      [
        "eye",
        "睛露",
        "눈동자가 드러난다고 기술"
      ],
      [
        "eye",
        "神昏若水光",
        "신이 흐리고 물빛 같다고 기술"
      ],
      [
        "eye",
        "遠近視汪洋",
        "원근을 볼 때 시선이 넓고 흐리게 보인다고 기술"
      ]
    ],
    "c": [
      [
        "longevity_mortality",
        "none",
        "early",
        "challenging",
        "direct_clear",
        "皆亡早",
        "일찍 죽는다는 전통적 판단을 기록한다."
      ],
      [
        "longevity_mortality",
        "none",
        "early",
        "challenging",
        "phrase_uncertain",
        "百日須驚歎夭殤",
        "짧은 시기 내 요절을 경고하는 문구로 보이나 정확한 시간 해석은 별도 대조 대상이다."
      ]
    ]
  },
  {
    "key": "eye.named.horse",
    "label": "馬眼",
    "state": "reviewed_clear",
    "text": "皮寬三角睛睜露，終日無愁濕淚堂。面瘦皮綳真可歎，刑妻剋子又奔忙。",
    "d": [
      [
        "eye",
        "皮寬三角",
        "눈꺼풀이 넓고 삼각형으로 기술"
      ],
      [
        "eye",
        "睛睜露",
        "눈동자가 크게 드러난다고 기술"
      ],
      [
        "eye",
        "濕淚堂",
        "누당이 젖은 듯하다고 기술"
      ],
      [
        "context",
        "面瘦皮綳",
        "얼굴이 마르고 피부가 팽팽하다고 기술"
      ]
    ],
    "c": [
      [
        "spouse_relationship",
        "spouse",
        "whole_life",
        "challenging",
        "direct_clear",
        "刑妻",
        "배우자에게 불리하다는 전통 판단을 기록한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "challenging",
        "direct_clear",
        "剋子",
        "자녀에게 불리하다는 전통 판단을 기록한다."
      ],
      [
        "life_course",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "又奔忙",
        "평생 분주함과 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.pig",
    "label": "豬眼",
    "state": "reviewed_clear",
    "text": "白昏睛露黑尤濛，波厚皮寬性暴凶，富貴也遭刑憲罹，縱歸十惡法難容。",
    "d": [
      [
        "eye",
        "白昏",
        "흰자가 흐리다고 기술"
      ],
      [
        "eye",
        "睛露",
        "눈동자가 드러난다고 기술"
      ],
      [
        "eye",
        "黑尤濛",
        "검은 부분도 흐리다고 기술"
      ],
      [
        "eye",
        "波厚皮寬",
        "눈 윤곽이 두껍고 눈꺼풀이 넓다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "性暴凶",
        "폭력적이고 사나운 성정으로 기술한다."
      ],
      [
        "legal_penalty",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "富貴也遭刑憲罹",
        "부귀해도 법적 형벌을 당한다고 기술한다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "十惡法難容",
        "중대한 악행과 연결하는 전통적 비난을 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.snake",
    "label": "蛇眼",
    "state": "reviewed_clear",
    "text": "堪歎人心毒似蛇，睛紅圓露帶紅紗。大奸大詐如狼虎，此目之人子打爺。",
    "d": [
      [
        "eye",
        "睛紅",
        "눈동자가 붉다고 기술"
      ],
      [
        "eye",
        "圓露",
        "둥글고 드러난다고 기술"
      ],
      [
        "eye",
        "帶紅紗",
        "붉은 실·막 같은 색을 띤다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "人心毒似蛇",
        "독한 마음으로 기술한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "大奸大詐",
        "간사함과 속임을 크게 기술한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "challenging",
        "direct_clear",
        "子打爺",
        "자녀가 아버지를 해치는 극단적 불화 문구를 역사적 주장으로 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.pigeon",
    "label": "鴿眼",
    "state": "reviewed_clear",
    "text": "鴿眼睛黃小垤圓，搖頭擺膝坐還偏，不拘男女多淫亂，少實多虛心湛然。",
    "d": [
      [
        "eye",
        "睛黃",
        "눈동자가 누렇다고 기술"
      ],
      [
        "eye",
        "小垤圓",
        "작고 둥근 형태로 기술"
      ],
      [
        "context",
        "搖頭擺膝坐還偏",
        "머리·무릎 움직임과 비스듬한 자세를 동반"
      ]
    ],
    "c": [
      [
        "sexuality",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "不拘男女多淫亂",
        "남녀 모두 성적 방종과 연결하는 전통적 비난을 기록한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "challenging",
        "phrase_uncertain",
        "少實多虛",
        "실질은 적고 허함이 많다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.luan",
    "label": "鸞眼",
    "state": "reviewed_clear",
    "text": "準頭圓大眼微長，步急言辭媚且良。身貴近君終大用，何愁不似雪衣娘。",
    "d": [
      [
        "context",
        "準頭圓大",
        "준두가 둥글고 크다는 동반 조건"
      ],
      [
        "eye",
        "眼微長",
        "눈이 약간 길다고 기술"
      ],
      [
        "context",
        "步急",
        "걸음이 빠르다고 기술"
      ],
      [
        "context",
        "言辭媚且良",
        "말씨가 매력 있고 좋다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "身貴近君",
        "귀한 신분으로 군주 가까이에 있다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "later",
        "favorable",
        "direct_clear",
        "終大用",
        "끝내 크게 쓰인다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.wolf",
    "label": "狼目",
    "state": "reviewed_clear",
    "text": "狼目睛黃視若顛，為人貪鄙自茫然，愴惶多錯精神亂，凶暴狂徒度百年。",
    "d": [
      [
        "eye",
        "睛黃",
        "눈동자가 누렇다고 기술"
      ],
      [
        "eye",
        "視若顛",
        "시선이 뒤틀리거나 광란처럼 보인다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "貪鄙",
        "탐욕스럽고 비루하다고 기술한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "愴惶多錯精神亂",
        "당황하고 실수가 많으며 정신이 어지럽다고 기술한다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "凶暴狂徒",
        "흉폭한 사람으로 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.fuxi",
    "label": "伏犀眼",
    "state": "reviewed_clear",
    "text": "頭圓眼大兩眉濃，耳內毫長體厚豐，此目信聰台鼎位，定教富貴壽如松。",
    "d": [
      [
        "context",
        "頭圓",
        "머리가 둥글다는 동반 조건"
      ],
      [
        "eye",
        "眼大",
        "눈이 크다고 기술"
      ],
      [
        "context",
        "兩眉濃",
        "양 눈썹이 짙다는 동반 조건"
      ],
      [
        "context",
        "耳內毫長",
        "귀 안 털이 길다는 동반 조건"
      ],
      [
        "context",
        "體厚豐",
        "몸이 두텁고 풍성하다는 동반 조건"
      ]
    ],
    "c": [
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "此目信聰",
        "총명함과 연결한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "台鼎位",
        "고위 관직과 연결한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "壽如松",
        "장수를 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.egret",
    "label": "鷺鷥眼",
    "state": "reviewed_clear",
    "text": "眼黃身潔不沾塵，行搖動縮本天真。眉縮身長腳瘦細，縱然巨富也教貧。",
    "d": [
      [
        "eye",
        "眼黃",
        "눈이 누렇다고 기술"
      ],
      [
        "context",
        "身潔不沾塵",
        "몸이 깨끗하다고 기술"
      ],
      [
        "context",
        "行搖動縮",
        "걷는 동작의 흔들림·움츠림을 기술"
      ],
      [
        "context",
        "眉縮",
        "눈썹이 움츠러든 동반 조건"
      ],
      [
        "context",
        "身長腳瘦細",
        "몸은 길고 다리는 가늘다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "neutral",
        "direct_clear",
        "本天真",
        "천진한 성향과 연결한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "縱然巨富也教貧",
        "큰 부를 얻어도 가난하게 된다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.ape",
    "label": "猿眼",
    "state": "reviewed_clear",
    "text": "猿目微黃欠上開，仰看心巧有疑猜。名虛多子俱靈性，終作伶人且不才。",
    "d": [
      [
        "eye",
        "微黃",
        "눈이 약간 누렇다고 기술"
      ],
      [
        "eye",
        "欠上開",
        "위로 충분히 열리지 않는다고 기술"
      ],
      [
        "eye",
        "仰看",
        "위를 향해 보는 시선을 기술"
      ]
    ],
    "c": [
      [
        "intelligence",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "心巧有疑猜",
        "재치가 있으나 의심이 많다고 기술한다."
      ],
      [
        "reputation",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "名虛",
        "명성이 허하다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "favorable",
        "direct_clear",
        "多子俱靈性",
        "자녀가 많고 영리하다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "later",
        "challenging",
        "direct_clear",
        "終作伶人且不才",
        "끝내 배우·광대 계열이며 재능이 부족하다고 평가하는 전통 문구를 기록한다."
      ]
    ]
  },
  {
    "key": "eye.named.deer",
    "label": "鹿眼",
    "state": "reviewed_clear",
    "text": "鹿目青黑兩波長，行步如飛性且剛。義隱山林沉映處，自然福祿異尋常。",
    "d": [
      [
        "eye",
        "青黑",
        "눈 색을 청흑으로 기술"
      ],
      [
        "eye",
        "兩波長",
        "양 눈의 윤곽이 길다고 기술"
      ],
      [
        "context",
        "行步如飛",
        "걸음이 매우 빠르다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "性且剛",
        "강한 성정으로 기술한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "favorable",
        "phrase_uncertain",
        "義隱山林",
        "의로움·은거와 연결하는 문구로 보존한다."
      ],
      [
        "traditional_auspice",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "福祿異尋常",
        "비범한 복록과 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.bear",
    "label": "熊眼",
    "state": "reviewed_with_uncertainty",
    "text": "熊目睛員又匪豬，徒然力勇逞兇愚。坐伸不久喘息急，敖氏還能滅也無？",
    "d": [
      [
        "eye",
        "睛員",
        "눈동자가 둥글다고 기술"
      ],
      [
        "context",
        "力勇",
        "힘과 용맹을 동반 특성으로 기술"
      ],
      [
        "context",
        "喘息急",
        "숨이 급하다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "逞兇愚",
        "흉함과 어리석음을 드러낸다고 기술한다."
      ],
      [
        "life_course",
        "none",
        "whole_life",
        "challenging",
        "phrase_uncertain",
        "坐伸不久喘息急",
        "행동·호흡과 관련된 불리한 묘사이나 정확한 의미는 스캔 대조 전 보류한다."
      ],
      [
        "longevity_mortality",
        "none",
        "unspecified",
        "challenging",
        "phrase_uncertain",
        "敖氏還能滅也無",
        "말미 의미가 전사상 불확실해 수명·종말 관련 가능성만 기록하고 확정하지 않는다."
      ]
    ]
  },
  {
    "key": "eye.named.shrimp",
    "label": "蝦眼",
    "state": "reviewed_with_uncertainty",
    "text": "蝦目操心貌卓然，英風挺挺自當前。迍邅火歲水得志，晚末雖榮壽不延。",
    "d": [
      [
        "eye",
        "蝦目",
        "새우눈이라는 명명형 자체"
      ],
      [
        "context",
        "貌卓然",
        "외모가 두드러진다고 기술"
      ],
      [
        "context",
        "英風挺挺",
        "영걸스러운 풍모를 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "mixed",
        "phrase_uncertain",
        "操心",
        "마음을 쓰거나 고심하는 성향으로 보이나 의미는 별도 대조 대상이다."
      ],
      [
        "life_course",
        "none",
        "middle",
        "mixed",
        "phrase_uncertain",
        "迍邅火歲水得志",
        "특정 오행·시기와 관련한 성쇠 문구로 보이며 정확한 해석은 스캔 대조 전 보류한다."
      ],
      [
        "status",
        "none",
        "late",
        "favorable",
        "direct_clear",
        "晚末雖榮",
        "말년에 영화가 있다고 기술한다."
      ],
      [
        "longevity",
        "none",
        "late",
        "challenging",
        "direct_clear",
        "壽不延",
        "수명이 길지 않다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.crab",
    "label": "蟹眼",
    "state": "reviewed_clear",
    "text": "蟹目睛露又頑愚，生平賦性喜江湖。有兒不得供親養，休問斑衣有與無。",
    "d": [
      [
        "eye",
        "睛露",
        "눈동자가 드러난다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "頑愚",
        "완고하고 어리석다고 기술한다."
      ],
      [
        "life_course",
        "none",
        "whole_life",
        "neutral",
        "direct_clear",
        "喜江湖",
        "강호 생활을 좋아한다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "later",
        "challenging",
        "direct_clear",
        "有兒不得供親養",
        "자녀가 있어도 부모 봉양을 받기 어렵다고 기술한다."
      ],
      [
        "filial_support",
        "parents",
        "later",
        "challenging",
        "direct_clear",
        "不得供親養",
        "노년의 부모 봉양 부족과 연결한다."
      ]
    ]
  },
  {
    "key": "eye.named.swallow",
    "label": "燕眼",
    "state": "reviewed_clear",
    "text": "口小脣紅更擺頭，眼深黑白朗明收，語多準促而有信，機巧徒勞衣食週。",
    "d": [
      [
        "context",
        "口小脣紅",
        "입이 작고 입술이 붉다는 동반 조건"
      ],
      [
        "context",
        "擺頭",
        "머리를 흔드는 동작을 기술"
      ],
      [
        "eye",
        "眼深",
        "눈이 깊다고 기술"
      ],
      [
        "eye",
        "黑白朗明",
        "흑백이 밝고 분명하다고 기술"
      ]
    ],
    "c": [
      [
        "integrity_trust",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "語多準促而有信",
        "말이 빠르거나 짧지만 신의가 있다고 기술한다."
      ],
      [
        "intelligence",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "機巧",
        "기교·재치를 기술한다."
      ],
      [
        "labor_livelihood",
        "none",
        "whole_life",
        "mixed",
        "direct_clear",
        "徒勞衣食週",
        "수고가 많지만 의식은 이어진다는 식으로 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.partridge",
    "label": "鷓鴣眼",
    "state": "reviewed_clear",
    "text": "眼赤黃兮面帶紅，搖頭征步貌非隆。小身小耳常看地，一生終不足珍豐。",
    "d": [
      [
        "eye",
        "眼赤黃",
        "눈이 붉고 누렇다고 기술"
      ],
      [
        "context",
        "面帶紅",
        "얼굴에 붉은 기운을 동반"
      ],
      [
        "context",
        "搖頭征步",
        "머리·보행 동작을 기술"
      ],
      [
        "context",
        "小身小耳",
        "몸과 귀가 작다고 기술"
      ],
      [
        "eye",
        "常看地",
        "늘 땅을 보는 시선을 기술"
      ]
    ],
    "c": [
      [
        "status",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "貌非隆",
        "외형·신분의 융성함이 부족하다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "challenging",
        "direct_clear",
        "一生終不足珍豐",
        "평생 풍족하지 않다고 기술한다."
      ]
    ]
  },
  {
    "key": "eye.named.cat",
    "label": "貓眼",
    "state": "reviewed_with_uncertainty",
    "text": "貓目睛黃面闊圓溫純，稟性好飽鮮，有才有力堪任使，常得高人世憐。",
    "d": [
      [
        "eye",
        "睛黃",
        "눈동자가 누렇다고 기술"
      ],
      [
        "context",
        "面闊圓",
        "얼굴이 넓고 둥글다고 기술"
      ],
      [
        "context",
        "溫純",
        "온순한 인상을 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "溫純稟性",
        "온순한 성정을 기술한다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "neutral",
        "phrase_uncertain",
        "好飽鮮",
        "먹는 취향 관련 문구로 보이나 구두점·문맥이 불확실하다."
      ],
      [
        "ability",
        "none",
        "whole_life",
        "favorable",
        "direct_clear",
        "有才有力堪任使",
        "재능과 힘이 있어 일을 맡길 수 있다고 기술한다."
      ],
      [
        "patron_support",
        "patron",
        "whole_life",
        "favorable",
        "direct_clear",
        "常得高人世憐",
        "높은 사람의 아낌·도움을 받는다고 기술한다."
      ]
    ]
  }
] as const;

export const EYE_NAMED_FORM_SEMANTICS_FR311B: readonly EyeNamedFormSemanticRecordFR311B[] =
  Object.freeze(RAW_FORMS.map((raw) => Object.freeze({
    formKey: raw.key,
    traditionalLabel: raw.label,
    sourceText: raw.text,
    sourceLocator: `${GUJIN_633}#${encodeURIComponent(raw.label)}`,
    sourceRefs: SOURCE_REFS,
    verificationState: 'gujin633_transcription_reviewed' as const,
    transcriptionState: raw.state,
    nlc1925DirectScanAdjudicated: false as const,
    descriptors: Object.freeze(raw.d.map(([origin, sourceFragment, neutralGloss], index) => Object.freeze({
      descriptorId: `fr311b.${raw.key}.descriptor.${index + 1}`,
      origin,
      sourceFragment,
      neutralGloss,
      neutralMorphologyBindingAuthorized: false as const,
    }))),
    claims: Object.freeze(raw.c.map(([topicKey, relationTarget, lifeStage, polarity, certainty, sourceFragment, meaningSummary], index) => Object.freeze({
      claimId: `fr311b.${raw.key}.claim.${index + 1}`,
      topicKey,
      relationTarget,
      lifeStage,
      polarity,
      certainty,
      sourceFragment,
      meaningSummary,
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }))),
    namedFormToNeutralClassifierAuthorized: false as const,
  })));

export const FR311B_AUTHORITY_BOUNDARY = Object.freeze({
  treatsInbokAsPrimarySourceConcept: false as const,
  aggregatesRelationalClaimsIntoScore: false as const,
  namedFormToNeutralClassifierAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  providerGeometryBindingAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  nlc1925DirectScanAdjudicationClaimed: false as const,
  uncertainTranscriptionPromotedToFact: false as const,
});

const RELATIONAL_TOPICS = new Set<EyeSemanticTopicFR311B>([
  'siblings',
  'parents',
  'spouse_relationship',
  'children_family',
  'interpersonal_relations',
  'patron_support',
  'filial_support',
]);

export interface EyeRelationalEvidenceLensResultFR311B {
  readonly lensKey: 'eye_relational_evidence';
  readonly status: 'direct_relational_evidence_found' | 'no_direct_relational_evidence';
  readonly formKey: string;
  readonly claimIds: readonly string[];
  readonly aggregateJudgementAuthorized: false;
  readonly scoreAuthorized: false;
  readonly reason: string;
}

export function queryEyeRelationalEvidenceFR311B(formKey: string): EyeRelationalEvidenceLensResultFR311B {
  const record = EYE_NAMED_FORM_SEMANTICS_FR311B.find((candidate) => candidate.formKey === formKey);
  if (record === undefined) throw new Error(`fr311b_unknown_form:${formKey}`);

  const matching = record.claims.filter(
    (claim) => claim.relationTarget !== 'none' || RELATIONAL_TOPICS.has(claim.topicKey),
  );

  return Object.freeze({
    lensKey: 'eye_relational_evidence' as const,
    status: matching.length > 0
      ? 'direct_relational_evidence_found' as const
      : 'no_direct_relational_evidence' as const,
    formKey,
    claimIds: Object.freeze(matching.map((claim) => claim.claimId)),
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    reason: matching.length > 0
      ? '관계 관련 직접 원문 주장만 반환한다. 인복 점수나 새로운 종합 운세는 만들지 않는다.'
      : '현재 직접 원문에 관계 주장이 없다. 재물·신분·성정 등의 다른 의미를 관계 운으로 변환하지 않는다.',
  });
}

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311b_duplicate:${path}`);
}

export function assertEyeNamedFormSemanticsFR311B(): void {
  if (EYE_NAMED_FORM_SEMANTICS_FR311B.length !== 39) {
    throw new Error('fr311b_requires_39_eye_forms');
  }

  const upstreamKeys = TRADITIONAL_NAMED_FORMS_FR311
    .filter((entry) => entry.region === 'eye')
    .map((entry) => entry.formKey)
    .sort();
  const localKeys = EYE_NAMED_FORM_SEMANTICS_FR311B.map((entry) => entry.formKey).sort();

  if (JSON.stringify(upstreamKeys) !== JSON.stringify(localKeys)) {
    throw new Error('fr311b_fr311_form_key_coverage_mismatch');
  }

  assertUnique(localKeys, 'form_key');
  assertUnique(
    EYE_NAMED_FORM_SEMANTICS_FR311B.flatMap((entry) => entry.descriptors.map((descriptor) => descriptor.descriptorId)),
    'descriptor_id',
  );
  assertUnique(
    EYE_NAMED_FORM_SEMANTICS_FR311B.flatMap((entry) => entry.claims.map((claim) => claim.claimId)),
    'claim_id',
  );

  for (const entry of EYE_NAMED_FORM_SEMANTICS_FR311B) {
    if (entry.sourceText.trim().length === 0) throw new Error(`fr311b_empty_source_text:${entry.formKey}`);
    if (entry.sourceLocator.trim().length === 0) throw new Error(`fr311b_empty_source_locator:${entry.formKey}`);
    if (entry.descriptors.length === 0) throw new Error(`fr311b_missing_descriptor:${entry.formKey}`);
    if (entry.claims.length === 0) throw new Error(`fr311b_missing_claim:${entry.formKey}`);
    if (entry.verificationState !== 'gujin633_transcription_reviewed') {
      throw new Error(`fr311b_verification_state_drift:${entry.formKey}`);
    }
    if (entry.nlc1925DirectScanAdjudicated !== false) {
      throw new Error(`fr311b_nlc_scan_authority_widening:${entry.formKey}`);
    }
    if (entry.namedFormToNeutralClassifierAuthorized !== false) {
      throw new Error(`fr311b_classifier_authority_widening:${entry.formKey}`);
    }

    for (const descriptor of entry.descriptors) {
      if (descriptor.sourceFragment.trim().length === 0) throw new Error(`fr311b_empty_descriptor:${descriptor.descriptorId}`);
      if (descriptor.neutralMorphologyBindingAuthorized !== false) {
        throw new Error(`fr311b_neutral_binding_widening:${descriptor.descriptorId}`);
      }
    }

    for (const claim of entry.claims) {
      if (claim.sourceFragment.trim().length === 0) throw new Error(`fr311b_empty_claim_fragment:${claim.claimId}`);
      if (claim.meaningSummary.trim().length === 0) throw new Error(`fr311b_empty_claim_summary:${claim.claimId}`);
      if (claim.historicalTraditionalDoctrineOnly !== true) {
        throw new Error(`fr311b_historical_boundary_drift:${claim.claimId}`);
      }
      if (claim.modernScientificFactAuthorized !== false) {
        throw new Error(`fr311b_modern_fact_authority_widening:${claim.claimId}`);
      }
      if (claim.productInterpretationAuthorized !== false) {
        throw new Error(`fr311b_product_authority_widening:${claim.claimId}`);
      }
    }
  }

  for (const [key, flag] of Object.entries(FR311B_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311b_authority_boundary_widening:${key}`);
  }
}
