export type StaticStructureKindFR311S =
  | 'five_officers'
  | 'five_mountains'
  | 'four_waterways'
  | 'six_ministries'
  | 'three_divisions'
  | 'thirteen_parts'
  | 'twelve_palaces'
  | 'five_stars_six_luminaries'
  | 'four_study_halls'
  | 'eight_study_halls'
  | 'five_element_forms';

export interface StaticStructureMemberFR311S {
  readonly memberKey: string;
  readonly traditionalLabel: string;
  readonly sourceLocatorExpression: string;
  readonly neutralGloss: string;
}

export interface StaticMethodologyDefinitionFR311S {
  readonly methodologyId: string;
  readonly structureKind: StaticStructureKindFR311S;
  readonly lineageId: string;
  readonly sourceSection: string;
  readonly sourceRefs: readonly string[];
  readonly members: readonly StaticStructureMemberFR311S[];
  readonly researchState: 'source_structure_reviewed';
  readonly lineagePinned: true;
  readonly canonicalCrossLineageMergeAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly productionRegionMapAuthorized: false;
  readonly metricThresholdAuthorized: false;
  readonly populationNormAuthorized: false;
  readonly automaticTraditionalBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
  readonly modernScientificFactAuthorized: false;
}

export interface SupplementalPalaceTreatmentFR311S {
  readonly treatmentId: 'fr311s.gujin631.twelve_palaces.parent_palace_supplement';
  readonly sourceSection: '神相全編一.十二宮總訣';
  readonly traditionalLabel: '父母宮';
  readonly sourceLocatorExpression: '日月角';
  readonly sourceRefs: readonly string[];
  readonly includedInNumberedTwelvePalaces: false;
  readonly canonicalCrossLineageMergeAuthorized: false;
  readonly neutralGeometryBindingAuthorized: false;
  readonly productInterpretationAuthorized: false;
}

const GUJIN_631 = 'witness.gujin473.art631.wikisource';
const GUJIN_632 = 'witness.gujin473.art632.wikisource';

function member(
  memberKey: string,
  traditionalLabel: string,
  sourceLocatorExpression: string,
  neutralGloss: string,
): StaticStructureMemberFR311S {
  return Object.freeze({
    memberKey,
    traditionalLabel,
    sourceLocatorExpression,
    neutralGloss,
  });
}

function methodology(
  methodologyId: string,
  structureKind: StaticStructureKindFR311S,
  lineageId: string,
  sourceSection: string,
  sourceRef: string,
  members: readonly StaticStructureMemberFR311S[],
): StaticMethodologyDefinitionFR311S {
  return Object.freeze({
    methodologyId,
    structureKind,
    lineageId,
    sourceSection,
    sourceRefs: Object.freeze([sourceRef]),
    members: Object.freeze([...members]),
    researchState: 'source_structure_reviewed' as const,
    lineagePinned: true as const,
    canonicalCrossLineageMergeAuthorized: false as const,
    neutralGeometryBindingAuthorized: false as const,
    productionRegionMapAuthorized: false as const,
    metricThresholdAuthorized: false as const,
    populationNormAuthorized: false as const,
    automaticTraditionalBindingAuthorized: false as const,
    productInterpretationAuthorized: false as const,
    modernScientificFactAuthorized: false as const,
  });
}

export const FIVE_OFFICERS_FR311S = methodology(
  'fr311s.gujin632.five_officers',
  'five_officers',
  'shenxiang_quanbian.gujin632',
  '神相全編二.五官說',
  GUJIN_632,
  [
    member('ear', '採聽官', '耳', '귀를 채청관으로 두는 전통 오관 배치'),
    member('eyebrow', '保壽官', '眉', '눈썹을 보수관으로 두는 전통 오관 배치'),
    member('eye', '監察官', '眼', '눈을 감찰관으로 두는 전통 오관 배치'),
    member('nose', '審辨官', '鼻', '코를 심변관으로 두는 전통 오관 배치'),
    member('mouth', '出納官', '口', '입을 출납관으로 두는 전통 오관 배치'),
  ],
);

export const FIVE_MOUNTAINS_FR311S = methodology(
  'fr311s.gujin632.five_mountains',
  'five_mountains',
  'shenxiang_quanbian.gujin632',
  '神相全編二.五嶽',
  GUJIN_632,
  [
    member('south', '衡山', '額', '이마를 남악으로 두는 전통 배치'),
    member('north', '恆山', '頦', '턱을 북악으로 두는 전통 배치'),
    member('center', '嵩山', '鼻', '코를 중악으로 두는 전통 배치'),
    member('east', '泰山', '左顴', '좌측 광대를 동악으로 두는 전통 배치'),
    member('west', '華山', '右顴', '우측 광대를 서악으로 두는 전통 배치'),
  ],
);

