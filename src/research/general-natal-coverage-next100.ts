export const R100_COVERAGE_MAP_VERSION = '0.1.0-research' as const;

export const R100_CURRENT_COVERAGE = Object.freeze({
  masterIssue:'#908',
  snapshotMain:'ace73f25eee0576e22c6c8dbdd0490ed29f0f7b3',
  trackedCount:100,
  mergedOrVerifiedCount:32,
  openOrBlockedCount:68,
});

export const R100_FRONTIER_GROUPS = Object.freeze([
  {
    "range": "R101–R110",
    "name": "Textual provenance / philology"
  },
  {
    "range": "R111–R120",
    "name": "Strength / root primitives"
  },
  {
    "range": "R121–R130",
    "name": "Gyeokguk / Yong-Xi-Ji"
  },
  {
    "range": "R131–R140",
    "name": "Stem-branch interactions"
  },
  {
    "range": "R141–R150",
    "name": "Ten-God / domain semantics"
  },
  {
    "range": "R151–R160",
    "name": "Temporal dynamics"
  },
  {
    "range": "R161–R170",
    "name": "Calculation / calendar authority"
  },
  {
    "range": "R171–R180",
    "name": "Validation / adversarial review"
  },
  {
    "range": "R181–R190",
    "name": "Evidence infrastructure / governance"
  },
  {
    "range": "R191–R200",
    "name": "Composition / explanation / reproducibility"
  }
] as const);

