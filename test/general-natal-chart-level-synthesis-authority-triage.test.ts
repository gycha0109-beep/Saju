import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import {
  createGeneralNatalIntegratedReadingRegistry,
  createGeneralNatalIntegratedSourceBoundedResearchRegistry,
} from '../src/interpretation/general-natal-integrated-reading-registry.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { runProductReadingInternals } from '../src/reading/product-reading-service.js';
import {
  GENERAL_NATAL_CONCLUSION_RULES,
  createGeneralNatalConclusionCandidateRegistry,
} from '../src/research/general-natal-conclusion-synthesis-candidate.js';
import {
  buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness,
} from '../src/research/general-natal-conclusion-t8-promotion-provenance-trust-readiness.js';
import {
  collectGeneralNatalBridgeReentryEvidence,
  evaluateGeneralNatalBridgeReentryReadiness,
} from '../src/research/general-natal-source-bounded-bridge-reentry-readiness.js';

const NOW = new Date('2026-10-12T06:00:00.000Z');
const READING = { requestId: 'ws-d-next-2-synthesis-triage', text: '전체 사주' };

function chart(year: number, month: number, day: number, hour: number, sex: 'male' | 'unspecified') {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year, month, day },
    time: { known: true, hour, minute: 30 },
    sexForTraditionalCalculation: sex,
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now: NOW });
}

describe('WS-D-NEXT-2: distinguish rendering loss from missing consumer synthesis authority', () => {
  it('proves the actual delivered Preview retains its selected bounded T8s without a cross-structure conclusion', async () => {
    const snapshot = chart(2024, 3, 10, 12, 'unspecified');
    const registry = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const product = await runProductReadingInternals(snapshot, execution, registry, READING, {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'ws-d-next-2-synthesis-triage-preview',
      artifactGeneratedAt: NOW,
    });
    const selection = product.execution.preparation.composition?.selection;
    const semantic = product.execution.canonicalSemantics;
    const report = product.execution.officialReadingReport;
    const reading = product.response.reading;
    expect(execution.integrity.valid).toBe(true);
    expect(selection?.coverageState).toBe('complete');
    expect(selection?.profileAuthorization.state).toBe('authorized');
    expect(product.execution.state).toBe('completed');
    expect(reading).toBeDefined();
    expect(product.response.state).toBe('delivered');
    if (!semantic || !report || !selection || !reading) {
      throw new Error('Integrated Preview must produce an auditable Official Reading');
    }
    expect(semantic.targetClaimIds).toEqual(selection.targetClaimIds);
    expect(report.sourceSemanticHash).toBe(semantic.semanticHash);
    const selectedClaims = execution.claims.filter((claim) =>
      selection.targetClaimIds.includes(claim.claimId),
    );
    expect(selectedClaims.some((claim) => claim.taxonomy.subcategory === 'self_baseline')).toBe(true);
    expect(selectedClaims.some((claim) => claim.taxonomy.subcategory === 'month_branch_structural_context')).toBe(true);
    expect(selectedClaims.some((claim) => claim.predicate === 'consumer_theme')).toBe(true);
    // Existing research T8s are independently bounded axes; none is a
    // multi-family consumer conclusion disguised by the Official renderer.
    expect(selectedClaims.some((claim) => claim.predicate === 'consumer_conclusion')).toBe(false);
    expect(registry.rules.some((rule) =>
      rule.output.predicate === 'consumer_conclusion',
    )).toBe(false);
    expect(JSON.stringify(reading.sections)).toContain('월지');
    expect(inspectMyeonghwaProductionComposition({ registry }).status).toBe('blocked');
  });

  it('identifies existing multi-family consumer T8 research as executable but not admitted to the default Preview', () => {
    const preview = createGeneralNatalIntegratedReadingRegistry(NOW.toISOString());
    const candidate = createGeneralNatalConclusionCandidateRegistry(NOW.toISOString());
    const researchExecution = runInterpretation(
      chart(2024, 3, 10, 12, 'unspecified'),
      candidate,
      { now: NOW },
    );
    const candidateRuleIds = new Set(GENERAL_NATAL_CONCLUSION_RULES.map((rule) => rule.ruleId));
    expect(candidateRuleIds.size).toBe(10);
    expect(candidate.rules.some((rule) =>
      candidateRuleIds.has(rule.ruleId),
    )).toBe(true);
    expect(preview.rules.some((rule) => candidateRuleIds.has(rule.ruleId))).toBe(false);
    expect(researchExecution.integrity.valid).toBe(true);
    expect(researchExecution.claims.some((claim) =>
      claim.taxonomy.tier === 'T8' && claim.taxonomy.category === 'general' &&
      claim.predicate === 'consumer_conclusion',
    )).toBe(true);

    const readiness = buildGeneralNatalConclusionT8PromotionProvenanceTrustReadiness();
    expect(readiness.researchRuntime.researchRuntimeReachable).toBe(true);
    expect(readiness.runtimePassageAuthority.exactConsumerPassageSupportReady).toBe(false);
    expect(readiness.runtimeQualityAuthority.productionRuleReviewerReady).toBe(false);
    expect(readiness.readiness.productionAdmissionAuthority).toBe(false);
    expect(readiness.readiness.productionState).toBe('HOLD');
    expect(inspectMyeonghwaProductionComposition({ registry: candidate }).status).toBe('blocked');
  });

  it('retains research-only structural T8s while explicitly rejecting consumer projection', () => {
    const snapshot = chart(1984, 6, 14, 5, 'male');
    const registry = createGeneralNatalIntegratedSourceBoundedResearchRegistry(NOW.toISOString());
    const execution = runInterpretation(snapshot, registry, { now: NOW });
    const relations = execution.claims.filter((claim) =>
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'general' &&
      claim.taxonomy.subcategory === 'source_bounded_relation',
    );
    expect(relations.length).toBeGreaterThan(0);
    expect(relations.every((claim) =>
      typeof claim.value === 'object' && claim.value !== null &&
      'consumerProjectionAuthorized' in claim.value &&
      claim.value.consumerProjectionAuthorized === false,
    )).toBe(true);
    const preparation = prepareProductReading(snapshot, execution, registry, READING);
    expect(preparation.composition?.selection.coverageState).toBe('complete');
    expect(preparation.state).toBe('invariant_blocked');
    expect(preparation.reasonCodes).toContain('TARGET_CLAIM_CONSUMER_PROJECTION_NOT_AUTHORIZED');
    const bridge = evaluateGeneralNatalBridgeReentryReadiness(
      collectGeneralNatalBridgeReentryEvidence(),
    );
    expect(bridge.sourceIntegrity.ready).toBe(false);
    expect(bridge.bridgeReentryReady).toBe(false);
    expect(bridge.nextDisposition).toBe('RETURN_TO_RESEARCH');
  });
});
