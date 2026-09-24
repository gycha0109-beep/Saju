plugins {
    id("com.android.application")
}

android {
    namespace = "com.myeongha.fr276depthcadence"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.myeongha.fr276depthcadence"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "0.1.0"
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

dependencies {
    implementation("com.google.ar:core:1.54.0")
}
