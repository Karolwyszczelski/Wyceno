# Plan QA

## Piramida

- unit: conditional logic, pricing, scoring, walidacja, permissions, formatowanie i HMAC;
- integration: flow/version/publish, sesja/lead/upload/e-mail, RLS i status;
- E2E: rejestracja → szablon → edycja → publikacja → widget → lead → status;
- security: IDOR, tenant leakage, XSS, injection, upload bypass, rate limit, replay i role;
- visual/accessibility: landing, widget, dashboard, builder, lead details i WordPress preview.

## Macierz krytyczna

Desktop + mobile, keyboard-only, wolna/utracona sieć, retry, dwie zakładki, expired session, zły plik, duplicate submit, edycja podczas sesji i próba innego tenanta.

## Dane

Wyłącznie syntetyczne fabryki i seed oznaczony demo. Testy tenant isolation zawsze używają co najmniej dwóch organizacji. Brak snapshotów z PII.

## CI

Lint, format, strict typecheck, unit/integration i build na PR. E2E krytyczne na PR lub merge zgodnie z czasem; pełna macierz i security przed release. Flaky test jest defektem: naprawa lub kwarantanna z właścicielem i terminem, nigdy ciche pominięcie.
