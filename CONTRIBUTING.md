# Współpraca

## Przed rozpoczęciem

Przeczytaj `AGENTS.md`, `docs/TASKS.md` i dokumenty domenowe. Utwórz małą gałąź odnoszącą się do jednego etapu lub zadania. Nie mieszaj refaktoryzacji niezwiązanych z zakresem.

## Zmiana

- Opisz problem, kryteria akceptacji i ryzyka.
- Dla decyzji architektonicznej dodaj ADR do `docs/DECISIONS.md`.
- Dla nowej zależności zapisz cel, alternatywy, stan utrzymania, licencję i wpływ na klienta.
- Dodaj testy na ścieżkę pozytywną, błędy i granice uprawnień.
- Nie umieszczaj w commitach sekretów ani danych osobowych.

## Weryfikacja

Obowiązkowe komendy:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Użyj Node 24.18.0 z `.node-version`; pnpm przypina ten runtime również w lockfile. Każda zmiana musi przejść wszystkie komendy lokalnie i w CI. Nie wyłączaj reguł ani testów, aby uzyskać zielony wynik.

## Pull request

PR powinien opisywać zakres, decyzje, testy, ryzyka, migracje i rollback. Review obejmuje funkcjonalność, bezpieczeństwo, tenant isolation, prywatność, dostępność, wydajność i spójność dokumentacji.