export const R100_NEXT_100_FRONTIERS = Object.freeze([
  {
    "id": "R101",
    "title": "Frozen Wikisource/Yuanhai witness attribution audit"
  },
  {
    "id": "R102",
    "title": "Yuanhai edition-family stemma completion"
  },
  {
    "id": "R103",
    "title": "Sanming Tonghui edition/witness collation"
  },
  {
    "id": "R104",
    "title": "Ditian Sui commentary-lineage separation"
  },
  {
    "id": "R105",
    "title": "Ziping Zhenquan base-text vs commentary layer map"
  },
  {
    "id": "R106",
    "title": "Shenfeng Tongkao edition-family witness map"
  },
  {
    "id": "R107",
    "title": "Qiongtong Baojian provenance and edition map"
  },
  {
    "id": "R108",
    "title": "Ditian Sui original-text vs Chanwei proposition separation"
  },
  {
    "id": "R109",
    "title": "Cross-edition variant-phrase collation for governed passages"
  },
  {
    "id": "R110",
    "title": "Immutable citation/archive strategy for volatile web witnesses"
  },
  {
    "id": "R111",
    "title": "Cross-source 得令 definition corpus"
  },
  {
    "id": "R112",
    "title": "Cross-source 得地 definition corpus"
  },
  {
    "id": "R113",
    "title": "Cross-source 得勢 definition corpus"
  },
  {
    "id": "R114",
    "title": "Main/middle/residual hidden-stem root-depth evidence"
  },
  {
    "id": "R115",
    "title": "Month-root vs non-month-root priority counterexamples"
  },
  {
    "id": "R116",
    "title": "Repeated-root accumulation claims and limits"
  },
  {
    "id": "R117",
    "title": "Visible peer support vs rooted support separation"
  },
  {
    "id": "R118",
    "title": "Resource support vs rooted support separation"
  },
  {
    "id": "R119",
    "title": "Control/drain interactions in strength judgments"
  },
  {
    "id": "R120",
    "title": "Expanded borderline strength case corpus"
  },
  {
    "id": "R121",
    "title": "Eight-pattern establishment predicate matrix"
  },
  {
    "id": "R122",
    "title": "Mixed-qi month-branch candidate selection"
  },
  {
    "id": "R123",
    "title": "Transparency-slot effects on pattern candidates"
  },
  {
    "id": "R124",
    "title": "Branch-meeting substitution in pattern selection"
  },
  {
    "id": "R125",
    "title": "Rescue precedence in pattern success/failure"
  },
  {
    "id": "R126",
    "title": "Position-appropriateness primitives in pattern rescue"
  },
  {
    "id": "R127",
    "title": "Ordinary-pattern vs special-pattern entry/exit matrix"
  },
  {
    "id": "R128",
    "title": "Xi/Yong/Ji dynamic-role case expansion"
  },
  {
    "id": "R129",
    "title": "Tiaohou and Gyeokguk coexistence/conflict cases"
  },
  {
    "id": "R130",
    "title": "Tongguan/Bingyao/Fuyi conflict-resolution corpus"
  },
  {
    "id": "R131",
    "title": "Heavenly-stem combination transformation conditions"
  },
  {
    "id": "R132",
    "title": "Competing heavenly-stem combination cases"
  },
  {
    "id": "R133",
    "title": "Branch combination-vs-clash positional cases"
  },
  {
    "id": "R134",
    "title": "Sanhe partial-combination cross-source comparison"
  },
  {
    "id": "R135",
    "title": "Sanhui partial-meeting cross-source comparison"
  },
  {
    "id": "R136",
    "title": "Punishment directionality and repetition cases"
  },
  {
    "id": "R137",
    "title": "Harm mechanism and contextual consequence corpus"
  },
  {
    "id": "R138",
    "title": "Break mechanism and contextual consequence corpus"
  },
  {
    "id": "R139",
    "title": "Hidden-stem behavior under combination/clash events"
  },
  {
    "id": "R140",
    "title": "Multi-relation branch settlement graph corpus"
  },
  {
    "id": "R141",
    "title": "Historical Ten-God category semantic corpus"
  },
  {
    "id": "R142",
    "title": "Ten-God-to-modern-domain projection limits"
  },
  {
    "id": "R143",
    "title": "Kinship-star gender convention comparison"
  },
  {
    "id": "R144",
    "title": "Official-status claims vs modern-career projection"
  },
  {
    "id": "R145",
    "title": "Wealth claims vs modern-finance projection"
  },
  {
    "id": "R146",
    "title": "Output claims vs creativity/productivity projection"
  },
  {
    "id": "R147",
    "title": "Resource claims vs education/support projection"
  },
  {
    "id": "R148",
    "title": "Peer claims vs social/competition projection"
  },
  {
    "id": "R149",
    "title": "Relationship-domain claim source expansion"
  },
  {
    "id": "R150",
    "title": "Family/children/parents claim source expansion"
  },
  {
    "id": "R151",
    "title": "Dayun start-age convention comparison"
  },
  {
    "id": "R152",
    "title": "Dayun direction convention comparison"
  },
  {
    "id": "R153",
    "title": "Ten-year upper/lower five-year interpretation variants"
  },
  {
    "id": "R154",
    "title": "Annual-vs-Dayun precedence case corpus"
  },
  {
    "id": "R155",
    "title": "Monthly temporal boundary conventions"
  },
  {
    "id": "R156",
    "title": "Daily/hourly lower-temporal-layer evidence boundary"
  },
  {
    "id": "R157",
    "title": "Fuyin/Fanyin source and case corpus"
  },
  {
    "id": "R158",
    "title": "Natal latent-activation temporal corpus expansion"
  },
  {
    "id": "R159",
    "title": "Temporal Gyeokguk change/recovery corpus expansion"
  },
  {
    "id": "R160",
    "title": "Temporal counterexample and failed-prediction corpus"
  },
  {
    "id": "R161",
    "title": "Li-Chun year-boundary calculation audit"
  },
  {
    "id": "R162",
    "title": "Solar-term month-boundary calculation audit"
  },
  {
    "id": "R163",
    "title": "Midnight/Zi-hour day-boundary convention audit"
  },
  {
    "id": "R164",
    "title": "Longitude correction convention audit"
  },
  {
    "id": "R165",
    "title": "Equation-of-time/apparent-solar-time convention audit"
  },
  {
    "id": "R166",
    "title": "Historical timezone-data authority audit"
  },
  {
    "id": "R167",
    "title": "Lunar/solar conversion cross-engine audit"
  },
  {
    "id": "R168",
    "title": "Leap-month handling cross-engine audit"
  },
  {
    "id": "R169",
    "title": "Unknown/approximate birth-time calculation contract"
  },
  {
    "id": "R170",
    "title": "Calculation golden-vector corpus with pinned engines"
  },
  {
    "id": "R171",
    "title": "Classical worked-example corpus expansion"
  },
  {
    "id": "R172",
    "title": "Historical example normalization and replay"
  },
  {
    "id": "R173",
    "title": "False-positive interpretation taxonomy expansion"
  },
  {
    "id": "R174",
    "title": "False-negative interpretation taxonomy expansion"
  },
  {
    "id": "R175",
    "title": "Adversarial near-identical chart-pair expansion"
  },
  {
    "id": "R176",
    "title": "Birth-time perturbation empirical replay"
  },
  {
    "id": "R177",
    "title": "Timezone/solar-time perturbation empirical replay"
  },
  {
    "id": "R178",
    "title": "Cross-engine disagreement replay with matched policies"
  },
  {
    "id": "R179",
    "title": "Expert blind-review pilot execution"
  },
  {
    "id": "R180",
    "title": "Inter-reviewer disagreement taxonomy"
  },
  {
    "id": "R181",
    "title": "Work/edition/witness registry population"
  },
  {
    "id": "R182",
    "title": "Passage-level checksum/witness binding rollout"
  },
  {
    "id": "R183",
    "title": "Claim-level provenance graph population"
  },
  {
    "id": "R184",
    "title": "Counterexample registry population"
  },
  {
    "id": "R185",
    "title": "School/lineage tag population"
  },
  {
    "id": "R186",
    "title": "Evidence-state transition event registry"
  },
  {
    "id": "R187",
    "title": "Scan-page manifest pilot on archival PDFs"
  },
  {
    "id": "R188",
    "title": "Rights/reuse metadata audit for source corpus"
  },
  {
    "id": "R189",
    "title": "Research-to-governed checklist pilot"
  },
  {
    "id": "R190",
    "title": "Production-isolation regression implementation"
  },
  {
    "id": "R191",
    "title": "Methodology composition-policy inventory"
  },
  {
    "id": "R192",
    "title": "Cross-school composition-policy experiments"
  },
  {
    "id": "R193",
    "title": "Ambiguity propagation end-to-end audit"
  },
  {
    "id": "R194",
    "title": "Unknown-state UI/narrative boundary research"
  },
  {
    "id": "R195",
    "title": "Modern-domain semantic-bridge evidence corpus"
  },
  {
    "id": "R196",
    "title": "Personalization claim scope vs source scope audit"
  },
  {
    "id": "R197",
    "title": "Explanation trace from source proposition to output"
  },
  {
    "id": "R198",
    "title": "Contradictory-evidence presentation protocol"
  },
  {
    "id": "R199",
    "title": "Research snapshot reproducibility bundle"
  },
  {
    "id": "R200",
    "title": "Second-century frontier reprioritization from evidence gaps"
  }
] as const);

export const R100_AUTHORITY = Object.freeze({
  status:'COVERAGE_MAP_AND_CANDIDATE_FRONTIERS_PUBLISHED' as const,
  candidateFrontierCount:100,
  frontierAppearanceImpliesCompletion:false,
  frontierAppearanceImpliesImplementationAuthorization:false,
  numericConfidenceModelIntroduced:false,
  productionAuthorityPromoted:false,
});
