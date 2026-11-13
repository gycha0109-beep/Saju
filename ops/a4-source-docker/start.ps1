$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
  $secretFolder = Join-Path $PSScriptRoot 'secrets'
  $secretFile = Join-Path $secretFolder 'pg_owner_password.txt'
  [void](New-Item -ItemType Directory -Force -Path $secretFolder)
  if (-not (Test-Path -LiteralPath $secretFile)) {
    $random = New-Object byte[] 48
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($random) } finally { $rng.Dispose() }
    $password = [Convert]::ToBase64String($random).TrimEnd('=').Replace('+','-').Replace('/','_')
    [System.IO.File]::WriteAllText($secretFile,$password,[System.Text.Encoding]::ASCII)
    $password = $null
  }
  $volume = 'saju_a4_source_pg17_data_v1'
  $volumes = @(docker volume ls --format '{{.Name}}')
  if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect Docker volumes' }
  if ($volumes -notcontains $volume) {
    docker volume create $volume | Out-Null
    if ($LASTEXITCODE -ne 0) { throw 'Cannot create Saju A4 volume' }
  }
  docker compose -f compose.yaml config --quiet
  if ($LASTEXITCODE -ne 0) { throw 'Invalid A4 Compose configuration' }
  docker compose -f compose.yaml up -d --no-build --pull never
  if ($LASTEXITCODE -ne 0) { throw 'Saju A4 PostgreSQL did not start' }
  docker compose -f compose.yaml ps
  & (Join-Path $PSScriptRoot 'enable-local-tls.ps1')
  if (-not $?) { throw 'Local TLS bootstrap failed' }
} finally {
  Pop-Location
}
