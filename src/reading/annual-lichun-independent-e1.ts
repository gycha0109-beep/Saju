import type { ReadingRequest } from '../contracts/reading.js';
import { annualSexagenaryPillar } from './temporal-reading-context.js';

/**
 * E1: independently corroborated astronomical evidence, NOT a Korean
 * gazette record and NOT an authority for Annual interpretation or production.
 *
 * Input metadata and user-provided reviewer strings cannot confer approval:
 * the approved packet list must be amended in reviewed repository code.
 */
export const INDEPENDENT_LICHUN_E1_VERSION = 'saju-lichun-independent-e1-v1' as const;

export interface IndependentLichunE1Packet {
  year: number;
  displayedMinuteUtc: string;
  publishedJapaneseAlmanac: {
    uri: string;
    originalPdfSha256: string;
    pdfPage: number;
    printedRow: string;
    timezone: 'Asia/Tokyo';
  };
  independentKoreanObservation: {
    uri: string;
    capturedPageSha256: string;
    displayedMinuteUtc: string;
    timezone: 'Asia/Seoul';
  };
  reviewerRef: string;
  reviewerDecisionRef: string;
  reviewerDecision: 'approved_for_research_calculation';
  /** Explicit source of review authority; owner-delegated AI is NOT independent human inspection. */
  reviewProvenance?: 'OWNER_DELEGATED_AI' | 'INDEPENDENT_HUMAN';
}

export type E1PacketReview =
  | { state: 'structurally_eligible_not_authorized'; productionAuthorized: false }
  | {
      state: 'rejected';
      reasonCode:
        | 'INVALID_YEAR_OR_MINUTE'
        | 'INVALID_NAOJ_WITNESS'
        | 'INVALID_KASI_CORROBORATION'
        | 'MISSING_REVIEW_ATTESTATION';
      productionAuthorized: false;
    };

function officialUrl(value: string, hostname: string): URL | undefined {
  try {
    const url = new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.hostname !== hostname ||
      url.username !== '' ||
      url.password !== '' ||
      url.port !== ''
    ) {
      return undefined;
    }
    return url;
  } catch {
    return undefined;
  }
}

const SHA256 = /^[a-f0-9]{64}$/;
const UTC_MINUTE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:00\.000Z$/;

function seoulParts(ms: number): Record<'year' | 'month' | 'day' | 'hour' | 'minute', number> {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date(ms));
  const get = (type: 'year' | 'month' | 'day' | 'hour' | 'minute'): number =>
    Number(parts.find((p) => p.type === type)?.value);
  return { year: get('year'), month: get('month'), day: get('day'), hour: get('hour'), minute: get('minute') };
}

/**
 * Mechanical validation only: hashes and reviewer references are not checked
 * against actual PDF bytes, captured HTML, or a person's identity here.
 */
export function inspectIndependentLichunE1Packet(
  packet: Readonly<IndependentLichunE1Packet>,
): E1PacketReview {
  const fail = (reasonCode: Extract<E1PacketReview, { state: 'rejected' }>['reasonCode']): E1PacketReview =>
    ({ state: 'rejected', reasonCode, productionAuthorized: false });

  const instant = Date.parse(packet.displayedMinuteUtc);
  if (
    !Number.isSafeInteger(packet.year) ||
    packet.year < 2 ||
    packet.year > 9999 ||
    !UTC_MINUTE.test(packet.displayedMinuteUtc) ||
    !Number.isFinite(instant) ||
    new Date(instant).toISOString() !== packet.displayedMinuteUtc
  ) {
    return fail('INVALID_YEAR_OR_MINUTE');
  }
  const local = seoulParts(instant);
  if (local.year !== packet.year || local.month !== 2 || local.day < 2 || local.day > 6) {
    return fail('INVALID_YEAR_OR_MINUTE');
  }

  const nao = packet.publishedJapaneseAlmanac;
  const naoUrl = officialUrl(nao.uri, 'eco.mtk.nao.ac.jp');
  const row = /^立\s*春\s+315\s+2\s+(\d{1,2})\s+(\d{1,2})\s+(\d{1,2})$/.exec(nao.printedRow.trim());
  if (
    naoUrl === undefined ||
    naoUrl.pathname !== `/koyomi/yoko/pdf/yoko${packet.year}.pdf` ||
    !SHA256.test(nao.originalPdfSha256) ||
    !Number.isSafeInteger(nao.pdfPage) ||
    nao.pdfPage !== 2 ||
    nao.timezone !== 'Asia/Tokyo' ||
    row === null ||
    Number(row[1]) !== local.day ||
    Number(row[2]) !== local.hour ||
    Number(row[3]) !== local.minute
  ) {
    return fail('INVALID_NAOJ_WITNESS');
  }

  const kasi = packet.independentKoreanObservation;
  const kasiUrl = officialUrl(kasi.uri, 'astro.kasi.re.kr');
  if (
    kasiUrl === undefined ||
    kasiUrl.pathname !== '/kor/life/post/calendarData' ||
    kasiUrl.searchParams.get('search_year') !== String(packet.year) ||
    !SHA256.test(kasi.capturedPageSha256) ||
    kasi.timezone !== 'Asia/Seoul' ||
    kasi.displayedMinuteUtc !== packet.displayedMinuteUtc
  ) {
    return fail('INVALID_KASI_CORROBORATION');
  }
  if (
    packet.reviewerRef.trim().length === 0 ||
    packet.reviewerDecisionRef.trim().length === 0 ||
    packet.reviewerDecision !== 'approved_for_research_calculation'
  ) {
    return fail('MISSING_REVIEW_ATTESTATION');
  }
  return { state: 'structurally_eligible_not_authorized', productionAuthorized: false };
}

