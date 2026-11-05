import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticUnitV1,
} from './canonical-reading-semantics.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';
import type { OfficialReadingRenderedContentV1 } from './official-reading-renderer.js';

export const OFFICIAL_READING_SEMANTIC_SOURCE_HANDOFF_VERSION =
  'myeongha-official-reading-semantic-source-handoff-v1' as const;

export interface OfficialReadingSemanticSourceUnitHandoff {
  unitId: string;
  claimId: string;
  claimType: string;
  semanticKey: string;
  role: 'primary' | 'supporting';
  methodology: { id: string; version: string };
  sourceRefs: readonly string[];
  factRefs: readonly string[];
  upstreamClaimRefs: readonly string[];
  canonicalText?: { headline?: string; summary?: string };
  qualifiers: readonly {
    qualifierId: string;
    kind: 'condition' | 'qualifier' | 'tension' | 'boundary';
    semanticScope: string;
    canonicalText?: { headline?: string; summary?: string };
    prohibitedExtensions: readonly string[];
  }[];
  prohibitedExtensions: readonly string[];
}

export interface OfficialReadingSemanticSourceSectionHandoff {
  sectionId: string;
  semanticGroup: string;
  /** Existing plan order is preserved; no new priority, reasoning or claim. */
  primaryUnitRefs: readonly string[];
  supportingUnitRefs: readonly string[];
  prohibitedExtensions: readonly string[];
}

export interface OfficialReadingSemanticSourceHandoff {
  version: typeof OFFICIAL_READING_SEMANTIC_SOURCE_HANDOFF_VERSION;
  snapshotId: string;
  interpretationRunId: string;
  registrySnapshotId: string;
  semanticHash: string;
  sourceEvidenceHash: string;
  officialPlanId: string;
  officialPlanHash: string;
  officialReportId: string;
  officialReportHash: string;
  sections: readonly OfficialReadingSemanticSourceSectionHandoff[];
  units: readonly OfficialReadingSemanticSourceUnitHandoff[];
  /** Reader may select only source-qualified units and must retain qualifiers. */
  postPurchaseSummary: {
    referenceReportId: string;
    referenceReportHash: string;
    eligiblePrimaryUnitRefs: readonly string[];
    mustRetainUnitQualifiers: true;
    mayGenerateNewMeaning: false;
  };
  /** Records must point to the same immutable Official Reading, not re-interpret. */
  longFormRecord: {
    referenceReportId: string;
    referenceReportHash: string;
    sourceSemanticHash: string;
    referencedUnitRefs: readonly string[];
    mustRetainUnitQualifiers: true;
    mayGenerateNewMeaning: false;
  };
  constraints: {
    internalReferenceOnly: true;
    mayGrantReaderAccess: false;
    mayGrantRecordStorage: false;
    mayGrantPublication: false;
    mayGrantCommerce: false;
    mayGenerateNewMeaning: false;
  };
}

function sourceUnit(unit: CanonicalReadingSemanticUnitV1): OfficialReadingSemanticSourceUnitHandoff {
  return {
    unitId: unit.unitId,
    claimId: unit.claimId,
    claimType: unit.claimType,
    semanticKey: unit.semanticKey,
    role: unit.role,
    methodology: { ...unit.methodologyRef },
    sourceRefs: [...unit.sourceRefs],
    factRefs: [...unit.factRefs],
    upstreamClaimRefs: [...unit.upstreamClaimRefs],
    ...(unit.canonicalText === undefined ? {} : {
      canonicalText: { ...unit.canonicalText },
    }),
    qualifiers: (unit.semanticQualifiers ?? []).map(qualifier => ({
      qualifierId: qualifier.qualifierId,
      kind: qualifier.kind,
      semanticScope: qualifier.semanticScope,
      ...(qualifier.canonicalText === undefined ? {} : {
        canonicalText: { ...qualifier.canonicalText },
      }),
      prohibitedExtensions: [...qualifier.prohibitedExtensions],
    })),
    prohibitedExtensions: [...unit.prohibitedExtensions],
  };
}

