# I186 — Li 1998 Remaining Direct / Primary Witness Acquisition Evidence

## Status

```text
STRICT SUCCESS / CLOSED
```

## Purpose

I186 executes the five direct/primary acquisition paths frozen prospectively by I185. The gate records acquired observations separately from qualifying identity evidence and fails closed on every unresolved function.

The gate does not infer negative evidence from failed acquisition, perform rebinding, adjudicate provenance independence, mutate or reevaluate the candidate set, create a threshold, classify, score numerically, or authorize production interpretation.

## Repository artifacts

```text
source:
src/research/i186-li-1998-remaining-direct-primary-witness-acquisition-evidence.ts

test:
test/i186-li-1998-remaining-direct-primary-witness-acquisition-evidence.test.ts
```

## Executed paths

```text
1. DIRECT_TARGET_TITLE_COPYRIGHT_REGISTRY_CERTIFICATE_OR_REGISTRATION_NUMBER
2. DIRECT_1998_PRIMARY_COLOPHON_IMPRINT_OR_DISTRIBUTION_RECORD
3. DIRECT_FULL_314_OR_413_WITNESS_ACQUISITION
4. DIRECT_FULL_202_OR_422_REFERENCE_WITNESS_FOR_STRUCTURAL_COMPARISON
5. STABLE_FILE_HASH_OR_TRANSFORMATION_PROVENANCE_FOR_COMPARABLE_VARIANTS
```

All five paths were executed under the I185 minimum qualifying payload.

## Evidence outcome

### 1. Target-title copyright registry path

Observed:

- National Copyright Administration material identifies China Copyright Protection Center as a works-registration handling institution.
- Government material documents national works-registration information query infrastructure.
- The author chronology reports 2018 work-registration certificates covering works written since 1997, including the target work family.

Not acquired:

- direct target-title registry record;
- target-title registration number;
- target-title certificate identity.

The author-hosted registration narrative is not promoted into direct registry evidence.

### 2. 1998 publication binding path

Observed:

- author chronology reconfirms the target 普及班 work formally appeared in 1998;
- the same chronology entry separately reports creation of the author’s consulting company;
- a later formal 2002 edition is observed with ISBN `9789627943679`, 422 pages and later-edition structural metadata.

Not acquired:

- 1998 colophon or imprint;
- 1998 publisher / issuer / distributor binding;
- 1998 ISBN;
- explicit reproducible 1998 nonformal distribution status.

Company chronology co-location and the later 2002 edition cannot backfill 1998 publication identity.

### 3. 314 / 413 direct witness path

Observed through listing surfaces:

- 314-page target representation;
- 413-page target representation;
- reported 413-page file size `47.44 MB`;
- another target listing at `47.37 MB`.

The r1689 field `上传者: 非正式出版` remains ambiguous uploader/catalog metadata and does not establish 1998 publication status.

No direct full 314- or 413-page witness was acquired for the frozen structural comparison dimensions.

### 4. 202 / 422 reference witness path

Observed:

- later 422-page formal-edition metadata and table-of-contents structure.

Not acquired:

- direct full 202-page reference witness;
- direct full 422-page comparison witness;
- direct full comparable 202/314/413/422 witness set.

### 5. Stable identity / transformation provenance path

Observed target-file listing sizes include:

```text
47.44 MB
47.37 MB
15.48 MB
```

Not acquired:

- cryptographic file hash;
- stable content identity;
- scan lineage;
- documented transformation provenance.

File-size and filename variance do not establish distinct edition identity, derivative relation, or canonical witness status.

## Source locators

```text
https://www.ncac.gov.cn/xxfb/bqshfw/bqdj/djjg/202410/t20241018_870052.html
https://www.gov.cn/gzdt/2012-02/03/content_2057695.htm
https://www.sxw.cc/sjw/zj/
https://www.xinyi.hk/goods-1387.html?from=rss
https://www.guoxueziyuan.com/3415.html
https://r1689.com/m/view.php?aid=349
https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34
https://www.scribd.com/document/799078960/6865%E5%86%8C%E6%98%93%E5%AD%A6%E4%B9%A6%E7%B1%8D
```

## Decision

```text
REMAINING_DIRECT_PRIMARY_WITNESS_ACQUISITION_EXECUTED_FIVE_PATHS_ZERO_QUALIFYING_1998_PUBLICATION_BINDINGS_ZERO_DIRECT_COMPARABLE_WITNESSES_ZERO_STABLE_FILE_IDENTITIES_TWO_GAPS_REMAIN_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE
```

## Verification

Exact implementation/test HEAD:

```text
e5bc4b74a9c69c1a2526b1edf4dcb09be5193485
```

CI:

```text
run #1178 = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS

Test Files = 244 passed
Tests      = 1598 passed
I186       = 8 / 8 passed
```

## Preserved unresolved functions

```text
qualifyingAcquisitionCount                    = 0
directTargetRegistryRecordAcquiredCount      = 0
direct1998PublisherIssuerDistributorBindingCount = 0
explicit1998NonformalDistributionBindingCount = 0
directComparableFullWitnessSetAcquired       = false
stableFileIdentityOrHashAcquiredCount         = 0
transformationProvenanceAcquiredCount         = 0
completeVariantNormalizationCount             = 0
publicationMediumOrEntityGapResolved          = false
canonicalDigitalWitnessNormalizationGapResolved = false
targetedDiscoveryExhaustionEstablished        = false
corpusExhaustionEstablished                   = false
explicitNegativeFindingCount                  = 0
```

## Preserved authority ceiling

```text
evidenceRebindingMethodologicallyReady        = false
evidenceRebindingAuthorizedByThisGate         = false
independentNormativeProvenanceEstablishedCount = 0
candidateSetReevaluationAuthorizedByThisGate  = false
candidateSetAdmissibilityEstablishedByThisGate = false
actualCompositionPerformedByThisGate          = false
multiSourceCompositionAuthorized              = false
visibleStemBinaryEffectiveInteractionEligibilityResolved = false
thresholdRuleCreatedByThisGate                = false
classificationAuthorized                      = false
numericScoringAuthorized                      = false
productionPolicyExecutionAuthorized           = false
```

The hidden-stem authority gap remains exactly:

```text
SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Next gate

```text
I187 — Li 1998 Remaining Direct / Primary Witness Acquisition Evidence Adequacy & Remediation Path Reassessment Review
```

I187 must decide whether the zero-qualifying-gain I186 result warrants another same-target acquisition cycle or a non-mutating pivot to another frozen remediation path. It must not claim corpus exhaustion, relax I132 provenance requirements, or infer nonexistence from non-acquisition.
