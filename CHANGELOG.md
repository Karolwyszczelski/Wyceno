# Changelog

Wszystkie istotne zmiany projektu będą dokumentowane w tym pliku.

## [Unreleased]

### Changed

- Etap 12ZD porządkuje 178,48 MiB niezapisanej historii do audytowalnego
  baseline'u. Stare archiwum kodu, odtwarzalny legacy output oraz 101
  dokładnych lub zastąpionych obrazów QA przeniesiono do odzyskiwalnego Kosza;
  zachowano aktywa runtime, kanoniczne referencje, snapshoty Playwright i
  finalne dowody. Naprawiono uruchamianie seeda visual QA na Node 24,
  serializację współdzielonego fixture'u panelu, cleanup konfliktu dwóch kart,
  selektor granic liczbowych, semantykę metryk i kontrast analityki. Playwright
  potrafi wymusić własny standalone zamiast używać przypadkowego `next dev`;
  pełny panel przechodzi 15/15 bez pozostawiania kont E2E, a ogólny zestaw
  Playwright 34/34. Snapshoty hero zaktualizowano po side-by-side review.
  Aktywny, równoległy render promo pozostawiono poza baseline'em.
- Dodano kanoniczny program domknięcia produktu i gotowości produkcyjnej.
  Rozdziela on lokalną demonstrację, staging, pilot z prawdziwymi danymi,
  publiczną produkcję i płatny self-service; dokumentuje brak edytorów
  pricingu/scoringu/wyniku oraz konflikt wymagania webhooka, a następnie
  wyznacza sekwencję 12ZD–12ZG i 13A–13D. Rozszerzono roadmapę, blokującą
  checklistę release, pakiet wdrożeniowy firmy, kalibrację reguł, UAT,
  bezpieczeństwo, prawo, restore/rollback, metryki i kontrolowany rollout.
  Zaktualizowano również instrukcję developmentu do istniejącej rejestracji
  i bootstrapu pierwszej organizacji.
- Strona główna została przebudowana do sześciu rozdziałów. Hero pokazuje
  proces klienta, konfigurację reguł oraz gotowy lead jako trzy code-native
  szklane powierzchnie w jednej perspektywie 3D, bez wygenerowanego obrazu
  i bez atrap telefonów. Pięć telefonów branżowych zastąpił jeden ciągły
  storyboard, a dalsze proofy połączono w demo, dokument decyzji, branże
  z publikacją i pilotaż. Visual QA obejmuje 1440/1024/768/390/320 px,
  axe WCAG 2.2 AA, klawiaturę, brak JavaScriptu, reduced motion, forced colors
  i brak poziomego overflow.
- Najnowsza korekta hero zastępuje trzy płaskie powierzchnie jednym fizycznym
  telefonem produktowym. Desktop pokazuje elementy wyniku wychodzące z ekranu,
  mobile używa osobnego kadru z samym telefonem uciętym prawą krawędzią, a oba
  WebP mają kanał alfa bez prostokątnego tła. Przywrócono także pasek sześciu
  okrągłych ikon oraz dodano oszczędne okręgi i pole punktów w tle. Pozostałe
  sekcje i logika produktu nie zostały zmienione.
- Builder pozwala zmieniać kolejność opcji odpowiedzi przez prawdziwe DnD,
  `Alt+ArrowUp/Down` i jawne menu dotykowe. Wszystkie mechanizmy używają jednej
  testowanej operacji, zachowują klucze opcji, przejścia, reguły oraz pozostały
  dokument, przechodzą przez undo/redo i autosave, przywracają fokus i ogłaszają
  wynik w `aria-live`. Visual QA obejmuje 1448/768/390 px, axe i overflow.
  CSP dopuszcza podpisane obrazy wyłącznie z poprawnego, skonfigurowanego originu
  Supabase, bez wildcardów.
