# Specyfikacja ekranów Lorum

**Status:** kanoniczny dla zakresu UI  
**Ostatni przegląd:** 2026-07-27

Dokument łączy zatwierdzony zakres produktu z obrazami V6. Referencja określa
kompozycję i zachowanie responsywne, ale nie tworzy nowej funkcji, roli, danych
ani uprawnienia.

## Marketing

Docelowa strona główna zachowuje kolejność:

1. nawigacja;
2. hero: odpowiedzi klienta → uporządkowany lead;
3. pasek sześciu grup danych;
4. problem zwykłego formularza i rezultat Lorum;
5. cztery kroki działania;
6. bezstanowe, działające demo procesu;
7. dopasowanie procesu do branży;
8. kwalifikacja → wycena → podsumowanie → obsługa → analiza;
9. instalacja i WordPress;
10. model pracy firmy i agencji;
11. dowody metodologii i bezpieczeństwa;
12. uczciwy zakres pilotażu bez zatwierdzonych kwot;
13. FAQ o rzeczywistych ograniczeniach;
14. końcowe CTA do istniejącej trasy;
15. footer.

ADR-027 ogranicza bieżącą implementację do `/`. Pozostałe trasy marketingowe
zachowują własne kompozycje do czasu osobnego etapu.

## Ekrany MVP

| Obszar      | Wymagany ekran lub stan                                            | Ograniczenie                                                    |
| ----------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| Auth        | logowanie, callback, błędy sesji                                   | bez publicznego cache panelu                                    |
| Onboarding  | organizacja, wybór szablonu lub pustego procesu                    | bez publikacji bez decyzji użytkownika                          |
| Shell       | desktop, tablet, mobile                                            | na mobile nawigacja zadaniowa                                   |
| Dashboard   | uwaga, agregaty, jakość, najnowsze leady                           | bez fikcyjnych KPI                                              |
| Leady       | filtry, tabela desktop, lista mobile, statusy                      | jawny tenant scope                                              |
| Lead detail | kontakt, wynik, odpowiedzi, pliki, powody score, historia, notatki | akcje zależne od roli; najnowszy screen jest geometrią docelową |
| Procesy     | lista, draft, wersje, publikacja, archiwum                         | opublikowana wersja jest immutable                              |
| Builder     | sekcje i pytania, preview, inspektor                               | bez grafu node-based                                            |
| Logika      | ograniczone IF/AND/OR/THEN                                         | deklaratywne AST, bez kodu użytkownika                          |
| Pricing     | reguły, min/max, symulacja                                         | kalkulacja potwierdzona przez serwer                            |
| Scoring     | deterministyczne reguły i powody                                   | score nie pochodzi z klienta                                    |
| Wynik       | tryb prezentacji i live preview                                    | wynik orientacyjny, niewiążący                                  |
| Szablony    | pięć branż i jawna zawartość                                       | kopia tworzy niezależny draft                                   |
| Widget      | desktop/mobile, hosted, result, lead capture                       | Shadow DOM i stabilne identyfikatory                            |
| Analityka   | lejek, drop-off, źródła, urządzenia                                | progi prywatności i zgoda                                       |
| Instalacja  | inline, popup, fullscreen, hosted, WordPress                       | kontrolki muszą wykonywać realne działania                      |
| Integracje  | webhook i WordPress                                                | sekrety tylko po stronie serwera                                |
| Ustawienia  | organizacja, zespół, branding, prywatność, retencja                | autoryzacja serwerowa                                           |
| Stany       | loading, empty, error, permission, stale, offline widget           | bez utraty kontekstu i danych                                   |

## Najnowsze nadpisania wizualne

### Builder desktop

Najnowszy załącznik ustala: około 80 px zielonego raila, wspólny toolbar,
kolumnę sekcji i pytań, centralny rzeczywisty preview oraz prawy inspektor z
walidacją i logiką warunkową. Zastępuje starszy wariant z pełnym opisowym
sidebarem. Lewa kolumna udostępnia prawdziwe `+ Sekcja`, zwijanie, licznik,
zmianę nazwy, kolejność i usunięcie z przeniesieniem pytań; operacje mają
równoważną obsługę klawiaturą i nie są wyłącznie wizualnymi uchwytami. Nie
zmienia to kontraktu danych flow.

### Lead operacyjny

Najnowszy załącznik ustala dokumentowy układ z nagłówkiem firmy, zakresem,
budżetem, terminem, lokalizacją, załącznikami, wyjaśnialnym dopasowaniem i
prawym panelem obsługi. Pola „opiekun”, „zaplanowane działanie” i aktywność mogą
być aktywne dopiero po potwierdzeniu modelu danych, autoryzacji i testów.

## Poza MVP

Billing/subskrypcje, Editor/Viewer, natywne CRM-y i kalendarze, zaawansowany
white-label, automatyczne przypisywanie, aplikacje natywne oraz pełny workflow
node-based nie mogą być wdrażane na podstawie samego obrazu.
