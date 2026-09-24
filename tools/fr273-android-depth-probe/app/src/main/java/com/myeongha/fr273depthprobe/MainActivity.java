package com.myeongha.fr273depthprobe;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.ImageFormat;
import android.hardware.camera2.CameraCharacteristics;
import android.hardware.camera2.CameraManager;
import android.hardware.camera2.params.StreamConfigurationMap;
import android.os.Build;
import android.os.Bundle;
import android.util.Size;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.Arrays;
import java.util.Locale;
import java.util.Set;

public final class MainActivity extends Activity {
    private static final int CAMERA_PERMISSION_REQUEST = 273;
    private TextView reportView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        int pad = dp(16);
        root.setPadding(pad, pad, pad, pad);

        TextView title = new TextView(this);
        title.setText("FR273 Android Depth Capability Probe");
        title.setTextSize(20f);
        root.addView(title);

        TextView note = new TextView(this);
        note.setText("Camera2 metadata only. No preview, image capture, depth capture, network, or automatic upload.");
        note.setPadding(0, dp(8), 0, dp(12));
        root.addView(note);

        Button refresh = new Button(this);
        refresh.setText("Run probe");
        refresh.setOnClickListener(v -> ensurePermissionAndProbe());
        root.addView(refresh);

        Button copy = new Button(this);
        copy.setText("Copy report");
        copy.setOnClickListener(v -> copyReport());
        root.addView(copy);

        reportView = new TextView(this);
        reportView.setTextIsSelectable(true);
        reportView.setTextSize(13f);
        reportView.setPadding(0, dp(12), 0, 0);

