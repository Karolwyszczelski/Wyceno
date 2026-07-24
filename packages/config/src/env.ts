import { z } from "zod";

const nonEmptySecret = z.string().trim().min(1);

export const clientEnvSchema = z
  .object({
    NEXT_PUBLIC_POSTHOG_KEY: nonEmptySecret.optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: nonEmptySecret.optional(),
    NEXT_PUBLIC_SUPABASE_URL: z.url().optional(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: nonEmptySecret.optional(),
    NEXT_PUBLIC_WIDGET_ORIGIN: z.url(),
  })
  .strict();

export const serverEnvSchema = z
  .object({
    APP_URL: z.url(),
    DATABASE_URL: nonEmptySecret.optional(),
    EMAIL_FROM: z.email().optional(),
    POSTHOG_HOST: z.url().optional(),
    RESEND_API_KEY: nonEmptySecret.optional(),
    SENTRY_DSN: z.url().optional(),
    SUPABASE_SERVICE_ROLE_KEY: nonEmptySecret.optional(),
    TURNSTILE_SECRET_KEY: nonEmptySecret.optional(),
    WEBHOOK_SIGNING_SECRET: nonEmptySecret.optional(),
  })
  .strict();

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseClientEnv(input: unknown): ClientEnv {
  return clientEnvSchema.parse(input);
}

export function parseServerEnv(input: unknown): ServerEnv {
  return serverEnvSchema.parse(input);
}
