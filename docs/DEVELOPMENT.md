# Środowisko deweloperskie

## Wymagania

- Node.js 24.18.0 LTS — wersja z `.node-version` i `.nvmrc`;
- pnpm 11.17.0 — dokładna wersja z `packageManager`;
- Git 2.x.

Node 26 Current może uruchomić narzędzia lokalnie w okresie przejściowym, ale CI i docelowy runtime używają Node 24.18.0 LTS. Nie aktualizuj runtime’u bez sprawdzenia Next.js, Vitest i natywnych zależności.

## Bootstrap

```bash
git clone <repository-url>
cd Wyceno
nvm use
npm install --global pnpm@11.17.0
pnpm install --frozen-lockfile
cp .env.example .env.local
```

Nie uzupełniaj sekretów, których bieżący etap nie używa. `.env.local` jest ignorowany.

## Codzienna weryfikacja

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
pnpm start
```

W aplikacji Next.js `typecheck` najpierw uruchamia `next typegen`, a następnie
`tsc --noEmit`. Dzięki temu kontrola typów działa również po `pnpm clean`, gdy
katalog `.next` nie istnieje.

`pnpm start` uruchamia artefakt standalone wygenerowany przez `next build`.
Adres można zmienić przez zmienne środowiskowe `HOSTNAME` i `PORT`.
Build kopiuje statyczne zasoby do artefaktu standalone przez
`apps/web/scripts/prepare-standalone.mjs`.

Pierwsze uruchomienie testów przeglądarkowych wymaga
`pnpm exec playwright install chromium`. `pnpm e2e` porównuje istniejące
baseline’y; `pnpm e2e:update` wolno wykonać dopiero po świadomym visual review.

`pnpm dev` uruchamia aktywne aplikacje workspace. `apps/web` udostępnia
`GET /health` oraz wewnętrzny, wyłączony z indeksowania showcase
`/design-system`.

## Konfiguracja środowiska

`@wyceno/config` rozdziela kontrakty klienta i serwera. Do przeglądarki mogą trafić wyłącznie wartości jawnie wymienione w `clientEnvSchema`; klucz `SUPABASE_SERVICE_ROLE_KEY`, URL bazy, klucze Resend i sekrety podpisujące należą wyłącznie do serwera. Schematy są strict, dlatego przekazuj do parsera jawnie wybrany obiekt, a nie całe `process.env`.

## Polityka zależności

Wersje bezpośrednie są przypięte, lockfile jest obowiązkowy, peer dependencies są rygorystyczne, a wydania młodsze niż 24 godziny są blokowane. Skrypty instalacyjne mogą wykonywać wyłącznie `sharp` i `unrs-resolver`, jawnie wpisane w `allowBuilds`. Nowa zależność z lifecycle script zatrzyma instalację.

## Troubleshooting

- `ERR_PNPM_UNSUPPORTED_ENGINE`: użyj Node z `.node-version`.
- `ERR_PNPM_IGNORED_BUILDS`: nie włączaj wszystkich skryptów; sprawdź pakiet, a decyzję dodaj do `pnpm-workspace.yaml` i `docs/DEPENDENCIES.md`.
- peer dependency error: dobierz wspierane wersje; nie wyłączaj `strictPeerDependencies`.
- wynik Turbo wygląda na nieaktualny: konfiguracje root są w `globalDependencies`; diagnostycznie użyj `pnpm exec turbo run <task> --force`.
- błąd env: sprawdź nazwę, URL i czy sekret nie został omyłkowo oznaczony `NEXT_PUBLIC_*`.
