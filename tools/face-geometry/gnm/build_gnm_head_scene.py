from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

try:
    import bpy
    from mathutils import Vector
except ImportError as exc:
    raise RuntimeError("This script must be executed by Blender's Python runtime") from exc


def parse_args() -> argparse.Namespace:
    blender_args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description="Build a shared GNM full-head Blender scene with provider ear regions.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument("--regions", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    parser.add_argument("--preview-out", type=Path, required=True)
    return parser.parse_args(blender_args)


def parse_obj(path: Path) -> tuple[list[tuple[float, float, float]], list[tuple[int, int, int]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, int, int]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            parts = line.split()
            faces.append(tuple(int(token.split("/", 1)[0]) - 1 for token in parts[1:4]))
    return vertices, faces


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)


def create_material(name: str, rgba: tuple[float, float, float, float]):
    material = bpy.data.materials.new(name=name)
    material.diffuse_color = rgba
    material.roughness = 0.6
    return material


def aim_camera(camera, target: Vector) -> None:
    direction = target - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


def bounds(vertices: list[tuple[float, float, float]]) -> tuple[Vector, Vector, Vector]:
    minimum = Vector((
        min(vertex[0] for vertex in vertices),
        min(vertex[1] for vertex in vertices),
        min(vertex[2] for vertex in vertices),
    ))
    maximum = Vector((
        max(vertex[0] for vertex in vertices),
        max(vertex[1] for vertex in vertices),
        max(vertex[2] for vertex in vertices),
    ))
    center = (minimum + maximum) * 0.5
    return minimum, maximum, center


def main() -> int:
    args = parse_args()
    region_payload = json.loads(args.regions.read_text(encoding="utf-8"))
    vertices, faces = parse_obj(args.obj)
    if len(vertices) != int(region_payload["vertexCount"]):
        raise ValueError("GNM OBJ and provider-region vertex counts differ")

    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0

    collection = bpy.data.collections.new("FG_GNM_HEAD")
    scene.collection.children.link(collection)

    mesh = bpy.data.meshes.new("FG_GNM_HEAD_MESH")
    mesh.from_pydata(vertices, [], faces)
    mesh.update(calc_edges=True)
    head = bpy.data.objects.new("FG_GNM_HEAD_NEUTRAL", mesh)
    collection.objects.link(head)
    head["asset_id"] = region_payload["assetId"]
    head["product_neutral"] = True
    head["direct_mediapipe_vertex_identity"] = False

    skin_material = create_material("FG_HEAD_SKIN", (0.46, 0.47, 0.50, 1.0))
    left_material = create_material("FG_PROVIDER_LEFT_EAR", (0.92, 0.32, 0.28, 1.0))
    right_material = create_material("FG_PROVIDER_RIGHT_EAR", (0.25, 0.62, 0.92, 1.0))
    mesh.materials.append(skin_material)
    mesh.materials.append(left_material)
    mesh.materials.append(right_material)

    region_by_id = {region["id"]: region for region in region_payload["regions"]}
    left_indices = {int(index) for index in region_by_id["left_ear"]["indices"]}
    right_indices = {int(index) for index in region_by_id["right_ear"]["indices"]}

    for region_id, indices in (("left_ear", left_indices), ("right_ear", right_indices)):
        group = head.vertex_groups.new(name=f"FG_GNM_{region_id.upper()}")
        group.add(sorted(indices), 1.0, "REPLACE")

    left_polygons = 0
    right_polygons = 0
    for polygon in mesh.polygons:
        left_votes = sum(1 for index in polygon.vertices if index in left_indices)
        right_votes = sum(1 for index in polygon.vertices if index in right_indices)
        if left_votes >= 2:
            polygon.material_index = 1
            left_polygons += 1
        elif right_votes >= 2:
            polygon.material_index = 2
            right_polygons += 1
        else:
            polygon.material_index = 0

    minimum, maximum, center = bounds(vertices)
    span = maximum - minimum

    camera_data = bpy.data.cameras.new("FG_GNM_PREVIEW_CAMERA")
    camera = bpy.data.objects.new("FG_GNM_PREVIEW_CAMERA", camera_data)
    scene.collection.objects.link(camera)
    camera.location = center + Vector((0.0, 0.0, max(0.65, span.z * 2.8)))
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = max(span.y * 1.24, span.x * 1.34)
    camera_data.clip_start = 0.01
    camera_data.clip_end = 10.0
    aim_camera(camera, center)
    scene.camera = camera

    scene.render.engine = "BLENDER_WORKBENCH"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = str(args.preview_out.resolve())
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = "WORLD"
    scene.display.shading.background_type = "VIEWPORT"
    scene.display.shading.background_color = (0.045, 0.045, 0.055)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.preview_out.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output.resolve()))
    bpy.ops.render.render(write_still=True)

    metadata = {
        "schemaVersion": "face-geometry-gnm-blender-scene-v1",
        "assetId": region_payload["assetId"],
        "vertexCount": len(vertices),
        "triangleCount": len(faces),
        "leftEarVertexCount": len(left_indices),
        "rightEarVertexCount": len(right_indices),
        "leftEarPolygonCount": left_polygons,
        "rightEarPolygonCount": right_polygons,
        "vertexGroups": ["FG_GNM_LEFT_EAR", "FG_GNM_RIGHT_EAR"],
        "bounds": {
            "min": [float(value) for value in minimum],
            "max": [float(value) for value in maximum],
            "center": [float(value) for value in center],
            "span": [float(value) for value in span],
        },
        "previewView": "front-full-head",
        "runtimeBlenderDependency": False,
        "productNeutral": True,
        "directMediaPipeVertexIdentity": False,
    }
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
