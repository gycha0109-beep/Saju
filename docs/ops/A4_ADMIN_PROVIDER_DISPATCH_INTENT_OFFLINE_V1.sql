-- Admin A4 / Saju source-owned immutable provider pre-network intents.
-- OFFLINE / DISPOSABLE candidate only: do NOT install into production.
-- Must apply AFTER existing signed receipt and callback coverage candidates.
-- A prepared intent is NOT proof of network transmission, provider acceptance,
-- billing, complete cost coverage, or even that a request actually left the host.
-- No new role passwords, HTTP routes, or user/commerce schema modifications.
BEGIN;

DO $preflight$
BEGIN
  IF to_regnamespace('saju_source_ops') IS NULL
     OR to_regrole('saju_a4_provider_receipt_writer_v1') IS NULL
     OR to_regclass('saju_source_ops.a4_provider_call_signed_receipts_v1') IS NULL
     OR to_regclass('saju_source_ops.a4_provider_call_coverage_v1') IS NULL
     OR to_regprocedure('saju_source_ops.deny_a4_provider_receipt_mutation_v1()') IS NULL
     OR to_regclass('saju_source_ops.a4_provider_dispatch_intents_v1') IS NOT NULL THEN
    RAISE EXCEPTION 'A4 source pre-network dispatch intent prerequisites not met';
  END IF;
END
$preflight$;

CREATE TABLE saju_source_ops.a4_provider_dispatch_intents_v1 (
  call_id uuid NOT NULL PRIMARY KEY,
  execution_attempt_id uuid NOT NULL,
  external_request_ref text NOT NULL,
  intent jsonb NOT NULL,
  stored_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT a4_provider_dispatch_ref_valid_v1 CHECK (
    external_request_ref ~ '^saju_source_[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$'
  ),
  CONSTRAINT a4_provider_dispatch_intent_exact_v1 CHECK (
    jsonb_typeof(intent) = 'object'
    AND intent ?& ARRAY['callId', 'requestId', 'providerKey', 'modelKey', 'preparedAt']
    AND intent - ARRAY['callId', 'requestId', 'providerKey', 'modelKey', 'preparedAt']::text[] = '{}'::jsonb
    AND intent ->> 'callId' = call_id::text
    AND intent ->> 'providerKey' = 'openai'
    AND length(intent ->> 'requestId') BETWEEN 1 AND 256
    AND length(intent ->> 'modelKey') BETWEEN 1 AND 128
    AND jsonb_typeof(intent -> 'preparedAt') = 'string'
    AND intent ->> 'preparedAt' ~ '^20[0-9]{2}-[0-9]{2}-[0-9]{2}T'
  )
);
CREATE INDEX a4_provider_dispatch_intents_attempt_v1
  ON saju_source_ops.a4_provider_dispatch_intents_v1 (execution_attempt_id, call_id);

ALTER TABLE saju_source_ops.a4_provider_dispatch_intents_v1 ENABLE ROW LEVEL SECURITY;
CREATE POLICY a4_provider_dispatch_writer_insert_v1
  ON saju_source_ops.a4_provider_dispatch_intents_v1
  FOR INSERT TO saju_a4_provider_receipt_writer_v1 WITH CHECK (true);
CREATE POLICY a4_provider_dispatch_writer_select_v1
  ON saju_source_ops.a4_provider_dispatch_intents_v1
  FOR SELECT TO saju_a4_provider_receipt_writer_v1 USING (true);

CREATE TRIGGER deny_a4_provider_dispatch_intent_mutation_v1
  BEFORE UPDATE OR DELETE ON saju_source_ops.a4_provider_dispatch_intents_v1
  FOR EACH ROW EXECUTE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1();

REVOKE ALL ON saju_source_ops.a4_provider_dispatch_intents_v1 FROM PUBLIC;
GRANT INSERT (call_id, execution_attempt_id, external_request_ref, intent),
  SELECT (call_id, execution_attempt_id, external_request_ref, intent)
  ON saju_source_ops.a4_provider_dispatch_intents_v1
  TO saju_a4_provider_receipt_writer_v1;

-- Receipt reader gets no dispatch-intent privileges.
-- No UPDATE, DELETE, TRUNCATE, stored_at SELECT or production secrets.
COMMIT;
