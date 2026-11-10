-- Saju A4: prepared MyeongHa attempt nonce consumption, OFFLINE candidate.
-- Install only after the source-owned signed-receipt schema has a governed
-- Production installation and independent service authentication/authority.
-- Does not alter customer, Reading, payment or credit data.
BEGIN;

DO $preflight$
BEGIN
  IF to_regnamespace('saju_source_ops') IS NULL
    OR to_regrole('saju_a4_provider_receipt_writer_v1') IS NULL
    OR to_regprocedure('saju_source_ops.deny_a4_provider_receipt_mutation_v1()') IS NULL
    OR to_regclass('saju_source_ops.a4_prepared_attempt_consumptions_v1') IS NOT NULL THEN
    RAISE EXCEPTION 'A4 prepared-attempt single-use install preflight failed';
  END IF;
END
$preflight$;

CREATE TABLE saju_source_ops.a4_prepared_attempt_consumptions_v1 (
  execution_attempt_id uuid PRIMARY KEY,
  nonce uuid NOT NULL UNIQUE,
  request_sha256_hex text NOT NULL,
  expires_at_ms bigint NOT NULL,
  consumed_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT a4_prepared_attempt_digest_v1 CHECK (
    request_sha256_hex ~ '^[0-9a-f]{64}$'
  ),
  CONSTRAINT a4_prepared_attempt_expiry_v1 CHECK (expires_at_ms > 0)
);

ALTER TABLE saju_source_ops.a4_prepared_attempt_consumptions_v1
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY a4_prepared_attempt_writer_insert_v1
  ON saju_source_ops.a4_prepared_attempt_consumptions_v1
  FOR INSERT TO saju_a4_provider_receipt_writer_v1 WITH CHECK (true);

CREATE POLICY a4_prepared_attempt_writer_select_v1
  ON saju_source_ops.a4_prepared_attempt_consumptions_v1
  FOR SELECT TO saju_a4_provider_receipt_writer_v1 USING (true);

CREATE TRIGGER deny_a4_prepared_attempt_change_v1
  BEFORE UPDATE OR DELETE ON saju_source_ops.a4_prepared_attempt_consumptions_v1
  FOR EACH ROW
  EXECUTE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1();

REVOKE ALL ON saju_source_ops.a4_prepared_attempt_consumptions_v1 FROM PUBLIC;
GRANT INSERT (execution_attempt_id, nonce, request_sha256_hex, expires_at_ms),
  SELECT (execution_attempt_id)
  ON saju_source_ops.a4_prepared_attempt_consumptions_v1
  TO saju_a4_provider_receipt_writer_v1;

-- No read access for receipt Reader; no UPDATE/DELETE/TRUNCATE/CREATE.
-- Passwords, Secret binding, external APIs and runtime collection remain OFF.
COMMIT;
