package com.myeongha.fr278planarvalidation;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.Image;
import android.opengl.GLES11Ext;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.google.ar.core.ArCoreApk;
import com.google.ar.core.Camera;
import com.google.ar.core.CameraIntrinsics;
import com.google.ar.core.Config;
import com.google.ar.core.Coordinates2d;
import com.google.ar.core.Frame;
import com.google.ar.core.Pose;
import com.google.ar.core.Session;
import com.google.ar.core.TrackingState;
import com.google.ar.core.exceptions.CameraNotAvailableException;
import com.google.ar.core.exceptions.NotYetAvailableException;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public final class MainActivity extends Activity implements GLSurfaceView.Renderer {
    private static final int CAMERA_PERMISSION_REQUEST = 278;
    private static final long TRIAL_MS = 5_000L;
    private static final int[] NOMINAL_DISTANCES_MM = {500, 700, 900};

    private final Object statsLock = new Object();
    private final Map<Integer, List<TrialResult>> trials = new LinkedHashMap<>();

    private GLSurfaceView surfaceView;
    private TextView statusView;
    private Button captureButton;
    private Session session;
    private boolean installRequested;
    private int surfaceWidth;
    private int surfaceHeight;

    private int cameraTextureId = -1;
    private int program = -1;
    private int positionAttrib = -1;
    private int texCoordAttrib = -1;
    private int textureUniform = -1;

    private final float[] quadCoords = {
            -1f, -1f,
             1f, -1f,
            -1f,  1f,
             1f,  1f
    };
    private final float[] transformedTexCoords = new float[8];
    private FloatBuffer quadBuffer;
    private FloatBuffer texBuffer;

    private volatile String arcoreAvailability = "unknown";
    private volatile String sessionError = "none";
    private volatile boolean rawDepthSupported;
    private volatile String configuredDepthMode = "none";
    private volatile String trackingState = "unknown";

    private volatile int selectedNominalMm = 500;
    private volatile boolean trialActive;
    private volatile long trialStartMs;
    private volatile long trialEndMs;
    private volatile long lastRawDepthTimestamp = -1L;
    private volatile long rawDepthFrames;
    private volatile long newRawDepthFrames;
    private volatile long reprojectedRawDepthFrames;
    private volatile long notYetAvailable;
    private volatile long otherErrors;

    private volatile int depthWidth;
    private volatile int depthHeight;
    private volatile float fx;
    private volatile float fy;
    private volatile float cx;
    private volatile float cy;
    private volatile int imageWidth;
    private volatile int imageHeight;

    private boolean haveLastPose;
    private final float[] lastTranslation = new float[3];
    private final float[] lastQuaternion = new float[4];
    private double translationPathMm;
    private double accumulatedRotationDeg;

    private final List<Double> frameDepthMediansMm = new ArrayList<>();
    private final List<Double> frameHighConfidenceMediansMm = new ArrayList<>();
    private final List<Double> centralValidCoverage = new ArrayList<>();
    private final List<Double> centralHighConfidenceCoverage = new ArrayList<>();

    private volatile long lastUiUpdateMs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        for (int distance : NOMINAL_DISTANCES_MM) {
            trials.put(distance, new ArrayList<>());
        }

        FrameLayout root = new FrameLayout(this);

        surfaceView = new GLSurfaceView(this);
        surfaceView.setPreserveEGLContextOnPause(true);
        surfaceView.setEGLContextClientVersion(2);
        surfaceView.setRenderer(this);
        surfaceView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
        root.addView(surfaceView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));

        LinearLayout overlay = new LinearLayout(this);
        overlay.setOrientation(LinearLayout.VERTICAL);
        overlay.setPadding(dp(10), dp(10), dp(10), dp(10));
        overlay.setBackgroundColor(0x99000000);

        statusView = new TextView(this);
        statusView.setTextColor(0xffffffff);
        statusView.setTextSize(10f);
        statusView.setText("Preparing ARCore...");
        statusView.setTextIsSelectable(true);
        overlay.addView(statusView);

        LinearLayout distanceRow = new LinearLayout(this);
        distanceRow.setOrientation(LinearLayout.HORIZONTAL);
        for (int distance : NOMINAL_DISTANCES_MM) {
            Button button = new Button(this);
            button.setText(distance + " mm");
            button.setOnClickListener(v -> {
                if (!trialActive) {
                    selectedNominalMm = distance;
                    updateStatusNow();
                }
            });
            distanceRow.addView(button, new LinearLayout.LayoutParams(
                    0,
                    LinearLayout.LayoutParams.WRAP_CONTENT,
                    1f
            ));
        }
        overlay.addView(distanceRow);

        captureButton = new Button(this);
        captureButton.setText("Capture 5s trial");
        captureButton.setOnClickListener(v -> startTrial());
        overlay.addView(captureButton);

        Button copy = new Button(this);
        copy.setText("Copy validation bundle");
        copy.setOnClickListener(v -> copyReport());
        overlay.addView(copy);

        Button reset = new Button(this);
        reset.setText("Reset all trials");
        reset.setOnClickListener(v -> resetAll());
        overlay.addView(reset);

        FrameLayout.LayoutParams overlayParams = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.WRAP_CONTENT
        );
        overlayParams.gravity = Gravity.BOTTOM;
        root.addView(overlay, overlayParams);

        setContentView(root);
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (Build.VERSION.SDK_INT >= 23 &&
                checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
            return;
        }

        ensureSession();
        if (session == null) {
            updateStatusNow();
            return;
        }

        try {
            session.resume();
            surfaceView.onResume();
        } catch (CameraNotAvailableException e) {
            sessionError = "camera_not_available:" + e.getClass().getSimpleName();
            updateStatusNow();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (session != null) {
            surfaceView.onPause();
            session.pause();
        }
    }

    @Override
    protected void onDestroy() {
        if (session != null) {
            session.close();
            session = null;
        }
        super.onDestroy();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == CAMERA_PERMISSION_REQUEST) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                recreate();
            } else {
                sessionError = "camera_permission_denied";
                updateStatusNow();
            }
        }
    }

    private void ensureSession() {
        if (session != null) return;

        try {
            ArCoreApk.Availability availability =
                    ArCoreApk.getInstance().checkAvailability(getApplicationContext());
            arcoreAvailability = availability.name();

            ArCoreApk.InstallStatus installStatus =
                    ArCoreApk.getInstance().requestInstall(this, !installRequested);
            if (installStatus == ArCoreApk.InstallStatus.INSTALL_REQUESTED) {
                installRequested = true;
                sessionError = "arcore_install_requested";
                return;
            }

            session = new Session(this);
            rawDepthSupported = session.isDepthModeSupported(Config.DepthMode.RAW_DEPTH_ONLY);

            Config config = session.getConfig();
            config.setPlaneFindingMode(Config.PlaneFindingMode.DISABLED);
            config.setLightEstimationMode(Config.LightEstimationMode.DISABLED);

            if (rawDepthSupported) {
                config.setDepthMode(Config.DepthMode.RAW_DEPTH_ONLY);
                configuredDepthMode = "RAW_DEPTH_ONLY";
            } else {
                configuredDepthMode = "UNSUPPORTED";
            }

            session.configure(config);
            sessionError = "none";
        } catch (Exception e) {
            sessionError = e.getClass().getSimpleName() + ":" + safe(e.getMessage());
            session = null;
        }
    }

    @Override
    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        GLES20.glClearColor(0f, 0f, 0f, 1f);

        int[] textures = new int[1];
        GLES20.glGenTextures(1, textures, 0);
        cameraTextureId = textures[0];
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, cameraTextureId);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_CLAMP_TO_EDGE);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_CLAMP_TO_EDGE);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR);
        GLES20.glTexParameteri(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR);

        String vertex =
                "attribute vec4 a_Position;\n" +
                "attribute vec2 a_TexCoord;\n" +
                "varying vec2 v_TexCoord;\n" +
                "void main(){ gl_Position=a_Position; v_TexCoord=a_TexCoord; }\n";

        String fragment =
                "#extension GL_OES_EGL_image_external : require\n" +
                "precision mediump float;\n" +
                "uniform samplerExternalOES u_Texture;\n" +
                "varying vec2 v_TexCoord;\n" +
                "void main(){ gl_FragColor=texture2D(u_Texture,v_TexCoord); }\n";

        int vs = compileShader(GLES20.GL_VERTEX_SHADER, vertex);
        int fs = compileShader(GLES20.GL_FRAGMENT_SHADER, fragment);
        program = GLES20.glCreateProgram();
        GLES20.glAttachShader(program, vs);
        GLES20.glAttachShader(program, fs);
        GLES20.glLinkProgram(program);

        positionAttrib = GLES20.glGetAttribLocation(program, "a_Position");
        texCoordAttrib = GLES20.glGetAttribLocation(program, "a_TexCoord");
        textureUniform = GLES20.glGetUniformLocation(program, "u_Texture");

        quadBuffer = directFloatBuffer(quadCoords);
        texBuffer = directFloatBuffer(new float[8]);
    }

    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        surfaceWidth = width;
        surfaceHeight = height;
        GLES20.glViewport(0, 0, width, height);

        Session local = session;
        if (local != null) {
            local.setDisplayGeometry(currentDisplayRotation(), width, height);
        }
    }

    @Override
    public void onDrawFrame(GL10 gl) {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT);

        Session local = session;
        if (local == null || cameraTextureId < 0) return;

        try {
            local.setCameraTextureName(cameraTextureId);
            if (surfaceWidth > 0 && surfaceHeight > 0) {
                local.setDisplayGeometry(currentDisplayRotation(), surfaceWidth, surfaceHeight);
            }

            Frame frame = local.update();
            Camera camera = frame.getCamera();
            trackingState = camera.getTrackingState().name();
            updateIntrinsics(camera);

            if (frame.hasDisplayGeometryChanged()) {
                frame.transformCoordinates2d(
                        Coordinates2d.OPENGL_NORMALIZED_DEVICE_COORDINATES,
                        quadCoords,
                        Coordinates2d.TEXTURE_NORMALIZED,
                        transformedTexCoords
                );
                texBuffer.position(0);
                texBuffer.put(transformedTexCoords);
                texBuffer.position(0);
            }

            if (frame.getTimestamp() != 0L) {
                drawCameraBackground();
            }

            if (trialActive && camera.getTrackingState() == TrackingState.TRACKING) {
                recordMotion(camera.getPose());
                if (!"UNSUPPORTED".equals(configuredDepthMode)) {
                    sampleDepth(frame);
                }

                long now = android.os.SystemClock.elapsedRealtime();
                if (now - trialStartMs >= TRIAL_MS) {
                    finishTrial(now);
                }
            }

            long now = android.os.SystemClock.elapsedRealtime();
            if (now - lastUiUpdateMs >= 500L) {
                lastUiUpdateMs = now;
                runOnUiThread(this::updateStatusNow);
            }
        } catch (Exception e) {
            otherErrors++;
            sessionError = e.getClass().getSimpleName() + ":" + safe(e.getMessage());
        }
    }

    private void updateIntrinsics(Camera camera) {
        CameraIntrinsics intrinsics = camera.getImageIntrinsics();
        float[] focal = intrinsics.getFocalLength();
        float[] principal = intrinsics.getPrincipalPoint();
        int[] dimensions = intrinsics.getImageDimensions();

        fx = focal[0];
        fy = focal[1];
        cx = principal[0];
        cy = principal[1];
        imageWidth = dimensions[0];
        imageHeight = dimensions[1];
    }

    private void recordMotion(Pose pose) {
        float[] translation = pose.getTranslation();
        float[] quaternion = pose.getRotationQuaternion();

        synchronized (statsLock) {
            if (haveLastPose) {
                double dx = translation[0] - lastTranslation[0];
                double dy = translation[1] - lastTranslation[1];
                double dz = translation[2] - lastTranslation[2];
                translationPathMm += Math.sqrt(dx * dx + dy * dy + dz * dz) * 1000.0;

                double dot =
                        quaternion[0] * lastQuaternion[0] +
                        quaternion[1] * lastQuaternion[1] +
                        quaternion[2] * lastQuaternion[2] +
                        quaternion[3] * lastQuaternion[3];
                dot = Math.min(1.0, Math.max(-1.0, Math.abs(dot)));
                accumulatedRotationDeg += Math.toDegrees(2.0 * Math.acos(dot));
            }

            System.arraycopy(translation, 0, lastTranslation, 0, 3);
            System.arraycopy(quaternion, 0, lastQuaternion, 0, 4);
            haveLastPose = true;
        }
    }

    private void sampleDepth(Frame frame) {
        try (Image depth = frame.acquireRawDepthImage16Bits();
             Image confidence = frame.acquireRawDepthConfidenceImage()) {
            rawDepthFrames++;
            depthWidth = depth.getWidth();
            depthHeight = depth.getHeight();

            long timestamp = depth.getTimestamp();
            if (timestamp == lastRawDepthTimestamp) {
                reprojectedRawDepthFrames++;
                return;
            }

            lastRawDepthTimestamp = timestamp;
            newRawDepthFrames++;

            FrameStats stats = analyzeCentralRoi(depth, confidence);
            synchronized (statsLock) {
                centralValidCoverage.add(stats.validCoverage);
                centralHighConfidenceCoverage.add(stats.highConfidenceCoverage);
                if (stats.validMedianMm > 0.0) {
                    frameDepthMediansMm.add(stats.validMedianMm);
                }
                if (stats.highConfidenceMedianMm > 0.0) {
                    frameHighConfidenceMediansMm.add(stats.highConfidenceMedianMm);
                }
            }
        } catch (NotYetAvailableException e) {
            notYetAvailable++;
        } catch (Exception e) {
            otherErrors++;
            sessionError = e.getClass().getSimpleName() + ":" + safe(e.getMessage());
        }
    }

    private FrameStats analyzeCentralRoi(Image depth, Image confidence) {
        Image.Plane depthPlane = depth.getPlanes()[0];
        Image.Plane confidencePlane = confidence.getPlanes()[0];

        ByteBuffer depthBuffer = depthPlane.getBuffer().duplicate().order(ByteOrder.LITTLE_ENDIAN);
        ByteBuffer confidenceBuffer = confidencePlane.getBuffer().duplicate();

        int width = depth.getWidth();
        int height = depth.getHeight();

        int x0 = (int) Math.floor(width * 0.40);
        int x1 = (int) Math.ceil(width * 0.60);
        int y0 = (int) Math.floor(height * 0.40);
        int y1 = (int) Math.ceil(height * 0.60);

        long total = 0;
        long valid = 0;
        long highConfidence = 0;
        List<Double> validDepths = new ArrayList<>();
        List<Double> highConfidenceDepths = new ArrayList<>();

        for (int y = y0; y < y1; y++) {
            for (int x = x0; x < x1; x++) {
                total++;

                int depthIndex =
                        y * depthPlane.getRowStride() + x * depthPlane.getPixelStride();
                int confidenceIndex =
                        y * confidencePlane.getRowStride() + x * confidencePlane.getPixelStride();

                int mm = depthBuffer.getShort(depthIndex) & 0xffff;
                int conf = confidenceBuffer.get(confidenceIndex) & 0xff;

                if (mm <= 0) continue;
                valid++;
                validDepths.add((double) mm);

                if (conf >= 128) {
                    highConfidence++;
                    highConfidenceDepths.add((double) mm);
                }
            }
        }

        return new FrameStats(
                ratio(valid, total),
                ratio(highConfidence, total),
                median(validDepths),
                median(highConfidenceDepths)
        );
    }

    private void startTrial() {
        if (trialActive) return;

        synchronized (statsLock) {
            frameDepthMediansMm.clear();
            frameHighConfidenceMediansMm.clear();
            centralValidCoverage.clear();
            centralHighConfidenceCoverage.clear();
            translationPathMm = 0.0;
            accumulatedRotationDeg = 0.0;
            haveLastPose = false;
        }

        rawDepthFrames = 0;
        newRawDepthFrames = 0;
        reprojectedRawDepthFrames = 0;
        notYetAvailable = 0;
        otherErrors = 0;
        lastRawDepthTimestamp = -1L;
        trialStartMs = android.os.SystemClock.elapsedRealtime();
        trialEndMs = 0L;
        trialActive = true;
        sessionError = "none";
        captureButton.setText("Capturing...");
        updateStatusNow();
    }

    private void finishTrial(long now) {
        trialActive = false;
        trialEndMs = now;

        final int nominal = selectedNominalMm;
        final boolean saved;
        final int savedCount;

        synchronized (statsLock) {
            double measured = median(frameDepthMediansMm);
            if (measured <= 0.0) {
                saved = false;
                savedCount = trials.get(nominal).size();
            } else {
                double signedError = measured - nominal;
                TrialResult result = new TrialResult(
                        nominal,
                        frameDepthMediansMm.size(),
                        measured,
                        median(frameHighConfidenceMediansMm),
                        signedError,
                        Math.abs(signedError),
                        mad(frameDepthMediansMm),
                        mean(centralValidCoverage),
                        mean(centralHighConfidenceCoverage),
                        translationPathMm,
                        accumulatedRotationDeg,
                        rawDepthFrames,
                        newRawDepthFrames,
                        reprojectedRawDepthFrames
                );
                trials.get(nominal).add(result);
                saved = true;
                savedCount = trials.get(nominal).size();
            }
        }

        runOnUiThread(() -> {
            captureButton.setText("Capture 5s trial");
            Toast.makeText(
                    this,
                    saved
                            ? "Saved " + nominal + " mm trial #" + savedCount
                            : "No usable central depth. Retry the same distance.",
                    Toast.LENGTH_LONG
            ).show();
            updateStatusNow();
        });
    }

    private void resetAll() {
        if (trialActive) return;

        synchronized (statsLock) {
            for (List<TrialResult> list : trials.values()) {
                list.clear();
            }
        }
        updateStatusNow();
    }

    private String buildReport() {
        StringBuilder out = new StringBuilder();

        out.append("FR278_ARCORE_PLANAR_VALIDATION_V1\n");
        out.append("manufacturer=").append(Build.MANUFACTURER).append('\n');
        out.append("model=").append(Build.MODEL).append('\n');
        out.append("device=").append(Build.DEVICE).append('\n');
        out.append("android_sdk=").append(Build.VERSION.SDK_INT).append('\n');
        out.append("arcore_availability=").append(arcoreAvailability).append('\n');
        out.append("raw_depth_only_supported=").append(rawDepthSupported).append('\n');
        out.append("configured_depth_mode=").append(configuredDepthMode).append('\n');
        out.append("tracking_state=").append(trackingState).append('\n');
        out.append("session_error=").append(sessionError).append('\n');
        out.append("selected_nominal_mm=").append(selectedNominalMm).append('\n');
        out.append("trial_active=").append(trialActive).append('\n');

        if (trialActive) {
            long elapsed = android.os.SystemClock.elapsedRealtime() - trialStartMs;
            out.append(String.format(Locale.US, "trial_elapsed_seconds=%.3f\n", elapsed / 1000.0));
            out.append(String.format(
                    Locale.US,
                    "trial_remaining_seconds=%.3f\n",
                    Math.max(0.0, (TRIAL_MS - elapsed) / 1000.0)
            ));
        }

        out.append("camera_image_dimensions=").append(imageWidth).append('x').append(imageHeight).append('\n');
        out.append(String.format(Locale.US, "camera_intrinsics_fx_fy=%.4f,%.4f\n", fx, fy));
        out.append(String.format(Locale.US, "camera_principal_cx_cy=%.4f,%.4f\n", cx, cy));
        out.append("raw_depth_dimensions=").append(depthWidth).append('x').append(depthHeight).append('\n');
        out.append("central_roi_fraction=0.20x0.20\n");
        out.append("confidence_filter_ge=128\n");

        synchronized (statsLock) {
            for (int nominal : NOMINAL_DISTANCES_MM) {
                List<TrialResult> list = trials.get(nominal);
                out.append('[').append(nominal).append("_mm]\n");
                out.append("trial_count=").append(list.size()).append('\n');

                for (int i = 0; i < list.size(); i++) {
                    TrialResult t = list.get(i);
                    int n = i + 1;
                    out.append(String.format(Locale.US,
                            "trial_%d_sample_frames=%d\n", n, t.sampleFrames));
                    out.append(String.format(Locale.US,
                            "trial_%d_measured_median_mm=%.3f\n", n, t.measuredMedianMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_high_conf_median_mm=%.3f\n", n, t.highConfidenceMeasuredMedianMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_signed_error_mm=%.3f\n", n, t.signedErrorMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_absolute_error_mm=%.3f\n", n, t.absoluteErrorMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_frame_median_mad_mm=%.3f\n", n, t.frameMedianMadMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_central_valid_coverage_mean=%.6f\n", n, t.centralValidCoverageMean));
                    out.append(String.format(Locale.US,
                            "trial_%d_central_high_conf_coverage_mean=%.6f\n", n, t.centralHighConfCoverageMean));
                    out.append(String.format(Locale.US,
                            "trial_%d_translation_path_mm=%.3f\n", n, t.translationPathMm));
                    out.append(String.format(Locale.US,
                            "trial_%d_accumulated_rotation_deg=%.3f\n", n, t.accumulatedRotationDeg));
                    out.append("trial_").append(n).append("_raw_depth_frames=").append(t.rawDepthFrames).append('\n');
                    out.append("trial_").append(n).append("_new_raw_depth_frames=").append(t.newRawDepthFrames).append('\n');
                    out.append("trial_").append(n).append("_reprojected_raw_depth_frames=").append(t.reprojectedRawDepthFrames).append('\n');
                }

                List<Double> measured = new ArrayList<>();
                List<Double> signed = new ArrayList<>();
                for (TrialResult t : list) {
                    if (t.measuredMedianMm > 0.0) {
                        measured.add(t.measuredMedianMm);
                        signed.add(t.signedErrorMm);
                    }
                }

                out.append(String.format(Locale.US,
                        "repeat_median_measured_mm=%.3f\n", median(measured)));
                out.append(String.format(Locale.US,
                        "repeat_median_signed_error_mm=%.3f\n", median(signed)));
                out.append(String.format(Locale.US,
                        "repeat_measured_mad_mm=%.3f\n", mad(measured)));
                out.append(String.format(Locale.US,
                        "repeat_measured_range_mm=%.3f\n", range(measured)));
            }

            double m500 = repeatMedianMeasured(500);
            double m700 = repeatMedianMeasured(700);
            double m900 = repeatMedianMeasured(900);

            out.append(String.format(Locale.US,
                    "step_500_to_700_measured_delta_mm=%.3f\n",
                    bothPositive(m500, m700) ? m700 - m500 : 0.0));
            out.append(String.format(Locale.US,
                    "step_500_to_700_error_vs_200_mm=%.3f\n",
                    bothPositive(m500, m700) ? (m700 - m500) - 200.0 : 0.0));
            out.append(String.format(Locale.US,
                    "step_700_to_900_measured_delta_mm=%.3f\n",
                    bothPositive(m700, m900) ? m900 - m700 : 0.0));
            out.append(String.format(Locale.US,
                    "step_700_to_900_error_vs_200_mm=%.3f\n",
                    bothPositive(m700, m900) ? (m900 - m700) - 200.0 : 0.0));

            boolean complete =
                    trials.get(500).size() >= 3 &&
                    trials.get(700).size() >= 3 &&
                    trials.get(900).size() >= 3;

            out.append("bundle_complete=").append(complete).append('\n');
        }

        out.append("authority=PLANAR_ACCURACY_REPEATABILITY_CHARACTERIZATION_ONLY\n");
        out.append("pass_fail_threshold_defined=false\n");
        out.append("mediapipe_used=false\n");
        out.append("rgb_or_depth_persisted=false\n");
        out.append("fr266_annotation_issued=false\n");
        out.append("fr271_collection_authorized=false\n");

        return out.toString();
    }

    private double repeatMedianMeasured(int nominal) {
        List<Double> measured = new ArrayList<>();
        for (TrialResult t : trials.get(nominal)) {
            if (t.measuredMedianMm > 0.0) measured.add(t.measuredMedianMm);
        }
        return median(measured);
    }

    private boolean bothPositive(double a, double b) {
        return a > 0.0 && b > 0.0;
    }

    private String buildStatusSummary() {
        int c500;
        int c700;
        int c900;
        int usableFrames;
        synchronized (statsLock) {
            c500 = trials.get(500).size();
            c700 = trials.get(700).size();
            c900 = trials.get(900).size();
            usableFrames = frameDepthMediansMm.size();
        }

        double remaining = 0.0;
        if (trialActive) {
            long elapsed = android.os.SystemClock.elapsedRealtime() - trialStartMs;
            remaining = Math.max(0.0, (TRIAL_MS - elapsed) / 1000.0);
        }

        return String.format(
                Locale.US,
                "FR278 ARCore planar validation\n" +
                "selected=%d mm   tracking=%s\n" +
                "saved trials: 500=%d/3   700=%d/3   900=%d/3\n" +
                "trial_active=%s   remaining=%.1fs\n" +
                "usable_depth_frames=%d   raw_frames=%d   errors=%d\n" +
                "After each saved trial, select the next distance or capture again.",
                selectedNominalMm,
                trackingState,
                c500,
                c700,
                c900,
                trialActive,
                remaining,
                usableFrames,
                rawDepthFrames,
                otherErrors
        );
    }

    private void updateStatusNow() {
        if (statusView != null) {
            statusView.setText(buildStatusSummary());
        }
    }

    private void copyReport() {
        ClipboardManager clipboard =
                (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        clipboard.setPrimaryClip(
                ClipData.newPlainText("FR278 planar validation", buildReport())
        );
        Toast.makeText(this, "Validation bundle copied", Toast.LENGTH_SHORT).show();
    }

    private void drawCameraBackground() {
        GLES20.glDisable(GLES20.GL_DEPTH_TEST);
        GLES20.glDepthMask(false);
        GLES20.glUseProgram(program);
        GLES20.glActiveTexture(GLES20.GL_TEXTURE0);
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, cameraTextureId);
        GLES20.glUniform1i(textureUniform, 0);

        quadBuffer.position(0);
        texBuffer.position(0);

        GLES20.glVertexAttribPointer(positionAttrib, 2, GLES20.GL_FLOAT, false, 0, quadBuffer);
        GLES20.glVertexAttribPointer(texCoordAttrib, 2, GLES20.GL_FLOAT, false, 0, texBuffer);
        GLES20.glEnableVertexAttribArray(positionAttrib);
        GLES20.glEnableVertexAttribArray(texCoordAttrib);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLE_STRIP, 0, 4);
        GLES20.glDisableVertexAttribArray(positionAttrib);
        GLES20.glDisableVertexAttribArray(texCoordAttrib);
        GLES20.glDepthMask(true);
    }

    private int compileShader(int type, String source) {
        int shader = GLES20.glCreateShader(type);
        GLES20.glShaderSource(shader, source);
        GLES20.glCompileShader(shader);
        int[] status = new int[1];
        GLES20.glGetShaderiv(shader, GLES20.GL_COMPILE_STATUS, status, 0);
        if (status[0] == 0) {
            String log = GLES20.glGetShaderInfoLog(shader);
            GLES20.glDeleteShader(shader);
            throw new IllegalStateException("shader_compile_failed:" + log);
        }
        return shader;
    }

    private FloatBuffer directFloatBuffer(float[] values) {
        ByteBuffer bytes = ByteBuffer.allocateDirect(values.length * 4);
        bytes.order(ByteOrder.nativeOrder());
        FloatBuffer buffer = bytes.asFloatBuffer();
        buffer.put(values);
        buffer.position(0);
        return buffer;
    }

    private int currentDisplayRotation() {
        if (Build.VERSION.SDK_INT >= 30 && getDisplay() != null) {
            return getDisplay().getRotation();
        }
        return getWindowManager().getDefaultDisplay().getRotation();
    }

    private double ratio(long numerator, long denominator) {
        return denominator == 0 ? 0.0 : (double) numerator / denominator;
    }

    private double mean(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        double sum = 0.0;
        for (double value : values) sum += value;
        return sum / values.size();
    }

    private double median(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        List<Double> sorted = new ArrayList<>(values);
        Collections.sort(sorted);
        int n = sorted.size();
        if ((n & 1) == 1) return sorted.get(n / 2);
        return (sorted.get(n / 2 - 1) + sorted.get(n / 2)) / 2.0;
    }

    private double mad(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        double center = median(values);
        List<Double> deviations = new ArrayList<>();
        for (double value : values) {
            deviations.add(Math.abs(value - center));
        }
        return median(deviations);
    }

    private double range(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        return Collections.max(values) - Collections.min(values);
    }

    private String safe(String value) {
        return value == null ? "null" : value.replace('\n', ' ').replace('\r', ' ');
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private static final class FrameStats {
        final double validCoverage;
        final double highConfidenceCoverage;
        final double validMedianMm;
        final double highConfidenceMedianMm;

        FrameStats(
                double validCoverage,
                double highConfidenceCoverage,
                double validMedianMm,
                double highConfidenceMedianMm
        ) {
            this.validCoverage = validCoverage;
            this.highConfidenceCoverage = highConfidenceCoverage;
            this.validMedianMm = validMedianMm;
            this.highConfidenceMedianMm = highConfidenceMedianMm;
        }
    }

    private static final class TrialResult {
        final int nominalMm;
        final int sampleFrames;
        final double measuredMedianMm;
        final double highConfidenceMeasuredMedianMm;
        final double signedErrorMm;
        final double absoluteErrorMm;
        final double frameMedianMadMm;
        final double centralValidCoverageMean;
        final double centralHighConfCoverageMean;
        final double translationPathMm;
        final double accumulatedRotationDeg;
        final long rawDepthFrames;
        final long newRawDepthFrames;
        final long reprojectedRawDepthFrames;

        TrialResult(
                int nominalMm,
                int sampleFrames,
                double measuredMedianMm,
                double highConfidenceMeasuredMedianMm,
                double signedErrorMm,
                double absoluteErrorMm,
                double frameMedianMadMm,
                double centralValidCoverageMean,
                double centralHighConfCoverageMean,
                double translationPathMm,
                double accumulatedRotationDeg,
                long rawDepthFrames,
                long newRawDepthFrames,
                long reprojectedRawDepthFrames
        ) {
            this.nominalMm = nominalMm;
            this.sampleFrames = sampleFrames;
            this.measuredMedianMm = measuredMedianMm;
            this.highConfidenceMeasuredMedianMm = highConfidenceMeasuredMedianMm;
            this.signedErrorMm = signedErrorMm;
            this.absoluteErrorMm = absoluteErrorMm;
            this.frameMedianMadMm = frameMedianMadMm;
            this.centralValidCoverageMean = centralValidCoverageMean;
            this.centralHighConfCoverageMean = centralHighConfCoverageMean;
            this.translationPathMm = translationPathMm;
            this.accumulatedRotationDeg = accumulatedRotationDeg;
            this.rawDepthFrames = rawDepthFrames;
            this.newRawDepthFrames = newRawDepthFrames;
            this.reprojectedRawDepthFrames = reprojectedRawDepthFrames;
        }
    }
}
