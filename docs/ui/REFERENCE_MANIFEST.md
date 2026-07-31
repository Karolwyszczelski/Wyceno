# Manifest referencji V6 Image-Locked

**Status:** kanoniczny  
**Data blokady:** 2026-07-27  
**Źródło historyczne:** `nowydesign.zip` — usunięte po poprawnej ekstrakcji  
**SHA-256 archiwum:** `f1e86da64f28788065d687e7c2b65e9199af162ca4ff1bec9e05266b838fc141`

## Hierarchia

1. Najnowsze zaakceptowane załączniki rozmowy — wyłącznie dla regionu, który
   pokazują czytelniej niż plik repozytorium.
2. Cztery główne obrazy w `references/`.
3. Pełne plansze landingowe i produktowe z pakietów źródłowych.
4. Prototypy HTML/CSS i generatory — źródło pomiarów, nie kod produkcyjny.
5. Starsze screenshoty i raporty — kontekst historyczny.

Wymagania bezpieczeństwa, `DECISIONS.md`, `SCOPE.md` i `NON_GOALS.md` mają
pierwszeństwo przed każdym obrazem.

## Główne obrazy

| Plik                                   |     Rozmiar | SHA-256            | Zakres                                                   |
| -------------------------------------- | ----------: | ------------------ | -------------------------------------------------------- |
| `references/accepted-master-board.png` | 1536 × 1024 | `992ebb2b…e201696` | landing, dashboard, lead detail, mobile, design system   |
| `references/product-app-board.png`     | 1536 × 1024 | `df3c7894…a31101`  | leady, procesy, szablony, analityka, ustawienia, builder |
| `references/landing-desktop-full.png`  | 1536 × 7708 | `e4d89c09…ce657`   | 15 sekcji landingu desktop                               |
| `references/landing-mobile-full.png`   | 390 × 14302 | `eb43b17e…c7063`   | pełna transformacja mobile                               |

Pełne sumy znajdują się w historii kontroli
`_migration/LORUM_REFERENCE_LOCK_REPORT.md`.

## Landing

Źródło: `lorum-landing-reference-v2/`.

| Render                                  |     Rozmiar |
| --------------------------------------- | ----------: |
| `screenshots/lorum-board-1-desktop.png` | 1536 × 1311 |
| `screenshots/lorum-board-2-desktop.png` | 1536 × 1710 |
| `screenshots/lorum-board-3-desktop.png` | 1536 × 2470 |
| `screenshots/lorum-board-4-desktop.png` | 1536 × 2220 |
| `screenshots/lorum-board-1-mobile.png`  |  390 × 2355 |
| `screenshots/lorum-board-2-mobile.png`  |  390 × 3053 |
| `screenshots/lorum-board-3-mobile.png`  |  390 × 5210 |
| `screenshots/lorum-board-4-mobile.png`  |  390 × 3687 |

`index.html` i `styles.css` służą do odczytu proporcji. Produkcja używa
semantycznego React/Next.js i wspólnych tokenów `packages/ui`.

## Produkt

Źródło: `lorum-product-ui-reference-v1/reference/manifest.json`.

- 20 screenshotów ekranów: 14 desktop 1440 × 900 i 6 mobile 390 × 844;
- 5 plansz tematycznych 1536 × 1024;
- przyjęte obszary: operacje leadów, builder/reguły, analityka i wdrożenie,
  system/onboarding oraz zestaw mobile.

## Załączniki nowsze niż pakiet

