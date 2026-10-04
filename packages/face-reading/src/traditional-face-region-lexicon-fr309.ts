export type TraditionalFaceParentComponentFR309 =
  | 'face'
  | 'forehead'
  | 'eyebrow'
  | 'eye_pair'
  | 'nose'
  | 'mouth'
  | 'ear'
  | 'cheek_mid_face'
  | 'chin_lower_face';

export type TraditionalFaceRegionFormFR309 =
  | 'local'
  | 'paired'
  | 'distributed'
  | 'boundary'
  | 'composite';

export type TraditionalFaceParentRelationFR309 =
  | 'direct'
  | 'nearest_existing_parent'
  | 'unresolved_within_face';

export type TraditionalFaceRegionReferenceStateFR309 =
  | 'existing_repository_reference'
  | 'coverage_placeholder';

export interface TraditionalFaceRegionLexiconEntryFR309 {
  readonly termKey: string;
  readonly traditionalLabel: string;
  readonly koreanLabel: string;
  readonly parentComponentKey: TraditionalFaceParentComponentFR309;
  readonly parentRelation: TraditionalFaceParentRelationFR309;
  readonly regionForm: TraditionalFaceRegionFormFR309;
  readonly lineageKeys: readonly string[];
  readonly systemKeys: readonly string[];
  readonly sourceRefs: readonly string[];
  readonly relatedTermKeys: readonly string[];
  readonly locationSummary: string;
  readonly referenceState: TraditionalFaceRegionReferenceStateFR309;
  readonly interpretationAuthorized: false;
  readonly providerGeometryBindingAuthorized: false;
}

export interface TraditionalFaceRegionLexiconFR309 {
  readonly schemaVersion: 'fr309-v1';
  readonly contractId: 'traditional_face_region_lexicon_fr309';
  readonly authorityState: 'research_only';
  readonly upstreamCoverageRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts';
  readonly entries: readonly TraditionalFaceRegionLexiconEntryFR309[];
  readonly authorityBoundary: {
    readonly issuesTraditionalInterpretation: false;
    readonly issuesFortuneOrPersonalityClaims: false;
    readonly issuesProviderGeometry: false;
    readonly issuesThresholdsOrClassifiers: false;
    readonly issuesProductionActivation: false;
  };
}

function entry(
  value: Omit<
    TraditionalFaceRegionLexiconEntryFR309,
    'referenceState' | 'interpretationAuthorized' | 'providerGeometryBindingAuthorized'
  >,
): TraditionalFaceRegionLexiconEntryFR309 {
  return Object.freeze({
    ...value,
    lineageKeys: Object.freeze([...value.lineageKeys]),
    systemKeys: Object.freeze([...value.systemKeys]),
    sourceRefs: Object.freeze([...value.sourceRefs]),
    relatedTermKeys: Object.freeze([...value.relatedTermKeys]),
    referenceState: 'existing_repository_reference' as const,
    interpretationAuthorized: false as const,
    providerGeometryBindingAuthorized: false as const,
  });
}

