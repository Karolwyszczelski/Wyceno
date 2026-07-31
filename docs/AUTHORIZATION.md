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

Wdrożony `requireTenantContext(organizationId)` pobiera zweryfikowanego
użytkownika z Supabase Auth i aktywne członkostwo widoczne przez RLS.
`createTenantContext`, `assertCapability` i `assertTenantResource` z
`@wyceno/database` są jedynym kontraktem przekazywanym do przyszłych usług
domenowych. Zasób innego tenanta kończy się generycznym `NOT_FOUND`, aby nie
potwierdzać jego istnienia.

Owner zarządza organizacją i członkostwem; Admin czyta audit log i może usuwać
pliki; Sales ma dostęp do aktywnej organizacji oraz odczytu/zapisu plików.
Etap 4 dodaje Ownerowi i Adminowi `flow:read`, `flow:write` i `flow:publish`.
Sales nie otrzymuje dostępu do draftów, reguł ani opublikowanych snapshotów.
Kolejne uprawnienia domenowe powstają razem z odpowiednią domeną, nigdy
wcześniej.

Etap 7 dodaje aktywnym rolom Owner/Admin/Sales capabilities `lead:read`,
`lead:note` i `lead:status`. Panel zawsze buduje `TenantContext` z URL
organizacji i zweryfikowanego członkostwa. RLS ogranicza odczyt leadów,
odpowiedzi, potwierdzeń, plików, historii i notatek. Notatka musi mieć autora
`auth.uid()` i leada tego samego tenanta. Zmiana statusu używa wąskiego RPC,
które ponownie sprawdza aktywną rolę i oba UUID; zwykły klient nie ma grantu
`UPDATE` na `leads`. Etap 12 udostępnia eksport wyłącznie aktywnemu Ownerowi;
Admin i Sales nie mają tego capability ani bezpośredniego dostępu do eksportu.

Etap 9 dodaje `analytics:summary` wszystkim aktywnym rolom. Owner/Admin mają
dodatkowo `analytics:read` i przez RLS mogą odczytać surowe eventy oraz rekordy
consentu własnego tenanta. Sales nie otrzymuje raw access: kontrolowane RPC
zwraca wyłącznie agregaty po progu małej próby. Żadna rola panelu nie ma
bezpośredniego zapisu eventów ani uruchomienia purge.

Publiczny identyfikator flow pozwala wyłącznie odczytać bezpieczny manifest i
utworzyć sesję. Losowy token sesji pozwala wznowić oraz zapisać odpowiedzi tylko
w tej jednej sesji. Nie jest kluczem API ani dowodem członkostwa. Token trafia w
nagłówku, baza przechowuje jego hash, a tabele sesji nie są bezpośrednio
dostępne dla `anon` ani `authenticated`.

## Testy

Macierz ról, brak członkostwa, członkostwo zawieszone, zmiana aktywnej organizacji, IDOR po identyfikatorze, odczyt pliku innego tenanta i próba użycia publicznego ID w panelu.

Macierz bazowa i IDOR są testowane jednostkowo w
`packages/database/src/tenancy.test.ts`. Rzeczywiste polityki PostgreSQL testuje
`supabase/tests/tenant_isolation.sql`; nie są zastępowane mockiem klienta.
Przypadki leadów i zmiany statusu rozszerza
`supabase/tests/lead_pipeline.sql`, łącznie z drugim tenantem i członkiem
zawieszonym.
Analitykę rozszerza `supabase/tests/analytics.sql`: raw access Owner/Sales,
agregat Sales, drugi tenant, consent withdrawal, retencja i próg małej próby.
