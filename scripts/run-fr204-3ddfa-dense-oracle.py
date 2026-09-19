#!/usr/bin/env python3
import hashlib
import json
import pickle
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image
from ai_edge_litert.interpreter import Interpreter

UPSTREAM_COMMIT = "1b6c67601abffc1e9f248b291708aef0e43b55ae"
HF_REVISION = "c33a53529bf260a9055f55f303c5308acf055c63"
HF_BASE = f"https://huggingface.co/litert-community/3DDFA-V2-LiteRT/resolve/{HF_REVISION}"
MODEL_URL = f"{HF_BASE}/tddfa_mb1_fp16.tflite?download=true"
MEAN_URL = f"{HF_BASE}/tddfa_param_mean.bin?download=true"
STD_URL = f"{HF_BASE}/tddfa_param_std.bin?download=true"
BFM_URL = (
    "https://raw.githubusercontent.com/cleardusk/3DDFA_V2/"
    f"{UPSTREAM_COMMIT}/configs/bfm_noneck_v3.pkl"
)

def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            h.update(chunk)
    return "sha256:" + h.hexdigest()

def download(url: str, path: Path) -> None:
    request = urllib.request.Request(url, headers={"User-Agent": "myeongha-fr204-3ddfa-oracle"})
    with urllib.request.urlopen(request, timeout=120) as response:
        path.write_bytes(response.read())

def rank(values):
    order = sorted(range(len(values)), key=lambda i: (values[i], i))
    ranks = [0.0] * len(values)
    cursor = 0
    while cursor < len(order):
        end = cursor + 1
        while end < len(order) and values[order[end]] == values[order[cursor]]:
            end += 1
        average = (cursor + 1 + end) / 2.0
        for pos in range(cursor, end):
            ranks[order[pos]] = average
        cursor = end
    return ranks

def pearson(xs, ys):
    if len(xs) < 2:
        return None
    x = np.asarray(xs, dtype=np.float64)
    y = np.asarray(ys, dtype=np.float64)
    dx = x - x.mean()
    dy = y - y.mean()
    denom = float(np.sqrt(np.sum(dx * dx) * np.sum(dy * dy)))
    if denom == 0:
        return None
    return float(np.sum(dx * dy) / denom)

def spearman(xs, ys):
    return pearson(rank(xs), rank(ys))

def center_square_rgb(path: Path) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    width, height = image.size
    side = min(width, height)
    left = (width - side) // 2
    top = (height - side) // 2
    image = image.crop((left, top, left + side, top + side))
    image = image.resize((120, 120), Image.Resampling.BILINEAR)
    rgb = np.asarray(image, dtype=np.float32)
    bgr = rgb[:, :, ::-1]
    nchw = np.transpose(bgr, (2, 0, 1))[None, ...]
    return (nchw - 127.5) / 128.0

def width_by_height(vertices: np.ndarray):
    x_span = float(np.max(vertices[0]) - np.min(vertices[0]))
    y_span = float(np.max(vertices[1]) - np.min(vertices[1]))
    if not (x_span > 0 and y_span > 0):
        raise RuntimeError("FR204 dense BFM span must be positive")
    return x_span / y_span

