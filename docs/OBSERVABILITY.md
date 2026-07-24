# Obserwowalność

## Sygnały

- structured logs z `request_id`, route, status, latency, tenant ID w formie technicznej i bez treści odpowiedzi;
- error tracking z redakcją PII;
- metryki: request rate/error/latency, submit success, e-mail delivery, webhook queue, cron, storage i DB;
- tracing dla submit → lead → notification;
- health/liveness i osobna readiness zależności krytycznych.

## Alerty

Krytyczne: trwała niemożność submitu, podejrzenie tenant leakage, kolejka bez postępu, utrata bazy. Wysokie: skok 5xx, e-mail/webhook failure rate, błędy widgetu. Każdy alert ma właściciela, runbook i próg oparty na wpływie.

## Prywatność

Nie logujemy nazw, e-maili, telefonów, odpowiedzi, pełnych IP ani URL-i z parametrami. Sentry/PostHog wymagają allowlisty pól i testu redakcji.
