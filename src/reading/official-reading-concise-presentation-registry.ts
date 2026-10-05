import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
} from '../research/general-natal-t8-structural-summary-candidate.js';
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
  'myeonghwa-official-reading-approved-concise-registry-v1' as const;

interface ApprovedGeneralConciseDefinitionV1 {
  profileId: string;
  profileVersion: '1';
  standardText: CanonicalReadingSemanticTextV1;
  conciseText: string;
}

const GENERAL_QUALIFIER_MATERIAL = Object.freeze([
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

const GENERAL_PROHIBITED_EXTENSIONS = Object.freeze([
  'classificationAuthorized',
  'fortunePolarityAuthorized',
  'monthBranchExclusiveAuthority',
  'numericMonthBranchMultiplier',
  'numericScoringAuthorized',
  'strengthClassifier',
  'universalRootOrdering',
  'upstreamEvidenceDirectionAsFortuneMeaningAuthorized',
]);

const GENERAL_APPROVED_CONCISE_DEFINITIONS: readonly ApprovedGeneralConciseDefinitionV1[] =
  Object.freeze([
    Object.freeze({
      profileId: 'general-natal-month-branch-peer-concise-v1',
      profileVersion: '1' as const,
      standardText: Object.freeze({
        headline: '월지와 일간이 같은 오행 관계입니다',
        summary:
          '월지의 오행이 일간과 같은 오행으로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
      }),
      conciseText:
        '월지와 일간은 같은 오행으로 연결되며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    }),
    Object.freeze({
      profileId: 'general-natal-month-branch-resource-concise-v1',
      profileVersion: '1' as const,
      standardText: Object.freeze({
        headline: '월지가 일간을 생하는 관계입니다',
        summary:
          '월지의 오행이 일간을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
      }),
      conciseText:
        '월지가 일간을 생하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    }),
    Object.freeze({
      profileId: 'general-natal-month-branch-output-concise-v1',
      profileVersion: '1' as const,
      standardText: Object.freeze({
        headline: '일간이 월지를 생하는 관계입니다',
        summary:
          '일간의 오행이 월지의 오행을 생하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
      }),
      conciseText:
        '일간이 월지를 생하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    }),
    Object.freeze({
      profileId: 'general-natal-month-branch-wealth-concise-v1',
      profileVersion: '1' as const,
      standardText: Object.freeze({
        headline: '일간이 월지를 극하는 관계입니다',
        summary:
          '일간의 오행이 월지의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
      }),
      conciseText:
        '일간이 월지를 극하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    }),
    Object.freeze({
      profileId: 'general-natal-month-branch-officer-concise-v1',
      profileVersion: '1' as const,
      standardText: Object.freeze({
        headline: '월지가 일간을 극하는 관계입니다',
        summary:
          '월지의 오행이 일간의 오행을 극하는 관계로 연결됩니다. 이 관찰은 월지라는 한 구조축을 설명할 뿐, 명식 전체의 강약이나 길흉을 확정하지 않습니다.',
      }),
      conciseText:
        '월지가 일간을 극하는 관계이며, 이는 명식 전체의 강약이나 길흉을 확정하는 판정이 아닙니다.',
    }),
  ]);

function expectedSourcePresentationHash(
  standardText: CanonicalReadingSemanticTextV1,
): string {
  return deterministicContentHash({
    policyVersion:
      OFFICIAL_READING_STANDARD_PRESENTATION_FINGERPRINT_POLICY_VERSION,
    canonicalText: standardText,
    semanticQualifiers: GENERAL_QUALIFIER_MATERIAL,
    prohibitedExtensions: GENERAL_PROHIBITED_EXTENSIONS,
  });
}

const GENERAL_APPROVAL_BY_SOURCE_HASH = new Map(
  GENERAL_APPROVED_CONCISE_DEFINITIONS.map((definition) => [
    expectedSourcePresentationHash(definition.standardText),
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
    if (
      unit.claimType !== GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_CLAIM_TYPE ||
      unit.methodologyRef.id !==
        GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.methodologyId ||
      unit.methodologyRef.version !==
        GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY.version
    ) {
      continue;
    }

    const sourcePresentationHash =
      officialReadingStandardPresentationHashV1(unit);
    const definition =
      GENERAL_APPROVAL_BY_SOURCE_HASH.get(sourcePresentationHash);
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
