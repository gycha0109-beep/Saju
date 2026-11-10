-- A4 Saju source-owned callback coverage evidence, OFFLINE / DISPOSABLE ONLY.
-- Requires previously installed A4 signed receipt source schema candidate.
-- This does NOT enable billing, collection, credentials or Production runtime.
BEGIN;

DO $preflight$
BEGIN
  IF to_regnamespace('saju_source_ops') IS NULL
    OR to_regrole('saju_a4_provider_receipt_writer_v1') IS NULL
    OR to_regclass('saju_source_ops.a4_provider_call_signed_receipts_v1') IS NULL
    OR to_regprocedure('saju_source_ops.deny_a4_provider_receipt_mutation_v1()') IS NULL
    OR to_regclass('saju_source_ops.a4_provider_call_coverage_v1') IS NOT NULL THEN
    RAISE EXCEPTION 'Saju A4 source callback coverage preflight not satisfied';
  END IF;
END
$preflight$;

CREATE TABLE saju_source_ops.a4_provider_call_coverage_v1 (
  execution_attempt_id uuid NOT NULL,
  external_request_ref text NOT NULL,
  coverage jsonb NOT NULL,
  stored_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT a4_provider_call_coverage_v1_pkey PRIMARY KEY (execution_attempt_id),
  CONSTRAINT a4_provider_call_coverage_v1_ref_key UNIQUE (external_request_ref),
  CONSTRAINT a4_provider_call_coverage_valid_v1 CHECK (
    jsonb_typeof(coverage) = 'object'
    AND coverage ?& ARRAY[
      'version', 'executionAttemptId', 'externalRequestRef',
      'observedCallbacks', 'acknowledgedReceipts', 'failedCallbacks',
      'pendingCallbacks', 'execution', 'completeCostCoverage'
    ]
    AND coverage - ARRAY[
      'version', 'executionAttemptId', 'externalRequestRef',
      'observedCallbacks', 'acknowledgedReceipts', 'failedCallbacks',
      'pendingCallbacks', 'execution', 'completeCostCoverage'
    ]::text[] = '{}'::jsonb
    AND coverage ->> 'version' = 'saju-provider-call-observer-coverage-v1'
    AND coverage ->> 'executionAttemptId' = execution_attempt_id::text
    AND coverage ->> 'externalRequestRef' = external_request_ref
    AND external_request_ref ~ '^saju_source_[a-f0-9-]{36}$'
    AND coverage ->> 'execution' IN ('returned', 'threw')
    AND coverage -> 'completeCostCoverage' = 'false'::jsonb
    AND jsonb_typeof(coverage -> 'observedCallbacks') = 'number'
    AND jsonb_typeof(coverage -> 'acknowledgedReceipts') = 'number'
    AND jsonb_typeof(coverage -> 'failedCallbacks') = 'number'
    AND jsonb_typeof(coverage -> 'pendingCallbacks') = 'number'
    AND coverage ->> 'observedCallbacks' ~ '^[0-9]+$'
    AND coverage ->> 'acknowledgedReceipts' ~ '^[0-9]+$'
    AND coverage ->> 'failedCallbacks' ~ '^[0-9]+$'
    AND coverage ->> 'pendingCallbacks' ~ '^[0-9]+$'
    AND (coverage ->> 'observedCallbacks')::bigint =
      (coverage ->> 'acknowledgedReceipts')::bigint
      + (coverage ->> 'failedCallbacks')::bigint
      + (coverage ->> 'pendingCallbacks')::bigint
  )
);

ALTER TABLE saju_source_ops.a4_provider_call_coverage_v1
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY a4_provider_coverage_writer_insert_v1
  ON saju_source_ops.a4_provider_call_coverage_v1
  FOR INSERT TO saju_a4_provider_receipt_writer_v1 WITH CHECK (true);

CREATE POLICY a4_provider_coverage_writer_select_v1
  ON saju_source_ops.a4_provider_call_coverage_v1
  FOR SELECT TO saju_a4_provider_receipt_writer_v1 USING (true);

CREATE TRIGGER deny_a4_provider_coverage_update_delete_v1
  BEFORE UPDATE OR DELETE ON saju_source_ops.a4_provider_call_coverage_v1
  FOR EACH ROW
  EXECUTE FUNCTION saju_source_ops.deny_a4_provider_receipt_mutation_v1();

REVOKE ALL ON saju_source_ops.a4_provider_call_coverage_v1 FROM PUBLIC;
GRANT INSERT (execution_attempt_id, external_request_ref, coverage),
  SELECT (execution_attempt_id, external_request_ref, coverage)
  ON saju_source_ops.a4_provider_call_coverage_v1
  TO saju_a4_provider_receipt_writer_v1;

-- Separate receipt reader gets NO access to callback coverage.
-- No role password, new endpoint, UPDATE, DELETE, TRUNCATE or stored_at SELECT.
COMMIT;
