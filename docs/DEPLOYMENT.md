# Wdrożenie

## Środowiska

Local, preview bez danych produkcyjnych, staging z syntetycznym seedem, production. Osobne projekty bazy, storage, klucze i dostawcy. Preview nie łączy się z produkcją.

## Pipeline

Install z frozen lockfile → lint → typecheck → unit/integration → build → security checks → artefakt immutable → migracja expand → deploy → smoke test → obserwacja → contract/cleanup w późniejszym release.

## Migracje

Każda ma forward plan, kompatybilność z poprzednią wersją aplikacji, backup/restore point i udokumentowany rollback. Destrukcyjne zmiany stosują expand/contract. Wdrożonego pliku migracji nie edytujemy.

## Rollback

Rollback aplikacji przez poprzedni artefakt; rollback danych preferuje migrację naprawczą. Feature flags nie mogą omijać autoryzacji. Produkcja wymaga checklisty z `RELEASE_CHECKLIST.md`.
