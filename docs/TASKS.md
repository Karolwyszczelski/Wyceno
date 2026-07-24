# Backlog etapowy

Statusy: `[x]` ukończone i zweryfikowane, `[ ]` nierozpoczęte, `[~]` w toku, `[!]` zablokowane. W danej sesji realizuj wyłącznie jeden etap.

## Etap 0 — Discovery

- [x] Zdefiniować problem, odbiorców, JTBD i ścieżki.
- [x] Ustalić scope MVP i non-goals.
- [x] Opisać architekturę, model danych, autoryzację, API i widget.
- [x] Opisać bezpieczeństwo, prywatność, obserwowalność, deployment i backup.
- [x] Ustalić zasady designu, IA, dostępności i content design.
- [x] Przygotować strategię marketingową, SEO, analitykę i CRO.
- [x] Przeprowadzić źródłowy desk research konkurencji na 2026-07-23.
- [x] Przygotować mapę słów kluczowych bez wymyślonych wolumenów i CSV do eksportu.
- [x] Udokumentować wstępną walidację nazwy oraz ostrzeżenie prawne.
- [x] Utworzyć roadmapę, ryzyka, QA, release i post-launch.

**Gate:** kompletność plików sprawdzona automatycznie; spójność wewnętrzna sprawdzona. Przed Etapem 1 wymagany review właściciela produktu: zatwierdzenie zakresu MVP, rynku PL, modularnego monolitu i roboczego użycia nazwy. Badanie prawne nazwy nie blokuje technicznego Etapu 1, ale blokuje publiczny launch i wydatki brandingowe.

## Etap 1 — Fundament repozytorium

- [x] Zainicjalizować pnpm workspace i Turborepo z `packageManager` przypiętym do stabilnej wersji.
- [x] Utworzyć minimalne katalogi `apps/*`, `packages/*`, `supabase/*` bez ekranów i funkcji Etapu 2+.
- [x] Dodać współdzielone konfiguracje TypeScript strict (`noUncheckedIndexedAccess`, bez nieuzasadnionego `any`).
- [x] Dodać ESLint bez wyłączeń projektu oraz Prettier z kontrolą formatowania.
- [x] Dodać Vitest i jeden rzeczywisty test smoke na pakiet, nie test atrapę.
- [x] Dodać minimalny build aplikacji/artefaktów, który nie implementuje UI produktu.
- [x] Dodać walidację env z rozdzieleniem server/client/test i bez sekretów publicznych.
- [x] Dodać skrypty root: `lint`, `format:check`, `typecheck`, `test`, `build`.
- [x] Dodać CI: frozen install, lint, format check, typecheck, test, build i cache.
- [x] Dodać `.gitignore`, politykę Node/pnpm, Dependabot/Renovate po decyzji oraz skan sekretów.
- [x] Udokumentować bootstrap, zależności, wersje, decyzje i troubleshooting.
- [x] Uruchomić baseline i zaktualizować `CHANGELOG.md` oraz ten backlog.

**Gate:** czysty checkout po instalacji przechodzi `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test`, `pnpm build` lokalnie i w CI. Brak implementacji tokenów, komponentów, auth, bazy i ekranów.

**Status gate’u 2026-07-24:** lokalne komendy i frozen/offline install przechodzą na przypiętym Node 24.18.0. Produkcyjny artefakt standalone przeszedł smoke test `GET /health` (HTTP 200). Konfiguracja CI jest gotowa; formalne zamknięcie zdalnej części gate’u oczekuje na pierwszy zielony przebieg GitHub Actions po podłączeniu remote. Właściciel produktu polecił kontynuować kolejne etapy mimo tego zewnętrznego ograniczenia.

## Etap 2 — Design foundation

- [x] Zweryfikować kontrasty i zatwierdzić tokeny przez ADR.
- [x] Zbudować bazowe komponenty i layout panelu.
- [x] Dodać stany loading/empty/error i dokumentację komponentów.
- [x] Testy klawiatury, axe, visual regression i reduced motion.

**Gate:** visual review, brak domyślnego wyglądu biblioteki i pełna klawiatura.