| ID    | Zakres                              | Decyzja                                                                                                     |
| ----- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| A i B | identyczny builder desktop          | wąski rail, sekcje/pytania, centralny preview, prawy inspector; nadpisuje starszy builder                   |
| C     | lead operacyjny desktop             | bogaty dokument i stały panel sprzedażowy; nadpisuje prostszy lead detail                                   |
| D     | plansza produktu Wyceno             | źródło gęstości i regionów, ale nie nazwy marki ani grafu node-based                                        |
| E     | landing desktop/mobile Wyceno       | źródło geometrii pierwszego folda                                                                           |
| F     | zaakceptowany master board Wyceno   | starszy poprzednik planszy Lorum                                                                            |
| G     | starsza sekcja pod hero             | cztery poziome kroki i pięć kafli; zastąpiona dla tego regionu przez załącznik H                            |
| H     | ikony i sekcje poniżej hero         | okrągłe zielone ikony, osobne szablony oraz porównanie + pionowy proces + dokument leada                    |
| I     | plansza auth 1536 × 1024            | osobne desktopowe ekrany logowania i rejestracji; lokalny oryginał blokuje anatomię                         |
| J     | pełnoekranowe logowanie 2048 × 1157 | auth wypełnia pierwszy viewport; bez zewnętrznej ramy, cechy dopiero poniżej                                |
| K     | korekta gęstości auth 2048 × 1202   | mniejsze kontrolki, ikony, typografia i ilustracje; więcej oddechu między grupami                           |
| L     | lista leadów 816 × 592              | jeden lekki kontener, search + CTA, pięć filtrów, siedem kolumn i zwarta paginacja                          |
| M     | szczegóły leada 794 × 578           | profil, score + 3 powody, 4 zakładki i podsumowanie z prawym panelem obsługi                                |
| N     | biblioteka szablonów, pełna trasa   | pięć mniejszych kart w jednym rzędzie, zwarty nagłówek; nadpisuje kolumny wąskiego cropa                    |
| O     | cały landing `/`, kierunek tekstowy | autorskie telefony 3D, profesjonalny minimalizm i jeden język wizualny całej strony                         |
| P     | analityka, kierunek tekstowy        | styl dashboardu; dolne dane jako etapy, bąble, kafelki, karty i pierścienie zamiast pasków                  |
| Q     | pozostałe ekrany produktu           | Lorum, jeden zwijany sidebar, pełny workspace i wdrożenie wszystkich powierzchni z realnym modelem danych   |
| R     | pełny dashboard operacyjny          | sześć KPI, trzy rzędy danych, szybkie akcje i realne statusy; nadpisuje wcześniejszy ubogi dashboard        |
| S     | landing `/`, korekta tekstowa       | trzy faktyczne ekrany Lorum jako szklane panele 3D; nadpisuje telefony i dekoracyjny render                 |
| T     | rozbudowana biblioteka szablonów    | toolbar, KPI, pięć bogatych kart i detal wyboru; nadpisuje pustą kompozycję N, ale nie dodaje atrap funkcji |
| U     | hero `/`, render telefonu           | fizyczny telefon bez prostokątnego tła, UI wychodzące z ekranu, sześć ikon; nadpisuje S tylko w hero        |

Oryginały panelowe A/C/F są dostępne w `apps/web/public/panel/`, a D w
`references/product-app-board.png`; zostały zablokowane 2026-07-27:

| Plik                                       | Rozmiar     | SHA-256                                                            | Rola             |
| ------------------------------------------ | ----------- | ------------------------------------------------------------------ | ---------------- |
| `ChatGPT Image 26 lip 2026, 18_28_24.png`  | 1448 × 1086 | `918e0d8edfdb02d899310e61b36bcf25618bd1a761bf62809fb9927d4a68a526` | builder desktop  |
| `ChatGPT Image 26 lip 2026, 18_25_28.png`  | 1448 × 1086 | `703c33bad14a870d60f43e8d7051774e9f439b8bfe74aaf258c0c7ab64ed41cd` | lead operacyjny  |
| `references/product-app-board.png`         | 1536 × 1024 | `df3c7894a60bddfb2f3268b2e1525097abc93b25ff4535a6303741bab0a31101` | plansza produktu |
| `42114905-a89b-4b72-b59e-383662af41ae.png` | 1536 × 1024 | `33d06d6680b312baf09b11ead9065d220b6098d40149927f4d5dcbf68fb537e7` | master board     |

Ich cropy, rendery aplikacji, overlay 50% i difference są indeksowane w
`panel-visual-qa.md`. Referencje nadal nie są importowane do produkcyjnego UI.

Pomocniczy, odpowiadający załącznikowi crop G jest zapisany jako
`ui/references/accepted/home-post-hero-overview-1098x624.png`; ma rozmiar
1098 × 624 px i SHA-256
`8afeef589bd3e32752117181fc159dbfce91e8474eff92139622198bfdc7b4f2`.
Załącznik H jest dostępny wyłącznie w rozmowie i ma pierwszeństwo przed G dla
ikon, kolejności sekcji oraz dwukolumnowego regionu porównania. Do czasu
zapisania oryginału w repozytorium nie przypisujemy mu sztucznego SHA-256 ani
wyniku pixel diff.

