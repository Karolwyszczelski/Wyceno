# Release checklist

## Produkt i jakość

- [ ] Kryteria MVP i aktywnego etapu spełnione.
- [ ] Lint, format, typecheck, test, build i E2E zielone na immutable commit.
- [ ] Accessibility, mobile, visual i performance review.
- [ ] Brak atrap, fałszywych dowodów i danych demonstracyjnych bez oznaczenia.

## Dane i bezpieczeństwo

- [ ] RLS/IDOR/role/upload/rate-limit/webhook tests.
- [ ] Sekrety, CSP/headers, dependencies i log redaction sprawdzone.
- [ ] Migracja, backup, restore i rollback przećwiczone.
- [ ] Retencja, eksport/usunięcie, DPA, subprocesorzy i incident contacts zatwierdzone.

## Operacje

- [ ] Monitoring, alerty, runbooki, health, e-mail/webhook delivery.
- [ ] Support owner i komunikacja incydentu.
- [ ] Smoke test staging i production.

## Marketing i prawo

- [ ] Nazwa i domeny prawnie/operacyjnie zatwierdzone.
- [ ] Canonical/sitemap/robots/noindex/schema/404/500/link check.
- [ ] Regulamin, privacy i cookies zatwierdzone przez uprawnioną osobę.
- [ ] Brak fikcyjnych opinii, wyników lub review schema.
