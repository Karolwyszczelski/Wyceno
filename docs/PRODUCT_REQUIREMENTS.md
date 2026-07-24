# Wymagania produktowe

## Główna ścieżka MVP

1. Owner tworzy konto i organizację.
2. Wybiera szablon branżowy albo zaczyna od zera.
3. Edytuje pytania, prostą logikę, przedział ceny, scoring i branding.
4. Testuje i publikuje niezmienną wersję procesu.
5. Osadza widget lub udostępnia hosted link.
6. Klient przechodzi proces, wyraża właściwe zgody i wysyła lead.
7. Serwer potwierdza wycenę oraz score, zapisuje odpowiedzi i wersję.
8. Firma i klient otrzymują e-mail transakcyjny.
9. Sales przegląda lead, wyjaśnienie score i zmienia status.
10. Owner widzi podstawową, agregowaną analitykę procesu.

## Wymagania funkcjonalne MVP

- organizacje i role Owner/Admin/Sales z rozszerzalnym modelem;
- szablony: meble, ogrodzenia, strony internetowe, klimatyzacja, remonty;
- draft, wersja opublikowana i archiwum; lead zawsze wskazuje wersję;
- podstawowe typy pól, warunki IF/THEN i walidacja martwych ścieżek;
- cena: baza, kwota, przedział, mnożnik, jednostka, min/max i koszt warunkowy;
- prezentacja: kwota, przedział, „od”, brak ceny albo konsultacja;
- deterministyczny scoring z listą uruchomionych reguł;
- inline, popup, fullscreen i hosted link;
- leady, status, historia, notatki, filtry i eksport kontrolowany uprawnieniem;
- e-mail HTML + tekst; webhook podpisany HMAC;
- eventy od `widget_loaded` do `result_viewed`;
- retencja, eksport, usunięcie/anonymizacja i wersjonowane zgody.

## Wymagania niefunkcjonalne

- WCAG 2.2 AA; pełna klawiatura i reduced motion;
- RLS, jawny tenant scope, least privilege i brak sekretów w kliencie;
- serwerowa walidacja i kalkulacja, idempotencja submitu, rate limiting i Turnstile;
- LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 dla 75% wizyt, gdy są dane terenowe;
- widget bez globalnego CSS, lazy-loaded i odporny na podwójny loader;
- structured logs bez pełnych PII, request ID i health endpoint;
- TypeScript strict, testy krytycznych ścieżek i produkcyjny build bez błędów.

## Otwarte decyzje przed płatnościami

Model cenowy, limity planów, dostawca płatności i formalny charakter wyniku nie są zatwierdzone. Płatności są poza MVP do osobnej decyzji.
