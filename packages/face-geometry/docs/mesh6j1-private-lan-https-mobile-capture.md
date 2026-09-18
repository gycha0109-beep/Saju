# MESH6J.1 — Private-LAN HTTPS Mobile Capture

MESH6J.1 allows the PC to run the research server while a phone on the same private network supplies the browser camera.

The original MESH6J behavior remains the default:

```text
default -> http://127.0.0.1:4316
LAN mode -> disabled
```

LAN mode is enabled only when `MESH6J_LAN=1`.

## Why HTTPS is required

A phone browser does not normally grant `getUserMedia()` camera access to an ordinary insecure origin such as:

```text
http://192.168.0.20:4316
```

Therefore MESH6J.1 does not support plain-HTTP LAN camera capture.

The supported path is a certificate that the phone trusts for the PC's private-LAN address or local hostname.

## Network boundary

When LAN mode is enabled:

- server bind: `0.0.0.0`
- protocol: HTTPS only
- remote clients: loopback, RFC1918/private IPv4, IPv4 link-local, IPv6 loopback/ULA/link-local only
- public source addresses: HTTP 403
- methods: GET only
- raw capture upload/storage: none

LAN mode refuses to start unless both are present:

```text
MESH6J_TLS_KEY
MESH6J_TLS_CERT
```

## Windows + phone setup

### 1. Find the PC private IPv4 address

On the PC:

```powershell
ipconfig
```

Use the IPv4 address for the Wi-Fi adapter connected to the same network as the phone.

Example only:

```text
192.168.0.23
```

### 2. Create a locally trusted certificate

Use a local PKI tool such as `mkcert`.

After installing mkcert:

```powershell
mkcert -install
mkcert -key-file mesh6j-key.pem -cert-file mesh6j-cert.pem 192.168.0.23 localhost 127.0.0.1 ::1
```

Replace `192.168.0.23` with the actual PC address.

The private CA root location can be displayed with:

```powershell
mkcert -CAROOT
```

Only the CA certificate must be transferred to the phone if the phone does not already trust that CA.

**Never transfer or share the CA private key.**

### 3. Trust the local CA on the phone

The exact menu differs by OS/version.

Android generally provides a security/credential setting for installing a CA certificate.

iOS requires installing the CA certificate/profile and then explicitly enabling full trust for that root certificate.

This is a device trust action performed by the operator; the repository does not install certificates on devices.

### 4. Start MESH6J.1 on the PC

PowerShell example:

```powershell
$env:MESH6J_LAN = "1"
$env:MESH6J_TLS_KEY = (Resolve-Path ".\mesh6j-key.pem")
$env:MESH6J_TLS_CERT = (Resolve-Path ".\mesh6j-cert.pem")
node scripts/mesh6j-manual-browser-capture-preview.mjs
```

The server prints one or more lines such as:

```text
Phone URL: https://192.168.0.23:4316/
```

### 5. Open the printed URL on the phone

The phone and PC must be on a network that allows peer-to-peer LAN traffic.

Open the printed HTTPS URL in the phone browser.

If the certificate is trusted and the browser reports a secure connection, press **카메라 열기** and grant camera permission.

The phone now runs the same MESH6H → MESH6I capture path as the desktop browser.

## Windows firewall

The first LAN bind may cause Windows Firewall to ask whether Node.js may communicate on the network.

Allow only the appropriate **Private network** profile.

Do not expose the port through router port-forwarding, public firewall rules, reverse proxies, or internet tunnels for this research workflow.

## Troubleshooting

### Phone cannot connect

Check:

- PC and phone are on the same LAN/VLAN
- the Wi-Fi network does not use client isolation/AP isolation
- Windows Firewall permits Node on the Private profile
- the printed IP is the active Wi-Fi adapter, not a VPN/virtual adapter

### Page opens but camera is unavailable

Check:

- URL begins with `https://`
- browser shows the certificate as trusted
- phone OS/browser camera permission is granted
- certificate SAN contains the exact hostname/IP used in the URL

Proceeding through a certificate warning is not the supported trust path.

### PC IP changes

Regenerate the certificate with the new IP, or use a stable private hostname that resolves on both PC and phone and is included in the certificate SAN.

## Data boundary

LAN transport changes only how the browser reaches the PC server.

It does not add:

- raw image/video transfer to a new API
- raw capture persistence
- frame auto-selection
- pose/quality scoring
- identity matching
- biometric template storage
- repeatability threshold
- confidence threshold
- calibration
- production morphology admission

The phone browser still processes explicit manual capture triggers through the existing MESH6H/MESH6I pipeline and exports only the bounded descriptive JSON artifact.

## CI

CI verifies:

1. default mode remains localhost HTTP;
2. LAN mode fails closed without TLS key/cert;
3. private/loopback address admission and public-address denial;
4. an ephemeral HTTPS LAN-mode server can start and serve every required route;
5. the existing no-raw-capture/no-calibration authority boundary remains intact.

The ephemeral CI certificate is used only for transport smoke testing. It is not a production or user device certificate.