def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: run-fr204-3ddfa-dense-oracle.py <manifest.json> <output.json>")

    manifest_path = Path(sys.argv[1]).resolve()
    output_path = Path(sys.argv[2]).resolve()
    work = output_path.parent / "fr204-3ddfa-assets"
    work.mkdir(parents=True, exist_ok=True)

    model_path = work / "tddfa_mb1_fp16.tflite"
    mean_path = work / "tddfa_param_mean.bin"
    std_path = work / "tddfa_param_std.bin"
    bfm_path = work / "bfm_noneck_v3.pkl"
    for url, path in [
        (MODEL_URL, model_path),
        (MEAN_URL, mean_path),
        (STD_URL, std_path),
        (BFM_URL, bfm_path),
    ]:
        if not path.exists():
            download(url, path)

    mean = np.fromfile(mean_path, dtype=np.float32)
    std = np.fromfile(std_path, dtype=np.float32)
    if mean.shape != (62,) or std.shape != (62,):
        raise RuntimeError(f"FR204 expected 62 mean/std values, got {mean.shape} / {std.shape}")

    with bfm_path.open("rb") as fh:
        bfm = pickle.load(fh)
    u = np.asarray(bfm["u"], dtype=np.float32)
    w_shp = np.asarray(bfm["w_shp"], dtype=np.float32)[..., :40]
    w_exp = np.asarray(bfm["w_exp"], dtype=np.float32)[..., :10]
    if u.ndim == 1:
        u = u[:, None]
    if u.shape[0] % 3 != 0 or w_shp.shape != (u.shape[0], 40) or w_exp.shape != (u.shape[0], 10):
        raise RuntimeError(
            f"FR204 unexpected dense BFM shapes u={u.shape} w_shp={w_shp.shape} w_exp={w_exp.shape}"
        )

    interpreter = Interpreter(model_path=str(model_path))
    interpreter.allocate_tensors()
    input_detail = interpreter.get_input_details()[0]
    output_detail = interpreter.get_output_details()[0]

    manifest = json.loads(manifest_path.read_text("utf-8"))
    image_dir = manifest_path.parent
    receipts = []
    failures = []

    for sample in manifest["samples"]:
        sample_id = sample["sampleId"]
        try:
            inp = center_square_rgb(image_dir / sample["imageFile"]).astype(input_detail["dtype"])
            if tuple(inp.shape) != tuple(input_detail["shape"]):
                raise RuntimeError(
                    f"FR204 input shape mismatch for {sample_id}: {inp.shape} != {input_detail['shape']}"
                )
            interpreter.set_tensor(input_detail["index"], inp)
            interpreter.invoke()
            normalized = np.asarray(
                interpreter.get_tensor(output_detail["index"]), dtype=np.float32
            ).reshape(-1)
            if normalized.shape != (62,):
                raise RuntimeError(f"FR204 expected 62 parameters, got {normalized.shape}")
            param = normalized * std + mean
            alpha_shp = param[12:52, None]
            alpha_exp = param[52:62, None]

            identity = (u + w_shp @ alpha_shp).reshape(3, -1, order="F")
            expression = (u + w_shp @ alpha_shp + w_exp @ alpha_exp).reshape(3, -1, order="F")

            receipts.append(
                {
                    "sampleId": sample_id,
                    "sourceReferenceWidthByObjYSpan": sample["sourceReferenceWidthByObjYSpan"],
                    "denseIdentityMaxWidthByHeight": width_by_height(identity),
                    "denseExpressionMaxWidthByHeight": width_by_height(expression),
                    "denseVertexCount": int(identity.shape[1]),
                    "inputPolicy": "provider_independent_center_square_full_frame_resize_120",
                }
            )
        except Exception as exc:
            failures.append({"sampleId": sample_id, "error": str(exc)})

    references = [r["sourceReferenceWidthByObjYSpan"] for r in receipts]
    identity_values = [r["denseIdentityMaxWidthByHeight"] for r in receipts]
    expression_values = [r["denseExpressionMaxWidthByHeight"] for r in receipts]

    artifact = {
        "schemaVersion": "fr204-3ddfa-dense-oracle-v1",
        "status": "executed_complete" if len(receipts) == len(manifest["samples"]) else "executed_partial",
        "oracle": {
            "family": "3DDFA_V2",
            "upstreamCommit": UPSTREAM_COMMIT,
            "liteRtRevision": HF_REVISION,
            "denseBfmAsset": "cleardusk/3DDFA_V2 configs/bfm_noneck_v3.pkl",
            "denseBfmLicenseBoundary": "academic_use_only_upstream_statement",
            "modelDigests": {
                "tflite": sha256(model_path),
                "paramMean": sha256(mean_path),
                "paramStd": sha256(std_path),
                "bfm": sha256(bfm_path),
            },
        },
        "inputCount": len(manifest["samples"]),
        "successCount": len(receipts),
        "failureCount": len(failures),
        "failures": failures,
        "comparison": {
            "reference": "source-exact zygion X width / source OBJ Y span",
            "denseIdentityMaxWidthByHeight": {
                "pearson": pearson(references, identity_values),
                "spearman": spearman(references, identity_values),
            },
            "denseExpressionMaxWidthByHeight": {
                "pearson": pearson(references, expression_values),
                "spearman": spearman(references, expression_values),
            },
        },
        "receipts": receipts,
        "authority": {
            "oracleValidationOnly": True,
            "productionDependencyAuthorized": False,
            "commerceDependencyAuthorized": False,
            "providerIndexAdmissionAuthorized": False,
            "anatomicalZygionClaimAuthorized": False,
            "numericAcceptanceThresholdAuthorized": False,
            "calibrationAuthorized": False,
            "classifierAuthorized": False,
            "traditionalProjectionAuthorized": False,
            "productionAuthorized": False,
            "commerceAuthorized": False,
        },
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(artifact, indent=2) + "\n", "utf-8")
    print(
        json.dumps(
            {
                "status": artifact["status"],
                "successCount": artifact["successCount"],
                "failures": failures,
                "comparison": artifact["comparison"],
                "oracleValidationOnly": True,
                "productionDependencyAuthorized": False,
            }
        )
    )
    if artifact["status"] != "executed_complete":
        raise SystemExit(1)

if __name__ == "__main__":
    main()
