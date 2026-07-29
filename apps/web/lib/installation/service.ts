import {
  assertCapability,
  assertTenantResource,
  AuthorizationError,
  type TenantContext,
} from "@wyceno/database";

import { createClient } from "../supabase/server";

export type FlowInstallation = Readonly<{
  flowId: string;
  flowName: string;
  lastWidgetOpenedAt: string | null;
  organizationName: string;
  publicId: string | null;
  publishedAt: string | null;
  wordpressConnection: Readonly<{
    lastSeenAt: string;
    siteOrigin: string;
  }> | null;
}>;

export async function getFlowInstallation(
  context: TenantContext,
  flowId: string,
): Promise<FlowInstallation> {
  assertCapability(context, "flow:read");
  const supabase = await createClient();
  const [organizationResult, flowResult, publishedResult, eventResult, wordpressResult] =
    await Promise.all([
      supabase.from("organizations").select("name").eq("id", context.organizationId).maybeSingle(),
      supabase
        .from("flows")
        .select("id, organization_id, name")
        .eq("id", flowId)
        .eq("organization_id", context.organizationId)
        .maybeSingle(),
      supabase
        .from("published_flows")
        .select("public_id, published_at")
        .eq("flow_id", flowId)
        .eq("organization_id", context.organizationId)
        .maybeSingle(),
      supabase
        .from("session_events")
        .select("occurred_at")
        .eq("flow_id", flowId)
        .eq("organization_id", context.organizationId)
        .eq("name", "widget_opened")
        .order("occurred_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("wordpress_connections")
        .select("site_origin, last_seen_at")
        .eq("organization_id", context.organizationId)
        .is("revoked_at", null)
        .order("last_seen_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

  if (flowResult.error || !flowResult.data) {
    throw new AuthorizationError("NOT_FOUND", "Resource not found.");
  }
  assertTenantResource(context, flowResult.data.organization_id);

  if (
    organizationResult.error ||
    !organizationResult.data ||
    publishedResult.error ||
    eventResult.error ||
    wordpressResult.error
  ) {
    throw new Error("Nie udało się pobrać danych instalacji.");
  }

  return {
    flowId: flowResult.data.id,
    flowName: flowResult.data.name,
    lastWidgetOpenedAt: eventResult.data?.occurred_at ?? null,
    organizationName: organizationResult.data.name,
    publicId: publishedResult.data?.public_id ?? null,
    publishedAt: publishedResult.data?.published_at ?? null,
    wordpressConnection: wordpressResult.data
      ? {
          lastSeenAt: wordpressResult.data.last_seen_at,
          siteOrigin: wordpressResult.data.site_origin,
        }
      : null,
  };
}