Załącznik I jest zapisany jako `apps/web/public/ekranylogowania.png`; ma
1536 × 1024 px i SHA-256
`ba9927f454330835c6a7d1663cd294913ceafdf6f322aef44ea7e059eca630fd`.
Pokazuje dwa trójstrefowe ekrany auth na wspólnej planszy. Załącznik J
rozstrzyga, że na pojedynczej trasie trójkolumnowy region wypełnia cały pierwszy
viewport, bez zewnętrznego nagłówka, sloganu i podpisu ekranu; sekcja pięciu
cech zaczyna się poniżej. Dekompozycję zapisuje
`AUTH_REFERENCE_ANALYSIS_2026-07-27.md`. Osobne referencje mobile oraz lokalne
zrzuty i overlay są nadal wymagane przed visual PASS.

Załącznik L jest dostępny wyłącznie w rozmowie i nadpisuje wcześniejszą listę
leadów tylko na trasie `/panel/[organizationId]/leady`. Do czasu zapisania
oryginału nie przypisujemy mu sztucznego SHA-256 ani wyniku pixel diff.

Załącznik M jest dostępny wyłącznie w rozmowie i nadpisuje wcześniejszy ekran
szczegółów tylko na trasie `/panel/[organizationId]/leady/[leadId]`. Zachowuje
realne odpowiedzi, pliki, historię, notatki, status i uprawnienia tenantowe.

Decyzja N jest tekstową korektą właściciela do regionu szablonów z planszy D.
Na pełnej trasie `/panel/[organizationId]/szablony` pięć kart ma pozostać
w jednym rzędzie i używać mniejszych obrazów oraz zwartego nagłówka. Nie
zatwierdza nowej funkcji tworzenia szablonu; istniejące przyciski nadal tworzą
niezależny draft z wybranego, walidowanego szablonu.

Decyzja O jest tekstową dyspozycją właściciela z 2026-07-29 i nadpisuje język
wizualny całej strony głównej bez zmiany jej kontraktów produktu. Hero oraz
sekcja branżowa używają code-native telefonów 3D, a dalsze proofy wspólnej
perspektywy, promieni i rytmu. Nie dostarczono nowego obrazu źródłowego, więc
nie przypisujemy tej decyzji sztucznego SHA-256 ani pixel-perfect PASS.
Artefakty before/after i overlay znajdują się w
`artifacts/visual-qa/landing-3d-redesign/`.

Decyzja S jest nowszą tekstową korektą właściciela z 2026-07-29 i zastępuje
Decyzję O wyłącznie dla całej kompozycji `/`. Hero pokazuje proces klienta,
builder z regułą oraz gotowy lead jako trzy code-native szklane powierzchnie
w jednej perspektywie. Nie używa telefonicznych ramek, wygenerowanego tekstu
ani dekoracyjnego renderu 3D. Pięć telefonów branżowych i powtarzalne proofy
zastępuje sześcioczęściowa narracja z jednym ciągłym storyboardem. Nie
dostarczono nowego obrazu źródłowego, więc decyzji nie przypisujemy sztucznego
SHA-256; deterministyczne baseline’y znajdują się w
`artifacts/visual-qa/landing-glass-panels/`.

Decyzja P jest tekstową dyspozycją właściciela z 2026-07-29 dla trasy
`/panel/[organizationId]/analityka`. Górny region ma korzystać z geometrii,
gęstości i języka wizualnego dashboardu, a dalsza część ma rozwijać widok
o rzeczywiste trendy, lejek, score, źródła, urządzenia, drop-off i wersje.
Nie zatwierdza atrap filtrów; wybór 7/30/90 dni pozostaje działającą nawigacją,
a agregaty zachowują minimalną próbę i tenant scope. Kolejna korekta
właściciela zastępuje powtarzalne paski dolnego regionu etapami, bąblami,
wykresami kafelkowymi, kartami diagnostycznymi i pierścieniami. Crop planszy
produktu, pełne rendery i porównania znajdują się w
`artifacts/visual-qa/12r-analytics-dashboard-style/`.

Decyzja Q jest dyspozycją właściciela z 2026-07-29, aby domknąć pozostałe
ekrany bez kolejnych zmian sidebara i bez atrap funkcji. Obejmuje ustawienia
organizacji, powiadomienia, integrację WordPress, instalację, onboarding, auth
QA oraz widget desktop/mobile/result. Nazwa prezentacyjna pozostaje Lorum,
sidebar jest jeden i zwijany, a treść wypełnia workspace. Elementy z referencji
bez modelu danych — agency clients, billing, branding, domeny, zespół, API keys
i przełączniki preferencji — pozostają świadomie wyłączone. Plan, decyzje
i dowody znajdują się w `REMAINING_SCREEN_PLAN_2026-07-29.md` oraz
`artifacts/visual-qa/12s-remaining-screens/`.

