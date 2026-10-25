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
  /** Monthly claim ID is only an internal research Claim, not Official authority. */
  claimId?: string;
  researchProfileKey?: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  interval?: {
    startsAt: string;
    endsAtExclusive: string;
  };
}

/** Existing T8 observation, never a synthesized T9 outcome. */
export interface TemporalResearchNatalContextSection {
  title: string;
  text: string;
  evidenceKind: 'selected_natal_t8_context';
  relatedTemporalClaimId: string;
  natalClaimType: string;
  natalRuleId: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  temporalSourceIds: readonly string[];
  temporalFactPaths: readonly string[];
  limitation: string;
}


export interface TemporalMonthlyReferenceFocus {
  referenceDateTime: string;
  state: 'in_period' | 'insufficient_evidence' | 'outside_target_month';
  /** Only the actually selected Jeol interval can have a current claim. */
  segmentId?: 'before_jeol' | 'after_jeol';
  currentSection?: TemporalResearchMenuSection;
  natalContextSections?: readonly TemporalResearchNatalContextSection[];
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
  /** Independent, source-verified natal T8 context, not a temporal claim. */
  natalContextSections?: readonly TemporalResearchNatalContextSection[];
  /** Reference-time projection applies to the monthly menu only. */
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
  const annual = joined?.annual.sections.filter(section =>
    section.text.trim().length > 0).map(section => ({
      title: section.title,
      text: section.text,
      evidenceKind: 'annual_research_profile' as const,
      // The annual section ID is a research semantic key, not a source ID.
      researchProfileKey: section.id,
      ...(section.claimId === undefined ? {} : { claimId: section.claimId }),
      sourceIds: section.sourceIds === undefined ? [] : [...section.sourceIds],
      factPaths: [...section.calculationFactPaths],
    })) ?? [];
  const monthly = joined?.monthly.sections.filter(section =>
    section.text.trim().length > 0 &&
    section.sourceIds.length > 0 &&
    section.factPaths.length > 0).map(section => ({
      title: (section.segmentId === 'before_jeol' ? '절입 전 · ' : '절입 이후 · ') +
        section.title,
      text: section.text,
      evidenceKind: 'monthly_t9_research_claim' as const,
      claimId: section.claimId,
      sourceIds: [...section.sourceIds],
      factPaths: [...section.factPaths],
      interval: {
        startsAt: section.calculatedInterval.startsAt,
        endsAtExclusive: section.calculatedInterval.endsAt,
      },
    })) ?? [];
  function mapNatalContext(
    relations: NonNullable<NonNullable<typeof joined>['annual']['natalCorrespondences']>,
    allowedClaims: readonly TemporalResearchMenuSection[],
  ): readonly TemporalResearchNatalContextSection[] {
    const allowed = new Map(allowedClaims.filter(section => section.claimId)
      .map(section => [section.claimId, section]));
    return relations.map(relation => {
      const source = allowed.get(relation.temporalClaimId);
      if (!source ||
          relation.authority !== 'observed_natal_context_not_temporal_outcome' ||
          !relation.natalSourceIds.length || !relation.temporalSourceIds.length ||
          !relation.natalFactPaths.length || !relation.temporalFactPaths.length ||
          !relation.natalRuleId || !relation.natalClaimType ||
          relation.temporalSourceIds.some(id => !source.sourceIds.includes(id)) ||
          relation.temporalFactPaths.some(path => !source.factPaths.includes(path))) {
        throw new TypeError('Temporal menu rejects unselected or ungrounded natal context');
      }
      return {
        title: relation.natalHeadline,
        text: relation.natalParagraph + ' ' + relation.limitation,
        evidenceKind: 'selected_natal_t8_context' as const,
        relatedTemporalClaimId: relation.temporalClaimId,
        natalClaimType: relation.natalClaimType,
        natalRuleId: relation.natalRuleId,
        sourceIds: [...relation.natalSourceIds],
        factPaths: [...relation.natalFactPaths],
        temporalSourceIds: [...relation.temporalSourceIds],
        temporalFactPaths: [...relation.temporalFactPaths],
        limitation: relation.limitation,
      };
    });
  }
  const annualNatalContext = mapNatalContext(
    joined?.annual.natalCorrespondences ?? [], annual);
  const monthlyNatalContext = mapNatalContext(
    joined?.monthly.natalCorrespondences ?? [], monthly);
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
      const matched = theme === undefined ? [] : monthly.filter(section => section.claimId === theme.claimId &&
        section.text === theme.text &&
        section.interval?.startsAt === theme.calculatedInterval.startsAt &&
        section.interval?.endsAtExclusive === theme.calculatedInterval.endsAt &&
        section.sourceIds.join('|') === theme.sourceIds.join('|') &&
        section.factPaths.join('|') === theme.factPaths.join('|'));
      const at = Date.parse(reference.referenceDateTime);
      if (theme?.kind !== 'theme' || theme.segmentId !== reference.segmentId ||
          matched.length !== 1 ||
          !(Date.parse(theme.calculatedInterval.startsAt) <= at &&
            at < Date.parse(theme.calculatedInterval.endsAt))) {
        throw new TypeError('Monthly reference must match one original source-qualified T9 theme and interval.');
      }
      referenceFocus = {
        referenceDateTime: reference.referenceDateTime,
        state: 'in_period',
        segmentId: reference.segmentId,
        currentSection: matched[0]!,
        natalContextSections: monthlyNatalContext.filter(section =>
          section.relatedTemporalClaimId === theme.claimId),
        message: '조회 시각에 해당하는 절입 구간의 기존 T9 연구 풀이입니다. 다른 구간의 문구는 현재 풀이가 아닙니다.',
      };
    } else if (reference.state === 'insufficient_evidence') {
      if (!reference.segmentId || reference.theme !== undefined) {
        throw new TypeError('Monthly unavailable reference cannot carry a current claim.');
      }
      referenceFocus = {
        referenceDateTime: reference.referenceDateTime,
        state: 'insufficient_evidence',
        segmentId: reference.segmentId,
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
        ? '개인별 연간 연구 문구만 제공됩니다. 연운 Official 해석은 미승인입니다.'
        : '올해의 개인별 연구 풀이가 아직 실행되지 않았습니다.',
      sections: annual,
      ...(annualNatalContext.length ? { natalContextSections: annualNatalContext } : {}),
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
      ...(monthlyNatalContext.length ? { natalContextSections: monthlyNatalContext } : {}),
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
