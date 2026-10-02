import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildSajuR1CanonicalCapabilityRuntimeAudit } from '../src/interpretation/saju-r1-canonical-capability-runtime-audit.js';

describe('SAJU-R1 canonical capability and runtime reachability audit', () => {
  it('tracks the complete 46-row refresh inventory exactly once', () => {
    const audit = buildSajuR1CanonicalCapabilityRuntimeAudit();
    expect(audit.entries).toHaveLength(46);
    expect(new Set(audit.entries.map((entry) => entry.id)).size).toBe(46);
    expect(audit.auditHash).toMatch(/^[a-f0-9]{64}$/u);
  });

  it('keeps every evidence and test path grounded in the repository', () => {
    const audit = buildSajuR1CanonicalCapabilityRuntimeAudit();
    for (const entry of audit.entries) {
      for (const path of [...entry.evidencePaths, ...entry.existingTests]) {
        expect(existsSync(resolve(process.cwd(), path)), `${entry.id}: ${path}`).toBe(true);
      }
    }
  });

  it('does not turn inventory/profile/research/preview observations into semantic authority', () => {
    const audit = buildSajuR1CanonicalCapabilityRuntimeAudit();
    expect(audit.constraints).toEqual({
      auditIsSemanticAuthority: false,
      auditMayPromoteResearchAuthority: false,
      auditMayPromoteProductionAuthority: false,
      readingProfilePresenceIsSemanticAuthority: false,
      researchRuntimePresenceIsProductionAuthority: false,
      previewConsumerAuthorityIsProductionSemanticAuthority: false,
      externalHumanReviewRequired: false,
    });
  });

  it('separates implemented T0 plumbing from structural synthesis gaps', () => {
    const audit = buildSajuR1CanonicalCapabilityRuntimeAudit();
    const byId = new Map(audit.entries.map((entry) => [entry.id, entry]));
    for (const id of [
      'canonical-snapshot',
      'pillars',
      'day-master',
      'ten-god-mapping',
      'hidden-stems',
      'solar-term-context',
      'five-element-facts',
      'luck-cycle-calculation',
      'ambiguity-scenarios',
    ]) {
      expect(byId.get(id)?.runtimeState, id).toBe('IMPLEMENTED');
      expect(byId.get(id)?.runtimeReachable, id).toBe(true);
    }
    for (const id of ['root-tonggen', 'strength', 'dang-zhong', 'gyeokguk', 'johoo', 'xi-yong-ji']) {
      expect(byId.get(id)?.runtimeState, id).toBe('RESEARCH_ONLY');
      expect(byId.get(id)?.productReadiness, id).toBe('NEEDS_RULE_SYNTHESIS');
    }
  });

  it('records the current highest-value next work without inventing a new authority queue', () => {
    const audit = buildSajuR1CanonicalCapabilityRuntimeAudit();
    const byId = new Map(audit.entries.map((entry) => [entry.id, entry]));
    expect(byId.get('relationship-spouse')?.productReadiness).toBe('NEEDS_INTEGRATION');
    expect(byId.get('annual')?.productReadiness).toBe('NEEDS_RULE_SYNTHESIS');
    expect(byId.get('monthly')?.productReadiness).toBe('NEEDS_RULE_SYNTHESIS');
    expect(byId.get('compatibility')?.runtimeState).toBe('MISSING');
    expect(byId.get('question-specific')?.runtimeState).toBe('MISSING');
    expect(byId.get('family-natal')?.productReadiness).toBe('NEEDS_BOUNDED_RESEARCH');
  });
});
