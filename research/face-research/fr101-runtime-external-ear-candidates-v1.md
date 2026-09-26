# FR101 — Runtime External-Ear Extraction Candidate Selection

> Track: `face-observation-engine`  
> Issue: #1698  
> Upstream: FR100 / PR #1696  
> Result: candidates pinned / empirical real-capture gate ready / no runtime provider admitted

## 1. Current problem

FR100 solved the reference-target problem:

```text
what counts as the neutral external-ear reference surface?
→ pinned GNM bilateral ear surfaces
```

It did not solve:

```text
where is the visible external ear in a user's actual image?
```

FR101 narrows that runtime problem to concrete model candidates.

## 2. Primary candidate — Florence-2

Pinned candidate:

```text
microsoft/Florence-2-base
revision = 5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac
declared license = MIT
```

The processor exposes referring-expression segmentation and returns polygon masks.

The first experiment uses separate prompts:

```text
left external ear
right external ear
```

The model is not trusted to define anatomical laterality by itself. Requested-side and camera-mirror provenance remain separate metadata.

## 3. Fallback — Grounding DINO + SAM2

Pinned research fallback:

```text
IDEA-Research/grounding-dino-base
revision = 12bdfa3120f3e7ec7b434d90674b3396eccf88eb
declared license = Apache-2.0

facebook/sam2.1-hiera-small
revision = e07df6aa19f5c6545121551bf89957b7663ee715
declared license = Apache-2.0
```

Grounding DINO's ECCV paper explicitly illustrates `ear` among human-input novel categories.

That is useful feasibility evidence for open-vocabulary ear grounding.

SAM2 can refine a grounded box into a mask.

Neither fact establishes project-specific external-ear accuracy.

## 4. Why CelebAMask-HQ is not the product path

CelebAMask-HQ is a strong research comparator because its official parsing labels explicitly include:

```text
l_ear
r_ear
```

But its official agreement restricts the dataset to non-commercial research, and the repository also restricts the software to non-commercial research/education.

Therefore:

```text
technical comparator = YES
product dependency = NO
production training source = NO
```

unless separate rights are obtained later.

## 5. GNM fitting remains a reference route

GNM remains the neutral reference surface.

The current official public release does not give this project a ready, validated MediaPipe→GNM subject-photo ear observation path.

Third-party GNM fitting demos show feasibility, but are not promoted into authority.

## 6. Empirical protocol

Required capture cases:

1. frontal, both ears visible where possible;
2. mild three-quarter, near ear;
3. mild three-quarter, far ear;
4. stronger three-quarter, single visible ear;
5. partial hair occlusion;
6. glasses or ear accessory if available;
7. ear near image crop;
8. truncated/absent ear.

For every side/capture, review:

- visible pinna coverage;
- cheek/hair/background leakage;
- absent-ear hallucination;
- mirror/laterality handling;
- crop/truncation behavior.

## 7. No accuracy threshold yet

FR101 does not invent IoU, Dice, confidence, or coverage thresholds.

Those require actual empirical distributions.

The first empirical bundle is for **measurement and failure-mode discovery**, not automatic pass/fail promotion.

## 8. Operator handoff is now ready

The candidate definitions and capture cases are specific enough to request representative real images from the operator.

The operator is not being asked to label 採聽官 or any traditional construct.

Only raw capture cases are required.

## 9. Authority

```text
candidate models pinned = YES
empirical protocol pinned = YES
operator capture request ready = YES

runtime ear provider admitted = 0
neutral ear observation admitted = 0

ear mask -> 採聽官 = NO
ear mask -> 命門 = NO
2D mask -> 貼肉/敦厚 = NO
RGB -> 色明 = NO

Production = NO
```

## 10. Next

Run the first real-capture empirical bundle.

Only after that evidence exists may a later phase define:
- availability rules;
- confidence/quality metrics;
- geometry extraction from accepted masks;
- or a neutral runtime ear observation contract.