/**
 * Code-pinned metadata copied from the byte-and-row-checked capture run #5.
 * These fingerprints are observations, NOT a source-owner review or an E1 grant.
 * KASI fingerprints identify specific HTML responses, not permanent publication IDs.
 *
 * Any later approved E1 packet must match an explicitly reviewed captured version.
 * A new source snapshot needs a separate reviewed code change and corresponding
 * updated evidence manifest before it may enter the code-owned approval list.
 */
export const AUDITED_E1_CAPTURE_FINGERPRINTS = Object.freeze([
  Object.freeze({
    year: 2026,
    captureRunId: 38042070143,
    minuteAnchorUtc: '2026-02-03T20:02:00.000Z',
    naojUri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf',
    naojOriginalPdfSha256: 'ee5f0a743c0e7e577fa4115a07eef7fa752cee9d6ce1022e06305a09f33f3d6d',
    kasiUri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026',
    kasiCapturedHtmlSha256: '716b1801d129dbcdef24fb6150a0ceec9dd9f0e4b53339a9eda8e14fea5ab056',
  }),
  Object.freeze({
    year: 2027,
    captureRunId: 38042070143,
    minuteAnchorUtc: '2027-02-04T01:46:00.000Z',
    naojUri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf',
    naojOriginalPdfSha256: 'f7998e5730bc7a5de5f122a692ca96626f3e0c8c035b30a1c71d6eb7718272e3',
    kasiUri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2027',
    kasiCapturedHtmlSha256: '7ead0a04d367a1efa1bf1d27a50d2d639ed8a098208dd66f6ffef272990bab9a',
  }),
] as const);

export type E1CaptureBindingReview =
  | { state: 'capture_matched_review_still_required'; captureRunId: number; productionAuthorized: false }
  | { state: 'unavailable'; reasonCode: 'NO_PINNED_CAPTURE' | 'CAPTURE_DIGEST_OR_MINUTE_MISMATCH'; productionAuthorized: false };

/**
 * Mechanical byte-fingerprint binding only. This does not verify signer identity,
 * approval scope, or that the now-expiring source files can be independently reproduced.
 */
export function inspectIndependentE1CaptureBinding(
  packet: Readonly<IndependentLichunE1Packet>,
): E1CaptureBindingReview {
  const capture = AUDITED_E1_CAPTURE_FINGERPRINTS.find((item) => item.year === packet.year);
  if (capture === undefined) {
    return { state: 'unavailable', reasonCode: 'NO_PINNED_CAPTURE', productionAuthorized: false };
  }
  if (
    capture.minuteAnchorUtc !== packet.displayedMinuteUtc ||
    capture.naojUri !== packet.publishedJapaneseAlmanac.uri ||
    capture.naojOriginalPdfSha256 !== packet.publishedJapaneseAlmanac.originalPdfSha256 ||
    capture.kasiUri !== packet.independentKoreanObservation.uri ||
    capture.kasiCapturedHtmlSha256 !== packet.independentKoreanObservation.capturedPageSha256 ||
    capture.minuteAnchorUtc !== packet.independentKoreanObservation.displayedMinuteUtc
  ) {
    return { state: 'unavailable', reasonCode: 'CAPTURE_DIGEST_OR_MINUTE_MISMATCH', productionAuthorized: false };
  }
  return { state: 'capture_matched_review_still_required', captureRunId: capture.captureRunId, productionAuthorized: false };
}

