export type EarCrossRegionAuditClassFR311M =
  | 'direct_cross_region_relation'
  | 'direct_cross_region_combination'
  | 'named_form_context'
  | 'descriptive_companion'
  | 'phrase_boundary_uncertain'
  | 'excluded_non_relation';

export type EarCrossRegionPolarityFR311M =
  | 'favorable'
  | 'challenging'
  | 'mixed'
  | 'conditional'
  | 'neutral';

export interface EarCrossRegionParticipantFR311M {
  readonly region: string;
  readonly sourceLocalKey: string;
}

export interface EarCrossRegionAuditCandidateFR311M {
  readonly candidateId: string;
  readonly sourceVolume: 631 | 632 | 633 | 634;
  readonly sourceSection: string;
  readonly sourceExpression: string;
  readonly earParticipant: string;
  readonly otherParticipants: readonly EarCrossRegionParticipantFR311M[];
  readonly adjudication: EarCrossRegionAuditClassFR311M;
  readonly decisionReason: string;
  readonly sourceRefs: readonly string[];
  readonly verificationState: 'wikisource_transcription_reviewed' | 'phrase_boundary_uncertain';
  readonly generalizationAuthorized: boolean;
  readonly reusedEvidenceRef: string | null;
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

export interface EarCrossRegionDirectEvidenceFR311M {
  readonly evidenceId: string;
  readonly candidateId: string;
  readonly evidenceKind: 'direct_cross_region_relation' | 'direct_cross_region_combination';
  readonly relationKey: string | null;
  readonly combinationKey: string | null;
  readonly sourceExpression: string;
  readonly meaningSummary: string;
  readonly topicKeys: readonly string[];
  readonly polarity: EarCrossRegionPolarityFR311M | null;
  readonly lifeStage: string | null;
  readonly relationTarget: string | null;
  readonly sourceRefs: readonly string[];
  readonly evidenceOwner: 'fr311m' | 'fr311k';
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

type CandidateSeedFR311M = Omit<
  EarCrossRegionAuditCandidateFR311M,
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
>;

function candidate(value: CandidateSeedFR311M): EarCrossRegionAuditCandidateFR311M {
  const direct =
    value.adjudication === 'direct_cross_region_relation' ||
    value.adjudication === 'direct_cross_region_combination';
  if (value.generalizationAuthorized !== direct) {
    throw new Error('fr311m_invalid_generalization:' + value.candidateId);
  }
  return Object.freeze({
    ...value,
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

const CANDIDATE_SEEDS_FR311M: readonly CandidateSeedFR311M[] = Object.freeze(
[
  {
    "candidateId": "fr311m.audit.631.cheekbone_into_ear_longevity",
    "sourceVolume": 631,
    "sourceSection": "相骨",
    "sourceExpression": "顴骨相連入耳，名王梁骨，主壽考",
    "earParticipant": "顴骨相連入耳",
    "otherParticipants": [
      {
        "region": "cheekbone",
        "sourceLocalKey": "顴骨"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "관골이 귀로 이어지는 관계 자체를 王梁骨이라 명명하고 壽考 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.631.bone_level_with_ear_general_bone",
    "sourceVolume": 631,
    "sourceSection": "相骨",
    "sourceExpression": "骨齊耳為將軍骨",
    "earParticipant": "耳",
    "otherParticipants": [
      {
        "region": "bone",
        "sourceLocalKey": "骨齊耳"
      }
    ],
    "adjudication": "descriptive_companion",
    "decisionReason": "귀 높이를 기준으로 將軍骨을 명명하지만 이 관계 자체에 별도 결과 의미를 붙이지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.631.eye_wave_reaches_ear_official",
    "sourceVolume": 631,
    "sourceSection": "十觀",
    "sourceExpression": "眼為監察官，黑白分明，神藏不露，黑如漆，白如玉，波長射耳，自然清秀有威，此監察官成也",
    "earParticipant": "耳",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "波長射耳"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "눈의 여러 조건과 波長射耳를 한 묶음으로 제시하고 監察官成을 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.631.ear_official_high_brow_bundle",
    "sourceVolume": 631,
    "sourceSection": "十觀",
    "sourceExpression": "耳為採聽官，不論大小，止要輪廓分明，喜白過面，對面不見耳，高眉一寸，輪厚廓堅，紅潤姿色，內有長毫，孔小不大，此採聽官成也",
    "earParticipant": "耳 / 高眉一寸",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "高眉一寸"
      },
      {
        "region": "face",
        "sourceLocalKey": "白過面"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "귀의 여러 조건과 눈썹보다 높은 위치·얼굴 대비 색 조건을 묶어 採聽官成을 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.631.ear_behind_heavy_cheek",
    "sourceVolume": 631,
    "sourceSection": "十觀",
    "sourceExpression": "若高低粗露尖削，耳後見重腮，地府不成也",
    "earParticipant": "耳後",
    "otherParticipants": [
      {
        "region": "cheek_lower_face",
        "sourceLocalKey": "見重腮"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀 뒤에서 무거운 볼이 보이는 위치 관계를 地府不成의 직접 조건으로 둔다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.631.shape_surplus_reuse",
    "sourceVolume": 631,
    "sourceSection": "論形有餘",
    "sourceExpression": "額闊四方，脣紅齒白，耳圓成輪，鼻直如膽，眼分黑白，眉秀疏長",
    "earParticipant": "耳圓成輪",
    "otherParticipants": [
      {
        "region": "forehead",
        "sourceLocalKey": "額闊四方"
      },
      {
        "region": "lip_teeth",
        "sourceLocalKey": "脣紅齒白"
      },
      {
        "region": "nose",
        "sourceLocalKey": "鼻直如膽"
      },
      {
        "region": "eye",
        "sourceLocalKey": "眼分黑白"
      },
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉秀疏長"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "FR311K가 이미 다부위 形有餘 직접 조합으로 승인한 근거를 귀 역방향 감사에서 재사용한다.",
    "sourceRefs": [
      "witness.gujin473.art631.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": "fr311k.combination.shape_surplus_lip_teeth_whole_face"
  },
  {
    "candidateId": "fr311m.audit.632.five_officials_late_reuse",
    "sourceVolume": 632,
    "sourceSection": "達摩五官總論",
    "sourceExpression": "眉緊鼻端平，耳須聳又明，海口仰弓形，晚運必通亨",
    "earParticipant": "耳須聳又明",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉緊"
      },
      {
        "region": "nose",
        "sourceLocalKey": "鼻端平"
      },
      {
        "region": "mouth",
        "sourceLocalKey": "海口仰弓形"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "FR311K가 이미 五官 다부위 직접 조합으로 승인한 근거를 재사용한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": "fr311k.combination.five_officials_late_fortune"
  },
  {
    "candidateId": "fr311m.audit.632.ear_official_above_brow_bundle",
    "sourceVolume": 632,
    "sourceSection": "採聽官",
    "sourceExpression": "耳須要色鮮，高聳過於眉，輪廓完成，貼肉敦厚，風門寬大者，謂之採聽官成",
    "earParticipant": "高聳過於眉",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "귀의 색·위치·輪廓·貼肉·風門 조건 전체를 採聽官成에 직접 연결한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.ear_lower_than_brow",
    "sourceVolume": 632,
    "sourceSection": "一曰耳為採聽官",
    "sourceExpression": "亦不欲低於眉也。詩曰：偏堂降地，破祖無疑，兄弟稀少，自身不利。又曰：降地耳低於眉",
    "earParticipant": "耳低於眉",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 눈썹보다 낮은 관계를 降地로 명시하고 불리한 전통 의미를 직접 연결한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.ear_higher_than_brow",
    "sourceVolume": 632,
    "sourceSection": "一曰耳為採聽官",
    "sourceExpression": "高聳過於眉也。耳為君，眉為臣。高起過眉者，主貴聰明文學，才俊富貴也。耳高眉一寸，永不受貧困",
    "earParticipant": "耳高過眉 / 耳高眉一寸",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 눈썹보다 높은 관계 자체에 귀함·총명·문학·부귀 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.ear_level_sun_corner",
    "sourceVolume": 632,
    "sourceSection": "一曰耳為採聽官",
    "sourceExpression": "耳齊日角，曰大貴。耳能齊日角，曾服不死藥。又主平生病少壽長，才智過人",
    "earParticipant": "耳齊日角",
    "otherParticipants": [
      {
        "region": "forehead_traditional",
        "sourceLocalKey": "日角"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 日角과 나란한 관계 자체에 지위·장수·재능 관련 전통 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.ear_droops_shoulder",
    "sourceVolume": 632,
    "sourceSection": "一曰耳為採聽官",
    "sourceExpression": "耳大四寸，高聳垂肩者，主大貴壽長",
    "earParticipant": "耳垂肩",
    "otherParticipants": [
      {
        "region": "shoulder",
        "sourceLocalKey": "肩"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 어깨까지 드리운 관계를 대귀·장수와 직접 연결한다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.goldwood_star_above_brow_eye",
    "sourceVolume": 632,
    "sourceSection": "五星六曜訣斷詩",
    "sourceExpression": "金木星是耳，貴要輪廓分明，風門闊，端正不反，不尖不小，更是高過眉眼，白色如銀樣大好，其人發祿",
    "earParticipant": "高過眉眼",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      },
      {
        "region": "eye",
        "sourceLocalKey": "眼"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "귀의 여러 형태 조건과 눈썹·눈보다 높은 위치를 한 묶음으로 제시해 發祿 의미를 붙인다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.three_stops_forehead_ear_gate",
    "sourceVolume": 632,
    "sourceSection": "三才三停論",
    "sourceExpression": "面上三停仔細看，額高須得耳門寬，學堂三部奚堪足，空有文章恐不官",
    "earParticipant": "耳門寬",
    "otherParticipants": [
      {
        "region": "forehead",
        "sourceLocalKey": "額高"
      }
    ],
    "adjudication": "descriptive_companion",
    "decisionReason": "이마와 耳門을 같은 시구에서 병렬 제시하지만 어느 결합 조건에 결과가 귀속되는지 분리하기 어렵다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.four_rivers_taxonomy",
    "sourceVolume": 632,
    "sourceSection": "四瀆",
    "sourceExpression": "耳為江，目為河，口為淮，鼻為濟",
    "earParticipant": "耳為江",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "目為河"
      },
      {
        "region": "mouth",
        "sourceLocalKey": "口為淮"
      },
      {
        "region": "nose",
        "sourceLocalKey": "鼻為濟"
      }
    ],
    "adjudication": "excluded_non_relation",
    "decisionReason": "부위별 四瀆 대응표이며 귀와 다른 부위 사이의 관계/조합 조건이 아니다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.632.six_fu_boundary_tiger_ear",
    "sourceVolume": 632,
    "sourceSection": "六府論",
    "sourceExpression": "中二府自命門至虎耳",
    "earParticipant": "虎耳",
    "otherParticipants": [
      {
        "region": "face_region_boundary",
        "sourceLocalKey": "命門"
      }
    ],
    "adjudication": "excluded_non_relation",
    "decisionReason": "六府의 범위 경계를 기술하는 위치 정의로서 귀와 타부위의 결과 의미 관계가 아니다.",
    "sourceRefs": [
      "witness.gujin473.art632.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.rich_pattern_composite",
    "sourceVolume": 633,
    "sourceSection": "富格例",
    "sourceExpression": "形厚神安，氣清聲揚，眉闊耳厚，脣紅鼻直，面方背厚，腰正皮滑，腹垂牛齒鵝行，已上皆富貴相也",
    "earParticipant": "耳厚",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉闊"
      },
      {
        "region": "lip",
        "sourceLocalKey": "脣紅"
      },
      {
        "region": "nose",
        "sourceLocalKey": "鼻直"
      },
      {
        "region": "face_body",
        "sourceLocalKey": "面方背厚"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "다부위 조건 묶음 전체를 富貴相으로 직접 판정한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.great_wealth_composite",
    "sourceVolume": 633,
    "sourceSection": "大富格",
    "sourceExpression": "耳大貼肉，鼻如截筒，鼻如懸膽，面黑身白，背聳三山，聲如遠鐘，背闊胸平，腹大垂下，頭皮寬大，主大富也",
    "earParticipant": "耳大貼肉",
    "otherParticipants": [
      {
        "region": "nose",
        "sourceLocalKey": "鼻如截筒 / 懸膽"
      },
      {
        "region": "face_body",
        "sourceLocalKey": "面黑身白"
      },
      {
        "region": "back_chest",
        "sourceLocalKey": "背闊胸平"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "귀를 포함한 다부위 조건 묶음 전체에 大富 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.middle_noble_reuse",
    "sourceVolume": 633,
    "sourceSection": "中貴格",
    "sourceExpression": "鬚如鐵線，耳白過面，眼如點漆，上長下短，口如四字，三十六牙，龍吞虎吻，此為中貴之相也",
    "earParticipant": "耳白過面",
    "otherParticipants": [
      {
        "region": "beard",
        "sourceLocalKey": "鬚如鐵線"
      },
      {
        "region": "eye",
        "sourceLocalKey": "眼如點漆"
      },
      {
        "region": "mouth",
        "sourceLocalKey": "口如四字"
      },
      {
        "region": "teeth",
        "sourceLocalKey": "三十六牙"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "FR311K가 이미 中貴格 다부위 직접 조합으로 승인한 근거를 재사용한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": "fr311k.combination.middle_noble"
  },
  {
    "candidateId": "fr311m.audit.633.noble_ear_face_forehead_boundary",
    "sourceVolume": 633,
    "sourceSection": "貴相口訣",
    "sourceExpression": "額有角起，聲音清亮，耳白如面，額有愨頭稜者貴",
    "earParticipant": "耳白如面",
    "otherParticipants": [
      {
        "region": "forehead",
        "sourceLocalKey": "額有角起 / 額有愨頭稜"
      },
      {
        "region": "face",
        "sourceLocalKey": "面"
      }
    ],
    "adjudication": "phrase_boundary_uncertain",
    "decisionReason": "현 전사 구두점만으로 耳白如面이 독립 조건인지 뒤의 額 조건과 결합된 귀속인지 확정하기 어렵다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "phrase_boundary_uncertain",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.cheekbone_through_ear_longevity",
    "sourceVolume": 633,
    "sourceSection": "壽相格",
    "sourceExpression": "顴骨重貫耳者壽",
    "earParticipant": "貫耳",
    "otherParticipants": [
      {
        "region": "cheekbone",
        "sourceLocalKey": "顴骨"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "관골이 귀까지 관통·이어지는 관계 자체에 壽 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.cheekbone_ear_back_high_bone",
    "sourceVolume": 633,
    "sourceSection": "壽相格",
    "sourceExpression": "顴骨相連入耳後，骨高起，年壽上不陷者，主壽",
    "earParticipant": "相連入耳後",
    "otherParticipants": [
      {
        "region": "cheekbone",
        "sourceLocalKey": "顴骨"
      },
      {
        "region": "bone",
        "sourceLocalKey": "骨高起"
      },
      {
        "region": "nose_life_regions",
        "sourceLocalKey": "年壽上不陷"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "관골이 귀 뒤로 이어지고 골격·年壽 조건이 함께 성립하는 묶음에 壽 의미를 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.longevity_checklist",
    "sourceVolume": 633,
    "sourceSection": "壽相格",
    "sourceExpression": "五嶽豐隆，法令分明，眉有長毫，項有餘皮，額有橫骨，面皮寬厚，聲音清響，背肉負厚，胸前平闊，齒齊堅密，行坐端莊，兩目有神，耳有長毫，鼻梁高聳，已上皆壽相也",
    "earParticipant": "耳有長毫",
    "otherParticipants": [
      {
        "region": "whole_body",
        "sourceLocalKey": "多部位列舉"
      }
    ],
    "adjudication": "descriptive_companion",
    "decisionReason": "여러 독립 壽相 징표의 병렬 목록으로서 귀와 특정 타부위의 관계나 결합 조건을 만들지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.four_reversals_reuse",
    "sourceVolume": 633,
    "sourceSection": "四反格",
    "sourceExpression": "耳無輪，口無稜，鼻仰孔，目無神",
    "earParticipant": "耳無輪",
    "otherParticipants": [
      {
        "region": "mouth",
        "sourceLocalKey": "口無稜"
      },
      {
        "region": "nose",
        "sourceLocalKey": "鼻仰孔"
      },
      {
        "region": "eye",
        "sourceLocalKey": "目無神"
      }
    ],
    "adjudication": "descriptive_companion",
    "decisionReason": "FR311K와 동일하게 四反格 구성항목 목록일 뿐 네 조건의 결합 결과를 별도로 기술하지 않는다고 판정한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": "fr311k.audit.633.four_reversals"
  },
  {
    "candidateId": "fr311m.audit.633.cheekbone_line_ear_temple",
    "sourceVolume": 633,
    "sourceSection": "相面",
    "sourceExpression": "顴骨有壽紋入耳，若兼入鬢者貴",
    "earParticipant": "壽紋入耳",
    "otherParticipants": [
      {
        "region": "cheekbone",
        "sourceLocalKey": "顴骨"
      },
      {
        "region": "temple_hairline",
        "sourceLocalKey": "入鬢"
      }
    ],
    "adjudication": "direct_cross_region_combination",
    "decisionReason": "관골의 壽紋이 귀로 들어가고 다시 鬢까지 이어지는 결합 조건에 貴 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.cheek_visible_behind_ear",
    "sourceVolume": 633,
    "sourceSection": "相面",
    "sourceExpression": "腮骨大開闊，耳後見者心毒",
    "earParticipant": "耳後見",
    "otherParticipants": [
      {
        "region": "cheek_lower_face",
        "sourceLocalKey": "腮骨"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "볼뼈가 귀 뒤에서 보이는 위치 관계 자체에 전통적 행실 판단을 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.calling_phoenix_eye_ear_phrase",
    "sourceVolume": 633,
    "sourceSection": "鳴鳳眼",
    "sourceExpression": "上層波起亦分明，視耳睜睜不露神",
    "earParticipant": "視耳",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "鳴鳳眼"
      }
    ],
    "adjudication": "phrase_boundary_uncertain",
    "decisionReason": "視耳의 정확한 형태 관계와 문장 경계를 현 전사만으로 확정하기 어려워 직접 관계로 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "phrase_boundary_uncertain",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.fuxi_eye_ear_hair",
    "sourceVolume": 633,
    "sourceSection": "伏犀眼",
    "sourceExpression": "頭圓眼大兩眉濃，耳內毫長體厚豐，此目信聰台鼎位，定教富貴壽如松",
    "earParticipant": "耳內毫長",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "眼大"
      },
      {
        "region": "eyebrow",
        "sourceLocalKey": "兩眉濃"
      },
      {
        "region": "head_body",
        "sourceLocalKey": "頭圓 / 體厚豐"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "伏犀眼 명명형 시구 내부의 귀 동반 조건이며 일반 귀×눈 조합으로 분리하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.partridge_eye_small_ear",
    "sourceVolume": 633,
    "sourceSection": "鷓鴣眼",
    "sourceExpression": "眼赤黃兮面帶紅，搖頭征步貌非隆。小身小耳常看地，一生終不足珍豐",
    "earParticipant": "小耳",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "眼赤黃 / 常看地"
      },
      {
        "region": "face_body",
        "sourceLocalKey": "面帶紅 / 小身"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "鷓鴣眼 명명형 내부의 小耳 조건이며 독립 귀×눈 의미식으로 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.633.front_view_ear_invisible",
    "sourceVolume": 633,
    "sourceSection": "相面",
    "sourceExpression": "對面不見耳，問是誰家子。主大貴",
    "earParticipant": "對面不見耳",
    "otherParticipants": [
      {
        "region": "whole_face_view",
        "sourceLocalKey": "對面"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "정면에서 귀가 보이지 않는 귀-얼굴 배치 관계에 大貴 의미가 직접 붙는다.",
    "sourceRefs": [
      "witness.gujin473.art633.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.earlobe_toward_mouth_simple",
    "sourceVolume": 634,
    "sourceSection": "相耳",
    "sourceExpression": "輪廓分明，聰悟垂珠朝口者，主財壽",
    "earParticipant": "垂珠朝口",
    "otherParticipants": [
      {
        "region": "mouth",
        "sourceLocalKey": "口"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귓불이 입을 향하는 관계 자체에 財壽 의미를 직접 귀속하며 기존 FR311K relation key에 추가 provenance로 붙인다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.ear_droops_shoulder_general",
    "sourceVolume": 634,
    "sourceSection": "相耳訣",
    "sourceExpression": "兩耳垂肩，貴不可言",
    "earParticipant": "耳垂肩",
    "otherParticipants": [
      {
        "region": "shoulder",
        "sourceLocalKey": "肩"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 어깨까지 드리우는 관계에 貴 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.ear_white_as_face_general",
    "sourceVolume": 634,
    "sourceSection": "相耳訣",
    "sourceExpression": "耳白如面，名滿天下",
    "earParticipant": "耳白如面",
    "otherParticipants": [
      {
        "region": "face",
        "sourceLocalKey": "面"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀의 색이 얼굴처럼 희다는 상대 조건에 명성 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.ear_higher_than_eye",
    "sourceVolume": 634,
    "sourceSection": "許負相耳篇",
    "sourceExpression": "耳高於目，合受他祿",
    "earParticipant": "耳高於目",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "目"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 눈보다 높은 관계 자체에 他祿 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.one_inch_above_brow_uncertain",
    "sourceVolume": 634,
    "sourceSection": "許負相耳篇",
    "sourceExpression": "高，如眉一寸，永不踐貧困",
    "earParticipant": "高，如眉一寸",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "phrase_boundary_uncertain",
    "decisionReason": "귀가 생략된 채 구두점에 의존하는 현 전사만으로 독립 관계식을 확정하지 않는다. 632권의 명시적 耳高眉一寸 근거는 별도 직접 관계로 보존한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "phrase_boundary_uncertain",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.eye_can_see_ear_uncertain",
    "sourceVolume": 634,
    "sourceSection": "許負相耳篇",
    "sourceExpression": "目能自睹者吉",
    "earParticipant": "目能自睹",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "目"
      }
    ],
    "adjudication": "phrase_boundary_uncertain",
    "decisionReason": "自睹의 목적어와 귀-눈 관계가 원문에서 명시되지 않아 직접 관계로 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "phrase_boundary_uncertain",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.ear_whiter_than_face",
    "sourceVolume": 634,
    "sourceSection": "許負相耳篇",
    "sourceExpression": "耳白於面，名滿赤縣",
    "earParticipant": "耳白於面",
    "otherParticipants": [
      {
        "region": "face",
        "sourceLocalKey": "面"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "귀가 얼굴보다 희다는 상대 색 조건에 명성 의미를 직접 귀속한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.earlobe_toward_mouth_reuse",
    "sourceVolume": 634,
    "sourceSection": "許負相耳篇",
    "sourceExpression": "下有垂珠肉色光，更來朝口富榮昌",
    "earParticipant": "垂珠朝口",
    "otherParticipants": [
      {
        "region": "mouth",
        "sourceLocalKey": "口"
      }
    ],
    "adjudication": "direct_cross_region_relation",
    "decisionReason": "FR311K가 이미 승인한 귀↔입 朝口 관계를 중복 key 없이 재사용한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": true,
    "reusedEvidenceRef": "fr311k.relation.earlobe_toward_mouth"
  },
  {
    "candidateId": "fr311m.audit.634.tiger_ear_front_invisible",
    "sourceVolume": 634,
    "sourceSection": "虎耳",
    "sourceExpression": "耳小輪廓又缺破，對面不見始為奇",
    "earParticipant": "對面不見",
    "otherParticipants": [
      {
        "region": "whole_face_view",
        "sourceLocalKey": "對面"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "虎耳 명명형 내부의 정면 비가시 조건이며 일반 관계식으로 자동 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.arrow_feather_above_brow",
    "sourceVolume": 634,
    "sourceSection": "箭羽耳",
    "sourceExpression": "上節高眉寸有餘，下生箭羽沒垂珠",
    "earParticipant": "上節高眉寸有餘",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "箭羽耳 명명형 구성 조건으로서 일반 귀×눈썹 관계 의미를 자동 생성하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.metal_ear_brow_face",
    "sourceVolume": 634,
    "sourceSection": "金耳",
    "sourceExpression": "高眉一寸天輪小，耳白過面並垂珠，富貴聞名於朝野，只嫌損子末時孤",
    "earParticipant": "高眉一寸 / 耳白過面",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      },
      {
        "region": "face",
        "sourceLocalKey": "面"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "金耳 명명형 내부의 눈썹·얼굴 대비 조건이며 독립 일반식으로 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.wood_ear_face",
    "sourceVolume": 634,
    "sourceSection": "木耳",
    "sourceExpression": "輪飛廓反六親薄，尤恐資財不足家。面部若好碌碌度，不然貧苦定虛花",
    "earParticipant": "面部若好",
    "otherParticipants": [
      {
        "region": "whole_face",
        "sourceLocalKey": "面部"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "木耳 명명형 내부의 얼굴 전체 조건 문맥이다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.water_ear_above_eye",
    "sourceVolume": 634,
    "sourceSection": "水耳",
    "sourceExpression": "水耳厚圓高過目，又兼貼腦有垂珠，硬堅紅潤如卓立，宜是人間大丈夫",
    "earParticipant": "高過目",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "目"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "水耳 명명형 내부의 눈 대비 높이 조건으로 보존한다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.fire_ear_brow",
    "sourceVolume": 634,
    "sourceSection": "火耳",
    "sourceExpression": "高眉輪尖廓且反，縱有垂珠不足誇",
    "earParticipant": "高眉",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "火耳 명명형 내부의 눈썹 대비 조건이다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.fire_ear_shangen_wochan",
    "sourceVolume": 634,
    "sourceSection": "火耳",
    "sourceExpression": "山根臥蠶若相應，末年無子壽彌加",
    "earParticipant": "火耳 문맥",
    "otherParticipants": [
      {
        "region": "shangen",
        "sourceLocalKey": "山根"
      },
      {
        "region": "wochan",
        "sourceLocalKey": "臥蠶"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "火耳 명명형 내부에서 山根·臥蠶의 상응을 조건으로 둔 문맥이며 일반 귀×산근×와잠 공식으로 분리하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.drooping_shoulder_ear_brow_head_forehead",
    "sourceVolume": 634,
    "sourceSection": "垂肩耳",
    "sourceExpression": "耳厚廓豐珠橐肩，過眉潤澤色明鮮。頭圓額潤形容異，九五之尊奪尚賢",
    "earParticipant": "過眉 / 珠橐肩",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      },
      {
        "region": "head",
        "sourceLocalKey": "頭圓"
      },
      {
        "region": "forehead",
        "sourceLocalKey": "額潤"
      },
      {
        "region": "shoulder",
        "sourceLocalKey": "肩"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "垂肩耳 명명형 전체의 복합 문맥이며 각 하위 조건을 독립 일반식으로 승격하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.close_brain_ear_brow_eye",
    "sourceVolume": 634,
    "sourceSection": "貼腦耳",
    "sourceExpression": "兩耳貼腦輪廓堅，壓眉壓眼是高賢。六親昆玉皆豪貴，百世流芳樂自然",
    "earParticipant": "壓眉壓眼",
    "otherParticipants": [
      {
        "region": "eyebrow",
        "sourceLocalKey": "眉"
      },
      {
        "region": "eye",
        "sourceLocalKey": "眼"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "貼腦耳 명명형 내부의 눈썹·눈 대비 조건이다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  },
  {
    "candidateId": "fr311m.audit.634.mouse_ear_above_eye",
    "sourceVolume": 634,
    "sourceSection": "鼠耳",
    "sourceExpression": "鼠耳高飛根反尖，縱然過目不為亨。鼠盜狗偷常不改，末年破敗喪牢檐",
    "earParticipant": "過目",
    "otherParticipants": [
      {
        "region": "eye",
        "sourceLocalKey": "目"
      }
    ],
    "adjudication": "named_form_context",
    "decisionReason": "鼠耳 명명형 내부의 눈 대비 조건이며 일반 귀×눈 의미로 분리하지 않는다.",
    "sourceRefs": [
      "witness.gujin473.art634.wikisource"
    ],
    "verificationState": "wikisource_transcription_reviewed",
    "generalizationAuthorized": false,
    "reusedEvidenceRef": null
  }
]
);

export const EAR_CROSS_REGION_AUDIT_FR311M: readonly EarCrossRegionAuditCandidateFR311M[] =
  Object.freeze(CANDIDATE_SEEDS_FR311M.map(candidate));

function audit(candidateId: string): EarCrossRegionAuditCandidateFR311M {
  const item = EAR_CROSS_REGION_AUDIT_FR311M.find((candidate) => candidate.candidateId === candidateId);
  if (item === undefined) throw new Error('fr311m_missing_audit_candidate:' + candidateId);
  return item;
}

type DirectEvidenceSeedFR311M = Omit<
  EarCrossRegionDirectEvidenceFR311M,
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
>;

function directEvidence(value: DirectEvidenceSeedFR311M): EarCrossRegionDirectEvidenceFR311M {
  const source = audit(value.candidateId);
  if (source.adjudication !== value.evidenceKind || source.generalizationAuthorized !== true) {
    throw new Error('fr311m_direct_evidence_without_authorized_audit:' + value.candidateId);
  }
  if (value.evidenceKind === 'direct_cross_region_relation' && (value.relationKey === null || value.combinationKey !== null)) {
    throw new Error('fr311m_invalid_relation_evidence:' + value.evidenceId);
  }
  if (value.evidenceKind === 'direct_cross_region_combination' && (value.combinationKey === null || value.relationKey !== null)) {
    throw new Error('fr311m_invalid_combination_evidence:' + value.evidenceId);
  }
  if (value.evidenceOwner === 'fr311k' && source.reusedEvidenceRef !== value.evidenceId) {
    throw new Error('fr311m_reused_evidence_mismatch:' + value.evidenceId);
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

const DIRECT_EVIDENCE_SEEDS_FR311M: readonly DirectEvidenceSeedFR311M[] = Object.freeze(
[
  {
    "evidenceId": "fr311m.relation.cheekbone_into_ear.631",
    "candidateId": "fr311m.audit.631.cheekbone_into_ear_longevity",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "cheekbone_ear.cheekbone_connects_into_ear",
    "combinationKey": null,
    "meaningSummary": "관골이 귀로 이어지는 관계를 장수와 연결하는 전통 주장이다.",
    "topicKeys": [
      "longevity"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_behind_heavy_cheek.631",
    "candidateId": "fr311m.audit.631.ear_behind_heavy_cheek",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "cheek_ear.cheek_visible_behind_ear",
    "combinationKey": null,
    "meaningSummary": "귀 뒤에서 무거운 볼이 보이는 관계를 地府不成과 연결하는 전통 주장이다.",
    "topicKeys": [
      "traditional_auspice"
    ],
    "polarity": "challenging",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.eye_official_reaches_ear.631",
    "candidateId": "fr311m.audit.631.eye_wave_reaches_ear_official",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "eye_official.long_wave_reaches_ear",
    "meaningSummary": "눈의 지정 조건과 귀까지 이어지는 파형 묶음을 監察官成과 연결한다.",
    "topicKeys": [
      "traditional_auspice"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.ear_official_above_brow.631",
    "candidateId": "fr311m.audit.631.ear_official_high_brow_bundle",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "ear_official.complete_above_brow_bundle",
    "meaningSummary": "귀의 지정 조건과 눈썹 대비 높이 묶음을 採聽官成과 연결한다.",
    "topicKeys": [
      "traditional_auspice"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311k.combination.shape_surplus_lip_teeth_whole_face",
    "candidateId": "fr311m.audit.631.shape_surplus_reuse",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "whole_face.shape_surplus_with_red_lip_white_teeth",
    "meaningSummary": "FR311K의 다부위 形有餘 조합 근거를 귀 역방향 감사에서 재사용한다.",
    "topicKeys": [
      "longevity",
      "wealth"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311k"
  },
  {
    "evidenceId": "fr311k.combination.five_officials_late_fortune",
    "candidateId": "fr311m.audit.632.five_officials_late_reuse",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "five_officials.brow_nose_ear_mouth_late_fortune",
    "meaningSummary": "FR311K의 五官 말년 조합 근거를 재사용한다.",
    "topicKeys": [
      "life_course"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311k"
  },
  {
    "evidenceId": "fr311m.combo.ear_official_above_brow.632",
    "candidateId": "fr311m.audit.632.ear_official_above_brow_bundle",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "ear_official.complete_above_brow_bundle",
    "meaningSummary": "귀의 지정 조건과 눈썹보다 높은 위치 묶음을 採聽官成과 연결한다.",
    "topicKeys": [
      "traditional_auspice"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_lower_than_brow.632",
    "candidateId": "fr311m.audit.632.ear_lower_than_brow",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_eyebrow.ear_lower_than_brow",
    "combinationKey": null,
    "meaningSummary": "귀가 눈썹보다 낮은 관계를 불리한 전통 판단과 연결한다.",
    "topicKeys": [
      "family",
      "interpersonal_relations",
      "life_course"
    ],
    "polarity": "challenging",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_higher_than_brow.632",
    "candidateId": "fr311m.audit.632.ear_higher_than_brow",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_eyebrow.ear_higher_than_brow",
    "combinationKey": null,
    "meaningSummary": "귀가 눈썹보다 높은 관계를 귀함·총명·문학·부귀와 연결한다.",
    "topicKeys": [
      "status",
      "learning_talent",
      "wealth"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_level_sun_corner.632",
    "candidateId": "fr311m.audit.632.ear_level_sun_corner",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_forehead.ear_level_with_sun_corner",
    "combinationKey": null,
    "meaningSummary": "귀가 日角과 나란한 관계를 지위·장수·재능 관련 전통 의미와 연결한다.",
    "topicKeys": [
      "status",
      "longevity",
      "learning_talent"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_droops_shoulder.632",
    "candidateId": "fr311m.audit.632.ear_droops_shoulder",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_shoulder.ear_droops_to_shoulder",
    "combinationKey": null,
    "meaningSummary": "귀가 어깨까지 드리우는 관계를 대귀·장수와 연결한다.",
    "topicKeys": [
      "status",
      "longevity"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.goldwood_above_brow_eye.632",
    "candidateId": "fr311m.audit.632.goldwood_star_above_brow_eye",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "ear_star.goldwood_above_brow_eye_bundle",
    "meaningSummary": "귀의 지정 형태와 눈썹·눈보다 높은 위치 묶음을 發祿과 연결한다.",
    "topicKeys": [
      "livelihood",
      "wealth"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.rich_pattern_with_ear.633",
    "candidateId": "fr311m.audit.633.rich_pattern_composite",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "whole_face.rich_pattern_with_ear",
    "meaningSummary": "귀를 포함한 다부위 조건 묶음을 富貴相과 연결한다.",
    "topicKeys": [
      "wealth",
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.great_wealth_with_ear.633",
    "candidateId": "fr311m.audit.633.great_wealth_composite",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "whole_face.great_wealth_with_ear",
    "meaningSummary": "귀를 포함한 다부위 조건 묶음을 大富와 연결한다.",
    "topicKeys": [
      "wealth"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311k.combination.middle_noble",
    "candidateId": "fr311m.audit.633.middle_noble_reuse",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "whole_face.middle_noble_composite",
    "meaningSummary": "FR311K의 中貴格 다부위 조합 근거를 재사용한다.",
    "topicKeys": [
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311k"
  },
  {
    "evidenceId": "fr311m.relation.cheekbone_into_ear.633",
    "candidateId": "fr311m.audit.633.cheekbone_through_ear_longevity",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "cheekbone_ear.cheekbone_connects_into_ear",
    "combinationKey": null,
    "meaningSummary": "관골이 귀까지 이어지는 관계를 장수와 연결하는 추가 전통 근거다.",
    "topicKeys": [
      "longevity"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.cheekbone_ear_back_high_bone.633",
    "candidateId": "fr311m.audit.633.cheekbone_ear_back_high_bone",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "cheekbone_ear.high_bone_ear_back_longevity",
    "meaningSummary": "관골-귀뒤 연결과 골격·年壽 조건의 묶음을 장수와 연결한다.",
    "topicKeys": [
      "longevity"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.combo.cheekbone_ear_temple.633",
    "candidateId": "fr311m.audit.633.cheekbone_line_ear_temple",
    "evidenceKind": "direct_cross_region_combination",
    "relationKey": null,
    "combinationKey": "cheekbone_ear_temple.life_line_into_ear_and_temple",
    "meaningSummary": "관골의 壽紋이 귀와 鬢까지 이어지는 묶음을 貴와 연결한다.",
    "topicKeys": [
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.cheek_visible_behind_ear.633",
    "candidateId": "fr311m.audit.633.cheek_visible_behind_ear",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "cheek_ear.cheek_visible_behind_ear",
    "combinationKey": null,
    "meaningSummary": "볼뼈가 귀 뒤에서 보이는 관계에 전통적 행실 판단을 붙인다.",
    "topicKeys": [
      "conduct_risk"
    ],
    "polarity": "challenging",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.front_view_ear_invisible.633",
    "candidateId": "fr311m.audit.633.front_view_ear_invisible",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_face.not_visible_from_front",
    "combinationKey": null,
    "meaningSummary": "정면에서 귀가 보이지 않는 얼굴 배치 관계를 大貴와 연결한다.",
    "topicKeys": [
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.earlobe_toward_mouth.634a",
    "candidateId": "fr311m.audit.634.earlobe_toward_mouth_simple",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_mouth.earlobe_toward_mouth",
    "combinationKey": null,
    "meaningSummary": "귓불이 입을 향하는 관계를 財壽와 연결하는 추가 원문 근거다.",
    "topicKeys": [
      "wealth",
      "longevity"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_droops_shoulder.634",
    "candidateId": "fr311m.audit.634.ear_droops_shoulder_general",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_shoulder.ear_droops_to_shoulder",
    "combinationKey": null,
    "meaningSummary": "귀가 어깨까지 드리우는 관계를 귀함과 연결하는 추가 근거다.",
    "topicKeys": [
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_white_as_face.634",
    "candidateId": "fr311m.audit.634.ear_white_as_face_general",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_face.ear_white_as_face",
    "combinationKey": null,
    "meaningSummary": "귀의 색이 얼굴처럼 희다는 관계를 명성과 연결한다.",
    "topicKeys": [
      "reputation"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_higher_than_eye.634",
    "candidateId": "fr311m.audit.634.ear_higher_than_eye",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_eye.ear_higher_than_eye",
    "combinationKey": null,
    "meaningSummary": "귀가 눈보다 높은 관계를 他祿과 연결한다.",
    "topicKeys": [
      "livelihood"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311m.relation.ear_whiter_than_face.634",
    "candidateId": "fr311m.audit.634.ear_whiter_than_face",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_face.ear_whiter_than_face",
    "combinationKey": null,
    "meaningSummary": "귀가 얼굴보다 희다는 관계를 명성과 연결한다.",
    "topicKeys": [
      "reputation"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311m"
  },
  {
    "evidenceId": "fr311k.relation.earlobe_toward_mouth",
    "candidateId": "fr311m.audit.634.earlobe_toward_mouth_reuse",
    "evidenceKind": "direct_cross_region_relation",
    "relationKey": "ear_mouth.earlobe_toward_mouth",
    "combinationKey": null,
    "meaningSummary": "FR311K의 朝口 직접 관계 근거를 중복 key 없이 재사용한다.",
    "topicKeys": [
      "wealth",
      "status"
    ],
    "polarity": "favorable",
    "lifeStage": "whole_life",
    "relationTarget": null,
    "evidenceOwner": "fr311k"
  }
]
);

export const EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M:
readonly EarCrossRegionDirectEvidenceFR311M[] =
  Object.freeze(DIRECT_EVIDENCE_SEEDS_FR311M.map(directEvidence));

export interface EarCrossRegionResolutionInputFR311M {
  readonly relationKey?: string | null;
  readonly combinationKey?: string | null;
  readonly topicKeys?: readonly string[];
}

export interface EarCrossRegionResolutionFR311M {
  readonly status:
    | 'unsupported'
    | 'direct_source_relation'
    | 'direct_source_combination'
    | 'source_conflict';
  readonly evidence: readonly EarCrossRegionDirectEvidenceFR311M[];
  readonly conflictTopicKeys: readonly string[];
  readonly relationInferenceAuthorized: false;
  readonly combinationInferenceAuthorized: false;
  readonly sourcePriorityAuthorized: false;
  readonly sourceCountWeightingAuthorized: false;
  readonly reinforcementAuthorized: false;
  readonly cancellationAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

function hasOpposingPolarity(
  evidence: readonly EarCrossRegionDirectEvidenceFR311M[],
  topic: string,
): boolean {
  const polarities = new Set(
    evidence.filter((item) => item.topicKeys.includes(topic)).map((item) => item.polarity),
  );
  return polarities.has('favorable') && polarities.has('challenging');
}

export function resolveEarCrossRegionEvidenceFR311M(
  input: EarCrossRegionResolutionInputFR311M,
): EarCrossRegionResolutionFR311M {
  const relationKey = input.relationKey ?? null;
  const combinationKey = input.combinationKey ?? null;
  const invalidShape =
    (relationKey === null && combinationKey === null) ||
    (relationKey !== null && combinationKey !== null);

  const evidence = invalidShape
    ? []
    : EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter((item) =>
        relationKey !== null
          ? item.relationKey === relationKey
          : item.combinationKey === combinationKey,
      );

  const filtered =
    input.topicKeys === undefined
      ? evidence
      : evidence.filter((item) => item.topicKeys.some((topic) => input.topicKeys!.includes(topic)));

  const topics = [...new Set(filtered.flatMap((item) => item.topicKeys))];
  const conflictTopicKeys = topics.filter((topic) => hasOpposingPolarity(filtered, topic));

  const status: EarCrossRegionResolutionFR311M['status'] =
    filtered.length === 0
      ? 'unsupported'
      : conflictTopicKeys.length > 0
        ? 'source_conflict'
        : relationKey !== null
          ? 'direct_source_relation'
          : 'direct_source_combination';

  return Object.freeze({
    status,
    evidence: Object.freeze([...filtered]),
    conflictTopicKeys: Object.freeze(conflictTopicKeys),
    relationInferenceAuthorized: false as const,
    combinationInferenceAuthorized: false as const,
    sourcePriorityAuthorized: false as const,
    sourceCountWeightingAuthorized: false as const,
    reinforcementAuthorized: false as const,
    cancellationAuthorized: false as const,
    productInterpretationAuthorized: false as const,
  });
}

function countAudit(kind: EarCrossRegionAuditClassFR311M): number {
  return EAR_CROSS_REGION_AUDIT_FR311M.filter((item) => item.adjudication === kind).length;
}

export const EAR_CROSS_REGION_SUMMARY_FR311M = Object.freeze({
  candidateCount: EAR_CROSS_REGION_AUDIT_FR311M.length,
  directRelationCandidates: countAudit('direct_cross_region_relation'),
  directCombinationCandidates: countAudit('direct_cross_region_combination'),
  namedFormContexts: countAudit('named_form_context'),
  descriptiveCompanions: countAudit('descriptive_companion'),
  uncertainCandidates: countAudit('phrase_boundary_uncertain'),
  excludedCandidates: countAudit('excluded_non_relation'),
  directEvidenceRecords: EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.length,
  uniqueRelationKeys: new Set(
    EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M
      .map((item) => item.relationKey)
      .filter((value): value is string => value !== null),
  ).size,
  uniqueCombinationKeys: new Set(
    EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M
      .map((item) => item.combinationKey)
      .filter((value): value is string => value !== null),
  ).size,
  reusedFR311KEvidenceRefs: Object.freeze(
    EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M
      .filter((item) => item.evidenceOwner === 'fr311k')
      .map((item) => item.evidenceId),
  ),
  relationInferenceAuthorized: false as const,
  combinationInferenceAuthorized: false as const,
  sourcePriorityAuthorized: false as const,
  sourceCountWeightingAuthorized: false as const,
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
