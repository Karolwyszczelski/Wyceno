# Rejestr zależności

**Weryfikacja:** 2026-07-24. Wersje są dokładne w manifestach i lockfile.
Licencje runtime są MIT; narzędzia testowe Playwright i axe używają odpowiednio
Apache-2.0 i MPL-2.0.

| Zależność                                               | Rola                             | Ocena utrzymania i wpływu                                                                           |
| ------------------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| Node 24.18.0 LTS                                        | runtime i CI                     | aktywna linia LTS; nie trafia do bundle                                                             |
| pnpm 11.17.0                                            | workspace i supply-chain policy  | aktywnie rozwijany; tylko tooling                                                                   |
| turbo 2.10.6                                            | graf zadań i cache               | utrzymywany przez Vercel; tylko tooling                                                             |
| next 16.2.11                                            | web, API i build                 | Active LTS z lipcową poprawką bezpieczeństwa; framework server/client, kontrolować bundle per route |
| react/react-dom 19.2.8                                  | renderer Next.js                 | aktywna stabilna linia; klient tylko tam, gdzie komponent wymaga interakcji                         |
| zod 4.4.3                                               | runtime validation env           | aktywnie utrzymywany; obecnie tylko pakiet config, mały wpływ runtime                               |
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

## Skrypty instalacyjne

- `sharp@0.34.5`: natywny backend optymalizacji obrazów używany przez Next.js; allowlistowany.
- `unrs-resolver@1.12.2`: natywny resolver używany przez tooling lint; allowlistowany.

Inne skrypty są domyślnie blokowane przez pnpm. `dangerouslyAllowAllBuilds` jest zabronione.

## Aktualizacje

Dependabot otwiera cotygodniowe PR-y dla npm i GitHub Actions. Aktualizacja wymaga lockfile, peer check, audytu, pełnego gate’u i przeglądu changelogu/security advisory. Nowy pakiet wymaga wpisu tutaj.