export const TRADITIONAL_FACE_REGION_LEXICON_ENTRIES_FR309: readonly TraditionalFaceRegionLexiconEntryFR309[] =
  Object.freeze([
    entry({
      termKey: 'hairline',
      traditionalLabel: '髮際',
      koreanLabel: '발제(머리카락 경계)',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'boundary',
      lineageKeys: ['mayi', 'shenyi_fu'],
      systemKeys: ['three_divisions'],
      sourceRefs: ['github:issue/1365', 'github:issue/1368'],
      relatedTermKeys: ['yintang', 'zhuntou', 'dige'],
      locationSummary: '삼정 계열에서 상부 경계로 사용되는 머리카락 시작선.',
    }),
    entry({
      termKey: 'tianting',
      traditionalLabel: '天庭',
      koreanLabel: '천정',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping'],
      relatedTermKeys: ['sun_horn', 'moon_horn'],
      locationSummary: '신상 계열 육부의 상부 쌍을 구성하는 이마 측 명칭.',
    }),
    entry({
      termKey: 'sun_horn',
      traditionalLabel: '日角',
      koreanLabel: '일각',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping'],
      relatedTermKeys: ['tianting', 'moon_horn'],
      locationSummary: '천정과 함께 육부 상부 쌍에 언급되는 양측 이마 부위 중 하나.',
    }),
    entry({
      termKey: 'moon_horn',
      traditionalLabel: '月角',
      koreanLabel: '월각',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping'],
      relatedTermKeys: ['tianting', 'sun_horn'],
      locationSummary: '천정과 함께 육부 상부 쌍에 언급되는 양측 이마 부위 중 하나.',
    }),
    entry({
      termKey: 'zhongzheng',
      traditionalLabel: '中正',
      koreanLabel: '중정',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.career.locator',
        'passage.liuzhuang.twelve_palaces.career.locator',
      ],
      relatedTermKeys: ['li_gong'],
      locationSummary: '관록궁 위치 설명에서 이궁과 연결되는 이마 중앙 계열 명칭.',
    }),
    entry({
      termKey: 'li_gong',
      traditionalLabel: '離宮',
      koreanLabel: '이궁',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.career.locator',
        'passage.liuzhuang.twelve_palaces.career.locator',
      ],
      relatedTermKeys: ['zhongzheng'],
      locationSummary: '관록궁 위치 설명에서 중정의 상부 연결 대상으로 언급되는 부위.',
    }),
    entry({
      termKey: 'yintang',
      traditionalLabel: '印堂',
      koreanLabel: '인당',
      parentComponentKey: 'forehead',
      parentRelation: 'nearest_existing_parent',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'mayi', 'shenyi_fu'],
      systemKeys: ['five_officers', 'twelve_palaces', 'three_divisions'],
      sourceRefs: [
        'passage.shenxiang.five_officers.discernment',
        'passage.shenxiang.twelve_palaces.illness.locator',
        'github:issue/1368',
      ],
      relatedTermKeys: ['shangen', 'hairline'],
      locationSummary: '양 눈썹 사이와 코뿌리 상부 사이에 걸쳐 여러 전통 체계의 기준점으로 등장.',
    }),
    entry({
      termKey: 'brow_corner',
      traditionalLabel: '眉角',
      koreanLabel: '미각(눈썹 모서리)',
      parentComponentKey: 'eyebrow',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.migration.locator'],
      relatedTermKeys: ['tiancang', 'brow_tail'],
      locationSummary: '신상 계열 천이궁 위치 설명에서 천창과 연결되는 눈썹 바깥쪽 계열 부위.',
    }),
    entry({
      termKey: 'brow_tail',
      traditionalLabel: '眉尾',
      koreanLabel: '미미(눈썹 꼬리)',
      parentComponentKey: 'eyebrow',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.liuzhuang.twelve_palaces.migration.locator'],
      relatedTermKeys: ['tiancang', 'brow_corner'],
      locationSummary: '유장 계열 천이궁 위치 설명에서 천창과 연결되는 눈썹 꼬리.',
    }),
    entry({
      termKey: 'tiancang',
      traditionalLabel: '天倉',
      koreanLabel: '천창',
      parentComponentKey: 'forehead',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces', 'six_fus'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.migration.locator',
        'passage.shenxiang.twelve_palaces.fortune_virtue.locator',
        'passage.liuzhuang.six_fus.mapping',
      ],
      relatedTermKeys: ['brow_corner', 'brow_tail', 'diku'],
      locationSummary: '눈썹 바깥·상측 계열에서 천이궁과 육부에 걸쳐 사용되는 양측 명칭.',
    }),
    entry({
      termKey: 'leitang',
      traditionalLabel: '淚堂',
      koreanLabel: '누당',
      parentComponentKey: 'eye_pair',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.children.locator',
        'passage.liuzhuang.twelve_palaces.children.locator',
      ],
      relatedTermKeys: ['wocan'],
      locationSummary: '남녀궁 위치 설명에서 양 눈 아래로 지칭되는 영역.',
    }),
    entry({
      termKey: 'wocan',
      traditionalLabel: '臥蠶',
      koreanLabel: '와잠',
      parentComponentKey: 'eye_pair',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.liuzhuang.twelve_palaces.children.locator'],
      relatedTermKeys: ['leitang'],
      locationSummary: '유장 계열 남녀궁 위치 설명에서 누당의 다른 명칭으로 함께 언급.',
    }),
    entry({
      termKey: 'yuwei',
      traditionalLabel: '魚尾',
      koreanLabel: '어미',
      parentComponentKey: 'eye_pair',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.spouse.locator',
        'passage.liuzhuang.twelve_palaces.spouse.locator',
      ],
      relatedTermKeys: ['jianmen'],
      locationSummary: '처첩궁 위치 설명에서 간문과 함께 지칭되는 양측 눈꼬리 바깥 계열 부위.',
    }),
    entry({
      termKey: 'jianmen',
      traditionalLabel: '奸門',
      koreanLabel: '간문',
      parentComponentKey: 'eye_pair',
      parentRelation: 'nearest_existing_parent',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.spouse.locator',
        'passage.liuzhuang.twelve_palaces.spouse.locator',
      ],
      relatedTermKeys: ['yuwei'],
      locationSummary: '처첩궁 위치 설명에서 어미와 연결되어 언급되는 양측 측안면 계열 부위.',
    }),
    entry({
      termKey: 'shangen',
      traditionalLabel: '山根',
      koreanLabel: '산근',
      parentComponentKey: 'nose',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang', 'mayi', 'shenyi_fu'],
      systemKeys: ['five_officers', 'twelve_palaces', 'three_divisions'],
      sourceRefs: [
        'passage.shenxiang.five_officers.discernment',
        'passage.shenxiang.twelve_palaces.illness.locator',
        'passage.liuzhuang.twelve_palaces.illness.locator',
        'github:issue/1368',
      ],
      relatedTermKeys: ['yintang', 'nian_shou', 'zhuntou'],
      locationSummary: '인당 아래의 코뿌리 계열 기준으로 여러 체계에서 반복 사용.',
    }),
    entry({
      termKey: 'nose_pillar',
      traditionalLabel: '梁柱',
      koreanLabel: '양주(코 기둥)',
      parentComponentKey: 'nose',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang'],
      systemKeys: ['five_officers'],
      sourceRefs: ['passage.shenxiang.five_officers.discernment'],
      relatedTermKeys: ['shangen', 'nian_shou', 'zhuntou'],
      locationSummary: '심변관 성립 조건에서 코의 세로 기둥 계열을 지칭하는 표현.',
    }),
    entry({
      termKey: 'nian_shou',
      traditionalLabel: '年壽',
      koreanLabel: '연수',
      parentComponentKey: 'nose',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['five_officers', 'twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.five_officers.discernment',
        'passage.liuzhuang.twelve_palaces.illness.locator',
      ],
      relatedTermKeys: ['shangen', 'zhuntou'],
      locationSummary: '코 중앙 세로축 계열에서 산근과 준부 사이에 언급되는 전통 명칭.',
    }),
    entry({
      termKey: 'zhuntou',
      traditionalLabel: '準頭',
      koreanLabel: '준두',
      parentComponentKey: 'nose',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['mayi', 'shenyi_fu'],
      systemKeys: ['three_divisions'],
      sourceRefs: ['github:issue/1365', 'github:issue/1368'],
      relatedTermKeys: ['shangen', 'nian_shou'],
      locationSummary: '삼정 계열에서 코끝 측 세로 기준으로 사용되는 명칭.',
    }),
    entry({
      termKey: 'cheekbone',
      traditionalLabel: '顴骨',
      koreanLabel: '관골',
      parentComponentKey: 'cheek_mid_face',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping', 'passage.liuzhuang.six_fus.mapping'],
      relatedTermKeys: ['tiancang', 'diku'],
      locationSummary: '육부 중부 쌍에서 양측 광대뼈 계열을 지칭.',
    }),
    entry({
      termKey: 'renshong',
      traditionalLabel: '人中',
      koreanLabel: '인중',
      parentComponentKey: 'mouth',
      parentRelation: 'nearest_existing_parent',
      regionForm: 'local',
      lineageKeys: ['mayi', 'shenyi_fu'],
      systemKeys: ['three_divisions'],
      sourceRefs: ['github:issue/1365', 'github:issue/1368'],
      relatedTermKeys: ['dige', 'zhuntou'],
      locationSummary: '코 아래와 입 위 중앙 홈 계열로, 삼정 비연속 식의 하부 시작점에 등장.',
    }),
    entry({
      termKey: 'water_star',
      traditionalLabel: '水星',
      koreanLabel: '수성(입 계열)',
      parentComponentKey: 'mouth',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.servants.locator',
        'passage.liuzhuang.twelve_palaces.servants.locator',
      ],
      relatedTermKeys: ['dige'],
      locationSummary: '노복궁 위치 설명에서 지각과 연결되는 입 계열 명칭.',
    }),
    entry({
      termKey: 'ear_outline',
      traditionalLabel: '輪廓',
      koreanLabel: '윤곽(귀 테두리 계열)',
      parentComponentKey: 'ear',
      parentRelation: 'direct',
      regionForm: 'composite',
      lineageKeys: ['shenxiang'],
      systemKeys: ['five_officers'],
      sourceRefs: ['passage.shenxiang.five_officers.listening'],
      relatedTermKeys: ['ear_gate'],
      locationSummary: '채청관 성립 조건에서 귀의 테두리·윤곽 완성도를 가리키는 복합 표현.',
    }),
    entry({
      termKey: 'ear_gate',
      traditionalLabel: '風門',
      koreanLabel: '풍문',
      parentComponentKey: 'ear',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang'],
      systemKeys: ['five_officers'],
      sourceRefs: ['passage.shenxiang.five_officers.listening'],
      relatedTermKeys: ['ear_outline'],
      locationSummary: '채청관 성립 조건에서 귀 내부 입구 계열로 언급되는 명칭.',
    }),
    entry({
      termKey: 'dige',
      traditionalLabel: '地閣',
      koreanLabel: '지각',
      parentComponentKey: 'chin_lower_face',
      parentRelation: 'direct',
      regionForm: 'local',
      lineageKeys: ['shenxiang', 'liuzhuang', 'mayi', 'shenyi_fu'],
      systemKeys: ['six_fus', 'twelve_palaces', 'three_divisions'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.servants.locator',
        'passage.shenxiang.twelve_palaces.fortune_virtue.locator',
        'github:issue/1365',
        'github:issue/1368',
      ],
      relatedTermKeys: ['dijiao', 'diku', 'renshong'],
      locationSummary: '하안면 중앙 계열 기준으로 삼정·육부·십이궁에서 반복 사용.',
    }),
    entry({
      termKey: 'dijiao',
      traditionalLabel: '地角',
      koreanLabel: '지각(지각 양측 계열)',
      parentComponentKey: 'chin_lower_face',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping'],
      relatedTermKeys: ['dige', 'bian_sai'],
      locationSummary: '신상 계열 육부 하부 쌍에서 변새와 함께 언급되는 하안면 양측 명칭.',
    }),
    entry({
      termKey: 'bian_sai',
      traditionalLabel: '邊腮',
      koreanLabel: '변새',
      parentComponentKey: 'chin_lower_face',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang'],
      systemKeys: ['six_fus'],
      sourceRefs: ['passage.shenxiang.six_fus.mapping'],
      relatedTermKeys: ['dijiao'],
      locationSummary: '신상 계열 육부 하부 쌍에서 지각과 함께 언급되는 턱 옆 계열 부위.',
    }),
    entry({
      termKey: 'diku',
      traditionalLabel: '地庫',
      koreanLabel: '지고',
      parentComponentKey: 'chin_lower_face',
      parentRelation: 'direct',
      regionForm: 'paired',
      lineageKeys: ['shenxiang', 'liuzhuang'],
      systemKeys: ['twelve_palaces', 'six_fus'],
      sourceRefs: [
        'passage.shenxiang.twelve_palaces.wealth.locator',
        'passage.shenxiang.twelve_palaces.fortune_virtue.locator',
        'passage.liuzhuang.six_fus.mapping',
      ],
      relatedTermKeys: ['tiancang', 'dige'],
      locationSummary: '재백·복덕 구성과 유장 육부 하부 쌍에서 사용되는 하안면 양측 계열 명칭.',
    }),
    entry({
      termKey: 'golden_cabinet',
      traditionalLabel: '金甲櫃',
      koreanLabel: '금갑궤',
      parentComponentKey: 'face',
      parentRelation: 'unresolved_within_face',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.wealth.locator'],
      relatedTermKeys: ['tiancang', 'diku', 'well_region', 'stove_region'],
      locationSummary: '재백궁 복합 구성에 포함되지만 FR309에서는 정확한 현대 얼굴 구획 귀속을 확정하지 않음.',
    }),
    entry({
      termKey: 'well_region',
      traditionalLabel: '井',
      koreanLabel: '정',
      parentComponentKey: 'face',
      parentRelation: 'unresolved_within_face',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.wealth.locator'],
      relatedTermKeys: ['golden_cabinet', 'stove_region'],
      locationSummary: '재백궁 복합 구성에 포함되는 전통 부위명으로 정확한 세부 위치는 별도 원문 대조 대상.',
    }),
    entry({
      termKey: 'stove_region',
      traditionalLabel: '灶',
      koreanLabel: '조',
      parentComponentKey: 'face',
      parentRelation: 'unresolved_within_face',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.wealth.locator'],
      relatedTermKeys: ['golden_cabinet', 'well_region'],
      locationSummary: '재백궁 복합 구성에 포함되는 전통 부위명으로 정확한 세부 위치는 별도 원문 대조 대상.',
    }),
    entry({
      termKey: 'biandi',
      traditionalLabel: '邊地',
      koreanLabel: '변지',
      parentComponentKey: 'face',
      parentRelation: 'unresolved_within_face',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.migration.locator'],
      relatedTermKeys: ['yima', 'shanlin', 'hairline'],
      locationSummary: '천이궁 분산 구성에 포함되는 측면 계열 명칭. FR309에서는 좌표를 확정하지 않음.',
    }),
    entry({
      termKey: 'yima',
      traditionalLabel: '驛馬',
      koreanLabel: '역마',
      parentComponentKey: 'face',
      parentRelation: 'unresolved_within_face',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.migration.locator'],
      relatedTermKeys: ['biandi', 'shanlin'],
      locationSummary: '천이궁 분산 구성에 포함되는 전통 부위명. FR309에서는 현대 좌표를 부여하지 않음.',
    }),
    entry({
      termKey: 'shanlin',
      traditionalLabel: '山林',
      koreanLabel: '산림',
      parentComponentKey: 'forehead',
      parentRelation: 'nearest_existing_parent',
      regionForm: 'distributed',
      lineageKeys: ['shenxiang'],
      systemKeys: ['twelve_palaces'],
      sourceRefs: ['passage.shenxiang.twelve_palaces.migration.locator'],
      relatedTermKeys: ['hairline', 'biandi', 'yima'],
      locationSummary: '천이궁 분산 구성에서 발제와 함께 언급되는 상측 얼굴 계열 명칭.',
    }),
  ]);

