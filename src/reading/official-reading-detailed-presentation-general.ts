import {
  I18A_MONTH_BRANCH_STRENGTH_SOURCES,
} from '../research/i18a-month-branch-strength-evidence.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
} from '../research/general-natal-useful-reading-candidate.js';
import type {
  ApprovedOfficialReadingDetailedSourceProfileV1,
} from './official-reading-detailed-presentation-definition.js';

export const OFFICIAL_READING_GENERAL_NATAL_DETAILED_SOURCE_PROFILE_VERSION =
  'myeonghwa-official-reading-general-natal-detailed-source-profile-v1' as const;

const AUTHORITY_ID = 'SA-6Q-GENERAL-NATAL-DETAILED-MATERIAL-PILOT';
const AUTHORITY_VERSION = '1';

const GENERAL_SOURCE_REFS = Object.freeze([
  GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
]);

const STRUCTURAL_SOURCE_REFS = Object.freeze(
  I18A_MONTH_BRANCH_STRENGTH_SOURCES.map((source) => source.sourceId).sort(),
);

const NO_QUALIFIERS: readonly unknown[] = Object.freeze([]);
const BASELINE_PROHIBITED_EXTENSIONS = Object.freeze([
  'wholePersonConclusionAuthorized',
]);
const THEME_PROHIBITED_EXTENSIONS = Object.freeze([
  'futureTimingAuthorized',
  'outcomeAuthorized',
]);
const MONTH_BRANCH_PROHIBITED_EXTENSIONS = Object.freeze([
  'classificationAuthorized',
  'fortunePolarityAuthorized',
  'monthBranchExclusiveAuthority',
  'numericMonthBranchMultiplier',
  'numericScoringAuthorized',
  'strengthClassifier',
  'universalRootOrdering',
  'upstreamEvidenceDirectionAsFortuneMeaningAuthorized',
]);
const MONTH_BRANCH_QUALIFIER_MATERIAL = Object.freeze([
  Object.freeze({
    qualifierId: 'preview_qualifier_r012_month_branch_priority_v1',
    kind: 'qualifier',
    semanticScope: 'month_branch_priority_scope_boundary',
    semanticKeys: Object.freeze([
      'MONTH_BRANCH_IMPORTANCE_NOT_EXCLUSIVE_AUTHORITY',
      'NO_NUMERIC_MONTH_BRANCH_MULTIPLIER',
      'NO_STRENGTH_CLASSIFIER',
      'TONGGEN_PRIORITY_NOT_UNIVERSAL_ROOT_ORDERING',
    ]),
    canonicalText: Object.freeze({
      summary:
        '월지는 명식을 읽을 때 중요한 구조축으로 보되, 그것만으로 명식 전체를 단독 판정하지 않습니다. 통근 범위에서의 월지 우선성도 모든 뿌리의 보편 순위나 수치 가중치로 확장하지 않습니다.',
    }),
    prohibitedExtensions: Object.freeze([
      'monthBranchExclusiveAuthority',
      'numericMonthBranchMultiplier',
      'strengthClassifier',
      'universalRootOrdering',
    ]),
  }),
]);

function profile(
  input: Omit<
    ApprovedOfficialReadingDetailedSourceProfileV1,
    'owner' | 'profileVersion'
  >,
): ApprovedOfficialReadingDetailedSourceProfileV1 {
  return Object.freeze({
    owner: 'general:natal' as const,
    profileVersion: '1',
    ...input,
  });
}