- Builder procesu obsługuje pełne zarządzanie sekcjami: utworzenie razem
  z pierwszym poprawnym pytaniem, zmianę nazwy, zwijanie, zmianę kolejności
  całych grup i bezpieczne usunięcie z obowiązkowym przeniesieniem pytań.
  Ostatniej sekcji nie można usunąć, limity domeny są widoczne w UI, pusta
  sekcja ma jawny stan błędu, a wszystkie zmiany przechodzą przez istniejące
  undo/redo, autosave i kontrolę rewizji. Menu, `Alt+strzałka`, `aria-expanded`,
  `aria-live`, przywracanie fokusu oraz testy desktop/tablet/mobile nie zmieniają
  tenant scope ani akcji serwerowych.
- Naprawiono kwadratowy przełącznik „Wymagane” w builderze i ten sam wzorzec
  w ustawieniach prywatności. Checkbox nie dziedziczy już `min-height` ani
  paddingu pól tekstowych; zachowuje natywną semantykę i ma stabilne
  42 × 24 px, gałkę 18 px oraz jawne stany focus, disabled i forced-colors.
  Playwright blokuje regresję geometrii, klawiatury, axe i overflow na
  desktopie, tablecie oraz mobile. Osobny audyt dokumentuje, że grupy logiki
  oraz UI pricingu/scoringu/wyniku nadal wymagają kolejnych etapów.
- Builder pytań obsługuje teraz rzeczywiste przeciąganie między pozycjami
  i sekcjami, równoważne `Alt+strzałka` oraz dotychczasowe akcje
  „wyżej/niżej”. Po operacji zachowuje fokus i ogłasza wynik w `aria-live`.
  Inspektor udostępnia domenowe ograniczenia tekstu, liczby/budżetu i daty,
  pokazuje błędy przy pytaniu oraz polu, zatrzymuje autosave niepoprawnego
  dokumentu i blokuje publikację błędnego grafu bez blokowania poprawnego
  szkicu. Geometria 12W pozostała bez zmian; dodano testy jednostkowe i E2E
  dla drag-and-drop, klawiatury, walidacji, axe i responsywności.
- Builder procesu domyka geometrię zaakceptowanej referencji przy 1448 × 1086:
  zwinięty shell ma rail 78 px, toolbar 85 px, kolumny 360 / 582 / 428 px
  i kartę preview 464 px. Rozwinięty wspólny sidebar Lorum zachowuje trzy
  czytelne panele bez ucięcia inspektora, a toolbar nie nakłada nazwy, statusu
  i akcji. Poniżej dostępnego workspace 77 rem edytor używa jawnych widoków
  Pytania / Podgląd / Ustawienia; mobile skraca CTA oraz udostępnia prawdziwe
  Cofnij/Ponów z klawiatury w menu publikacji. Playwright mierzy desktop,
  tablet, mobile, reflow 200%, długie polskie treści, axe i brak overflow.
- Builder zapisuje zmiany automatycznie po 900 ms przez serializowaną kolejkę,
  redukując oczekujące requesty do najnowszego stanu. Otrzymał prawdziwe
  undo/redo z historią 50 snapshotów, ręczny retry, bezpieczny zapis przed
  nawigacją oraz jawny konflikt dwóch kart bez force overwrite. Rewizja obejmuje
  teraz nazwę i dokument, publikacja opróżnia kolejkę, a krzyżyk inspektora
  rzeczywiście go zamyka; usunięcie pytania jest osobną opisaną akcją.
- Builder otrzymał wersjonowany kontrakt `FlowDocument v2`: prawdziwe,
  uporządkowane sekcje i typowane ograniczenia długości tekstu, zakresu liczby
  oraz daty. Czytnik nadal obsługuje v1 i podnosi stary draft wyłącznie w
  pamięci do chwili jawnego zapisu; historyczne snapshoty nie są przepisywane.
  PostgreSQL niezależnie waliduje publikację v1/v2 i odpowiedzi, a manifest v2
  ujawnia tylko allowlistowane ograniczenia bez sekcji edytora. Nowe szablony
  tworzą draft v2; dodano testy migratora, błędnych sekcji i zakresów,
  publikacji, uprawnień oraz pełnej sesji widgetu.
