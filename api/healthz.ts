import { PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION } from '../src/host/production-calculation-http-contract.js';

const GET_METHOD = 'GET' as const;

export default {
  fetch(request: Request): Response {
    if (request.method !== GET_METHOD) {
      return new Response(null, {
        status: 405,
        headers: {
          Allow: GET_METHOD,
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        },
      });
    }

    return Response.json(
      {
        status: 'ok',
        hostVersion: PRODUCTION_CALCULATION_HTTP_RESPONSE_SCHEMA_VERSION,
      },
      {
        headers: {
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        },
      },
    );
  },
};