const BASELINES = Object.freeze([
  {
    id: 'wood',
    headline: '성장과 관계를 향하는 기본축',
    summary:
      '전통 오행 성정에서 목은 인(仁), 성장·확장·배려의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    clarification:
      '목 일간이라는 정보는 성장·확장·배려 쪽의 전통적 기본 방향을 읽는 출발점입니다. 여기서는 그 방향이 명식에 들어 있는 한 축이라는 점까지만 설명합니다.',
  },
  {
    id: 'fire',
    headline: '표현과 추진을 향하는 기본축',
    summary:
      '전통 오행 성정에서 화는 예(禮), 표현·활동·빠른 반응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    clarification:
      '화 일간이라는 정보는 표현·활동·빠른 반응 쪽의 전통적 기본 방향을 읽는 출발점입니다. 여기서는 그 방향이 명식에 들어 있는 한 축이라는 점까지만 설명합니다.',
  },
  {
    id: 'earth',
    headline: '안정과 신뢰를 향하는 기본축',
    summary:
      '전통 오행 성정에서 토는 신(信), 안정·지속·신뢰의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    clarification:
      '토 일간이라는 정보는 안정·지속·신뢰 쪽의 전통적 기본 방향을 읽는 출발점입니다. 여기서는 그 방향이 명식에 들어 있는 한 축이라는 점까지만 설명합니다.',
  },
  {
    id: 'metal',
    headline: '판단과 원칙을 향하는 기본축',
    summary:
      '전통 오행 성정에서 금은 의(義), 판단·원칙·결단의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    clarification:
      '금 일간이라는 정보는 판단·원칙·결단 쪽의 전통적 기본 방향을 읽는 출발점입니다. 여기서는 그 방향이 명식에 들어 있는 한 축이라는 점까지만 설명합니다.',
  },
  {
    id: 'water',
    headline: '사고와 적응을 향하는 기본축',
    summary:
      '전통 오행 성정에서 수는 지(智), 사고·기획·적응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
    clarification:
      '수 일간이라는 정보는 사고·기획·적응 쪽의 전통적 기본 방향을 읽는 출발점입니다. 여기서는 그 방향이 명식에 들어 있는 한 축이라는 점까지만 설명합니다.',
  },
] as const);

const BASELINE_BOUNDARY =
  '일간 오행 하나만으로 성격 전체, 운의 좋고 나쁨, 직업·재물·관계의 결과를 단정하지 않습니다. 다른 구조와 해석 단위를 함께 보아야 합니다.';

const BASELINE_PROFILES: readonly ApprovedOfficialReadingDetailedSourceProfileV1[] =
  Object.freeze(
    BASELINES.map((entry) =>
      profile({
        profileId: `general-natal-day-master-${entry.id}-detailed-v1`,
        claimType: 'GENERAL_NATAL_DAY_MASTER_BASELINE',
        methodologyRef: {
          id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
          version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
        },
        standardText: Object.freeze({
          headline: entry.headline,
          summary: entry.summary,
        }),
        semanticQualifiers: NO_QUALIFIERS,
        prohibitedExtensions: BASELINE_PROHIBITED_EXTENSIONS,
        supportingClaimTypes: Object.freeze([]),
        scenarioPolicy: 'none',
        contradictionPolicy: 'none',
        approvedTextByRole: Object.freeze({
          clarification: entry.clarification,
          boundary: BASELINE_BOUNDARY,
        }),
        provenance: Object.freeze({
          authorityId: AUTHORITY_ID,
          authorityVersion: AUTHORITY_VERSION,
          sourceRefs: GENERAL_SOURCE_REFS,
        }),
      }),
    ),
  );

