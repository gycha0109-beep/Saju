package com.myeongha.fr276depthcadence;

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
import java.util.List;
import java.util.Locale;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public final class MainActivity extends Activity implements GLSurfaceView.Renderer {
    private static final int CAMERA_PERMISSION_REQUEST = 276;
    private static final long MEASUREMENT_MS = 20_000L;

    private final Object statsLock = new Object();

    private GLSurfaceView surfaceView;
    private TextView statusView;
    private Button startButton;
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
    private volatile boolean automaticDepthSupported;
    private volatile String configuredDepthMode = "none";
    private volatile String trackingState = "unknown";

    private volatile boolean measurementActive;
    private volatile boolean measurementCompleted;
    private volatile long measurementStartMs;
    private volatile long measurementEndMs;

    private volatile long renderedFrames;
    private volatile long rawDepthFrames;
    private volatile long newRawDepthFrames;
    private volatile long reprojectedRawDepthFrames;
    private volatile long rawDepthNotYetAvailable;
    private volatile long rawDepthOtherErrors;
    private volatile long lastRawDepthTimestamp = -1L;

    private volatile int depthWidth;
    private volatile int depthHeight;
    private volatile int confidenceWidth;
    private volatile int confidenceHeight;

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
    private final List<Double> translationDeltasMm = new ArrayList<>();
    private final List<Double> rotationDeltasDeg = new ArrayList<>();
    private final List<Double> updateIntervalsMs = new ArrayList<>();
    private final List<Double> coverageSamples = new ArrayList<>();
    private final List<Double> centralCoverageSamples = new ArrayList<>();
    private final List<Double> confidenceSamples = new ArrayList<>();
    private final List<Double> highConfidenceSamples = new ArrayList<>();

    private volatile long lastUiUpdateMs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

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
        overlay.setPadding(dp(12), dp(12), dp(12), dp(12));
        overlay.setBackgroundColor(0x99000000);

        statusView = new TextView(this);
        statusView.setTextColor(0xffffffff);
        statusView.setTextSize(11f);
        statusView.setText("Preparing ARCore...");
        statusView.setTextIsSelectable(true);
        overlay.addView(statusView);

        startButton = new Button(this);
        startButton.setText("Start 20s motion test");
        startButton.setOnClickListener(v -> startMeasurement());
        overlay.addView(startButton);

        Button copy = new Button(this);
        copy.setText("Copy scalar report");
        copy.setOnClickListener(v -> copyReport());
        overlay.addView(copy);

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
            automaticDepthSupported = session.isDepthModeSupported(Config.DepthMode.AUTOMATIC);

            Config config = session.getConfig();
            config.setPlaneFindingMode(Config.PlaneFindingMode.DISABLED);
            config.setLightEstimationMode(Config.LightEstimationMode.DISABLED);

            if (rawDepthSupported) {
                config.setDepthMode(Config.DepthMode.RAW_DEPTH_ONLY);
                configuredDepthMode = "RAW_DEPTH_ONLY";
            } else if (automaticDepthSupported) {
                config.setDepthMode(Config.DepthMode.AUTOMATIC);
                configuredDepthMode = "AUTOMATIC";
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

            if (measurementActive) {
                renderedFrames++;

                if (camera.getTrackingState() == TrackingState.TRACKING) {
                    recordMotion(camera.getPose());
                    if (!"UNSUPPORTED".equals(configuredDepthMode)) {
                        sampleRawDepth(frame);
                    }
                }

                long now = android.os.SystemClock.elapsedRealtime();
                if (now - measurementStartMs >= MEASUREMENT_MS) {
                    measurementEndMs = now;
                    measurementActive = false;
                    measurementCompleted = true;
                    runOnUiThread(() -> {
                        startButton.setText("Start another 20s test");
                        updateStatusNow();
                    });
                }
            }

            long now = android.os.SystemClock.elapsedRealtime();
            if (now - lastUiUpdateMs >= 500L) {
                lastUiUpdateMs = now;
                runOnUiThread(this::updateStatusNow);
            }
        } catch (Exception e) {
            rawDepthOtherErrors++;
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
                double deltaMm = Math.sqrt(dx * dx + dy * dy + dz * dz) * 1000.0;
                translationPathMm += deltaMm;
                translationDeltasMm.add(deltaMm);

                double dot =
                        quaternion[0] * lastQuaternion[0] +
                        quaternion[1] * lastQuaternion[1] +
                        quaternion[2] * lastQuaternion[2] +
                        quaternion[3] * lastQuaternion[3];
                dot = Math.min(1.0, Math.max(-1.0, Math.abs(dot)));
                double rotationDeg = Math.toDegrees(2.0 * Math.acos(dot));
                accumulatedRotationDeg += rotationDeg;
                rotationDeltasDeg.add(rotationDeg);
            }

            System.arraycopy(translation, 0, lastTranslation, 0, 3);
            System.arraycopy(quaternion, 0, lastQuaternion, 0, 4);
            haveLastPose = true;
        }
    }

    private void sampleRawDepth(Frame frame) {
        try (Image depth = frame.acquireRawDepthImage16Bits();
             Image confidence = frame.acquireRawDepthConfidenceImage()) {
            rawDepthFrames++;
            depthWidth = depth.getWidth();
            depthHeight = depth.getHeight();
            confidenceWidth = confidence.getWidth();
            confidenceHeight = confidence.getHeight();

            long timestamp = depth.getTimestamp();
            if (timestamp == lastRawDepthTimestamp) {
                reprojectedRawDepthFrames++;
                return;
            }

            if (lastRawDepthTimestamp > 0L && timestamp > lastRawDepthTimestamp) {
                synchronized (statsLock) {
                    updateIntervalsMs.add((timestamp - lastRawDepthTimestamp) / 1_000_000.0);
                }
            }

            lastRawDepthTimestamp = timestamp;
            newRawDepthFrames++;

            DepthStats stats = analyze(depth, confidence);
            synchronized (statsLock) {
                coverageSamples.add(stats.coverage);
                centralCoverageSamples.add(stats.centralCoverage);
                confidenceSamples.add(stats.meanConfidence);
                highConfidenceSamples.add(stats.highConfidenceFraction);
            }
        } catch (NotYetAvailableException e) {
            rawDepthNotYetAvailable++;
        } catch (Exception e) {
            rawDepthOtherErrors++;
            sessionError = e.getClass().getSimpleName() + ":" + safe(e.getMessage());
        }
    }

    private DepthStats analyze(Image depth, Image confidence) {
        Image.Plane depthPlane = depth.getPlanes()[0];
        Image.Plane confidencePlane = confidence.getPlanes()[0];

        ByteBuffer depthBuffer = depthPlane.getBuffer().duplicate().order(ByteOrder.LITTLE_ENDIAN);
        ByteBuffer confidenceBuffer = confidencePlane.getBuffer().duplicate();

        int width = depth.getWidth();
        int height = depth.getHeight();

        long sampled = 0;
        long valid = 0;
        long centralSampled = 0;
        long centralValid = 0;
        long confidenceSum = 0;
        long highConfidence = 0;

        int x0 = width / 4;
        int x1 = width * 3 / 4;
        int y0 = height / 4;
        int y1 = height * 3 / 4;

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                sampled++;
                boolean central = x >= x0 && x < x1 && y >= y0 && y < y1;
                if (central) centralSampled++;

                int depthIndex =
                        y * depthPlane.getRowStride() + x * depthPlane.getPixelStride();
                int confidenceIndex =
                        y * confidencePlane.getRowStride() + x * confidencePlane.getPixelStride();

                int mm = depthBuffer.getShort(depthIndex) & 0xffff;
                int conf = confidenceBuffer.get(confidenceIndex) & 0xff;

                if (mm <= 0) continue;

                valid++;
                confidenceSum += conf;
                if (conf >= 128) highConfidence++;
                if (central) centralValid++;
            }
        }

        return new DepthStats(
                ratio(valid, sampled),
                ratio(centralValid, centralSampled),
                valid == 0 ? 0.0 : (double) confidenceSum / valid,
                ratio(highConfidence, valid)
        );
    }

    private void startMeasurement() {
        synchronized (statsLock) {
            translationDeltasMm.clear();
            rotationDeltasDeg.clear();
            updateIntervalsMs.clear();
            coverageSamples.clear();
            centralCoverageSamples.clear();
            confidenceSamples.clear();
            highConfidenceSamples.clear();
            translationPathMm = 0.0;
            accumulatedRotationDeg = 0.0;
            haveLastPose = false;
        }

        renderedFrames = 0;
        rawDepthFrames = 0;
        newRawDepthFrames = 0;
        reprojectedRawDepthFrames = 0;
        rawDepthNotYetAvailable = 0;
        rawDepthOtherErrors = 0;
        lastRawDepthTimestamp = -1L;
        measurementStartMs = android.os.SystemClock.elapsedRealtime();
        measurementEndMs = 0L;
        measurementCompleted = false;
        measurementActive = true;
        sessionError = "none";
        startButton.setText("Measuring...");
        updateStatusNow();
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

    private void updateStatusNow() {
        if (statusView != null) {
            statusView.setText(buildReport());
        }
    }

    private String buildReport() {
        long now = android.os.SystemClock.elapsedRealtime();
        long end = measurementActive ? now : (measurementEndMs > 0 ? measurementEndMs : now);
        long elapsedMs = measurementStartMs == 0 ? 0 : Math.max(0, end - measurementStartMs);

        double pathMm;
        double rotationDeg;
        List<Double> translation;
        List<Double> rotation;
        List<Double> intervals;
        List<Double> coverage;
        List<Double> centralCoverage;
        List<Double> confidence;
        List<Double> highConfidence;

        synchronized (statsLock) {
            pathMm = translationPathMm;
            rotationDeg = accumulatedRotationDeg;
            translation = new ArrayList<>(translationDeltasMm);
            rotation = new ArrayList<>(rotationDeltasDeg);
            intervals = new ArrayList<>(updateIntervalsMs);
            coverage = new ArrayList<>(coverageSamples);
            centralCoverage = new ArrayList<>(centralCoverageSamples);
            confidence = new ArrayList<>(confidenceSamples);
            highConfidence = new ArrayList<>(highConfidenceSamples);
        }

        double elapsedSeconds = elapsedMs / 1000.0;
        double updateHz = elapsedSeconds <= 0.0 ? 0.0 : newRawDepthFrames / elapsedSeconds;
        double remainingSeconds = measurementActive
                ? Math.max(0.0, (MEASUREMENT_MS - elapsedMs) / 1000.0)
                : 0.0;

        return String.format(
                Locale.US,
                "FR276_ARCORE_RAW_DEPTH_CADENCE_V1\n" +
                "manufacturer=%s\n" +
                "model=%s\n" +
                "device=%s\n" +
                "android_sdk=%d\n" +
                "arcore_availability=%s\n" +
                "raw_depth_only_supported=%s\n" +
                "automatic_depth_supported=%s\n" +
                "configured_depth_mode=%s\n" +
                "tracking_state=%s\n" +
                "session_error=%s\n" +
                "measurement_active=%s\n" +
                "measurement_completed=%s\n" +
                "elapsed_seconds=%.3f\n" +
                "remaining_seconds=%.3f\n" +
                "rendered_frames=%d\n" +
                "raw_depth_frames=%d\n" +
                "new_raw_depth_frames=%d\n" +
                "reprojected_raw_depth_frames=%d\n" +
                "new_raw_depth_hz=%.6f\n" +
                "raw_depth_not_yet_available=%d\n" +
                "raw_depth_other_errors=%d\n" +
                "camera_translation_path_mm=%.3f\n" +
                "frame_translation_delta_mm_median=%.6f\n" +
                "frame_translation_delta_mm_p90=%.6f\n" +
                "frame_translation_delta_mm_max=%.6f\n" +
                "camera_accumulated_rotation_deg=%.3f\n" +
                "frame_rotation_delta_deg_median=%.6f\n" +
                "frame_rotation_delta_deg_p90=%.6f\n" +
                "new_depth_interval_ms_min=%.3f\n" +
                "new_depth_interval_ms_median=%.3f\n" +
                "new_depth_interval_ms_p90=%.3f\n" +
                "new_depth_interval_ms_max=%.3f\n" +
                "camera_image_dimensions=%dx%d\n" +
                "camera_intrinsics_fx_fy=%.4f,%.4f\n" +
                "camera_principal_cx_cy=%.4f,%.4f\n" +
                "raw_depth_dimensions=%dx%d\n" +
                "confidence_dimensions=%dx%d\n" +
                "new_depth_valid_coverage_mean=%.6f\n" +
                "new_depth_valid_coverage_min=%.6f\n" +
                "new_depth_valid_coverage_max=%.6f\n" +
                "new_depth_central_coverage_mean=%.6f\n" +
                "new_depth_central_coverage_min=%.6f\n" +
                "new_depth_central_coverage_max=%.6f\n" +
                "new_depth_mean_confidence_mean=%.3f\n" +
                "new_depth_high_confidence_fraction_mean=%.6f\n" +
                "authority=CADENCE_CHARACTERIZATION_ONLY\n" +
                "mediapipe_used=false\n" +
                "rgb_or_depth_persisted=false\n" +
                "fr266_annotation_issued=false\n" +
                "fr271_collection_authorized=false\n",
                Build.MANUFACTURER,
                Build.MODEL,
                Build.DEVICE,
                Build.VERSION.SDK_INT,
                arcoreAvailability,
                rawDepthSupported,
                automaticDepthSupported,
                configuredDepthMode,
                trackingState,
                sessionError,
                measurementActive,
                measurementCompleted,
                elapsedSeconds,
                remainingSeconds,
                renderedFrames,
                rawDepthFrames,
                newRawDepthFrames,
                reprojectedRawDepthFrames,
                updateHz,
                rawDepthNotYetAvailable,
                rawDepthOtherErrors,
                pathMm,
                percentile(translation, 0.50),
                percentile(translation, 0.90),
                max(translation),
                rotationDeg,
                percentile(rotation, 0.50),
                percentile(rotation, 0.90),
                min(intervals),
                percentile(intervals, 0.50),
                percentile(intervals, 0.90),
                max(intervals),
                imageWidth,
                imageHeight,
                fx,
                fy,
                cx,
                cy,
                depthWidth,
                depthHeight,
                confidenceWidth,
                confidenceHeight,
                mean(coverage),
                min(coverage),
                max(coverage),
                mean(centralCoverage),
                min(centralCoverage),
                max(centralCoverage),
                mean(confidence),
                mean(highConfidence)
        );
    }

    private void copyReport() {
        ClipboardManager clipboard =
                (ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
        clipboard.setPrimaryClip(
                ClipData.newPlainText("FR276 raw depth cadence", buildReport())
        );
        Toast.makeText(this, "Scalar report copied", Toast.LENGTH_SHORT).show();
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

    private double min(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        return Collections.min(values);
    }

    private double max(List<Double> values) {
        if (values.isEmpty()) return 0.0;
        return Collections.max(values);
    }

    private double percentile(List<Double> values, double quantile) {
        if (values.isEmpty()) return 0.0;
        List<Double> sorted = new ArrayList<>(values);
        Collections.sort(sorted);
        double index = quantile * (sorted.size() - 1);
        int low = (int) Math.floor(index);
        int high = (int) Math.ceil(index);
        if (low == high) return sorted.get(low);
        double fraction = index - low;
        return sorted.get(low) * (1.0 - fraction) + sorted.get(high) * fraction;
    }

    private String safe(String value) {
        return value == null ? "null" : value.replace('\n', ' ').replace('\r', ' ');
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    private static final class DepthStats {
        final double coverage;
        final double centralCoverage;
        final double meanConfidence;
        final double highConfidenceFraction;

        DepthStats(
                double coverage,
                double centralCoverage,
                double meanConfidence,
                double highConfidenceFraction
        ) {
            this.coverage = coverage;
            this.centralCoverage = centralCoverage;
            this.meanConfidence = meanConfidence;
            this.highConfidenceFraction = highConfidenceFraction;
        }
    }
}
