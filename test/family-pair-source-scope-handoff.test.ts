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

  it('keeps R070 brother clauses outside both parent and child research scopes', () => {
    for (const scope of ['parents', 'children'] as const) {
      const report = evaluateFamilySourceScopeV1(
        chart({ sex: 'male' }), scope,
      );
      expect(report.excludedSiblingSourceSurfaces.map(item => item.sourceSurface))
        .toEqual(['月為兄弟', '兄弟者即劫財比肩']);
      for (const item of report.excludedSiblingSourceSurfaces) {
        expect(item.requestedScope).toBe(scope);
        expect(item.originalRelationScope).toBe('siblings');
        expect(item.disposition).toBe('NARROW_OR_REPLACE');
        expect(item.admittedAsParentsOrChildrenSource).toBe(false);
        expect(item.missingPrerequisites).toEqual([
          'SIBLING_DOMAIN_IS_NOT_PARENTS_OR_CHILDREN',
        ]);
        expect(R070_CLAIM_LAYERS.some(layer =>
          layer.id === item.sourceLayerId &&
          layer.sexScope === item.originalSexScope &&
          (layer.sourceSurfaces as readonly string[]).includes(item.sourceSurface),
        )).toBe(true);
        expect(report.methodCandidates.every(candidate =>
          candidate.sourceSurface !== item.sourceSurface)).toBe(true);
      }
      expect(report.familyT8Admitted).toBe(false);
    }
    const male = evaluateFamilySourceScopeV1(chart({ sex: 'male' }), 'parents');
    const female = evaluateFamilySourceScopeV1(chart({ sex: 'female' }), 'parents');
    expect(male.excludedSiblingSourceSurfaces).toEqual(female.excludedSiblingSourceSurfaces);
    expect(male.methodCandidates.find(candidate =>
      candidate.sourceSurface === '月為父母兄弟門戶')?.familyMeaningAuthorized).toBe(false);
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

  it('distinguishes R070 pillar-local and outside-only T5 facts across real calculated family charts', () => {
    const inputCases = [
      { year: 1990, day: 15, sex: 'male' as const },
      { year: 1997, day: 8, sex: 'female' as const },
      { year: 2001, day: 24, sex: 'unspecified' as const },
      { year: 1988, day: 11, sex: 'female' as const },
    ];
    const seenStates = new Set<string>();
    for (const birth of inputCases) {
      const snapshot = chart(birth);
      for (const scope of ['parents', 'children'] as const) {
        const report = evaluateFamilySourceScopeV1(snapshot, scope);
        for (const comparison of report.crossLayerMethodComparisons) {
          const contrast = comparison.starPillarPositionContrast;
          seenStates.add(contrast.state);
          expect(contrast.pillarFactPath).toBe(comparison.pillarObservation.factPath);
          expect(contrast.pillarFactPath).toBe('pillars.' + contrast.pillarSlot);
          expect(contrast.locationBasedFamilyInferenceAuthorized).toBe(false);
          expect(contrast.inReferencedPillar.every(position =>
            position.slot === contrast.pillarSlot)).toBe(true);
          expect(contrast.outsideReferencedPillar.every(position =>
            position.slot !== contrast.pillarSlot)).toBe(true);
          expect(contrast.unresolvedReferencedPillarPaths.every(path =>
            path.startsWith('derivedFacts.tenGods.' + contrast.pillarSlot + '.'))).toBe(true);
          expect([
            ...contrast.inReferencedPillar, ...contrast.outsideReferencedPillar,
          ].map(position => position.path).sort()).toEqual(
            comparison.starObservation.observedPositions.map(position => position.path).sort(),
          );
          expect(contrast.unresolvedReferencedPillarPaths).toEqual(
            comparison.starObservation.unresolvedFactPaths.filter(path =>
              path.startsWith('derivedFacts.tenGods.' + contrast.pillarSlot + '.')),
          );
          if (contrast.state === 'STAR_OBSERVED_IN_REFERENCED_PILLAR') {
            expect(contrast.inReferencedPillar.length).toBeGreaterThan(0);
          } else if (contrast.state === 'REFERENCED_PILLAR_T5_UNRESOLVED') {
            expect(contrast.inReferencedPillar).toHaveLength(0);
            expect(contrast.unresolvedReferencedPillarPaths.length).toBeGreaterThan(0);
            expect(comparison.missingPrerequisites).toContain(
              'R070_REFERENCED_PILLAR_T5_POSITION_UNRESOLVED',
            );
          } else if (contrast.state === 'STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR') {
            expect(contrast.inReferencedPillar).toHaveLength(0);
            expect(contrast.outsideReferencedPillar.length).toBeGreaterThan(0);
            expect(contrast.unresolvedReferencedPillarPaths).toHaveLength(0);
            expect(comparison.missingPrerequisites).toContain(
              'R070_OUTSIDE_PILLAR_T5_IS_NOT_NEGATIVE_FAMILY_EVIDENCE',
            );
          } else {
            expect(contrast.state).toBe('STAR_NOT_OBSERVED_IN_RESOLVED_T5_SURFACE');
            expect(contrast.inReferencedPillar).toHaveLength(0);
            expect(contrast.outsideReferencedPillar).toHaveLength(0);
            expect(contrast.unresolvedReferencedPillarPaths).toHaveLength(0);
            expect(comparison.missingPrerequisites).toContain(
              'R070_UNOBSERVED_T5_IS_NOT_RELATIVE_ABSENCE',
            );
          }
          expect(comparison.missingPrerequisites).toContain(
            'R070_PILLAR_STAR_LOCATION_SYNTHESIS_RULE_NOT_SOURCED',
          );
          expect(report.missingPrerequisites).toContain(
            'R070_PILLAR_STAR_LOCATION_SYNTHESIS_RULE_NOT_SOURCED',
          );
          expect(comparison.methodSelectionAuthorized).toBe(false);
          expect(comparison.independentlyAdmittedFamilyClaims).toBe(0);
          expect(report.familyT8Admitted).toBe(false);
        }
      }
    }
    expect(seenStates.has('STAR_OBSERVED_IN_REFERENCED_PILLAR')).toBe(true);
    expect(seenStates.has('STAR_OBSERVED_ONLY_OUTSIDE_REFERENCED_PILLAR')).toBe(true);
  });

  it('keeps the known parent pillar location independent from unresolved hour T5 and refuses the child bridge', () => {
    const snapshot = chart({ year: 1997, sex: 'female', timeKnown: false });
    const parents = evaluateFamilySourceScopeV1(snapshot, 'parents');
    const children = evaluateFamilySourceScopeV1(snapshot, 'children');
    expect(children.crossLayerMethodComparisons).toEqual([]);
    expect(parents.crossLayerMethodComparisons).toHaveLength(2);
    for (const comparison of parents.crossLayerMethodComparisons) {
      const contrast = comparison.starPillarPositionContrast;
      expect(contrast.pillarSlot).toBe('month');
      expect(contrast.unresolvedReferencedPillarPaths).toEqual([
        'derivedFacts.tenGods.month.stem',
        'derivedFacts.tenGods.month.branch',
      ]);
      expect(contrast.state).toBe('REFERENCED_PILLAR_T5_UNRESOLVED');
      expect(comparison.starObservation.unresolvedFactPaths).toContain(
        'derivedFacts.tenGods.hour.stem',
      );
      expect(comparison.starObservation.unresolvedFactPaths).toContain(
        'derivedFacts.tenGods.hour.branch',
      );
      expect(comparison.missingPrerequisites).toContain(
        'TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED',
      );
      expect(contrast.locationBasedFamilyInferenceAuthorized).toBe(false);
    }
    expect(parents.familyT8Admitted).toBe(false);
    expect(children.familyT8Admitted).toBe(false);
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

  it('ties R070 刑沖破害 only to actual branch-clash participation of eligible parent and child pillars', () => {
    const states = new Set<string>();
    for (const year of [1987, 1988, 1990, 1991, 1993, 1995, 1997, 1999, 2001, 2003, 2005]) {
      for (const day of [5, 15, 25]) {
        const snapshot = chart({ year, day, sex: 'male' });
        const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
        const children = evaluateFamilySourceScopeV1(snapshot, 'children');
        const raw = snapshot.derivedFacts.structuralRelations;
        const actualClashes = raw?.status === 'resolved'
          ? raw.value.filter(item => item.kind === 'branch_clash') : [];
        expect(parent.branchClashPillarObservations.map(item => item.pillarSourceSurface))
          .toEqual(['月為父母兄弟門戶', '年為父']);
        expect(children.branchClashPillarObservations.map(item => item.pillarSourceSurface))
          .toEqual(['時為子息', '時為子孫']);
        for (const report of [parent, children]) {
          for (const observation of report.branchClashPillarObservations) {
            states.add(observation.state);
            expect(observation.sourceLayerId).toBe('CONFIGURATION-OUTCOME');
            expect(observation.sourceSurface).toBe('刑沖破害');
            expect(observation.requestedScope).toBe(report.scope);
            expect(observation.referencePillarFactPath)
              .toBe('pillars.' + observation.referencePillarSlot);
            expect(observation.referenceBranchFactPath)
              .toBe('pillars.' + observation.referencePillarSlot + '.branch');
            const branch = snapshot.pillars[observation.referencePillarSlot];
            expect(branch.status).toBe('resolved');
            if (branch.status === 'resolved') {
              expect(observation.observedReferenceBranch).toBe(branch.value.branch.value);
            }
            expect(observation.missingPrerequisites).toContain(
              'R070_BRANCH_CLASH_PILLAR_TO_FAMILY_EFFECT_NOT_SOURCED',
            );
            expect(observation.missingPrerequisites).toContain('CONFIGURATION_OUTCOME_SETTLEMENT');
            expect(report.missingPrerequisites).toContain(
              'R070_BRANCH_CLASH_PILLAR_TO_FAMILY_EFFECT_NOT_SOURCED',
            );
            expect(observation.independentlyAdmittedFamilyClaims).toBe(0);
            expect(observation.configurationOutcomeAuthorized).toBe(false);
            expect(observation.familyT8Admitted).toBe(false);
            const joined = [...observation.participatingClashes, ...observation.outsideClashes];
            expect(joined.map(item => item.relationId).sort())
              .toEqual(actualClashes.map(item => item.relationId).sort());
            for (const reference of joined) {
              const actual = actualClashes.find(item => item.relationId === reference.relationId);
              expect(actual).toBeDefined();
              expect(reference.factPath).toBe('derivedFacts.structuralRelations');
              expect(reference.kind).toBe('branch_clash');
              expect(reference.participants).toEqual(actual?.participants);
              expect(reference.sourceIds).toEqual(actual?.sourceIds);
              expect(reference.structuralMatchOnly).toBe(true);
              expect(reference.transformationEstablished).toBe(false);
            }
            for (const clash of observation.participatingClashes) {
              expect(clash.participants.some(participant =>
                participant.component === 'branch' &&
                participant.pillar === observation.referencePillarSlot)).toBe(true);
            }
            for (const clash of observation.outsideClashes) {
              expect(clash.participants.some(participant =>
                participant.component === 'branch' &&
                participant.pillar === observation.referencePillarSlot)).toBe(false);
            }
            if (raw?.status === 'resolved') {
              expect(observation.state).toBe(
                observation.participatingClashes.length > 0
                  ? 'REFERENCED_PILLAR_PARTICIPATES_IN_CLASH'
                  : observation.outsideClashes.length > 0
                    ? 'CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR'
                    : 'NO_CLASH_CANDIDATE_IN_RESOLVED_CHART',
              );
            } else {
              expect(observation.state).toBe('STRUCTURAL_CLASH_CANDIDATES_UNRESOLVED');
            }
          }
          expect(report.familyT8Admitted).toBe(false);
          expect(report.unassignedConfigurationInputs.find(item =>
            item.sourceSurface === '刑沖破害')?.familyScopeResolved).toBe(false);
        }
        const [generalChild, maleChild] = children.branchClashPillarObservations;
        if (generalChild === undefined || maleChild === undefined) {
          throw new Error('Both original male child pillar methods must be observed.');
        }
        expect(generalChild.participatingClashes).toEqual(maleChild.participatingClashes);
        expect(generalChild.outsideClashes).toEqual(maleChild.outsideClashes);
      }
    }
    expect(states.has('REFERENCED_PILLAR_PARTICIPATES_IN_CLASH')).toBe(true);
    expect(states.has('CLASH_ONLY_OUTSIDE_REFERENCED_PILLAR')).toBe(true);
  });

  it('preserves historical sex exclusion and unknown-hour clash omissions without allocating family outcomes', () => {
    const femaleSnapshot = chart({ year: 1997, sex: 'female', timeKnown: false });
    const unspecifiedSnapshot = chart({ year: 1997, sex: 'unspecified' });
    const femaleParents = evaluateFamilySourceScopeV1(femaleSnapshot, 'parents');
    const femaleChildren = evaluateFamilySourceScopeV1(femaleSnapshot, 'children');
    const unspecifiedParents = evaluateFamilySourceScopeV1(unspecifiedSnapshot, 'parents');
    expect(femaleParents.branchClashPillarObservations.map(item => item.pillarSourceSurface))
      .toEqual(['月為父母兄弟門戶']);
    expect(femaleChildren.branchClashPillarObservations.map(item => item.pillarSourceSurface))
      .toEqual(['時為子息']);
    expect(unspecifiedParents.branchClashPillarObservations.map(item => item.pillarSourceSurface))
      .toEqual(['月為父母兄弟門戶']);
    const child = femaleChildren.branchClashPillarObservations[0];
    const parent = femaleParents.branchClashPillarObservations[0];
    if (child === undefined || parent === undefined) {
      throw new Error('Eligible parent/child pillar observation must be retained.');
    }
    expect(child.state).toBe('REFERENCED_PILLAR_UNRESOLVED');
    expect(child.observedReferenceBranch).toBeUndefined();
    expect(child.referencePillarFactPath).toBe('pillars.hour');
    expect(child.missingPrerequisites).toContain('CANONICAL_HOUR_PILLAR_UNRESOLVED');
    expect(child.missingPrerequisites).toContain(
      'R070_BRANCH_CLASH_PILLAR_TO_FAMILY_EFFECT_NOT_SOURCED',
    );
    expect(parent.referencePillarFactPath).toBe('pillars.month');
    expect(femaleParents.familyT8Admitted).toBe(false);
    expect(femaleChildren.familyT8Admitted).toBe(false);
    expect(femaleChildren.mayPublish).toBe(false);
    expect(femaleChildren.maySell).toBe(false);
  });

  it('separates observed 官煞混雜 and 財印 T5 group placement from unapproved configuration meaning', () => {
    const cases = [
      { year: 1988, day: 5, sex: 'female' as const },
      { year: 1990, day: 15, sex: 'male' as const },
      { year: 1993, day: 25, sex: 'unspecified' as const },
      { year: 1997, day: 8, sex: 'female' as const },
      { year: 2001, day: 24, sex: 'male' as const },
      { year: 2005, day: 15, sex: 'female' as const },
    ];
    for (const birth of cases) {
      const snapshot = chart(birth);
      const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
      const child = evaluateFamilySourceScopeV1(snapshot, 'children');
      for (const sourceSurface of ['官煞混雜', '財印'] as const) {
        const firstReport = parent.unassignedConfigurationInputs.find(
          item => item.sourceSurface === sourceSurface,
        );
        const secondReport = child.unassignedConfigurationInputs.find(
          item => item.sourceSurface === sourceSurface,
        );
        if (firstReport === undefined || secondReport === undefined ||
            firstReport.tenGodGroupContrast === undefined ||
            firstReport.tenGodSearchTerms === undefined) {
          throw new Error('Existing R070 configuration source and T5 contrast must be retained.');
        }
        expect(secondReport).toEqual(firstReport);
        const contrast = firstReport.tenGodGroupContrast;
        const [first, second] = firstReport.tenGodSearchTerms;
        if (first === undefined || second === undefined) {
          throw new Error('Both original R070 configuration lookup groups must be retained.');
        }
        expect(contrast.sourceLayerId).toBe('CONFIGURATION-OUTCOME');
        expect(contrast.sourceSurface).toBe(sourceSurface);
        expect(contrast.sourceTerms).toEqual(
          sourceSurface === '官煞混雜' ? ['官', '煞'] : ['財', '印'],
        );
        expect(contrast.sourceTerms).toEqual([first.sourceTerm, second.sourceTerm]);
        expect(firstReport.disposition).toBe('INCONCLUSIVE');
        expect(firstReport.canonicalObservationCoverage).toBe(
          snapshot.derivedFacts.tenGods.status === 'resolved'
            ? 'visible_t5_search_categories_only' : 'none',
        );
        const chartTenGods = snapshot.derivedFacts.tenGods;
        for (const term of [first, second]) {
          for (const position of term.observedPositions) {
            expect(position.path).toBe(
              'derivedFacts.tenGods.' + position.slot + '.' + position.channel,
            );
            if (chartTenGods.status !== 'resolved') {
              throw new Error('T5 position cannot be observed without Canonical T5.');
            }
            const fact = chartTenGods.value[position.slot][position.channel];
            expect(fact?.status).toBe('resolved');
            if (fact?.status === 'resolved') expect(position.value).toBe(fact.value);
            expect(term.canonicalSearchCategories).toContain(position.value);
          }
          expect(term.configurationMeaningAuthorized).toBe(false);
        }
        const slots = ['year', 'month', 'day', 'hour'] as const;
        const firstSlots = slots.filter(slot =>
          first.observedPositions.some(position => position.slot === slot));
        const secondSlots = slots.filter(slot =>
          second.observedPositions.some(position => position.slot === slot));
        const shared = firstSlots.filter(slot => secondSlots.includes(slot));
        const firstOnly = firstSlots.filter(slot => !secondSlots.includes(slot));
        const secondOnly = secondSlots.filter(slot => !firstSlots.includes(slot));
        const count = Number(first.observedPositions.length > 0) +
          Number(second.observedPositions.length > 0);
        expect(contrast.observedGroupCount).toBe(count);
        expect(contrast.sharedPillarSlots).toEqual(shared);
        expect(contrast.firstGroupOnlyPillarSlots).toEqual(firstOnly);
        expect(contrast.secondGroupOnlyPillarSlots).toEqual(secondOnly);
        expect(contrast.observationState).toBe(
          count === 2
            ? shared.length > 0
              ? 'BOTH_GROUPS_OBSERVED_IN_AT_LEAST_ONE_SHARED_PILLAR'
              : 'BOTH_GROUPS_OBSERVED_ONLY_IN_DISTINCT_PILLARS'
            : count === 1
              ? 'ONLY_ONE_GROUP_OBSERVED_IN_VISIBLE_T5'
              : 'NEITHER_GROUP_OBSERVED_IN_VISIBLE_T5',
        );
        expect(contrast.unresolvedFactPaths).toEqual([...new Set([
          ...first.unresolvedFactPaths, ...second.unresolvedFactPaths,
        ])]);
        expect(contrast.inputCoverage).toBe(
          contrast.unresolvedFactPaths.length > 0
            ? 'PARTIAL_VISIBLE_T5' : 'RESOLVED_VISIBLE_T5',
        );
        expect(contrast.originalConfigurationConditionEstablished).toBe(false);
        expect(contrast.configurationInteractionOrPriorityEstablished).toBe(false);
        expect(contrast.familyRelativeEffectAuthorized).toBe(false);
        expect(contrast.familyT8Admitted).toBe(false);
        expect(firstReport.familyScopeResolved).toBe(false);
        expect(firstReport.familyOutcomeAuthorized).toBe(false);
        expect(firstReport.missingPrerequisites).toContain(
          'R070_VISIBLE_T5_COOBSERVATION_IS_NOT_CLASSICAL_CONFIGURATION',
        );
        expect(firstReport.missingPrerequisites).toContain(
          'R070_CONFIGURATION_TO_FAMILY_EFFECT_NOT_SOURCED',
        );
        expect(parent.familyT8Admitted).toBe(false);
        expect(child.familyT8Admitted).toBe(false);
        expect(parent.mayGrantOfficialAuthority).toBe(false);
        expect(child.maySell).toBe(false);
      }
    }
  });

  it('does not treat missing hour and unobserved T5 groups as classical configuration absence', () => {
    const snapshot = chart({ year: 1997, day: 15, sex: 'female', timeKnown: false });
    const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
    const child = evaluateFamilySourceScopeV1(snapshot, 'children');
    for (const report of [parent, child]) {
      for (const sourceSurface of ['官煞混雜', '財印']) {
        const item = report.unassignedConfigurationInputs.find(
          candidate => candidate.sourceSurface === sourceSurface,
        );
        const contrast = item?.tenGodGroupContrast;
        if (contrast === undefined || item?.tenGodSearchTerms === undefined) {
          throw new Error('R070 T5 partial coverage must be exposed even for unknown hour.');
        }
        expect(contrast.inputCoverage).toBe('PARTIAL_VISIBLE_T5');
        expect(contrast.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.stem');
        expect(contrast.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.branch');
        expect(contrast.originalConfigurationConditionEstablished).toBe(false);
        expect(contrast.familyRelativeEffectAuthorized).toBe(false);
        expect(contrast.familyT8Admitted).toBe(false);
        expect(item.familyOutcomeAuthorized).toBe(false);
        expect(item.missingPrerequisites).toContain('CANONICAL_T5_CONFIGURATION_GROUPS_PARTIAL');
        if (contrast.observedGroupCount < 2) {
          expect(item.missingPrerequisites).toContain(
            'R070_UNOBSERVED_VISIBLE_T5_GROUP_IS_NOT_NEGATIVE_CONFIGURATION_EVIDENCE',
          );
        }
      }
      expect(report.interpretationDisposition).toBe('INCONCLUSIVE');
      expect(report.mayMarkMenuAvailable).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.mayPersist).toBe(false);
    }
  });

  it('preserves R070 hidden-stem membership exactly without promoting raw stems into T5 groups', () => {
    const births = [
      { year: 1988, day: 5, sex: 'female' as const },
      { year: 1990, day: 15, sex: 'male' as const },
      { year: 1997, day: 8, sex: 'unspecified' as const },
    ];
    const slots = ['year', 'month', 'day', 'hour'] as const;
    for (const birth of births) {
      const snapshot = chart(birth);
      const hiddenStems = snapshot.derivedFacts.hiddenStems;
      if (hiddenStems === undefined) {
        throw new Error('Production Canonical must expose hidden-stem membership.');
      }
      const parent = evaluateFamilySourceScopeV1(snapshot, 'parents');
      const children = evaluateFamilySourceScopeV1(snapshot, 'children');
      for (const sourceSurface of ['官煞混雜', '財印']) {
        const parentItem = parent.unassignedConfigurationInputs.find(
          item => item.sourceSurface === sourceSurface,
        );
        const childItem = children.unassignedConfigurationInputs.find(
          item => item.sourceSurface === sourceSurface,
        );
        const contrast = parentItem?.tenGodGroupContrast;
        const hidden = contrast?.hiddenStemMembershipContrast;
        if (contrast === undefined || hidden === undefined) {
          throw new Error('R070 configuration contrast and separate membership must exist.');
        }
        expect(childItem).toEqual(parentItem);
        expect(hidden.sourceFactPath).toBe('derivedFacts.hiddenStems');
        expect(hidden.visibleT5FactPath).toBe('derivedFacts.tenGods');
        expect(hidden.coverage).toBe('RESOLVED_MEMBERSHIP_ONLY');
        expect(hidden.unresolvedMembershipFactPaths).toEqual([]);
        expect(hidden.pillarObservations.map(item => item.pillarSlot)).toEqual(slots);
        for (const observation of hidden.pillarObservations) {
          const canonical = hiddenStems[observation.pillarSlot];
          const pillar = snapshot.pillars[observation.pillarSlot];
          expect(observation.membershipFactPath)
            .toBe('derivedFacts.hiddenStems.' + observation.pillarSlot);
          expect(observation.branchFactPath)
            .toBe('pillars.' + observation.pillarSlot + '.branch');
          expect(observation.status).toBe(canonical.status);
          expect(canonical.status).toBe('resolved');
          if (canonical.status !== 'resolved' || pillar.status !== 'resolved') {
            throw new Error('Known-time Canonical hidden membership must be resolved.');
          }
          expect(observation.observedBranch).toBe(pillar.value.branch.value);
          expect(observation.rawMembershipPositions).toEqual(
            canonical.value.map((stem, storageIndex) => ({ stem, storageIndex })),
          );
          expect(observation.hiddenStemT5ClassificationAuthorized).toBe(false);
        }
        expect(hidden.hiddenStemContributionToObservedT5GroupCount).toBe(0);
        expect(hidden.canonicalStorageOrderIsStrengthPriority).toBe(false);
        expect(hidden.historicalConfigurationConditionEstablished).toBe(false);
        expect(hidden.hiddenStemRelativeRoleAuthorized).toBe(false);
        expect(parentItem?.missingPrerequisites).toContain(
          'R070_HIDDEN_STEM_MEMBERSHIP_IS_NOT_HIDDEN_T5_CLASSIFICATION',
        );
        expect(parent.missingPrerequisites).toContain(
          'R070_HIDDEN_STEM_MEMBERSHIP_IS_NOT_HIDDEN_T5_CLASSIFICATION',
        );
        expect(children.missingPrerequisites).toContain(
          'R070_HIDDEN_STEM_CONFIGURATION_METHOD_NOT_SOURCED',
        );
        expect(parentItem?.missingPrerequisites).toContain(
          'R070_HIDDEN_STEM_STRENGTH_AND_PRIORITY_NOT_SETTLED',
        );
        expect(parentItem?.missingPrerequisites).toContain(
          'R070_HIDDEN_STEM_CONFIGURATION_METHOD_NOT_SOURCED',
        );
        const originalT5GroupCount = parentItem?.tenGodSearchTerms?.filter(
          group => group.observedPositions.length > 0,
        ).length;
        expect(contrast.observedGroupCount).toBe(originalT5GroupCount);
        expect(contrast.originalConfigurationConditionEstablished).toBe(false);
        expect(parent.familyT8Admitted).toBe(false);
        expect(children.familyT8Admitted).toBe(false);
      }
    }
  });

  it('retains unknown-hour and unavailable membership separately from visible T5', () => {
    const snapshot = chart({ year: 1997, day: 15, sex: 'female', timeKnown: false });
    const report = evaluateFamilySourceScopeV1(snapshot, 'children');
    const canonicalHidden = snapshot.derivedFacts.hiddenStems;
    if (canonicalHidden === undefined) {
      throw new Error('Known Canonical enriches hidden-stem membership.');
    }
    for (const sourceSurface of ['官煞混雜', '財印']) {
      const input = report.unassignedConfigurationInputs.find(
        item => item.sourceSurface === sourceSurface,
      );
      const contrast = input?.tenGodGroupContrast;
      const hidden = contrast?.hiddenStemMembershipContrast;
      if (contrast === undefined || hidden === undefined) {
        throw new Error('Unknown birth hour must retain separate Canonical evidence.');
      }
      expect(hidden.coverage).toBe('PARTIAL_MEMBERSHIP');
      expect(hidden.unresolvedMembershipFactPaths).toEqual(
        ['derivedFacts.hiddenStems.hour'],
      );
      for (const observation of hidden.pillarObservations) {
        const canonical = canonicalHidden[observation.pillarSlot];
        expect(observation.status).toBe(canonical.status);
        if (canonical.status === 'resolved') {
          expect(observation.rawMembershipPositions).toEqual(
            canonical.value.map((stem, storageIndex) => ({ stem, storageIndex })),
          );
        } else {
          expect(observation.rawMembershipPositions).toEqual([]);
        }
      }
      const hour = hidden.pillarObservations.find(item => item.pillarSlot === 'hour');
      if (hour === undefined) throw new Error('Hourly hidden membership missing.');
      expect(hour.status).toBe('unavailable');
      expect(hour.observedBranch).toBeUndefined();
      expect(hour.hiddenStemT5ClassificationAuthorized).toBe(false);
      expect(contrast.inputCoverage).toBe('PARTIAL_VISIBLE_T5');
      expect(contrast.unresolvedFactPaths).toContain('derivedFacts.tenGods.hour.stem');
      expect(input?.missingPrerequisites).toContain(
        'CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE',
      );
      expect(report.familyT8Admitted).toBe(false);
      expect(report.mayPublish).toBe(false);
    }
  });

  it('fails closed when the optional Canonical hidden-stem fact is not provided', () => {
    const original = chart({ year: 1990, day: 15, sex: 'male' });
    const derivedFacts = { ...original.derivedFacts };
    delete derivedFacts.hiddenStems;
    const snapshot = { ...original, derivedFacts };
    const report = evaluateFamilySourceScopeV1(snapshot, 'parents');
    for (const sourceSurface of ['官煞混雜', '財印']) {
      const input = report.unassignedConfigurationInputs.find(
        item => item.sourceSurface === sourceSurface,
      );
      const contrast = input?.tenGodGroupContrast;
      const hidden = contrast?.hiddenStemMembershipContrast;
      if (contrast === undefined || hidden === undefined) {
        throw new Error('Missing optional hidden-stem input must be explicit.');
      }
      expect(hidden.coverage).toBe('MEMBERSHIP_FACTS_NOT_PROVIDED');
      expect(hidden.unresolvedMembershipFactPaths).toEqual([
        'derivedFacts.hiddenStems.year',
        'derivedFacts.hiddenStems.month',
        'derivedFacts.hiddenStems.day',
        'derivedFacts.hiddenStems.hour',
      ]);
      expect(hidden.pillarObservations.every(item =>
        item.status === 'not_provided' &&
        item.rawMembershipPositions.length === 0 &&
        item.hiddenStemT5ClassificationAuthorized === false)).toBe(true);
      expect(input?.missingPrerequisites).toContain(
        'CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE',
      );
      expect(contrast.observedGroupCount).toBe(
        input?.tenGodSearchTerms?.filter(group => group.observedPositions.length > 0).length,
      );
      expect(contrast.hiddenStemMembershipContrast.hiddenStemContributionToObservedT5GroupCount)
        .toBe(0);
      expect(report.familyT8Admitted).toBe(false);
      expect(report.researchOnly).toBe(true);
      expect(report.mayMarkMenuAvailable).toBe(false);
    }
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

  it('exposes exact R070 parent and child star-source hidden membership separately from visible T5', () => {
    const cases = [
      { sex: 'male' as const, scope: 'parents' as const,
        sources: ['父以偏財論', '母以印綬論'] },
      { sex: 'female' as const, scope: 'parents' as const,
        sources: ['父以偏財論', '母以印綬論'] },
      { sex: 'unspecified' as const, scope: 'parents' as const,
        sources: ['父以偏財論', '母以印綬論'] },
      { sex: 'male' as const, scope: 'children' as const,
        sources: ['子嗣者即官星也'] },
      { sex: 'female' as const, scope: 'children' as const,
        sources: ['子嗣者即官星也', '我生者為子'] },
      { sex: 'unspecified' as const, scope: 'children' as const,
        sources: ['子嗣者即官星也'] },
    ];
    for (const input of cases) {
      const snapshot = chart({ year: 1997, day: 8, sex: input.sex });
      const hiddenStems = snapshot.derivedFacts.hiddenStems;
      if (hiddenStems === undefined) {
        throw new Error('Production Canonical hidden membership is required for this test.');
      }
      const report = evaluateFamilySourceScopeV1(snapshot, input.scope);
      const starCandidates = report.methodCandidates.filter(candidate =>
        ['父以偏財論', '母以印綬論', '子嗣者即官星也', '我生者為子']
          .includes(candidate.sourceSurface),
      );
      expect(starCandidates.map(candidate =>
        candidate.relativeStarHiddenStemBoundary === undefined
          ? undefined : candidate.sourceSurface).filter(Boolean)).toEqual(input.sources);
      for (const candidate of starCandidates) {
        if (candidate.disposition === 'NARROW_OR_REPLACE') {
          expect(candidate.relativeStarHiddenStemBoundary).toBeUndefined();
          expect(candidate.tenGodObservation).toBeUndefined();
          continue;
        }
        const visible = candidate.tenGodObservation;
        const boundary = candidate.relativeStarHiddenStemBoundary;
        if (visible === undefined || boundary === undefined) {
          throw new Error('In-scope R070 family-star source must preserve both fact surfaces.');
        }
        expect(boundary.sourceSurface).toBe(candidate.sourceSurface);
        expect(boundary.sourceLayerId).toBe(candidate.sourceLayerId);
        expect(boundary.originalSexScope).toBe(candidate.originalSexScope);
        expect(boundary.requestedScope).toBe(input.scope);
        expect(boundary.historicalSex).toBe(input.sex);
        expect(boundary.visibleT5FactPath).toBe('derivedFacts.tenGods');
        expect(boundary.hiddenStemFactPath).toBe('derivedFacts.hiddenStems');
        expect(boundary.observedModernT5Group).toBe(visible.observedGroup);
        expect(boundary.visibleT5ObservationStatus).toBe(visible.status);
        expect(boundary.hiddenStemMembershipCoverage).toBe('RESOLVED_MEMBERSHIP_ONLY');
        expect(boundary.unresolvedHiddenStemMembershipFactPaths).toEqual([]);
        expect(boundary.pillarObservations.map(item => item.pillarSlot))
          .toEqual(['year', 'month', 'day', 'hour']);
        expect(boundary.pillarObservations.flatMap(item => item.visibleT5Positions))
          .toEqual(visible.observedPositions);
        expect(boundary.pillarObservations.flatMap(item =>
          item.unresolvedVisibleT5FactPaths)).toEqual(visible.unresolvedFactPaths);
        for (const pillar of boundary.pillarObservations) {
          const canonical = hiddenStems[pillar.pillarSlot];
          expect(pillar.membershipFactPath)
            .toBe('derivedFacts.hiddenStems.' + pillar.pillarSlot);
          expect(pillar.branchFactPath).toBe('pillars.' + pillar.pillarSlot + '.branch');
          expect(pillar.status).toBe(canonical.status);
          if (canonical.status !== 'resolved') {
            throw new Error('Known-time original chart must resolve all hidden memberships.');
          }
          expect(pillar.rawMembershipPositions).toEqual(
            canonical.value.map((stem, storageIndex) => ({ storageIndex, stem })),
          );
          expect(pillar.visibleT5Positions.every(item =>
            item.slot === pillar.pillarSlot)).toBe(true);
          expect(pillar.hiddenStemT5ClassificationAuthorized).toBe(false);
        }
        expect(boundary.hiddenStemTenGodClassificationAuthorized).toBe(false);
        expect(boundary.visibleAndHiddenStarMethodReconciled).toBe(false);
        expect(boundary.historicalRelativeRoleAuthorized).toBe(false);
        expect(boundary.independentlyAdmittedFamilyClaims).toBe(0);
        expect(boundary.familyT8Admitted).toBe(false);
        expect(boundary.missingPrerequisites).toContain(
          'R070_FAMILY_STAR_HIDDEN_STEM_T5_CLASSIFICATION_NOT_ESTABLISHED',
        );
        expect(boundary.missingPrerequisites).toContain(
          'R070_FAMILY_STAR_HIDDEN_STEM_RELATIVE_ROLE_METHOD_NOT_SOURCED',
        );
        expect(candidate.missingPrerequisites).toContain(
          'R070_FAMILY_STAR_HIDDEN_STEM_RELATIVE_ROLE_METHOD_NOT_SOURCED',
        );
        expect(report.missingPrerequisites).toContain(
          'R070_FAMILY_STAR_HIDDEN_STEM_RELATIVE_ROLE_METHOD_NOT_SOURCED',
        );
      }
      expect(report.familyT8Admitted).toBe(false);
      expect(report.researchOnly).toBe(true);
      expect(report.mayGrantOfficialAuthority).toBe(false);
      expect(report.mayMarkMenuAvailable).toBe(false);
      expect(report.mayPersist).toBe(false);
      expect(report.mayPublish).toBe(false);
      expect(report.maySell).toBe(false);
    }
  });

  it('does not fill unknown-hour family-star evidence using raw hidden stems', () => {
    const snapshot = chart({ year: 1997, day: 15, sex: 'female', timeKnown: false });
    for (const scope of ['parents', 'children'] as const) {
      const report = evaluateFamilySourceScopeV1(snapshot, scope);
      const surfaceNames = scope === 'parents'
        ? ['父以偏財論', '母以印綬論']
        : ['子嗣者即官星也', '我生者為子'];
      for (const sourceSurface of surfaceNames) {
        const candidate = familyCandidate(report, sourceSurface);
        const boundary = candidate.relativeStarHiddenStemBoundary;
        const visible = candidate.tenGodObservation;
        if (boundary === undefined || visible === undefined) {
          throw new Error('Unknown hour must preserve source-bound incomplete observations.');
        }
        expect(boundary.hiddenStemMembershipCoverage).toBe('PARTIAL_MEMBERSHIP');
        expect(boundary.unresolvedHiddenStemMembershipFactPaths)
          .toContain('derivedFacts.hiddenStems.hour');
        const hour = boundary.pillarObservations.find(item => item.pillarSlot === 'hour');
        if (hour === undefined) throw new Error('Hour slot missing.');
        expect(hour.status).toBe('unavailable');
        expect(hour.rawMembershipPositions).toEqual([]);
        expect(hour.visibleT5Positions).toEqual([]);
        expect(hour.unresolvedVisibleT5FactPaths).toEqual([
          'derivedFacts.tenGods.hour.stem',
          'derivedFacts.tenGods.hour.branch',
        ]);
        expect(boundary.visibleT5ObservationStatus).toBe('incomplete_input');
        expect(boundary.missingPrerequisites).toContain(
          'CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE',
        );
        expect(boundary.missingPrerequisites).toContain(
          'TEN_GOD_CANONICAL_FACTS_NOT_FULLY_RESOLVED',
        );
        expect(boundary.hiddenStemTenGodClassificationAuthorized).toBe(false);
        expect(boundary.historicalRelativeRoleAuthorized).toBe(false);
      }
      expect(report.familyT8Admitted).toBe(false);
      expect(report.mayPublish).toBe(false);
    }
  });

  it('keeps original family-star source scope even when hiddenStems is omitted', () => {
    const original = chart({ year: 1990, day: 15, sex: 'female' });
    const derivedFacts = { ...original.derivedFacts };
    delete derivedFacts.hiddenStems;
    const report = evaluateFamilySourceScopeV1({ ...original, derivedFacts }, 'children');
    for (const sourceSurface of ['子嗣者即官星也', '我生者為子']) {
      const candidate = familyCandidate(report, sourceSurface);
      const boundary = candidate.relativeStarHiddenStemBoundary;
      if (boundary === undefined) throw new Error('Boundary must retain missing evidence.');
      expect(boundary.hiddenStemMembershipCoverage).toBe('MEMBERSHIP_FACTS_NOT_PROVIDED');
      expect(boundary.unresolvedHiddenStemMembershipFactPaths).toEqual([
        'derivedFacts.hiddenStems.year',
        'derivedFacts.hiddenStems.month',
        'derivedFacts.hiddenStems.day',
        'derivedFacts.hiddenStems.hour',
      ]);
      expect(boundary.pillarObservations.every(item =>
        item.status === 'not_provided' &&
        item.rawMembershipPositions.length === 0 &&
        item.hiddenStemT5ClassificationAuthorized === false)).toBe(true);
      expect(boundary.missingPrerequisites).toContain(
        'CANONICAL_HIDDEN_STEM_MEMBERSHIP_PARTIAL_OR_UNAVAILABLE',
      );
      expect(candidate.tenGodObservation?.sourceFactPath).toBe('derivedFacts.tenGods');
      expect(report.familyT8Admitted).toBe(false);
      expect(report.maySell).toBe(false);
    }
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
