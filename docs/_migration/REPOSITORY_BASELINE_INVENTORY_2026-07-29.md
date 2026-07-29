# Inventory baseline'u repozytorium — Etap 12ZD

**Data pierwszego snapshotu:** 2026-07-29  
**Status:** LOCAL GATE PASS, pierwszy commit logiczny zapisany; clean checkout,
dependency audit i zdalne CI oczekują  
**Branch roboczy:** `codex/repository-baseline-12zd`  
**Commit bazowy:** `3193262fef6f9e0a003497072abf67852fa1745a`  
**Commit produktu:** `e75ff93` (`feat: establish complete Lorum product baseline`)  
**Zakres:** cały Git-visible working tree, bez odczytu zawartości ignorowanych
sekretów lokalnych

## 1. Cel

Raport oddziela kod produktu i wymagane dowody od plików lokalnych,
historycznych oraz wygenerowanych. Nie jest zgodą na masowe usuwanie. Każdy
DELETE wymaga dokładnego celu, sprawdzenia incoming links i pozostawienia
kanonicznego następcy albo jednoznacznego dowodu, że plik nie jest źródłem.

## 2. Snapshot początkowy

| Właściwość                         | Wynik                      |
| ---------------------------------- | -------------------------- |
| Branch przed rozpoczęciem          | `main`                     |
| Zmodyfikowane pliki śledzone       | 57                         |
| Usunięte pliki śledzone            | 3                          |
| Pliki nieśledzone                  | 1 029                      |
| Łącznie wpisów `git status`        | 1 089                      |
| Rozmiar plików widocznych w status | 187 148 201 B / 178,48 MiB |
| Obrazy PNG/JPG/WebP                | 596                        |
| Pliki Markdown                     | 146                        |
| TypeScript/TSX                     | 238                        |
| Migracje i testy SQL               | 23                         |
| Dokładne grupy duplikatów          | 29                         |
| Potencjalnie nadmiarowe duplikaty  | 13 524 262 B / 12,90 MiB   |
| Runtime lokalny                    | Node 26.0.0, pnpm 11.17.0  |
| Runtime wymagany                   | Node 24.18.0, pnpm 11.17.0 |

Snapshot pokazuje rozwój całego produktu od bardzo małego commita bazowego,
a nie pojedynczą zmianę funkcji. Z tego powodu nie wolno commitować całości
jako nieprzejrzystego „update”.

### Stan po pierwszym cleanupie

| Właściwość                         | Wynik                      |
| ---------------------------------- | -------------------------- |
| Wpisy `git status`                 | 954                        |
| Zmodyfikowane pliki śledzone       | 60                         |
| Pliki nieśledzone                  | 894                        |
| Usunięte pliki śledzone            | 0                          |
| Rozmiar plików widocznych w status | 148 394 264 B / 141,52 MiB |
| Pozostałe grupy duplikatów         | 12                         |
| Pozostałe bajty kopii              | 5 883 051 B / 5,61 MiB     |

Względem snapshotu początkowego usunięto 36,96 MiB lokalnych archiwów,
odtwarzalnego outputu i dokładnych kopii. Pozostałe grupy duplikatów są
celowe: zapewniają samodzielność pakietów źródłowych, rozdzielają baseline
Playwright od dowodu QA albo należą do różnych pakietów konfiguracyjnych.

### Stan po retencji pass 2 i końcowym E2E

| Właściwość                         | Wynik                      |
| ---------------------------------- | -------------------------- |
| Wpisy `git status -uall`           | 890                        |
| Zmodyfikowane pliki śledzone       | 61                         |
| Pliki nieśledzone                  | 829                        |
| Usunięte pliki śledzone            | 0                          |
| Rozmiar plików widocznych w status | 124 821 535 B / 119,04 MiB |
| Obrazy widoczne w status           | 400                        |
| Pliki w `artifacts/visual-qa`      | 346, w tym 315 obrazów     |
| Rozmiar `artifacts/visual-qa`      | 90 256 967 B / 86,08 MiB   |
| Pozostałe grupy duplikatów         | 8                          |
| Pozostałe bajty kopii              | 5 505 762 B / 5,25 MiB     |

Pass 2 usunął z working tree 80 niekanonicznych obrazów o rozmiarze
27 925 033 B. Względem snapshotu początkowego working tree zmalał łącznie
o 62 326 666 B / 59,44 MiB. Osiem pozostałych grup dokładnych kopii ma
udokumentowane, różne role: samodzielny pakiet źródłowy i kanoniczny entry
point, baseline Playwright i dowód QA albo `before` następnego etapu.

Po wykonaniu snapshotu rozpoczął się niezależny render materiałów promocyjnych
w `artifacts/promo/lorum-launch-v1/`. Proces Blender pozostaje aktywny, dlatego
ten zmieniający się katalog nie jest częścią inventory ani commitów Etapu 12ZD.
Nie był czyszczony, przenoszony ani zatrzymywany. Musi zostać oceniony i zapisany
oddzielnie dopiero po zakończeniu renderu.

