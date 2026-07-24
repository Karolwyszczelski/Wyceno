# Wyceno

Wyceno jest projektowanym SaaS-em do interaktywnej kwalifikacji i orientacyjnej
wyceny leadów dla firm usługowych. Discovery i fundament techniczny są
udokumentowane, a Etap 2 dostarcza dostępną warstwę UI oraz wewnętrzny showcase.
Repozytorium nie zawiera jeszcze auth, bazy ani funkcji produktu.

Nazwa „Wyceno” jest robocza i nie została prawnie zweryfikowana. Nie używaj jej jako potwierdzonego znaku ani nie kupuj materiałów marketingowych przed badaniem prawnym i domenowym opisanym w `docs/RISKS.md`.

## Zacznij tutaj

1. `AGENTS.md` — obowiązkowe zasady każdej sesji.
2. `docs/PRODUCT_VISION.md` — problem i pozycjonowanie.
3. `docs/SCOPE.md` oraz `docs/NON_GOALS.md` — granice MVP.
4. `docs/ASSUMPTIONS_AND_OPEN_QUESTIONS.md` — jawne założenia i decyzje właściciela.
5. `docs/ARCHITECTURE.md` — docelowa architektura.
6. `docs/TASKS.md` — etapowy backlog i gate’y.
7. `docs/DEVELOPMENT.md` — bootstrap, komendy i troubleshooting.
8. `docs/DEPENDENCIES.md` — decyzje o wersjach i supply chain.

## Status

Etap 2 obejmuje tokeny, bazowe komponenty, layout panelu i stany UI. Lokalne
testy obejmują kontrast, klawiaturę, axe, reduced motion oraz visual regression.
CI i secret scan są skonfigurowane, ale ich pierwszy rzeczywisty przebieg nadal
wymaga umieszczenia repozytorium na GitHubie.

## Uruchomienie

```bash
npm install --global pnpm@11.17.0
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Szczegóły i wymagania Node znajdują się w `docs/DEVELOPMENT.md`.

## Struktura

```text
apps/web                 panel, API i marketing w Next.js
apps/widget-demo         izolowane środowisko integracyjne widgetu
apps/wordpress-plugin    wtyczka konektorowa WordPress
packages/ui              tokeny i komponenty
packages/widget          renderer publicznego procesu
packages/database        schemat, klient i kontrakty danych
packages/validation      współdzielone schematy wejścia
packages/email           e-maile transakcyjne
packages/analytics       kontrakty eventów
packages/config          konfiguracja narzędzi
packages/types           typy domenowe bez zależności runtime
packages/testing         fabryki i narzędzia testowe
supabase                 migracje, seed i funkcje
docs                     dokumentacja źródłowa
```

## Zasady

Nie instaluj zależności ani nie implementuj funkcji poza aktywnym etapem. Sekrety trafiają wyłącznie do lokalnego `.env.local`; kontrakt znajduje się w `.env.example` i `@wyceno/config`.
# Wyceno
