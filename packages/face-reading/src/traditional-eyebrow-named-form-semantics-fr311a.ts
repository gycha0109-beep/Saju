import { TRADITIONAL_NAMED_FORMS_FR311 } from './traditional-eyebrow-eye-interpretation-fr311.js';

export type EyebrowSemanticTopicFR311A =
  | 'temperament'
  | 'intelligence'
  | 'integrity_trust'
  | 'conduct_risk'
  | 'wealth'
  | 'status'
  | 'career_reputation'
  | 'siblings'
  | 'parents'
  | 'spouse_relationship'
  | 'children_family'
  | 'kinship'
  | 'friendship'
  | 'interpersonal_relations'
  | 'patron_support'
  | 'longevity'
  | 'longevity_mortality'
  | 'legal_penalty'
  | 'traditional_auspice'
  | 'life_course';

export type EyebrowRelationTargetFR311A =
  | 'none'
  | 'parents'
  | 'father'
  | 'mother'
  | 'siblings'
  | 'spouse'
  | 'children'
  | 'descendants'
  | 'kin'
  | 'friends'
  | 'patron';

export type EyebrowLifeStageFR311A =
  | 'unspecified'
  | 'early'
  | 'middle'
  | 'late'
  | 'later'
  | 'middle_late'
  | 'earlier'
  | 'whole_life';

export type EyebrowTraditionalPolarityFR311A =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export interface EyebrowFormDescriptorFR311A {
  readonly descriptorId: string;
  readonly origin: 'title' | 'body' | 'context';
  readonly sourceFragment: string;
  readonly neutralGloss: string;
  readonly neutralMorphologyBindingAuthorized: false;
}

