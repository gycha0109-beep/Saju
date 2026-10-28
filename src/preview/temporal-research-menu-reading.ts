import type { EarthlyBranch, PillarSlot } from '../contracts/calculation.js';
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
  researchPolicySourceId?: string;
  methodologyId?: string;
  sourceIds: readonly string[];
  factPaths: readonly string[];
  /** A measured temporal-to-natal clash, not a new outcome or T9 synthesis. */
  observedClash?: Readonly<{
    natalPillar: PillarSlot;
    natalBranch: EarthlyBranch;
    temporalBranch: EarthlyBranch;
  }>;
  interval?: {
    startsAt: string;
    endsAtExclusive: string;
  };
}

export interface TemporalMonthlyReferenceFocus {
  referenceDateTime: string;
  state: 'in_period' | 'insufficient_evidence' | 'outside_target_month';
  /** Only the actually selected Jeol interval can have a current claim. */
  segmentId?: 'before_jeol' | 'after_jeol';
  currentSection?: TemporalResearchMenuSection;
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
  /** Exact same-chart structural identities for evidence display only; never additional T9 meaning. */
  observedStructuralContext?: GeneralAnnualMonthlyExplorationReport['observedStructuralContext'];
  /** Layered calendar / natal / Dayun relation matches with no interpreted outcome. */
  conditionalComposition?: GeneralAnnualMonthlyExplorationReport['conditionalComposition'];
  /** Links only to original research T9 IDs. It does not issue or promote Claims. */
  t9EvidenceLinks?: GeneralAnnualMonthlyExplorationReport['t9EvidenceLinks'];
  /** Active structural evidence at the exact requested instant, never whole-month meaning. */
  t9ReferenceEvidence?: GeneralAnnualMonthlyExplorationReport['t9EvidenceLinks']['referenceEvidenceFocus'];
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
        joined.monthly.targetMonth !== joined.targetMonth ||
        joined.observedStructuralContext.scope !== 'calculated_relation_identity_only' ||
        joined.observedStructuralContext.interpretationAuthorityGranted ||
        joined.observedStructuralContext.annualPillarLabel !== joined.annual.annualPillarLabel ||
        joined.observedStructuralContext.annualStemTenGod !== joined.annual.annualStemTenGod ||
        joined.observedStructuralContext.monthlyPhases.length !== 2 ||
        joined.observedStructuralContext.monthlyPhases[0]?.segmentId !== 'before_jeol' ||
        joined.observedStructuralContext.monthlyPhases[1]?.segmentId !== 'after_jeol' ||
        joined.conditionalComposition.snapshotId !== joined.snapshotId ||
        joined.conditionalComposition.calculationHash !== joined.calculationHash ||
        joined.conditionalComposition.scope !== 'research_structural_conditions_only' ||
        joined.conditionalComposition.interpretationAuthorityGranted ||
        joined.conditionalComposition.mayPublish ||
        joined.conditionalComposition.maySell ||
        joined.conditionalComposition.mayGrantOfficialAuthority ||
        joined.conditionalComposition.annualCalendarPolicy !== 'civil_year_only' ||
        joined.conditionalComposition.targetYear !== joined.targetYear ||
        joined.conditionalComposition.targetMonth !== joined.targetMonth ||
        joined.conditionalComposition.jeolAt !== joined.monthly.jeolBoundary.at ||
        joined.conditionalComposition.slices.length < 2 ||
        joined.conditionalComposition.slices[0]?.segmentId !== 'before_jeol' ||
        joined.conditionalComposition.slices.at(-1)?.segmentId !== 'after_jeol' ||
        joined.t9EvidenceLinks.scope !== 'existing_monthly_t9_claim_evidence_link_only' ||
        joined.t9EvidenceLinks.snapshotId !== joined.snapshotId ||
        joined.t9EvidenceLinks.calculationHash !== joined.calculationHash ||
        joined.t9EvidenceLinks.targetYear !== joined.targetYear ||
        joined.t9EvidenceLinks.targetMonth !== joined.targetMonth ||
        joined.t9EvidenceLinks.interpretationClaimEmissionAuthorized ||
        joined.t9EvidenceLinks.sourceQualifiedCrossLayerMeaningEstablished ||
        joined.t9EvidenceLinks.mayPublish || joined.t9EvidenceLinks.maySell ||
        joined.t9EvidenceLinks.referenceEvidenceFocus.referenceDateTime !==
          joined.monthly.referenceReading.referenceDateTime ||
        joined.t9EvidenceLinks.referenceEvidenceFocus.state !==
          joined.monthly.referenceReading.state ||
        joined.t9EvidenceLinks.referenceEvidenceFocus.segmentId !==
          (joined.monthly.referenceReading.segmentId ?? null) ||
        (() => {
          const focus = joined.t9EvidenceLinks.referenceEvidenceFocus;
          const at = Date.parse(focus.referenceDateTime);
          const applicable = joined.t9EvidenceLinks.existingT9ClaimLinks.filter(link =>
            Date.parse(link.startsAt) <= at && at < Date.parse(link.endsAtExclusive));
          return !Number.isFinite(at) || applicable.length > 1 ||
            (focus.state === 'outside_target_month' &&
              (focus.activeLink !== null || applicable.length !== 0)) ||
            (focus.state !== 'outside_target_month' &&
              (applicable.length !== 1 || focus.activeLink === null ||
               focus.activeLink.startsAt !== applicable[0]?.startsAt ||
               focus.activeLink.endsAtExclusive !== applicable[0]?.endsAtExclusive ||
               focus.activeLink.existingT9ClaimId !== applicable[0]?.existingT9ClaimId ||
               (focus.state === 'in_period' &&
                focus.activeLink.existingT9ClaimId !== joined.monthly.referenceReading.theme?.claimId)));
        })() ||
        joined.t9EvidenceLinks.existingT9ClaimLinks.length !==
          joined.conditionalComposition.slices.length ||
        joined.t9EvidenceLinks.existingT9ClaimLinks.some((link, index) => {
          const slice = joined.conditionalComposition.slices[index];
          const themes = joined.monthly.sections.filter(section =>
            section.kind === 'theme' && section.segmentId === link.segmentId &&
            Date.parse(section.calculatedInterval.startsAt) <= Date.parse(link.startsAt) &&
            Date.parse(link.endsAtExclusive) <= Date.parse(section.calculatedInterval.endsAt));
          return !slice || link.segmentId !== slice.segmentId ||
            link.startsAt !== slice.startsAt || link.endsAtExclusive !== slice.endsAtExclusive ||
            link.newlyEmittedT9Claims !== 0 || link.compositionMeaningState !== 'not_admitted' ||
            link.rankOrOutcomeEstablished ||
            link.existingT9ClaimId !== (themes[0]?.claimId ?? null) ||
            link.existingT9MethodologyId !== (themes[0]?.methodologyId ?? null) ||
            themes.length > 1;
        })) {
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
      researchPolicySourceId: section.policySourceId,
      methodologyId: section.methodologyId,
      sourceIds: [],
      factPaths: section.relatedPillar === undefined
        ? ['temporal.annualStemTenGod']
        : ['temporal.annualBranchRelations.' + section.relatedPillar],
      ...(section.observedClash && section.relatedPillar ? {
        observedClash: {
          natalPillar: section.relatedPillar,
          natalBranch: section.observedClash.natalBranch,
          temporalBranch: section.observedClash.annualBranch,
        },
      } : {}),
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
      methodologyId: section.methodologyId,
      sourceIds: [...section.sourceIds],
      factPaths: [...section.factPaths],
      ...(section.observedClash && section.relatedPillar ? {
        observedClash: {
          natalPillar: section.relatedPillar,
          natalBranch: section.observedClash.natalBranch,
          temporalBranch: section.observedClash.monthlyBranch,
        },
      } : {}),
      interval: {
        startsAt: section.calculatedInterval.startsAt,
        endsAtExclusive: section.calculatedInterval.endsAt,
      },
    })) ?? [];
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
  // The monthly menu answers the requested instant, not every T9 claim
  // calculated for both sides of the Jeol boundary. The other sections remain
  // available for clearly labelled comparison, but are NOT current meaning.
  const currentMonthlySection = referenceFocus?.state === 'in_period'
    ? referenceFocus.currentSection
    : undefined;
  const monthlyHasMeaning = currentMonthlySection !== undefined &&
    currentMonthlySection.evidenceKind === 'monthly_t9_research_claim' &&
    monthly.some(section =>
      section.claimId === currentMonthlySection.claimId &&
      section.interval?.startsAt === currentMonthlySection.interval?.startsAt &&
      section.interval?.endsAtExclusive ===
        currentMonthlySection.interval?.endsAtExclusive);
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
      // Month-scoped composition is not a full-year evidence claim.
      ...(joined === undefined ? {} : {
        observedStructuralContext: joined.observedStructuralContext,
      }),
      missing: joined === undefined
        ? ['연도 및 출생정보를 입력하고 연운 연구 풀이를 실행해야 합니다.']
        : [
          ...joined.annual.caveats,
          '현재 연운의 원국 종합해석을 뒷받침할 별도의 출처·방법론 권한이 확립되지 않아 관련 결론은 보류합니다.',
        ],
      provenance: joinedProvenance,
      authority: AUTHORITY,
    },
    {
      version: TEMPORAL_RESEARCH_MENU_READING_VERSION,
      menuId: 'monthly', label: '이번 달',
      availability: monthlyHasMeaning ? 'partial' : 'unavailable',
      meaning: monthlyHasMeaning ? 'bounded_research_interpretation' : 'none',
      statusMessage: monthlyHasMeaning
        ? '조회 시각의 절입 구간에 실제 해당하는 기존 T9 풀이를 선택했습니다. 나머지는 다른 구간의 비교 자료이며 월운 Official 해석은 미승인입니다.'
        : referenceFocus?.state === 'outside_target_month'
          ? '조회 시각이 선택한 월 밖입니다. 다른 절입 구간의 문장을 현재 월운으로 제공하지 않습니다.'
          : '조회 시각에 해당하는 절입 구간의 개인별 T9 근거가 확인되지 않아 월운 해석을 보류합니다.',
      sections: monthlyHasMeaning && currentMonthlySection !== undefined
        ? [
          {
            ...currentMonthlySection,
            title: '조회 시각에 적용되는 풀이 · ' + currentMonthlySection.title,
          },
          ...monthly.filter(section =>
            section.claimId !== currentMonthlySection.claimId ||
            section.interval?.startsAt !== currentMonthlySection.interval?.startsAt ||
            section.interval?.endsAtExclusive !== currentMonthlySection.interval?.endsAtExclusive)
            .map(section => ({
              ...section,
              title: '다른 절입 구간의 비교 자료 (현재 풀이 아님) · ' + section.title,
            })),
        ]
        : monthly.map(section => ({
            ...section,
            title: '현재 풀이가 아닌 기간별 연구 자료 · ' + section.title,
          })),
      ...(joined === undefined ? {} : {
        observedStructuralContext: joined.observedStructuralContext,
        conditionalComposition: joined.conditionalComposition,
        t9EvidenceLinks: joined.t9EvidenceLinks,
        t9ReferenceEvidence: joined.t9EvidenceLinks.referenceEvidenceFocus,
      }),
      ...(referenceFocus === undefined ? {} : { referenceFocus }),
      missing: joined === undefined
        ? ['연도·월·출생정보를 입력하고 월운 연구 풀이를 실행해야 합니다.']
        : [
          ...joined.monthly.missing,
          ...joined.monthly.caveats,
          '원국과 월운의 별도 종합 관계 및 연운으로부터의 의미 상속은 출처 있는 방법론이 없어 적용하지 않습니다.',
        ],
      provenance: joinedProvenance,
      authority: AUTHORITY,
    },
    {
      version: TEMPORAL_RESEARCH_MENU_READING_VERSION,
      menuId: 'life_stage', label: '삶의 단계',
      // Calculated Dayun periods do not constitute a partially completed
      // interpretation of a person's life stages. Facts remain readable
      // below but never raise the semantic availability of this menu.
      availability: 'unavailable',
      meaning: lifeHasFacts ? 'calculation_facts_only' : 'none',
      statusMessage: lifeHasFacts
        ? '현재·다음 대운의 구간 계산 사실은 표시하지만, 삶의 단계 해석은 아직 제공할 수 없습니다.'
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