- Dashboard organizacji został przebudowany według pełnej referencji
  operacyjnej: ma sześć zwartych KPI, działające wyszukiwanie i zakres dat,
  trend wszystkich i jakościowych leadów, statusy, wartość wycen, tabelę
  najnowszych rekordów, ranking procesów, prywatnościowe źródła, przedziały
  wartości, rekordy wymagające reakcji, prawdziwe dostawy powiadomień, szybkie
  akcje oraz stan publikacji i WordPress. Wszystkie agregaty pozostają
  tenant-scoped, moduły bez modelu danych zostały świadomie wyłączone, a mobile
  priorytetyzuje reakcję, KPI i ostatnie leady bez poziomego overflow.
- Domknięto pozostałe funkcjonalne ekrany Lorum: ustawienia organizacji,
  centrum realnych dostaw powiadomień, pełnoszeroką integrację WordPress,
  instalację opublikowanego procesu, onboarding wyprowadzany z danych oraz
  publiczny widget question/result/contact na desktopie i mobile. Ustawienia
  respektują capability `organization:update`, prywatność jest widoczna tylko
  dla ról z `privacy:manage`, embed zawiera wyłącznie publiczne ID, a wszystkie
  akcje są działające. Dodano loading/empty/error/permission states, odbiór
  auth bez redesignu oraz macierz E2E 1536–320 px z axe, klawiaturą, offline,
  forced colors, reduced motion, overlay i difference.
- Analityka organizacji została rozwinięta w spójnym stylu dashboardu:
  zachowuje topbar 78 px, cztery KPI, jasny 30-dniowy wykres i donut jakości,
  a niżej dodaje czterostopniowy lejek, bąble score, 40-polowe wykresy
  kafelkowe źródeł i urządzeń, karty drop-off oraz pierścienie wersji bez
  powtarzalnych pasków `progress`. Stopki KPI porównują bieżący okres
  z poprzednim, filtr 7/30/90 dni jest działającą nawigacją, a średnia wartość
  wyceny oraz score są liczone wyłącznie dla wybranego okresu. Loading i error
  state używają tej samej hierarchii; desktop, 390 px i 320 px nie mają
  poziomego overflow.
- Strona główna otrzymała autorski, minimalistyczny kierunek 3D bez zmiany
  logiki produktu. Hero pokazuje trzy responsywne telefony w sekwencji
  zapytanie → prowadzony proces → gotowy lead, pięć branż jest prezentowanych
  jako mobilne ekrany, a dalsze proofy korzystają ze wspólnej perspektywy,
  promieni i spokojnego rytmu. Interaktywne demo, linki, SEO, no-JS,
  klawiatura, reduced motion, forced colors i tekst minimum 12 px pozostają
  zachowane przy 1440/1024/768/390/320 px.
- Biblioteka `Szablony branżowe` odtwarza najnowszą zaakceptowaną referencję:
  ma breadcrumb i akcje, cztery działające filtry, trzy podsumowania, pięć
  bogatych kart w jednym rzędzie oraz szczegół z etapami i rozwijanym spisem
  pytań. Demonstracyjne `12`, `68%`, import i własny szablon zastąpiły realne
  dane pięciu `flowTemplates` oraz istniejąca akcja utworzenia draftu.
  Zdjęcia zachowują proporcję 1,7:1 na desktopie i mobile, a widoki 1448,
  390 i 320 px przechodzą axe i kontrolę overflow.
- Ekran `Procesy / Formularze` odtwarza teraz zwartą anatomię planszy produktu:
  pięć pełnowierszowych linków z nazwą, realną liczbą pytań i wersją, statusem
  oraz datą. Usunięto szeroki nagłówek tabeli, techniczne slugi, dokładną
  godzinę i powieloną akcję edycji; loading, empty i error state używają tej
  samej lekkiej powierzchni. Duży topbar zastąpił tytuł 12,8 px z małym,
  działającym CTA, a usunięcie limitu 78 rem pozwala karcie wykorzystywać pełną
  szerokość. Mobile mieści dane bez poziomego scrolla, a tenant scope
  i przejście do buildera pozostają bez zmian.
