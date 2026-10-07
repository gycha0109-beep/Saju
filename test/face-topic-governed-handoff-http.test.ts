import { once } from 'node:events';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createFaceGovernedHandoffRuntimeHostV1,
  type FaceGovernedHandoffRuntimeDependenciesV1,
} from '../src/face-topic/governed-handoff-runtime.js';
import {
  FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER,
  FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_VERSION,
  FACE_GOVERNED_HANDOFF_HTTP_PATH,
} from '../src/host/face-governed-handoff-http.js';
import {
  createMyeonghwaProductionCalculationHostServer,
  createMyeonghwaProductionPreviewHostServer,
} from '../src/host/http-server.js';
import type { MyeonghwaProductHost } from '../src/host/product-host.js';
import {
  buildRepositoryFaceAuthorityReceiptForTopicFaceTest,
} from './support/topic-face-live-authority-source.js';
import {
  syntheticGovernedFaceSource,
} from './support/topic-face-governed-synthetic.js';

const BLOCKED_REQUEST = Object.freeze({
  topicKey: 'face.reading.three_divisions',
  observationArtifactRef: 'face-observation-artifact:005m-a:http',
  requestId: 'request:005m-a:http',
});

function readingHost(): MyeonghwaProductHost {
  return {
    async requestReading() {
      throw new Error('Reading route is not used by governed Face handoff tests.');
    },
  };
}

function blockedRuntime(
  engine: ReturnType<typeof vi.fn> = vi.fn(async () => {
    throw new Error('blocked path must not execute engine');
  }),
) {
  return createFaceGovernedHandoffRuntimeHostV1({
    authorityProvider: {
      async loadAuthorityReceipt() {
        return buildRepositoryFaceAuthorityReceiptForTopicFaceTest();
      },
    },
    traditionalResultProvider: {
      loadExecutionResultReceipt: engine,
    },
  });
}

function syntheticRuntime(
  options: { engineThrows?: boolean } = {},
) {
  const source = syntheticGovernedFaceSource();
  const dependencies: FaceGovernedHandoffRuntimeDependenciesV1 = {
    authorityProvider: {
      async loadAuthorityReceipt() {
        return source.authorityReceipt;
      },
    },
    traditionalResultProvider: {
      async loadExecutionResultReceipt() {
        if (options.engineThrows) {
          throw new Error('synthetic transport failure');
        }
        return source.receipt;
      },
    },
  };
  return {
    source,
    host: createFaceGovernedHandoffRuntimeHostV1(dependencies),
  };
}

describe('TOPIC-FACE-005M-A authenticated governed Face handoff HTTP route', () => {
  const openServers: Server[] = [];

  afterEach(async () => {
    await Promise.all(
      openServers.splice(0).map(
        (server) =>
          new Promise<void>((resolve) => {
            server.close(() => resolve());
          }),
      ),
    );
  });

  async function start(
    faceHost = blockedRuntime(),
  ) {
    const server = createMyeonghwaProductionPreviewHostServer(
      readingHost(),
      { serviceBearer: 'face-handoff-secret' },
      faceHost,
    );
    openServers.push(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    return `http://127.0.0.1:${String(address.port)}`;
  }

  it('requires the service bearer before touching the governed Face source host', async () => {
    const execute = vi.fn(async () => {
      throw new Error('must not execute');
    });
    const origin = await start({ execute });

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(BLOCKED_REQUEST),
      },
    );

    expect(response.status).toBe(401);
    expect(execute).not.toHaveBeenCalled();
    expect(
      response.headers.get(
        FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER,
      ),
    ).toBeNull();
  });

  it('does not expose the governed Face route on the calculation-only host', async () => {
    const server = createMyeonghwaProductionCalculationHostServer({
      serviceBearer: 'calculation-secret',
    });
    openServers.push(server);
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address() as AddressInfo;
    const origin =
      `http://127.0.0.1:${String(address.port)}`;

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer calculation-secret',
          'content-type': 'application/json',
        },
        body: JSON.stringify(BLOCKED_REQUEST),
      },
    );

    expect(response.status).toBe(404);
  });

  it('returns the actual blocked Three-Divisions state without invoking the engine provider', async () => {
    const engine = vi.fn(async () => {
      throw new Error('must not execute');
    });
    const origin = await start(blockedRuntime(engine));

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer face-handoff-secret',
          'content-type': 'application/json',
        },
        body: JSON.stringify(BLOCKED_REQUEST),
      },
    );

    expect(response.status).toBe(200);
    expect(engine).not.toHaveBeenCalled();
    expect(
      response.headers.get(
        FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_HEADER,
      ),
    ).toBe(
      FACE_GOVERNED_HANDOFF_HTTP_ADMISSION_VERSION,
    );
    expect(await response.json()).toEqual(
      expect.objectContaining({
        state: 'not_eligible',
        reason: 'source_blocked',
        topicKey: 'face.reading.three_divisions',
      }),
    );
  });

  it('returns 400 for authority-bearing caller scope injection before providers', async () => {
    const execute = vi.fn(
      blockedRuntime().execute,
    );
    const origin = await start({ execute });

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer face-handoff-secret',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          ...BLOCKED_REQUEST,
          authorityReceipt: {},
        }),
      },
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        state: 'failed',
        stage: 'request',
        errorCode:
          'FACE_GOVERNED_HANDOFF_REQUEST_SCOPE_VIOLATION',
      }),
    );
  });

  it('returns the exact TEST ONLY governed source handoff without semantic transport rewrite', async () => {
    const { source, host } =
      syntheticRuntime();
    const origin = await start(host);

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer face-handoff-secret',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          topicKey: source.plan.topicKey,
          observationArtifactRef:
            source.plan.observationArtifactRef,
          requestId: source.plan.requestId,
        }),
      },
    );

    expect(response.status).toBe(200);
    const body = await response.json() as {
      state?: unknown;
      handoff?: {
        units?: readonly unknown[];
        handoffHash?: unknown;
      };
    };
    expect(body.state).toBe('eligible');
    expect(body.handoff?.units).toEqual(
      source.receipt.semanticClaims.map(
        (claim) => claim.governedInterpretation,
      ),
    );
    expect(body.handoff?.handoffHash).toMatch(
      /^face-governed-interpretation:/u,
    );
  });

  it('maps trusted source engine transport failure separately from domain ineligibility', async () => {
    const { source, host } =
      syntheticRuntime({
        engineThrows: true,
      });
    const origin = await start(host);

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'POST',
        headers: {
          authorization: 'Bearer face-handoff-secret',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          topicKey: source.plan.topicKey,
          observationArtifactRef:
            source.plan.observationArtifactRef,
          requestId: source.plan.requestId,
        }),
      },
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual(
      expect.objectContaining({
        state: 'failed',
        stage: 'engine',
        errorCode:
          'FACE_GOVERNED_HANDOFF_ENGINE_PROVIDER_FAILED',
      }),
    );
  });

  it('requires POST on the governed Face route', async () => {
    const origin = await start();

    const response = await fetch(
      `${origin}${FACE_GOVERNED_HANDOFF_HTTP_PATH}`,
      {
        method: 'GET',
        headers: {
          authorization: 'Bearer face-handoff-secret',
        },
      },
    );

    expect(response.status).toBe(405);
    expect(response.headers.get('allow')).toBe('POST');
  });
});
