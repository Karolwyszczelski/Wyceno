# LORUM — MASTER PROMPT V6 IMAGE-LOCKED — PEŁNA PRZEBUDOWA UI 1:1 Z REFERENCJAMI

> Ten prompt jest nadrzędnym kontraktem wykonawczym dla istniejącego repozytorium. Załączone obrazy są specyfikacją wizualną, nie inspiracją. Nie jest to zgoda na swobodne projektowanie ani wygenerowanie całej aplikacji w jednym przebiegu.

---

## 0. TRYB PRACY I ROLA

Działasz jako **jeden skoordynowany zespół seniorów**, a nie jako generator pojedynczych ekranów, szybki wykonawca ani autor kilku konkurencyjnych koncepcji.

W każdym etapie wykonujesz kolejno jeden spójny pass z perspektywy:

1. **Product Lead** — pilnuje celu produktu, głównego JTBD, zakresu i priorytetów.
2. **UX Architect** — ustala hierarchię informacji, przepływy, kolejność treści, stany i transformację responsive.
3. **Principal Product Designer** — odwzorowuje zaakceptowaną geometrię, gęstość i system wizualny bez improwizacji.
4. **Design System Lead** — pilnuje tokenów, komponentów, stanów i braku lokalnych wyjątków.
5. **Senior Frontend / Next.js Engineer** — implementuje w istniejącym stacku, bez naruszania domeny i kontraktów.
6. **Responsive Layout Engineer** — odpowiada za brak overflow, nakładania, clippingu i przypadkowych breakpointów.
7. **Accessibility Specialist** — sprawdza semantykę, klawiaturę, focus, zoom i WCAG 2.2 AA.
8. **QA & Visual Regression Engineer** — wykonuje testy funkcjonalne, layout integrity, screenshoty i visual diff.
9. **Documentation Architect** — porządkuje źródła prawdy i usuwa konfliktujące dokumenty według bezpiecznej procedury.
10. **Security & Performance Reviewer** — pilnuje tenant scope, danych, bundle, renderowania i regresji.
11. **Release Manager** — nie pozwala przejść dalej bez spełnienia gate’u.

Role nie tworzą osobnych propozycji. Ich wynikiem ma być **jedna decyzja i jedna implementacja**.

### 0.1. Orkiestracja wielu agentów

Jeżeli środowisko Codexa obsługuje wiele agentów lub worktrees, użyj ich jak prawdziwy zespół, ale bez równoległego chaosu:

- **Repository & Architecture Auditor** — tryb read-only; mapuje routing, shell, zależności, API i chronione kontrakty.
- **Documentation Curator** — tryb read-only w Fazie 0; tworzy inwentarz i plan KEEP/MERGE/REPLACE/ARCHIVE/DELETE.
- **Design System Auditor** — mapuje tokeny, primitive, lokalne wyjątki i źródła niespójności.
- **Responsive & Visual QA Engineer** — uruchamia aplikację, wykonuje screenshoty, layout audit i opisuje różnice względem referencji.
- **Accessibility & Interaction Reviewer** — sprawdza focus, klawiaturę, zoom, overlaye i zachowanie formularzy.
- **Integration Lead** — jest jedynym właścicielem zmian we współdzielonych plikach UI, tokenach, app shellu i dokumentach canonical.
- **Test/Release Engineer** — uruchamia testy i blokuje merge przy P0/P1.

Reguły pracy równoległej:

1. W Fazie 0 agenci audytowi nie modyfikują kodu.
2. Nigdy nie pozwalaj dwóm agentom jednocześnie edytować tych samych plików, tokenów, root layoutu, globalnego CSS ani app shellu.
3. Niezależne zadania mogą pracować w odseparowanych worktrees, ale ich wynik trafia do jednego Integration Leada.
4. Każdy subagent zwraca ustalenia w ujednoliconym formacie: `dowód → ryzyko → rekomendacja → pliki → test`.
5. Integrator odrzuca rozwiązania sprzeczne z kontraktem layoutu, dokumentacją canonical lub referencjami.
6. Nie scalaj zmian bez diff review, screenshotów, layout audit, lint, typecheck, testów i builda.
7. Jeżeli wieloagentowość nie jest dostępna, wykonaj te same role kolejno w jednej sesji — bez pomijania żadnego passu.

Nie opisuj fikcyjnej dyskusji zespołu. Raportuj jedynie ustalenia, ryzyka, wykonane zmiany i dowody weryfikacji.

---

## 1. CEL

Masz przeprowadzić kontrolowaną przebudowę aktywnego produktu **Lorum** tak, aby:

- zachować działającą logikę, dane, API, routing, auth, RLS, integracje i testy,
- całkowicie zastąpić niespójną warstwę prezentacji jednym profesjonalnym systemem,
- wdrożyć pełny landing, panel, builder, widget i ekrany administracyjne,
- uporządkować dokumentację i ustanowić jedno kanoniczne źródło prawdy,
- wyeliminować wygląd „AI-generated SaaS”,
- wyeliminować nakładanie, rozjeżdżanie, clipping, przypadkowy scroll poziomy i złe transformacje mobile,
- doprowadzić każdy moduł do stanu produkcyjnego, a nie tylko do statycznej makiety.

To jest **redesign warstwy produktu**, nie swobodne przepisywanie architektury i nie budowanie nowej aplikacji obok istniejącej.

---

## 2. AKTUALNA MARKA I MIGRACJA NAZWY

Widoczna nazwa produktu w aktywnym UI, marketingu, e-mailach, metadanych i nowych dokumentach to:

# Lorum

Nazwy `Wyceno`, `BRANCI`, `Branci`, `Brunchy` i inne wcześniejsze warianty są historyczne i nie mogą wrócić do aktywnego copy.

Jednocześnie:

- nie wykonuj bezmyślnego globalnego replace,
- nie zmieniaj automatycznie nazw tabel, kolumn, bucketów, migracji, kluczy API, webhooków, callbacków, publicznych identyfikatorów ani pakietów,
- najpierw przygotuj matrycę migracji `legacy identifier → decyzja → ryzyko → docelowa wartość`,
- techniczne identyfikatory pozostawione celowo muszą być opisane w ADR.

Referencje wizualne mogą zawierać nazwę „Wyceno”. Traktuj ją wyłącznie jako historyczne copy w obrazie. W implementacji użyj **Lorum**, zachowując geometrię i proporcje.

---

## 3. ŹRÓDŁA PRAWDY — OBOWIĄZKOWA KOLEJNOŚĆ

Przed jakąkolwiek zmianą przeczytaj i obejrzyj w całości:

```text
AGENTS.md
README.md
CONTRIBUTING.md
package.json
workspace / monorepo config
aktualne docs/TASKS.md
aktualne docs/DECISIONS.md
aktualne docs/RISKS.md

docs/ui/lorum-product-ui-reference-v1/START_HERE.md
docs/ui/lorum-product-ui-reference-v1/docs/00_CANONICAL_SOURCE_OF_TRUTH.md
docs/ui/lorum-product-ui-reference-v1/docs/01_PRODUCT_UI_ARCHITECTURE.md
docs/ui/lorum-product-ui-reference-v1/docs/02_SCREEN_INVENTORY.md
docs/ui/lorum-product-ui-reference-v1/docs/03_DESIGN_SYSTEM.md
docs/ui/lorum-product-ui-reference-v1/docs/04_RESPONSIVE_RULES.md
docs/ui/lorum-product-ui-reference-v1/docs/05_CONTENT_AND_DATA_RULES.md
docs/ui/lorum-product-ui-reference-v1/docs/06_DOCUMENT_MIGRATION_AND_CLEANUP.md
docs/ui/lorum-product-ui-reference-v1/docs/07_VISUAL_QA_AND_ACCEPTANCE.md
docs/ui/lorum-product-ui-reference-v1/docs/08_IMPLEMENTATION_SEQUENCE.md
docs/ui/lorum-product-ui-reference-v1/docs/09_REFERENCE_MAP.md
docs/ui/lorum-product-ui-reference-v1/docs/10_STATES_AND_EDGE_CASES.md
docs/ui/lorum-product-ui-reference-v1/docs/11_COMPONENT_BLUEPRINTS.md
docs/ui/lorum-product-ui-reference-v1/docs/12_SCREEN_ACCEPTANCE_MATRIX.md

docs/ui/lorum-landing-reference-v2/LORUM_LANDING_VISUAL_SPEC.md
docs/ui/lorum-landing-reference-v2/CODEX_IMPLEMENTATION_PROMPT.md

docs/ui/MASTER_SCREEN_SCOPE.md
docs/ui/RESPONSIVE_LAYOUT_INTEGRITY.md
docs/ui/DOCUMENT_CLEANUP_POLICY.md
snippets/layout-integrity.spec.ts
docs/ui/REFERENCE_IMAGE_PROTOCOL.md
docs/ui/SECTION_FIDELITY_MATRIX.md
docs/ui/PRODUCT_SCREEN_FIDELITY_MATRIX.md
docs/ui/VISUAL_ACCEPTANCE_SCORECARD.md
```

Obejrzyj również wszystkie obrazy w:

```text
references/accepted-master-board.png
references/product-app-board.png
references/landing-desktop-full.png
references/landing-mobile-full.png
docs/ui/lorum-product-ui-reference-v1/reference/
docs/ui/lorum-landing-reference-v2/screenshots/
```

Obrazy załączone bezpośrednio do bieżącej wiadomości mają pierwszeństwo przed ich kopiami w repozytorium.

Hierarchia decyzji:

