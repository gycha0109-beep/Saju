import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
} from '../research/general-natal-useful-reading-candidate.js';
import type {
  CanonicalReadingSemanticBundleV1,
  CanonicalReadingSemanticTextV1,
} from './canonical-reading-semantics.js';
import {
  OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION,
  OFFICIAL_READING_CONCISE_PRESENTATION_READINESS_POLICY_VERSION,
  OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
  officialReadingStandardPresentationHashV1,
  type OfficialReadingConcisePresentationProfileV1,
  type OfficialReadingConcisePresentationReadinessV1,
} from './official-reading-concise-presentation.js';
import type { OfficialReadingPlanV1 } from './official-reading-plan.js';

export const OFFICIAL_READING_APPROVED_CONCISE_REGISTRY_VERSION =
  'myeonghwa-official-reading-approved-concise-registry-v2' as const;

interface ApprovedConciseDefinitionV1 {
  profileId: string;
  profileVersion: '1';
  claimType: string;
  methodologyRef: {
    id: string;
    version: string;
  };
  standardText: CanonicalReadingSemanticTextV1;
  semanticQualifiers: readonly unknown[];
  prohibitedExtensions: readonly string[];
  conciseText: string;
}

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

const NO_QUALIFIERS: readonly unknown[] = Object.freeze([]);
const BASELINE_PROHIBITED_EXTENSIONS = Object.freeze([
  'wholePersonConclusionAuthorized',
]);
const THEME_PROHIBITED_EXTENSIONS = Object.freeze([
  'futureTimingAuthorized',
  'outcomeAuthorized',
]);

function structuralDefinition(
  profileId: string,
  standardText: CanonicalReadingSemanticTextV1,
  conciseText: string,
): ApprovedConciseDefinitionV1 {
  return {
    profileId,
    profileVersion: '1',
    claimType: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
    methodologyRef: {
      id: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.version,
    },
    standardText,
    semanticQualifiers: MONTH_BRANCH_QUALIFIER_MATERIAL,
    prohibitedExtensions: MONTH_BRANCH_PROHIBITED_EXTENSIONS,
    conciseText,
  };
}

function usefulDefinition(
  profileId: string,
  claimType: string,
  standardText: CanonicalReadingSemanticTextV1,
  prohibitedExtensions: readonly string[],
  conciseText: string,
): ApprovedConciseDefinitionV1 {
  return {
    profileId,
    profileVersion: '1',
    claimType,
    methodologyRef: {
      id: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.methodologyId,
      version: GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY.version,
    },
    standardText,
    semanticQualifiers: NO_QUALIFIERS,
    prohibitedExtensions,
    conciseText,
  };
}

