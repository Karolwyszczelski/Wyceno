# Autoryzacja

## Role

| Zdolność                           | Owner |             Admin |       Sales |
| ---------------------------------- | ----: | ----------------: | ----------: |
| Organizacja, członkowie, usunięcie |   tak |               nie |         nie |
| Płatności                          |   tak |               nie |         nie |
| Flow, pricing, publikacja          |   tak |               tak |         nie |
| Integracje                         |   tak | tak bez płatności |         nie |
| Leady, statusy, notatki            |   tak |               tak |         tak |
| Eksport                            |   tak |    konfigurowalne |         nie |
| Analityka                          |   tak |               tak | ograniczona |

Model danych przewiduje Editor i Viewer po MVP.

## Egzekwowanie

Każda operacja serwerowa ustala użytkownika, aktywną organizację i wymagane capability. Repozytorium przyjmuje typowany `TenantContext`; brak kontekstu jest błędem. RLS jest drugą, niezależną warstwą. Service role nie może obsługiwać zwykłych odczytów panelu.

Publiczny token flow pozwala wyłącznie odczytać bezpieczny manifest i pracować na własnej sesji. Nie jest kluczem API ani dowodem członkostwa.

## Testy

Macierz ról, brak członkostwa, członkostwo zawieszone, zmiana aktywnej organizacji, IDOR po identyfikatorze, odczyt pliku innego tenanta i próba użycia publicznego ID w panelu.
