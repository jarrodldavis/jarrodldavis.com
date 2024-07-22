export const runtime = "edge";

// https://github.com/getsentry/spotlight/issues/275
// https://github.com/getsentry/spotlight/blob/a8c09cd8629677ab3eed4bf7000de4c7068538ee/packages/overlay/src/integrations/sentry/sentry-integration.ts#L63-L71
export function PUT() {
  return Response.json({}, { status: 201 });
}