## 3. Klasyfikacja

### KEEP — kod i kontrakty produktu

- `apps/web/`, z wyjątkiem lokalnych archiwów i outputu builda;
- `apps/wordpress-plugin/`;
- `packages/`, po przywróceniu aktualnych README zamiast usuniętych,
  historycznych placeholderów;
- `supabase/migrations/`, `supabase/tests/` i `supabase/seed.sql`;
- `tests/e2e/*.spec.ts`;
- `scripts/security/`, `scripts/test-rls.sh` i skrypty kontrolowanego visual QA;
- aktywne dokumenty wskazane przez `docs/INDEX.md`;
- `CODEX_MASTER_PROMPT.md`, `AGENTS.md` i zaakceptowane ADR.

### KEEP — wymagane obrazy

- aktywa faktycznie ładowane z `apps/web/public/`;
- cztery kanoniczne wejścia w `references/`;
- baseline'y Playwright w `tests/e2e/__screenshots__/`;
- samodzielne pakiety źródłowe referencji w `docs/ui/`, dopóki ich względne
  linki i odtwarzalność wymagają lokalnych kopii;
- końcowe artefakty QA wymagane przez `docs/VISUAL_QA.md`.

Nie należy usuwać duplikatu tylko na podstawie SHA-256. Część identycznych
obrazów jest celowa: kanoniczny entry point i samodzielny pakiet źródłowy mają
inne role.

### REPLACE — trzy usunięte README

`packages/database/README.md`, `packages/validation/README.md` i
`packages/widget/README.md` były w HEAD wyłącznie placeholderami mówiącymi, że
pakiety dopiero powstaną. Pakiety już działają, dlatego usunięcia zostają
zastąpione aktualnymi opisami odpowiedzialności, granic bezpieczeństwa
i komend weryfikacyjnych.

### MOVE TO TRASH — wykonane dla lokalnego archiwum starego kodu

`apps/web/Archiwum.zip`:

- rozmiar: 403 671 B;
- SHA-256:
  `be800bed3734d0df02b4352a6dc0c7ba5abeb091868a7dbd12d0432ad69e0c16`;
- `unzip -t`: PASS;
- 458 wpisów ZIP, w tym metadane `__MACOSX`;
- 153 właściwe pliki payloadu: 84 są identyczne z aktywnym drzewem, 68 to
  starsze wersje, a jeden stary `app/logowanie/styles.css` nie istnieje już
  w aktywnym układzie;
- zawiera output builda widgetu i `tsconfig.tsbuildinfo`;
- dokumentacja archiwalna jawnie stwierdza, że ZIP nie jest źródłem prawdy;
- nie jest używany przez build, testy, manifest ani aktywną dokumentację.

Archiwum nie powinno trafić do Git. Dokładnie ten plik został przeniesiony do
systemowego Kosza jako `/Users/nexora/.Trash/Archiwum.zip`; zachowano powyższy
hash, rozmiar i wynik integralności. Operacja jest odzyskiwalna do czasu
opróżnienia Kosza. `.gitignore` blokuje kolejne lokalne ZIP/TAR/TGZ/7Z i backupy.

### REVIEW — wygenerowane artefakty wizualne

| Grupa                  | Pliki | Obrazy | Rozmiar                    |
| ---------------------- | ----: | -----: | -------------------------- |
| `artifacts/visual-qa/` |   430 |    411 | 121 903 421 B / 116,26 MiB |
| `artifacts/redesign/`  |   116 |    116 | 30 760 693 B / 29,34 MiB   |
| Łącznie                |   546 |    527 | 152 664 114 B / 145,59 MiB |

W tej grupie znajdują się zarówno wymagane raporty i końcowe dowody, jak
i kolejne `after-v1…v10`, cropy robocze, powielone referencje oraz stare
outputy skryptów. Największe grupy do osobnego review:

- `landing-3d-redesign` — 35 878 140 B;
- `artifacts/redesign/after` — 20 614 539 B;
- `12f-board-2` — 12 145 147 B;
- `12a-panel-reconstruction` — 10 612 536 B;
- `12s-remaining-screens` — 10 255 739 B;
- `artifacts/redesign/before` — 9 276 105 B.

Decyzja na pierwszy pass:

1. zachować 19 tekstowych raportów QA;
2. zachować aktualne referencje i finalne dowody wymagane przez manifest;
3. nie commitować ślepo iteracji pośrednich;
4. przed usunięciem wygenerować mapę incoming links i dla każdego etapu
   wskazać minimalny zestaw `reference` / `before` / final `after` /
   `difference` lub `overlay`;
