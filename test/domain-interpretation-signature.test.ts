import { describe, expect, it } from 'vitest';
import type { ClaimRelation, InterpretationClaim } from '../src/contracts/interpretation.js';
import type { ReadingEvidenceSelection } from '../src/contracts/reading.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

function claim(
  claimId: string,
  value: Record<string, unknown>,
  options: {
    scenarioRef?: string;
    tier?: 'T8' | 'T9';
    category?: string;
    state?: InterpretationClaim['state'];
    methodologyId?: string;
  } = {},
): InterpretationClaim {
  const tier = options.tier ?? 'T8';
  return {
    claimId,
    schemaVersion: '1.0.0',
    snapshotId: `snapshot-${claimId}`,
    ...(options.scenarioRef === undefined ? {} : { scenarioRef: options.scenarioRef }),
    taxonomy: {
      tier,
      category: options.category ?? 'career',
      subcategory: 'ten_god_visible_stems',
    },
    claimType: 'CAREER_NATAL_TEN_GOD_JEONG_GWAN_VISIBLE_STEMS',
    subject: 'natal_chart',
    predicate: 'career_conclusion',
    value,
    methodologyRef: { id: options.methodologyId ?? 'M-CAREER', version: '1.0.0' },
    ruleRefs: [
      { ruleId: `rule-${claimId}`, version: '1.0.0', evaluationId: `eval-${claimId}` },
    ],
    factRefs: ['derivedFacts.tenGods'],
    upstreamClaimRefs: [],
    sourceRefs: ['source-career'],
    polarity: 'neutral',
    emphasis: 'moderate',
    state: options.state ?? 'active',
  };
}

function selection(
  selectedClaimIds: readonly string[],
  scenarioRefs: readonly string[] = [],
): ReadingEvidenceSelection {
  return {
    selectionId: 'selection-ignored-by-signature',
    intent: { domain: 'career', temporalScope: 'natal' },
    coverageState: 'complete',
    targetClaimIds: [...selectedClaimIds],
    selectedClaimIds: [...selectedClaimIds],
    omittedClaimIds: [],
    missingRequirements: [],
    scenarioRefs,
    conflictRelationIds: [],
    constraints: {
      mayGenerateClaims: false,
      mayResolveConflicts: false,
      mayCollapseScenarios: false,
      mayPromoteResearchAuthority: false,
    },
  };
}

const BASE_VALUE = {
  careerKind: 'fit',
  tenGod: '정관',
  channel: 'visible_stems',
  headline: '역할과 기준이 명확한 구조',
  summary: '소비자용 문장 A',
  specificOccupationAuthorized: false,
};