**Status gate’u 2026-07-24:** lokalnie zielony. Visual review wykonany dla
desktopu 1440 px i mobile 390 px; Playwright potwierdza baseline’y, klawiaturę,
reduced motion i brak naruszeń axe WCAG A/AA. Automatyczne testy nie zastępują
ręcznego VoiceOver/NVDA przed release. Zdalny przebieg rozszerzonego CI oczekuje
na repozytorium GitHub. Etap 3 pozostaje nierozpoczęty.

## Etap 3 — Baza i auth

- [ ] Schemat, migracje, seed syntetyczny, Auth, organizacje i członkostwa.
- [ ] Role Owner/Admin/Sales, tenant context i RLS.
- [ ] Audit log bazowych operacji i testy IDOR.

**Gate:** automatyczny test separacji dwóch tenantów dla odczytu, zapisu i plików.

## Etap 4 — Flow domain

- [ ] Draft, kroki, opcje, reguły, wynik, wersjonowanie i publikacja.
- [ ] Walidator martwych ścieżek/pętli.
- [ ] Pięć realnych szablonów, trzy priorytetowe dopracowane.

**Gate:** możliwe utworzenie, walidacja i publikacja niezmiennej wersji.

## Etap 5 — Widget

- [ ] Loader/custom element, state machine, manifest i hosted link.
- [ ] Sesje, autosave, wznowienie, odpowiedzi, warunki i walidacja.
- [ ] Inline/popup/fullscreen, Shadow DOM, mobile i klawiatura.

**Gate:** pełny działający proces bez pricingu, odporny na CSS hosta i utratę sieci.

## Etap 6 — Pricing i scoring

- [ ] Ograniczony model reguł, serwerowy pricing min/max i formatowanie.
- [ ] Deterministyczny scoring, kategorie i lista uruchomionych reguł.
- [ ] Testy granic, kolejności, walut, zaokrągleń i manipulacji klienta.

**Gate:** deterministyczne wyniki i explainability dla wszystkich fixture’ów.

## Etap 7 — Lead pipeline

- [ ] Contact/consent, idempotentny submit, lead i odpowiedzi.
- [ ] Bezpieczny upload, lista/szczegóły, status, historia i notatki.
- [ ] Mobile i kontrola ról.

**Gate:** klient wysyła lead, firma widzi go i zmienia status bez tenant leakage.

## Etap 8 — Powiadomienia

- [ ] Szablony HTML/text dla firmy i klienta.
- [ ] Outbox, delivery status, retry i test mode.

**Gate:** render, accessibility i test dostawy bez PII w logach.

## Etap 9 — Analityka

- [ ] Wersjonowane eventy, consent, agregacje i retencja.
- [ ] Dashboard, drop-off, źródła/urządzenia i progi małej próby.

**Gate:** metryki zgadzają się z kontrolnymi sesjami E2E.

## Etap 10 — Landing i SEO

- [ ] Strona główna, produkt, agencje, WordPress, cennik jako zatwierdzony model.
- [ ] Pięć stron branżowych i główne strony funkcyjne.
- [ ] Metadata, canonical, sitemap, robots, schema, 404/500 i link check.

**Gate:** crawl, noindex panelu, accessibility, performance budgets i content review.

## Etap 11 — WordPress

- [ ] Bezpieczne połączenie, lista flow, shortcode, Gutenberg, popup i diagnostyka.
- [ ] Capability/nonce, escaping, odłączenie i compatibility matrix.

**Gate:** test na wspieranych WP/PHP, brak sekretu we froncie i brak globalnych konfliktów.

## Etap 12 — Security i compliance

- [ ] Threat model review, SAST/DAST/dependency/secret scan i testy IDOR/XSS/upload/rate limit/replay.
- [ ] Retencja, eksport, anonimizacja/usunięcie, DPA/subprocesorzy po review prawnym.
- [ ] Naprawić wszystkie critical/high; zaakceptowane medium mają właściciela i termin.

**Gate:** udokumentowany audyt bez krytycznych ustaleń.

## Etap 13 — Produkcja

- [ ] Staging, smoke/E2E, migracje, backup restore drill, alerty i runbooki.
- [ ] Rollback rehearsal, DNS/domains po walidacji nazwy, release approval.

**Gate:** wszystkie pozycje `RELEASE_CHECKLIST.md`, zatwierdzona nazwa i gotowość operacyjna.
