# TOPIC-FACE-004A — Live FR293 Receipt Integration Closure

> Watchtower-Track: topic-face  
> Product issue: #1653  
> Face authority prerequisite: #1639 / PR #1649 / merge `bc943a61bcc67ba51945e26c0e97e5015791e4f5`  
> Depends on: TOPIC-FACE-003, TOPIC-FACE-004

## 1. Purpose

TOPIC-FACE-004 froze the Reader boundary but still used Product-side display fixtures because Face Engine had no public governed value-to-observationRef receipt.

Face Engine #1639 closed that authority gap.

TOPIC-FACE-004A connects the two already-governed boundaries without moving semantic authority into Product:

    FaceTopicExecutionPlan
    -> Face Engine Product display-fact receipt
    -> neutral execution-result receipt
    -> TOPIC-FACE-003 result admission
    -> Product projection / Face grounding
    -> Topic-filtered display-fact receipt
    -> TOPIC-FACE-004 display admission
    -> FaceReaderDeliveryV1

## 2. Integration surface

`buildFaceLiveReaderPipeline()` is the composition entry point.

It accepts:

1. a server-authorized `FaceTopicExecutionPlan`;
2. the serialized governed Face Engine Product display-fact receipt.

The adapter consumes the public receipt structurally. It does not import FR293 extractor implementations or private canonical morphology modules into `src/face-topic/**`.

The accepted authority identity is frozen to:

    schemaVersion =
      face-product-display-fact-receipt-v1

    authorityRef =
      face-engine.fr293.product-display-facts@1

    sourceContractVersion =
      FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1

    authorityState =
      product_facing_complete_fr282_schema_no_traditional_semantics

Authority/version drift fails closed.

## 3. Observation binding

The authorized execution plan and Face Engine receipt must carry the same `observationArtifactRef`.

Every Face Engine fact must also retain the public receipt observation-ref binding:

    face-neutral-observation:v1
      :<opaque observationArtifactRef>
      :<featureKey>

The engine-issued `observationRef` is the single join key through:

    execution observation
    -> admitted result
    -> Product projection
    -> Face grounding
    -> display fact
    -> Reader item

Product does not substitute a second observation identity.

## 4. Topic filtering

The Face Engine receipt is a 29-column FR282/FR293 authority superset.

TOPIC-FACE-004A does not forward that superset to Reader.

For each authorized Topic, the adapter selects only:

- required observation capabilities;
- optional observation capabilities that are not explicitly unavailable in the execution plan.

For `face.discover.structure`, the current positive path is exactly:

- `eye.width_height_ratio`;
- `mouth.width_and_relative_size`;
- `chin_lower_face.visible_width_ratio`;
- `nose.alar_width_and_nostril_geometry`.

The 29-column receipt therefore becomes four protected execution observations and four admitted Reader display facts.

## 5. Required and unavailable behavior

A required Topic capability must:

- exist in the Face Engine receipt;
- be `available`;
- carry the expected engine-issued observation ref.

Missing or unavailable required facts fail closed. Product does not invent a fallback.

For `face.discover.extended`, `forehead.visible_width_shape` remains an authority hard gap. The execution plan marks it unavailable, the Face Engine receipt may not contradict that state, and Reader preserves an explicit unavailable forehead section.

## 6. Display values

The current Reader path admits only the value shapes already frozen by TOPIC-FACE-004:

- scalar;
- continuous axes;
- composite visible nasal geometry.

The adapter does not classify those values and does not derive threshold labels.

Other Face Engine display shapes remain outside this Reader profile until a Product contract explicitly admits them.

## 7. Privacy and semantic boundary

The adapter rejects scope widening involving:

- raw image/photo/JPEG payloads;
- raw landmarks or provider landmark indices;
- MediaPipe payloads;
- pose matrices;
- face embeddings or identity templates;
- canonical asset digests;
- Character identity or relationship state;
- price, offer, entitlement or payment;
- extra semantic-claim fields.

The Face Engine receipt must preserve:

    neutralObservationOnly = true
    traditionalInterpretationIncluded = false
    traditionalBindingIssued = false
    classifierIssued = false
    thresholdIssued = false
    commerceActivated = false

TOPIC-FACE-004A does not create traditional Face claims.

## 8. Hash and provenance chain

The integration preserves the existing semantic identities rather than replacing them:

    executionPlanHash
    -> sourceResultHash
    -> projectionHash
    -> groundingHash
    -> displayFactsHash
    -> readerDeliveryHash

The display receipt is rebound to the admitted `sourceResultHash`, and Reader remains bound to the Product projection.

Face Engine authority ref, FR293 source-contract version, governed source metric refs and safe evidence refs are retained as provenance.

## 9. Current runtime behavior

### face.discover.structure

    readiness = available
    governed Face Engine values = admitted
    selected observations = 4
    Reader sections = eye / nose / mouth / chin_lower_face
    traditional claims = 0

This is the first positive Product path where actual governed FR293 display values can traverse the full Product Reader contract.

### face.discover.extended

    readiness = partial
    required structure observations = admitted
    forehead.visible_width_shape = unavailable
    Reader forehead section = unavailable

### face.reading.three_divisions

    readiness = blocked

The blocked plan is rejected before a Face Engine display receipt can reach Product result admission. TOPIC-FACE-004A does not alter #1521 / FRB005 authority.

## 10. Ownership

`packages/face-reading/**` is unchanged in this slice.

Face Engine remains the neutral observation/value authority.  
topic-face remains the Product authorization, projection, admission and Reader-delivery owner.  
Character and Commerce remain downstream and cannot alter semantic readiness or Face authority.

TOPIC-FACE-005 remains reserved for Character Handoff / Conversation.