1. bezpieczeństwo, auth, RLS i separacja tenantów,
2. działające kontrakty domenowe oraz API,
3. dokumenty kanoniczne,
4. zaakceptowane screenshoty i deterministyczne prototypy HTML/CSS,
5. istniejące testy zachowania,
6. stara dokumentacja po analizie,
7. obecny wygląd aplikacji wyłącznie jako materiał do audytu.

**Obecny wygląd nie jest źródłem stylu.** Zachowuj z niego tylko poprawną logikę, semantykę, dane, routing i zachowanie.

Jeżeli któregoś obowiązkowego źródła brakuje, nie improwizuj. Zapisz brak w raporcie i zatrzymaj się przed implementacją.

---


## 3A. IMAGE-LOCK — ZAŁĄCZONE OBRAZY SĄ NADRZĘDNĄ SPECYFIKACJĄ WIZUALNĄ

### 3A.1. Zasada nadrzędna

**Wszystkie obrazy załączone do tej samej wiadomości, w której otrzymujesz ten prompt, są PRIMARY VISUAL SOURCE OF TRUTH.**

Nie są:

- moodboardem,
- luźną inspiracją,
- propozycją kierunku,
- przykładem kolorystyki,
- materiałem, który można „uprościć”,
- zgodą na własną interpretację stylu.

Są wizualnym kontraktem określającym jednocześnie:

- kompozycję,
- proporcje,
- hierarchię,
- gęstość informacji,
- podział ekranu na regiony,
- rytm pionowy i poziomy,
- rodzaj powierzchni,
- szerokości paneli,
- wysokości kontrolek,
- typografię,
- sposób użycia linii i separatorów,
- promienie,
- cienie,
- ikonografię,
- statusy,
- relacje między elementami,
- poziom szczegółowości danych,
- sposób transformacji desktop → tablet → mobile.

Masz odwzorować **cały język wizualny**, a nie jedynie zielony kolor, białe karty i podobny font.

### 3A.2. Obowiązkowe rozpoznanie referencji przed pracą

W pierwszej odpowiedzi, zanim dotkniesz kodu, wypisz wszystkie obrazy, które rzeczywiście widzisz w wiadomości. Dla każdego obrazu opisz:

1. jego zakres,
2. widoczne ekrany lub sekcje,
3. desktop/mobile,
4. najważniejsze cechy kompozycji,
5. elementy krytyczne, których nie wolno zgubić.

Oczekiwane rodziny referencji obejmują co najmniej:

- zaakceptowaną planszę master z landingiem, dashboardem, lead detail i mobile,
- planszę pozostałych ekranów aplikacji,
- pełny landing desktop,
- pełny landing mobile,
- osobne plansze/cropy landingu,
- osobne ekrany dashboardu, leadów, buildera, widgetu, analityki, ustawień i onboardingów.

Jeżeli któregoś obrazu nie widzisz, jest zbyt mały, rozmyty albo niedostępny:

1. nie zgaduj,
2. nie zaczynaj implementacji tej części,
3. wskaż dokładnie brakującą referencję,
4. zakończ etap statusem `BLOCKED_BY_MISSING_REFERENCE`.

### 3A.3. Hierarchia referencji

W przypadku konfliktu stosuj kolejność:

1. najnowsze obrazy załączone do bieżącej wiadomości,
2. `references/accepted-master-board.png`,
3. `references/product-app-board.png`,
4. `references/landing-desktop-full.png`,
5. `references/landing-mobile-full.png`,
6. szczegółowe screenshoty w `docs/ui/lorum-product-ui-reference-v1/reference/screenshots/`,
7. deterministyczne prototypy HTML/CSS,
8. aktywne dokumenty kanoniczne,
9. obecna implementacja wyłącznie jako źródło logiki i danych.

Jeżeli najnowszy obraz zmienia wcześniejsze rozwiązanie, zapisz override w `docs/DECISIONS.md` i `docs/ui/REFERENCE_MANIFEST.md`.

### 3A.4. Zakaz „okrojonego stylu”

Nie wolno redukować referencji do uproszczonego szablonu.

Przykłady niedozwolonego uproszczenia:

- zamiana pełnego panelu produktu na trzy dekoracyjne karty,
- zamiana tabeli leadów na generyczne kafelki na desktopie,
- pominięcie filtrów, tabów, statusów, paginacji lub akcji widocznych w referencji,
- zastąpienie rzeczywistego UI pustym prostokątem z napisem „dashboard”,
- zmniejszenie liczby wierszy i danych tylko po to, aby było łatwiej,
- zamiana sekwencji procesu na siatkę ikon,
- spłaszczenie buildera do pojedynczego formularza,
- usunięcie bocznych paneli bez prawidłowej transformacji responsive,
- zastąpienie złożonej sekcji marketingowej zwykłym tekstem i obrazkiem,
- użycie jednej generycznej karty jako wzorca dla każdej sekcji,
- pozostawienie pustej przestrzeni zamiast wewnętrznej struktury produktu,
- kopiowanie wyłącznie kolorów i promieni bez odwzorowania geometrii.

Jeżeli referencja pokazuje:

- osiem wierszy — implementacja ma posiadać pełną strukturę o porównywalnej gęstości,
- sidebar — ma istnieć sidebar lub jego świadoma transformacja mobile,
- tabs — mają istnieć tabs z właściwymi stanami,
- toolbar — ma istnieć funkcjonalny toolbar,
- chart — ma wynikać z danych albo być jawnie oznaczonym seedem demo,
- podgląd procesu — ma być rzeczywistym podglądem, nie obrazem,
- relację odpowiedzi → lead — relacja ma być czytelna również w działającym UI.

### 3A.5. Obowiązkowa dekompozycja obrazu

Zanim rozpoczniesz implementację, utwórz:

```text
docs/ui/REFERENCE_MANIFEST.md
docs/ui/REFERENCE_DECOMPOSITION.md
docs/ui/VISUAL_MEASUREMENTS.md
docs/ui/REFERENCE_GAPS.md
docs/ui/references/derived/
```

Dla każdego obrazu:

1. zapisz nazwę źródła,
2. zapisz jego natywny rozmiar,
3. podziel go na logiczne regiony i ekrany,
4. wykonaj cropy do `docs/ui/references/derived/`, jeżeli środowisko na to pozwala,
5. przypisz każdy region do route/komponentu/sekcji,
6. określ desktopowy i mobilny odpowiednik,
7. zapisz elementy niepodlegające interpretacji,
8. zapisz elementy nieczytelne lub wymagające decyzji.

Minimalna tabela manifestu:

| ref id | plik/obraz | region | ekran/sekcja | viewport | elementy obowiązkowe | mobile transform | status |
|---|---|---|---|---|---|---|---|

### 3A.6. Pomiar przed kodowaniem

Dla każdego ekranu lub sekcji zapisz przed implementacją:

- szerokość viewportu referencji,
- szerokość głównego kontenera,
- marginesy boczne,
- liczbę kolumn,
- proporcje kolumn,
- gapy,
- wysokość headera,
- wysokości głównych kontrolek,
- rozmiary i line-height tekstów,
- grubość borderów,
- radius,
- cienie,
- gęstość wierszy,
- rozmiar ikon i stroke,
- alignment osi i baseline,
- wysokość sekcji wynikającą z treści,
- regułę transformacji mobile.

Nie ustawiaj elementów przez kopiowanie współrzędnych `top/left` z obrazu. Odwzoruj geometrię za pomocą poprawnego Grid/Flex i normalnego flow.

### 3A.7. Dopuszczalne tolerancje

W widokach o tym samym viewportcie co referencja:

- główny container i granice sekcji: odchylenie docelowo do 1–2% szerokości,
- proporcje głównych kolumn: odchylenie do 3%,
- wysokość kontrolek: odchylenie do 2 px,
- główne spacingi: odchylenie do 4 px,
- radius: odchylenie do 1–2 px,
- typografia: ten sam token lub odchylenie maksymalnie 1 px,
- ikony: porównywalny rozmiar, stroke i optyczne wyrównanie,
- liczba i kolejność krytycznych subregionów: 100% zgodności.

Odchylenie jest dopuszczalne wyłącznie z powodu realnej treści, dostępności lub architektury. Każde istotne odstępstwo musi być opisane w raporcie i `docs/DECISIONS.md`.

### 3A.8. Visual passy — obowiązkowa kolejność

Nie poprawiaj wszystkiego naraz. Dla każdego ekranu przeprowadź kolejno:

1. **Structure pass** — sekcje, regiony, kolumny, kolejność.
2. **Geometry pass** — szerokości, wysokości, gapy, alignment.
3. **Density pass** — liczba danych, wierszy, kontrolek i wewnętrznych podziałów.
4. **Typography pass** — skala, line-height, weight, długości linii.
5. **Surface pass** — tła, border, radius, shadow.
6. **Component pass** — inputy, buttony, badge, tabs, table rows, charts.
7. **Responsive pass** — prawdziwa transformacja mobile/tablet.
8. **Interaction pass** — stany, focus, sticky, overlay, animacje.
9. **Content stress pass** — długie polskie copy, URL, e-mail, wartości liczbowe.
10. **Final overlay pass** — screenshot + overlay/diff z referencją.

Nie zaczynaj od cieni i kolorów, jeżeli geometria jest błędna.

### 3A.9. Raport różnic nie może być ogólnikiem

Każdą różnicę opisuj według schematu:

```text
ref → region → oczekiwany stan → aktualny stan → różnica w px/% → przyczyna → plik/komponent → poprawka → dowód po poprawce
```

Zakazane raporty:

