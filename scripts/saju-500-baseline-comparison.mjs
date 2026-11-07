/**
 * Original fixed 500-birth, eight-menu measurements from real successful GitHub
 * Actions run 40122318503 (source SHA 313635fcf8fdf0029eba9d463b22884b79d4007a).
 * The baseline and current audit use identical deterministic sampleBirth code,
 * 0x5a1a2026 seed, 2026-10-25 reference and 8-menu contract.
 * Do not equate text changes, profile counts or structural Dayun dates with
 * new authorized predictive meaning. Research output only.
 */
export const FIXED_500_BASELINE = {
  "runId": 40122318503,
  "headSha": "313635fcf8fdf0029eba9d463b22884b79d4007a",
  "referenceDateTime": "2026-10-25T00:00:00.000Z",
  "seed": "0x5a1a2026",
  "spec": "500 deterministic pseudorandom real solar birth dates, times and minutes; 8 menu engines; fixed 2026-10 year/month; no partner/family/question",
  "count": 500,
  "menuResults": {
    "전체 사주": {
      "readable": 478,
      "missing": 22,
      "exact": 459,
      "profiles": 83,
      "states": {
        "complete": 121,
        "insufficient": 22,
        "partial": 357
      }
    },
    "직업·커리어": {
      "readable": 478,
      "missing": 22,
      "exact": 459,
      "profiles": 70,
      "states": {
        "complete": 114,
        "insufficient": 22,
        "partial": 364
      }
    },
    "재물": {
      "readable": 389,
      "missing": 111,
      "exact": 367,
      "profiles": 77,
      "states": {
        "complete": 96,
        "insufficient": 111,
        "partial": 293
      }
    },
    "연애·관계": {
      "readable": 496,
      "missing": 4,
      "exact": 493,
      "profiles": 152,
      "states": {
        "complete": 162,
        "insufficient": 4,
        "partial": 334
      }
    },
    "사업": {
      "readable": 494,
      "missing": 6,
      "exact": 492,
      "profiles": 198,
      "states": {
        "complete": 257,
        "insufficient": 6,
        "partial": 237
      }
    },
    "올해": {
      "readable": 500,
      "missing": 0,
      "exact": 56,
      "profiles": 56,
      "states": {
        "in_target_civil_year": 500
      }
    },
    "이번 달": {
      "readable": 500,
      "missing": 0,
      "exact": 131,
      "profiles": 131,
      "states": {
        "in_period": 500
      }
    },
    "삶의 단계": {
      "readable": 500,
      "missing": 0,
      "exact": 500,
      "profiles": 1,
      "states": {
        "source_authority_not_established": 500
      }
    }
  }
};

/**
 * Compare only the identical fixed population and the original report fields.
 * Original runs did NOT include newer per-case T9/T5 tracing: no invented delta.
 */
export function compareFixedSaju500Baseline(current) {
  const baseline = FIXED_500_BASELINE;
  if (current?.seed !== baseline.seed || current.count !== baseline.count ||
      current.spec !== baseline.spec ||
      current.uniqueBirthDateTimes !== baseline.count ||
      current.attempted !== baseline.count || current.failedCases !== 0 ||
      current.uniqueCalculationHashes !== baseline.count) {
    throw new TypeError('Before/after requires identical verified 500-case sample');
  }
  const names = Object.keys(baseline.menuResults);
  if (!current.menuResults || Object.keys(current.menuResults).length !== names.length ||
      names.some(name => current.menuResults[name] === undefined)) {
    throw new TypeError('Before/after requires the same eight menu names');
  }
  const metric = (before, after) => ({before, after, change:after-before});
  const menus = {};
  for(const name of names) {
    const before = baseline.menuResults[name], after = current.menuResults[name];
    const states = after.reportStates;
    if (after.generated !== baseline.count ||
        !Number.isInteger(after.withReadableText) ||
        !Number.isInteger(after.withoutReadableText) ||
        after.withReadableText < 0 || after.withoutReadableText < 0 ||
        after.withReadableText + after.withoutReadableText !== baseline.count ||
        !Number.isInteger(after.exactText?.unique) ||
        after.exactText.unique < 0 || after.exactText.unique > after.withReadableText ||
        !Number.isInteger(after.meaningProfile?.unique) ||
        after.meaningProfile.unique < 0 ||
        after.meaningProfile.unique > after.withReadableText ||
        !states || Object.values(states).some(x => !Number.isInteger(x) || x < 0) ||
        Object.values(states).reduce((a,b)=>a+b,0)!==baseline.count) {
      throw new TypeError('Incomplete or contradictory menu comparison: '+name);
    }
    menus[name] = {
      selectedReadingTextCases:metric(before.readable,after.withReadableText),
      withoutSelectedReadingTextCases:metric(before.missing,after.withoutReadableText),
      distinctExactKoreanTexts:metric(before.exact,after.exactText.unique),
      legacyDisplayMeaningProfileCount:metric(before.profiles,after.meaningProfile.unique),
      researchReportStates:{before:before.states,after:{...states}},
      ...(name==='삶의 단계'?{interpretationAuthority:'calculation_only_not_life_stage_fortune'}:{})
    };
  }
  return {
    version:'fixed-500-before-after-research-v1',
    baseline:{runId:baseline.runId,headSha:baseline.headSha,
      referenceDateTime:baseline.referenceDateTime,seed:baseline.seed,count:baseline.count},
    sampleComparability:'verified_identical_seed_generator_calendar_reference_and_eight_menu_set',
    menus,
    limitations:[
      'Five natal-menu readable counters measure source-bound T8 research sections, not T5-only partial explanations or final product quality.',
      'Exact Korean text variants and legacy display profile counts do not establish distinct executed interpretation meanings.',
      'Life-stage unique text is a calculated interval, not an authorized forecast.',
      'Research complete/partial/insufficient does not authorize Official, publication or sale.',
      'The initial audit lacks newer case-by-case selected T9/T5 tracing; no historic differences are inferred for those metrics.'
    ],
    permissions:{mayPublish:false,maySell:false,mayCallOfficial:false}
  };
}
