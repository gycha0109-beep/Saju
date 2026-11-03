import type { GeneralAnnualMonthlyExplorationReport } from './general-annual-monthly-exploration-report.js';
import type { LifeStageDayunResearchReport } from './life-stage-dayun-research-report.js';

export const TEMPORAL_RESEARCH_MENU_READING_VERSION =
  'myeongha-temporal-research-menu-reading-v1' as const;

export type TemporalResearchMenuId = 'annual' | 'monthly' | 'life_stage';
export type TemporalResearchAvailability = 'partial' | 'unavailable';
export type TemporalResearchMeaning =
  | 'bounded_research_interpretation'
  | 'calculation_facts_only'
  | 'none';

export interface TemporalResearchMenuSection {
  title: string;
  text: string;
  evidenceKind: 'annual_research_profile' | 'monthly_t9_research_claim' | 'canonical_dayun_fact';
  /** Original selected annual/monthly research Claim, never an Official Claim. */
  claimId?: string;
  claimType?: string;
  semanticKey?: string;
  /** Original T9 interpretation role; never inferred from consumer wording. */
  interpretationRole?: 'theme' | 'tension';
  researchProfileKey?: string;
  /** Exact executed source Rule/Methodology; only applicable to research T9 Claims. */
  ruleIds?: readonly string[];
  methodologyId?: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  interval?: {
    startsAt: string;
    endsAtExclusive: string;
  };
}

export interface TemporalAnnualReferenceFocus {
  referenceDateTime: string;
  /** Only the Ipchun-effective current year may carry the selected-year research text as current. */
  state: 'from_ipchun' | 'before_ipchun' | 'outside_target_civil_year';
  effectivePillarAtReference?: string;
  /** Only active after Ipchun; selected T9 meanings, not all-year inventory. */
  currentTheme?: TemporalResearchMenuSection;
  currentTensions?: readonly TemporalResearchMenuSection[];
  message: string;
}

export interface TemporalMonthlyReferenceFocus {
  referenceDateTime: string;
  state: 'in_period' | 'insufficient_evidence' | 'outside_target_month';
  /** Only the actually selected Jeol interval can have a current claim. */
  segmentId?: 'before_jeol' | 'after_jeol';
  currentSection?: TemporalResearchMenuSection;
  /** Already executed and selected in the SAME current Jeol interval. */
  currentTensions?: readonly TemporalResearchMenuSection[];
  /** Unresolved natal relations are not negative evidence of no clash. */
  unavailableNatalPillars?: readonly ('year' | 'month' | 'day' | 'hour')[];
  message: string;
}

export interface TemporalResearchMenuReading {
  version: typeof TEMPORAL_RESEARCH_MENU_READING_VERSION;
  menuId: TemporalResearchMenuId;
  label: string;
  availability: TemporalResearchAvailability;
  meaning: TemporalResearchMeaning;
  statusMessage: string;
  sections: readonly TemporalResearchMenuSection[];
  /** Research-only annual applicability, separate from the civil-year profile inventory. */
  annualReferenceFocus?: TemporalAnnualReferenceFocus;
  /** Exact currently applicable monthly T9 selection. */
  referenceFocus?: TemporalMonthlyReferenceFocus;
  missing: readonly string[];
  provenance: {
    snapshotId?: string;
    calculationHash?: string;
    targetYear?: number;
    targetMonth?: number;
    timeZone: 'Asia/Seoul';
  };
  authority: {
    researchOnly: true;
    mayCallOfficial: false;
    mayPublish: false;
    mayPersist: false;
    maySell: false;
    mayMarkMenuAvailable: false;
  };
}

const AUTHORITY = Object.freeze({
  researchOnly: true as const,
  mayCallOfficial: false as const,
  mayPublish: false as const,
  mayPersist: false as const,
  maySell: false as const,
  mayMarkMenuAvailable: false as const,
});

export interface TemporalResearchMenuReadingInputs {
  annualMonthly?: GeneralAnnualMonthlyExplorationReport;
  lifeStage?: LifeStageDayunResearchReport;
}

/**
 * B / D roadmap hand-off for three existing time menu slices.
 *
 * Reads the actual produced Korean research sentences and their evidence;
 * never substitutes year research copy for T9 monthly meaning, or a Daeyun
 * calculation for an authorized life-stage interpretation. Even a full
 * research/T9 period has only partial menu availability, never GA/Official.
 * UI admission must remain separate from this research projection.
 */