- „spacing trochę się różni”,
- „trzeba dopracować mobile”,
- „wygląda podobnie”,
- „styl został zachowany”.

### 3A.10. Kryterium bezwzględne

Ekran nie jest ukończony, jeżeli jest tylko „w podobnym klimacie”.

Musi równocześnie:

- posiadać tę samą logikę kompozycji,
- posiadać porównywalną gęstość,
- zachowywać wszystkie krytyczne regiony,
- używać tego samego języka powierzchni i komponentów,
- poprawnie transformować się na mobile,
- przejść screenshot review,
- nie posiadać overlap, clippingu ani globalnego overflow.


## 4. ZAKRES PRODUKTU, KTÓREGO NIE WOLNO POMINĄĆ

### 4.1. Landing page

Pełna kolejność sekcji:

1. Navigation.
2. Hero z działającym fragmentem procesu → gotowy lead.
3. Pasek najważniejszych danych zbieranych przez produkt.
4. Problem versus uporządkowany rezultat.
5. Jak działa — 4 kroki.
6. Interaktywne demo na stronie.
7. Branże i szablony:
   - meble na wymiar,
   - ogrodzenia i bramy,
   - strony internetowe i aplikacje,
   - klimatyzacja,
   - remonty i wykończenia.
8. Funkcje jako sekwencja rezultatu, a nie siatka 12 identycznych kart:
   - kwalifikacja,
   - wycena,
   - podsumowanie,
   - obsługa,
   - analiza.
9. WordPress:
   - blok,
   - shortcode,
   - popup,
   - prosty proces instalacji.
10. Dla agencji:
    - wielu klientów,
    - klonowanie,
    - white-label,
    - marża,
    - program partnerski.
11. Dowody bez fałszywych opinii, logotypów i statystyk:
    - realne demo,
    - realny proces,
    - metodyka,
    - bezpieczeństwo,
    - dane demonstracyjne jasno oznaczone.
12. Cennik:
    - plan podstawowy,
    - Pro,
    - Agency,
    - konfiguracja done-for-you.
13. FAQ.
14. Final CTA.
15. Footer.

Nie dodawaj nowych sekcji „dla wypełnienia”. Nie usuwaj sekcji z powyższej listy bez decyzji produktowej zapisanej w `docs/DECISIONS.md`.

### 4.2. Aplikacja / panel

Obowiązkowe moduły i widoki:

1. Auth:
   - logowanie,
   - rejestracja,
   - reset hasła,
   - weryfikacja e-mail,
   - zaproszenie,
   - wybór organizacji,
   - brak dostępu,
   - wygasła sesja.
2. Onboarding:
   - firma,
   - branża,
   - obszar działania,
   - wybór szablonu / start od zera / konfiguracja usługi,
   - branding,
   - pierwszy proces,
   - test,
   - publikacja,
   - instalacja,
   - checklista uruchomienia.
3. App shell desktop / tablet / mobile.
4. Dashboard operacyjny:
   - wymaga uwagi,
   - kontekst okresu i procesu,
   - rozpoczęcia,
   - ukończenia,
   - conversion rate,
   - leady,
   - gorące leady,
   - ostatnie leady,
   - porzucenia,
   - źródła,
   - urządzenia,
   - następny krok.
5. Leady:
   - lista,
   - wyszukiwarka,
   - filtry,
   - sortowanie,
   - paginacja,
   - kolumny,
   - status,
   - score,
   - wartość,
   - źródło,
   - flow,
   - przypisanie,
   - kompaktowa lista mobile.
6. Szczegóły leada:
   - nagłówek,
   - score i powody,
   - przedział,
   - źródło,
   - dane źródłowe,
   - odpowiedzi pogrupowane,
   - pliki,
   - historia,
   - zgody,
   - kontakt,
   - status,
   - opiekun,
   - następny krok,
   - notatki,
   - UTM i dane techniczne.
7. Procesy / formularze:
   - lista,
   - status,
   - wersja draft / published / archived,
   - health,
   - duplikowanie,
   - archiwizacja,
   - podgląd,
   - publikacja,
   - historia wersji,
   - instalacja.
8. Builder:
   - lista kroków,
   - realny preview,
   - inspektor,
   - desktop/mobile preview,
   - typy pytań,
   - start screen,
   - wynik,
   - grupy,
   - walidacja,
   - autosave,
   - undo/redo,
   - test,
   - publikacja.
9. Logika warunkowa.
10. Silnik wyceny.
11. Scoring i explainability.
12. Konfiguracja ekranu wyniku.
13. Biblioteka szablonów i szczegóły szablonu.
14. Publiczny widget:
    - inline,
    - popup,
    - fullscreen,
    - hosted link,
    - autosave,
    - upload,
    - kontakt,
    - wynik,
    - resume,
    - błędy i offline.
15. Analityka:
    - funnel,
    - drop-off,
    - trend,
    - jakość,
    - źródła,
    - urządzenia,
    - wersje,
    - low-sample state.
16. Instalacja:
    - snippet,
    - allowlist domen,
    - diagnostyka,
    - test instalacji,
    - WordPress.
17. Integracje:
    - katalog,
    - status połączenia,
    - konfiguracja,
    - OAuth/callback,
    - mapowanie pól,
    - webhooki,
    - delivery log,
    - retry,
    - API keys.
18. E-maile, powiadomienia i szablony.
19. Agency workspace:
    - lista klientów,
    - kontekst tenanta,
    - klonowanie,
    - uprawnienia,
    - white-label,
    - marża,
    - usage i limity.
20. Ustawienia:
    - profil firmy,
    - branding,
    - domeny,
    - powiadomienia,
    - zespół i role,
    - prywatność i retencja,
    - eksport i usuwanie,
    - billing / usage,
    - danger zone.
21. Stany systemowe:
    - loading,
    - skeleton,
    - empty,
    - error,
    - retry,
    - offline,
    - permission denied,
    - stale data,
    - rate limit,
    - 404,
    - 500,
    - maintenance,
    - unpublished / archived / unavailable flow.

Ekran bez osobnego screenshotu ma zostać zbudowany **przez analogię do systemu**, nie przez wymyślanie nowego stylu.

---


## 4A. LANDING — KONTRAKT KAŻDEJ SEKCJI, BEZ UPROSZCZEŃ

Każda sekcja landingu ma mieć własną kompozycję wynikającą z referencji. Nie buduj całej strony jako naprzemiennej siatki `tekst + karta` ani kolekcji takich samych kontenerów.

Wspólne zasady:

- jeden konsekwentny maksymalny container,
- wspólna oś wyrównania tekstów i powierzchni produktu,
- sekcje oddzielane głównie rytmem, subtelnym tłem lub linią,
- bez dekoracyjnych kul, gradientów, pseudo-3D i stockowych mockupów,
- głównym materiałem wizualnym jest rzeczywiste UI produktu,
- każdy panel produktu ma wewnętrzne dane, stany i działania,
- copy ma być krótkie, konkretne i zgodne z produktem,
- active brand: Lorum, nawet jeżeli obraz pokazuje Wyceno.

### 4A.1. Navigation

Desktop:

- płaski header na pełną szerokość,
- logo po lewej,
- zwarte linki w środku,
- compact CTA po prawej,
- cienka dolna linia,
- żadnego floating pill-nav, blur ani dużego zaokrąglonego wrappera.

Mobile:

- logo + hamburger,
- po otwarciu menu pełna hierarchia linków i CTA,
- brak nakładania menu na systemowe safe areas,
- prawidłowy focus trap i zamknięcie klawiaturą.

### 4A.2. Hero

Desktop ma zachować trzy czytelne strefy:

1. copy i CTA,
2. kompaktowe odpowiedzi klienta,
3. pełny rekord gotowego leada.

Wymagania:

- fraza „gotowy do rozmowy” z płaskim zielonym zaznaczeniem,
- dwa CTA o prawidłowej hierarchii,
- microcopy pomocnicze pod CTA,
- widoczne połączenie odpowiedzi z panelem leada,
- panel leada ma header osoby, score, powody, tabelaryczne dane, materiały i actions,
- żadnego laptop mockupu, telefonu, losowo unoszących się kart ani abstrakcyjnej ilustracji.

Mobile:

- copy i CTA jako pierwsze,
- następnie mini-flow odpowiedzi → lead,
- flow nie może być całym desktopem pomniejszonym przez `transform: scale`,
- zachowaj czytelne dane i relację procesu na szerokości 320–430 px.

### 4A.3. Pasek informacji zbieranych

- sześć pozycji: zakres, budżet, termin, lokalizacja, pliki, następny krok,
- płaska sekcja z liniami, bez sześciu grubych kart,
- ikony line-style, jednakowy rozmiar i stroke,
- desktop: jeden rząd,
- mobile: zwarta siatka 3×2.

### 4A.4. Problem kontra rezultat

- lewy tekst problemu,
- jedna wspólna karta comparison w środku/prawej,
- lewa część: zwykłe zapytanie + lista braków,
- prawa część: uporządkowany lead + potwierdzone dane,
- centralny connector pokazujący transformację,
- nie rozbijaj na dwa przypadkowe niezależne kafelki.

### 4A.5. Jak działa

- cztery numerowane kroki,
- realna zależność krok po kroku,
- przy referencji z pionową osią zachowaj oś i rytm,
- obok lub pod krokami kompaktowy rekord leada,
- tekst każdego kroku krótki i konkretny,
- nie zamieniaj na cztery identyczne ikony w dużych kolorowych kwadratach.

### 4A.6. Interaktywne demo

To ma być funkcjonalna sekcja produktu, nie marketingowa ilustracja.

Desktop:

