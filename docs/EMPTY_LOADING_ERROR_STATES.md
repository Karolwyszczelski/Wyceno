# Stany empty, loading i error

## Zasada

Każdy stan mówi: co użytkownik widzi, dlaczego i co może zrobić. Skeleton zachowuje układ i nie symuluje danych, których nie będzie.

## Przykłady

| Obszar    | Empty                                   | Error                            | Działanie                    |
| --------- | --------------------------------------- | -------------------------------- | ---------------------------- |
| Leady     | „Nie ma jeszcze leadów z tego procesu.” | „Nie udało się pobrać leadów.”   | Otwórz test / ponów          |
| Analityka | „Za mało danych dla wykresu.”           | „Nie udało się obliczyć okresu.” | Zmień okres / ponów          |
| Builder   | „Dodaj pierwszy krok.”                  | „Draft ma konflikt wersji.”      | Dodaj / odśwież i porównaj   |
| Widget    | „Proces jest niedostępny.”              | „Nie zapisaliśmy odpowiedzi.”    | Kontakt alternatywny / ponów |

Loading nie blokuje całego panelu, jeśli można zachować ostatnie bezpieczne dane. Error boundary nie ujawnia stack trace ani identyfikatorów tenantów.
