# FR206 — Product-grade observable morphology measurement boundary

Issue: #1007

## Decision

MyeongHa Face Reading measures the **declared visible facial construct** unless the product explicitly claims a specific anatomical structure.

```text
proper / accurate measurement
=
repeatable measurement of the named visible construct
under governed capture / quality conditions
+
no semantic overclaim beyond what was measured
```

This is deliberately different from:

```text
every visible feature
→ prove correspondence to a physical bone landmark
→ obtain 3D scan ground truth
→ calibrate to anatomy
→ hold out again
```

That escalation is required only when the output itself makes an anatomical claim.

## Observable morphology lane

Default product lane:

- visible face breadth;
- visible mid-face width;
- cheek contour prominence;
- eye width/height ratio;
- canthal tilt;
- inter-eye spacing ratio;
- bilateral eye-shape asymmetry;
- mouth width / face width;
- jaw/chin contour relationships.

The validation target is the declared image-visible construct and its behavior under the supported capture contract.

Typical validation concerns:

- pose normalization;
- capture quality;
- repeatability;
- provider/version stability;
- classifier/segmentation accuracy when an image model is required;
- generalization to representative images.

Anatomical CT/scan correspondence is not automatically required.

## Anatomical lane

Only explicit claims such as these enter the anatomical lane:

- `zygion`;
- true skeletal bizygomatic breadth;
- a statement that a provider vertex is a named bone/anatomical landmark.

These claims require independent anatomical correspondence evidence.

Failure to prove an anatomical claim must not block a differently named observable construct.

## Cheek / mid-face correction

FR194-FR205 remain useful as boundary evidence, but they do not define the default product lane.

Product rule:

```text
MediaPipe 234/454 != admitted zygion
raw face-oval width != skeletal bizygomatic breadth
FR204 factor 0.8185802384926992 != generic face-breadth calibration
```

Allowed operational direction:

```text
raw full face-oval width
→ candidate for visible_face_breadth
```

Additional zygion/3D-scan validation is **not a blocking prerequisite** for that separately named operational construct.

If more product validation is needed, validate the operational construct itself: capture robustness, construct consistency, and generalization.

## Eye measurement boundary

Landmark geometry may support:

- eye width/height ratio;
- canthal tilt;
- inter-eye spacing ratio;
- bilateral shape asymmetry.

Attributes that landmarks do not encode reliably, including eyelid-crease categories or hooded-eyelid categories, require a dedicated image classifier/segmentation model or return `unavailable`.

Do not infer them from unrelated geometry simply to fill an output field.

## Traditional interpretation boundary

Pipeline:

```text
photo
→ neutral observable morphology
→ source/methodology mapping
→ traditional interpretation
```

The following equivalences are forbidden by default:

```text
physical observation == traditional region
traditional morphology term == modern anatomical landmark
measurement accuracy == scientific predictive validity of physiognomy
```

Face Reading may implement a documented traditional interpretation without claiming that the interpretation is scientifically predictive of personality, wealth, health, or future events.

## Next frontier

Do not open another body-part anatomy campaign by default.

Next:

```text
inventory whole-face traditional observable terms
→ for each term, identify the minimum sufficient measurement method
→ geometry where geometry is enough
→ classifier/segmentation where image appearance is required
→ unavailable where neither is reliable
```

This frontier is whole-face coverage closure, not another zygion-style proof chain.