/**
 * An immutable Saju-owned meaning/provenance handoff for the existing two
 * consumer presentations: a short after-purchase Reader delivery and the
 * full Records report. Neither is re-interpreted here, and neither obtains
 * permission to display, store, charge or access a reading.
 *
 * Validation is against the actual Canonical semantic bundle, Official plan,
 * already-rendered report and explainability index. A different person's
 * report, a changed Korean sentence or a forged unit is rejected.
 */
export function buildOfficialReadingSemanticSourceHandoff(
  bundle: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  report: OfficialReadingRenderedContentV1,
): OfficialReadingSemanticSourceHandoff {
  assertCanonicalReadingSemanticBundleV1(bundle);
  assertOfficialReadingPlanV1(plan, bundle);

  const { reportId, reportHash, ...reportMaterial } = report;
  const expectedHash = deterministicContentHash(reportMaterial);
  if (
    report.sourceSemanticHash !== bundle.semanticHash ||
    plan.sourceSemanticHash !== bundle.semanticHash ||
    report.sourcePlanHash !== plan.planHash ||
    reportHash !== expectedHash ||
    reportId !== 'official_reading_report_' + expectedHash.slice(0, 24)
  ) {
    throw new TypeError('Saju Official source handoff rejects mismatched or altered semantic/report identity.');
  }
  const semanticById = new Map(bundle.units.map(unit => [unit.unitId, unit]));
  const ordered: CanonicalReadingSemanticUnitV1[] = [];
  const visited = new Set<string>();
  const sections = plan.sections.filter(section =>
    section.semanticGroup !== 'evidence' && section.semanticGroup !== 'limits',
  ).map(section => {
    for (const unitId of [...section.primaryUnitRefs, ...section.supportingUnitRefs]) {
      const unit = semanticById.get(unitId);
      if (unit === undefined) {
        throw new TypeError('Saju Official source handoff references a missing canonical semantic unit.');
      }
      if (!visited.has(unitId)) {
        ordered.push(unit);
        visited.add(unitId);
      }
    }
    return {
      sectionId: section.sectionId,
      semanticGroup: section.semanticGroup,
      primaryUnitRefs: [...section.primaryUnitRefs],
      supportingUnitRefs: [...section.supportingUnitRefs],
      prohibitedExtensions: [...section.prohibitedExtensions],
    };
  });
  const primary = [...new Set(sections.flatMap(section => section.primaryUnitRefs))];
  if (primary.length === 0) {
    throw new TypeError('Saju Official source handoff has no renderable primary source units.');
  }
  // The renderer's explainability must account for every primary unit of the
  // actual Official plan. A guessed title or a report hash alone is not proof.
  const visibleRefs = new Set(report.explainability.entries.flatMap(entry =>
    entry.primaryUnitRefs ?? []));
  if (primary.some(unitId => !visibleRefs.has(unitId))) {
    throw new TypeError('Saju Official source handoff is missing rendered primary explainability.');
  }
  return {
    version: OFFICIAL_READING_SEMANTIC_SOURCE_HANDOFF_VERSION,
    snapshotId: bundle.snapshotId,
    interpretationRunId: bundle.interpretationRunId,
    registrySnapshotId: bundle.registrySnapshotId,
    semanticHash: bundle.semanticHash,
    sourceEvidenceHash: bundle.sourceEvidenceHash,
    officialPlanId: plan.planId,
    officialPlanHash: plan.planHash,
    officialReportId: report.reportId,
    officialReportHash: report.reportHash,
    sections,
    units: ordered.map(sourceUnit),
    postPurchaseSummary: {
      referenceReportId: report.reportId,
      referenceReportHash: report.reportHash,
      eligiblePrimaryUnitRefs: primary,
      mustRetainUnitQualifiers: true,
      mayGenerateNewMeaning: false,
    },
    longFormRecord: {
      referenceReportId: report.reportId,
      referenceReportHash: report.reportHash,
      sourceSemanticHash: bundle.semanticHash,
      referencedUnitRefs: ordered.map(unit => unit.unitId),
      mustRetainUnitQualifiers: true,
      mayGenerateNewMeaning: false,
    },
    constraints: {
      internalReferenceOnly: true,
      mayGrantReaderAccess: false,
      mayGrantRecordStorage: false,
      mayGrantPublication: false,
      mayGrantCommerce: false,
      mayGenerateNewMeaning: false,
    },
  };
}