export const FOUR_WATERWAYS_FR311S = methodology(
  'fr311s.gujin632.four_waterways',
  'four_waterways',
  'shenxiang_quanbian.gujin632',
  '神相全編二.四瀆',
  GUJIN_632,
  [
    member('river_jiang', '江瀆', '耳', '귀를 강독으로 두는 전통 배치'),
    member('river_he', '河瀆', '目', '눈을 하독으로 두는 전통 배치'),
    member('river_huai', '淮瀆', '口', '입을 회독으로 두는 전통 배치'),
    member('river_ji', '濟瀆', '鼻', '코를 제독으로 두는 전통 배치'),
  ],
);

export const SIX_MINISTRIES_FR311S = methodology(
  'fr311s.gujin632.six_ministries',
  'six_ministries',
  'shenxiang_quanbian.gujin632',
  '神相全編二.六府論',
  GUJIN_632,
  [
    member(
      'upper_pair',
      '上二府 / 兩輔骨',
      '兩輔骨；自輔角至天倉',
      '상부 두 부를 양 보골 및 보각에서 천창까지의 전통 범위로 기술',
    ),
    member(
      'middle_pair',
      '中二府 / 兩顴骨',
      '兩顴骨；自命門至虎耳',
      '중부 두 부를 양 광대뼈 및 명문에서 호이까지의 전통 범위로 기술',
    ),
    member(
      'lower_pair',
      '下二府 / 兩頤骨',
      '兩頤骨；自肩骨至地閣',
      '하부 두 부를 양 이골 및 견골에서 지각까지의 전통 범위로 기술',
    ),
  ],
);

export const THREE_DIVISIONS_GUJIN631_FR311S = methodology(
  'fr311s.gujin631.face_three_divisions',
  'three_divisions',
  'shenxiang_quanbian.gujin631.face_three_divisions',
  '神相全編一.面三停',
  GUJIN_631,
  [
    member(
      'upper',
      '上停',
      '自髮際下至眉間',
      '발제에서 미간까지를 상정으로 두는 631권 계보',
    ),
    member(
      'middle',
      '中停',
      '自眉間下至鼻',
      '미간에서 코까지를 중정으로 두는 631권 계보',
    ),
    member(
      'lower',
      '下停',
      '自準下人中至頦',
      '준두 아래·인중에서 턱까지를 하정으로 두는 631권 계보',
    ),
  ],
);

export const THREE_DIVISIONS_GUJIN632_FR311S = methodology(
  'fr311s.gujin632.three_talents_three_divisions',
  'three_divisions',
  'shenxiang_quanbian.gujin632.three_talents_three_divisions',
  '神相全編二.三才三停論',
  GUJIN_632,
  [
    member(
      'upper',
      '上停',
      '自髮際至眉',
      '발제에서 눈썹까지를 상정으로 두는 632권 계보',
    ),
    member(
      'middle',
      '中停',
      '眉至準頭',
      '눈썹에서 준두까지를 중정으로 두는 632권 계보',
    ),
    member(
      'lower',
      '下停',
      '準頭至地閣',
      '준두에서 지각까지를 하정으로 두는 632권 계보',
    ),
    member(
      'talent_heaven',
      '天',
      '額',
      '삼재 문맥에서 이마를 천으로 두는 배치',
    ),
    member(
      'talent_human',
      '人',
      '鼻',
      '삼재 문맥에서 코를 인으로 두는 배치',
    ),
    member(
      'talent_earth',
      '地',
      '頦',
      '삼재 문맥에서 턱을 지로 두는 배치',
    ),
  ],
);