- toolbar z nazwą procesu, statusem i actions,
- progress/lista kroków,
- aktywne pytanie i odpowiedzi,
- panel podsumowania aktualizowany w czasie rzeczywistym,
- prawdziwe przyciski Wstecz/Dalej,
- realny stan walidacji,
- możliwe przejście mini-flow bez opuszczania landingu.

Mobile:

- jedna logiczna kolumna,
- progress u góry,
- aktywne pytanie,
- sticky action area tylko jeśli nie zasłania treści,
- podsumowanie w kolejności wynikającej z JTBD,
- brak bocznego panelu zgniatającego treść.

### 4A.7. Branże i szablony

- pięć branż jest obecnych,
- aktywna branża otrzymuje pełną powierzchnię szczegółową,
- pokaż pytania, logikę, dane otrzymywane przez firmę i przykładowy lead,
- nie ograniczaj sekcji do pięciu pustych obrazkowych kart,
- każdy template prowadzi do prawdziwego route lub demo.

Mobile:

- branch selector może być przewijany poziomo,
- aktywny template poniżej w jednej kolumnie,
- zachowaj wszystkie kluczowe dane, ale zmień ich kolejność.

### 4A.8. Funkcje jako sekwencja rezultatu

Pięć etapów:

1. kwalifikacja,
2. wycena,
3. podsumowanie,
4. obsługa,
5. analiza.

- jedna spójna powierzchnia lub ciąg logicznie połączonych modułów,
- każdy etap ma inny, prawdziwy fragment UI,
- nie używaj siatki 10–12 identycznych kart,
- mobile: pionowa oś procesu, nie karuzela i nie chaotyczne stackowanie.

### 4A.9. WordPress i instalacja

- editorial split: konkretne copy + realny ekran edytora/instalacji,
- widoczne tryby inline, popup, shortcode/Gutenberg,
- kod osadzenia ma być kopiowalny,
- kroki instalacji działające,
- diagnostyka lub status połączenia,
- logo WordPress nie może zastępować produktu.

### 4A.10. Dla agencji

- jedyna mocna ciemnozielona sekcja może pojawić się tutaj,
- po lewej: model pracy wielu klientów, klonowanie, white-label, marża,
- po prawej: rzeczywisty agency workspace z listą klientów i akcjami,
- zero fałszywych przychodów i przypadkowych KPI,
- desktop zachowuje dwie mocne strefy, mobile układa je logicznie pionowo.

### 4A.11. Dowody i metodyka

- bez fałszywych opinii, logotypów i liczb,
- pokaż trzy lub cztery konkretne filary: realne demo, proces, bezpieczeństwo, dane demo,
- sekcja ma być spokojna, płaska i dowodowa,
- nie używaj testimonial cards bez prawdziwego źródła.

### 4A.12. Cennik

- Start, Pro, Agency, Done-for-you,
- na desktopie pełne porównanie możliwości, nie cztery puste cenowe kafle,
- Pro wyróżniony subtelnie, bez glow i ogromnej etykiety,
- kwoty tylko po zatwierdzeniu modelu,
- na mobile pionowe plany z pełnym zakresem i CTA,
- brak poziomego scrolla całej strony.

### 4A.13. FAQ

- desktop: copy/lead po lewej, accordiony po prawej,
- mobile: jedna kolumna,
- prawdziwe odpowiedzi, dostępne klawiaturą,
- jeden accordion może być otwarty bez zmiany wysokości przez absolutne pozycjonowanie.

### 4A.14. Final CTA

- ciemnozielony panel,
- konkretna obietnica po lewej,
- mikroprzepływ odpowiedzi → lead po prawej,
- dwa CTA,
- bez abstrakcyjnej ilustracji i bez hasła typu „Zrewolucjonizuj biznes”.

### 4A.15. Footer

- logo, krótki opis, logiczne grupy linków, legal, status,
- zwarty i uporządkowany,
- bez newslettera dominującego całość,
- mobile: kolejność kolumn zgodna z priorytetem użytkownika.

### 4A.16. Odbiór landingu

Landing nie przechodzi gate’u, jeśli:

- brakuje choć jednej z 15 sekcji,
- sekcja jest tylko placeholderem,
- produktowe wizualizacje są statycznymi atrapami bez struktury,
- trzy lub więcej sekcji używa tej samej generycznej kompozycji,
- desktop nie zgadza się z pełnym screenshotem,
- mobile jest wyłącznie stackiem desktopu,
- cennik, FAQ lub footer zostały potraktowane skrótowo,
- inner UI nie posiada porównywalnej gęstości do referencji.


## 4B. APLIKACJA — KONTRAKT EKRAN PO EKRANIE

Wszystkie ekrany mają wyglądać jak jeden produkt. Nie projektuj każdego modułu od nowa. Korzystaj z tych samych tokenów, komponentów, linii, typografii, spacingu i gęstości.

### 4B.1. App shell

Desktop:

- ciemnozielony sidebar lub sidebar zgodny z zaakceptowaną planszą,
- logo w górnej części,
- zwarta lista nawigacji,
- aktywny element rozpoznawalny bez agresywnego glow,
- avatar/kontekst organizacji na dole,
- content na białej/off-white powierzchni,
- top context bar tylko tam, gdzie potrzebny.

Tablet/mobile:

- sidebar przechodzi w drawer lub bottom navigation zależnie od ekranu,
- nie zostawiaj jednocześnie sidebara, bottom nav i sticky action bar,
- content nie może być zasłaniany.

### 4B.2. Dashboard

Kompozycja referencyjna:

- nagłówek i selektor okresu,
- zwarty rząd KPI,
- główny wykres liczby leadów,
- rozkład jakości/score,
- ostatnie leady,
- „wymaga uwagi” lub następny krok, jeżeli dane to uzasadniają.

Zakazy:

- cztery przypadkowe KPI bez dalszej treści,
- dekoracyjne wykresy bez danych,
- ogromne karty z jedną liczbą,
- pusty dashboard z onboarding bannerem jako większością ekranu.

Mobile:

- priorytet: wymagające reakcji leady, wynik okresu, ostatnie rekordy,
- KPI mogą być 2×2 lub przewijane kontrolowanie,
- wykres nie może wypychać viewportu.

### 4B.3. Lista leadów

Desktop:

- nagłówek, search, primary action, filtry,
- tabs/status views,
- czytelna tabela o wysokiej gęstości,
- avatar/nazwa, usługa, score, budżet, termin, status, data,
- sortowanie i paginacja,
- opcjonalny detail panel tylko gdy nie niszczy tabeli.

Mobile:

- osobna kompaktowa lista,
- nazwa, usługa, score, status i czas,
- szybki telefon/e-mail w detail view,
- brak ściśniętej tabeli desktop.

### 4B.4. Szczegóły leada

- header: powrót, osoba/firma, ID/data, score, status,
- lista powodów score,
- tabs: podsumowanie, odpowiedzi, pliki, historia,
- główna tabela danych źródłowych,
- materiały/zdjęcia,
- prawy panel: notatka, status, opiekun, next step, CTA,
- odpowiedzi źródłowe zawsze dostępne.

Mobile:

- score i główne dane u góry,
- akcje w bezpiecznej sticky area albo naturalnym flow,
- tabs mogą stać się segmentami/accordionem,
- brak nakładania bottom nav na CTA.

### 4B.5. Biblioteka procesów

- compact list/table, nie luźna galeria,
- nazwa, branża, status, wersja, health, data i actions,
- wyraźny podział draft/published/archived,
- menu kontekstowe dla duplikacji, archiwizacji, instalacji,
- empty state z realnym next step.

### 4B.6. Szablony branżowe

- wizualne karty mogą używać zdjęć, ale pozostają zwarte,
- nazwa branży, liczba pytań, zakres, status/availability,
- detail view pokazuje pytania, logikę, pricing i wynik przed skopiowaniem,
- nie zamieniaj całego modułu na marketplace z wielkimi posterami.

### 4B.7. Builder procesu

Builder jest ekranem priorytetowym.

Desktop:

- górny toolbar: nazwa, status, save, undo/redo, preview, publish,
- lewa kolumna: kroki, grupy, start, wynik, błędy,
- środek: rzeczywisty preview kroku lub kontrolowana mapa procesu zgodna z referencją,
- prawa kolumna: context inspector z zakładkami content/options/logic/pricing/scoring/settings,
- brak wielkiego pustego canvasu,
- widoczne relacje między krokami, ale bez niepotrzebnego pełnego narzędzia node-based,
- autosave i walidacja konfiguracji.

Mobile/tablet:

- nie skaluj trzech kolumn,
- użyj trybów Steps / Preview / Settings,
- inspektor jako drawer/fullscreen sheet,
- sticky save/publish nie zasłania pól,
- zachowaj główne działania i informację o błędach.

### 4B.8. Logika warunkowa

- czytelne bloki IF/AND/OR/THEN,
- field/operator/value/action,
- kolejność reguł,
- warnings dla pętli, martwych ścieżek i brakujących kroków,
- explainability i test rule,
- nie używaj dekoracyjnego grafu bez wartości.

### 4B.9. Wycena

- reguły w tabeli/listach o wysokiej gęstości,
- typ operacji, warunek, kwota/przedział, priorytet,
- panel symulacji na realnych odpowiedziach,
- min/max, waluta, rounding, presentation mode i disclaimer,
- błędy domenowe widoczne przy regule.

### 4B.10. Scoring

- lista reguł i punktów,
- progi kategorii,
- explainability,
- przykładowy lead testowy,
- nie pokazuj magicznego AI score bez powodów.

### 4B.11. Ekran wyniku