/**
 * E1 RESEARCH-ONLY OWNER-DELEGATED EXCEPTION.
 * The project owner expressly delegated creation of the decision to an AI.
 * An AI prepared/posted the decision via the connected owner GitHub account:
 * https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685
 * There was NO independent HUMAN source review and NO attestation of the
 * owner's personal inspection. Do not present these records as such.
 *
 * Four source file hashes are pinned to capture run #5 and crosschecked by
 * inspectIndependentE1CaptureBinding. E2, Annual interpretation, Monthly and
 * Production remain prohibited. The draft PR requires its own code review.
 */
const CODE_APPROVED_E1_PACKETS: readonly IndependentLichunE1Packet[] = Object.freeze([
  Object.freeze({
    year: 2026,
    displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
    publishedJapaneseAlmanac: {
      uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2026.pdf',
      originalPdfSha256: 'ee5f0a743c0e7e577fa4115a07eef7fa752cee9d6ce1022e06305a09f33f3d6d',
      pdfPage: 2,
      printedRow: '立 春 315 2 4 5 2',
      timezone: 'Asia/Tokyo' as const,
    },
    independentKoreanObservation: {
      uri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026',
      capturedPageSha256: '716b1801d129dbcdef24fb6150a0ceec9dd9f0e4b53339a9eda8e14fea5ab056',
      displayedMinuteUtc: '2026-02-03T20:02:00.000Z',
      timezone: 'Asia/Seoul' as const,
    },
    reviewerRef: 'gycha0109-beep (owner delegation; source examined by AI)',
    reviewerDecisionRef: 'https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685',
    reviewerDecision: 'approved_for_research_calculation' as const,
    reviewProvenance: 'OWNER_DELEGATED_AI' as const,
  }),
  Object.freeze({
    year: 2027,
    displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
    publishedJapaneseAlmanac: {
      uri: 'https://eco.mtk.nao.ac.jp/koyomi/yoko/pdf/yoko2027.pdf',
      originalPdfSha256: 'f7998e5730bc7a5de5f122a692ca96626f3e0c8c035b30a1c71d6eb7718272e3',
      pdfPage: 2,
      printedRow: '立 春 315 2 4 10 46',
      timezone: 'Asia/Tokyo' as const,
    },
    independentKoreanObservation: {
      uri: 'https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2027',
      capturedPageSha256: '7ead0a04d367a1efa1bf1d27a50d2d639ed8a098208dd66f6ffef272990bab9a',
      displayedMinuteUtc: '2027-02-04T01:46:00.000Z',
      timezone: 'Asia/Seoul' as const,
    },
    reviewerRef: 'gycha0109-beep (owner delegation; source examined by AI)',
    reviewerDecisionRef: 'https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685',
    reviewerDecision: 'approved_for_research_calculation' as const,
    reviewProvenance: 'OWNER_DELEGATED_AI' as const,
  }),
]);

export type ApprovedIndependentLichunBoundary =
  | {
      state: 'approved_research_calculation_source';
      year: number;
      evidenceTier: 'E1_INDEPENDENT_ASTRONOMY';
      displayedMinuteUtc: string;
      sourceVersion: typeof INDEPENDENT_LICHUN_E1_VERSION;
      sourceRefs: readonly [string, string];
      reviewProvenance: 'OWNER_DELEGATED_AI' | 'INDEPENDENT_HUMAN';
      independentHumanReviewCompleted: boolean;
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      year: number;
      reasonCode:
        | 'NO_CODE_APPROVED_E1_WITNESS'
        | 'CONFLICTING_E1_WITNESSES'
        | 'INVALID_APPROVED_E1_WITNESS';
      productionAuthorized: false;
    };

