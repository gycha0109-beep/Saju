import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import {
  evaluateFamilySourceScopeV1, evaluatePairwiseSourceScopeV1,
  FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION,
} from '../src/research/family-pair-source-scope-handoff.js';
import {
  R070_CLAIM_LAYERS, R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION,
} from '../src/research/general-natal-family-domain-claim-corpus.js';
import {
  R068_DIRECT_CLAIMS,
} from '../src/research/general-natal-relationship-claim-corpus.js';
import {
  R069_DIRECT_CLAIMS,
} from '../src/research/general-natal-spouse-claim-corpus.js';

const now = new Date('2026-10-22T02:00:00.000Z');
function chart(input: {
  year?: number;
  day?: number;
  sex?: 'male' | 'female' | 'unspecified';
  timeKnown?: boolean;
} = {}) {
  return calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: input.year ?? 1990, month: 5, day: input.day ?? 15 },
    time: input.timeKnown === false
      ? { known: false as const }
      : { known: true as const, hour: 14, minute: 30 },
    sexForTraditionalCalculation: input.sex ?? 'unspecified',
  }, PRODUCTION_DEFAULT_CALCULATION_POLICY, { now });
}

function familyCandidate(
  report: ReturnType<typeof evaluateFamilySourceScopeV1>,
  surface: string,
) {
  const candidate = report.methodCandidates.find(item => item.sourceSurface === surface);
  if (!candidate) throw new TypeError('Missing R070 historical source surface: ' + surface);
  return candidate;
}