- konfiguracja po lewej lub w inspektorze,
- live preview po prawej,
- headline, podsumowanie, cena, czynniki, CTA, next step, disclaimer,
- tryb częściowego/pełnego wyniku,
- desktop i mobile preview bez dekoracyjnego mockupu urządzenia jako głównej treści.

### 4B.12. Analityka

- context filters: okres, flow, wersja, source/device,
- rozpoczęcia, completion, conversion, lead quality,
- funnel/drop-off,
- trends,
- source/device breakdown,
- low sample state zamiast fikcyjnego wykresu,
- spójna typografia liczb i legend.

### 4B.13. Instalacja i WordPress

- wybór inline/popup/fullscreen/hosted,
- snippet z copy action,
- allowlist domen,
- status i diagnostyka,
- test instalacji,
- WordPress connection i instructions,
- webhook/API secret nigdy nie trafia do publicznego klienta.

### 4B.14. Integracje i webhooki

- integracje jako zwarte wiersze z ikoną, nazwą, opisem i statusem,
- nie marketplace z ogromnymi kolorowymi tiles,
- konfiguracja w detail panelu,
- field mapping,
- webhook delivery log, retry i error details,
- API keys z bezpiecznym reveal/copy/rotate.

### 4B.15. Ustawienia

- sekcje: firma, branding, domeny, powiadomienia, team/roles, privacy/retention, billing/usage, danger zone,
- formularze w logicznych grupach,
- toggles w wierszach z opisem,
- actions aligned i nieprzyklejone przypadkowo,
- danger zone wyraźna, ale bez agresywnego pełnego czerwonego tła.

### 4B.16. Agency workspace

- lista klientów/organizacji,
- context switcher,
- status wdrożenia,
- procesy, usage, owner, plan,
- clone process i white-label,
- tenant boundaries i permission states,
- zero fałszywych przychodów.

### 4B.17. Onboarding

- realny progress i zapis stanu,
- krótkie etapy, nie marketingowa karuzela,
- firma, branża, obszar, template/start from scratch/done-for-you, branding, pierwszy proces, test, publish, install,
- po każdym kroku jasny next step,
- mobile działa z klawiaturą ekranową.

### 4B.18. Publiczny widget

- czysta biała powierzchnia zgodna z brandem klienta,
- header/progress, pytanie, options, helper, validation, navigation,
- autosave/resume,
- file upload,
- contact step,
- result,
- offline/error/retry,
- nie ma zależności od CSS strony hosta,
- mobile-first i bez poziomego scrolla.

### 4B.19. Auth i stany systemowe

- auth nie może wyglądać jak obcy template,
- użyj tej samej typografii, controls i surfaces,
- loading, empty, error, permission, offline, 404, 500, maintenance mają pełną treść i działania,
- nie używaj ogólnych ilustracji AI.

### 4B.20. Odbiór aplikacji

Moduł nie przechodzi gate’u, jeżeli:

- wygląda jak osobny template,
- brakuje inner UI widocznego w referencji,
- dane zostały zastąpione placeholderami,
- desktop jest pusty, a mobile jest tylko pomniejszeniem,
- layout jest naprawiany przez absolute/negative margins/overflow hidden,
- shared components nie odpowiadają systemowi,
- brak stanów loading/empty/error/permission,
- screenshoty nie mają overlay/diff z właściwą referencją.


## 5. ZAMKNIĘTY KIERUNEK WIZUALNY

Interfejs ma być:

- spokojny,
- precyzyjny,
- zwarty,
- nowoczesny,
- lekko techniczny,
- oparty na hierarchii, liniach i realnych danych,
- bardziej gęsty w panelu niż na landingu,
- zaprojektowany jak dojrzały produkt B2B.

### Tokeny bazowe

```css
--background: #F7F6F2;
--background-subtle: #FBFAF7;
--surface: #FFFFFF;
--surface-muted: #F4F5F0;
--text-primary: #17201D;
--text-secondary: #65706B;
--text-tertiary: #8A938F;
--brand: #0A4E36;
--brand-dark: #073F2C;
--brand-mid: #16895A;
--success: #2FAF70;
--success-soft: #DCEBD9;
--success-surface: #EEF6EC;
--border: #E3E1DA;
--border-strong: #D4D8D3;
--warning: #A56A1C;
--warning-soft: #FBF2E4;
--error: #C74948;
--error-soft: #FBEFEE;
--info: #3C6E9E;
--info-soft: #EDF3F8;
```

Nie wprowadzaj lokalnych hexów, radiusów, shadow ani spacingów bez decyzji w design systemie.

### Typografia

Jedna rodzina groteskowa: obecna sprawdzona rodzina albo Inter/Geist.

Panel:

```text
page title:       24–28 px / 720–780
panel title:      15–18 px / 700–760
section title:    12–15 px / 680–750
body:             14–15 px / 400–500
compact UI:       12–13 px / 500–700
numbers:          tabular numerals
```

Landing używa większej skali, ale bez ogromnych nagłówków psujących użyteczność.

### Radius

```text
4 px      badge i mała kontrolka
6 px      input, button, option
8–9 px    panel, tabela, karta procesu
11–12 px  duży preview lub główne okno
```

### Cień

Tylko subtelne oddzielenie powierzchni:

```css
0 10px 30px rgba(18,43,31,.055),
0 1px 2px rgba(18,43,31,.05)
```

Brak hover lift.

### Bezwzględnie zakazane

- dekoracyjne gradienty,
- gradientowy tekst,
- glassmorphism i backdrop blur,
- neon, glow, blobs, orbs,
- ogromne promienie,
- pill buttons jako standard,
- identyczne karty 3×3,
- ikony w kolorowych kwadratach przy każdej pozycji,
- random floating cards,
- dekoracyjne 3D,
- stockowe avatary pobierane z internetu,
- roboty, sparkles i symbole „AI”,
- fałszywe KPI, wykresy, logotypy i social proof,
- ogromne puste przestrzenie,
- animowanie każdej sekcji przy scrollu,
- springi i bounce,
- domyślny wygląd shadcn/ui,
- dokładanie nowych sekcji lub paneli tylko po to, aby ekran wyglądał „bogato”.

---


## 5A. DNA WIZUALNE — CO MA BYĆ ODWZOROWANE 1:1 W ODBIORZE

To nie jest „minimalistyczny zielony SaaS”. Charakter wynika z połączenia następujących cech:

1. **Ciepłe, niemal papierowe tło** zamiast zimnej bieli.
2. **Białe powierzchnie funkcjonalne** oddzielone cienką linią i bardzo subtelnym cieniem.
3. **Grafitowa typografia** o wysokim kontraście i zwartej interlinii.
4. **Ciemna zieleń** dla sidebara, głównych CTA i kluczowych akcji.
5. **Świeża zieleń** wyłącznie dla statusu/sukcesu/aktywnego wyniku.
6. **Małe i średnie promienie**, bez pigułkowego charakteru.
7. **Duża liczba realnych informacji** przy spokojnym uporządkowaniu.
8. **Linie, wiersze, taby i separatory** ważniejsze niż ozdobne karty.
9. **Ikony cienkie, liniowe**, optycznie wyrównane, bez kolorowych kafli.
10. **Asymetryczna kompozycja editorial/product**, nie generyczna symetria kart.
11. **Wyraźne grupowanie** odpowiedzi, wyniku, statusu i następnego kroku.
12. **Oszczędny motion**, który pokazuje relację, nie dekoruje.

Jeżeli wdrożenie używa tej samej palety, ale ma:

- dużo większe promienie,
- luźniejsze odstępy,
- puste karty,
- ikonowe tiles,
- niezwiązane ze sobą moduły,
- brak linii i danych,

to nie jest zgodne z referencją.

### 5A.1. Hierarchia powierzchni

Stosuj kolejno:

```text
page background → section background → functional surface → nested row/control → status/accent
```

Nie każda grupa informacji wymaga osobnej karty. Często wystarczy:

- border-top,
- row divider,
- split column,
- tab strip,
- background-subtle,
- spacing.

### 5A.2. Gęstość

- landing: wyważony oddech, ale każda sekcja posiada pełną treść,
- panel: zwarty, operacyjny, bez marnowania przestrzeni,
- tabele: 44–52 px wiersz zależnie od zawartości,
- controls: około 36–42 px, mobile 42–46 px,
- strony desktop nie mogą wyglądać jak powiększony mobile.

### 5A.3. Custom CSS i biblioteki

- zachowaj aktualny stack CSS repozytorium,
- preferuj CSS variables, CSS Modules lub istniejącą konwencję custom CSS,
- nie dodawaj Tailwinda, shadcn/ui, Framer Motion ani biblioteki komponentów tylko po to, aby przyspieszyć redesign,
- jeżeli repo już używa którejś biblioteki, nie pozostawiaj jej domyślnego wyglądu; dostosuj przez własne tokeny i primitives,
- nie dodawaj zależności bez osobnej decyzji i pomiaru bundle.

### 5A.4. Zakaz stylu „prawie podobnego”

Nie akceptuj wyniku, który:

- ma podobne kolory, ale inną geometrię,
- ma podobny dashboard, ale znacznie mniej danych,
- ma podobny hero, ale bez connectora i pełnego lead record,
- ma podobne karty, ale inne proporcje,
- ma podobny mobile, ale tylko po ustawieniu `scale`,
- wygląda schludnie, lecz nie odpowiada strukturze referencji.


## 6. KONTRAKT LAYOUTU — ZERO NAKŁADANIA I ROZJEŻDŻANIA