const STRUCTURAL_DEFINITIONS: readonly ApprovedConciseDefinitionV1[] =
  Object.freeze([
    Object.freeze(
      structuralDefinition(
        'general-natal-month-branch-peer-concise-v1',
        Object.freeze({
          headline: '월지와 일간이 같은 오행 관계입니다',
          summary:
            '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        }),
        '월지와 일간은 같은 오행으로 연결되며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
      ),
    ),
    Object.freeze(
      structuralDefinition(
        'general-natal-month-branch-resource-concise-v1',
        Object.freeze({
          headline: '월지가 일간을 생하는 관계입니다',
          summary:
            '월지의 오행이 일간을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        }),
        '월지가 일간을 생하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
      ),
    ),
    Object.freeze(
      structuralDefinition(
        'general-natal-month-branch-output-concise-v1',
        Object.freeze({
          headline: '일간이 월지를 생하는 관계입니다',
          summary:
            '일간의 오행이 월지의 오행을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        }),
        '일간이 월지를 생하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
      ),
    ),
    Object.freeze(
      structuralDefinition(
        'general-natal-month-branch-wealth-concise-v1',
        Object.freeze({
          headline: '일간이 월지를 극하는 관계입니다',
          summary:
            '일간의 오행이 월지의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        }),
        '일간이 월지를 극하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
      ),
    ),
    Object.freeze(
      structuralDefinition(
        'general-natal-month-branch-officer-concise-v1',
        Object.freeze({
          headline: '월지가 일간을 극하는 관계입니다',
          summary:
            '월지의 오행이 일간의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
        }),
        '월지가 일간을 극하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
      ),
    ),
  ]);

const BASELINE_DEFINITIONS: readonly ApprovedConciseDefinitionV1[] =
  Object.freeze([
    Object.freeze(
      usefulDefinition(
        'general-natal-day-master-wood-concise-v1',
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        Object.freeze({
          headline: '성장과 관계를 향하는 기본축',
          summary:
            '전통 오행 성정에서 목은 인(仁), 성장·확장·배려의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
        }),
        BASELINE_PROHIBITED_EXTENSIONS,
        '목 일간의 기본축은 성장·확장·배려와 연결되며, 이것만으로 전체 성격을 단정하지 않습니다.',
      ),
    ),
    Object.freeze(
      usefulDefinition(
        'general-natal-day-master-fire-concise-v1',
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        Object.freeze({
          headline: '표현과 추진을 향하는 기본축',
          summary:
            '전통 오행 성정에서 화는 예(禮), 표현·활동·빠른 반응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
        }),
        BASELINE_PROHIBITED_EXTENSIONS,
        '화 일간의 기본축은 표현·활동·빠른 반응과 연결되며, 이것만으로 전체 성격을 단정하지 않습니다.',
      ),
    ),
    Object.freeze(
      usefulDefinition(
        'general-natal-day-master-earth-concise-v1',
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        Object.freeze({
          headline: '안정과 신뢰를 향하는 기본축',
          summary:
            '전통 오행 성정에서 토는 신(信), 안정·지속·신뢰의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
        }),
        BASELINE_PROHIBITED_EXTENSIONS,
        '토 일간의 기본축은 안정·지속·신뢰와 연결되며, 이것만으로 전체 성격을 단정하지 않습니다.',
      ),
    ),
    Object.freeze(
      usefulDefinition(
        'general-natal-day-master-metal-concise-v1',
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        Object.freeze({
          headline: '판단과 원칙을 향하는 기본축',
          summary:
            '전통 오행 성정에서 금은 의(義), 판단·원칙·결단의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
        }),
        BASELINE_PROHIBITED_EXTENSIONS,
        '금 일간의 기본축은 판단·원칙·결단과 연결되며, 이것만으로 전체 성격을 단정하지 않습니다.',
      ),
    ),
    Object.freeze(
      usefulDefinition(
        'general-natal-day-master-water-concise-v1',
        'GENERAL_NATAL_DAY_MASTER_BASELINE',
        Object.freeze({
          headline: '사고와 적응을 향하는 기본축',
          summary:
            '전통 오행 성정에서 수는 지(智), 사고·기획·적응의 방향과 연결됩니다. 이는 일간의 기본 바탕을 설명하는 한 축일 뿐 전체 성격을 단정하지 않습니다.',
        }),
        BASELINE_PROHIBITED_EXTENSIONS,
        '수 일간의 기본축은 사고·기획·적응과 연결되며, 이것만으로 전체 성격을 단정하지 않습니다.',
      ),
    ),
  ]);

const THEME_COPY = Object.freeze({
  peer: Object.freeze({
    headline: '자기 기준과 사람 사이의 힘',
    summary:
      '비견·겁재 계열은 나와 같은 편의 힘, 자기 기준, 동료와의 병행 또는 경쟁이라는 주제를 보여주는 축으로 읽습니다.',
    concise:
      '비견·겁재 계열은 자기 기준과 동료와의 병행·경쟁이라는 주제로 읽으며, 결과를 단정하지 않습니다.',
  }),
  resource: Object.freeze({
    headline: '배우고 받아들이는 방식',
    summary:
      '인성 계열은 나를 생조하는 힘으로, 배우고 이해하고 지원을 받아들이는 방식과 연결되는 주제로 읽습니다.',
    concise:
      '인성 계열은 배우고 이해하며 지원을 받아들이는 방식과 연결되는 주제로 읽습니다.',
  }),
  output: Object.freeze({
    headline: '표현하고 만들어 내는 방식',
    summary:
      '식신·상관 계열은 내가 밖으로 내보내는 힘으로, 표현·생산·창작·결과물을 밖으로 꺼내는 방식과 연결되는 주제로 읽습니다.',
    concise:
      '식신·상관 계열은 표현·생산·창작과 결과물을 밖으로 꺼내는 방식과 연결되는 주제로 읽습니다.',
  }),
  wealth: Object.freeze({
    headline: '현실 자원과 결과를 다루는 방식',
    summary:
      '재성 계열은 내가 제어하고 운용하는 현실 자원의 축으로, 돈 자체의 길흉보다 자원·성과·관리 문제와 연결되는 주제로 읽습니다.',
    concise:
      '재성 계열은 돈의 길흉보다 자원·성과·관리 문제를 다루는 방식과 연결되는 주제로 읽습니다.',
  }),
  officer: Object.freeze({
    headline: '책임과 요구를 받아들이는 방식',
    summary:
      '관성 계열은 나를 제어하는 힘으로, 규칙·책임·역할·외부 요구와 압박을 다루는 방식과 연결되는 주제로 읽습니다.',
    concise:
      '관성 계열은 규칙·책임·역할과 외부 요구·압박을 다루는 방식과 연결되는 주제로 읽습니다.',
  }),
});

const THEME_DEFINITIONS: readonly ApprovedConciseDefinitionV1[] =
  Object.freeze(
    (
      [
        ['peer', 'PEER'],
        ['resource', 'RESOURCE'],
        ['output', 'OUTPUT'],
        ['wealth', 'WEALTH'],
        ['officer', 'OFFICER'],
      ] as const
    ).flatMap(([family, claimFamily]) =>
      (['VISIBLE_STEMS', 'BRANCHES'] as const).map((channel) =>
        Object.freeze(
          usefulDefinition(
            `general-natal-${family}-${channel.toLowerCase().replace('_', '-')}-concise-v1`,
            `GENERAL_NATAL_${claimFamily}_${channel}_THEME`,
            Object.freeze({
              headline: THEME_COPY[family].headline,
              summary: THEME_COPY[family].summary,
            }),
            THEME_PROHIBITED_EXTENSIONS,
            THEME_COPY[family].concise,
          ),
        ),
      ),
    ),
  );

const APPROVED_CONCISE_DEFINITIONS: readonly ApprovedConciseDefinitionV1[] =
  Object.freeze([
    ...STRUCTURAL_DEFINITIONS,
    ...BASELINE_DEFINITIONS,
    ...THEME_DEFINITIONS,
  ]);

function expectedSourcePresentationHash(
  definition: ApprovedConciseDefinitionV1,
): string {
  return deterministicContentHash({
    policyVersion:
      OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
    canonicalText: definition.standardText,
    semanticQualifiers: definition.semanticQualifiers,
    prohibitedExtensions: definition.prohibitedExtensions,
  });
}

function approvalKey(input: {
  claimType: string;
  methodologyRef: { id: string; version: string };
  sourcePresentationHash: string;
}): string {
  return deterministicContentHash({
    claimType: input.claimType,
    methodologyRef: input.methodologyRef,
    sourcePresentationHash: input.sourcePresentationHash,
  });
}

const APPROVAL_BY_TARGET = new Map(
  APPROVED_CONCISE_DEFINITIONS.map((definition) => [
    approvalKey({
      claimType: definition.claimType,
      methodologyRef: definition.methodologyRef,
      sourcePresentationHash: expectedSourcePresentationHash(definition),
    }),
    definition,
  ]),
);

export function buildApprovedOfficialReadingConciseProfilesV1(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
): readonly OfficialReadingConcisePresentationProfileV1[] {
  const primaryIds = new Set(
    plan.sections
      .filter(
        (section) =>
          section.semanticGroup !== 'evidence' &&
          section.semanticGroup !== 'limits',
      )
      .flatMap((section) => section.primaryUnitRefs),
  );

  const profiles: OfficialReadingConcisePresentationProfileV1[] = [];
  for (const unit of bundle.units) {
    if (!primaryIds.has(unit.unitId)) continue;

    const sourcePresentationHash =
      officialReadingStandardPresentationHashV1(unit);
    const definition = APPROVAL_BY_TARGET.get(
      approvalKey({
        claimType: unit.claimType,
        methodologyRef: {
          id: unit.methodologyRef.id,
          version: unit.methodologyRef.version,
        },
        sourcePresentationHash,
      }),
    );
    if (definition === undefined) continue;

    profiles.push({
      schemaVersion:
        OFFICIAL_READING_CONCISE_PRESENTATION_PROFILE_SCHEMA_VERSION,
      profileId: definition.profileId,
      profileVersion: definition.profileVersion,
      semanticKey: unit.semanticKey,
      claimType: unit.claimType,
      methodologyRef: {
        id: unit.methodologyRef.id,
        version: unit.methodologyRef.version,
      },
      ...(unit.scenarioRef === undefined
        ? {}
        : { scenarioRef: unit.scenarioRef }),
      sourcePresentationHash,
      conciseText: definition.conciseText,
    });
  }

  return profiles.sort((left, right) => {
    const targetOrder = left.semanticKey.localeCompare(right.semanticKey);
    if (targetOrder !== 0) return targetOrder;
    const scenarioOrder = (left.scenarioRef ?? '').localeCompare(
      right.scenarioRef ?? '',
    );
    if (scenarioOrder !== 0) return scenarioOrder;
    return left.profileId.localeCompare(right.profileId);
  });
}

export function approvedOfficialReadingConciseProfileSetHashV1(
  readiness: OfficialReadingConcisePresentationReadinessV1,
): string | undefined {
  if (readiness.state !== 'ready') return undefined;
  return deterministicContentHash({
    registryVersion: OFFICIAL_READING_APPROVED_CONCISE_REGISTRY_VERSION,
    readinessPolicyVersion:
      OFFICIAL_READING_CONCISE_PRESENTATION_READINESS_POLICY_VERSION,
    bindings: readiness.bindings.map((binding) => ({
      unitId: binding.unitId,
      profileId: binding.profileId,
      profileVersion: binding.profileVersion,
      sourcePresentationHash: binding.sourcePresentationHash,
      conciseText: binding.conciseText,
    })),
  });
}
