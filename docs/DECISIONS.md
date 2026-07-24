# Rejestr decyzji

## ADR-001: Modularny monolit w monorepo

**Status:** accepted, wdrożone w Etapie 1
**Decyzja:** pnpm + Turborepo; Next.js jako web/API, wydzielony widget i pakiety domenowe.
**Dlaczego:** jedna mała ekipa potrzebuje szybkich zmian i transakcyjnej spójności; granice pakietów zachowują drogę do wydzielenia.
**Konsekwencje:** trzeba pilnować zależności i nie tworzyć „shared” bez właściciela.

## ADR-002: PostgreSQL/Supabase i RLS

**Status:** proposed
**Decyzja:** relacyjny model, Auth/Storage, RLS jako niezależna warstwa tenant isolation.
**Konsekwencje:** polityki RLS i testy stają się częścią każdej domeny; service role jest ograniczony.

## ADR-003: Niezmienne wersje opublikowane

**Status:** accepted jako wymaganie produktu
**Decyzja:** publikacja tworzy immutable snapshot; lead wskazuje snapshot.
**Konsekwencje:** edycja draftu nie zmienia aktywnej sesji ani historii.

## ADR-004: Ograniczone reguły zamiast kodu

**Status:** accepted
**Decyzja:** pricing, scoring i warunki są deklaratywnym AST, nie dowolnym JavaScriptem.
**Konsekwencje:** bezpieczniejsza walidacja, explainability i deterministyczne testy kosztem mniejszej dowolności.

## ADR-005: Widget jako web component z izolacją

**Status:** proposed; renderer Preact wymaga pomiaru
**Decyzja:** custom element + Shadow DOM, lazy loader, osobny bundle.
**Konsekwencje:** potrzebne testy host CSS/CSP, resize i accessibility.

## ADR-006: Paleta jest hipotezą

**Status:** proposed
**Decyzja:** użyć roboczej palety z master promptu dopiero po audycie kontrastu i skojarzeń w Etapie 2.
**Konsekwencje:** brak publicznego brandingu przed zatwierdzeniem.

## ADR-007: „Wyceno” pozostaje working title

**Status:** accepted do czasu badania
**Decyzja:** nazwa może występować w dokumentacji i kodzie roboczym, ale nie jest uznana za prawnie bezpieczną.
**Konsekwencje:** launch, zakup kampanii i rejestracja kluczowych domen wymagają profesjonalnego clearance.

## ADR-008: Przypięty toolchain LTS

**Status:** accepted
**Decyzja:** produkcyjny i skryptowy runtime to Node 24.18.0 LTS; pnpm 11.17.0 pobiera go przez `devEngines.runtime`. Next.js 16.2.11 Active LTS, TypeScript 6.0.3 i ESLint 9.39.5 są przypięte dokładnie.
**Dlaczego:** najnowsze TypeScript 7 i ESLint 10 nie spełniają jeszcze peer dependencies toolingu Next.js. Node 26 pozostaje linią Current do października 2026.
**Konsekwencje:** aktualizacje głównych wersji wymagają osobnego compatibility review.

## ADR-009: Rygorystyczny supply chain pnpm

**Status:** accepted
**Decyzja:** exact versions, frozen lockfile, 24-godzinny `minimumReleaseAge`, strict peers i jawna allowlista lifecycle scripts. Dopuszczone są tylko `sharp` i `unrs-resolver`.
**Konsekwencje:** nowy lifecycle script celowo zatrzymuje instalację. Dependabot i CI pilnują aktualizacji; nie używamy `dangerouslyAllowAllBuilds`.

## ADR-010: Typed Routes odroczone

**Status:** accepted
**Decyzja:** nie włączać `typedRoutes` w Etapie 1. Next.js 16.2.11 generuje `JSX.Element` niezgodne z aktualnymi typami React 19 podczas builda bez tras UI.
**Konsekwencje:** nie dodajemy globalnego shimowania JSX ani `skipLibCheck`. Funkcję ocenić ponownie w Etapie 2 po poprawce upstream lub przy pierwszych trasach.

## ADR-011: Własna dostępna warstwa UI i zatwierdzona paleta

**Status:** accepted, wdrożone w Etapie 2
**Decyzja:** utrzymywać małą, własną warstwę komponentów w `@wyceno/ui`,
opartą na semantycznym HTML i natywnym `<dialog>`. Zatwierdzić jasną paletę z
ciemną zielenią dla CTA, jasną zielenią wyłącznie jako wyróżnikiem oraz
ciemniejszymi kolorami komunikatów.
**Dlaczego:** pozwala zachować własny język wizualny, kontrolować bundle i
dostępność bez kopiowania domyślnego wyglądu biblioteki. Automatyczne testy
potwierdzają kontrast, klawiaturę, axe i reduced motion.
**Konsekwencje:** bardziej złożone prymitywy mogą wymagać przyszłej,
udokumentowanej zależności accessibility; tokeny nie mogą powstawać lokalnie,
a visual baseline jest częścią kontraktu.