To jest krytyczny wymóg. Poprawny build nie oznacza poprawnego layoutu.

### 6.1. Zasady bazowe

- Używaj normalnego flow dokumentu, CSS Grid i Flexbox.
- `position: absolute` wolno stosować wyłącznie do rzeczywistych overlayów lub drobnej dekoracji, nigdy do budowy głównych kolumn, sekcji i tekstów.
- Nie używaj ujemnych marginów ani `transform: translate(...)` jako sposobu na ustawianie głównego layoutu.
- Nie ukrywaj błędów przez `overflow-x: hidden`, `overflow: hidden`, clipowanie tekstu ani losowe `z-index: 9999`.
- Nie używaj `width: 100vw` wewnątrz kontenera z paddingiem; używaj `width: 100%`.
- Nie ustawiaj sztywnych wysokości dla sekcji z treścią. Stosuj `min-height` tylko tam, gdzie ma sens.
- Każdy flex/grid child, który może się kurczyć, musi mieć `min-width: 0`.
- Elastyczne tracki Grid zapisuj jako `minmax(0, 1fr)`, nie samo `1fr`, gdy zawartość może wypchnąć układ.
- Stosuj globalne `box-sizing: border-box`.
- Root aplikacji nie może mieć szerokości większej niż viewport. Nie maskuj tego przez `max-width: 100vw` na losowych potomkach.
- `height: 100vh` na mobile zastępuj świadomym `min-height: 100dvh` lub layoutem opartym o normalny flow; uwzględnij dynamiczne paski przeglądarki i safe-area.
- Obrazy, SVG, video, iframe i canvas: `max-width: 100%`; wysokość ma wynikać z proporcji albo kontrolowanego kontenera.
- Każdy główny region oznacz podczas QA przez `data-layout-region`; elementy krytyczne przez `data-within-viewport`, a pary, które nie mogą się przecinać, przez `data-no-overlap`. Atrybuty można pozostawić w DOM albo usuwać dopiero po finalnym gate, jeśli testy mają równoważny selektor.
- Długie e-maile, URL-e, identyfikatory i polskie teksty muszą mieć bezpieczne zawijanie (`overflow-wrap: anywhere` tam, gdzie potrzebne).
- `white-space: nowrap` tylko dla danych, które rzeczywiście muszą pozostać w jednym wierszu; wtedy zapewnij kontrolowane skrócenie i dostęp do pełnej wartości.

### 6.2. Shell

- Sidebar ma określony `flex-basis` / track, a główna treść `min-width: 0`.
- Topbar nie może nachodzić na content; wysokość musi być zarezerwowana w układzie.
- Sticky header/sidebar/actions muszą mieć jawny offset i nie mogą zasłaniać ostatniej treści.
- Nie twórz przypadkowych zagnieżdżonych scroll containerów.
- Jeden ekran ma jeden główny pionowy scroll, chyba że builder lub tabela ma uzasadniony, opisany wyjątek.

### 6.3. Panele i kolumny

- Desktop builder: kontrolowane trzy strefy, np. `220–260 px / minmax(0, 1fr) / 280–340 px`.
- Przy zmniejszaniu szerokości panel boczny przechodzi w drawer albo osobny tryb — nie może zgniatać środka.
- Szczegóły leada: główna kolumna + panel operacyjny; na mobile jedna logiczna kolejność.
- Karty i panele rosną wraz z treścią; nie zakładaj stałej liczby linii.
- Nie ustawiaj elementów przez ręczne `top/left` na podstawie screenshotu.

### 6.4. Tabele

- Desktop: semantyczna tabela o kontrolowanych kolumnach.
- Tablet: ogranicz liczbę kolumn, przenieś drugorzędne informacje do detail row lub panelu.
- Mobile: osobna kompaktowa lista rekordów; nie ściskaj desktopowej tabeli do 390 px.
- Poziomy scroll jest dozwolony wyłącznie w jawnie oznaczonym wrapperze tabeli i nie może powodować scrolla całej strony.
- Nagłówki, badge i działania nie mogą nachodzić na komórki.

### 6.5. Formularze i overlaye

- Label, helper i error mogą się zawijać bez nachodzenia na kontrolkę.
- Inputy nie mogą mieć fixed width większego niż kontener.
- Dialog: `width: min(calc(100vw - 32px), <docelowa szerokość>)`.
- Dialog/drawer: `max-height: calc(100dvh - 32px)` i kontrolowany `overflow-y: auto`.
- Popover/dropdown musi mieć collision detection, flip/shift i padding od viewportu.
- Klawiatura mobilna nie może zasłaniać aktywnego pola ani głównego CTA.
- Używaj `100dvh`, safe-area insets i odpowiedniego bottom paddingu na mobile.

### 6.6. Sticky actions i bottom navigation

- Treść ma posiadać dolny padding równy wysokości sticky actions/bottom nav + safe area.
- Sticky element nie może zasłaniać końcowego pola, tabeli ani footera.
- Na ekranach szczegółowych wybierz albo bottom navigation, albo sticky action bar; nie nakładaj obu bez uzasadnienia.

### 6.7. Z-index

Utwórz i stosuj jedną skalę, np.:

```text
base        0
sticky      10
header      20
dropdown    30
popover     40
drawer      50
modal       60
toast       70
```

Nie twórz lokalnych wartości bez potrzeby. Sprawdź stacking contexts powstałe przez `transform`, `filter`, `opacity` i `isolation`.

### 6.8. Typowe zakazane „naprawy”

Nie wolno uznać problemu za naprawiony przez:

- schowanie overflow,
- zmniejszenie fontu do nieczytelnego poziomu,
- skrócenie realnej treści do `Lorem ipsum`,
- ustawienie fixed height i obcięcie zawartości,
- usunięcie sekcji na mobile,
- przesunięcie elementu transformem,
- podbicie z-index,
- zmianę desktopu w chaotyczną kolumnę bez priorytetu informacji.

---

## 7. RESPONSIVE JAKO TRANSFORMACJA, NIE ŚCISKANIE

Breakpointy wynikają z momentu, w którym układ przestaje działać. Baza kontrolna:

```text
mobile:        0–639 px
tablet:        640–1023 px
desktop:       1024–1439 px
wide desktop:  1440 px+
```

Dla każdego ekranu przed implementacją zapisz:

1. główny JTBD,
2. priorytet informacji,
3. elementy pozostające inline,
4. elementy przenoszone do drawer/menu,
5. elementy sticky,
6. główne CTA,
7. zachowanie tabel i filtrów,
8. bezpieczny sposób scrollowania,
9. zachowanie przy długim copy,
10. zachowanie przy 200% zoom.

### Mobile — wymagania ogólne

- topbar 56–60 px,
- bottom navigation 60–64 px tylko dla głównych ekranów,
- padding 14–18 px,
- główne touch targety 40–44 px,
- nie kopiuj desktopowego sidebara,
- nie pokazuj 8 filtrów jeden pod drugim; użyj sheet/drawer,
- nie chowaj telefonu/e-maila w kebab menu,
- builder przechodzi w osobne tryby: struktura / edycja / odpowiedzi / logika / wycena / scoring / test,
- dashboard na mobile: kontekst → alerty → 2×2 KPI → ostatnie leady → następny krok,
- szczegóły leada: osoba i score → powody/status → podsumowanie → materiały → obsługa → historia → techniczne,
- widget: jedno pytanie na ekran, stabilny progress, autosave i CTA w bezpiecznej strefie.

---

## 8. DOKUMENTACJA — INWENTARYZACJA, PODMIANA I CZYSZCZENIE

Nie usuwaj dokumentów „na oko” i nie twórz kolejnych duplikatów.

### 8.1. Najpierw inwentarz

Utwórz:

```text
docs/_migration/LORUM_DOC_INVENTORY.md
```

Dla każdego dokumentu zapisz:

| pole | wymaganie |
|---|---|
| ścieżka | pełna ścieżka |
| temat | czego dotyczy |
| ostatnia zmiana | z Git/metadanych |
| linki przychodzące | gdzie jest używany |
| unikalne decyzje | co trzeba zachować |
| zgodność | zgodny / częściowy / sprzeczny |
| status | KEEP / REPLACE / MERGE / ARCHIVE / DELETE |
| target | docelowy dokument kanoniczny |
| ryzyko | wpływ usunięcia lub zmiany |

### 8.2. Polityka

- **KEEP** — aktualny i unikalny; dodaj status i indeks.
- **REPLACE** — przenieś unikalną treść do kanonicznego dokumentu, popraw linki, stary zarchiwizuj.
- **MERGE** — połącz duplikaty, zachowując decyzje i ryzyka.
- **ARCHIVE** — przenieś do `docs/_archive/YYYY-MM-DD-pre-lorum-ui-v1/` i oznacz jako niekanoniczny.
- **DELETE** — tylko gdy plik jest duplikatem/śmieciem, nie zawiera unikalnych decyzji, nie jest linkowany, nie jest wymagany przez tooling, historia jest w Git i usunięcie widnieje w raporcie.

### 8.3. Kanoniczne dokumenty

Po migracji aktywne źródła prawdy powinny obejmować co najmniej:

```text
AGENTS.md
README.md
docs/INDEX.md
docs/PRODUCT_VISION.md
docs/PRODUCT_REQUIREMENTS.md
docs/SCOPE.md
docs/NON_GOALS.md
docs/ARCHITECTURE.md
docs/DATABASE.md
docs/AUTHORIZATION.md
docs/API_CONTRACTS.md
docs/INFORMATION_ARCHITECTURE.md
docs/DESIGN_PRINCIPLES.md
docs/DESIGN_SYSTEM.md
docs/UI_SCREEN_SPEC.md
docs/RESPONSIVE_LAYOUT.md
docs/ACCESSIBILITY.md
docs/CONTENT_DESIGN.md
docs/UX_STATES.md
docs/VISUAL_QA.md
docs/QA_PLAN.md
docs/TASKS.md
docs/DECISIONS.md
docs/RISKS.md
docs/RELEASE_CHECKLIST.md
```