- Szczegóły leada wykorzystują pełne 1280 px obszaru roboczego; panel wyniku
  i prawa kolumna skalują się wraz z viewportem, a typografia operacyjna nie
  jest już kopiowana w miniaturowej skali planszy. Mobilna siatka materiałów
  nie powoduje overflow. Przy okazji poprawiono trzy kontrasty wskazane przez
  axe, bez zmiany tenant scope, danych ani server actions.
- Panel organizacji używa teraz jednego sidebara Lorum na wszystkich trasach:
  208 px domyślnie i 78 px po ręcznym zwinięciu. Przełącznik działa myszą
  i klawiaturą, ma widoczny focus, respektuje reduced motion oraz zapamiętuje
  wyłącznie lokalną preferencję UI. Usunięto warunkowe logo i osobną geometrię
  dashboardu; aktualny `Logoicon.svg`, nazwa Lorum, capability-gated linki,
  skróty i konto pozostają wspólne. Mobile używa osobnej, białej nawigacji
  bez przewijania: Start, Leady, Procesy, Analityka i „Więcej”. Rzadsze,
  capability-gated narzędzia, konto, powiadomienia i pomoc znajdują się
  w dostępnym arkuszu dolnym; szczegół leada oraz robocze trasy procesu
  odzyskują pełną wysokość bez globalnego paska.
- Uporządkowano dokumentację i referencje UI: pięć historycznych raportów
  przeniesiono do `docs/_archive/2026-07-28-pre-lorum-ui-v6/`, usunięto
  identyczną kopię master promptu, zbędny skrócony indeks czterech plansz oraz
  nieużywane duplikaty obrazów. Aktywne referencje pozostają w `references/`,
  a pełne pakiety źródłowe w `docs/ui/lorum-*-reference-*`.
- Panel Lorum został precyzyjnie zrekonstruowany z czterech zaakceptowanych
  referencji: historyczny rail 78 px i topbar 85 px, gęsty dashboard, tabela
  leadów, pełny dokument operacyjny z prawym panelem, analityka oraz wspólny
  settings shell. Wszystkie wartości i akcje nadal pochodzą z tenantowych
  usług, RLS i server actions; nie dodano fikcyjnego opiekuna, kalendarza,
  źródła ani preferencji. Dodatkowy pass 1:1 wyrównał kolumny i kartę buildera,
  topbary, pionowy rytm leada, wykresy dashboardu/analityki oraz ograniczył
  szerokość formularzy ustawień; overlay i difference zostały odświeżone.
  Rozmówna referencja dashboardu zastąpiła wcześniejszy wariant jego treści:
  używa czterech KPI, 18-słupkowego wykresu, donutu jakości i czterech gęstych
  wierszy leadów w geometrii zweryfikowanej dla 1090 × 890 px. Późniejszy
  Etap 12M ujednolicił sam sidebar dla wszystkich tras. Stopki
  wszystkich czterech KPI pokazują rzeczywistą procentową zmianę względem
  poprzednich 30 dni; spadek czasu realizacji jest oznaczany jako wynik
  korzystny.
- Lista leadów została przebudowana wyłącznie według najnowszej referencji
  rozmowy: jeden lekki kontener, tytuł z wyszukiwaniem i działającym CTA,
  pięć filtrów statusu, siedem zwartych kolumn, osiem rekordów na stronę oraz
  skrócona paginacja. Usługi, terminy, budżety, score i statusy nadal pochodzą
  z tenantowych danych; usunięto techniczny topbar, e-maile i drugie linie,
  które zaburzały gęstość referencji.
- Szczegóły leada zostały przebudowane wyłącznie według kolejnej referencji
  rozmowy: kompaktowy profil, wynik z trzema powodami, cztery działające
  zakładki oraz podsumowanie z notatką, statusem i głównym CTA. Odpowiedzi,
  prywatne pliki, historia, zgody i kontrolki retencji pozostały funkcjonalne;
  demonstracyjny lead ma trzy rzeczywiste załączniki w lokalnym Storage.