Decyzja R pochodzi z załącznika właściciela o rozmiarze 1964 × 1500 px
z 2026-07-29 i nadpisuje wcześniejszą treść trasy
`/panel/[organizationId]`. Dashboard zachowuje sidebar Lorum, ale przejmuje
z obrazu gęsty rząd sześciu KPI, trzy główne wizualizacje, tabelę leadów,
ranking procesów, źródła, przedziały wartości, rekordy wymagające reakcji,
powiadomienia i szybkie akcje. Moduły bez modelu danych nie są kopiowane.
Oryginał, kontrakt i dowody znajdują się w
`artifacts/visual-qa/12t-dashboard-reconstruction/` oraz
`DASHBOARD_REFERENCE_IMPLEMENTATION_2026-07-29.md`.

Decyzja T pochodzi z zaakceptowanego załącznika właściciela
`ChatGPT Image 29 lip 2026, 20_09_10.png`, 1448 × 1086 px, SHA-256
`7078cfed148b3734ae1ed40fa92b4161d222641bdb97ca6f30b1b8d6c7885ec1`.
Nadpisuje Decyzję N wyłącznie dla trasy
`/panel/[organizationId]/szablony`: wprowadza breadcrumb, nagłówek z akcjami,
działające wyszukiwanie i filtry, trzy KPI, bogatsze karty oraz szczegół
wybranego szablonu. Obraz nie zatwierdza nieistniejącego importu, tworzenia
własnych szablonów, dwunastu rekordów ani analityki wykorzystania. Produkcja
używa pięciu walidowanych `flowTemplates`, realnych liczników dokumentu
i istniejącej akcji tworzenia tenantowego draftu. Zablokowana referencja,
stan przed i dowody znajdują się w
`artifacts/visual-qa/12zc-template-library-override/`.

Decyzja U jest nowszą dyspozycją właściciela z 2026-07-29 i nadpisuje
Decyzję S wyłącznie w hero trasy `/`. Desktop używa jednego fizycznego
telefonu z demonstracyjnym ekranem procesu oraz elementami kwalifikacji
wychodzącymi poza ekran. Mobile używa osobnego kadru z samym telefonem,
uciętym prawą krawędzią. Prostokątne tło renderu zostało usunięte kanałem
alfa, a pod hero wraca sześć okrągłych ikon z Decyzji H. Dalsza
sześcioczęściowa struktura landingu pozostaje bez zmian.

| Plik                                                                           | Rozmiar     | SHA-256                                                            |
| ------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------ |
| `apps/web/public/images/redesign/lorum-hero-phone-desktop-transparent-v4.webp` | 1536 × 1024 | `1781845b7dcebedb086200d409e0807c368706a45bdf2a0794b782c7e9a7c0eb` |
| `apps/web/public/images/redesign/lorum-hero-phone-mobile-transparent-v4.webp`  | 864 × 1821  | `bef2d7c2f74702d0bc47cf146c4a922fc4ba75dccc53d4db951c44a38c490537` |

Wygenerowane ilustracje produktowe Etapu 12K:

| Plik                                           | Rozmiar     | SHA-256                                                            |
| ---------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `apps/web/public/auth-login-product-v2.png`    | 1024 × 1536 | `5314c0b79ab860aa7faff51574d9972d08a7fa108318590dc8a667ecb0161cba` |
| `apps/web/public/auth-register-product-v2.png` | 1024 × 1536 | `c5f2cd0104b9cfbfe212b7505d7b0d4d0b11a4275b75ed4ac41119e9afb408f9` |

Obie grafiki mają kanał alfa. Logowanie pokazuje rail procesu, builder
formularza, wynik i listę leadów; rejestracja pokazuje potwierdzenie,
organizację i uruchomienie formularza. Nie zawierają tekstu, logo ani
syntetycznych danych osobowych.

## Duplikaty

W aktywnym drzewie pozostają trzy celowe duplikaty między ścieżkami wymaganymi
przez master prompt a odtwarzalnymi pakietami źródłowymi:

- top-level `accepted-master-board.png` = produktowy `accepted-style-board.png`;
- top-level landing desktop = pełny render landingowy desktop;
- top-level landing mobile = pełny render landingowy mobile.

Cztery dodatkowe kopie plansz z `ui/references/` usunięto 2026-07-28. Pakiety
źródłowe zachowują oryginalną strukturę dla odtwarzalności.