Nie twórz pustych dokumentów dla samego odhaczenia listy. Użyj statusów `CANONICAL`, `DRAFT`, `DEPRECATED`, `ARCHIVED`.

Każdy aktywny dokument zaczyna się od:

```md
**Status:** CANONICAL | DRAFT | DEPRECATED | ARCHIVED
**Owner:** rola/zespół
**Last reviewed:** YYYY-MM-DD
**Replaces:** ścieżki, jeśli dotyczy
```

### 8.4. Raport migracji

Utwórz:

```text
docs/_migration/LORUM_DOC_MIGRATION_REPORT.md
```

Raport musi zawierać:

- liczby KEEP/REPLACE/MERGE/ARCHIVE/DELETE,
- mapę stary plik → nowy plik,
- przeniesione unikalne decyzje,
- poprawione linki,
- celowo zachowane legacy identifiers,
- ryzyka i braki.

---

## 9. OCHRONA LOGIKI I ARCHITEKTURY

Zmiana UI nie daje prawa do zmiany:

- auth,
- RLS,
- tenant scope,
- kontraktów API,
- schematu bazy,
- wersjonowania flow,
- pricing/scoring/conditional logic,
- uploadu,
- e-maili i webhooków,
- publicznych identyfikatorów,
- routingu,
- działających testów.

Każda konieczna zmiana domenowa wymaga osobnego ADR, migracji, testu i zgody.

- Zachowaj istniejący stack, jeśli nie ma udokumentowanego powodu zmiany.
- Nie instaluj zależności bez celu, oceny bundle, utrzymania i bezpieczeństwa.
- Nie dodawaj Tailwinda, shadcn/ui ani kolejnego systemu stylów, jeżeli repo ich nie używa. Zachowaj istniejący custom CSS/CSS Modules/CSS variables.
- Nie używaj `any` jako skrótu.
- Nie wyłączaj ESLint, TypeScript, testów, axe ani visual assertions, aby uzyskać zielony wynik.
- Nie przenoś logiki biznesowej do komponentów prezentacyjnych.
- Nie twórz atrap widocznych funkcji.

---

## 10. IMPLEMENTACJA — WYŁĄCZNIE MAŁYMI ETAPAMI

Nie realizuj całej aplikacji w jednym przebiegu.

Kolejność:

### Etap 0 — audyt repozytorium i dokumentów

Użyj:

```text
docs/ui/lorum-product-ui-reference-v1/prompts/01_REPOSITORY_AUDIT_AND_FREEZE.md
docs/ui/lorum-product-ui-reference-v1/prompts/02_DOCUMENT_CLEANUP_AND_CANONICALIZATION.md
```

Pierwsza sesja wykonuje tylko audyt i plan. Bez zmian UI i bez destrukcyjnego usuwania.

### Etap 1 — design foundation i app shell

```text
docs/ui/lorum-product-ui-reference-v1/prompts/03_DESIGN_FOUNDATION_AND_APP_SHELL.md
```

Najpierw tokeny, layout primitives, komponenty i shell. Dopiero potem ekrany.

### Etap 2 — pełny landing

Wykonuj planszami zgodnie z:

```text
docs/ui/lorum-landing-reference-v2/CODEX_IMPLEMENTATION_PROMPT.md
```

### Etap 3 — dashboard

```text
docs/ui/lorum-product-ui-reference-v1/prompts/04_DASHBOARD.md
```

### Etap 4 — lista leadów

```text
docs/ui/lorum-product-ui-reference-v1/prompts/05_LEADS_LIST.md
```

### Etap 5 — szczegóły leada

```text
docs/ui/lorum-product-ui-reference-v1/prompts/06_LEAD_DETAILS.md
```

### Etap 6 — procesy i builder

```text
docs/ui/lorum-product-ui-reference-v1/prompts/07_PROCESS_LIBRARY_AND_BUILDER.md
```

### Etap 7 — logika, wycena, scoring, wynik

```text
docs/ui/lorum-product-ui-reference-v1/prompts/08_LOGIC_PRICING_SCORING_RESULTS.md
```

### Etap 8 — analityka

```text
docs/ui/lorum-product-ui-reference-v1/prompts/09_ANALYTICS.md
```

### Etap 9 — szablony, instalacja i WordPress

```text
docs/ui/lorum-product-ui-reference-v1/prompts/10_TEMPLATES_INSTALLATION_WORDPRESS.md
```

### Etap 10 — integracje i webhooki

```text
docs/ui/lorum-product-ui-reference-v1/prompts/11_INTEGRATIONS_AND_WEBHOOKS.md
```

### Etap 11 — agency

```text
docs/ui/lorum-product-ui-reference-v1/prompts/12_AGENCY_MODULE.md
```

### Etap 12 — ustawienia, zespół, billing i prywatność

```text
docs/ui/lorum-product-ui-reference-v1/prompts/13_SETTINGS_TEAM_BILLING_PRIVACY.md
```

### Etap 13 — onboarding i publiczny widget

```text
docs/ui/lorum-product-ui-reference-v1/prompts/14_ONBOARDING_AND_PUBLIC_WIDGET.md
```

### Etap 14 — globalny responsive i mobile QA

```text
docs/ui/lorum-product-ui-reference-v1/prompts/15_MOBILE_AND_RESPONSIVE_QA.md
```

### Etap 15 — finalna konsolidacja i cleanup

```text
docs/ui/lorum-product-ui-reference-v1/prompts/16_FINAL_CONSOLIDATION_AND_CLEANUP.md
```

Jeśli iteracja wraca do AI slopu:

```text
docs/ui/lorum-product-ui-reference-v1/prompts/17_ANTI_SLOP_RECOVERY.md
```

Nie przechodź samodzielnie między etapami. Po każdym etapie raport i STOP.

---


## 10A. ZASADA WYKONAWCZA: 1 PROMPT = 1 MAŁY ETAP = 1 BRANCH = 1 KOŃCOWY COMMIT

Dla każdego etapu:

1. utwórz osobny branch,
2. nie mieszaj innych modułów,
3. wykonaj tylko jeden zamknięty scope,
4. zrób screenshoty i testy,
5. wykonaj self-review,
6. utwórz jeden końcowy commit etapu,
7. pokaż raport,
8. zatrzymaj się.

Nie przechodź automatycznie dalej.

Dozwolone nazwy branchy, przykładowo:

```text
ui/00-reference-audit
ui/01-doc-canonicalization
ui/02-design-foundation
ui/03-app-shell
ui/04-landing-board-1
ui/05-landing-board-2
ui/06-landing-board-3
ui/07-landing-board-4
ui/08-dashboard
ui/09-leads
ui/10-lead-detail
ui/11-process-library
ui/12-builder
ui/13-rules-pricing-scoring
ui/14-analytics-delivery
ui/15-settings-agency
ui/16-onboarding-widget
ui/17-mobile-qa
ui/18-final-cleanup
```

Jeżeli etap wymaga więcej niż około 8–12 istotnych plików współdzielonych, podziel go przed implementacją.


## 11. OBOWIĄZKOWY WORKFLOW KAŻDEGO ETAPU

### Przed zmianami

1. Przeczytaj `AGENTS.md`, kanoniczne docs i prompt etapu.
2. Sprawdź `git status`, branch, ostatnie commity i niezacommitowane zmiany użytkownika.
3. Nie nadpisuj zmian użytkownika.
4. Uruchom baseline:
   - lint,
   - typecheck,
   - testy,
   - build.
5. Zapisz istniejące błędy oddzielnie.
6. Uruchom aplikację i zrób screenshot stanu „przed”.
7. Zmapuj komponenty, dane, routing i ryzyka.
8. Przedstaw plan maksymalnie 10 punktów.

### Implementacja

1. Wykonuj tylko zakres bieżącego etapu.
2. Najpierw napraw wspólne primitive/tokeny, jeśli problem jest systemowy.
3. Zachowaj działającą logikę.
4. Używaj realnych danych albo jawnie oznaczonego seed/demo.
5. Dodaj loading, empty, error, permission, disabled i success states.
6. Zapewnij klawiaturę, focus i semantykę.
7. Nie instaluj bibliotek bez osobnej decyzji.
8. Nie „upiększaj” złego layoutu efektami.

### Po implementacji

1. Zrób screenshoty w pełnej macierzy viewportów właściwej dla etapu.
2. Porównaj z referencją.
3. Wypisz 10 największych różnic w kolejności:
   - geometria,
   - regiony,
   - hierarchia,
   - szerokości kolumn,
   - responsive transformation,
   - typografia,
   - gęstość,
   - spacing,
   - kontrolki/statusy,
   - border/radius/shadow/motion.
4. Napraw minimum 5 najbardziej wpływowych różnic.
5. Wykonaj drugą serię screenshotów.
6. Uruchom:
   - layout integrity,
   - visual regression,
   - keyboard smoke,
   - axe,
   - lint,
   - typecheck,
   - testy,
   - build.
7. Zaktualizuj dokumenty kanoniczne, `docs/TASKS.md`, `docs/DECISIONS.md` i `docs/RISKS.md`.
8. Zatrzymaj się.

Nie uznawaj etapu za ukończony na podstawie samego builda.

