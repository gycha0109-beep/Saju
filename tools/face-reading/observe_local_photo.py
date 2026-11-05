"""Private one-image inference bridge; all interpretation stays in TypeScript.

Uses the existing FR26 model reference and the existing multi-signal hairline
extractor. The Python runtime is identified separately from the FR26 JS runtime.
No image, landmark or source path is printed on error or sent to a service.
"""
import argparse
import importlib.metadata
import json
from pathlib import Path
import sys
sys.dont_write_bytecode = True


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--image', required=True)
    parser.add_argument('--model', required=True)
    parser.add_argument('--work', required=True)
    args = parser.parse_args()
    import cv2
    import mediapipe as mp
    import numpy as np
    from PIL import Image
    from mediapipe.tasks import python
    from mediapipe.tasks.python import vision

    if importlib.metadata.version('mediapipe') != '0.10.35' or not cv2.__version__.startswith('4.'):
        raise ValueError('unsupported private runtime')
    Image.MAX_IMAGE_PIXELS = 16_000_000
    with Image.open(args.image) as source:
        if source.width * source.height > 16_000_000:
            raise ValueError('image resource limit')
        # Same encoded raster orientation as the existing hairline extractor.
        rgb = np.array(source.convert('RGB'))
    options = vision.FaceLandmarkerOptions(
        base_options=python.BaseOptions(model_asset_path=args.model),
        running_mode=vision.RunningMode.IMAGE,
        num_faces=2,  # Reject multi-face input; never choose one person's face.
        output_face_blendshapes=False,
        output_facial_transformation_matrixes=False,
    )
    with vision.FaceLandmarker.create_from_options(options) as landmarker:
        result = landmarker.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb))
    hairline = None
    if len(result.face_landmarks) == 1:
        sys.path.insert(0, str(Path(__file__).resolve().parent / 'hairline'))
        from run_multisignal_visible_hairline_candidate import _extract_record
        record = {'recordId': 'image', 'experimentTag': 'local_photo_research', 'qaOverlay': False}
        output = Path(args.work)
        _extract_record(Path(args.image), record, output)
        detailed = json.loads((output / 'image' / 'candidate.json').read_text(encoding='utf-8'))
        hairline = {
            'methodId': detailed['method']['id'],
            'methodVersion': detailed['method']['version'],
            'state': detailed['engineeringPreviewState'],
            'candidateBoundaryExposed': detailed['candidateBoundaryExposed'],
            'boundaryPoints': detailed['boundaryPoints'],
            'humanReviewed': False,
        }
    print(json.dumps({
        'schemaVersion': 'face-photo-observation-v1',
        'provider': 'mediapipe-python',
        'providerVersion': '0.10.35',
        'width': int(rgb.shape[1]), 'height': int(rgb.shape[0]),
        'faceLandmarks': [[{'x': p.x, 'y': p.y, 'z': p.z} for p in face] for face in result.face_landmarks],
        'faceBlendshapes': [], 'facialTransformationMatrixes': [],
        'hairline': hairline,
    }, allow_nan=False))


if __name__ == '__main__':
    try:
        main()
    except Exception:
        print('{"error":"LOCAL_PHOTO_OBSERVATION_FAILED"}', file=sys.stderr)
        sys.exit(1)
