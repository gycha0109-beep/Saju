-- Admin A4 / Saju source-owned immutable provider receipts.
-- OFFLINE candidate: DO NOT run against Production without the approved
-- source DB ownership, service authentication, TLS, backup and role review.
-- No customer, commerce, credits or Reading tables are modified.
BEGIN;

DO $preflight$
BEGIN
  IF to_regnamespace('saju_source_ops') IS NOT NULL
     OR to_regrole('saju_a4_provider_receipt_writer_v1') IS NOT NULL
     OR to_regrole('saju_a4_provider_receipt_reader_v1') IS NOT NULL THEN
    RAISE EXCEPTION 'A4 source receipt installation already exists or conflicts';
  END IF;
END
$preflight$;

CREATE ROLE saju_a4_provider_receipt_writer_v1
  LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE
  NOREPLICATION NOBYPASSRLS PASSWORD NULL;
CREATE ROLE saju_a4_provider_receipt_reader_v1
  LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE
  NOREPLICATION NOBYPASSRLS PASSWORD NULL;

CREATE SCHEMA saju_source_ops;
REVOKE ALL ON SCHEMA saju_source_ops FROM PUBLIC;

CREATE TABLE saju_source_ops.a4_provider_call_signed_receipts_v1 (
  call_id uuid NOT NULL,
  proof jsonb NOT NULL,
  stored_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT a4_provider_call_signed_receipts_v1_pkey PRIMARY KEY (call_id),
  CONSTRAINT a4_provider_receipt_exact_call_id CHECK (
    jsonb_typeof(proof) = 'object'
    AND coalesce(proof #>> '{payload,version}', '') = 'saju-provider-call-source-proof-v1'
    AND coalesce(proof #>> '{payload,link,version}', '') = 'saju-source-provider-call-link-v1'
    AND coalesce(proof #>> '{payload,link,observation,callId}', '') = call_id::text
    AND coalesce(proof ->> 'signatureHex', '') ~ '^[0-9a-f]{64}$'
  )
);

ALTER TABLE saju_source_ops.a4_provider_call_signed_receipts_v1
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY a4_receipt_writer_insert_v1
  ON saju_source_ops.a4_provider_call_signed_receipts_v1
  FOR INSERT TO saju_a4_provider_receipt_writer_v1 WITH CHECK (true);
CREATE POLICY a4_receipt_dedicated_read_v1
  ON saju_source_ops.a4_provider_call_signed_receipts_v1
  FOR SELECT TO saju_a4_provider_receipt_writer_v1,
    saju_a4_provider_receipt_reader_v1 USING (true);

CREATE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog
AS $function$
BEGIN
  RAISE EXCEPTION 'Immutable Saju provider source receipt cannot be changed'
    USING ERRCODE = '42501';
END
$function$;

REVOKE ALL ON FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1()
  FROM PUBLIC;

CREATE TRIGGER deny_a4_provider_receipt_update_delete_v1
  BEFORE UPDATE OR DELETE ON saju_source_ops.a4_provider_call_signed_receipts_v1
  FOR EACH ROW EXECUTE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1();

REVOKE ALL ON saju_source_ops.a4_provider_call_signed_receipts_v1 FROM PUBLIC;
GRANT USAGE ON SCHEMA saju_source_ops
  TO saju_a4_provider_receipt_writer_v1, saju_a4_provider_receipt_reader_v1;
GRANT INSERT (call_id, proof), SELECT (call_id, proof)
  ON saju_source_ops.a4_provider_call_signed_receipts_v1
  TO saju_a4_provider_receipt_writer_v1;
GRANT SELECT (call_id, proof)
  ON saju_source_ops.a4_provider_call_signed_receipts_v1
  TO saju_a4_provider_receipt_reader_v1;

-- No role receives UPDATE, DELETE, TRUNCATE, schema CREATE or stored_at SELECT.
-- No password, HTTP access, authenticated/anon grants or inherited privileges.
COMMIT;
