# Rejestr zależności

**Weryfikacja:** 2026-07-25. Wersje są dokładne w manifestach i lockfile.
Główne licencje runtime są MIT; natywny `sharp` oraz Playwright używają
Apache-2.0, a axe MPL-2.0.

| Zależność                                               | Rola                             | Ocena utrzymania i wpływu                                                                           |
| ------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Node 24.18.0 LTS                                        | runtime i CI                     | aktywna linia LTS; nie trafia do bundle                                                             |
| pnpm 11.17.0                                            | workspace i supply-chain policy  | aktywnie rozwijany; tylko tooling                                                                   |
| turbo 2.10.6                                            | graf zadań i cache               | utrzymywany przez Vercel; tylko tooling                                                             |
| next 16.2.11                                            | web, API i build                 | Active LTS z lipcową poprawką bezpieczeństwa; framework server/client, kontrolować bundle per route |
| react/react-dom 19.2.8                                  | renderer Next.js                 | aktywna stabilna linia; klient tylko tam, gdzie komponent wymaga interakcji                         |
| zod 4.4.3                                               | walidacja env, flow i estymacji  | aktywnie utrzymywany; współdzielony przez config i domenę flow, mały wpływ runtime                  |
| TypeScript 6.0.3                                        | strict typecheck/build           | dobrany do zakresu peer `typescript-eslint <6.1`; tylko tooling                                     |
| ESLint 9.39.5 + config Next 16.2.11                     | lint JS/TS/React/Next/a11y       | ESLint 10 nie jest jeszcze wspierany przez pluginy Next; tylko tooling                              |
| Prettier 3.9.6 + eslint-config-prettier 10.1.8          | deterministyczny format          | tylko tooling                                                                                       |
| Vitest 4.1.10                                           | unit/smoke tests                 | wspierana stabilna linia; tylko test                                                                |
| rimraf 6.1.3                                            | przenośne czyszczenie artefaktów | mały pakiet tooling                                                                                 |
| `@types/*`                                              | typy Node/React                  | dopasowane do runtime; tylko tooling                                                                |
| Testing Library 16.3.2 / DOM 10.4.1 / user-event 14.6.1 | testy zachowania UI              | MIT; tylko test, bez wpływu na bundle                                                               |
| jsdom 29.1.1                                            | środowisko DOM dla Vitest        | MIT; tylko test                                                                                     |
| Playwright Test 1.61.0                                  | keyboard i visual regression     | Apache-2.0; tylko test i CI, pobiera Chromium                                                       |
| `@axe-core/playwright` 4.12.1                           | automatyczny audyt WCAG          | MPL-2.0; tylko test i CI                                                                            |
| `@supabase/supabase-js` 2.110.8                         | Auth, PostgREST i Storage        | MIT; klient panelu, skonfigurowany wyłącznie publishable key i ograniczony przez RLS                |
| `@supabase/ssr` 0.12.3                                  | cookies i sesja Auth w Next.js   | MIT; mały adapter SSR; API nadal wymaga uwagi przy aktualizacjach                                   |

`@wyceno/widget` nie dodaje zależności runtime. Używa natywnych Custom
Elements, Shadow DOM, Fetch i Web Storage. Istniejące `jsdom` oraz Playwright
obsługują testy; świadomie nie dodano Preacta. Build mierzy cały JavaScript
artefaktu po Etapie 8: około 13,9 KiB gzip przy limicie 90 KiB.

`@wyceno/email` również nie dodaje zależności runtime. Adapter Resend używa
natywnego `fetch` i jawnego kontraktu REST zamiast SDK, więc nie zwiększa
klienckiego bundle i pozostaje wymienny. Provider jest opcjonalny i wyłączony,
dopóki `EMAIL_DELIVERY_MODE=resend`, klucz API oraz zatwierdzenie
prywatności/transferów nie są dostępne.

`@wyceno/analytics` używa już obecnego `zod@4.4.3` do strict walidacji
kontraktu i nie dodaje nowej zewnętrznej zależności ani SDK trackera. Widget
korzysta z własnego małego klienta fetch; po Etapie 9 cały artefakt ma około
15,5 KiB gzip przy limicie 90 KiB.

Etap 10 nie dodaje zależności. Marketing korzysta z Next.js Metadata API,
Server Components, natywnego HTML/CSS oraz istniejącego Playwright/axe. Mały
fragment demo używa Reacta już dostarczanego przez aplikację; nie dodano CMS-a,
biblioteki animacji, ikon, analityki marketingowej ani generatora schema.

## Skrypty instalacyjne

- `sharp@0.35.3`: natywny backend optymalizacji obrazów używany przez Next.js; allowlistowany.
- `unrs-resolver@1.12.2`: natywny resolver używany przez tooling lint; allowlistowany.

Inne skrypty są domyślnie blokowane przez pnpm. `dangerouslyAllowAllBuilds` jest zabronione.

`@supabase/auth-js@2.110.8` ma wąski patch deklaracji WebAuthn opisany w
`ADR-013`. Patch nie zmienia runtime. Aktualizacja klienta Supabase wymaga
sprawdzenia typów bez `skipLibCheck` i usunięcia patcha, gdy upstream jest
zgodny.

## Security overrides Etapu 12

Audit z 2026-07-25 wykrył high w wersjach przypiętych tranzytywnie przez
Next.js i tooling. Do czasu aktualizacji zakresów upstream workspace wymusza:

- `sharp@0.35.3` zamiast 0.34.5 — poprawka GHSA-f88m-g3jw-g9cj;
- `postcss@8.5.22` zamiast 8.4.31 — poprawki GHSA-6g55-p6wh-862q oraz
  GHSA-r28c-9q8g-f849;
- `brace-expansion@5.0.8` dla wszystkich gałęzi — poprawka
  GHSA-mh99-v99m-4gvg.

Override nie wyłącza audytu ani nie ignoruje advisory. Pełny gate sprawdza
zgodność API transitive dependency. `brace-expansion@5.0.8` ma dodatkowo wąski
patch CommonJS: zachowuje bezpieczny algorytm i limit ekspansji z 5.0.8, ale
udostępnia jednocześnie historyczny callable export dla `minimatch@3` oraz
named export `expand` dla `minimatch@10`. Patch należy usunąć, gdy cały łańcuch
pluginów ESLint przejdzie na zgodne API `minimatch@10`. Przy aktualizacji
Next.js/ESLint należy usunąć każdy override, który stał się zbędny, zamiast
utrzymywać go bezterminowo.

Ponowny `pnpm security:dependencies` po remediacji zwraca
`No known vulnerabilities found`.

## Aktualizacje

Dependabot otwiera cotygodniowe PR-y dla npm i GitHub Actions. Aktualizacja wymaga lockfile, peer check, audytu, pełnego gate’u i przeglądu changelogu/security advisory. Nowy pakiet wymaga wpisu tutaj.
