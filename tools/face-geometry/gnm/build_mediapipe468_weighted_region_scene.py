from __future__ import annotations

import argparse
import colorsys
import json
import math
import sys
from pathlib import Path

try:
    import bpy
    from mathutils import Vector
except ImportError as exc:
    raise RuntimeError("This script must be executed by Blender's Python runtime") from exc


def parse_args() -> argparse.Namespace:
    blender_args = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(description="Build MediaPipe468 weighted-region QA previews.")
    parser.add_argument("--obj", type=Path, required=True)
    parser.add_argument("--adapter", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--metadata-out", type=Path, required=True)
    parser.add_argument("--front-preview-out", type=Path, required=True)
    parser.add_argument("--three-quarter-preview-out", type=Path, required=True)
    return parser.parse_args(blender_args)


def parse_obj(path: Path) -> tuple[list[tuple[float, float, float]], list[tuple[int, ...]]]:
    vertices: list[tuple[float, float, float]] = []
    faces: list[tuple[int, ...]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if line.startswith("v "):
            parts = line.split()
            vertices.append((float(parts[1]), float(parts[2]), float(parts[3])))
        elif line.startswith("f "):
            face = tuple(int(token.split("/", 1)[0]) - 1 for token in line.split()[1:])
            if len(face) >= 3:
                faces.append(face)
    return vertices, faces


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for material in list(bpy.data.materials):
        bpy.data.materials.remove(material)


def create_material(name: str, rgba: tuple[float, float, float, float]):
    material = bpy.data.materials.new(name=name)
    material.diffuse_color = rgba
    material.roughness = 0.62
    return material


def deterministic_color(index: int) -> tuple[float, float, float, float]:
    hue = (index * 0.61803398875) % 1.0
    red, green, blue = colorsys.hsv_to_rgb(hue, 0.64, 0.93)
    return red, green, blue, 1.0


def bounds(vertices: list[tuple[float, float, float]]) -> tuple[Vector, Vector, Vector]:
    minimum = Vector(
        (
            min(vertex[0] for vertex in vertices),
            min(vertex[1] for vertex in vertices),
            min(vertex[2] for vertex in vertices),
        )
    )
    maximum = Vector(
        (
            max(vertex[0] for vertex in vertices),
            max(vertex[1] for vertex in vertices),
            max(vertex[2] for vertex in vertices),
        )
    )
    return minimum, maximum, (minimum + maximum) * 0.5


def configure_yaw_camera(scene, name: str, location: Vector, center: Vector, ortho_scale: float):
    camera_data = bpy.data.cameras.new(name)
    camera = bpy.data.objects.new(name, camera_data)
    scene.collection.objects.link(camera)
    camera.location = location
    offset = location - center
    if abs(float(offset.y)) > 1e-8:
        raise ValueError("Preview camera must stay on canonical XZ plane so +Y remains screen-up")
    camera.rotation_euler = (0.0, math.atan2(float(offset.x), float(offset.z)), 0.0)
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = ortho_scale
    camera_data.clip_start = 0.01
    camera_data.clip_end = 1000.0
    return camera


def render(scene, camera, output: Path) -> None:
    scene.camera = camera
    scene.render.filepath = str(output.resolve())
    output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.render.render(write_still=True)


def main() -> int:
    args = parse_args()
    adapter = json.loads(args.adapter.read_text(encoding="utf-8"))
    vertices, faces = parse_obj(args.obj)
    if len(vertices) != int(adapter["targetVertexCount"]):
        raise ValueError("MediaPipe OBJ and weighted adapter vertex counts differ")
    if adapter["assignment"]["hardPartition"] is not False:
        raise ValueError("Weighted QA scene cannot accept a hard-partition adapter")

    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 0.01

    collection = bpy.data.collections.new("FG_MEDIAPIPE468_WEIGHTED_REGIONS")
    scene.collection.children.link(collection)
    mesh = bpy.data.meshes.new("FG_MEDIAPIPE468_WEIGHTED_REGION_MESH")
    mesh.from_pydata(vertices, [], faces)
    mesh.update(calc_edges=True)
    face = bpy.data.objects.new("FG_MEDIAPIPE468_WEIGHTED_REGION_FACE", mesh)
    collection.objects.link(face)
    face["source_asset_id"] = adapter["sourceAssetId"]
    face["target_asset_id"] = adapter["targetAssetId"]
    face["schema_version"] = adapter["schemaVersion"]
    face["product_neutral"] = True
    face["runtime_gnm_dependency"] = False
    face["runtime_blender_dependency"] = False

    unassigned_material = create_material("FG_MP468_UNASSIGNED", (0.22, 0.23, 0.26, 1.0))
    ambiguous_material = create_material("FG_MP468_AMBIGUOUS", (0.56, 0.56, 0.60, 1.0))
    mesh.materials.append(unassigned_material)
    mesh.materials.append(ambiguous_material)

    supported = [
        region
        for region in adapter["regions"]
        if region["status"] == "weighted_projected_authoring_candidate"
    ]
    material_index_by_id: dict[str, int] = {}
    group_name_by_id: dict[str, str] = {}
    for index, region in enumerate(supported):
        region_id = region["adapterRegionId"]
        group_name = f"FG_MP468_WEIGHTED_{region_id.upper()}"
        group = face.vertex_groups.new(name=group_name)
        for item in region["weightedVertices"]:
            group.add([int(item["mediapipeIndex"])], float(item["weight"]), "REPLACE")
        group_name_by_id[region_id] = group_name
        material = create_material(f"FG_MP468_MAT_{region_id.upper()}", deterministic_color(index))
        mesh.materials.append(material)
        material_index_by_id[region_id] = len(mesh.materials) - 1

    vertex_memberships = {
        int(item["mediapipeIndex"]): item for item in adapter["vertexMemberships"]
    }
    if set(vertex_memberships) != set(range(len(vertices))):
        raise ValueError("Weighted adapter must retain one diagnostic record for every MediaPipe vertex")

    polygon_counts = {region["adapterRegionId"]: 0 for region in supported}
    ambiguous_polygon_count = 0
    unassigned_polygon_count = 0
    for polygon in mesh.polygons:
        scores: dict[str, float] = {}
        for vertex_index in polygon.vertices:
            record = vertex_memberships[int(vertex_index)]
            for membership in record["memberships"]:
                region_id = membership["adapterRegionId"]
                scores[region_id] = scores.get(region_id, 0.0) + float(membership["weight"])
        if not scores:
            polygon.material_index = 0
            unassigned_polygon_count += 1
            continue
        winner, winner_score = max(scores.items(), key=lambda item: (item[1], item[0]))
        total_score = sum(scores.values())
        dominance = winner_score / total_score if total_score > 0 else 0.0
        if dominance < 0.42:
            polygon.material_index = 1
            ambiguous_polygon_count += 1
        else:
            polygon.material_index = material_index_by_id[winner]
            polygon_counts[winner] += 1

    minimum, maximum, center = bounds(vertices)
    span = maximum - minimum
    front_distance = max(35.0, span.z * 3.0)
    ortho_scale = max(span.y * 1.22, span.x * 1.34)
    front_location = center + Vector((0.0, 0.0, front_distance))
    three_quarter_location = center + Vector((front_distance * 0.58, 0.0, front_distance * 0.92))
    front_camera = configure_yaw_camera(scene, "FG_MP468_WEIGHTED_FRONT_CAMERA", front_location, center, ortho_scale)
    three_quarter_camera = configure_yaw_camera(
        scene,
        "FG_MP468_WEIGHTED_THREE_QUARTER_CAMERA",
        three_quarter_location,
        center,
        ortho_scale * 1.08,
    )

    scene.render.engine = "BLENDER_WORKBENCH"
    scene.render.resolution_x = 900
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.color_type = "MATERIAL"
    scene.display.shading.show_shadows = True
    scene.display.shading.show_cavity = True
    scene.display.shading.cavity_type = "WORLD"
    scene.display.shading.background_type = "VIEWPORT"
    scene.display.shading.background_color = (0.045, 0.045, 0.055)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(args.output.resolve()))
    render(scene, front_camera, args.front_preview_out)
    render(scene, three_quarter_camera, args.three_quarter_preview_out)

    metadata = {
        "schemaVersion": "face-geometry-mediapipe468-weighted-region-adapter-scene-v2",
        "sourceAssetId": adapter["sourceAssetId"],
        "targetAssetId": adapter["targetAssetId"],
        "vertexCount": len(vertices),
        "polygonCount": len(mesh.polygons),
        "supportedRegionCount": len(supported),
        "regionVertexCounts": {
            region["adapterRegionId"]: int(region["vertexCount"]) for region in supported
        },
        "weightedVertexGroups": group_name_by_id,
        "coloredPolygonCounts": polygon_counts,
        "ambiguousPolygonCount": ambiguous_polygon_count,
        "unassignedPolygonCount": unassigned_polygon_count,
        "coverage": adapter["coverage"],
        "projectionDistanceM": adapter["registration"]["projectionDistanceM"],
        "authoringDistanceGate": adapter["registration"]["authoringDistanceGate"],
        "inspectionSeeds": adapter["inspectionSeeds"],
        "previewCameraPolicy": {
            "canonicalUpAxis": "+Y",
            "rollDegrees": 0.0,
            "frontYawDegrees": 0.0,
            "threeQuarterYawDegrees": math.degrees(
                math.atan2(
                    float((three_quarter_location - center).x),
                    float((three_quarter_location - center).z),
                )
            ),
        },
        "hardPartition": False,
        "overlapAllowed": True,
        "unassignedAllowed": True,
        "runtimeGNMDependency": False,
        "runtimeBlenderDependency": False,
        "productNeutral": True,
        "semanticSideAssignmentEncoded": False,
    }
    args.metadata_out.parent.mkdir(parents=True, exist_ok=True)
    args.metadata_out.write_text(json.dumps(metadata, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(json.dumps(metadata, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
