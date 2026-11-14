-- A4 signed MyeongHa prepared attempt claim, OFFLINE install candidate.
-- One source-side use per preallocated MyeongHa execution attempt UUID.
-- Requires the existing Saju source-owned receipt schema and immutability trigger.
-- Does NOT install credentials, Production issuer or cost collection.
BEGIN;
DO $preflight$
BEGIN
  IF to_regnamespace('saju_source_ops') IS NULL
    OR to_regclass('saju_source_ops.a4_provider_call_signed_receipts_v1') IS NULL
    OR to_regprocedure('saju_source_ops.deny_a4_provider_receipt_mutation_v1()') IS NULL
    OR to_regrole('saju_a4_prepared_attempt_claim_writer_v1') IS NOT NULL
    OR to_regclass('saju_source_ops.a4_prepared_attempt_claims_v1') IS NOT NULL THEN
    RAISE EXCEPTION 'A4 prepared-attempt admission prerequisite not met';
  END IF;
END $preflight$;

CREATE ROLE saju_a4_prepared_attempt_claim_writer_v1
  LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE
  NOREPLICATION NOBYPASSRLS PASSWORD NULL;

CREATE TABLE saju_source_ops.a4_prepared_attempt_claims_v1 (
  execution_attempt_id uuid PRIMARY KEY,
  proof_digest_sha256 text NOT NULL,
  claimed_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT a4_prepared_claim_digest_v1
    CHECK (proof_digest_sha256 ~ '^[0-9a-f]{64}$')
);

ALTER TABLE saju_source_ops.a4_prepared_attempt_claims_v1 ENABLE ROW LEVEL SECURITY;
CREATE POLICY a4_prepared_attempt_claim_insert_v1
  ON saju_source_ops.a4_prepared_attempt_claims_v1
  FOR INSERT TO saju_a4_prepared_attempt_claim_writer_v1 WITH CHECK (true);
CREATE POLICY a4_prepared_attempt_claim_select_v1
  ON saju_source_ops.a4_prepared_attempt_claims_v1
  FOR SELECT TO saju_a4_prepared_attempt_claim_writer_v1 USING (true);

CREATE TRIGGER deny_a4_prepared_attempt_claim_update_delete_v1
  BEFORE UPDATE OR DELETE ON saju_source_ops.a4_prepared_attempt_claims_v1
  FOR EACH ROW EXECUTE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1();

REVOKE ALL ON saju_source_ops.a4_prepared_attempt_claims_v1 FROM PUBLIC;
GRANT USAGE ON SCHEMA saju_source_ops TO saju_a4_prepared_attempt_claim_writer_v1;
GRANT INSERT (execution_attempt_id,proof_digest_sha256),
  SELECT (execution_attempt_id)
  ON saju_source_ops.a4_prepared_attempt_claims_v1
  TO saju_a4_prepared_attempt_claim_writer_v1;

-- No UPDATE/DELETE/CREATE/TRUNCATE, no credentials, no direct customer/Reading
-- or MyeongHa cost ledger rights, no Production service activation.
COMMIT;