describe('verification-only domain interpretation signature', () => {
  it('ignores claim identity, methodology identity, and presentation-only prose', () => {
    const first = deriveDomainInterpretationSignatures(
      [claim('a', BASE_VALUE)],
      [],
      selection(['a']),
    )[0];
    const second = deriveDomainInterpretationSignatures(
      [
        claim(
          'b',
          {
            ...BASE_VALUE,
            headline: '완전히 다른 헤드라인',
            summary: '완전히 다른 소비자 문장',
          },
          { methodologyId: 'M-CAREER-ALTERNATE' },
        ),
      ],
      [],
      selection(['b']),
    )[0];

    expect(first?.signature).toBe(second?.signature);
    expect(JSON.stringify(first?.material)).not.toContain('소비자용 문장 A');
    expect(JSON.stringify(second?.material)).not.toContain('완전히 다른 소비자 문장');
    expect(JSON.stringify(second?.material)).not.toContain('M-CAREER-ALTERNATE');
  });

  it('changes when structured semantic material changes', () => {
    const first = deriveDomainInterpretationSignatures(
      [claim('a', BASE_VALUE)],
      [],
      selection(['a']),
    )[0];
    const second = deriveDomainInterpretationSignatures(
      [claim('b', { ...BASE_VALUE, tenGod: '편관' })],
      [],
      selection(['b']),
    )[0];

    expect(first?.signature).not.toBe(second?.signature);
  });

  it('is deterministic across selected claim input order', () => {
    const a = claim('a', BASE_VALUE);
    const b = {
      ...claim('b', { ...BASE_VALUE, tenGod: '편재' }),
      claimType: 'CAREER_NATAL_TEN_GOD_PYEON_JAE_VISIBLE_STEMS',
    } satisfies InterpretationClaim;

    const first = deriveDomainInterpretationSignatures([a, b], [], selection(['a', 'b']))[0];
    const second = deriveDomainInterpretationSignatures([b, a], [], selection(['b', 'a']))[0];

    expect(first?.signature).toBe(second?.signature);
  });

  it('excludes unselected, non-T8, cross-domain, and inactive claims', () => {
    const baseline = claim('a', BASE_VALUE);
    const ignored = [
      claim('unselected', { ...BASE_VALUE, tenGod: '편관' }),
      claim('t9', { ...BASE_VALUE, tenGod: '편재' }, { tier: 'T9' }),
      claim('wealth', { ...BASE_VALUE, tenGod: '정재' }, { category: 'wealth' }),
      claim('retracted', { ...BASE_VALUE, tenGod: '상관' }, { state: 'retracted' }),
    ];

    const first = deriveDomainInterpretationSignatures(
      [baseline],
      [],
      selection(['a']),
    )[0];
    const second = deriveDomainInterpretationSignatures(
      [baseline, ...ignored],
      [],
      selection(['a', 't9', 'wealth', 'retracted']),
    )[0];

    expect(first?.signature).toBe(second?.signature);
  });

  it('derives each scenario from global plus that scenario only', () => {
    const global = claim('global', BASE_VALUE);
    const scenarioA = claim(
      'scenario-a',
      { ...BASE_VALUE, tenGod: '편관' },
      { scenarioRef: 'scenario-a' },
    );
    const scenarioB = claim(
      'scenario-b',
      { ...BASE_VALUE, tenGod: '편재' },
      { scenarioRef: 'scenario-b' },
    );
    const signatures = deriveDomainInterpretationSignatures(
      [global, scenarioA, scenarioB],
      [],
      selection(['global', 'scenario-a', 'scenario-b'], ['scenario-a', 'scenario-b']),
    );

    expect(signatures.map((item) => item.scenarioRef)).toEqual(['scenario-a', 'scenario-b']);
    expect(signatures[0]?.material.claims).toHaveLength(2);
    expect(signatures[1]?.material.claims).toHaveLength(2);
    expect(signatures[0]?.signature).not.toBe(signatures[1]?.signature);
  });

  it('does not let scenario identity create false semantic diversity', () => {
    const scenarioA = claim('scenario-a', BASE_VALUE, { scenarioRef: 'scenario-a' });
    const scenarioB = claim('scenario-b', BASE_VALUE, { scenarioRef: 'scenario-b' });
    const signatures = deriveDomainInterpretationSignatures(
      [scenarioA, scenarioB],
      [],
      selection(['scenario-a', 'scenario-b'], ['scenario-a', 'scenario-b']),
    );

    expect(signatures[0]?.scenarioRef).toBe('scenario-a');
    expect(signatures[1]?.scenarioRef).toBe('scenario-b');
    expect(signatures[0]?.signature).toBe(signatures[1]?.signature);
  });

  it('includes semantic relation topology without relation IDs or prose reasons', () => {
    const a = claim('a', BASE_VALUE);
    const b = {
      ...claim('b', { ...BASE_VALUE, tenGod: '편관' }),
      claimType: 'CAREER_NATAL_TEN_GOD_PYEON_GWAN_VISIBLE_STEMS',
    } satisfies InterpretationClaim;
    const relation: ClaimRelation = {
      relationId: 'volatile-relation-id',
      fromClaimId: 'a',
      toClaimId: 'b',
      relation: 'qualifies',
      reason: 'consumer-facing or audit prose must not define semantic identity',
    };

    const withoutRelation = deriveDomainInterpretationSignatures(
      [a, b],
      [],
      selection(['a', 'b']),
    )[0];
    const withRelation = deriveDomainInterpretationSignatures(
      [a, b],
      [relation],
      selection(['a', 'b']),
    )[0];

    expect(withoutRelation?.signature).not.toBe(withRelation?.signature);
    expect(withRelation?.material.relations).toHaveLength(1);
    expect(JSON.stringify(withRelation?.material)).not.toContain('volatile-relation-id');
    expect(JSON.stringify(withRelation?.material)).not.toContain('consumer-facing');
  });
});
