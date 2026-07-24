# Architektura

## Decyzja

Modularny monolit w monorepo pnpm + Turborepo. `apps/web` udostępnia marketing, panel i API w Next.js App Router. Domeny są rozdzielone modułowo, ale wdrażane razem na początku. Publiczny widget jest osobnym, lekkim artefaktem. PostgreSQL/Supabase zapewnia Auth, Storage i RLS.

## Granice

- `apps/web`: kompozycja UI, server actions/route handlers, marketing i panel;
- `packages/types`: stabilne typy bez runtime;
- `packages/validation`: schematy wejścia współdzielone przez klientów i serwer;
- `packages/database`: repozytoria i jawny kontekst organizacji;
- `packages/widget`: state machine renderera, bez dostępu do panelu;
- `packages/ui`: tokeny i komponenty, bez logiki domenowej;
- `packages/email`, `analytics`, `testing`, `config`: wyspecjalizowane adaptery.

## Przepływ żądania

Klient → walidacja transportowa → uwierzytelnienie/rate limit → autoryzacja i tenant context → usługa domenowa → repozytorium/RLS → event/audit → bezpieczna odpowiedź. Panel i widget używają tych samych wersjonowanych kontraktów API, lecz innych zakresów uprawnień.

## Publiczny widget

Web component + Shadow DOM, z lekkim rendererem ocenionym w Etapie 5 (preferencja Preact, ostateczna decyzja po pomiarze). Loader jest idempotentny i lazy. Widget pobiera wyłącznie publiczny manifest opublikowanej wersji; reguły wewnętrzne i dane innych sesji nie są zwracane.

## Zasady

- opublikowane wersje są niezmienne;
- logika domenowa nie trafia do komponentów;
- brak zapytań do bazy z losowych komponentów;
- brak dowolnego `eval`; pricing/scoring używają ograniczonego AST reguł;
- asynchroniczne e-maile i webhooki używają outbox/retry, a submit ma idempotency key;
- przejście na mikroserwisy tylko po danych o skalowaniu, nie przed MVP.

## Docelowe budżety

Marketing: minimalny JS, hero bez ciężkiego demo. Widget: cel ≤ 90 KB gzip kodu własnego przy pierwszym interaktywnym ładowaniu, manifest ≤ 100 KB gzip, brak długiego zadania > 50 ms na typowym telefonie średniej klasy. API p95 dla odczytu manifestu i zapisu odpowiedzi < 500 ms bez uploadu. Budżety są hipotezami do pomiaru w Etapie 5/10.
