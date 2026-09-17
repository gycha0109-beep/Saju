import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from './general-natal-conclusion-synthesis-candidate.js';

export const GENERAL_NATAL_CONCLUSION_T8_PROVENANCE_AUTHORITY_AUDIT_VERSION =
  'myeonghwa-general-natal-conclusion-t8-provenance-authority-audit-v1' as const;

export type GeneralNatalConclusionT8ProvenanceSupportClass =
  | 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING'
  | 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND'
  | 'STRUCTURAL_RELATION_PARTIAL_CONSUMER_PROJECTION_UNBOUND'
  | 'WHOLE_CHART_SYNTHESIS_UNSUPPORTED_FOR_EXACT_OUTPUT'
  | 'DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT';

interface RuleSupportSpec {
  readonly supportClass: GeneralNatalConclusionT8ProvenanceSupportClass;
  readonly structuralEvidencePresent: boolean;
  readonly evidenceSummary: string;
  readonly exactOutputBlocker: string;
}

const RULE_SUPPORT = Object.freeze({
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-PEER-PRESENT': {
    supportClass: 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered classical sources distinguish 比肩/劫財 as same-kind or peer-side Ten-God relations.',
    exactOutputBlocker:
      'The repository does not bind an immutable passage-level witness to the normalized peer-family grouping and exact emitted family-presence object.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-RESOURCE-PRESENT': {
    supportClass: 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered classical sources distinguish 正印/偏印 as the resource or 印 side of the Ten-God system.',
    exactOutputBlocker:
      'The repository does not bind an immutable passage-level witness to the normalized resource-family grouping and exact emitted family-presence object.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-OUTPUT-PRESENT': {
    supportClass: 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered classical sources distinguish 食神/傷官 as the 我生 output side of the Ten-God system.',
    exactOutputBlocker:
      'The repository does not bind an immutable passage-level witness to the normalized output-family grouping and exact emitted family-presence object.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-WEALTH-PRESENT': {
    supportClass: 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered classical sources distinguish 正財/偏財 as the 我克 wealth side of the Ten-God system.',
    exactOutputBlocker:
      'The repository does not bind an immutable passage-level witness to the normalized wealth-family grouping and exact emitted family-presence object.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-FAMILY-OFFICER-PRESENT': {
    supportClass: 'TAXONOMY_PAIR_SUPPORTED_BUT_PASSAGE_BINDING_MISSING',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered classical sources distinguish 正官/偏官(七殺) as the 克我 officer/power side of the Ten-God system.',
    exactOutputBlocker:
      'The repository does not bind an immutable passage-level witness to the normalized officer-family grouping and exact emitted family-presence object.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-OUTPUT-TO-WEALTH': {
    supportClass: 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Registered source passages explicitly connect 食神/傷官 with 財 and describe output-side generation into wealth-side relations.',
    exactOutputBlocker:
      'The current consumer claim that ideas or skills become concrete results/resources is a modern projection not passage-bound for this exact content hash.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-WEALTH-TO-OFFICER': {
    supportClass: 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Registered source passages explicitly state 財生官 or equivalent wealth-to-officer generation relations.',
    exactOutputBlocker:
      'The current result-to-responsibility consumer interpretation is not directly established by a passage-level exact semantic mapping.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-OFFICER-TO-RESOURCE': {
    supportClass: 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Registered source passages explicitly connect 官 with 印, including 官印相生 and the dependence of 官 on 印 in traditional framing.',
    exactOutputBlocker:
      'The current pressure-to-study/systematization consumer interpretation is not directly established by a passage-level exact semantic mapping.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-PEER-WEALTH-TENSION': {
    supportClass: 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Registered source passages explicitly describe 劫財 damaging, dividing, or competing for 財.',
    exactOutputBlocker:
      'The current autonomy-versus-cost/profit/distribution interpretation is broader than the directly evidenced classical relation.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-WEALTH-RESOURCE-TENSION': {
    supportClass: 'STRUCTURAL_RELATION_SUPPORTED_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Registered source passages explicitly describe 財 damaging 印 and warn about 財旺破印 or equivalent 財/印 conflict.',
    exactOutputBlocker:
      'The current execution-speed-versus-preparation interpretation is broader than the directly evidenced classical relation.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-PEER-OFFICER-TENSION': {
    supportClass: 'STRUCTURAL_RELATION_PARTIAL_CONSUMER_PROJECTION_UNBOUND',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered sources provide officer/control and peer/劫 relations, but the exact peer-versus-officer synthesis is less directly stated than 財/劫 or 財/印 relations.',
    exactOutputBlocker:
      'The current autonomy-versus-external-rules consumer interpretation requires an explicit rule-level semantic bridge that is not presently bound.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-CORE-FIVE-FAMILY-CYCLE': {
    supportClass: 'WHOLE_CHART_SYNTHESIS_UNSUPPORTED_FOR_EXACT_OUTPUT',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered sources establish Ten-God categories and generation/control relations among them.',
    exactOutputBlocker:
      'No registered passage establishes the exact five-family whole-chart synthesis or the current learn-express-result-responsibility consumer sequence.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-WORK-OUTPUT-WEALTH-OFFICER': {
    supportClass: 'DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT',
    structuralEvidencePresent: true,
    evidenceSummary:
      'Output, wealth, and officer relations are individually represented in the registered sources.',
    exactOutputBlocker:
      'No registered passage establishes the exact modern work-role conclusion about making deliverables, checking results, and carrying operational responsibility.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-MONEY-WEALTH-PEER-RESOURCE': {
    supportClass: 'DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered sources discuss 財 with 劫/比 and 印 relations.',
    exactOutputBlocker:
      'No registered passage establishes the exact modern money-management conclusion about allocation, efficiency, desire, and learning/preparation spend.',
  },
  'RULE-GENERAL-NATAL-CONCLUSION-RELATIONSHIP-PEER-OFFICER': {
    supportClass: 'DOMAIN_PROJECTION_UNSUPPORTED_FOR_EXACT_OUTPUT',
    structuralEvidencePresent: true,
    evidenceSummary:
      'The registered sources discuss peer and officer/control categories separately and in broader chart relations.',
    exactOutputBlocker:
      'No registered passage establishes the exact modern interpersonal conclusion about mutual role boundaries and preferred relationship style.',
  },
} satisfies Readonly<Record<string, RuleSupportSpec>>);

const SOURCE_WITNESS_ANCHORS = Object.freeze({
  'SRC-SAMYEONG-TONGHOE-V5-FOUR-LIBRARIES-TENGOD-RELATIONS': Object.freeze([
    '生我/我生/克我/我克',
    '官而無印',
    '財怕劫',
    '印怕財',
    '生克制化',
  ]),
  'SRC-GENERAL-NATAL-YUANHAI-SEMANTICS-WIKISOURCE': Object.freeze([
    '傷官見財',
    '食神生財',
    '財多生官',
    '官印相生',
    '財旺破印',
    '劫財奪財',
  ]),
} as const);

function supportFor(ruleId: string): RuleSupportSpec {
  const spec = RULE_SUPPORT[ruleId as keyof typeof RULE_SUPPORT];
  if (spec === undefined) throw new Error(`Missing provenance support classification for ${ruleId}`);
  return spec;
}

export function buildGeneralNatalConclusionT8ProvenanceAuthorityAudit() {
  const registry = createGeneralNatalConclusionCandidateRegistry();
  const auditedRules = [
    ...GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
    ...GENERAL_NATAL_CONCLUSION_RULES,
  ];
  const snapshotRuleRefs = new Map(
    registry.snapshot.rules.map((ref) => [`${ref.id}@${ref.version}`, ref]),
  );

  const rows = Object.freeze(
    auditedRules.map((rule) => {
      const contentRef = snapshotRuleRefs.get(`${rule.ruleId}@${rule.version}`);
      if (contentRef === undefined) {
        throw new Error(`Registry snapshot missing ${rule.ruleId}@${rule.version}`);
      }
      const support = supportFor(rule.ruleId);
      return Object.freeze({
        ruleId: rule.ruleId,
        version: rule.version,
        contentHash: contentRef.contentHash,
        taxonomy: rule.taxonomy,
        sourceIds: Object.freeze([...new Set(rule.sourceRefs.map((ref) => ref.sourceId))].sort()),
        currentProvenanceQuality: rule.quality.provenanceQuality,
        supportClass: support.supportClass,
        structuralEvidencePresent: support.structuralEvidencePresent,
        evidenceSummary: support.evidenceSummary,
        exactOutputBlocker: support.exactOutputBlocker,
        passageLevelImmutableWitnessBound: false as const,
        exactOutputSemanticsProductionBound: false as const,
        productionEligibleForExactContent: false as const,
      });
    }),
  );

  const sourceWitnesses = Object.freeze(
    registry.sources.map((source) => ({
      sourceId: source.sourceId,
      title: source.title,
      locator: source.locator,
      url: source.url,
      accessedAt: source.accessedAt,
      provenanceTier: source.provenanceTier,
      anchors:
        SOURCE_WITNESS_ANCHORS[source.sourceId as keyof typeof SOURCE_WITNESS_ANCHORS] ??
        Object.freeze([] as string[]),
      repositoryPassageChecksumBound: false as const,
      immutableExternalWitnessBound: false as const,
    })),
  );

  const material = {
    evidenceVersion: GENERAL_NATAL_CONCLUSION_T8_PROVENANCE_AUTHORITY_AUDIT_VERSION,
    issue: '#772' as const,
    auditBaseSha: '61544574bae80a06a0b08e9bced950d860388973' as const,
    status: 'PRODUCTION_PROVENANCE_AUTHORITY_NOT_ESTABLISHED' as const,
    sourceWitnesses,
    rules: rows,
    counts: {
      exactRuleCount: rows.length,
      structuralEvidencePresentCount: rows.filter((row) => row.structuralEvidencePresent).length,
      passageLevelImmutableWitnessBoundCount: rows.filter(
        (row) => row.passageLevelImmutableWitnessBound,
      ).length,
      exactOutputSemanticsProductionBoundCount: rows.filter(
        (row) => row.exactOutputSemanticsProductionBound,
      ).length,
      productionEligibleExactRuleCount: rows.filter(
        (row) => row.productionEligibleForExactContent,
      ).length,
    },
    authorityBoundary: {
      productionSourceTierRegistrationGap: false as const,
      classicalStructuralEvidenceAbsent: false as const,
      exactPassageToContentHashBindingMissing: true as const,
      exactConsumerSemanticBridgeMissing: true as const,
      blanketMultiSourcePromotionAuthorized: false as const,
      productionProvenanceAuthorityEstablished: false as const,
    },
    guardrails: {
      provenanceQualityMutated: false as const,
      sourceTierMutated: false as const,
      lifecyclePromotionPerformed: false as const,
      reviewerAuthorityFabricated: false as const,
      productionActivated: false as const,
      productHostBehaviorChanged: false as const,
      narrativeBehaviorChanged: false as const,
      commerceBehaviorChanged: false as const,
    },
    requiredNextEvidence: Object.freeze([
      'Bind an immutable or repository-pinned passage witness for each asserted source relation.',
      'Map each exact content-addressed rule output to the passage proposition it actually preserves.',
      'Narrow or rewrite any consumer output whose semantic projection exceeds the bound source proposition.',
      'Only after exact support is established, assign a Production-eligible provenance quality to the supported rule content and regenerate downstream content hashes.',
    ]),
    recommendedNextAction:
      'OBTAIN_PASSAGE_PINNED_EXACT_SEMANTIC_SUPPORT_OR_NARROW_UNSUPPORTED_RULE_OUTPUTS_BEFORE_PROVENANCE_PROMOTION' as const,
  };

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