describe('R070 family source scope against actual Canonical birth evidence', () => {
  it('distinguishes exact parent month domain wording from male-only alternative and section-specific star', () => {
    const snapshot = chart();
    const report = evaluateFamilySourceScopeV1(snapshot, 'parents');
    expect(report.version).toBe(FAMILY_PAIR_SOURCE_SCOPE_HANDOFF_VERSION);
    expect(report.snapshotId).toBe(snapshot.snapshotId);
    expect(report.calculationHash).toBe(snapshot.calculationHash);
    expect(report.corpusVersion).toBe(R070_FAMILY_DOMAIN_CLAIM_CORPUS_VERSION);
    const month = familyCandidate(report, '月為父母兄弟門戶');
    expect(month.disposition).toBe('APPLICABLE_BOUNDED');
    expect(month.observedFactPath).toBe('pillars.month');
    expect(month.observedPillar).toBe(
      snapshot.pillars.month.status === 'resolved'
        ? snapshot.pillars.month.value.stem.value + snapshot.pillars.month.value.branch.value
        : undefined,
    );
    expect(month.familyMeaningAuthorized).toBe(false);
    expect(familyCandidate(report, '年為父').disposition).toBe('NARROW_OR_REPLACE');
    expect(report.methodCoexistences).toEqual([]);
    expect(familyCandidate(report, '父以偏財論').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(report, '母以印綬論').disposition).toBe('INCONCLUSIVE');
    expect(report.methodCandidates.every(item =>
      R070_CLAIM_LAYERS.some(layer =>
        layer.id === item.sourceLayerId &&
        (layer.sourceSurfaces as readonly string[]).includes(item.sourceSurface),
      ),
    )).toBe(true);
    expect(report.methodCandidates.some(item => item.sourceSurface === '子嗣者即官星也')).toBe(false);
    expect(report.interpretationDisposition).toBe('INCONCLUSIVE');
    expect(report.familyT8Admitted).toBe(false);
    expect(report.researchOnly).toBe(true);
    expect(report.mayGrantOfficialAuthority).toBe(false);
    expect(report.mayMarkMenuAvailable).toBe(false);
    expect(report.mayPersist).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(evaluateFamilySourceScopeV1(snapshot, 'parents')).toEqual(report);
  });

  it('preserves the historic male father mapping and refuses a missing fetal calculation or full family method', () => {
    const report = evaluateFamilySourceScopeV1(chart({ sex: 'male' }), 'parents');
    expect(familyCandidate(report, '年為父').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(report, '年為父').observedFactPath).toBe('pillars.year');
    expect(familyCandidate(report, '胎為母').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(report, '胎為母').missingPrerequisites).toContain(
      'FETAL_PILLAR_NOT_DEFINED_BY_CANONICAL_SNAPSHOT',
    );
    expect(familyCandidate(report, '月為父母兄弟門戶').disposition).toBe('APPLICABLE_BOUNDED');
    expect(report.missingPrerequisites).toContain('FAMILY_METHOD_SELECTION');
    expect(report.missingPrerequisites).toContain('PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION');
    expect(report.methodCoexistences).toEqual([{
      sourceSurfaces: ['月為父母兄弟門戶', '年為父'],
      calculatedFactPaths: ['pillars.month', 'pillars.year'],
      state: 'COEXISTING_NOT_RECONCILED',
      methodSelectionAuthorized: false,
      missingPrerequisites: [
        'FAMILY_METHOD_SELECTION',
        'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
      ],
    }]);
    expect(report.familyT8Admitted).toBe(false);
  });

  it('keeps child hour domain separate from gender-scoped child star methodology', () => {
    const female = evaluateFamilySourceScopeV1(chart({ sex: 'female' }), 'children');
    const male = evaluateFamilySourceScopeV1(chart({ sex: 'male' }), 'children');
    expect(familyCandidate(female, '時為子息').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(female, '時為子息').observedFactPath).toBe('pillars.hour');
    expect(familyCandidate(female, '時為子孫').disposition).toBe('NARROW_OR_REPLACE');
    expect(familyCandidate(male, '時為子孫').disposition).toBe('APPLICABLE_BOUNDED');
    expect(familyCandidate(female, '我生者為子').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(male, '我生者為子').disposition).toBe('NARROW_OR_REPLACE');
    expect(familyCandidate(female, '子嗣者即官星也').disposition).toBe('INCONCLUSIVE');
    expect(female.methodCoexistences).toEqual([]);
    expect(male.methodCoexistences).toEqual([{
      sourceSurfaces: ['時為子息', '時為子孫'],
      calculatedFactPaths: ['pillars.hour'],
      state: 'COEXISTING_NOT_RECONCILED',
      methodSelectionAuthorized: false,
      missingPrerequisites: [
        'FAMILY_METHOD_SELECTION',
        'PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION',
      ],
    }]);
    expect(female.methodCandidates.some(item => item.sourceSurface === '父以偏財論')).toBe(false);
    expect(female.familyT8Admitted).toBe(false);
    expect(male.familyT8Admitted).toBe(false);
  });

  it('compares exact R070 parent pillar sources against father/mother star methods without combining family meanings', () => {
    const cases = [
      {
        snapshot: chart({ sex: 'unspecified' }),
        expectedPairs: [
          ['月為父母兄弟門戶', '父以偏財論'],
          ['月為父母兄弟門戶', '母以印綬論'],
        ],
      },
      {
        snapshot: chart({ sex: 'male' }),
        expectedPairs: [
          ['月為父母兄弟門戶', '父以偏財論'],
          ['月為父母兄弟門戶', '母以印綬論'],
          ['年為父', '父以偏財論'],
        ],
      },
    ] as const;
    for (const input of cases) {
      const result = evaluateFamilySourceScopeV1(input.snapshot, 'parents');
      expect(result.crossLayerMethodComparisons.map(c => c.sourceSurfaces))
        .toEqual(input.expectedPairs);
      for (const comparison of result.crossLayerMethodComparisons) {
        const pillar = familyCandidate(result, comparison.sourceSurfaces[0]);
        const star = familyCandidate(result, comparison.sourceSurfaces[1]);
        expect(pillar.disposition).toBe('APPLICABLE_BOUNDED');
        expect(star.disposition).toBe('INCONCLUSIVE');
        expect(comparison.sourceLayerIds)
          .toEqual([pillar.sourceLayerId, star.sourceLayerId]);
        expect(comparison.pillarObservation).toEqual({
          factPath: pillar.observedFactPath,
          observedPillar: pillar.observedPillar,
        });
        expect(comparison.starObservation).toEqual(star.tenGodObservation);
        expect(comparison.independentlyAdmittedFamilyClaims).toBe(0);
        expect(comparison.methodSelectionAuthorized).toBe(false);
        expect(comparison.familyMeaningAuthorized).toBe(false);
        expect(comparison.state).toBe('PILLAR_AND_STAR_METHODS_NOT_RECONCILED');
        expect(comparison.missingPrerequisites)
          .toContain('PILLAR_DOMAIN_VS_STAR_RELATION_RECONCILIATION');
        expect(comparison.missingPrerequisites)
          .toContain('HISTORICAL_TO_MODERN_FAMILY_TRANSLATION_NOT_ESTABLISHED');
      }
      expect(result.familyT8Admitted).toBe(false);
      expect(result.mayPublish).toBe(false);
    }
  });

  it('compares child pillar and historical star methods only within their admitted source-sex contexts', () => {
    const cases = [
      {
        sex: 'male' as const,
        pairs: [
          ['時為子息', '子嗣者即官星也'],
          ['時為子孫', '子嗣者即官星也'],
        ],
      },
      {
        sex: 'female' as const,
        pairs: [
          ['時為子息', '子嗣者即官星也'],
          ['時為子息', '我生者為子'],
        ],
      },
      {
        sex: 'unspecified' as const,
        pairs: [['時為子息', '子嗣者即官星也']],
      },
    ] as const;
    for (const input of cases) {
      const result = evaluateFamilySourceScopeV1(
        chart({ sex: input.sex }), 'children',
      );
      expect(result.crossLayerMethodComparisons.map(c => c.sourceSurfaces))
        .toEqual(input.pairs);
      for (const comparison of result.crossLayerMethodComparisons) {
        expect(comparison.pillarObservation.factPath).toBe('pillars.hour');
        expect(comparison.starObservation.sourceFactPath).toBe('derivedFacts.tenGods');
        expect(comparison.starObservation.historicalRelativeRoleAuthorized).toBe(false);
        expect(comparison.independentlyAdmittedFamilyClaims).toBe(0);
        expect(comparison.methodSelectionAuthorized).toBe(false);
        expect(comparison.familyMeaningAuthorized).toBe(false);
        expect(comparison.missingPrerequisites).toContain('FAMILY_METHOD_SELECTION');
      }
      expect(result.familyT8Admitted).toBe(false);
    }
  });

  it('does not manufacture a child pillar/star bridge if the Canonical birth hour is missing', () => {
    const input = chart({ sex: 'female', timeKnown: false });
    const child = evaluateFamilySourceScopeV1(input, 'children');
    const parents = evaluateFamilySourceScopeV1(input, 'parents');
    expect(child.crossLayerMethodComparisons).toEqual([]);
    expect(child.methodCandidates.find(x => x.sourceSurface === '時為子息')
      ?.disposition).toBe('INCONCLUSIVE');
    expect(child.methodCandidates.find(x => x.sourceSurface === '我生者為子')
      ?.tenGodObservation?.status).toBe('incomplete_input');
    expect(parents.crossLayerMethodComparisons).toHaveLength(2);
    for (const comparison of parents.crossLayerMethodComparisons) {
      expect(comparison.starObservation.status).toBe('incomplete_input');
      expect(comparison.missingPrerequisites)
        .toContain('TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED');
    }
    expect(child.familyT8Admitted).toBe(false);
    expect(parents.familyT8Admitted).toBe(false);
  });

  it('preserves R070 configuration phrases as method-unassigned and distinguishes branch-clash facts from outcome interpretation', () => {
    const snapshot = chart({ year: 1997, sex: 'male' });
    const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
    const children = evaluateFamilySourceScopeV1(snapshot, 'children');
    const registered = R070_CLAIM_LAYERS.find(layer =>
      layer.id === 'CONFIGURATION-OUTCOME');
    expect(registered).toBeDefined();
    expect(parent.unassignedConfigurationInputs.map(item => item.sourceSurface))
      .toEqual(registered?.sourceSurfaces);
    expect(children.unassignedConfigurationInputs.map(item => item.sourceSurface))
      .toEqual(registered?.sourceSurfaces);
    expect(parent.unassignedConfigurationInputs).toEqual(children.unassignedConfigurationInputs);
    expect(parent.unassignedConfigurationInputs.every(item =>
      item.sourceLayerId === 'CONFIGURATION-OUTCOME' &&
      item.familyScopeResolved === false &&
      item.disposition === 'INCONCLUSIVE' &&
      item.familyOutcomeAuthorized === false &&
      item.missingPrerequisites.includes('CONFIGURATION_OUTCOME_SETTLEMENT'),
    )).toBe(true);
    for (const item of parent.unassignedConfigurationInputs) {
      if (item.sourceSurface === '刑沖破害') {
        const raw = snapshot.derivedFacts.structuralRelations;
        const expected = raw?.status === 'resolved'
          ? raw.value.filter(relation => relation.kind === 'branch_clash')
            .map(relation => relation.relationId) : [];
        expect(item.observedBranchClashIds).toEqual(expected);
        expect(item.canonicalObservationCoverage).toBe(raw?.status === 'resolved'
          ? 'branch_clash_only' : 'none');
        expect(item.missingPrerequisites)
          .toContain('XING_PO_HAI_AND_CONFIGURATION_INTERACTION_NOT_SETTLED');
      } else if (item.sourceSurface === '官煞混雜' || item.sourceSurface === '財印') {
        const t5 = snapshot.derivedFacts.tenGods;
        expect(item.canonicalObservationCoverage).toBe(t5.status === 'resolved'
          ? 'visible_t5_search_categories_only' : 'none');
        expect(item.canonicalFactPath).toBe(t5.status === 'resolved'
          ? 'derivedFacts.tenGods' : undefined);
        expect(item.observedBranchClashIds).toEqual([]);
        expect(item.tenGodSearchTerms?.map(term => term.sourceTerm))
          .toEqual(item.sourceSurface === '官煞混雜'
            ? ['官', '煞'] : ['財', '印']);
        expect(item.tenGodSearchTerms).toHaveLength(2);
        for (const term of item.tenGodSearchTerms ?? []) {
          expect(term.configurationMeaningAuthorized).toBe(false);
          for (const position of term.observedPositions) {
            expect(position.path).toBe(
              'derivedFacts.tenGods.' + position.slot + '.' + position.channel,
            );
            expect(term.canonicalSearchCategories).toContain(position.value);
            if (t5.status !== 'resolved') throw new TypeError('Missing raw chart fact');
            const raw = t5.value[position.slot][position.channel];
            expect(raw?.status).toBe('resolved');
            if (raw?.status === 'resolved') expect(position.value).toBe(raw.value);
          }
        }
        expect(item.missingPrerequisites)
          .toContain('R070_TEN_GOD_COEXISTENCE_METHOD_NOT_ESTABLISHED');
        expect(item.missingPrerequisites).toContain('HIDDEN_VS_VISIBLE_STAR_HANDLING');
      } else {
        expect(item.canonicalObservationCoverage).toBe('none');
        expect(item.observedBranchClashIds).toEqual([]);
        expect(item.tenGodSearchTerms).toBeUndefined();
        expect(item.canonicalFactPath).toBeUndefined();
      }
    }
    expect(parent.familyT8Admitted).toBe(false);
    expect(children.familyT8Admitted).toBe(false);
  });

  it('keeps unassigned R070 官煞混雜 and 財印 as partially observed T5 search terms with unknown hour', () => {
    const report = evaluateFamilySourceScopeV1(
      chart({ timeKnown: false, sex: 'female' }), 'children',
    );
    for (const surface of ['官煞混雜', '財印'] as const) {
      const item = report.unassignedConfigurationInputs.find(
        candidate => candidate.sourceSurface === surface,
      );
      expect(item?.disposition).toBe('INCONCLUSIVE');
      expect(item?.familyScopeResolved).toBe(false);
      expect(item?.familyOutcomeAuthorized).toBe(false);
      expect(item?.tenGodSearchTerms?.map(term => term.sourceTerm)).toEqual(
        surface === '官煞混雜' ? ['官', '煞'] : ['財', '印'],
      );
      for (const term of item?.tenGodSearchTerms ?? []) {
        expect(term.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.stem');
        expect(term.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.branch');
      }
      expect(item?.missingPrerequisites).toContain('CANONICAL_T5_CONFIGURATION_GROUPS_PARTIAL');
    }
    expect(report.familyT8Admitted).toBe(false);
  });

  it('records literal parent and child T5 occurrences with paths, without turning them into family outcomes', () => {
    const maleSnapshot = chart({ sex: 'male' });
    const femaleSnapshot = chart({ sex: 'female' });
    const maleParents = evaluateFamilySourceScopeV1(maleSnapshot, 'parents');
    const femaleChildren = evaluateFamilySourceScopeV1(femaleSnapshot, 'children');

    const cases = [
      {
        snapshot: maleSnapshot,
        report: maleParents,
        surface: '父以偏財論',
        group: '편재',
        values: ['편재'],
      },
      {
        snapshot: maleSnapshot,
        report: maleParents,
        surface: '母以印綬論',
        group: '인성 계열',
        values: ['편인', '정인'],
      },
      {
        snapshot: femaleSnapshot,
        report: femaleChildren,
        surface: '子嗣者即官星也',
        group: '관성 계열',
        values: ['편관', '정관'],
      },
      {
        snapshot: femaleSnapshot,
        report: femaleChildren,
        surface: '我生者為子',
        group: '식상 계열',
        values: ['식신', '상관'],
      },
    ] as const;
    for (const candidate of cases) {
      const source = familyCandidate(candidate.report, candidate.surface);
      const t5 = source.tenGodObservation;
      expect(source.disposition).toBe('INCONCLUSIVE');
      expect(t5?.sourceSurface).toBe(candidate.surface);
      expect(t5?.sourceFactPath).toBe('derivedFacts.tenGods');
      expect(t5?.observedGroup).toBe(candidate.group);
      expect(t5?.coverage).toBe('visible_stems_and_representative_branch_only');
      expect(t5?.historicalRelativeRoleAuthorized).toBe(false);
      expect(t5?.observedPositions.every(position =>
        candidate.values.some(value => value === position.value))).toBe(true);
      const chartTenGods = candidate.snapshot.derivedFacts.tenGods;
      for (const observed of t5?.observedPositions ?? []) {
        expect(observed.path).toBe(
          'derivedFacts.tenGods.' + observed.slot + '.' + observed.channel,
        );
        if (chartTenGods.status !== 'resolved') throw new TypeError('T5 observation without T5');
        const direct = chartTenGods.value[observed.slot][observed.channel];
        expect(direct?.status).toBe('resolved');
        if (direct?.status === 'resolved') expect(observed.value).toBe(direct.value);
      }
      expect(source.missingPrerequisites).toContain('HIDDEN_VS_VISIBLE_STAR_HANDLING');
      expect(source.missingPrerequisites)
        .toContain('SECTION_SCOPED_STAR_RELATION_METHOD_NOT_SELECTED');
      expect(candidate.report.familyT8Admitted).toBe(false);
    }
    expect(
      familyCandidate(maleParents, '父以偏財論').tenGodObservation?.sourceSurface,
    ).not.toEqual(
      familyCandidate(femaleChildren, '我生者為子').tenGodObservation?.sourceSurface,
    );
  });

  it('preserves incomplete T5 source positions on unknown birth hour without inferring absent relatives', () => {
    const snapshot = chart({ sex: 'female', timeKnown: false });
    const report = evaluateFamilySourceScopeV1(snapshot, 'children');
    const relation = familyCandidate(report, '我生者為子');
    const observation = relation.tenGodObservation;
    expect(observation).toBeDefined();
    expect(relation.disposition).toBe('INCONCLUSIVE');
    expect(observation?.status).toBe('incomplete_input');
    expect(observation?.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.stem');
    expect(observation?.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.branch');
    expect(relation.missingPrerequisites).toContain('TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED');
    expect(observation?.historicalRelativeRoleAuthorized).toBe(false);
    expect(report.familyT8Admitted).toBe(false);
  });

  it('does not promote a child interpretation when birth hour is unknown', () => {
    const snapshot = chart({ year: 1993, timeKnown: false });
    const child = evaluateFamilySourceScopeV1(snapshot, 'children');
    const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
    expect(familyCandidate(child, '時為子息').disposition).toBe('INCONCLUSIVE');
    expect(familyCandidate(child, '時為子息').observedPillar).toBeUndefined();
    expect(familyCandidate(child, '時為子息').missingPrerequisites)
      .toContain('CANONICAL_HOUR_PILLAR_UNRESOLVED');
    expect(familyCandidate(parent, '月為父母兄弟門戶').disposition)
      .toBe('APPLICABLE_BOUNDED');
    expect(child.familyT8Admitted).toBe(false);
    expect(() => evaluateFamilySourceScopeV1(
      snapshot, 'family' as 'parents',
    )).toThrow('exact parents/children');
  });
});

describe('R068/R069 pairwise source boundary on two real Canonical charts', () => {
  it('records the actual 4+4 chart comparison without converting social or spouse corpus into T10', () => {
    const subject = chart({ year: 1989, day: 17 });
    const target = chart({ year: 1995, day: 23 });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'partner', snapshot: target },
    );
    expect(report.subject.snapshotId).toBe(subject.snapshotId);
    expect(report.target.snapshotId).toBe(target.snapshotId);
    expect(report.subject.calculationHash).not.toBe(report.target.calculationHash);
    expect(report.subject.originalScenarioIds)
      .toEqual(subject.scenarios.map(scenario => scenario.scenarioId));
    expect(report.target.originalScenarioIds)
      .toEqual(target.scenarios.map(scenario => scenario.scenarioId));
    expect(report.subject.ambiguousFactPaths).toEqual(subject.completeness.ambiguousPaths);
    expect(report.target.unavailableFactPaths).toEqual(target.completeness.unavailablePaths);
    expect(report.factualPairObservations.map(item => item.pillarSlot))
      .toEqual(['year', 'month', 'day', 'hour']);
    expect(report.factualPairObservations.every(item =>
      item.status === 'both_resolved' && item.pairwiseMeaningAuthorized === false))
      .toBe(true);
    expect(report.factualPairObservations.some(item =>
      item.exactPillarIdentity === 'different')).toBe(true);
    expect(report.factualPairObservations[2]?.subjectFactPath).toBe('subject.pillars.day');
    expect(report.factualPairObservations[2]?.targetFactPath).toBe('target.pillars.day');
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R068')
      .map(item => item.sourceSurface)).toEqual(R068_DIRECT_CLAIMS.map(item => item.sourceSurface));
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .map(item => item.sourceSurface)).toEqual(R069_DIRECT_CLAIMS.map(item => item.sourceSurface));
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R068')
      .map(item => item.originalClaimId)).toEqual(R068_DIRECT_CLAIMS.map(item => item.id));
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .map(item => item.originalClaimId)).toEqual(R069_DIRECT_CLAIMS.map(item => item.id));
    const social = report.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'SOCIAL-FRIENDLINESS-SANHE-LIUHE');
    const context = report.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'COMBINATION-CONTEXT-VARIANCE');
    const spouse = report.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'FEMALE-CONTROLS-ME-HUSBAND');
    expect(social?.missingPrerequisites).toContain('ROMANCE_TRANSFER_EVIDENCE');
    expect(social?.missingPrerequisites).toContain('SOCIAL_VS_KIN_SCOPE');
    expect(context?.missingPrerequisites).toContain('CONTEXT_EFFECT_SETTLEMENT');
    expect(context?.missingPrerequisites).toContain('MULTI_RELATION_CONFLICT');
    expect(spouse?.historicalSexScope).toBe('FEMALE_CHART');
    expect(spouse?.missingPrerequisites).toContain('PAIRWISE_COMPATIBILITY_BRIDGE');
    expect(spouse?.disposition).toBe('REJECTED');
    expect(report.comparedSourceSurfaces.every(item => !item.eligiblePairwiseClaim)).toBe(true);
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R068')
      .every(item => item.disposition === 'NARROW_OR_REPLACE')).toBe(true);
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .every(item => item.disposition === 'REJECTED')).toBe(true);
    expect(report.missingPrerequisites).toContain('ROMANCE_TRANSFER_EVIDENCE');
    expect(report.missingPrerequisites)
      .toContain('EXACT_CROSS_CHART_T10_RULE_WITH_DIRECT_PAIRWISE_SOURCE_NOT_ESTABLISHED');
    expect(report.pairwiseT10Admitted).toBe(false);
    expect(report.pairwiseDisposition).toBe('INCONCLUSIVE');
    expect(report.researchOnly).toBe(true);
    expect(report.mayGrantOfficialAuthority).toBe(false);
    expect(report.mayMarkMenuAvailable).toBe(false);
    expect(report.mayPersist).toBe(false);
    expect(report.mayPublish).toBe(false);
    expect(report.maySell).toBe(false);
    expect(evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'partner', snapshot: target },
    )).toEqual(report);
  });

  it('keeps R068 六合/三合 structural candidates within each natal chart, not between people', () => {
    const subject = chart({ year: 1985, day: 18 });
    const target = chart({ year: 2001, day: 22 });
    const handoff = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'other', snapshot: target },
    );
    const social = handoff.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'SOCIAL-FRIENDLINESS-SANHE-LIUHE');
    const conditional = handoff.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'COMBINATION-CONTEXT-VARIANCE');
    const kin = handoff.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'KIN-FRIEND-BOND-HARM-CONFIGURATION');
    expect(kin?.singleChartCombinationObservations).toBeUndefined();
    expect(social?.singleChartCombinationObservations).toEqual(
      conditional?.singleChartCombinationObservations,
    );
    const observations = social?.singleChartCombinationObservations;
    expect(observations?.map(item => item.personRole)).toEqual(['subject', 'target']);
    for (const [index, original] of [subject, target].entries()) {
      const observation = observations?.[index];
      const fact = original.derivedFacts.structuralRelations;
      expect(observation?.sourceFactPath).toBe('derivedFacts.structuralRelations');
      expect(observation?.calculationState).toBe(fact?.status === 'resolved'
        ? 'resolved' : 'incomplete');
      const expected = fact?.status === 'resolved'
        ? fact.value.filter(item =>
          item.kind === 'branch_six_combination' ||
          item.kind === 'branch_three_combination',
        ).map(item => ({
          relationId: item.relationId, kind: item.kind, sourceIds: item.sourceIds,
        }))
        : [];
      expect(observation?.observedCombinationCandidates).toEqual(expected);
      expect(observation?.pairwiseMeaningAuthorized).toBe(false);
      expect(observation?.socialOutcomeAuthorized).toBe(false);
    }
    expect(handoff.pairwiseT10Admitted).toBe(false);
    expect(social?.eligiblePairwiseClaim).toBe(false);
  });

  it('tracks the literal R068 傷官/七煞 natal terms while holding missing 羊刃 and kinship context', () => {
    const first = chart({ year: 1987, day: 13 });
    const second = chart({ year: 1992, day: 26 });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'source', snapshot: first },
      { personRef: 'target', snapshot: second },
    );
    const clause = report.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'KIN-FRIEND-BOND-HARM-CONFIGURATION');
    expect(clause?.sourceSurface).toBe('羊刃逢傷官七煞，骨肉親友傷情');
    expect(clause?.eligiblePairwiseClaim).toBe(false);
    expect(clause?.singleChartCombinationObservations).toBeUndefined();
    const observations = clause?.singleChartKinConditionObservations;
    expect(observations?.map(item => item.personRole)).toEqual(['subject', 'target']);
    for (const [index, snapshot] of [first, second].entries()) {
      const observation = observations?.[index];
      expect(observation?.sourceFactPath).toBe('derivedFacts.tenGods');
      expect(observation?.terms.map(term => term.exactHistoricalTerm))
        .toEqual(['傷官', '七煞']);
      expect(observation?.terms.map(term => term.canonicalSearchCategory))
        .toEqual(['상관', '편관']);
      const canonical = snapshot.derivedFacts.tenGods;
      for (const term of observation?.terms ?? []) {
        expect(term.observationCoverage)
          .toBe('visible_stems_and_representative_branch_only');
        for (const position of term.observedPositions) {
          expect(position.path).toBe(
            'derivedFacts.tenGods.' + position.slot + '.' + position.channel,
          );
          expect(position.value).toBe(term.canonicalSearchCategory);
          if (canonical.status !== 'resolved') throw new TypeError('Canonical T5 missing');
          const raw = canonical.value[position.slot][position.channel];
          expect(raw?.status).toBe('resolved');
          if (raw?.status === 'resolved') expect(raw.value).toBe(position.value);
        }
      }
      expect(observation?.yangrenInput).toBe('not_defined_by_canonical');
      expect(observation?.conjunctionOfTermsEstablished).toBe(false);
      expect(observation?.historicalKinFriendContextEstablished).toBe(false);
      expect(observation?.natalKinOutcomeAuthorized).toBe(false);
      expect(observation?.pairwiseMeaningAuthorized).toBe(false);
      expect(observation?.missingPrerequisites)
        .toContain('YANGREN_CANONICAL_INPUT_NOT_DEFINED');
      expect(observation?.missingPrerequisites)
        .toContain('R068_THREE_TERM_CONJUNCTION_METHOD_NOT_SELECTED');
    }
    expect(report.pairwiseT10Admitted).toBe(false);
  });

  it('preserves separate unresolved hour positions and person-swap ownership for R068 kin research', () => {
    const known = chart({ year: 1991 });
    const unknownTime = chart({ year: 1994, timeKnown: false });
    const forward = evaluatePairwiseSourceScopeV1(
      { personRef: 'complete', snapshot: known },
      { personRef: 'unknown', snapshot: unknownTime },
    );
    const reverse = evaluatePairwiseSourceScopeV1(
      { personRef: 'unknown', snapshot: unknownTime },
      { personRef: 'complete', snapshot: known },
    );
    const getKin = (report: typeof forward) =>
      report.comparedSourceSurfaces.find(item =>
        item.originalClaimId === 'KIN-FRIEND-BOND-HARM-CONFIGURATION'
      )?.singleChartKinConditionObservations;
    const terms = getKin(forward)?.[1]?.terms;
    expect(terms).toBeDefined();
    for (const term of terms ?? []) {
      expect(term.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.stem');
      expect(term.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.branch');
    }
    expect(getKin(forward)?.[0]).toEqual({
      ...getKin(reverse)?.[1], personRole: 'subject',
    });
    expect(getKin(forward)?.[1]).toEqual({
      ...getKin(reverse)?.[0], personRole: 'target',
    });
    expect(getKin(forward)?.[1]?.missingPrerequisites)
      .toContain('R068_TEN_GOD_OBSERVATIONS_PARTIAL');
    expect(forward.pairwiseT10Admitted).toBe(false);
    expect(reverse.pairwiseT10Admitted).toBe(false);
  });

  it('keeps R069 historical spouse input scope distinct for each person without ever granting pairwise authority', () => {
    const male = chart({ year: 1988, sex: 'male' });
    const female = chart({ year: 1996, sex: 'female' });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'man', snapshot: male },
      { personRef: 'woman', snapshot: female },
    );
    const source = (id: string) => {
      const item = report.comparedSourceSurfaces.find(value =>
        value.corpusId === 'R069' && value.originalClaimId === id,
      );
      if (!item?.oneChartScopeObservations) {
        throw new TypeError('R069 clause missing separated natal input observations: ' + id);
      }
      return item.oneChartScopeObservations;
    };

    const day = source('MALE-DAY-SELF-WIFE');
    expect(day[0].personRole).toBe('subject');
    expect(day[1].personRole).toBe('target');
    expect(day[0].historicalScopeMatch).toBe('matched');
    expect(day[0].disposition).toBe('BOUNDED_FACT_OBSERVED');
    expect(day[0].observedFactPaths).toEqual(['pillars.day']);
    expect(day[0].observedDayPillar).toBe(
      male.pillars.day.status === 'resolved'
        ? male.pillars.day.value.stem.value + male.pillars.day.value.branch.value
        : undefined,
    );
    expect(day[1].historicalScopeMatch).toBe('mismatched');
    expect(day[1].disposition).toBe('NARROW_OR_REPLACE');
    expect(day[1].observedFactPaths).toEqual([]);
    expect(day[1].observedDayPillar).toBeUndefined();

    const wealth = source('MALE-I-CONTROL-WIFE');
    expect(wealth[0].historicalScopeMatch).toBe('matched');
    expect(wealth[1].historicalScopeMatch).toBe('mismatched');
    expect(wealth[0].observedTenGodPositions.every(position =>
      ['편재', '정재'].includes(position.value))).toBe(true);
    expect(wealth[0].observedFactPaths).toEqual(
      wealth[0].observedTenGodPositions.map(position => position.path),
    );
    const officials = source('FEMALE-CONTROLS-ME-HUSBAND');
    expect(officials[0].historicalScopeMatch).toBe('mismatched');
    expect(officials[1].historicalScopeMatch).toBe('matched');
    expect(officials[1].observedTenGodPositions.every(position =>
      ['편관', '정관'].includes(position.value))).toBe(true);
    const configuration = source('DAY-WEALTH-CONFIGURATION-WIFE-CLAIMS');
    expect(configuration[0].disposition).toBe('INCONCLUSIVE');
    expect(configuration[0].missingPrerequisites)
      .toContain('R069_CONFIGURATION_METHOD_NOT_ESTABLISHED');
    expect(report.comparedSourceSurfaces.filter(item => item.corpusId === 'R069')
      .every(item => item.eligiblePairwiseClaim === false &&
        item.oneChartScopeObservations?.every(one =>
          one.oneChartSpouseMeaningAuthorized === false &&
          one.pairwiseMeaningAuthorized === false))).toBe(true);

    const swapped = evaluatePairwiseSourceScopeV1(
      { personRef: 'woman', snapshot: female },
      { personRef: 'man', snapshot: male },
    );
    const swappedMale = swapped.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'MALE-DAY-SELF-WIFE')?.oneChartScopeObservations;
    expect(swappedMale?.[0].historicalScopeMatch).toBe('mismatched');
    expect(swappedMale?.[1].historicalScopeMatch).toBe('matched');
    expect(swapped.pairwiseT10Admitted).toBe(false);
  });

  it('keeps unspecified historical sex and unknown star positions as nonadmitted R069 research', () => {
    const unspecified = chart({ sex: 'unspecified' });
    const malePartial = chart({ sex: 'male', timeKnown: false });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'unmarked', snapshot: unspecified },
      { personRef: 'unknown-time', snapshot: malePartial },
    );
    const claim = report.comparedSourceSurfaces.find(item =>
      item.originalClaimId === 'MALE-I-CONTROL-WIFE');
    expect(claim?.oneChartScopeObservations?.[0].historicalScopeMatch).toBe('unspecified');
    expect(claim?.oneChartScopeObservations?.[0].disposition).toBe('NARROW_OR_REPLACE');
    const partial = claim?.oneChartScopeObservations?.[1];
    expect(partial?.historicalScopeMatch).toBe('matched');
    expect(partial?.disposition).toBe('INCONCLUSIVE');
    expect(partial?.missingPrerequisites).toContain('R069_TEN_GOD_INPUT_PARTIAL');
    expect(partial?.oneChartSpouseMeaningAuthorized).toBe(false);
    expect(report.pairwiseT10Admitted).toBe(false);
  });

  it('keeps a missing target birth hour and identical charts as facts, not an affinity score', () => {
    const subject = chart({ year: 1990 });
    const target = chart({ year: 1990, timeKnown: false });
    const report = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'other', snapshot: target },
    );
    expect(report.target.birthTimeKnown).toBe(false);
    expect(report.subject.originalScenarioIds)
      .toEqual(subject.scenarios.map(scenario => scenario.scenarioId));
    expect(report.target.originalScenarioIds)
      .toEqual(target.scenarios.map(scenario => scenario.scenarioId));
    expect(report.target.ambiguousFactPaths).toEqual(target.completeness.ambiguousPaths);
    expect(report.target.unavailableFactPaths).toEqual(target.completeness.unavailablePaths);
    expect(report.factualPairObservations[3]?.status).toBe('incomplete');
    expect(report.factualPairObservations[3]?.exactPillarIdentity).toBeUndefined();
    expect(report.missingPrerequisites).toContain('TARGET_HOUR_INPUT_UNRESOLVED');
    expect(report.pairwiseT10Admitted).toBe(false);

    const same = evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'different-person', snapshot: subject },
    );
    expect(same.subject.calculationHash).toBe(same.target.calculationHash);
    expect(same.factualPairObservations.every(item =>
      item.status === 'both_resolved' && item.exactPillarIdentity === 'same')).toBe(true);
    expect(same.pairwiseT10Admitted).toBe(false);
  });

  it('swaps observed facts but never authorizes directional or symmetric interpersonal meaning', () => {
    const first = chart({ year: 1985, day: 18 });
    const second = chart({ year: 2001, day: 22 });
    const forward = evaluatePairwiseSourceScopeV1(
      { personRef: 'person-one', snapshot: first },
      { personRef: 'person-two', snapshot: second },
    );
    const backward = evaluatePairwiseSourceScopeV1(
      { personRef: 'person-two', snapshot: second },
      { personRef: 'person-one', snapshot: first },
    );
    expect(forward.factualPairObservations.map(item => item.exactPillarIdentity))
      .toEqual(backward.factualPairObservations.map(item => item.exactPillarIdentity));
    for (let i = 0; i < forward.factualPairObservations.length; i++) {
      expect(forward.factualPairObservations[i]?.subjectPillar)
        .toEqual(backward.factualPairObservations[i]?.targetPillar);
      expect(forward.factualPairObservations[i]?.targetPillar)
        .toEqual(backward.factualPairObservations[i]?.subjectPillar);
    }
    expect(forward.subject.originalScenarioIds).toEqual(backward.target.originalScenarioIds);
    expect(forward.target.originalScenarioIds).toEqual(backward.subject.originalScenarioIds);
    expect(forward.subject.ambiguousFactPaths).toEqual(backward.target.ambiguousFactPaths);
    expect(forward.pairwiseT10Admitted).toBe(false);
    expect(backward.pairwiseT10Admitted).toBe(false);
    expect(forward.comparedSourceSurfaces.every(x => x.eligiblePairwiseClaim === false))
      .toBe(true);
  });

  it('rejects self pairing and non-comparable policy without issuing a T10 conclusion', () => {
    const subject = chart();
    expect(() => evaluatePairwiseSourceScopeV1(
      { personRef: 'same', snapshot: subject },
      { personRef: 'same', snapshot: subject },
    )).toThrow('two different');
    expect(() => evaluatePairwiseSourceScopeV1(
      { personRef: 'self', snapshot: subject },
      { personRef: 'other', snapshot: {
        ...chart({ year: 2000 }),
        policy: { ...subject.policy, policyVersion: 'incompatible-research-policy' },
      } },
    )).toThrow('comparable governed');
  });
});