---

## 12. TESTY LAYOUT INTEGRITY I VISUAL REGRESSION

Utwórz lub dostosuj test Playwright na podstawie:

```text
snippets/layout-integrity.spec.ts
docs/ui/REFERENCE_IMAGE_PROTOCOL.md
docs/ui/SECTION_FIDELITY_MATRIX.md
docs/ui/PRODUCT_SCREEN_FIDELITY_MATRIX.md
docs/ui/VISUAL_ACCEPTANCE_SCORECARD.md
```

Obowiązkowe viewporty:

```text
320 × 800    sanity
375 × 812
390 × 844
430 × 932
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1536 × 1024
```

Dodatkowo:

- mobile landscape dla widgetu,
- 200% zoom dla krytycznych ekranów,
- długie polskie copy,
- długa nazwa firmy,
- długi e-mail i URL,
- brak danych,
- dużo danych,
- error/loading/permission,
- reduced motion,
- keyboard-only,
- Safari iOS / Chrome Android przez emulację lub dostępne środowisko.

### Gate layoutu

Dla każdego krytycznego ekranu:

- brak poziomego overflow całej strony,
- brak niezamierzonego nakładania elementów `data-no-overlap`,
- brak obciętych etykiet, helperów i errorów,
- sticky actions nie zasłaniają ostatniej treści,
- dropdown/popover mieści się lub poprawnie flipuje,
- tabela desktop nie jest ściśnięta na mobile,
- sidebar/topbar nie nachodzą na content,
- wszystkie główne JTBD są wykonalne,
- screenshoty istnieją przed i po,
- nie aktualizuj snapshotów, aby ukryć regresję; najpierw wyjaśnij różnicę.

---


## 12A. OBOWIĄZKOWY SYSTEM PORÓWNANIA ZE ZDJĘCIAMI

Dla każdej sekcji i ekranu utwórz katalog:

```text
artifacts/visual-qa/<route-or-screen>/<viewport>/
```

Zawartość:

```text
00-reference.png
01-before.png
02-after-v1.png
03-overlay-v1.png
04-after-v2.png
05-overlay-v2.png
06-diff-report.md
```

Jeżeli referencja jest cropem z większej planszy, zapisz crop jako `00-reference.png`.

### 12A.1. Overlay

- renderuj screenshot dokładnie w viewportcie referencji,
- wyrównaj obrazy do wspólnego canvasu,
- przygotuj overlay 50/50 lub flicker/diff,
- nie zmieniaj rozmiaru referencji w sposób deformujący proporcje,
- nie aktualizuj referencji, aby dopasować ją do implementacji.

### 12A.2. Scoring wizualny

Każdy ekran/sekcja otrzymuje ocenę 0–2 w dziesięciu kategoriach:

1. kolejność i kompletność regionów,
2. geometria główna,
3. proporcje kolumn/paneli,
4. gęstość danych,
5. typografia,
6. spacing i alignment,
7. surfaces/borders/radius/shadow,
8. komponenty i ikonografia,
9. responsive transformation,
10. stany i interakcje.

Wymagania:

- minimum 18/20,
- kategoria 1, 2, 4 i 9 nie może mieć wyniku 0,
- brak P0/P1,
- brak nieudokumentowanego odstępstwa krytycznego.

### 12A.3. Priorytet poprawek

Naprawiaj w kolejności:

1. brakujący region lub zła kolejność,
2. overlap/overflow/clipping,
3. zła szerokość/kolumny,
4. zła gęstość,
5. typografia,
6. spacing,
7. border/radius/shadow,
8. micro-interactions.

Nie wolno spędzać czasu na hoverach, jeżeli układ główny jest błędny.

### 12A.4. Zakaz fałszywego PASS

Nie oznaczaj PASS na podstawie:

- subiektywnego stwierdzenia „wygląda profesjonalnie”,
- poprawnego builda,
- braku błędów konsoli,
- podobnej palety,
- pojedynczego viewportu,
- screenshotu bez zestawienia z referencją.


## 13. DEFINITION OF DONE DLA EKRANU

Ekran jest gotowy tylko wtedy, gdy:

- główny JTBD działa end-to-end,
- dane nie są atrapą albo są jawnie oznaczonym demo,
- zachowano auth, tenant scope, API i logikę,
- istnieją loading, empty, error i permission states,
- działa desktop, tablet i mobile,
- nie występuje globalny overflow poziomy,
- nie występują niezamierzone overlap/clipping,
- działa klawiaturą,
- focus jest widoczny,
- status nie zależy wyłącznie od koloru,
- przechodzi visual diff i layout integrity,
- przechodzi lint, typecheck, testy i build,
- dokumentacja i backlog są aktualne,
- nie zawiera elementów z listy AI slop,
- nie ma błędów P0/P1.

---

## 14. FORMAT RAPORTU PO KAŻDYM ETAPIE

Użyj dokładnie:

```md
# Raport etapu: <nazwa>

## Wykonano

## Zmienione pliki

## Zachowana logika i kontrakty

## Dokumenty
- KEEP:
- MERGE:
- REPLACE:
- ARCHIVE:
- DELETE:

## Testy i komendy

## Viewporty i screenshoty

## Layout integrity
- horizontal overflow:
- overlap:
- clipping:
- sticky occlusion:
- long content:
- 200% zoom:

## 10 największych różnic względem referencji

## Poprawki drugiej iteracji

## Accessibility

## Security i tenant scope

## Performance

## Nierozwiązane ryzyka

## Kryteria odbioru
- PASS:
- FAIL:

## Następny dozwolony etap

## STOP
```

---



## 15. PIERWSZE ZADANIE — WYKONAJ TERAZ WYŁĄCZNIE ETAP 0A/0B: REFERENCE LOCK + AUDYT READ-ONLY

Nie implementuj jeszcze UI. Nie zmieniaj CSS. Nie usuwaj ani nie przenoś dokumentów. Nie instaluj zależności. Nie uruchamiaj agentów implementacyjnych.

### A. Potwierdzenie obrazów

1. Wypisz wszystkie obrazy widoczne w tej wiadomości.
2. Dla każdego opisz ekrany/sekcje i viewport.
3. Potwierdź, że traktujesz obrazy jako nadrzędną specyfikację, a nie inspirację.
4. Wskaż brakujące lub nieczytelne referencje.
5. Jeżeli referencje krytyczne są niedostępne — zakończ `BLOCKED_BY_MISSING_REFERENCE`.

### B. Preflight repozytorium

1. Przeczytaj wszystkie obowiązkowe źródła.
2. Sprawdź Git, branch, niezacommitowane zmiany i baseline.
3. Zmapuj stack, routing, shell, komponenty, style i design tokens.
4. Zmapuj logikę i kontrakty, których nie wolno naruszyć.
5. Zrób screenshoty aktualnego landingu i panelu w:
   - 1536×1024,
   - 1440×900,
   - 1280×800,
   - 1024×768,
   - 768×1024,
   - 430×932,
   - 390×844,
   - 375×812,
   - 320×800.
6. Wskaż wszystkie miejsca z:
   - poziomym overflow,
   - nakładaniem,
   - clippingiem,
   - fixed height,
   - absolutnym pozycjonowaniem layoutu,
   - konfliktem sticky/z-index,
   - złą transformacją mobile,
   - stylem AI slop,
   - uproszczeniem względem referencji.

### C. Dekompozycja referencji

Utwórz wyłącznie dokumenty i cropy referencyjne:

```text
docs/ui/REFERENCE_MANIFEST.md
docs/ui/REFERENCE_DECOMPOSITION.md
docs/ui/VISUAL_MEASUREMENTS.md
docs/ui/REFERENCE_GAPS.md
docs/ui/references/derived/
```

Każdy ekran i każda z 15 sekcji landingu musi otrzymać własny wpis.

### D. Dokumenty migracyjne

Utwórz wyłącznie raporty:

```text
docs/_migration/LORUM_DOC_INVENTORY.md
docs/_migration/LORUM_UI_REBUILD_AUDIT.md
docs/_migration/LORUM_BRAND_IDENTIFIER_MATRIX.md
docs/_migration/LORUM_LAYOUT_RISK_REGISTER.md
docs/_migration/LORUM_REFERENCE_LOCK_REPORT.md
```

### E. Plan

Przygotuj `docs/TASKS.ui-rebuild.proposed.md`, ale nie podmieniaj jeszcze aktywnego `docs/TASKS.md`.

Każde zadanie ma zawierać:

- jeden mały scope,
- branch,
- końcowy commit,
- pliki,
- zależności,
- referencje i cropy,
- ryzyko,
- viewporty,
- kryteria wizualne,
- kryteria funkcjonalne,
- testy,
- dokumenty do aktualizacji,
- gate i STOP.

### F. Raport końcowy

Pokaż:

- listę rozpoznanych obrazów,
- baseline,
- mapę sekcji i ekranów,
- mapę obraz → route/komponent,
- mapę dokumentów,
- listę konfliktów,
- listę problemów layoutu z plikami i selektorami/komponentami,
- listę miejsc, gdzie obecny UI jest okrojony względem referencji,
- rekomendację KEEP/MERGE/REPLACE/ARCHIVE/DELETE,
- plan kolejnego małego etapu.

Na końcu napisz dokładnie:

```text
STOP — ETAP 0A/0B ZAKOŃCZONY. REFERENCJE ZABLOKOWANE. NIE WYKONANO IMPLEMENTACJI ANI DESTRUKCYJNEGO CLEANUPU.
```

Nie rozpoczynaj dokument cleanupu ani implementacji bez mojej akceptacji.