        ScrollView scroll = new ScrollView(this);
        scroll.addView(reportView);
        root.addView(scroll, new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
        ));

        setContentView(root);
        ensurePermissionAndProbe();
    }

    private void ensurePermissionAndProbe() {
        if (Build.VERSION.SDK_INT >= 23 &&
                checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            reportView.setText(
                    "CAMERA permission is required only because Android hides some calibration metadata without it.\n" +
                    "The probe never opens the camera or captures media."
            );
            requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
            return;
        }
        reportView.setText(buildReport());
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_REQUEST) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                reportView.setText(buildReport());
            } else {
                reportView.setText(
                        "CAMERA permission denied.\n" +
                        "Android may hide calibration metadata, so FR272 eligibility cannot be determined."
                );
            }
        }
    }

    private String buildReport() {
        StringBuilder out = new StringBuilder();
        out.append("FR273_ANDROID_DEPTH_PROBE_V1\n");
        out.append("manufacturer=").append(Build.MANUFACTURER).append('\n');
        out.append("model=").append(Build.MODEL).append('\n');
        out.append("device=").append(Build.DEVICE).append('\n');
        out.append("android_sdk=").append(Build.VERSION.SDK_INT).append('\n');
        out.append("camera_permission=granted\n\n");

        CameraManager manager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
        boolean anyFrontCandidate = false;

        try {
            String[] ids = manager.getCameraIdList();
            out.append("camera_count=").append(ids.length).append("\n\n");

            for (String id : ids) {
                CameraCharacteristics c = manager.getCameraCharacteristics(id);
                Integer facing = c.get(CameraCharacteristics.LENS_FACING);
                int[] caps = c.get(CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES);
                StreamConfigurationMap map = c.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP);
                Size[] depth16 = safeSizes(map, ImageFormat.DEPTH16);
                Size[] pointCloud = safeSizes(map, ImageFormat.DEPTH_POINT_CLOUD);
                float[] intrinsics = c.get(CameraCharacteristics.LENS_INTRINSIC_CALIBRATION);
                float[] poseTranslation = c.get(CameraCharacteristics.LENS_POSE_TRANSLATION);
                float[] poseRotation = c.get(CameraCharacteristics.LENS_POSE_ROTATION);
                float[] distortion = distortion(c);
                Boolean depthExclusive = c.get(CameraCharacteristics.DEPTH_DEPTH_IS_EXCLUSIVE);
                Integer hardwareLevel = c.get(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL);

                boolean depthOutput = contains(
                        caps,
                        CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES_DEPTH_OUTPUT
                );
                boolean logicalMulti = Build.VERSION.SDK_INT >= 28 && contains(
                        caps,
                        CameraCharacteristics.REQUEST_AVAILABLE_CAPABILITIES_LOGICAL_MULTI_CAMERA
                );
                boolean front = facing != null &&
                        facing == CameraCharacteristics.LENS_FACING_FRONT;
                boolean candidate =
                        front &&
                        depthOutput &&
                        depth16.length > 0 &&
                        intrinsics != null &&
                        poseTranslation != null &&
                        poseRotation != null &&
                        distortion != null;

                anyFrontCandidate |= candidate;

                out.append("[camera ").append(id).append("]\n");
                out.append("facing=").append(facingName(facing)).append('\n');
                out.append("hardware_level=").append(hardwareLevelName(hardwareLevel)).append('\n');
                out.append("depth_output=").append(depthOutput).append('\n');
                out.append("logical_multi_camera=").append(logicalMulti).append('\n');
                out.append("depth16_sizes=").append(formatSizes(depth16)).append('\n');
                out.append("depth_point_cloud_sizes=").append(formatSizes(pointCloud)).append('\n');
                out.append("lens_intrinsic_calibration=").append(format(intrinsics)).append('\n');
                out.append("lens_pose_translation=").append(format(poseTranslation)).append('\n');
                out.append("lens_pose_rotation=").append(format(poseRotation)).append('\n');
                out.append("lens_distortion=").append(format(distortion)).append('\n');
                out.append("depth_is_exclusive=").append(value(depthExclusive)).append('\n');

                if (Build.VERSION.SDK_INT >= 28) {
                    Integer poseReference = c.get(CameraCharacteristics.LENS_POSE_REFERENCE);
                    Set<String> physicalIds = c.getPhysicalCameraIds();
                    out.append("lens_pose_reference=").append(value(poseReference)).append('\n');
                    out.append("physical_camera_ids=").append(physicalIds).append('\n');
                } else {
                    out.append("lens_pose_reference=api_lt_28\n");
                    out.append("physical_camera_ids=api_lt_28\n");
                }

                if (Build.VERSION.SDK_INT >= 29) {
                    out.append("permission_gated_key_count=")
                            .append(c.getKeysNeedingPermission().size())
                            .append('\n');
                }

                out.append("fr272_user_facing_depth_candidate=").append(candidate).append("\n\n");
            }

            out.append("FR272_USER_FACING_DEPTH_CANDIDATE_PRESENT=")
                    .append(anyFrontCandidate)
                    .append('\n');
            out.append("authority=CAPABILITY_PROBE_ONLY\n");
            out.append("fr266_annotation_issued=false\n");
            out.append("fr271_collection_authorized=false\n");
        } catch (Exception e) {
            out.append("probe_error=")
                    .append(e.getClass().getSimpleName())
                    .append(":")
                    .append(e.getMessage())
                    .append('\n');
        }

        return out.toString();
    }

    private float[] distortion(CameraCharacteristics c) {
        if (Build.VERSION.SDK_INT >= 28) {
            return c.get(CameraCharacteristics.LENS_DISTORTION);
        }
        return c.get(CameraCharacteristics.LENS_RADIAL_DISTORTION);
    }

    private Size[] safeSizes(StreamConfigurationMap map, int format) {
        if (map == null) return new Size[0];
        try {
            Size[] sizes = map.getOutputSizes(format);
            return sizes == null ? new Size[0] : sizes;
        } catch (IllegalArgumentException e) {
            return new Size[0];
        }
    }

    private boolean contains(int[] values, int target) {
        if (values == null) return false;
        for (int value : values) {
            if (value == target) return true;
        }
        return false;
    }

    private String facingName(Integer facing) {
        if (facing == null) return "null";
        if (facing == CameraCharacteristics.LENS_FACING_FRONT) return "front";
        if (facing == CameraCharacteristics.LENS_FACING_BACK) return "back";
        if (facing == CameraCharacteristics.LENS_FACING_EXTERNAL) return "external";
        return "unknown(" + facing + ")";
    }

    private String hardwareLevelName(Integer level) {
        if (level == null) return "null";
        if (level == CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_LEGACY) return "legacy";
        if (level == CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_LIMITED) return "limited";
        if (level == CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_FULL) return "full";
        if (level == CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_3) return "level_3";
        if (level == CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL_EXTERNAL) return "external";
        return "unknown(" + level + ")";
    }

    private String format(float[] values) {
        if (values == null) return "null";
        return Arrays.toString(values);
    }

    private String formatSizes(Size[] sizes) {
        if (sizes.length == 0) return "[]";
        StringBuilder out = new StringBuilder("[");
        for (int i = 0; i < sizes.length; i++) {
            if (i > 0) out.append(", ");
            out.append(sizes[i].getWidth()).append("x").append(sizes[i].getHeight());
        }
        return out.append("]").toString();
    }

    private String value(Object value) {
        return value == null ? "null" : String.valueOf(value);
    }

    private void copyReport() {
        ClipboardManager clipboard = (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        clipboard.setPrimaryClip(ClipData.newPlainText("FR273 depth probe", reportView.getText()));
        Toast.makeText(this, "Report copied", Toast.LENGTH_SHORT).show();
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }
}