export function buildTemporalResearchMenuReadings(
  input: TemporalResearchMenuReadingInputs,
): readonly TemporalResearchMenuReading[] {
  const joined = input.annualMonthly;
  const life = input.lifeStage;
  if (joined !== undefined) {
    if (!joined.researchOnly || joined.status !== 'not_official_reading' ||
        joined.usefulComplete || joined.mayPublish || joined.maySell ||
        joined.annual.mode !== 'internal_exploration' ||
        joined.annual.status !== 'not_official_reading' ||
        joined.annual.permissions.mayClaimOfficialAuthority ||
        joined.annual.permissions.mayPublish ||
        joined.annual.permissions.maySell ||
        joined.monthly.status !== 'not_official_reading' ||
        !joined.monthly.researchOnly ||
        joined.monthly.usefulComplete ||
        joined.monthly.mayPublish || joined.monthly.maySell ||
        joined.monthly.snapshotId !== joined.snapshotId ||
        joined.monthly.calculationHash !== joined.calculationHash ||
        joined.annual.targetYear !== joined.targetYear ||
        joined.monthly.targetYear !== joined.targetYear ||
        joined.monthly.targetMonth !== joined.targetMonth) {
      throw new TypeError('Temporal menu bridge rejects an official or mixed-period research report.');
    }
  }
  if (life !== undefined) {
    if (life.status !== 'not_official_reading' ||
        !life.researchOnly || life.usefulComplete ||
        life.mayPublish || life.maySell ||
        life.interpretationStatus !== 'source_authority_not_established') {
      throw new TypeError('Life-stage research cannot cross the official meaning boundary.');
    }
    if (joined !== undefined &&
        (life.snapshotId !== joined.snapshotId ||
         life.calculationHash !== joined.calculationHash)) {
      throw new TypeError('Different persons or calculation policies cannot share a time menu projection.');
    }
  }
  const defaultProvenance = { timeZone: 'Asia/Seoul' as const };
  const joinedProvenance = joined === undefined ? defaultProvenance : {
    snapshotId: joined.snapshotId,
    calculationHash: joined.calculationHash,
    targetYear: joined.targetYear,
    targetMonth: joined.targetMonth,
    timeZone: 'Asia/Seoul' as const,
  };
  // The combined annual research engine already selected an actual T9 Claim
  // for every projected Korean profile. Never discard that provenance in the
  // individual menu handoff or substitute a profile ID for Rule/Source authority.
  // The source remains the INTERNAL research policy, not classical admission.
  const annual = joined === undefined ? [] : joined.annual.sections.map((section, index) => {
    const evidence = joined.annualExecutedEvidence[index];
    if (joined.annualExecutedEvidence.length !== joined.annual.sections.length ||
        section.interpretationStatus !== 'internal_research' ||
        section.evidenceStatus !== 'research_profile_projection_not_an_executed_official_claim' ||
        section.title.trim().length === 0 || section.text.trim().length === 0 ||
        section.researchProfileId.trim().length === 0 ||
        !evidence || evidence.semanticKey !== section.id ||
        evidence.claimType !== section.candidateClaimType ||
        evidence.methodologyId !== section.methodologyId ||
        evidence.claimId.trim().length === 0 ||
        evidence.ruleIds.length === 0 || evidence.ruleIds.some(id => !id.trim()) ||
        evidence.sourceIds.length === 0 ||
        !evidence.sourceIds.includes(section.policySourceId) ||
        evidence.factPaths.length === 0 ||
        !section.calculationFactPaths.every(path => evidence.factPaths.includes(path))) {
      throw new TypeError('Annual menu needs the original selected research T9 Claim, rule and source.');
    }
    return {
      title: section.title,
      text: section.text,
      evidenceKind: 'annual_research_profile' as const,
      // The semantic key is not itself a rule, source or executed Claim ID.
      researchProfileKey: section.id,
      claimId: evidence.claimId,
      claimType: evidence.claimType,
      semanticKey: evidence.semanticKey,
      interpretationRole: section.kind === 'core' ? 'theme' as const : 'tension' as const,
      ruleIds: [...evidence.ruleIds],
      methodologyId: evidence.methodologyId,
      sourceIds: [...evidence.sourceIds],
      factPaths: [...evidence.factPaths],
    };
  });
  // Every emitted monthly section is already an executed, source-selected T9
  // interpretation. Do not silently filter a broken source binding and make a
  // real selected meaning appear to be unavailable in the consumer menu.
  const monthly = joined?.monthly.sections.map(section => {
    const startsAt = Date.parse(section.calculatedInterval.startsAt);
    const endsAt = Date.parse(section.calculatedInterval.endsAt);
    if ((section.kind !== 'theme' && section.kind !== 'tension') ||
        (section.segmentId !== 'before_jeol' && section.segmentId !== 'after_jeol') ||
        !section.title.trim() || !section.text.trim() ||
        !section.claimId.trim() || !section.claimType.trim() ||
        !section.semanticKey.trim() ||
        section.ruleIds.length === 0 || section.ruleIds.some(id => !id.trim()) ||
        !section.methodologyId.trim() ||
        section.sourceIds.length === 0 || section.sourceIds.some(id => !id.trim()) ||
        section.factPaths.length === 0 || section.factPaths.some(path => !path.trim()) ||
        !Number.isFinite(startsAt) || !Number.isFinite(endsAt) ||
        startsAt >= endsAt) {
      throw new TypeError('Monthly menu needs the original selected research T9 Claim, rule and source.');
    }
    return {
      title: (section.segmentId === 'before_jeol' ? '절입 전 · ' : '절입 이후 · ') +
        section.title,
      text: section.text,
      evidenceKind: 'monthly_t9_research_claim' as const,
      claimId: section.claimId,
      claimType: section.claimType,
      semanticKey: section.semanticKey,
      interpretationRole: section.kind,
      ruleIds: [...section.ruleIds],
      methodologyId: section.methodologyId,
      sourceIds: [...section.sourceIds],
      factPaths: [...section.factPaths],
      interval: {
        startsAt: section.calculatedInterval.startsAt,
        endsAtExclusive: section.calculatedInterval.endsAt,
      },
    };
  }) ?? [];
  // Reuse the exact T9 theme selected by the existing Monthly EvidenceSelector.
  // The other Jeol phase is comparison material, never a current prediction.
  const reference = joined?.monthly.referenceReading;
  let referenceFocus: TemporalMonthlyReferenceFocus | undefined;
  if (reference !== undefined && joined !== undefined) {
    if (reference.referenceDateTime !== joined.annual.referenceDateTime ||
        !Number.isFinite(Date.parse(reference.referenceDateTime))) {
      throw new TypeError('Monthly reference must belong to the original joined research request.');
    }
    if (reference.state === 'in_period') {
      const theme = reference.theme;
      const matched = theme === undefined ? [] : monthly.filter(section =>
        section.interpretationRole === 'theme' &&
        section.claimId === theme.claimId &&
        section.text === theme.text &&
        section.interval?.startsAt === theme.calculatedInterval.startsAt &&
        section.interval?.endsAtExclusive === theme.calculatedInterval.endsAt &&
        section.claimType === theme.claimType &&
        section.semanticKey === theme.semanticKey &&
        section.ruleIds?.join('|') === theme.ruleIds.join('|') &&
        section.methodologyId === theme.methodologyId &&
        section.sourceIds.join('|') === theme.sourceIds.join('|') &&
        section.factPaths.join('|') === theme.factPaths.join('|'));
      const at = Date.parse(reference.referenceDateTime);
      if (theme?.kind !== 'theme' || theme.segmentId !== reference.segmentId ||
          matched.length !== 1 ||
          !(Date.parse(theme.calculatedInterval.startsAt) <= at &&
            at < Date.parse(theme.calculatedInterval.endsAt))) {
        throw new TypeError('Monthly reference must match one original source-qualified T9 theme and interval.');
      }
      // A chart's current-month meaning is the selected theme PLUS its
      // independently selected T9 natal-branch tensions. Passing only the
      // theme makes charts with a different executed clash look identical.
      const sourceTensions = reference.sourceBoundTensions ?? [];
      const eligibleTensions = joined.monthly.sections.filter(section =>
        section.kind === 'tension' && section.segmentId === reference.segmentId &&
        section.calculatedInterval.startsAt === theme.calculatedInterval.startsAt &&
        section.calculatedInterval.endsAt === theme.calculatedInterval.endsAt);
      const matchesTension = (section: TemporalResearchMenuSection,
        original: typeof sourceTensions[number]) =>
        section.interpretationRole === 'tension' &&
        section.claimId === original.claimId &&
        section.claimType === original.claimType &&
        section.semanticKey === original.semanticKey &&
        section.title.endsWith(original.title) &&
        section.text === original.text &&
        section.interval?.startsAt === original.calculatedInterval.startsAt &&
        section.interval?.endsAtExclusive === original.calculatedInterval.endsAt &&
        section.ruleIds?.join('|') === original.ruleIds.join('|') &&
        section.methodologyId === original.methodologyId &&
        section.sourceIds.join('|') === original.sourceIds.join('|') &&
        section.factPaths.join('|') === original.factPaths.join('|');
      if (sourceTensions.length !== eligibleTensions.length ||
          new Set(sourceTensions.map(section => section.claimId)).size !== sourceTensions.length ||
          sourceTensions.some(section =>
            !eligibleTensions.some(eligible => eligible.claimId === section.claimId))) {
        throw new TypeError('Monthly reference must retain all actually selected current T9 tensions.');
      }
      const currentTensions = sourceTensions.map(original => {
        const matches = monthly.filter(section => matchesTension(section, original));
        if (matches.length !== 1) {
          throw new TypeError('Monthly reference tension lost original selected T9 evidence.');
        }
        return matches[0]!;
      });
      const unavailable = reference.unavailableNatalPillars ?? [];
      if (new Set(unavailable).size !== unavailable.length ||
          unavailable.some(slot => !['year', 'month', 'day', 'hour'].includes(slot))) {
        throw new TypeError('Monthly reference has invalid unresolved natal pillar context.');
      }
      referenceFocus = {
        referenceDateTime: reference.referenceDateTime,
        state: 'in_period',
        segmentId: reference.segmentId,
        currentSection: matched[0]!,
        currentTensions,
        unavailableNatalPillars: [...unavailable],
        message: '조회 시각에 해당하는 절입 구간의 기존 T9 연구 풀이입니다. 다른 구간의 문구는 현재 풀이가 아닙니다.' +
          (unavailable.length ? ' 원국의 일부 기둥 관계는 미확정이므로 충이 없다고 판단하지 않습니다.' : ''),
      };
    } else if (reference.state === 'insufficient_evidence') {
      if (!reference.segmentId || reference.theme !== undefined) {
        throw new TypeError('Monthly unavailable reference cannot carry a current claim.');
      }
      referenceFocus = {
        referenceDateTime: reference.referenceDateTime,
        state: 'insufficient_evidence',
        segmentId: reference.segmentId,
        unavailableNatalPillars: [...(reference.unavailableNatalPillars ?? [])],
        message: '조회 시각의 절입 구간에는 근거 있는 T9 해석 문단이 없어 현재 풀이를 보류합니다.',
      };
    } else {
      if (reference.segmentId !== undefined || reference.theme !== undefined) {
        throw new TypeError('An outside-month reference cannot carry a current Jeol interval or claim.');
      }
      referenceFocus = {
        referenceDateTime: reference.referenceDateTime,
        state: 'outside_target_month',
        message: '조회 시각이 선택한 연·월 밖이므로 현재 적용할 월운 문단을 지정하지 않습니다.',
      };
    }
  }
  const lifeSections = life?.periods.map(period => ({
    title: period.kind === 'current' ? '현재 대운 계산 구간' : '다음 대운 계산 구간',
    text: period.text,
    evidenceKind: 'canonical_dayun_fact' as const,
    sourceIds: [life.policyId, life.policyHash],
    factPaths: ['luckCycle'],
    interval: {
      startsAt: period.startsAt,
      endsAtExclusive: period.endsAtExclusive,
    },
  })) ?? [];

  let annualReferenceFocus: TemporalAnnualReferenceFocus | undefined;
  if (joined !== undefined) {
    const annualRef = joined.annualReference;
    const effective = joined.annualEffectiveContext;
    const referenceTime = Date.parse(annualRef.referenceDateTime);
    const ipchunTime = Date.parse(effective.ipchunAt);
    const expectedState = annualRef.state === 'outside_target_civil_year'
      ? 'outside_target_civil_year'
      : referenceTime < ipchunTime ? 'before_ipchun' : 'from_ipchun';
    const expectedAnnualReading = expectedState === 'from_ipchun'
      ? 'in_target_civil_year' : expectedState;
    const wallYear = new Date(referenceTime + 9 * 60 * 60 * 1000).getUTCFullYear();
    const expectedPillar = expectedState === 'before_ipchun'
      ? effective.beforeIpchunPillar
      : expectedState === 'from_ipchun' ? effective.afterIpchunPillar : undefined;
    if (!Number.isFinite(referenceTime) || !Number.isFinite(ipchunTime) ||
        annualRef.referenceDateTime !== joined.monthly.referenceReading.referenceDateTime ||
        annualRef.civilYearAtReference !== wallYear ||
        (annualRef.state === 'in_target_civil_year') !== (wallYear === joined.targetYear) ||
        effective.state !== expectedState ||
        effective.effectivePillarAtReference !== expectedPillar ||
        joined.annualCurrentReading.state !== expectedAnnualReading ||
        joined.annualCurrentReading.referenceDateTime !== annualRef.referenceDateTime ||
        effective.afterIpchunPillar !== joined.annual.annualPillarLabel) {
      throw new TypeError('Annual menu requires the exact joined Ipchun applicability and reference.');
    }
    const message = expectedState === 'before_ipchun'
      ? '서울 달력연도는 선택한 연도이지만 입춘 전 효력 연주는 ' +
        expectedPillar + '입니다. 선택 연도 연운 T9 연구 문구는 현재 연운으로 적용하지 않고 비교 자료로만 표시합니다.'
      : expectedState === 'outside_target_civil_year'
        ? '조회 시각은 선택한 달력연도 밖입니다. 선택 연도의 T9 연구 문구는 현재 연운이 아니라 비교 자료입니다.'
        : '입춘 이후 효력 연주는 ' + expectedPillar +
          '입니다. 선택한 달력연도의 기존 T9 연구 문구만 제공하며 Official 해석은 아닙니다.';
    // Use the already selected annual current theme AND all associated T9
    // branch-clash meanings. Inapplicable civil years retain inventory only.
    let currentAnnual: {
      currentTheme: TemporalResearchMenuSection;
      currentTensions: readonly TemporalResearchMenuSection[];
    } | undefined;
    if (expectedState === 'from_ipchun') {
      const reading = joined.annualCurrentReading;
      const originalTheme = joined.annual.sections[0];
      const projectedTheme = annual[0];
      if (reading.state !== 'in_target_civil_year' ||
          !originalTheme || originalTheme.kind !== 'core' ||
          !projectedTheme || projectedTheme.interpretationRole !== 'theme' ||
          reading.theme.id !== originalTheme.id ||
          reading.theme.title !== originalTheme.title ||
          reading.theme.text !== originalTheme.text ||
          JSON.stringify(reading.theme.calculationFactPaths) !==
            JSON.stringify(originalTheme.calculationFactPaths) ||
          projectedTheme.semanticKey !== originalTheme.id ||
          projectedTheme.text !== reading.theme.text) {
        throw new TypeError('Annual current focus lost the selected T9 theme.');
      }
      const candidates = joined.annual.sections.filter(section => section.kind === 'tension');
      if (reading.sourceBoundTensions.length !== candidates.length ||
          new Set(reading.sourceBoundTensions.map(section => section.id)).size !==
            reading.sourceBoundTensions.length) {
        throw new TypeError('Annual current focus lost selected T9 tensions.');
      }
      const currentTensions = reading.sourceBoundTensions.map(source => {
        const index = joined.annual.sections.findIndex(item => item.id === source.id &&
          item.kind === 'tension');
        const original = joined.annual.sections[index];
        const projected = annual[index];
        if (index < 0 || !original || !projected ||
            projected.interpretationRole !== 'tension' ||
            source.title !== original.title || source.text !== original.text ||
            source.candidateClaimType !== original.candidateClaimType ||
            source.methodologyId !== original.methodologyId ||
            source.policySourceId !== original.policySourceId ||
            JSON.stringify(source.calculationFactPaths) !==
              JSON.stringify(original.calculationFactPaths) ||
            projected.semanticKey !== original.id ||
            projected.text !== original.text ||
            projected.sourceIds.length === 0) {
          throw new TypeError('Annual current focus cannot invent or drop a selected T9 tension.');
        }
        return projected;
      });
      currentAnnual = { currentTheme: projectedTheme, currentTensions };
    }
    annualReferenceFocus = {
      referenceDateTime: annualRef.referenceDateTime,
      state: expectedState,
      ...(expectedPillar === undefined ? {} : { effectivePillarAtReference: expectedPillar }),
      ...(currentAnnual === undefined ? {} : currentAnnual),
      message,
    };
  }
  const annualHasMeaning = annual.some(section =>
    section.evidenceKind === 'annual_research_profile');
  const monthlyHasMeaning = monthly.some(section =>
    section.evidenceKind === 'monthly_t9_research_claim');
  const lifeHasFacts = lifeSections.length > 0;
  return [
    {
      version: TEMPORAL_RESEARCH_MENU_READING_VERSION,
      menuId: 'annual', label: '올해',
      availability: annualHasMeaning ? 'partial' : 'unavailable',
      meaning: annualHasMeaning ? 'bounded_research_interpretation' : 'none',
      statusMessage: annualHasMeaning
        ? (annualReferenceFocus?.state === 'from_ipchun'
          ? '입춘 이후 선택 연도의 기존 연구 문구만 제공됩니다. 연운 Official 해석은 미승인입니다.'
          : '선택한 연도의 연구 문구는 조회 시각의 현재 연운으로 적용하지 않습니다. 연운 Official 해석은 미승인입니다.')
        : '올해의 개인별 연구 풀이가 아직 실행되지 않았습니다.',
      sections: annual,
      ...(annualReferenceFocus === undefined ? {} : { annualReferenceFocus }),
      missing: joined === undefined
        ? ['연도 및 출생정보를 입력하고 연운 연구 풀이를 실행해야 합니다.']
        : [...joined.annual.caveats],
      provenance: joinedProvenance,
      authority: AUTHORITY,
    },
    {
      version: TEMPORAL_RESEARCH_MENU_READING_VERSION,
      menuId: 'monthly', label: '이번 달',
      availability: monthlyHasMeaning ? 'partial' : 'unavailable',
      meaning: monthlyHasMeaning ? 'bounded_research_interpretation' : 'none',
      statusMessage: monthlyHasMeaning
        ? (referenceFocus?.state === 'in_period'
          ? '조회 시각의 절입 구간별 기존 T9 풀이를 지정했습니다. 월운 Official 해석은 미승인입니다.'
          : '선택한 월의 절입 구간별 T9 연구 풀이입니다. 조회 시각의 현재 풀이와 다를 수 있습니다. 월운 Official 해석은 미승인입니다.')
        : '해당 월의 출처에 연결된 개인별 풀이 근거가 충분하지 않습니다.',
      sections: monthly,
      ...(referenceFocus === undefined ? {} : { referenceFocus }),
      missing: joined === undefined
        ? ['연도·월·출생정보를 입력하고 월운 연구 풀이를 실행해야 합니다.']
        : [...joined.monthly.missing, ...joined.monthly.caveats],
      provenance: joinedProvenance,
      authority: AUTHORITY,
    },
    {
      version: TEMPORAL_RESEARCH_MENU_READING_VERSION,
      menuId: 'life_stage', label: '삶의 단계',
      availability: lifeHasFacts ? 'partial' : 'unavailable',
      meaning: lifeHasFacts ? 'calculation_facts_only' : 'none',
      statusMessage: lifeHasFacts
        ? '현재·다음 대운의 계산 구간만 확인됐습니다. 삶의 단계에 대한 의미 해석은 미승인입니다.'
        : '확정된 대운 구간 또는 필요한 출생정보가 없어 표시할 계산 사실이 부족합니다.',
      sections: lifeSections,
      missing: life === undefined
        ? ['삶의 단계 계산에 필요한 출생정보와 조회 시각을 입력해야 합니다.']
        : [...life.missing, ...life.caveats],
      provenance: life === undefined
        ? defaultProvenance
        : {
            snapshotId: life.snapshotId,
            calculationHash: life.calculationHash,
            timeZone: 'Asia/Seoul',
          },
      authority: AUTHORITY,
    },
  ];
}
