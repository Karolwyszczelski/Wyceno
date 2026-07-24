import { describe, expect, it } from "vitest";

import { parseClientEnv, parseServerEnv } from "./env";

describe("environment validation", () => {
  it("keeps the browser contract limited to explicitly public values", () => {
    expect(
      parseClientEnv({
        NEXT_PUBLIC_POSTHOG_KEY: "public-project-key",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: "public-anon-key",
        NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "public-site-key",
        NEXT_PUBLIC_WIDGET_ORIGIN: "https://widget.wyceno.test",
      }),
    ).toEqual({
      NEXT_PUBLIC_POSTHOG_KEY: "public-project-key",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "public-anon-key",
      NEXT_PUBLIC_SUPABASE_URL: "https://project.supabase.co",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "public-site-key",
      NEXT_PUBLIC_WIDGET_ORIGIN: "https://widget.wyceno.test",
    });

    expect(() =>
      parseClientEnv({
        NEXT_PUBLIC_WIDGET_ORIGIN: "https://widget.wyceno.test",
        SUPABASE_SERVICE_ROLE_KEY: "must-not-be-public",
      }),
    ).toThrow();
  });

  it("rejects invalid server URLs and accepts feature-specific secrets as optional", () => {
    expect(() => parseServerEnv({ APP_URL: "not-a-url" })).toThrow();
    expect(parseServerEnv({ APP_URL: "https://app.wyceno.test" })).toEqual({
      APP_URL: "https://app.wyceno.test",
    });
  });
});