5. jeżeli historyczny etap nie jest już aktywnym gate'em, raport może zostać,
   ale obrazy wymagają jawnej decyzji ARCHIVE albo DELETE.

Pierwszy i drugi pass retencji opisuje
`VISUAL_QA_RETENTION_2026-07-29.md`: 21 kopii o łącznym rozmiarze 7 641 211 B
oraz 80 plików iteracyjnych o rozmiarze 27 925 033 B zostało przeniesionych do
Kosza. Żaden snapshot Playwright, aktyw runtime, raport ani kanoniczna
referencja nie należy do tego zestawu.

### DELETE — wykonane dla odtwarzalnego legacy outputu `artifacts/redesign`

116 obrazów w `artifacts/redesign/` zajmowało 30 760 693 B. Nie były to
baseline'y Playwright ani kanoniczne referencje. Katalog jest deterministycznym
outputem `scripts/capture-redesign.mjs`, a trzy użycia w `widget.spec.ts`
również generują pliki podczas testu. Wynik historycznego etapu pozostaje
opisany w zarchiwizowanym raporcie, natomiast aktualne V6 ma osobne artefakty.

Cały dokładny katalog został przeniesiony do systemowego Kosza jako
`/Users/nexora/.Trash/redesign`, a `artifacts/redesign/` dodano do
`.gitignore`. Operacja jest odzyskiwalna do opróżnienia Kosza. Output pozostaje
odtwarzalny i niewersjonowany. Cleanup nie objął `artifacts/visual-qa/`.

## 4. Bezpieczeństwo i dane lokalne

- `apps/web/.env.local` istnieje i jest poprawnie ignorowany przez
  `.gitignore`; jego zawartości nie włączono do raportu;
- `.env.example` pozostaje wersjonowanym kontraktem bez sekretów;
- `.pnpm-store/v11/index.db` jest lokalnym cache i jest ignorowany;
- nie wykryto PEM, prywatnych kluczy, dumpów bazy ani plików klientów
  widocznych dla Git;
- `pnpm security:secrets` przechodzi dla working tree;
- pełnohistoryczny Gitleaks i CodeQL pozostają wymagane na zdalnym CI.

Lokalny skan regex nie jest dowodem braku sekretów w historii Git i nie
zastępuje review danych osobowych w obrazach.

## 5. Zamknięcie historycznych statusów 12F i 12K

- 12F został zamknięty przez jawne zastąpienie Etapami 12G–12J, 12Q i 12ZB.
  Aktualny `HomeRedesign` oraz `marketing.spec.ts` mapują jego wymagania
  funkcjonalne i ostrzejszą macierz pięciu viewportów;
- 12K został zamknięty przez jawne zastąpienie Etapem 12S. Cztery powierzchnie
  auth mają produkcyjne rendery desktop/mobile, testy klawiatury, axe, reduced
  motion, forced colors, reflow i overflow.

Starym passom nie przypisano wstecz pozornego wyniku. `TASKS.md` i
`VISUAL_QA.md` wskazują konkretnych następców oraz dowody, dzięki czemu
historyczne wpisy nie konkurują z aktualnym gate'em.

## 6. Blokery immutable baseline'u

1. dokumentacja i dowody QA oczekują na drugi logiczny commit;
2. pełny gate nie został jeszcze powtórzony z czystego checkoutu;
3. aktualny dependency audit oczekuje na jawną zgodę właściciela, ponieważ
   wysyła graf zależności do zewnętrznego rejestru;
4. brak zielonego CI, CodeQL i pełnohistorycznego Gitleaks na jednym SHA;
5. brak zatwierdzonego immutable commit SHA;
6. równoległy, aktywny render promo pozostaje celowo poza baseline'em.

Lokalny gate działa na przypiętym Node 24.18.0 i pnpm 11.17.0. Pełne 15/15
scenariuszy panelu przechodzi na wymuszonym standalone, nie na przypadkowym
`next dev`. Seed visual QA jest ponownie uruchamialny bez ręcznej zmiany
wygenerowanego `dist`, a po E2E nie pozostają konta `panel-e2e-*` ani
`baseline-*`. Ogólny zestaw Playwright przechodzi 34/34; razem z
uwierzytelnionym panelem daje to 49/49 zweryfikowanych ścieżek. Pięć snapshotów
hero zaktualizowano dopiero po side-by-side review i ponowny przebieg 5/5 oraz
pełny przebieg bez trybu aktualizacji snapshotów są zielone.

## 7. Kolejność dalszych działań

1. zapisać dokumentację i dowody QA jako drugi logiczny commit;
2. po zgodzie właściciela uruchomić aktualny dependency audit;
3. zweryfikować czysty checkout i zdalne CI;
4. osobno przejrzeć zakończony pakiet promo;
5. wskazać SHA dopiero po przejściu wszystkich gate'ów.