export function getCodeApprovedIndependentLichunBoundary(year: number): ApprovedIndependentLichunBoundary {
  const matches = CODE_APPROVED_E1_PACKETS.filter((p) => p.year === year);
  if (matches.length === 0) return { state: 'unavailable', year, reasonCode: 'NO_CODE_APPROVED_E1_WITNESS', productionAuthorized: false };
  if (matches.length !== 1) return { state: 'unavailable', year, reasonCode: 'CONFLICTING_E1_WITNESSES', productionAuthorized: false };
  const packet = matches[0];
  if (
    packet === undefined ||
    inspectIndependentLichunE1Packet(packet).state !== 'structurally_eligible_not_authorized' ||
    inspectIndependentE1CaptureBinding(packet).state !== 'capture_matched_review_still_required' ||
    packet.reviewProvenance !== 'OWNER_DELEGATED_AI' ||
    packet.reviewerDecisionRef !== 'https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685'
  ) {
    return { state: 'unavailable', year, reasonCode: 'INVALID_APPROVED_E1_WITNESS', productionAuthorized: false };
  }
  return {
    state: 'approved_research_calculation_source',
    year,
    evidenceTier: 'E1_INDEPENDENT_ASTRONOMY',
    displayedMinuteUtc: packet.displayedMinuteUtc,
    sourceVersion: INDEPENDENT_LICHUN_E1_VERSION,
    sourceRefs: [packet.publishedJapaneseAlmanac.uri, packet.independentKoreanObservation.uri],
    reviewProvenance: 'OWNER_DELEGATED_AI',
    independentHumanReviewCompleted: false,
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}

const ZONED_INSTANT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-]\d{2}:\d{2})$/;

function validatedInstant(value: string): number | undefined {
  const p = ZONED_INSTANT.exec(value);
  if (p === null) return undefined;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return undefined;
  const zone = p[8]!;
  const zh = zone === 'Z' ? 0 : Number(zone.slice(1, 3));
  const zm = zone === 'Z' ? 0 : Number(zone.slice(4, 6));
  if (zh > 23 || zm > 59) return undefined;
  const offset = zone === 'Z' ? 0 : (zone.startsWith('-') ? -1 : 1) * (zh * 60 + zm) * 60_000;
  const local = new Date(ms + offset);
  if (
    local.getUTCFullYear() !== Number(p[1]) ||
    local.getUTCMonth() + 1 !== Number(p[2]) ||
    local.getUTCDate() !== Number(p[3]) ||
    local.getUTCHours() !== Number(p[4]) ||
    local.getUTCMinutes() !== Number(p[5]) ||
    local.getUTCSeconds() !== Number(p[6]) ||
    local.getUTCMilliseconds() !== Number((p[7] ?? '0').padEnd(3, '0'))
  ) return undefined;
  return ms;
}

export type IndependentAnnualResearchPreview =
  | {
      state: 'research_math_preview_only';
      displayYear: number;
      effectiveYear: number;
      annualPillar: ReturnType<typeof annualSexagenaryPillar>;
      evidenceTier: 'E1_PROPOSED_NOT_GRANTED';
      productionAuthorized: false;
      mayGenerateAnnualInterpretation: false;
    }
  | {
      state: 'unavailable';
      reasonCode: 'ANNUAL_REQUEST_REQUIRED' | 'INVALID_REQUEST_TIME' | 'BOUNDARY_MINUTE_AMBIGUOUS' | 'INVALID_PACKET';
      productionAuthorized: false;
    };

/**
 * Math-only preview with synthetic packets permitted. NEVER source approval.
 * Live E1 lookup below has no user packet parameter and fails closed.
 */
