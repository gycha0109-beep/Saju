export type NoseSemanticTopicFR311F =
  | 'temperament'
  | 'wealth'
  | 'status'
  | 'career_reputation'
  | 'reputation'
  | 'siblings'
  | 'children_family'
  | 'spouse_relationship'
  | 'kinship'
  | 'interpersonal_relations'
  | 'integrity_trust'
  | 'conduct_risk'
  | 'longevity'
  | 'traditional_health'
  | 'traditional_auspice'
  | 'legal_penalty'
  | 'life_course'
  | 'labor_livelihood'
  | 'household'
  | 'inheritance';

export type NoseRegionKeyFR311F =
  | 'root'
  | 'bridge'
  | 'mid_bridge'
  | 'tip'
  | 'side_wings'
  | 'nostril'
  | 'whole_nose'
  | 'root_bridge'
  | 'context';

export type NosePolarityFR311F =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export type NoseLifeStageFR311F =
  | 'whole_life'
  | 'middle'
  | 'late'
  | 'middle_late';

export interface NoseTraditionalRegionFR311F {
  readonly regionKey:
    | 'shangen'
    | 'nose_bridge'
    | 'nianshang'
    | 'shoushang'
    | 'zhuntou'
    | 'lantai'
    | 'tingwei'
    | 'nostril'
    | 'zaomen';
  readonly traditionalLabel: string;
  readonly neutralGloss: string;
  readonly sourceRefs: readonly string[];
  readonly neutralGeometryBindingAuthorized: false;
}