- Logowanie i rejestracja Lorum korzystają z pełnoekranowego, trójkolumnowego
  shella bez zewnętrznego nagłówka planszy. Subtelna biała oprawa zachowuje
  pierwszy viewport, sekcja cech zaczyna się poniżej, a dwie dopracowane
  ilustracje pokazują builder formularza, leady oraz rzeczywiste etapy
  konfiguracji zamiast generycznych brył. Drugi pass zmniejsza pola, CTA,
  nagłówki, ikony i rytm benefitów o około 20–30% oraz używa wersjonowanych
  adresów ilustracji, aby wykluczyć stary cache. Trzeci pass zwiększa widoczną
  białą oprawę do 12–24 px i rozdziela końcowe elementy rejestracji rytmem
  14–20 px.
- Nawigacja desktopowa strony głównej jest wycentrowana względem całego
  viewportu w niezależnej środkowej kolumnie; szerokość logo i CTA nie
  przesuwa już grupy linków, a zachowanie menu mobilnego pozostało bez zmian.
- Pierwszy fold `/` został skorygowany według najnowszej referencji Wyceno:
  pokazuje pełny dokument leada z ciemnym railem, rozgałęziony connector i
  sześć danych pod hero. Rail oraz węzeł używają właściwego znaku marki, Anna
  Kowalska ma fikcyjny portret demonstracyjny, a ikony odzyskały zielony kolor
  i jasne zielone tło; zachowano warianty 1440/1024/768/390/320.
- Sekcje poniżej hero korzystają ze wspólnej osi i szerokości hero. Usunięto
  nieaktualny poziomy blok „Jak działa Lorum?”, pozostawiono osobną sekcję
  szablonów, a kolejny region odtworzono jako referencyjne porównanie zapytania
  z pionowym procesem 01–04 i kompletnym, kompaktowym dokumentem leada.
- Logo `Logoicon.svg` jest używane jako ikona witryny oraz znak marki obok
  nazwy Lorum w górnym pasku strony głównej.

### Added

- Działające route’y dashboardu organizacji, procesów, pięciu szablonów i
  trzyobszarowego buildera. Edytor zapisuje draft z kontrolą rewizji,
  publikuje immutable wersję, obsługuje pytania, opcje, wymaganie, kolejność,
  podgląd oraz logikę warunkową, a na mobile/tablecie przechodzi w jawne tryby
  zadaniowe zamiast pomniejszać desktop.
- Audyt referencji, gap analysis i raport visual QA panelu z cropami,
  benchmarkami 1448/1536/768/430/390, side-by-side, overlay 50% i difference
  oraz warunkowy test E2E chronionych route’ów. Lokalny, loopback-only seed
  dostarcza deterministyczny stan QA bez zastępowania normalnej aplikacji.
- Pięć fotograficznych kafli branżowych bezpośrednio pod paskiem danych,
  prowadzących do istniejących procesów i zachowujących responsywną siatkę bez
  poziomego overflow.
- Etap 12F, landing board 2: pełnoszerokie, sześciokrokowe demo procesu z
  wymiarami, live briefem i wynikiem oraz przełączany panel pięciu szablonów
  branżowych z realną obsługą klawiatury, transformacją
  1440/1024/768/390/320 i kompletem artefaktów visual QA; końcowy pass usuwa
  elementy spoza referencji i zachowuje wysokość 1709/1710 px na desktopie
  oraz dokładnie 3053/3053 px na mobile.
- V6 Image-Locked reference lock: lokalny pakiet 36 unikalnych obrazów i
  specyfikacji, kanoniczny indeks dokumentacji, screen spec, responsive,
  visual QA, manifest, pomiary, rejestr luk i ADR-028 — bez zmian aplikacji.
- Etap 12E: referencyjna rekonstrukcja wyłącznie strony głównej — zwarty hero
  odpowiedzi → lead, hairline-strip sześciu danych, porównanie i czterostopniowy
  proces, osobny poziomy mobile proof oraz home-only ruch transform-only z
  no-JS, reduced motion i pełnym kontrastem w każdej klatce; pozostałe trasy i
  tokeny pozostały zamrożone.
