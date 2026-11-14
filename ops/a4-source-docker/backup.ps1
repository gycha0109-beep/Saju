$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
$container = 'saju-a4-source-pg17'
try {
  $directory = Join-Path $PSScriptRoot 'backups'
  [void](New-Item -ItemType Directory -Force -Path $directory)
  $stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
  $destination = Join-Path $directory ("saju_a4_source_" + $stamp + ".dump")
  $globals = Join-Path $directory ("saju_a4_source_" + $stamp + ".globals.sql")
  docker exec $container pg_dump -U saju_a4_owner -d saju_a4_source -Fc -f /tmp/saju_a4_source.dump
  if ($LASTEXITCODE -ne 0) { throw 'pg_dump failed' }
  docker exec $container pg_restore -l /tmp/saju_a4_source.dump | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Backup format verification failed' }
  docker exec $container pg_dumpall -U saju_a4_owner --globals-only --no-role-passwords -f /tmp/saju_a4_globals.sql
  if ($LASTEXITCODE -ne 0) { throw 'Role export failed' }
  docker cp ("${container}:/tmp/saju_a4_source.dump") $destination | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Backup copy failed' }
  docker cp ("${container}:/tmp/saju_a4_globals.sql") $globals | Out-Null
  if ($LASTEXITCODE -ne 0) { throw 'Role backup copy failed' }
  if ((Get-Item $destination).Length -lt 1024 -or (Get-Item $globals).Length -lt 100) {
    throw 'Backup unexpectedly small'
  }
  Write-Output "BACKUP_OK: $destination"
  Write-Output "GLOBALS_OK: $globals"
} finally {
  docker exec $container rm -f /tmp/saju_a4_source.dump /tmp/saju_a4_globals.sql 2>$null | Out-Null
  Pop-Location
}
