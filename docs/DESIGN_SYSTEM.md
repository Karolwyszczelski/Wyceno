# Design system

## Kierunek

Spokojny, precyzyjny i lekko techniczny. Motyw: nieuporządkowane zapytanie przechodzi przez selekcję i grupowanie do gotowego briefu. Light theme w MVP.

## Tokeny zatwierdzone w Etapie 2

Tło `#F5F6F2`, powierzchnia `#FFFFFF`, powierzchnia drugorzędna `#EEF1ED`,
tekst `#17201D`, tekst drugorzędny `#58645F`, akcent dekoracyjny
`#39D98A`, akcent mocny i CTA `#123D2C`, linia `#BCC7C1`, mocna linia
kontrolki `#6A756F`, warning `#7A4A08`, error `#8A2F35`, info `#255A82`.

Jasna zieleń nie służy do tekstu na bieli. Jest wyróżnikiem, zaznaczeniem i
powierzchnią z tekstem `#123D2C`. Główne CTA używa ciemnej zieleni z białym
tekstem. Para tekst/powierzchnia, muted/powierzchnia, CTA, komunikaty i mocna
granica kontrolek mają automatyczny test WCAG. Zieleń oznacza porządkowanie i
gotowość procesu, nie wynik finansowy ani „eko”. Lokalne kolory są zabronione.

## Skale

- spacing: 4, 8, 12, 16, 24, 32, 48, 64;
- radius: 4 kontrolki małe, 6–8 input/button, 10–12 panel;
- motion: 120–220 ms reakcje, 200–320 ms panele, bez dekoracyjnych springów;
- body minimum 16 px, tabular numerals w danych;
- główne cele dotykowe 40–44 px, minimum WCAG 24×24 CSS px.

## Komponenty etapami

Etap 2: Button, IconButton, LinkButton, Input, Textarea, Select, Checkbox, Radio, FormField, FieldError, Badge/StatusBadge, Dialog/Drawer, Tabs, Table, Empty/Error/Skeleton, Toast/Alert, Stepper, Breadcrumb, Sidebar, AppHeader. Bardziej złożone Combobox, Slider, DatePicker, FileUpload, CommandMenu, ChartContainer i FilterBar powstają wraz z realnym użyciem.

Każdy komponent ma stany hover/focus/active/disabled/loading/error, dokumentację, test klawiatury i kontrastu.

## Implementacja

Źródłem tokenów i komponentów jest `packages/ui`. Showcase `/design-system`
jest celowo wyłączony z indeksowania i zawiera wyłącznie syntetyczny tryb
demonstracyjny. Kontrakty komponentów i procedura zmiany baseline znajdują się
w `packages/ui/README.md`.