export const TRADITIONAL_FACE_REGION_LEXICON_FR309: TraditionalFaceRegionLexiconFR309 = Object.freeze({
  schemaVersion: 'fr309-v1',
  contractId: 'traditional_face_region_lexicon_fr309',
  authorityState: 'research_only',
  upstreamCoverageRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
  entries: TRADITIONAL_FACE_REGION_LEXICON_ENTRIES_FR309,
  authorityBoundary: Object.freeze({
    issuesTraditionalInterpretation: false,
    issuesFortuneOrPersonalityClaims: false,
    issuesProviderGeometry: false,
    issuesThresholdsOrClassifiers: false,
    issuesProductionActivation: false,
  }),
});

const ISSUED_FR309 = new WeakSet<object>();

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr309_duplicate:${path}`);
}

export function assertTraditionalFaceRegionLexiconFR309(value: TraditionalFaceRegionLexiconFR309): void {
  if (value.schemaVersion !== 'fr309-v1') throw new Error('fr309_schema_version_drift');
  if (value.contractId !== 'traditional_face_region_lexicon_fr309') throw new Error('fr309_contract_id_drift');
  if (value.authorityState !== 'research_only') throw new Error('fr309_authority_state_widening');
  if (value.upstreamCoverageRef !== 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts') {
    throw new Error('fr309_upstream_coverage_ref_drift');
  }
  if (value.entries.length === 0) throw new Error('fr309_entries_empty');

  assertUnique(value.entries.map((candidate) => candidate.termKey), 'term_key');

  const keys = new Set(value.entries.map((candidate) => candidate.termKey));
  for (const candidate of value.entries) {
    if (candidate.termKey.trim().length === 0) throw new Error('fr309_empty_term_key');
    if (candidate.traditionalLabel.trim().length === 0) throw new Error(`fr309_empty_label:${candidate.termKey}`);
    if (candidate.koreanLabel.trim().length === 0) throw new Error(`fr309_empty_korean_label:${candidate.termKey}`);
    if (candidate.locationSummary.trim().length === 0) throw new Error(`fr309_empty_location_summary:${candidate.termKey}`);
    if (candidate.sourceRefs.length === 0) throw new Error(`fr309_missing_source_ref:${candidate.termKey}`);
    assertUnique(candidate.sourceRefs, `source_ref:${candidate.termKey}`);
    assertUnique(candidate.lineageKeys, `lineage_key:${candidate.termKey}`);
    assertUnique(candidate.systemKeys, `system_key:${candidate.termKey}`);
    assertUnique(candidate.relatedTermKeys, `related_term_key:${candidate.termKey}`);
    for (const related of candidate.relatedTermKeys) {
      if (!keys.has(related)) throw new Error(`fr309_unknown_related_term:${candidate.termKey}:${related}`);
    }
    if (candidate.referenceState !== 'existing_repository_reference') {
      throw new Error(`fr309_reference_state_widening:${candidate.termKey}`);
    }
    if (candidate.interpretationAuthorized !== false) {
      throw new Error(`fr309_interpretation_authority_widening:${candidate.termKey}`);
    }
    if (candidate.providerGeometryBindingAuthorized !== false) {
      throw new Error(`fr309_geometry_binding_widening:${candidate.termKey}`);
    }
  }

  for (const [key, flag] of Object.entries(value.authorityBoundary)) {
    if (flag !== false) throw new Error(`fr309_authority_boundary_widening:${key}`);
  }
}

export function issueTraditionalFaceRegionLexiconFR309(): TraditionalFaceRegionLexiconFR309 {
  assertTraditionalFaceRegionLexiconFR309(TRADITIONAL_FACE_REGION_LEXICON_FR309);
  ISSUED_FR309.add(TRADITIONAL_FACE_REGION_LEXICON_FR309);
  return TRADITIONAL_FACE_REGION_LEXICON_FR309;
}

export function assertIssuedTraditionalFaceRegionLexiconFR309(value: TraditionalFaceRegionLexiconFR309): void {
  assertTraditionalFaceRegionLexiconFR309(value);
  if (!ISSUED_FR309.has(value)) throw new Error('fr309_unissued_traditional_face_region_lexicon');
}