const THEMES = Object.freeze([
  {
    id: 'peer',
    family: 'PEER',
    headline: '자기 기준과 사람 사이의 힘',
    summary:
      '비견·겁재 계열은 나와 같은 편의 힘, 자기 기준, 동료와의 병행 또는 경쟁이라는 주제를 보여주는 축으로 읽습니다.',
    clarification:
      '비견·겁재 계열은 자기 기준을 세우는 힘과 비슷한 위치의 사람들과 나란히 움직이거나 경쟁하는 주제를 보여줍니다. 이 항목은 그런 주제가 관찰된다는 뜻이지 결과의 우열을 매기는 판정이 아닙니다.',
  },
  {
    id: 'resource',
    family: 'RESOURCE',
    headline: '배우고 받아들이는 방식',
    summary:
      '인성 계열은 나를 생조하는 힘으로, 배우고 이해하고 지원을 받아들이는 방식과 연결되는 주제로 읽습니다.',
    clarification:
      '인성 계열은 정보를 배우고 이해하는 과정, 그리고 외부의 도움이나 자원을 받아들이는 방식과 연결해 읽습니다. 존재 자체만으로 학업·자격·보호의 결과를 확정하지 않습니다.',
  },
  {
    id: 'output',
    family: 'OUTPUT',
    headline: '표현하고 만들어 내는 방식',
    summary:
      '식신·상관 계열은 내가 밖으로 내보내는 힘으로, 표현·생산·창작·결과물을 밖으로 꺼내는 방식과 연결되는 주제로 읽습니다.',
    clarification:
      '식신·상관 계열은 생각이나 능력을 밖으로 표현하고, 만들고, 결과물로 꺼내는 주제와 연결해 읽습니다. 이 항목은 표현의 존재를 설명할 뿐 성취 수준을 판정하지 않습니다.',
  },
  {
    id: 'wealth',
    family: 'WEALTH',
    headline: '현실 자원과 결과를 다루는 방식',
    summary:
      '재성 계열은 내가 제어하고 운용하는 현실 자원의 축으로, 돈 자체의 길흉보다 자원·성과·관리 문제와 연결되는 주제로 읽습니다.',
    clarification:
      '재성 계열은 돈의 액수나 부유함을 바로 뜻하기보다, 현실 자원과 성과를 다루고 관리하는 주제와 연결해 읽습니다. 여기서는 자원 운용이라는 의미축까지만 설명합니다.',
  },
  {
    id: 'officer',
    family: 'OFFICER',
    headline: '책임과 요구를 받아들이는 방식',
    summary:
      '관성 계열은 나를 제어하는 힘으로, 규칙·책임·역할·외부 요구와 압박을 다루는 방식과 연결되는 주제로 읽습니다.',
    clarification:
      '관성 계열은 규칙과 책임, 맡은 역할, 외부에서 들어오는 요구와 압박을 다루는 주제와 연결해 읽습니다. 존재 자체만으로 지위나 성공·실패를 확정하지 않습니다.',
  },
] as const);

const CHANNELS = Object.freeze([
  {
    id: 'visible-stems',
    claimChannel: 'VISIBLE_STEMS',
    supportingChannel: 'VISIBLE_STEMS',
    label: '천간',
  },
  {
    id: 'branches',
    claimChannel: 'BRANCHES',
    supportingChannel: 'BRANCHES',
    label: '지지',
  },
] as const);

const THEME_BOUNDARY =
  '이 주제의 존재만으로 성격 전체, 우세 정도, 성공·실패, 재산 수준, 관계 결과나 미래 시점을 단정하지 않습니다. 수치 점수나 확률로도 바꾸지 않습니다.';

const THEME_PROFILES: readonly ApprovedOfficialReadingDetailedSourceProfileV1[] =
  Object.freeze(
    THEMES.flatMap((theme) =>
      CHANNELS.map((channel) =>
        profile({
          profileId: `general-natal-${theme.id}-${channel.id}-detailed-v1`,
          claimType: `GENERAL_NATAL_${theme.family}_${channel.claimChannel}_THEME`,
          methodologyRef: {
            id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
            version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
          },
          standardText: Object.freeze({
            headline: theme.headline,
            summary: theme.summary,
          }),
          semanticQualifiers: NO_QUALIFIERS,
          prohibitedExtensions: THEME_PROHIBITED_EXTENSIONS,
          supportingClaimTypes: Object.freeze([
            `TEN_GOD_${theme.family}_${channel.supportingChannel}_THEME`,
          ]),
          scenarioPolicy: 'none',
          contradictionPolicy: 'none',
          approvedTextByRole: Object.freeze({
            clarification:
              `${channel.label}에서 확인된 이 주제는 ${theme.clarification}`,
            boundary: THEME_BOUNDARY,
          }),
          provenance: Object.freeze({
            authorityId: AUTHORITY_ID,
            authorityVersion: AUTHORITY_VERSION,
            sourceRefs: GENERAL_SOURCE_REFS,
          }),
        }),
      ),
    ),
  );