- Etap 12D: referencyjny reset kompozycji Lorum — pięć rozdziałów landing page,
  jeden czytelny dokument leada zamiast mini-dashboardu, liniowe prymitywy bez
  dekoracyjnych kart oraz przejrzane baseline’y marketingu i design systemu dla
  desktopu i mobile.
- Etap 12C: semantyczny kontrakt tokenów Lorum, wspólna skala typografii,
  spacingu, promieni i cieni oraz ujednolicone prymitywy marketingu i panelu dla
  CTA, statusów, formularzy, tabel i powierzchni danych.
- Etap 12B: marka Lorum, spokojniejsze tokeny i typografia, nowa narracja
  zbierz–uporządkuj–zakwalifikuj–działaj oraz spójny rebranding marketingu,
  panelu, logowania, hosted flow, widgetu, e-maili i konektora WordPress bez
  zmiany publicznych identyfikatorów technicznych.
- Etap 0: komplet dokumentacji Discovery, architektury, UX, SEO, bezpieczeństwa, QA i realizacji.
- Nadrzędne zasady pracy w `AGENTS.md`.
- Etapowy backlog z gate’ami w `docs/TASKS.md`.
- Etap 1: pnpm/Turborepo monorepo, Node 24.18.0 LTS, strict TypeScript, ESLint, Prettier i Vitest.
- Minimalna aplikacja Next.js 16.2.11 z `GET /health`.
- Powtarzalny typecheck Next.js po czyszczeniu (`next typegen`) i uruchamianie
  produkcyjnego artefaktu standalone.
- Ścisła walidacja publicznego i serwerowego środowiska w `@wyceno/config`.
- GitHub Actions dla pełnego quality gate i skanowania sekretów oraz Dependabot.
- Polityki supply chain: exact versions, lockfile, release age, strict peers i allowlista build scripts.
- Etap 2: zatwierdzone tokeny, dostępna biblioteka `@wyceno/ui`, responsywny
  layout panelu i strona weryfikacyjna `/design-system`.
- Testy kontrastu, zachowania komponentów, axe, klawiatury, reduced motion oraz
  visual regression dla desktopu i mobile.
- Etap 3: migracja profili, organizacji, członkostw i audit logu z wymuszonym
  RLS oraz ochroną ostatniego aktywnego Ownera.
- Prywatny bucket tenantowy z politykami odczytu, zapisu i usuwania opartymi na
  aktywnym członkostwie i UUID organizacji w ścieżce.
- Supabase Auth SSR/PKCE, ekran logowania, odświeżanie sesji, chroniony panel i
  odpowiedzi `private, no-store`.
- `@wyceno/database` z typami schematu, macierzą capabilities i typowanym
  `TenantContext`.
- Rzeczywisty test PostgreSQL separacji dwóch tenantów dla danych i plików,
  wykonywany lokalnie i na serwisie PostgreSQL 17 w CI.
- Etap 4: wersjonowany dokument flow v1, walidator grafu, ograniczone reguły
  IF/THEN i pięć syntetycznych szablonów branżowych.
- Draft z kontrolą rewizji, atomowa publikacja, SHA-256 snapshotu, stabilny
  alias publiczny i archiwizacja wersji.
- Niezmienne snapshoty oraz integracyjne testy publikacji, konfliktów, pętli,
  ról i IDOR dla dwóch tenantów.
- Etap 5: natywny `@wyceno/widget`, idempotentny loader, Shadow DOM oraz tryby
  inline, popup, fullscreen i hosted link.
- Allowlistowany manifest, atomowe utworzenie sesji, hashowany token,
  siedmiodniowe expiry, rewizje i idempotentne mutacje odpowiedzi.
- Autosave, wznowienie, kolejka odporna na utratę sieci, synchronizacja kart i
  serwerowa walidacja routingu na immutable snapshotcie.
