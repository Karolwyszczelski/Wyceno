import { createHash, timingSafeEqual } from "node:crypto";

import { processConfiguredNotificationBatch } from "../../../../../../lib/notifications/worker";

export const runtime = "nodejs";

const privateNoStoreHeaders = { "Cache-Control": "private, no-store" };

function authorized(request: Request): boolean {
  const configured = process.env.NOTIFICATION_WORKER_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!configured || configured.length < 32 || !supplied) return false;
  const expectedHash = createHash("sha256").update(configured).digest();
  const suppliedHash = createHash("sha256").update(supplied).digest();
  return timingSafeEqual(expectedHash, suppliedHash);
}

export async function POST(request: Request): Promise<Response> {
  if (!authorized(request)) {
    return Response.json(
      { error: { code: "UNAUTHORIZED", message: "Brak dostępu do workera." } },
      { headers: privateNoStoreHeaders, status: 401 },
    );
  }
  try {
    const result = await processConfiguredNotificationBatch();
    return Response.json(result, {
      headers: privateNoStoreHeaders,
    });
  } catch {
    return Response.json(
      {
        error: {
          code: "NOTIFICATION_PROCESSING_FAILED",
          message: "Nie udało się przetworzyć kolejki.",
        },
      },
      { headers: privateNoStoreHeaders, status: 503 },
    );
  }
}
