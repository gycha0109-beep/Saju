import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildNatalN16GroundedReaderBrief,
  type NatalN16TextProvenance,
  type NatalN16GroundedReaderBrief,
} from './natal-grounded-reader-brief.js';
import type { NatalSynthesisDomain, NatalSynthesisSource } from './natal-synthesis-preview.js';

export const NATAL_N21_READER_FIRST_VERSION =
  'saju-n21-reader-first-five-domain-natal-v1' as const;

/** The first three *real* substantive text units of a domain, not generated filler. */
const MAX_UNITS_PER_DOMAIN = 3;
export const NATAL_N23_DOMAIN_DISTINCTIVE_SELECTION_VERSION =
  'saju-n23-domain-distinctive-source-reading-selection-v1' as const;

export interface NatalN21ReadingExcerpt {
  unitId: string;
  text: string;
  provenance: readonly NatalN16TextProvenance[];
  repeatedInOtherDomains: readonly NatalSynthesisDomain[];
  selectionBasis: 'domain_distinctive' | 'cross_domain_shared';
  interpretationNewlyInferred: false;
}

export interface NatalN21StorySection {
  domain: NatalSynthesisDomain;
  title: string;
  responseState: string;
  hasInterpretation: boolean;
  excerpts: readonly NatalN21ReadingExcerpt[];
  displayedDomainDistinctiveCount: number;
  displayedCrossDomainSharedCount: number;
  sharedEarlier: readonly { unitId: string; alreadyShownIn: NatalSynthesisDomain }[];
  /** Other existing bounded text remains accessible in the full source reading. */
  remainingOriginalInterpretationCount: number;
  calculatedExplanationCount: number;
  limitations: readonly string[];
}

export interface NatalN21ReaderFirstStory {
  version: typeof NATAL_N21_READER_FIRST_VERSION;
  excerptSelectionVersion: typeof NATAL_N23_DOMAIN_DISTINCTIVE_SELECTION_VERSION;
  lifecycle: 'internal_preview_only';
  snapshotId: string;
  calculationHash: string;
  birthTimeKnown: boolean;
  readingState: 'has_bounded_reading' | 'partial_bounded_reading' | 'no_bounded_reading';
  /** Chart basis is calculation, NEVER an interpretive conclusion. */
  factualBasis: NatalN16GroundedReaderBrief['context'];
  sections: readonly NatalN21StorySection[];
  displayedOriginalInterpretationCount: number;
  displayedDomainDistinctiveCount: number;
  displayedCrossDomainSharedCount: number;
  hiddenDuplicateCount: number;
  calculationFactsExcludedFromInterpretation: number;
  previewMeaningFingerprint: string;
  meaningDifferentiationProven: false;
  createsNewInterpretation: false;
  mayPublish: false;
  maySell: false;
  limitations: readonly string[];
}

/**
 * Present the same already-delivered five-domain Preview as one *readable*
 * person's report. Actual claim-owned text is preserved byte-for-byte.
 *
 * This intentionally never tags a calculated chart-fact sentence as an
 * interpretation, ranks families, assigns strengths, or invents the
 * relationship between two independently authorized domain paragraphs.
 */