const STRUCTURES = Object.freeze([
  {
    id: 'peer',
    headline: '월지와 일간이 같은 오행 관계입니다',
    summary:
      '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    clarification:
      '월지와 일간이 같은 오행으로 연결된다는 뜻입니다. 여기서는 같은 오행 관계가 월지라는 구조축에 존재한다는 사실까지만 풀어 설명합니다.',
  },
  {
    id: 'resource',
    headline: '월지가 일간을 생하는 관계입니다',
    summary:
      '월지의 오행이 일간을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    clarification:
      '월지의 오행이 일간의 오행을 생하는 방향으로 연결된다는 뜻입니다. 여기서는 그 생조 관계가 월지라는 구조축에 존재한다는 사실까지만 설명합니다.',
  },
  {
    id: 'output',
    headline: '일간이 월지를 생하는 관계입니다',
    summary:
      '일간의 오행이 월지의 오행을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    clarification:
      '일간의 오행이 월지의 오행을 생하는 방향으로 연결된다는 뜻입니다. 여기서는 그 생 관계가 월지라는 구조축에 존재한다는 사실까지만 설명합니다.',
  },
  {
    id: 'wealth',
    headline: '일간이 월지를 극하는 관계입니다',
    summary:
      '일간의 오행이 월지의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    clarification:
      '일간의 오행이 월지의 오행을 극하는 방향으로 연결된다는 뜻입니다. 여기서는 그 제어 관계가 월지라는 구조축에 존재한다는 사실까지만 설명합니다.',
  },
  {
    id: 'officer',
    headline: '월지가 일간을 극하는 관계입니다',
    summary:
      '월지의 오행이 일간의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
    clarification:
      '월지의 오행이 일간의 오행을 극하는 방향으로 연결된다는 뜻입니다. 여기서는 그 제어 관계가 월지라는 구조축에 존재한다는 사실까지만 설명합니다.',
  },
] as const);

const STRUCTURAL_CONDITION =
  '월지는 중요한 구조축으로 보지만 단독 판정 기준으로 쓰지 않습니다. 이 설명은 월지와 일간의 오행 관계라는 제한된 범위 안에서만 적용됩니다.';
const STRUCTURAL_BOUNDARY =
  '이 관계 하나만으로 신강·신약, 길흉, 점수, 미래 결과를 확정할 수 없습니다. 월지 우선성을 모든 뿌리의 보편 순위나 수치 가중치로 확대하지도 않습니다.';

const STRUCTURAL_PROFILES: readonly ApprovedOfficialReadingDetailedSourceProfileV1[] =
  Object.freeze(
    STRUCTURES.map((entry) =>
      profile({
        profileId: `general-natal-month-branch-${entry.id}-detailed-v1`,
        claimType: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
        methodologyRef: {
          id: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.methodologyId,
          version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.version,
        },
        standardText: Object.freeze({
          headline: entry.headline,
          summary: entry.summary,
        }),
        semanticQualifiers: MONTH_BRANCH_QUALIFIER_MATERIAL,
        prohibitedExtensions: MONTH_BRANCH_PROHIBITED_EXTENSIONS,
        supportingClaimTypes: Object.freeze([
          'DAY_MASTER_MONTH_BRANCH_EVIDENCE',
          'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD',
        ]),
        scenarioPolicy: 'none',
        contradictionPolicy: 'none',
        approvedTextByRole: Object.freeze({
          clarification: entry.clarification,
          condition: STRUCTURAL_CONDITION,
          boundary: STRUCTURAL_BOUNDARY,
        }),
        provenance: Object.freeze({
          authorityId: AUTHORITY_ID,
          authorityVersion: AUTHORITY_VERSION,
          sourceRefs: STRUCTURAL_SOURCE_REFS,
        }),
      }),
    ),
  );

export const GENERAL_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1:
  readonly ApprovedOfficialReadingDetailedSourceProfileV1[] = Object.freeze([
    ...BASELINE_PROFILES,
    ...THEME_PROFILES,
    ...STRUCTURAL_PROFILES,
  ]);