export const THIRTEEN_PARTS_FR311S = methodology(
  'fr311s.gujin631.thirteen_parts',
  'thirteen_parts',
  'shenxiang_quanbian.gujin631',
  '神相全編一.十三部位總歌',
  GUJIN_631,
  [
    member('01_tianzhong', '天中', '第一天中', '십삼부위 제1 천중'),
    member('02_tianting', '天庭', '第二天庭', '십삼부위 제2 천정'),
    member('03_sikong', '司空', '第三司空', '십삼부위 제3 사공'),
    member('04_zhongzheng', '中正', '第四中正', '십삼부위 제4 중정'),
    member('05_yintang', '印堂', '第五印堂', '십삼부위 제5 인당'),
    member('06_shangen', '山根', '第六山根', '십삼부위 제6 산근'),
    member('07_nianshang', '年上', '第七年上', '십삼부위 제7 년상'),
    member('08_shoushang', '壽上', '第八壽上', '십삼부위 제8 수상'),
    member('09_zhuntou', '準頭', '第九準頭', '십삼부위 제9 준두'),
    member('10_renzhong', '人中', '第十人中', '십삼부위 제10 인중'),
    member('11_shuixing', '水星', '十一水星', '십삼부위 제11 수성'),
    member('12_chengjiang', '承漿', '十二承漿', '십삼부위 제12 승장'),
    member('13_dige', '地閣', '十三地閣', '십삼부위 제13 지각'),
  ],
);

export const TWELVE_PALACES_FR311S = methodology(
  'fr311s.gujin631.twelve_palaces',
  'twelve_palaces',
  'shenxiang_quanbian.gujin631.numbered_twelve_palaces',
  '神相全編一.十二宮訣',
  GUJIN_631,
  [
    member('01_ming', '命宮', '兩眉之間，山根之上', '명궁의 원문상 위치 표현'),
    member('02_wealth', '財帛宮', '鼻乃財星', '재백궁의 주된 원문 위치 표현; 후속 문단의 창고계 부위는 별도 문맥으로 보존'),
    member('03_siblings', '兄弟宮', '位居兩眉', '형제궁의 원문상 위치 표현'),
    member('04_property', '田宅宮', '位居兩眼', '전택궁의 원문상 위치 표현'),
    member('05_children', '男女宮', '位居兩眼下，名曰淚堂', '남녀궁의 원문상 위치 표현'),
    member('06_servants', '奴僕宮', '位居地閣，重接水星', '노복궁의 원문상 위치 표현'),
    member('07_spouse', '妻妾宮', '位居魚尾，號曰奸門', '처첩궁의 원문상 위치 표현'),
    member('08_illness', '疾厄宮', '印堂之下，位居山根', '질액궁의 원문상 위치 표현'),
    member('09_migration', '遷移宮', '位居眉角，號曰天倉', '천이궁의 주된 원문 위치 표현'),
    member('10_official', '官祿宮', '位居中正，上合離宮', '관록궁의 원문상 위치 표현'),
    member('11_fortune', '福德宮', '位居天倉，牽連地閣', '복덕궁의 원문상 위치 표현'),
    member('12_appearance', '相貌宮', '先觀五嶽，次辨三停', '상모궁을 오악·삼정의 전체 구성으로 다루는 원문 표현'),
  ],
);

