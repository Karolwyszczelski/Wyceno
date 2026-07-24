# Changelog

Wszystkie istotne zmiany projektu będą dokumentowane w tym pliku.

## [Unreleased]

### Added

- Etap 0: komplet dokumentacji Discovery, architektury, UX, SEO, bezpieczeństwa, QA i realizacji.
- Nadrzędne zasady pracy w `AGENTS.md`.
- Etapowy backlog z gate’ami w `docs/TASKS.md`.
- Etap 1: pnpm/Turborepo monorepo, Node 24.18.0 LTS, strict TypeScript, ESLint, Prettier i Vitest.
- Minimalna aplikacja Next.js 16.2.11 z `GET /health`.
- Powtarzalny typecheck Next.js po czyszczeniu (`next typegen`) i uruchamianie
  produkcyjnego artefaktu standalone.
- Ścisła walidacja publicznego i serwerowego środowiska w `@wyceno/config`.
- GitHub Actions dla pełnego quality gate i skanowania sekretów oraz Dependabot.
- Polityki supply chain: exact versions, lockfile, release age, strict peers i allowlista build scripts.
- Etap 2: zatwierdzone tokeny, dostępna biblioteka `@wyceno/ui`, responsywny
  layout panelu i strona weryfikacyjna `/design-system`.
- Testy kontrastu, zachowania komponentów, axe, klawiatury, reduced motion oraz
  visual regression dla desktopu i mobile.

### Not implemented

- Brak bazy, auth i funkcji produktu; należą do Etapów 3+.
- Zdalny przebieg GitHub Actions oczekuje na utworzenie/podłączenie repozytorium.