export function buildNatalN21ReaderFirstStory(
  snapshot: CanonicalSajuSnapshot,
  sources: readonly NatalSynthesisSource[],
): NatalN21ReaderFirstStory {
  const brief = buildNatalN16GroundedReaderBrief(snapshot, sources);
  const units = new Map(brief.readingUnits.map((unit) => [unit.unitId, unit]));
  const alreadyShown = new Map<string, NatalSynthesisDomain>();
  let hiddenDuplicateCount = 0;

  const sections: NatalN21StorySection[] = brief.domains.map((domain) => {
    const excerpts: NatalN21ReadingExcerpt[] = [];
    const sharedEarlier: NatalN21StorySection['sharedEarlier'][number][] = [];
    let remainingOriginalInterpretationCount = 0;
    let calculatedExplanationCount = 0;
    const originalMeaning = domain.unitIds.flatMap((unitId) => {
      const unit = units.get(unitId);
      if (!unit) throw new TypeError('N23 missing source-owned text: ' + unitId);
      if (unit.kind === 'calculated_chart_context') {
        calculatedExplanationCount++;
        return [];
      }
      if (unit.kind !== 'existing_preview_interpretation') {
        throw new TypeError('N23 unrecognized original-text classification');
      }
      if (!unit.sources.some((source) => source.domain === domain.domain)) {
        throw new TypeError('N23 missing domain-specific source for original text');
      }
      return [unit];
    });
    // Domain-exclusive text is not a new claim: it is an exact paragraph
    // already delivered only by this domain. Show it before general shared
    // paragraphs, which otherwise crowd the limited first-screen summary.
    const preferred = [
      ...originalMeaning.filter((unit) => unit.appearingInDomains.length === 1),
      ...originalMeaning.filter((unit) => unit.appearingInDomains.length > 1),
    ];
    for (const unit of preferred) {
      const owner = alreadyShown.get(unit.unitId);
      if (owner !== undefined) {
        sharedEarlier.push({ unitId: unit.unitId, alreadyShownIn: owner });
        hiddenDuplicateCount++;
        continue;
      }
      if (excerpts.length >= MAX_UNITS_PER_DOMAIN) {
        remainingOriginalInterpretationCount++;
        continue;
      }
      excerpts.push({
        unitId: unit.unitId,
        text: unit.text,
        provenance: unit.sources.filter((source) => source.domain === domain.domain),
        repeatedInOtherDomains: unit.appearingInDomains.filter((entry) => entry !== domain.domain),
        selectionBasis: unit.appearingInDomains.length === 1
          ? 'domain_distinctive' : 'cross_domain_shared',
        interpretationNewlyInferred: false,
      });
      alreadyShown.set(unit.unitId, domain.domain);
    }
    return {
      domain: domain.domain,
      title: domain.title,
      responseState: domain.responseState,
      hasInterpretation: domain.unitIds.some((id) =>
        units.get(id)?.kind === 'existing_preview_interpretation'),
      excerpts,
      displayedDomainDistinctiveCount: excerpts.filter((x) => x.selectionBasis === 'domain_distinctive').length,
      displayedCrossDomainSharedCount: excerpts.filter((x) => x.selectionBasis === 'cross_domain_shared').length,
      sharedEarlier,
      remainingOriginalInterpretationCount,
      calculatedExplanationCount,
      limitations: domain.disclosures,
    };
  });
  const available = sections.filter((section) => section.hasInterpretation).length;
  return {
    version: NATAL_N21_READER_FIRST_VERSION,
    excerptSelectionVersion: NATAL_N23_DOMAIN_DISTINCTIVE_SELECTION_VERSION,
    lifecycle: 'internal_preview_only',
    snapshotId: brief.snapshotId,
    calculationHash: brief.calculationHash,
    birthTimeKnown: brief.birthTimeKnown,
    readingState: available === 0 ? 'no_bounded_reading'
      : available === sections.length ? 'has_bounded_reading' : 'partial_bounded_reading',
    factualBasis: brief.context,
    sections,
    displayedOriginalInterpretationCount: sections.reduce((n, section) => n + section.excerpts.length, 0),
    displayedDomainDistinctiveCount: sections.reduce((n, section) => n + section.displayedDomainDistinctiveCount, 0),
    displayedCrossDomainSharedCount: sections.reduce((n, section) => n + section.displayedCrossDomainSharedCount, 0),
    hiddenDuplicateCount,
    calculationFactsExcludedFromInterpretation: brief.calculatedContextTextUnitCount,
    // Fingerprint the *original* substantive text, NOT factual chart difference
    // or the editorial layout. This is not evidence of meaning completeness.
    previewMeaningFingerprint: deterministicContentHash(
      brief.readingUnits
        .filter((unit) => unit.kind === 'existing_preview_interpretation')
        .map((unit) => unit.unitId).sort(),
    ),
    meaningDifferentiationProven: false,
    createsNewInterpretation: false,
    mayPublish: false,
    maySell: false,
    limitations: [
      '이 화면에는 기존 Preview에서 실제 전달된 문장만 표시하며, 생년월일에 맞춘 별도 인생 결론을 새로 생성하지 않습니다.',
      '분야마다 원래 전달된 문장 중 그 분야에만 나온 것을 먼저 최대 3개 보여주고, 남은 자리에 여러 분야의 공통 설명을 보여줍니다. 이는 내용의 중요도·효과를 판정한 것이 아닙니다.',
      '앞 화면에 나오지 않은 나머지 원본 내용은 아래 상세 보기에서 확인할 수 있습니다.',
      '명식 계산 근거와 기존 풀이 문장을 분리했습니다. 계산 사실만 달라도 의미가 달라졌다고 판단하지 않습니다.',
      '동일 문장의 여러 분야 출현은 하나의 해석으로 셉니다. 분야 간 새로운 인과 관계를 추론하지 않습니다.',
      '출생시각 미상·부분 근거는 해당 본문을 채워 넣지 않고 원래 응답 상태를 유지합니다.',
      '이 결과는 내부 읽기 UX 검증 전용이며 공개·판매·Production 해석 권한이 아닙니다.',
    ],
  };
}
