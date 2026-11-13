$ErrorActionPreference = 'Stop'
$container = 'saju-a4-source-pg17'
$secrets = Join-Path $PSScriptRoot 'secrets'
[void](New-Item -ItemType Directory -Force -Path $secrets)
$key = Join-Path $secrets 'local_tls_server.key'
$cert = Join-Path $secrets 'local_tls_server.crt'
$hba = Join-Path $secrets 'pg_hba_tls.conf'
$openssl = @('C:\Program Files\Git\mingw64\bin\openssl.exe','C:\Program Files\Git\usr\bin\openssl.exe') |
  Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $openssl) { throw 'Git for Windows OpenSSL is required' }
if ((Test-Path -LiteralPath $key) -xor (Test-Path -LiteralPath $cert)) {
  throw 'Partial TLS certificate pair: refusing to rotate an existing key'
}
if (-not (Test-Path -LiteralPath $key)) {
  & $openssl req -new -x509 -nodes -days 180 -sha256 -newkey rsa:3072 -keyout $key -out $cert -subj '/CN=localhost' -addext 'subjectAltName=IP:127.0.0.1,DNS:localhost'
  if ($LASTEXITCODE -ne 0) { throw 'TLS certificate generation failed' }
}
& $openssl x509 -in $cert -noout -checkend 604800 | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'TLS certificate expires within 7 days' }
$hbaContent = @'
# Local A4 proof/receipt Docker only. No unencrypted TCP clients.
local all all trust
hostnossl all all 0.0.0.0/0 reject
hostnossl all all ::/0 reject
hostssl all all 0.0.0.0/0 scram-sha-256
hostssl all all ::/0 scram-sha-256
'@
[System.IO.File]::WriteAllText($hba,$hbaContent,[System.Text.Encoding]::ASCII)
for ($i = 0; $i -lt 25; $i++) {
  $health = docker inspect $container --format '{{.State.Health.Status}}' 2>$null
  if ($LASTEXITCODE -eq 0 -and $health -eq 'healthy') { break }
  Start-Sleep -Seconds 2
}
if ($health -ne 'healthy') { throw 'A4 postgres did not become healthy' }
$settings = @(docker exec $container psql -X -U saju_a4_owner -d saju_a4_source -Atc 'SHOW ssl; SHOW ssl_min_protocol_version; SHOW hba_file;')
if ($LASTEXITCODE -ne 0) { throw 'Cannot read existing TLS configuration' }
if ($settings.Count -eq 3 -and $settings[0] -eq 'on' -and $settings[1] -eq 'TLSv1.3' -and
    $settings[2] -eq '/var/lib/postgresql/data/pg_hba_tls.conf') {
  Write-Output 'LOCAL_TLS_ALREADY_ENABLED'
  return
}
foreach ($entry in @(@($key,'server.key'),@($cert,'server.crt'),@($hba,'pg_hba_tls.conf'))) {
  docker cp $entry[0] ("${container}:/var/lib/postgresql/data/" + $entry[1]) | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Could not install local TLS file' }
}
docker exec --user root $container sh -c 'chown postgres:postgres /var/lib/postgresql/data/server.key /var/lib/postgresql/data/server.crt /var/lib/postgresql/data/pg_hba_tls.conf && chmod 0600 /var/lib/postgresql/data/server.key && chmod 0644 /var/lib/postgresql/data/server.crt && chmod 0600 /var/lib/postgresql/data/pg_hba_tls.conf'
if ($LASTEXITCODE -ne 0) { throw 'Could not secure local TLS file permissions' }
foreach ($sql in @(
  "ALTER SYSTEM SET ssl = 'on'",
  "ALTER SYSTEM SET ssl_min_protocol_version = 'TLSv1.3'",
  "ALTER SYSTEM SET hba_file = '/var/lib/postgresql/data/pg_hba_tls.conf'"
)) {
  docker exec $container psql -X -v ON_ERROR_STOP=1 -U saju_a4_owner -d saju_a4_source -q -c $sql
  if ($LASTEXITCODE -ne 0) { throw 'PostgreSQL TLS setting failed' }
}
docker restart $container | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'PostgreSQL TLS restart failed' }
for ($i = 0; $i -lt 25; $i++) {
  $health = docker inspect $container --format '{{.State.Health.Status}}' 2>$null
  if ($LASTEXITCODE -eq 0 -and $health -eq 'healthy') { break }
  Start-Sleep -Seconds 2
}
if ($health -ne 'healthy') { throw 'PostgreSQL TLS startup failed' }
Write-Output 'LOCAL_TLS_BOOTSTRAP_OK'