export function previewIndependentAnnualE1Math(
  request: ReadingRequest,
  packet: Readonly<IndependentLichunE1Packet>,
): IndependentAnnualResearchPreview {
  const unavailable = (reasonCode: Extract<IndependentAnnualResearchPreview, { state: 'unavailable' }>['reasonCode']): IndependentAnnualResearchPreview =>
    ({ state: 'unavailable', reasonCode, productionAuthorized: false });
  if (request.intent.temporalScope !== 'annual' || request.targetPeriod?.scope !== 'annual') {
    return unavailable('ANNUAL_REQUEST_REQUIRED');
  }
  const year = request.targetPeriod.year;
  if (packet.year !== year || inspectIndependentLichunE1Packet(packet).state !== 'structurally_eligible_not_authorized') {
    return unavailable('INVALID_PACKET');
  }
  const requestMs = validatedInstant(request.targetPeriod.referenceDateTime);
  if (requestMs === undefined || seoulParts(requestMs).year !== year) return unavailable('INVALID_REQUEST_TIME');
  const boundaryMs = Date.parse(packet.displayedMinuteUtc);
  if (requestMs >= boundaryMs - 60_000 && requestMs < boundaryMs + 60_000) {
    return unavailable('BOUNDARY_MINUTE_AMBIGUOUS');
  }
  const effectiveYear = requestMs < boundaryMs ? year - 1 : year;
  return {
    state: 'research_math_preview_only',
    displayYear: year,
    effectiveYear,
    annualPillar: annualSexagenaryPillar(effectiveYear),
    evidenceTier: 'E1_PROPOSED_NOT_GRANTED',
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}

export type RegisteredIndependentAnnualResult =
  | {
      state: 'source_unavailable';
      requestId: string;
      reasonCode: Extract<ApprovedIndependentLichunBoundary, { state: 'unavailable' }>['reasonCode'];
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      requestId: string;
      reasonCode: 'ANNUAL_REQUEST_REQUIRED' | 'INVALID_REQUEST_TIME' | 'BOUNDARY_MINUTE_AMBIGUOUS';
      productionAuthorized: false;
    }
  | {
      state: 'research_candidate';
      requestId: string;
      effectiveYear: number;
      annualPillar: ReturnType<typeof annualSexagenaryPillar>;
      evidenceTier: 'E1_INDEPENDENT_ASTRONOMY';
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    };

/** The proposed future adapter: no caller-controlled evidence or verification input. */
export function resolveAnnualWithCodeApprovedIndependentE1(request: ReadingRequest): RegisteredIndependentAnnualResult {
  if (request.intent.temporalScope !== 'annual' || request.targetPeriod?.scope !== 'annual') {
    return { state: 'unavailable', requestId: request.requestId, reasonCode: 'ANNUAL_REQUEST_REQUIRED', productionAuthorized: false };
  }
  const approved = getCodeApprovedIndependentLichunBoundary(request.targetPeriod.year);
  if (approved.state === 'unavailable') {
    return { state: 'source_unavailable', requestId: request.requestId, reasonCode: approved.reasonCode, productionAuthorized: false };
  }
  const year = request.targetPeriod.year;
  const requestMs = validatedInstant(request.targetPeriod.referenceDateTime);
  if (requestMs === undefined || seoulParts(requestMs).year !== year) {
    return { state: 'unavailable', requestId: request.requestId, reasonCode: 'INVALID_REQUEST_TIME', productionAuthorized: false };
  }
  const boundaryMs = Date.parse(approved.displayedMinuteUtc);
  if (requestMs >= boundaryMs - 60_000 && requestMs < boundaryMs + 60_000) {
    return { state: 'unavailable', requestId: request.requestId, reasonCode: 'BOUNDARY_MINUTE_AMBIGUOUS', productionAuthorized: false };
  }
  const effectiveYear = requestMs < boundaryMs ? year - 1 : year;
  return {
    state: 'research_candidate',
    requestId: request.requestId,
    effectiveYear,
    annualPillar: annualSexagenaryPillar(effectiveYear),
    evidenceTier: 'E1_INDEPENDENT_ASTRONOMY',
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}


export type IndependentE1CycleResearchPreview =
  | {
      state: 'research_math_preview_only';
      displayYear: number;
      annualPillar: ReturnType<typeof annualSexagenaryPillar>;
      start: {
        displayedMinuteUtc: string;
        earliestPossibleUtc: string;
        latestPossibleExclusiveUtc: string;
      };
      end: {
        displayedMinuteUtc: string;
        earliestPossibleUtc: string;
        latestPossibleExclusiveUtc: string;
      };
      exactEffectiveIntervalEstablished: false;
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      displayYear: number;
      reasonCode: 'INVALID_TARGET_YEAR' | 'BOTH_E1_PACKETS_REQUIRED' | 'INVALID_E1_PACKETS';
      productionAuthorized: false;
    };

function conservativeMinuteWindow(anchorUtc: string): {
  displayedMinuteUtc: string;
  earliestPossibleUtc: string;
  latestPossibleExclusiveUtc: string;
} {
  const ms = Date.parse(anchorUtc);
  return {
    displayedMinuteUtc: anchorUtc,
    earliestPossibleUtc: new Date(ms - 60_000).toISOString(),
    latestPossibleExclusiveUtc: new Date(ms + 60_000).toISOString(),
  };
}

/** Synthetic E1 packets can test math, NEVER produce an approved annual reading. */
export function previewIndependentAnnualE1CycleMath(
  displayYear: number,
  start?: Readonly<IndependentLichunE1Packet>,
  end?: Readonly<IndependentLichunE1Packet>,
): IndependentE1CycleResearchPreview {
  const fail = (
    reasonCode: Extract<IndependentE1CycleResearchPreview, { state: 'unavailable' }>['reasonCode'],
  ): IndependentE1CycleResearchPreview =>
    ({ state: 'unavailable', displayYear, reasonCode, productionAuthorized: false });
  if (!Number.isSafeInteger(displayYear) || displayYear < 2 || displayYear > 9998) {
    return fail('INVALID_TARGET_YEAR');
  }
  if (start === undefined || end === undefined) return fail('BOTH_E1_PACKETS_REQUIRED');
  if (
    start.year !== displayYear ||
    end.year !== displayYear + 1 ||
    inspectIndependentLichunE1Packet(start).state !== 'structurally_eligible_not_authorized' ||
    inspectIndependentLichunE1Packet(end).state !== 'structurally_eligible_not_authorized'
  ) return fail('INVALID_E1_PACKETS');

  return {
    state: 'research_math_preview_only',
    displayYear,
    annualPillar: annualSexagenaryPillar(displayYear),
    start: conservativeMinuteWindow(start.displayedMinuteUtc),
    end: conservativeMinuteWindow(end.displayedMinuteUtc),
    exactEffectiveIntervalEstablished: false,
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}

export type RegisteredIndependentE1CycleResult =
  | {
      state: 'source_unavailable';
      displayYear: number;
      missingYear: number;
      reasonCode: Extract<ApprovedIndependentLichunBoundary, { state: 'unavailable' }>['reasonCode'];
      productionAuthorized: false;
    }
  | {
      state: 'unavailable';
      displayYear: number;
      reasonCode: 'INVALID_TARGET_YEAR';
      productionAuthorized: false;
    }
  | {
      state: 'research_candidate';
      displayYear: number;
      annualPillar: ReturnType<typeof annualSexagenaryPillar>;
      start: ReturnType<typeof conservativeMinuteWindow>;
      end: ReturnType<typeof conservativeMinuteWindow>;
      exactEffectiveIntervalEstablished: false;
      mayGenerateAnnualInterpretation: false;
      productionAuthorized: false;
    };

/** No user- or LLM-injected witness records; requires two code-approved E1 years. */
export function resolveAnnualCycleWithCodeApprovedIndependentE1(
  displayYear: number,
): RegisteredIndependentE1CycleResult {
  if (!Number.isSafeInteger(displayYear) || displayYear < 2 || displayYear > 9998) {
    return { state: 'unavailable', displayYear, reasonCode: 'INVALID_TARGET_YEAR', productionAuthorized: false };
  }
  const start = getCodeApprovedIndependentLichunBoundary(displayYear);
  if (start.state === 'unavailable') {
    return { state: 'source_unavailable', displayYear, missingYear: displayYear, reasonCode: start.reasonCode, productionAuthorized: false };
  }
  const end = getCodeApprovedIndependentLichunBoundary(displayYear + 1);
  if (end.state === 'unavailable') {
    return { state: 'source_unavailable', displayYear, missingYear: displayYear + 1, reasonCode: end.reasonCode, productionAuthorized: false };
  }
  return {
    state: 'research_candidate',
    displayYear,
    annualPillar: annualSexagenaryPillar(displayYear),
    start: conservativeMinuteWindow(start.displayedMinuteUtc),
    end: conservativeMinuteWindow(end.displayedMinuteUtc),
    exactEffectiveIntervalEstablished: false,
    mayGenerateAnnualInterpretation: false,
    productionAuthorized: false,
  };
}
