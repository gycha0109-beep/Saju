$ErrorActionPreference = 'Stop'
$container = 'saju-a4-source-pg17'
$secrets = Join-Path $PSScriptRoot 'secrets'
[void](New-Item -ItemType Directory -Force -Path $secrets)
$roles = @(
  'saju_a4_provider_receipt_writer_v1',
  'saju_a4_provider_receipt_reader_v1',
  'saju_a4_prepared_attempt_claim_writer_v1'
)
$health = docker inspect $container --format '{{.State.Health.Status}}'
if ($LASTEXITCODE -ne 0 -or $health -ne 'healthy') { throw 'Local A4 PostgreSQL is not healthy' }
$ssl = @(docker exec $container psql -X -U saju_a4_owner -d saju_a4_source -Atc 'SHOW ssl; SHOW ssl_min_protocol_version;')
if ($LASTEXITCODE -ne 0 -or $ssl.Count -ne 2 -or $ssl[0] -ne 'on' -or $ssl[1] -ne 'TLSv1.3') {
  throw 'Local A4 PostgreSQL TLS 1.3 is not active'
}
foreach ($role in $roles) {
  $passfile = Join-Path $secrets ($role + '.pgpass')
  $prefix = '127.0.0.1:5432:saju_a4_source:' + $role + ':'
  if (Test-Path -LiteralPath $passfile) {
    $line = [System.IO.File]::ReadAllText($passfile).Trim()
    if (-not $line.StartsWith($prefix)) { throw "Existing local credential format is unexpected: $role" }
    $password = $line.Substring($prefix.Length)
  } else {
    $random = [byte[]]::new(48)
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    try { $rng.GetBytes($random) } finally { $rng.Dispose() }
    $password = [Convert]::ToBase64String($random).TrimEnd('=').Replace('+','-').Replace('/','_')
    $line = $prefix + $password
    [System.IO.File]::WriteAllText($passfile,$line + [char]10,[System.Text.Encoding]::ASCII)
    [Array]::Clear($random,0,$random.Length)
  }
  if ($password -cnotmatch '^[A-Za-z0-9_-]{64}$') { throw "Unsafe local credential format: $role" }
  # Password goes through stdin, not through any command-line argument or Git file.
  $start = [System.Diagnostics.ProcessStartInfo]::new()
  $start.FileName = 'docker.exe'
  $start.Arguments = 'exec -i ' + $container + ' psql -X -q -v ON_ERROR_STOP=1 -U saju_a4_owner -d saju_a4_source'
  $start.UseShellExecute = $false
  $start.RedirectStandardInput = $true
  $start.RedirectStandardOutput = $true
  $start.RedirectStandardError = $true
  $process = [System.Diagnostics.Process]::Start($start)
  try {
    $sql = 'ALTER ROLE "' + $role + '" PASSWORD ' + [char]39 + $password + [char]39 + ';'
    $process.StandardInput.WriteLine($sql)
    $process.StandardInput.Close()
    [void]$process.StandardOutput.ReadToEnd()
    [void]$process.StandardError.ReadToEnd()
    $process.WaitForExit()
    if ($process.ExitCode -ne 0) { throw "Local role password setup failed: $role" }
    $sql = $null
  } finally {
    $process.Dispose()
    $password = $null
  }
  $containerFile = '/tmp/' + $role + '.pgpass'
  try {
    docker cp $passfile ($container + ':' + $containerFile) | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Cannot copy local verification credential: $role" }
    docker exec --user root $container chmod 0600 $containerFile | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "Cannot restrict temporary credential: $role" }
    $result = @(docker exec -e ('PGPASSFILE=' + $containerFile) -e PGSSLMODE=verify-full -e PGSSLROOTCERT=/var/lib/postgresql/data/server.crt -e PGCHANNELBINDING=require -e PGGSSENCMODE=disable $container psql -X -w -h 127.0.0.1 -p 5432 -U $role -d saju_a4_source -Atc 'SELECT current_user, ssl, version FROM pg_stat_ssl WHERE pid = pg_backend_pid();')
    if ($LASTEXITCODE -ne 0 -or ($result -join '') -ne ($role + '|t|TLSv1.3')) {
      throw "Verified TLS 1.3 role authentication failed: $role"
    }
    $canDelete = @(docker exec -e ('PGPASSFILE=' + $containerFile) -e PGSSLMODE=verify-full -e PGSSLROOTCERT=/var/lib/postgresql/data/server.crt -e PGCHANNELBINDING=require -e PGGSSENCMODE=disable $container psql -X -w -h 127.0.0.1 -p 5432 -U $role -d saju_a4_source -Atc "SELECT has_table_privilege(current_user,'saju_source_ops.a4_provider_call_signed_receipts_v1','DELETE');")
    if ($LASTEXITCODE -ne 0 -or ($canDelete -join '') -ne 'f') {
      throw "Unexpected direct-delete capability: $role"
    }
    Write-Output ('LOCAL_ROLE_TLS13_AUTH_OK: ' + $role)
  } finally {
    docker exec --user root $container rm -f $containerFile | Out-Null
  }
}
# Local-only credentials. Never print, commit or promote as production service secrets.
Write-Output 'LOCAL_SERVICE_AUTH_COMPLETE'