export interface EyebrowMeaningClaimFR311A {
  readonly claimId: string;
  readonly topicKey: EyebrowSemanticTopicFR311A;
  readonly relationTarget: EyebrowRelationTargetFR311A;
  readonly lifeStage: EyebrowLifeStageFR311A;
  readonly polarity: EyebrowTraditionalPolarityFR311A;
  readonly sourceFragment: string;
  readonly meaningSummary: string;
  readonly historicalTraditionalDoctrineOnly: true;
  readonly modernScientificFactAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

export interface EyebrowNamedFormSemanticRecordFR311A {
  readonly formKey: string;
  readonly traditionalLabel: string;
  readonly sourceText: string;
  readonly sourceLocator: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'gujin633_transcription_reviewed';
  readonly nlc1925DirectScanAdjudicated: false;
  readonly descriptors: readonly EyebrowFormDescriptorFR311A[];
  readonly claims: readonly EyebrowMeaningClaimFR311A[];
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
    "key": "eyebrow.named.ghost",
    "label": "鬼眉",
    "text": "眉粗壓眼心不善，假施仁義暗毒奸。百般生活無沾染，常思竊盜過平生。",
    "d": [
      [
        "title",
        "鬼眉",
        "귀미라는 전통 명명형"
      ],
      [
        "body",
        "眉粗",
        "거칠다고 기술된 눈썹"
      ],
      [
        "body",
        "壓眼",
        "눈을 누르듯 낮다고 기술된 눈썹"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "心不善",
        "원문은 성정을 부정적으로 판단한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "challenging",
        "假施仁義暗毒奸",
        "겉으로 인의를 베푸는 듯하나 속으로 간사하다고 기술한다."
      ],
      [
        "conduct_risk",
        "none",
        "whole_life",
        "challenging",
        "常思竊盜過平生",
        "평생 절도 행위를 생각한다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.sparse_scattered",
    "label": "疏散眉",
    "text": "平生財帛多興廢，不虧我用亦無餘。外和內淡如無有，始末虛盈更不舒。",
    "d": [
      [
        "title",
        "疏散",
        "성기고 흩어진다는 명명형 자체의 형태 표현"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "mixed",
        "平生財帛多興廢",
        "평생 재물의 성쇠가 잦다고 기술한다."
      ],
      [
        "interpersonal_relations",
        "none",
        "whole_life",
        "challenging",
        "外和內淡如無有",
        "겉으로 화합해 보여도 내적으로는 담박·소원하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.yellow_thin",
    "label": "黃薄眉",
    "text": "眉短疏散目且長，早年財帛有虛張，部位雖好發不久，神昏氣濁喪他鄉。",
    "d": [
      [
        "title",
        "黃薄",
        "누르고 엷다는 전통 명명형"
      ],
      [
        "body",
        "眉短疏散",
        "짧고 성기며 흩어진 눈썹"
      ],
      [
        "context",
        "目且長",
        "눈이 길다는 동반 조건"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "early",
        "challenging",
        "早年財帛有虛張",
        "초년 재물이 겉으로만 부풀거나 안정되지 않는 것으로 기술한다."
      ],
      [
        "life_course",
        "none",
        "unspecified",
        "challenging",
        "部位雖好發不久",
        "다른 부위가 좋아도 발달이 오래가지 않는다고 기술한다."
      ],
      [
        "longevity_mortality",
        "none",
        "unspecified",
        "challenging",
        "神昏氣濁喪他鄉",
        "신·기가 흐리고 탁한 경우 타향에서 죽는다는 전통적 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.broom",
    "label": "掃箒眉",
    "text": "前清後疏眉散朗，兄弟無情心妬欺。定有一二無後裔，老年財帛不如之。",
    "d": [
      [
        "title",
        "掃箒眉",
        "빗자루형이라는 전통 명명형"
      ],
      [
        "body",
        "前清後疏",
        "앞은 맑고 뒤는 성기다고 기술"
      ],
      [
        "body",
        "眉散朗",
        "눈썹이 흩어진다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "siblings",
        "whole_life",
        "challenging",
        "兄弟無情心妬欺",
        "형제 간 정이 없고 시기·기만이 있다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "unspecified",
        "challenging",
        "定有一二無後裔",
        "후사가 끊기는 자녀가 있을 수 있다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "late",
        "challenging",
        "老年財帛不如之",
        "노년 재물이 좋지 않다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.pointed_knife",
    "label": "尖刀眉",
    "text": "眉粗惡煞心奸險，見人一面假和情。執拘梟雄性兇暴，典刑不免喪其身。",
    "d": [
      [
        "title",
        "尖刀眉",
        "첨도형이라는 전통 명명형"
      ],
      [
        "body",
        "眉粗",
        "거친 눈썹"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "challenging",
        "心奸險",
        "간험한 성정으로 기술한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "challenging",
        "見人一面假和情",
        "대인 관계에서 겉으로만 화합하는 것으로 기술한다."
      ],
      [
        "legal_penalty",
        "none",
        "unspecified",
        "challenging",
        "典刑不免喪其身",
        "형벌을 피하기 어렵다는 전통적 판단을 기록한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.eight_character",
    "label": "八字眉",
    "text": "頭疏尾散壓奸門，到老數妻結不成。財帛一生足我用，子息終須倚螟蛉。",
    "d": [
      [
        "title",
        "八字眉",
        "팔자형이라는 전통 명명형"
      ],
      [
        "body",
        "頭疏",
        "눈썹 머리가 성김"
      ],
      [
        "body",
        "尾散",
        "눈썹 꼬리가 흩어짐"
      ],
      [
        "body",
        "壓奸門",
        "간문 쪽을 누른다고 기술"
      ]
    ],
    "c": [
      [
        "spouse_relationship",
        "spouse",
        "late",
        "challenging",
        "到老數妻結不成",
        "노년까지 배우자 관계가 안정되지 않는다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "財帛一生足我用",
        "평생 쓸 재물은 충분하다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "late",
        "challenging",
        "子息終須倚螟蛉",
        "자식 계승을 친생 자녀가 아닌 방식에 의존한다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.arhat",
    "label": "羅漢眉",
    "text": "此眉相中大不歡。妻遲子晚早艱難。晚年娶妾方一子。正妻不產主孤單。",
    "d": [
      [
        "title",
        "羅漢眉",
        "나한형이라는 전통 명명형"
      ]
    ],
    "c": [
      [
        "spouse_relationship",
        "spouse",
        "early",
        "challenging",
        "妻遲",
        "배우자 인연이 늦다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "early",
        "challenging",
        "子晚早艱難",
        "자녀가 늦고 초년이 어렵다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "late",
        "mixed",
        "晚年娶妾方一子",
        "말년에 첩을 두어 한 자녀를 얻는다고 기술한다."
      ],
      [
        "spouse_relationship",
        "spouse",
        "whole_life",
        "challenging",
        "正妻不產主孤單",
        "정실의 출산이 없고 고독하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.dragon",
    "label": "龍眉",
    "text": "眉秀彎彎毫且稀，鴈行六七拜丹墀。父母清壽皆齊貴，拔萃超群天下奇。",
    "d": [
      [
        "title",
        "龍眉",
        "용미라는 전통 명명형"
      ],
      [
        "body",
        "眉秀彎彎",
        "수려하고 굽은 눈썹"
      ],
      [
        "body",
        "毫且稀",
        "털이 성기다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "鴈行六七拜丹墀",
        "형제가 여럿이며 관직과 연결되는 것으로 기술한다."
      ],
      [
        "parents",
        "parents",
        "whole_life",
        "favorable",
        "父母清壽皆齊貴",
        "부모의 수명과 귀함을 좋게 기술한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "拔萃超群天下奇",
        "뛰어나고 출중한 인물로 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.willow_leaf",
    "label": "柳葉眉",
    "text": "眉粗帶濁濁中清，骨肉情疏生子遲，友交忠信貴人盼，定須發達顯揚名。",
    "d": [
      [
        "title",
        "柳葉眉",
        "유엽형이라는 전통 명명형"
      ],
      [
        "body",
        "眉粗帶濁濁中清",
        "거칠고 탁함 속에 맑음이 섞인다고 기술"
      ]
    ],
    "c": [
      [
        "kinship",
        "kin",
        "whole_life",
        "challenging",
        "骨肉情疏",
        "혈족 간 정이 소원하다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "unspecified",
        "challenging",
        "生子遲",
        "자녀가 늦다고 기술한다."
      ],
      [
        "friendship",
        "friends",
        "whole_life",
        "favorable",
        "友交忠信",
        "친구 관계에서 충성과 신의를 얻는다고 기술한다."
      ],
      [
        "patron_support",
        "patron",
        "whole_life",
        "favorable",
        "貴人盼",
        "귀인의 주목·도움을 받는다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "定須發達顯揚名",
        "발달하여 이름을 드러낸다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.sword",
    "label": "劍眉",
    "text": "眉若山林秀且長，威權智識輔君王。縱貧不日成清貴，孫子行行後且康。",
    "d": [
      [
        "title",
        "劍眉",
        "검형이라는 전통 명명형"
      ],
      [
        "body",
        "秀且長",
        "수려하고 길다고 기술"
      ]
    ],
    "c": [
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "威權",
        "권위와 연결한다."
      ],
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "智識",
        "지식·판단 능력을 좋게 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "輔君王",
        "군왕을 보좌하는 지위와 연결한다."
      ],
      [
        "status",
        "none",
        "later",
        "favorable",
        "縱貧不日成清貴",
        "가난하더라도 뒤에 청귀해진다고 기술한다."
      ],
      [
        "children_family",
        "descendants",
        "late",
        "favorable",
        "孫子行行後且康",
        "후손이 뒤에 편안하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.lion",
    "label": "獅子眉",
    "text": "眉毫粗濁喜高眼。此相須當發達遲。三停得配獅形像。富貴榮華老更輝。",
    "d": [
      [
        "title",
        "獅子眉",
        "사자형이라는 전통 명명형"
      ],
      [
        "body",
        "眉毫粗濁",
        "눈썹 털이 거칠고 탁함"
      ],
      [
        "body",
        "喜高眼",
        "눈보다 높은 배치를 좋게 기술"
      ]
    ],
    "c": [
      [
        "life_course",
        "none",
        "early",
        "challenging",
        "發達遲",
        "발달이 늦다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "late",
        "conditional",
        "三停得配獅形像，富貴榮華老更輝",
        "삼정과 사자형이 맞는다는 조건에서 노년의 부귀영화를 기술한다."
      ],
      [
        "status",
        "none",
        "late",
        "conditional",
        "富貴榮華老更輝",
        "조건이 맞을 때 노년의 귀함을 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.clear_front_sparse_back",
    "label": "前清後疏眉",
    "text": "眉清尾散散中清，早歲功名財帛平，中歲末年名利遂，收成顯擢耀門庭。",
    "d": [
      [
        "title",
        "前清後疏",
        "앞은 맑고 뒤는 성기다는 전통 명명형"
      ],
      [
        "body",
        "眉清尾散",
        "눈썹은 맑고 꼬리는 흩어짐"
      ],
      [
        "body",
        "散中清",
        "흩어짐 속에 맑음이 있다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "none",
        "early",
        "neutral",
        "早歲功名財帛平",
        "초년의 공명은 평범하다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "early",
        "neutral",
        "早歲功名財帛平",
        "초년 재물은 평범하다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "middle",
        "favorable",
        "中歲末年名利遂",
        "중년 이후 명리가 이루어진다고 기술한다."
      ],
      [
        "status",
        "none",
        "late",
        "favorable",
        "收成顯擢耀門庭",
        "말년에 두드러진 발탁·가문의 영화를 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.light_clear",
    "label": "輕清眉",
    "text": "眉秀彎長尾帶疏，飛翔騰達拜皇都。榮華兄弟情皆順，交結相知亦似初。",
    "d": [
      [
        "title",
        "輕清眉",
        "가볍고 맑다는 전통 명명형"
      ],
      [
        "body",
        "眉秀彎長",
        "수려하고 굽으며 길다고 기술"
      ],
      [
        "body",
        "尾帶疏",
        "꼬리가 성기다고 기술"
      ]
    ],
    "c": [
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "飛翔騰達拜皇都",
        "출세하여 중앙 관직에 나아가는 것으로 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "兄弟情皆順",
        "형제 관계가 순조롭다고 기술한다."
      ],
      [
        "friendship",
        "friends",
        "whole_life",
        "favorable",
        "交結相知亦似初",
        "교우 관계가 처음처럼 유지된다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.short_refined",
    "label": "短促秀眉",
    "text": "秀短之眉壽且高，聯芳雙桂俊英豪。平生不違雞黍約，忠孝仁廉子亦高。",
    "d": [
      [
        "title",
        "短促秀眉",
        "짧고 수려하다는 전통 명명형"
      ],
      [
        "body",
        "秀短",
        "수려하고 짧다고 기술"
      ]
    ],
    "c": [
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "壽且高",
        "수명을 좋게 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "聯芳雙桂俊英豪",
        "형제 계열의 함께 드러남을 좋게 기술한다."
      ],
      [
        "integrity_trust",
        "none",
        "whole_life",
        "favorable",
        "平生不違雞黍約",
        "평생 약속을 어기지 않는다고 기술한다."
      ],
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "忠孝仁廉",
        "충·효·인·렴의 덕목과 연결한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "favorable",
        "子亦高",
        "자녀도 높아진다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.spiral",
    "label": "旋螺眉",
    "text": "旋螺之眉世間稀，威權得此正相宜，平常之人皆不利，英雄武職應天機。",
    "d": [
      [
        "title",
        "旋螺眉",
        "소용돌이형이라는 전통 명명형"
      ]
    ],
    "c": [
      [
        "status",
        "none",
        "whole_life",
        "conditional",
        "威權得此正相宜",
        "권위 있는 사람에게 어울린다고 기술한다."
      ],
      [
        "life_course",
        "none",
        "whole_life",
        "challenging",
        "平常之人皆不利",
        "평범한 사람에게는 불리하다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "conditional",
        "英雄武職應天機",
        "영웅·무직 계열에 적합하다는 조건부 해석을 기록한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.one_character",
    "label": "一字眉",
    "text": "毫清首尾皆如蓋，富貴堪誇壽且高。少年發達登科早，夫婦齊眉到白頭。",
    "d": [
      [
        "title",
        "一字眉",
        "일자미라는 전통 명명형"
      ],
      [
        "body",
        "毫清",
        "눈썹 털이 맑다고 기술"
      ],
      [
        "body",
        "首尾皆如蓋",
        "머리와 꼬리가 덮개처럼 이어진다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "favorable",
        "富貴堪誇",
        "부귀를 좋게 기술한다."
      ],
      [
        "status",
        "none",
        "whole_life",
        "favorable",
        "富貴堪誇",
        "귀함을 좋게 기술한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "壽且高",
        "수명을 좋게 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "early",
        "favorable",
        "少年發達登科早",
        "소년기에 발달하고 과거에 일찍 오른다고 기술한다."
      ],
      [
        "spouse_relationship",
        "spouse",
        "whole_life",
        "favorable",
        "夫婦齊眉到白頭",
        "부부가 백두까지 함께한다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.silkworm",
    "label": "臥蠶眉",
    "text": "眉彎帶秀心中巧，宛轉機關甚可人。早歲鰲頭宜可占，鴈行猶恐弗相親。",
    "d": [
      [
        "title",
        "臥蠶眉",
        "와잠형이라는 전통 명명형"
      ],
      [
        "body",
        "眉彎帶秀",
        "굽고 수려하다고 기술"
      ]
    ],
    "c": [
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "心中巧，宛轉機關",
        "기지가 있고 기민하다고 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "early",
        "favorable",
        "早歲鰲頭宜可占",
        "초년에 과거·우등과 연결한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "challenging",
        "鴈行猶恐弗相親",
        "형제 관계가 친하지 않을 수 있다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.new_moon",
    "label": "新月眉",
    "text": "眉清目秀最為良，又喜眉尾拂天倉。棠棣怡怡皆富貴，他年及第拜朝堂。",
    "d": [
      [
        "title",
        "新月眉",
        "신월형이라는 전통 명명형"
      ],
      [
        "body",
        "眉清",
        "눈썹이 맑다고 기술"
      ],
      [
        "context",
        "目秀",
        "눈이 수려하다는 동반 조건"
      ],
      [
        "body",
        "眉尾拂天倉",
        "눈썹 꼬리가 천창에 닿는다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "棠棣怡怡",
        "형제 간 화목을 기술한다."
      ],
      [
        "wealth",
        "siblings",
        "whole_life",
        "favorable",
        "皆富貴",
        "형제 모두의 부귀를 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "later",
        "favorable",
        "他年及第拜朝堂",
        "뒤에 과거에 급제해 조정에 나아간다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.tiger",
    "label": "虎眉",
    "text": "此眉雖粗且有威，平生膽志有施為。不富終能成大貴，遐齡鶴筭鴈行虧。",
    "d": [
      [
        "title",
        "虎眉",
        "호미라는 전통 명명형"
      ],
      [
        "body",
        "雖粗且有威",
        "거칠지만 위엄이 있다고 기술"
      ]
    ],
    "c": [
      [
        "temperament",
        "none",
        "whole_life",
        "favorable",
        "膽志有施為",
        "담력과 뜻, 실행력이 있다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "neutral",
        "不富",
        "부유하지 않을 수 있다고 기술한다."
      ],
      [
        "status",
        "none",
        "later",
        "favorable",
        "終能成大貴",
        "뒤에는 크게 귀해진다고 기술한다."
      ],
      [
        "longevity",
        "none",
        "whole_life",
        "favorable",
        "遐齡鶴筭",
        "장수를 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "challenging",
        "鴈行虧",
        "형제 관계 또는 형제 수의 결손을 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.small_broom",
    "label": "小掃箒眉",
    "text": "若濃若大毫不粗，齊拂天倉尾不枯。兄弟背情分南北，骨肉刑傷不可無。",
    "d": [
      [
        "title",
        "小掃箒眉",
        "소소추형이라는 전통 명명형"
      ],
      [
        "body",
        "若濃若大毫不粗",
        "짙고 크지만 털은 거칠지 않다고 기술"
      ],
      [
        "body",
        "齊拂天倉尾不枯",
        "천창에 고르게 닿고 꼬리가 마르지 않는다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "siblings",
        "whole_life",
        "challenging",
        "兄弟背情分南北",
        "형제가 정을 등지고 떨어져 지낸다고 기술한다."
      ],
      [
        "kinship",
        "kin",
        "whole_life",
        "challenging",
        "骨肉刑傷不可無",
        "혈족 간 손상·형극이 있다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.large_short",
    "label": "大短促眉",
    "text": "短秀毫清尾略黃，眉頭豎立最為良。貲財來往難居積，子俊妻和鴈侶強。",
    "d": [
      [
        "title",
        "大短促眉",
        "대단촉형이라는 전통 명명형"
      ],
      [
        "body",
        "短秀毫清",
        "짧고 수려하며 털이 맑다고 기술"
      ],
      [
        "body",
        "尾略黃",
        "꼬리가 약간 누르다고 기술"
      ],
      [
        "body",
        "眉頭豎立",
        "눈썹 머리가 세워졌다고 기술"
      ]
    ],
    "c": [
      [
        "wealth",
        "none",
        "whole_life",
        "challenging",
        "貲財來往難居積",
        "재물이 오가며 축적되기 어렵다고 기술한다."
      ],
      [
        "children_family",
        "children",
        "whole_life",
        "favorable",
        "子俊",
        "자녀가 뛰어나다고 기술한다."
      ],
      [
        "spouse_relationship",
        "spouse",
        "whole_life",
        "favorable",
        "妻和",
        "배우자와 화목하다고 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "鴈侶強",
        "형제 계열을 강하다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.clear_refined",
    "label": "清秀眉",
    "text": "秀彎長順過天倉，蓋目入鬢更清長。聰明早歲登科第，弟恭兄友姓名香。",
    "d": [
      [
        "title",
        "清秀眉",
        "청수미라는 전통 명명형"
      ],
      [
        "body",
        "秀彎長順",
        "수려하고 굽으며 길고 순하다고 기술"
      ],
      [
        "body",
        "過天倉",
        "천창을 지난다고 기술"
      ],
      [
        "body",
        "蓋目入鬢",
        "눈을 덮고 관자 부근으로 들어간다고 기술"
      ],
      [
        "body",
        "更清長",
        "더욱 맑고 길다고 기술"
      ]
    ],
    "c": [
      [
        "intelligence",
        "none",
        "whole_life",
        "favorable",
        "聰明",
        "총명함을 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "early",
        "favorable",
        "早歲登科第",
        "초년에 과거에 오른다고 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "whole_life",
        "favorable",
        "弟恭兄友",
        "형제 간 공경과 우애를 기술한다."
      ],
      [
        "career_reputation",
        "none",
        "whole_life",
        "favorable",
        "姓名香",
        "이름이 드러난다고 기술한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.interrupted",
    "label": "間斷眉",
    "text": "若黃若淡有勾絞，兄弟無緣有必傷。財帛進退多興廢，後損爹兮先損娘。",
    "d": [
      [
        "title",
        "間斷眉",
        "끊어진다는 전통 명명형"
      ],
      [
        "body",
        "若黃若淡",
        "누르거나 옅다고 기술"
      ],
      [
        "body",
        "有勾絞",
        "갈고리·얽힘 같은 형태가 있다고 기술"
      ]
    ],
    "c": [
      [
        "siblings",
        "siblings",
        "whole_life",
        "challenging",
        "兄弟無緣有必傷",
        "형제 인연이 약하고 손상이 있다고 기술한다."
      ],
      [
        "wealth",
        "none",
        "whole_life",
        "challenging",
        "財帛進退多興廢",
        "재물의 진퇴와 성쇠가 잦다고 기술한다."
      ],
      [
        "parents",
        "mother",
        "earlier",
        "challenging",
        "先損娘",
        "어머니의 손실을 먼저 언급한다."
      ],
      [
        "parents",
        "father",
        "later",
        "challenging",
        "後損爹",
        "아버지의 손실을 뒤에 언급한다."
      ]
    ]
  },
  {
    "key": "eyebrow.named.crossed",
    "label": "交加眉",
    "text": "最嫌此眉主大凶，中年末景陷牢中，破家累及兄和弟，父在西兮母在東。",
    "d": [
      [
        "title",
        "交加眉",
        "교차·얽힘을 뜻하는 전통 명명형"
      ]
    ],
    "c": [
      [
        "traditional_auspice",
        "none",
        "whole_life",
        "challenging",
        "主大凶",
        "전통적으로 크게 흉하다고 평가한다."
      ],
      [
        "legal_penalty",
        "none",
        "middle_late",
        "challenging",
        "中年末景陷牢中",
        "중년 이후 감옥에 빠진다는 전통적 판단을 기록한다."
      ],
      [
        "wealth",
        "none",
        "middle_late",
        "challenging",
        "破家",
        "가산 파탄을 기술한다."
      ],
      [
        "siblings",
        "siblings",
        "middle_late",
        "challenging",
        "累及兄和弟",
        "형제에게까지 누가 미친다고 기술한다."
      ],
      [
        "parents",
        "parents",
        "whole_life",
        "challenging",
        "父在西兮母在東",
        "부모가 서로 떨어져 있는 상태로 기술한다."
      ]
    ]
  }
] as const;

export const EYEBROW_NAMED_FORM_SEMANTICS_FR311A: readonly EyebrowNamedFormSemanticRecordFR311A[] =
  Object.freeze(RAW_FORMS.map((raw) => Object.freeze({
    formKey: raw.key,
    traditionalLabel: raw.label,
    sourceText: raw.text,
    sourceLocator: `${GUJIN_633}#${encodeURIComponent(raw.label)}`,
    sourceRefs: SOURCE_REFS,
    verificationState: 'gujin633_transcription_reviewed' as const,
    nlc1925DirectScanAdjudicated: false as const,
    descriptors: Object.freeze(raw.d.map(([origin, sourceFragment, neutralGloss], index) => Object.freeze({
      descriptorId: `fr311a.${raw.key}.descriptor.${index + 1}`,
      origin,
      sourceFragment,
      neutralGloss,
      neutralMorphologyBindingAuthorized: false as const,
    }))),
    claims: Object.freeze(raw.c.map(([topicKey, relationTarget, lifeStage, polarity, sourceFragment, meaningSummary], index) => Object.freeze({
      claimId: `fr311a.${raw.key}.claim.${index + 1}`,
      topicKey,
      relationTarget,
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

export const FR311A_AUTHORITY_BOUNDARY = Object.freeze({
  treatsInbokAsPrimarySourceConcept: false as const,
  aggregatesRelationalClaimsIntoScore: false as const,
  namedFormToNeutralClassifierAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  providerGeometryBindingAuthorized: false as const,
  modernPsychologyOrMedicalFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
  nlc1925DirectScanAdjudicationClaimed: false as const,
});

const INBOK_RELATION_TARGETS = new Set<EyebrowRelationTargetFR311A>([
  'parents',
  'father',
  'mother',
  'siblings',
  'spouse',
  'children',
  'descendants',
  'kin',
  'friends',
  'patron',
]);

export interface InbokEvidenceLensResultFR311A {
  readonly lensKey: 'inbok_relational_evidence';
  readonly status: 'direct_relational_evidence_found' | 'no_direct_relational_evidence';
  readonly formKey: string;
  readonly claimIds: readonly string[];
  readonly aggregateJudgementAuthorized: false;
  readonly scoreAuthorized: false;
  readonly reason: string;
}

export function queryInbokRelationalEvidenceFR311A(formKey: string): InbokEvidenceLensResultFR311A {
  const record = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.find((candidate) => candidate.formKey === formKey);
  if (record === undefined) {
    throw new Error(`fr311a_unknown_form:${formKey}`);
  }

  const matching = record.claims.filter(
    (claim) =>
      INBOK_RELATION_TARGETS.has(claim.relationTarget) ||
      claim.topicKey === 'interpersonal_relations' ||
      claim.topicKey === 'friendship' ||
      claim.topicKey === 'patron_support' ||
      claim.topicKey === 'kinship',
  );

  return Object.freeze({
    lensKey: 'inbok_relational_evidence' as const,
    status: matching.length > 0
      ? 'direct_relational_evidence_found' as const
      : 'no_direct_relational_evidence' as const,
    formKey,
    claimIds: Object.freeze(matching.map((claim) => claim.claimId)),
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    reason: matching.length > 0
      ? '인복은 원전 고유 점수로 만들지 않고, 형제·친족·교우·귀인·가족 관계의 직접 주장만 조회한다.'
      : '이 명명형의 현재 직접 원문에는 인복 렌즈에 해당하는 관계 주장이 없다. 다른 의미를 관계 운으로 변환하지 않는다.',
  });
}

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr311a_duplicate:${path}`);
}

export function assertEyebrowNamedFormSemanticsFR311A(): void {
  if (EYEBROW_NAMED_FORM_SEMANTICS_FR311A.length !== 24) {
    throw new Error('fr311a_requires_24_eyebrow_forms');
  }

  const upstreamKeys = TRADITIONAL_NAMED_FORMS_FR311
    .filter((entry) => entry.region === 'eyebrow')
    .map((entry) => entry.formKey)
    .sort();
  const localKeys = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.map((entry) => entry.formKey).sort();

  if (JSON.stringify(upstreamKeys) !== JSON.stringify(localKeys)) {
    throw new Error('fr311a_fr311_form_key_coverage_mismatch');
  }

  assertUnique(localKeys, 'form_key');
  assertUnique(
    EYEBROW_NAMED_FORM_SEMANTICS_FR311A.flatMap((entry) => entry.descriptors.map((descriptor) => descriptor.descriptorId)),
    'descriptor_id',
  );
  assertUnique(
    EYEBROW_NAMED_FORM_SEMANTICS_FR311A.flatMap((entry) => entry.claims.map((claim) => claim.claimId)),
    'claim_id',
  );

  for (const entry of EYEBROW_NAMED_FORM_SEMANTICS_FR311A) {
    if (entry.sourceText.trim().length === 0) throw new Error(`fr311a_empty_source_text:${entry.formKey}`);
    if (entry.sourceLocator.trim().length === 0) throw new Error(`fr311a_empty_source_locator:${entry.formKey}`);
    if (entry.descriptors.length === 0) throw new Error(`fr311a_missing_descriptor:${entry.formKey}`);
    if (entry.claims.length === 0) throw new Error(`fr311a_missing_claim:${entry.formKey}`);
    if (entry.verificationState !== 'gujin633_transcription_reviewed') {
      throw new Error(`fr311a_verification_state_drift:${entry.formKey}`);
    }
    if (entry.nlc1925DirectScanAdjudicated !== false) {
      throw new Error(`fr311a_nlc_scan_authority_widening:${entry.formKey}`);
    }
    if (entry.namedFormToNeutralClassifierAuthorized !== false) {
      throw new Error(`fr311a_classifier_authority_widening:${entry.formKey}`);
    }

    for (const descriptor of entry.descriptors) {
      if (descriptor.sourceFragment.trim().length === 0) throw new Error(`fr311a_empty_descriptor:${descriptor.descriptorId}`);
      if (descriptor.neutralMorphologyBindingAuthorized !== false) {
        throw new Error(`fr311a_neutral_binding_widening:${descriptor.descriptorId}`);
      }
    }

    for (const claim of entry.claims) {
      if (claim.sourceFragment.trim().length === 0) throw new Error(`fr311a_empty_claim_fragment:${claim.claimId}`);
      if (claim.meaningSummary.trim().length === 0) throw new Error(`fr311a_empty_claim_summary:${claim.claimId}`);
      if (claim.historicalTraditionalDoctrineOnly !== true) {
        throw new Error(`fr311a_historical_boundary_drift:${claim.claimId}`);
      }
      if (claim.modernScientificFactAuthorized !== false) {
        throw new Error(`fr311a_modern_fact_authority_widening:${claim.claimId}`);
      }
      if (claim.productInterpretationAuthorized !== false) {
        throw new Error(`fr311a_product_authority_widening:${claim.claimId}`);
      }
    }
  }

  for (const [key, flag] of Object.entries(FR311A_AUTHORITY_BOUNDARY)) {
    if (flag !== false) throw new Error(`fr311a_authority_boundary_widening:${key}`);
  }
}