- Publiczne Route Handlers v1 z walidacją Zod, stabilnymi błędami, CORS,
  request ID i tokenem poza URL.
- Testy widgetu dla XSS, uszkodzonego storage, offline, mobile, klawiatury,
  axe, popupu i izolacji od CSS hosta oraz budżet 90 KiB gzip.
- Etap 6: wersjonowany, deklaratywny model pricingu i scoringu z integer minor
  units, basis points, stawkami jednostkowymi i jawnym round half-up.
- Deterministyczne kalkulatory TypeScript/PostgreSQL, kategorie 0–100 oraz
  uporządkowane ślady uruchomionych reguł.
- Serwerowy wynik na immutable snapshotcie sesji, bezpieczny publiczny endpoint
  bez scoringu i reguł wewnętrznych oraz prezentacja exact/range/from w widżecie.
- Testy granic, kolejności, walut, overflow, błędnej konfiguracji, niepełnej
  sesji i prób dostępu do prywatnego kalkulatora.
- Etap 7: wersjonowany lead capture z wymaganym e-mailem, potwierdzeniem
  informacji prywatności i odrębną opcjonalną zgodą marketingową.
- Atomowy, odporny na retry submit, który kopiuje odpowiedzi, ponownie liczy
  pricing/scoring i tworzy jeden lead na sesję bez ujawniania PII publicznie.
- Prywatny upload do 5 × 25 MiB z allowlistą JPEG/PNG/WebP/PDF, kontrolą
  rozszerzenia, MIME, magic bytes, SHA-256 i podpisanym odczytem w panelu.
- Responsywna lista i szczegół leadów dla Owner/Admin/Sales ze statusami,
  append-only historią, notatkami, zgodami, odpowiedziami i plikami.
- Testy PostgreSQL submitu, idempotencji, ról i IDOR między tenantami oraz E2E
  formularza kontaktowego i uploadu.
- Etap 8: wersjonowane, escapowane szablony HTML/text potwierdzenia klienta i
  alertu dla firmy, z semantyczną strukturą oraz bez prywatnego score dla
  klienta.
- Transakcyjny tenantowy outbox, historia prób, blokady workera, odzyskiwanie
  stale lock, ograniczony retry/backoff i maksymalnie pięć prób.
- Minimalnie uprzywilejowane RPC workera, chroniony endpoint wewnętrzny,
  deterministyczny test mode bez sieci i opcjonalny adapter Resend REST ze
  stabilnym kluczem idempotencji.
- Status dostawy na szczególe leada oraz testy renderowania, klasyfikacji błędów,
  braku PII w logach, izolacji tenantów i pełnego przepływu retry.
- Etap 9: first-party analytics z wersjonowaną, niewymuszoną zgodą, ścisłym
  kontraktem zdarzeń bez dowolnych metadanych i 90-dniową retencją.
- Tenantowe agregaty rozpoczęć, wyników, leadów, mediany czasu, drop-off,
  źródeł, urządzeń, wersji i rozkładu score z progiem małej próby pięciu sesji.
- Responsywny dashboard analityki dla Owner/Admin/Sales oraz surowe zdarzenia
  dostępne wyłącznie Owner/Admin; testy kontrolnych sesji potwierdzają metryki,
  izolację tenantów, wycofanie zgody i ograniczenia ról.
- Etap 10: code-first landing, produkt, jak działa, agencje, WordPress i uczciwy
  cennik pilotażowy bez wymyślonych kwot lub limitów.
- Pięć unikalnych stron branżowych i pięć stron funkcyjnych z działającym,
  bezsieciowym fragmentem demo, syntetycznymi briefami i jawnymi granicami.
- Allowlistowane sitemap/robots, unikalne metadata i canonical, bezpieczne
  Organization/SoftwareApplication/BreadcrumbList, noindex powierzchni
  prywatnych oraz dostępne strony 404/500.
- Crawl i link check 18 stron, axe/klawiatura, mobile bez overflow, kontrola
  uczciwego cennika i budżet 250 KiB transferu JavaScriptu marketingowego.