export interface NoseDirectRuleFR311F {
  readonly ruleId: string;
  readonly region: NoseRegionKeyFR311F;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly NoseSemanticTopicFR311F[];
  readonly sourceRefs: readonly string[];
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface NoseNamedFormDescriptorFR311F {
  readonly descriptorId: string;
  readonly region: NoseRegionKeyFR311F;
  readonly sourceFragment: string;
  readonly neutralGloss: string;
  readonly neutralGeometryBindingAuthorized: false;
}

export interface NoseNamedFormClaimFR311F {
  readonly claimId: string;
  readonly topicKey: NoseSemanticTopicFR311F;
  readonly lifeStage: NoseLifeStageFR311F;
  readonly polarity: NosePolarityFR311F;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface NoseNamedFormSemanticRecordFR311F {
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly sourceText: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin634_transcription_reviewed';
  readonly nlc1925DirectScanAdjudicated: false;
  readonly descriptors: readonly NoseNamedFormDescriptorFR311F[];
  readonly claims: readonly NoseNamedFormClaimFR311F[];
  readonly namedFormToNeutralClassifierAuthorized: false;
}

const GUJIN_632 = 'witness.gujin473.art632.wikisource';
const GUJIN_634 = 'witness.gujin473.art634.wikisource';

export const NOSE_TRADITIONAL_REGIONS_FR311F: readonly NoseTraditionalRegionFR311F[] =
  Object.freeze([
    Object.freeze({ regionKey: 'shangen', traditionalLabel: '山根', neutralGloss: '전통 문헌에서 코 윗부분의 산근으로 지칭되는 부위', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'nose_bridge', traditionalLabel: '鼻梁', neutralGloss: '전통 문헌의 비량·콧등 계열 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'nianshang', traditionalLabel: '年上', neutralGloss: '전통 코 세부 위치인 년상', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'shoushang', traditionalLabel: '壽上', neutralGloss: '전통 코 세부 위치인 수상', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'zhuntou', traditionalLabel: '準頭', neutralGloss: '전통 문헌의 코끝 중심 부위 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'lantai', traditionalLabel: '蘭臺', neutralGloss: '전통 문헌에서 코 옆의 한 부위로 짝을 이루어 언급되는 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'tingwei', traditionalLabel: '廷尉', neutralGloss: '전통 문헌에서 난대와 짝을 이루어 언급되는 코 옆 부위 명칭', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'nostril', traditionalLabel: '鼻孔', neutralGloss: '콧구멍을 직접 지칭하는 전통 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
    Object.freeze({ regionKey: 'zaomen', traditionalLabel: '竈門', neutralGloss: '코 명명형 구절에서 비공·코 아래 개구부 계열을 지칭하는 전통 표현', sourceRefs: Object.freeze([GUJIN_634]), neutralGeometryBindingAuthorized: false as const }),
  ]);

const RAW_RULES = [
  [
    "fr311f.shangen.high_not_low",
    "root",
    "宜高不宜低折",
    "산근은 높고 낮게 꺾이지 않는 것을 좋게 본다는 전통 기준을 기록한다.",
    [
      "status",
      "longevity"
    ]
  ],
  [
    "fr311f.shangen.luminous_straight",
    "root",
    "鼻梁不斜曲而常常瑩潤者，晚年有祿",
    "비량이 비뚤지 않고 윤택한 조건을 말년의 녹과 연결한다.",
    [
      "status",
      "life_course"
    ]
  ],
  [
    "fr311f.shangen.to_forehead",
    "root",
    "山根連額，鼻梁隆隆而起，與額平者，主位至三公",
    "산근이 이마와 이어지고 비량이 솟는 조건을 높은 지위와 연결한다.",
    [
      "status"
    ]
  ],
  [
    "fr311f.shangen.folded",
    "root",
    "山根蹙折，鼻梁蹙小陷折者，主貧乏無成",
    "산근·비량이 작고 꺾여 함몰된 조건을 빈곤과 성취 부족에 연결한다.",
    [
      "wealth",
      "career_reputation"
    ]
  ],
  [
    "fr311f.shangen.dry_dark",
    "root",
    "山根枯暗，鼻梁無肉而枯暗者，主與人多不足",
    "산근·비량이 마르고 어두우며 살이 없는 조건을 대인 부족과 연결한다.",
    [
      "interpersonal_relations"
    ]
  ],
  [
    "fr311f.shangen.not_sunken",
    "root",
    "山根不陷，主壽",
    "산근이 함몰되지 않은 조건을 수명과 연결한다.",
    [
      "longevity"
    ]
  ],
  [
    "fr311f.shangen.crooked",
    "root",
    "山根斜曲官災",
    "산근이 비뚤고 굽은 조건을 관재와 연결한다.",
    [
      "legal_penalty"
    ]
  ],
  [
    "fr311f.nose.tip_round_nostrils_hidden",
    "whole_nose",
    "準頭圓，鼻孔不昂不露，又得蘭臺、廷尉二部相應",
    "둥근 준두·노출되지 않은 비공·난대정위의 대응을 한 묶음의 좋은 코 조건으로 기술한다.",
    [
      "wealth",
      "status"
    ]
  ],
  [
    "fr311f.nose.luminous_full",
    "whole_nose",
    "光潤豐起者，不貴則壽富也",
    "광윤하고 풍기한 코를 귀함 또는 수명·부와 연결한다.",
    [
      "status",
      "longevity",
      "wealth"
    ]
  ],
  [
    "fr311f.nose.dark_thin",
    "whole_nose",
    "色黑肉薄者，不賤則夭",
    "검고 살이 얇은 코를 불리한 신분 또는 수명 판단과 연결한다.",
    [
      "status",
      "longevity"
    ]
  ],
  [
    "fr311f.nose.high_bridge",
    "bridge",
    "隆高有梁者，主壽",
    "높고 비량이 뚜렷한 코를 수명과 연결한다.",
    [
      "longevity"
    ]
  ],
  [
    "fr311f.tip.full_large",
    "tip",
    "準頭豐大與人無害",
    "준두가 풍대하면 타인에게 해가 없다고 기술한다.",
    [
      "interpersonal_relations",
      "temperament"
    ]
  ],
  [
    "fr311f.tip.pointed_thin",
    "tip",
    "準頭尖細好為奸計",
    "준두가 뾰족하고 가는 조건을 간계와 연결한다.",
    [
      "integrity_trust",
      "conduct_risk"
    ]
  ],
  [
    "fr311f.bridge.round_to_yintang",
    "bridge",
    "鼻梁圓而貫印堂者，此人主美貌之妻",
    "둥근 비량이 인당까지 이어지는 조건을 배우자에 관한 전통 판단과 연결한다.",
    [
      "spouse_relationship"
    ]
  ],
  [
    "fr311f.nostril.up_exposed",
    "nostril",
    "孔仰露出，夭折寒索",
    "콧구멍이 위로 들려 드러나는 조건을 불리한 수명·생활 판단과 연결한다.",
    [
      "longevity",
      "wealth"
    ]
  ],
  [
    "fr311f.tip.full_risen",
    "tip",
    "準頭豐起，富貴無比",
    "준두가 풍성하게 솟는 조건을 부귀와 연결한다.",
    [
      "wealth",
      "status"
    ]
  ],
  [
    "fr311f.tip.round_fat",
    "tip",
    "準頭圓肥，足食豐衣",
    "준두가 둥글고 두터운 조건을 의식의 풍족함과 연결한다.",
    [
      "wealth"
    ]
  ],
  [
    "fr311f.tip.pointed_thin_poor",
    "tip",
    "準頭尖薄，孤貧削弱",
    "준두가 뾰족하고 얇은 조건을 고독·빈곤과 연결한다.",
    [
      "wealth",
      "interpersonal_relations"
    ]
  ],
  [
    "fr311f.nose.reaches_tianting",
    "whole_nose",
    "鼻聳天庭，四海馳名",
    "코의 형세가 천정 쪽으로 솟는 조건을 명성과 연결한다.",
    [
      "reputation"
    ]
  ],
  [
    "fr311f.bridge.no_bone",
    "bridge",
    "鼻梁無骨，必夭壽沒",
    "비량에 골세가 없다는 조건을 불리한 수명 판단과 연결한다.",
    [
      "longevity"
    ]
  ]
] as const;

export const NOSE_DIRECT_RULES_FR311F: readonly NoseDirectRuleFR311F[] =
  Object.freeze(RAW_RULES.map(([ruleId, region, sourceExpression, meaningSummary, topicKeys]) =>
    Object.freeze({
      ruleId,
      region,
      sourceExpression,
      meaningSummary,
      topicKeys: Object.freeze([...topicKeys]),
      sourceRefs: Object.freeze([GUJIN_634]),
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    })));

const RAW_NAMED_FORMS = [
  {
    "key": "nose.named.dragon",
    "label": "龍鼻",
    "text": "龍鼻豐隆準上齊，山根直聳若伏犀。鼻梁方正無偏曲，位至居尊九鼎時。",
    "d": [
      [
        "tip",
        "豐隆準上齊",
        "준두 쪽이 풍융하고 가지런하다고 기술"
      ],
      [
        "root",
        "山根直聳若伏犀",
        "산근이 곧고 높게 솟는다고 기술"
      ],
      [
        "bridge",
        "鼻梁方正無偏曲",
        "비량이 방정하고 치우치거나 굽지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "whole_life",
        "favorable",
        "位至居尊九鼎時",
        "높은 지위에 오른다는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.tiger",
    "label": "虎鼻",
    "text": "虎鼻員融不露孔，蘭臺廷尉亦須無。不偏不曲山根大，富貴名褒世罕夫。",
    "d": [
      [
        "whole_nose",
        "員融",
        "둥글고 융화된 형태로 기술"
      ],
      [
        "nostril",
        "不露孔",
        "콧구멍이 드러나지 않는다고 기술"
      ],
      [
        "root",
        "不偏不曲山根大",
        "산근이 크고 치우치거나 굽지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "favorable",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "reputation",
        "whole_life",
        "favorable",
        "名褒",
        "명예가 드러나는 것으로 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.hu_yang",
    "label": "胡羊鼻",
    "text": "胡羊鼻大準頭豐，蘭臺廷尉亦相同。山根年壽無脊露。大貴當時富石崇。",
    "d": [
      [
        "whole_nose",
        "鼻大",
        "코가 크다고 기술"
      ],
      [
        "tip",
        "準頭豐",
        "준두가 풍성하다고 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉亦相同",
        "난대·정위가 서로 고르게 대응한다고 기술"
      ],
      [
        "root_bridge",
        "山根年壽無脊露",
        "산근·년수에서 뼈마루가 드러나지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "whole_life",
        "favorable",
        "大貴",
        "큰 귀함과 연결한다."
      ],
      [
        "wealth",
        "whole_life",
        "favorable",
        "富石崇",
        "큰 부와 연결하는 비유적 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.lion",
    "label": "獅鼻",
    "text": "山根年壽略低平，準上豐大稱蘭廷。若令獅形真富貴，不然財帛有虛盈。",
    "d": [
      [
        "root_bridge",
        "山根年壽略低平",
        "산근과 년수가 다소 낮고 평평하다고 기술"
      ],
      [
        "tip",
        "準上豐大",
        "준두 쪽이 풍대하다고 기술"
      ],
      [
        "side_wings",
        "稱蘭廷",
        "난대·정위가 함께 언급되는 조건"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "conditional",
        "若令獅形真富貴",
        "사자형 조건이 온전히 맞을 때 부귀와 연결한다."
      ],
      [
        "wealth",
        "whole_life",
        "mixed",
        "不然財帛有虛盈",
        "조건이 맞지 않으면 재물의 허실이 있다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.hanging_gallbladder",
    "label": "懸膽鼻",
    "text": "鼻如懸膽準頭齊，山根不斷無偏欹。蘭臺廷尉模糊小，富貴榮華應壯期。",
    "d": [
      [
        "whole_nose",
        "鼻如懸膽",
        "매달린 쓸개 같은 전체 형태로 기술"
      ],
      [
        "tip",
        "準頭齊",
        "준두가 가지런하다고 기술"
      ],
      [
        "root",
        "山根不斷無偏欹",
        "산근이 끊기지 않고 치우치지 않는다고 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉模糊小",
        "난대·정위가 작고 모호하다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "middle",
        "favorable",
        "富貴榮華",
        "부귀영화와 연결한다."
      ],
      [
        "life_course",
        "middle",
        "favorable",
        "應壯期",
        "장년기에 해당 결과가 나타난다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.fuxi",
    "label": "伏犀鼻",
    "text": "伏犀鼻插天庭中，山根直上印堂隆。肉不多兮骨不露，神清位立至三公。",
    "d": [
      [
        "whole_nose",
        "插天庭中",
        "코의 형세가 천정 쪽까지 이어진다고 기술"
      ],
      [
        "root",
        "山根直上印堂隆",
        "산근이 곧게 올라 인당과 이어져 융기한다고 기술"
      ],
      [
        "whole_nose",
        "肉不多兮骨不露",
        "살이 지나치게 많지 않고 뼈가 드러나지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "favorable",
        "神清",
        "신이 맑다고 기술한다."
      ],
      [
        "status",
        "whole_life",
        "favorable",
        "位立至三公",
        "삼공에 이를 정도의 높은 지위와 연결한다."
      ]
    ]
  },
  {
    "key": "nose.named.ox",
    "label": "牛鼻",
    "text": "牛鼻豐齊根且大，蘭臺廷尉又分明。年壽不高且不軟，富積金資家道成。",
    "d": [
      [
        "whole_nose",
        "豐齊",
        "풍성하고 가지런하다고 기술"
      ],
      [
        "root",
        "根且大",
        "산근이 크다고 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉又分明",
        "난대·정위가 분명하다고 기술"
      ],
      [
        "mid_bridge",
        "年壽不高且不軟",
        "년수 부위가 높지 않되 무르지 않다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "favorable",
        "富積金資",
        "재물이 쌓이는 것으로 기술한다."
      ],
      [
        "household",
        "whole_life",
        "favorable",
        "家道成",
        "가세가 성립된다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.cut_tube",
    "label": "截筒鼻",
    "text": "功名富貴截筒佳，準頭齊直不偏斜，山根略軟年壽滿，中年富貴大成家。",
    "d": [
      [
        "whole_nose",
        "截筒",
        "곧게 잘린 통 같은 전체 형태로 기술"
      ],
      [
        "tip",
        "準頭齊直不偏斜",
        "준두가 가지런하고 곧으며 치우치지 않는다고 기술"
      ],
      [
        "root",
        "山根略軟",
        "산근이 약간 부드럽다고 기술"
      ],
      [
        "mid_bridge",
        "年壽滿",
        "년수 부위가 차 있다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "whole_life",
        "favorable",
        "功名",
        "공명과 연결한다."
      ],
      [
        "wealth",
        "middle",
        "favorable",
        "中年富貴大成家",
        "중년의 부귀와 성가를 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.garlic",
    "label": "蒜鼻",
    "text": "山根年壽俱平小，蘭臺廷尉準頭豐。弟兄情欠心無毒，晚景中年家必隆。",
    "d": [
      [
        "root_bridge",
        "山根年壽俱平小",
        "산근과 년수가 평평하고 작다고 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉",
        "난대·정위를 함께 기술"
      ],
      [
        "tip",
        "準頭豐",
        "준두가 풍성하다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "whole_life",
        "challenging",
        "弟兄情欠",
        "형제 정이 부족하다고 기술한다."
      ],
      [
        "temperament",
        "whole_life",
        "favorable",
        "心無毒",
        "마음에 독함이 없다고 기술한다."
      ],
      [
        "household",
        "middle_late",
        "favorable",
        "晚景中年家必隆",
        "중년 이후 집안의 융성을 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.full_bag",
    "label": "盛囊鼻",
    "text": "鼻如盛囊蘭廷小，兩邊尉竈亦員齊。始末貲財俱大盛，功名必定掛朱衣。",
    "d": [
      [
        "whole_nose",
        "鼻如盛囊",
        "가득 찬 자루 같은 형태로 기술"
      ],
      [
        "side_wings",
        "蘭廷小",
        "난대·정위가 작다고 기술"
      ],
      [
        "nostril",
        "兩邊尉竈亦員齊",
        "양쪽 정위·조문이 둥글고 가지런하다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "favorable",
        "始末貲財俱大盛",
        "처음부터 끝까지 재물이 크게 성한다고 기술한다."
      ],
      [
        "career_reputation",
        "whole_life",
        "favorable",
        "功名必定掛朱衣",
        "공명과 관직을 상징하는 전통 표현으로 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.monkey",
    "label": "猴鼻",
    "text": "山根年壽平且大，蘭臺廷尉要分明。準頭豐紅不露孔，雖然富貴恐奸情。",
    "d": [
      [
        "root_bridge",
        "山根年壽平且大",
        "산근·년수가 평평하고 크다고 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉要分明",
        "난대·정위가 분명해야 한다고 기술"
      ],
      [
        "tip",
        "準頭豐紅",
        "준두가 풍성하고 붉다고 기술"
      ],
      [
        "nostril",
        "不露孔",
        "콧구멍이 드러나지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "favorable",
        "富貴",
        "부귀와 연결한다."
      ],
      [
        "integrity_trust",
        "whole_life",
        "challenging",
        "恐奸情",
        "간사함을 우려하는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.hawk_beak",
    "label": "鷹嘴鼻",
    "text": "鼻梁露脊準頭尖，又如鷹嘴鎖脣邊。蘭臺廷尉俱短縮，啄人心髓惡奸殘。",
    "d": [
      [
        "bridge",
        "鼻梁露脊",
        "비량의 뼈마루가 드러난다고 기술"
      ],
      [
        "tip",
        "準頭尖",
        "준두가 뾰족하다고 기술"
      ],
      [
        "whole_nose",
        "如鷹嘴鎖脣邊",
        "매부리처럼 입술 쪽으로 잠그듯 굽는 형태로 기술"
      ],
      [
        "side_wings",
        "蘭臺廷尉俱短縮",
        "난대·정위가 짧고 움츠러든다고 기술"
      ]
    ],
    "c": [
      [
        "conduct_risk",
        "whole_life",
        "challenging",
        "啄人心髓",
        "타인을 해치는 성향을 비유적으로 기술한다."
      ],
      [
        "integrity_trust",
        "whole_life",
        "challenging",
        "惡奸殘",
        "간악하고 잔혹하다는 전통 비난을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.dog",
    "label": "狗鼻",
    "text": "狗鼻年壽起骨峰。準頭蘭尉孔邊空。此鼻之人主有義。惟嫌竊取濟時窮。",
    "d": [
      [
        "mid_bridge",
        "年壽起骨峰",
        "년수 부위에 골봉이 솟는다고 기술"
      ],
      [
        "tip",
        "準頭",
        "준두를 구성 요소로 언급"
      ],
      [
        "side_wings",
        "蘭尉",
        "난대·정위를 구성 요소로 언급"
      ],
      [
        "nostril",
        "孔邊空",
        "콧구멍 주변이 비어 보인다고 기술"
      ]
    ],
    "c": [
      [
        "integrity_trust",
        "whole_life",
        "favorable",
        "主有義",
        "의리가 있다고 기술한다."
      ],
      [
        "conduct_risk",
        "whole_life",
        "challenging",
        "惟嫌竊取",
        "절취 행동을 경계하는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.crucian_carp",
    "label": "鯽魚鼻",
    "text": "壽年高起如魚背，山根細小準頭垂。骨肉無親睛露白，一生衣食主伶仃。",
    "d": [
      [
        "mid_bridge",
        "壽年高起如魚背",
        "년수 부위가 물고기 등처럼 높게 솟는다고 기술"
      ],
      [
        "root",
        "山根細小",
        "산근이 가늘고 작다고 기술"
      ],
      [
        "tip",
        "準頭垂",
        "준두가 처진다고 기술"
      ]
    ],
    "c": [
      [
        "kinship",
        "whole_life",
        "challenging",
        "骨肉無親",
        "혈육과 친밀하지 않다고 기술한다."
      ],
      [
        "labor_livelihood",
        "whole_life",
        "challenging",
        "一生衣食主伶仃",
        "평생 생계가 외롭고 불안정하다는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.three_bends",
    "label": "三彎三曲鼻",
    "text": "鼻有三彎為反吟，鼻有三曲為伏吟。反吟相見是絕滅，伏吟相見淚淋淋。",
    "d": [
      [
        "bridge",
        "鼻有三彎",
        "코에 세 번 굽은 형태가 있다고 기술"
      ],
      [
        "bridge",
        "鼻有三曲",
        "코에 세 번 휜 형태가 있다고 기술"
      ]
    ],
    "c": [
      [
        "life_course",
        "whole_life",
        "challenging",
        "反吟相見是絕滅",
        "반음에 해당하는 형태를 극단적으로 불리하게 기술한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "伏吟相見淚淋淋",
        "복음에 해당하는 형태를 슬픔과 연결한다."
      ]
    ]
  },
  {
    "key": "nose.named.sword_edge",
    "label": "劍鋒鼻",
    "text": "鼻梁露脊如刀背，準頭無肉竈門關。兄弟無緣子剋盡。勞勞碌碌主孤單。",
    "d": [
      [
        "bridge",
        "鼻梁露脊如刀背",
        "비량의 뼈마루가 칼등처럼 드러난다고 기술"
      ],
      [
        "tip",
        "準頭無肉",
        "준두에 살이 없다고 기술"
      ],
      [
        "nostril",
        "竈門關",
        "조문이 닫힌다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "whole_life",
        "challenging",
        "兄弟無緣",
        "형제와 인연이 없다고 기술한다."
      ],
      [
        "children_family",
        "whole_life",
        "challenging",
        "子剋盡",
        "자녀와의 관계를 극단적으로 불리하게 기술한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "勞勞碌碌主孤單",
        "분주하고 고단하며 외롭다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.indented",
    "label": "偏凹鼻",
    "text": "年壽低壓山根小，鼻面相生差不多。準頭臺尉些須見，不夭不貧疾見磨。",
    "d": [
      [
        "mid_bridge",
        "年壽低壓",
        "년수 부위가 낮게 눌린다고 기술"
      ],
      [
        "root",
        "山根小",
        "산근이 작다고 기술"
      ],
      [
        "tip",
        "準頭些須見",
        "준두가 조금 드러난다고 기술"
      ],
      [
        "side_wings",
        "臺尉些須見",
        "난대·정위가 조금 보인다고 기술"
      ]
    ],
    "c": [
      [
        "longevity",
        "whole_life",
        "neutral",
        "不夭",
        "요절하지 않는다고 기술한다."
      ],
      [
        "wealth",
        "whole_life",
        "neutral",
        "不貧",
        "빈곤하지는 않다고 기술한다."
      ],
      [
        "traditional_health",
        "whole_life",
        "challenging",
        "疾見磨",
        "질고로 시달린다는 전통적 건강 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.solitary_peak",
    "label": "孤峰鼻",
    "text": "鼻大無肉竈門開。兩顴低小鼻崔嵬。此鼻縱大無財積。若為僧道免哀哉。",
    "d": [
      [
        "whole_nose",
        "鼻大無肉",
        "코가 크지만 살이 없다고 기술"
      ],
      [
        "nostril",
        "竈門開",
        "조문이 열린다고 기술"
      ],
      [
        "context",
        "兩顴低小",
        "양 관골이 낮고 작다는 동반 조건"
      ],
      [
        "whole_nose",
        "鼻崔嵬",
        "코가 홀로 높이 솟는다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "challenging",
        "無財積",
        "재물이 쌓이지 않는다고 기술한다."
      ],
      [
        "life_course",
        "whole_life",
        "conditional",
        "若為僧道免哀哉",
        "승도 생활을 예외적 조건처럼 언급하는 전통 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.exposed_ridge",
    "label": "露脊鼻",
    "text": "鼻瘦露脊山根小，形容粗俗骨神昏。土無萬物皆零落，縱然平穩也孤貧。",
    "d": [
      [
        "whole_nose",
        "鼻瘦露脊",
        "코가 마르고 뼈마루가 드러난다고 기술"
      ],
      [
        "root",
        "山根小",
        "산근이 작다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "whole_life",
        "challenging",
        "形容粗俗",
        "형용이 거칠고 속되다고 평가한다."
      ],
      [
        "wealth",
        "whole_life",
        "challenging",
        "孤貧",
        "고독과 빈곤을 연결한다."
      ]
    ]
  },
  {
    "key": "nose.named.exposed_stove",
    "label": "露竈鼻",
    "text": "孔大鼻高竅又長，須知家下少衣糧。艱辛受苦多勞碌，末喪他鄉實可傷。",
    "d": [
      [
        "nostril",
        "孔大",
        "콧구멍이 크다고 기술"
      ],
      [
        "whole_nose",
        "鼻高",
        "코가 높다고 기술"
      ],
      [
        "nostril",
        "竅又長",
        "비공이 길다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "whole_life",
        "challenging",
        "家下少衣糧",
        "생활 물자가 부족하다고 기술한다."
      ],
      [
        "labor_livelihood",
        "whole_life",
        "challenging",
        "艱辛受苦多勞碌",
        "고생과 노동이 많다고 기술한다."
      ],
      [
        "life_course",
        "late",
        "challenging",
        "末喪他鄉",
        "말년에 타향에서 죽는다는 전통적 극단 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "nose.named.roe_deer",
    "label": "獐鼻",
    "text": "鼻小準尖庭竈露。金甲二櫃肉綳纏。徒勞遺蔭難居守。四復三番迍且邅。",
    "d": [
      [
        "whole_nose",
        "鼻小",
        "코가 작다고 기술"
      ],
      [
        "tip",
        "準尖",
        "준두가 뾰족하다고 기술"
      ],
      [
        "nostril",
        "庭竈露",
        "정위·조문이 드러난다고 기술"
      ],
      [
        "context",
        "金甲二櫃肉綳纏",
        "주변 금갑·양궤 부위의 살이 팽팽하다고 기술"
      ]
    ],
    "c": [
      [
        "inheritance",
        "whole_life",
        "challenging",
        "遺蔭難居守",
        "물려받은 기반을 지키기 어렵다고 기술한다."
      ],
      [
        "life_course",
        "whole_life",
        "challenging",
        "迍且邅",
        "거듭 막히고 곤란하다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.orangutan",
    "label": "猩鼻",
    "text": "猩猩之相鼻梁高，眉眼相挨粗髮毛，面闊脣掀身廣厚，寬懷德重貴英豪。",
    "d": [
      [
        "bridge",
        "鼻梁高",
        "비량이 높다고 기술"
      ],
      [
        "context",
        "眉眼相挨",
        "눈썹과 눈이 가까운 동반 조건"
      ],
      [
        "context",
        "粗髮毛",
        "털이 거칠다는 동반 조건"
      ],
      [
        "context",
        "面闊脣掀身廣厚",
        "넓은 얼굴·들린 입술·넓고 두터운 몸을 동반 조건으로 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "favorable",
        "寬懷德重",
        "마음이 넓고 덕이 무겁다고 기술한다."
      ],
      [
        "status",
        "whole_life",
        "favorable",
        "貴英豪",
        "귀하고 영웅적이라고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.deer",
    "label": "鹿鼻",
    "text": "鹿鼻豐齊準更圓，情寬步急義仁全。驚疑坐起渾無定，福祿增添得自然。",
    "d": [
      [
        "whole_nose",
        "豐齊",
        "풍성하고 가지런하다고 기술"
      ],
      [
        "tip",
        "準更圓",
        "준두가 더욱 둥글다고 기술"
      ],
      [
        "context",
        "步急",
        "걸음이 빠른 동반 조건"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "favorable",
        "情寬",
        "정이 넓다고 기술한다."
      ],
      [
        "integrity_trust",
        "whole_life",
        "favorable",
        "義仁全",
        "의와 인이 갖춰졌다고 기술한다."
      ],
      [
        "temperament",
        "whole_life",
        "mixed",
        "驚疑坐起渾無定",
        "놀람과 의심이 많고 행동이 안정되지 않는다고 기술한다."
      ],
      [
        "traditional_auspice",
        "whole_life",
        "favorable",
        "福祿增添",
        "복록이 더해진다고 기술한다."
      ]
    ]
  },
  {
    "key": "nose.named.ape",
    "label": "猿鼻",
    "text": "鼻竅小而口頗尖，猖狂輕躁不尊嚴，性靈嗔怒多憂慮，花果常時手好拈。",
    "d": [
      [
        "nostril",
        "鼻竅小",
        "비공이 작다고 기술"
      ],
      [
        "context",
        "口頗尖",
        "입이 꽤 뾰족한 동반 조건"
      ]
    ],
    "c": [
      [
        "temperament",
        "whole_life",
        "challenging",
        "猖狂輕躁不尊嚴",
        "경솔하고 조급하며 위엄이 부족하다고 기술한다."
      ],
      [
        "temperament",
        "whole_life",
        "mixed",
        "性靈嗔怒多憂慮",
        "영민함과 분노·걱정을 함께 기술한다."
      ],
      [
        "conduct_risk",
        "whole_life",
        "neutral",
        "花果常時手好拈",
        "과실류를 자주 집는 생활 습관 묘사를 기록한다."
      ]
    ]
  }
] as const;

export const NOSE_NAMED_FORM_SEMANTICS_FR311F: readonly NoseNamedFormSemanticRecordFR311F[] =
  Object.freeze(RAW_NAMED_FORMS.map((raw) => Object.freeze({
    formKey: raw.key,
    traditionalLabel: raw.label,
    sourceText: raw.text,
    sourceRefs: Object.freeze([GUJIN_634]),
    verificationState: 'gujin634_transcription_reviewed' as const,
    nlc1925DirectScanAdjudicated: false as const,
    descriptors: Object.freeze(raw.d.map(([region, sourceFragment, neutralGloss], index) => Object.freeze({
      descriptorId: `fr311f.${raw.key}.descriptor.${index + 1}`,
      region,
      sourceFragment,
      neutralGloss,
      neutralGeometryBindingAuthorized: false as const,
    }))),
    claims: Object.freeze(raw.c.map(([topicKey, lifeStage, polarity, sourceFragment, meaningSummary], index) => Object.freeze({
      claimId: `fr311f.${raw.key}.claim.${index + 1}`,
      topicKey,
      lifeStage,
      polarity,
      sourceFragment,
      meaningSummary,
      historicalTraditionalDoctrineOnly: true as const,
      modernScientificFactAuthorized: false as const,
      productInterpretationAuthorized: false as const,
    }))),
    namedFormToNeutralClassifierAuthorized: false as const,
  })));

export const FR311F_SOURCE_BOUNDARY = Object.freeze({
  shenxiangOfficerBaselineSourceRef: GUJIN_632,
  noseSemanticSourceRef: GUJIN_634,
  neutralGeometryEqualsTraditionalRegion: false as const,
  pronasaleEqualsZhuntouAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  providerLandmarkBindingAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311f_duplicate:${path}`);
}

export function assertNoseTraditionalSemanticsFR311F(): void {
  if (NOSE_TRADITIONAL_REGIONS_FR311F.length !== 9) {
    throw new Error('fr311f_requires_9_regions');
  }
  if (NOSE_NAMED_FORM_SEMANTICS_FR311F.length !== 24) {
    throw new Error('fr311f_requires_24_named_forms');
  }
  if (NOSE_DIRECT_RULES_FR311F.length < 15) {
    throw new Error('fr311f_direct_rule_floor_not_met');
  }

  assertUnique(NOSE_TRADITIONAL_REGIONS_FR311F.map((item) => item.regionKey), 'region_key');
  assertUnique(NOSE_DIRECT_RULES_FR311F.map((item) => item.ruleId), 'direct_rule');
  assertUnique(NOSE_NAMED_FORM_SEMANTICS_FR311F.map((item) => item.formKey), 'named_form');
  assertUnique(
    NOSE_NAMED_FORM_SEMANTICS_FR311F.flatMap((item) => item.descriptors.map((descriptor) => descriptor.descriptorId)),
    'descriptor_id',
  );
  assertUnique(
    NOSE_NAMED_FORM_SEMANTICS_FR311F.flatMap((item) => item.claims.map((claim) => claim.claimId)),
    'claim_id',
  );

  for (const region of NOSE_TRADITIONAL_REGIONS_FR311F) {
    if (region.neutralGeometryBindingAuthorized !== false) {
      throw new Error(`fr311f_region_binding_widening:${region.regionKey}`);
    }
  }

  for (const rule of NOSE_DIRECT_RULES_FR311F) {
    if (rule.historicalTraditionalDoctrineOnly !== true ||
        rule.modernScientificFactAuthorized !== false ||
        rule.productInterpretationAuthorized !== false) {
      throw new Error(`fr311f_direct_rule_authority_drift:${rule.ruleId}`);
    }
  }

  for (const form of NOSE_NAMED_FORM_SEMANTICS_FR311F) {
    if (form.nlc1925DirectScanAdjudicated !== false) {
      throw new Error(`fr311f_scan_authority_widening:${form.formKey}`);
    }
    if (form.namedFormToNeutralClassifierAuthorized !== false) {
      throw new Error(`fr311f_classifier_authority_widening:${form.formKey}`);
    }
    if (form.descriptors.length === 0 || form.claims.length === 0) {
      throw new Error(`fr311f_incomplete_named_form:${form.formKey}`);
    }
  }

  for (const [key, value] of Object.entries(FR311F_SOURCE_BOUNDARY)) {
    if (key.endsWith('Authorized') && value !== false) {
      throw new Error(`fr311f_authority_boundary_widening:${key}`);
    }
  }
}