export const TWELVE_PALACE_SUPPLEMENT_FR311S:
SupplementalPalaceTreatmentFR311S = Object.freeze({
  treatmentId: 'fr311s.gujin631.twelve_palaces.parent_palace_supplement',
  sourceSection: '神相全編一.十二宮總訣',
  traditionalLabel: '父母宮',
  sourceLocatorExpression: '日月角',
  sourceRefs: Object.freeze([GUJIN_631]),
  includedInNumberedTwelvePalaces: false as const,
  canonicalCrossLineageMergeAuthorized: false as const,
  neutralGeometryBindingAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export const FIVE_STARS_SIX_LUMINARIES_FR311S = methodology(
  'fr311s.gujin632.five_stars_six_luminaries',
  'five_stars_six_luminaries',
  'shenxiang_quanbian.gujin632',
  '神相全編二.五星六曜說',
  GUJIN_632,
  [
    member('fire_star', '火星', '額', '화성을 이마에 대응시키는 정적 지역 배치'),
    member('purple_qi', '紫氣', '印堂', '자기를 인당에 대응시키는 정적 지역 배치'),
    member('earth_star', '土星', '鼻', '토성을 코에 대응시키는 정적 지역 배치'),
    member('wood_star', '木星', '右耳', '목성을 우측 귀에 대응시키는 정적 지역 배치'),
    member('metal_star', '金星', '左耳', '금성을 좌측 귀에 대응시키는 정적 지역 배치'),
    member('rahu', '羅㬋', '左眉', '라후를 좌측 눈썹에 대응시키는 정적 지역 배치'),
    member('ketu', '計都', '右眉', '계도를 우측 눈썹에 대응시키는 정적 지역 배치'),
    member('moon_apogee', '月孛', '山根', '월패를 산근에 대응시키는 정적 지역 배치'),
    member('taiyin', '太陰', '右眼', '태음을 우측 눈에 대응시키는 정적 지역 배치'),
    member('taiyang', '太陽', '左眼', '태양을 좌측 눈에 대응시키는 정적 지역 배치'),
    member('water_star', '水星', '口', '수성을 입에 대응시키는 정적 지역 배치'),
  ],
);

export const FOUR_STUDY_HALLS_FR311S = methodology(
  'fr311s.gujin631.four_study_halls',
  'four_study_halls',
  'shenxiang_quanbian.gujin631',
  '神相全編一.四學堂論',
  GUJIN_631,
  [
    member('official_hall', '官學堂', '眼', '눈을 관학당으로 두는 전통 배치'),
    member('emolument_hall', '祿學堂', '額', '이마를 녹학당으로 두는 전통 배치'),
    member('inner_hall', '內學堂', '當門兩齒', '앞니를 내학당으로 두는 전통 배치'),
    member('outer_hall', '外學堂', '耳門之前', '귀문 앞을 외학당으로 두는 전통 배치'),
  ],
);

export const EIGHT_STUDY_HALLS_FR311S = methodology(
  'fr311s.gujin631.eight_study_halls',
  'eight_study_halls',
  'shenxiang_quanbian.gujin631',
  '神相全編一.八學堂論',
  GUJIN_631,
  [
    member('01_gaoming', '高明部學堂', '頭圓或有異骨昂', '머리·골격을 보는 고명부학당'),
    member('02_gaoguang', '高廣部學堂', '額明潤骨起方', '이마를 보는 고광부학당'),
    member('03_guangda', '光大部學堂', '印堂平明，無痕傷', '인당을 보는 광대부학당'),
    member('04_mingxiu', '明秀部學堂', '眼光黑多入隱藏', '눈을 보는 명수부학당'),
    member('05_congming', '聰明部學堂', '耳有輪廓', '귀를 보는 총명부학당'),
    member('06_zhongxin', '忠信部學堂', '齒齊周密', '치아를 보는 충신부학당'),
    member('07_guangde', '廣德部學堂', '舌長至準', '혀를 보는 광덕부학당'),
    member('08_bansun', '班筍部學堂', '橫紋中節停合雙', '원문상 횡문·중절 조건을 보는 반순부학당'),
  ],
);

export const FIVE_ELEMENT_FORMS_FR311S = methodology(
  'fr311s.gujin632.five_element_forms',
  'five_element_forms',
  'shenxiang_quanbian.gujin632',
  '神相全編二.五行形相',
  GUJIN_632,
  [
    member('wood', '木形', '木瘦', '목형의 정적 형태를 마른 형으로 기술'),
    member('metal', '金形', '金方', '금형의 정적 형태를 방형으로 기술'),
    member('water', '水形', '水主肥', '수형의 정적 형태를 풍후한 형으로 기술'),
    member('earth', '土形', '土形敦厚背如龜', '토형을 돈후한 체형으로 기술'),
    member('fire', '火形', '上尖下闊', '화형을 위가 뾰족하고 아래가 넓은 형으로 기술'),
  ],
);

export const STATIC_METHODOLOGIES_FR311S:
readonly StaticMethodologyDefinitionFR311S[] = Object.freeze([
  FIVE_OFFICERS_FR311S,
  FIVE_MOUNTAINS_FR311S,
  FOUR_WATERWAYS_FR311S,
  SIX_MINISTRIES_FR311S,
  THREE_DIVISIONS_GUJIN631_FR311S,
  THREE_DIVISIONS_GUJIN632_FR311S,
  THIRTEEN_PARTS_FR311S,
  TWELVE_PALACES_FR311S,
  FIVE_STARS_SIX_LUMINARIES_FR311S,
  FOUR_STUDY_HALLS_FR311S,
  EIGHT_STUDY_HALLS_FR311S,
  FIVE_ELEMENT_FORMS_FR311S,
]);

export const FR311S_STATIC_STRUCTURE_SUMMARY = Object.freeze({
  methodologyDefinitions: STATIC_METHODOLOGIES_FR311S.length,
  lineageSpecificThreeDivisionDefinitions:
    STATIC_METHODOLOGIES_FR311S.filter(
      (item) => item.structureKind === 'three_divisions',
    ).length,
  thirteenParts: THIRTEEN_PARTS_FR311S.members.length,
  numberedTwelvePalaces: TWELVE_PALACES_FR311S.members.length,
  supplementalPalaceTreatments: 1,
  fiveOfficers: FIVE_OFFICERS_FR311S.members.length,
  fiveMountains: FIVE_MOUNTAINS_FR311S.members.length,
  fourWaterways: FOUR_WATERWAYS_FR311S.members.length,
  sixMinistryPairs: SIX_MINISTRIES_FR311S.members.length,
  fiveStarsSixLuminaries: FIVE_STARS_SIX_LUMINARIES_FR311S.members.length,
  fourStudyHalls: FOUR_STUDY_HALLS_FR311S.members.length,
  eightStudyHalls: EIGHT_STUDY_HALLS_FR311S.members.length,
  fiveElementForms: FIVE_ELEMENT_FORMS_FR311S.members.length,
});

export const FR311S_STATIC_STRUCTURE_AUTHORITY_BOUNDARY = Object.freeze({
  crossLineageCanonicalMergeAuthorized: false as const,
  productionRegionMapAuthorized: false as const,
  neutralGeometryBindingAuthorized: false as const,
  metricThresholdAuthorized: false as const,
  populationNormAuthorized: false as const,
  namedFormClassifierAuthorized: false as const,
  automaticTraditionalBindingAuthorized: false as const,
  aggregateScoreAuthorized: false as const,
  modernScientificFactAuthorized: false as const,
  productInterpretationAuthorized: false as const,
});

export function assertStaticStructureMethodologyFR311S(): void {
  const ids = STATIC_METHODOLOGIES_FR311S.map((item) => item.methodologyId);
  if (new Set(ids).size !== ids.length) {
    throw new Error('fr311s_duplicate_methodology_id');
  }

  if (
    FR311S_STATIC_STRUCTURE_SUMMARY.methodologyDefinitions !== 12 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.lineageSpecificThreeDivisionDefinitions !== 2 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.thirteenParts !== 13 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.numberedTwelvePalaces !== 12 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fiveOfficers !== 5 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fiveMountains !== 5 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fourWaterways !== 4 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.sixMinistryPairs !== 3 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fiveStarsSixLuminaries !== 11 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fourStudyHalls !== 4 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.eightStudyHalls !== 8 ||
    FR311S_STATIC_STRUCTURE_SUMMARY.fiveElementForms !== 5
  ) {
    throw new Error('fr311s_summary_drift');
  }

  for (const definition of STATIC_METHODOLOGIES_FR311S) {
    if (
      definition.members.length === 0 ||
      definition.sourceRefs.length === 0 ||
      definition.researchState !== 'source_structure_reviewed' ||
      definition.lineagePinned !== true ||
      definition.canonicalCrossLineageMergeAuthorized !== false ||
      definition.neutralGeometryBindingAuthorized !== false ||
      definition.productionRegionMapAuthorized !== false ||
      definition.metricThresholdAuthorized !== false ||
      definition.populationNormAuthorized !== false ||
      definition.automaticTraditionalBindingAuthorized !== false ||
      definition.productInterpretationAuthorized !== false ||
      definition.modernScientificFactAuthorized !== false
    ) {
      throw new Error('fr311s_authority_drift:' + definition.methodologyId);
    }

    for (const memberValue of definition.members) {
      if (
        memberValue.traditionalLabel.trim().length === 0 ||
        memberValue.sourceLocatorExpression.trim().length === 0
      ) {
        throw new Error(
          'fr311s_incomplete_member:' +
          definition.methodologyId + ':' + memberValue.memberKey,
        );
      }
    }
  }

  if (
    THREE_DIVISIONS_GUJIN631_FR311S.lineageId ===
      THREE_DIVISIONS_GUJIN632_FR311S.lineageId ||
    THREE_DIVISIONS_GUJIN631_FR311S.members[1]?.sourceLocatorExpression ===
      THREE_DIVISIONS_GUJIN632_FR311S.members[1]?.sourceLocatorExpression
  ) {
    throw new Error('fr311s_three_division_lineage_collapsed');
  }

  if (
    TWELVE_PALACE_SUPPLEMENT_FR311S.includedInNumberedTwelvePalaces !== false ||
    TWELVE_PALACE_SUPPLEMENT_FR311S.canonicalCrossLineageMergeAuthorized !== false ||
    TWELVE_PALACE_SUPPLEMENT_FR311S.neutralGeometryBindingAuthorized !== false ||
    TWELVE_PALACE_SUPPLEMENT_FR311S.productInterpretationAuthorized !== false
  ) {
    throw new Error('fr311s_palace_supplement_authority_drift');
  }

  for (const [key, value] of Object.entries(
    FR311S_STATIC_STRUCTURE_AUTHORITY_BOUNDARY,
  )) {
    if (value !== false) {
      throw new Error('fr311s_global_authority_widening:' + key);
    }
  }
}