- Etap 11: jednorazowy, 10-minutowy bootstrap WordPress przypięty do originu
  HTTPS, hash-only token/credential w SaaS i szyfrowanie credentialu salts
  instalacji przez sodium w WordPressie.
- Tenantowe RPC i API connect/list/diagnostics/disconnect, panel Owner/Admin z
  tokenem pokazywanym tylko raz oraz audyt połączenia i revocation.
- Cienka wtyczka z listą opublikowanych flow, shortcode, dynamicznym blokiem
  Gutenberg, inline/popup/fullscreen, diagnostyką CSP/REST/WP/PHP/sodium i
  pełnym usunięciem lokalnego credentialu.
- Testy replay, ról, IDOR, allowlisty i braku plaintextu w PostgreSQL oraz
  harness PHP dla escapingu, TLS, pinned origin, braku sekretu we froncie i
  konfliktów globalnych. CI zawiera rzeczywistą macierz WordPress
  6.8.3–7.0.2 / PHP 8.3–8.5.
- Etap 12: model zagrożeń i audyt z mapą IDOR/XSS/upload/rate-limit/replay,
  jawnymi ownerami i terminami ryzyk oraz produkcyjnymi bramkami prawnymi.
- Owner-only eksport danych leada, legal hold i trwałe usunięcie storage-first
  wraz z wymuszonym RLS, nieidentyfikującym dowodem operacji i testami drugiego
  tenanta.
- Opt-in retencja leadów, cleanup wygasłych sesji i chroniony worker, który
  ponownie sprawdza warunki przed usunięciem oraz zatrzymuje się przy awarii
  Storage.
- ClamAV INSTREAM dla uploadu z fail-closed poza loopback, timeoutem i testami
  złośliwego pliku/awarii skanera.
- CSP/HSTS i pozostałe nagłówki ochronne, lokalny SAST/secret scan, CodeQL oraz
  blokujący dependency audit w CI.
- Remediacja wszystkich podatności high w grafie zależności przez bezpieczne
  `sharp@0.35.3`, `postcss@8.5.22` i `brace-expansion@5.0.8`; ponowny audit nie
  wykrywa znanych podatności. Wąski patch CommonJS zachowuje zgodność
  `minimatch@3` bez cofania poprawki bezpieczeństwa.
- Roboczy rejestr DPA/subprocesorów i checklistę review prawnego bez
  pozorowania podpisanej akceptacji.
- Poprawiona instrukcja lokalnego startu: pnpm uruchamia przypięty Node 24.18.0,
  marketing działa bez bazy, a Auth/panel wymagają Supabase i
  `apps/web/.env.local` zamiast pliku env w root repozytorium.
- Etap 12A: premium minimalistyczny redesign 18 tras marketingowych z
  code-native widokiem kwalifikacja → brief, redakcyjnymi kompozycjami,
  dostępnym menu mobilnym i pełną macierzą responsywną 1440–320 px.
- Spójny operacyjny shell panelu z wąskim zielonym railem, tabelą leadów,
  dokumentowym szczegółem, spokojną analityką, integracjami, prywatnością oraz
  stanami loading/empty/error/permission/success.
- Ujednolicone logowanie, hosted flow i wszystkie tryby widgetu: mniejsze
  promienie, cienkie linie, oszczędne statusy, forced colors i reduced motion.
- Artefakty porównawcze przed/po, testy dostępności/klawiatury/crawlu oraz raport
  zgodności i self-review w
  `docs/_archive/2026-07-28-pre-lorum-ui-v6/PREMIUM_MINIMAL_REDESIGN_AUDIT.md`.

### Not implemented

- Podpisane review prawne DPA/subprocesorów, zatwierdzone okresy i transfery
  oraz produkcyjny scheduler/hosting/WAF pozostają bramkami zamknięcia Etapu 12
  i wejścia do Etapu 13.
- Zdalny przebieg GitHub Actions jest zablokowany przez stan billingowy konta
  GitHub, zanim runner zaczyna wykonywać kroki projektu.
