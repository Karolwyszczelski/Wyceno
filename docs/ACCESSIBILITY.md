# Dostępność

Cel: WCAG 2.2 AA.

## Wymagania

- semantyczny HTML, skip link, logiczne nagłówki i kolejność fokusu;
- pełna obsługa klawiaturą; alternatywa dla drag-and-drop;
- wyraźny fokus, focus trap/return w dialogu;
- programatyczne label, hint i error; statusy dynamiczne przez właściwy live region;
- brak informacji wyłącznie kolorem;
- kontrast tekstu i kontrolek sprawdzany automatycznie i wizualnie;
- cele minimum 24×24, główne 40–44 px;
- reduced motion i brak automatycznego przesuwania bez kontroli;
- dostępne błędy kroków oraz summary po submit;
- widget zachowuje semantykę niezależnie od hosta.

## Testy

Lint a11y, Testing Library + axe, ręczna klawiatura, VoiceOver/NVDA na ścieżkach krytycznych, zoom 200/400%, mobile i high contrast. Automaty nie zastępują testu czytnikiem.

## Baseline Etapu 2

- axe: brak automatycznie wykrywalnych naruszeń WCAG 2 A/AA, 2.1 A/AA i 2.2 AA
  na zamkniętym showcase;
- klawiatura: skip link, tabs, dialog i mobilny drawer pokryte Playwrightem;
- motion: `prefers-reduced-motion: reduce` redukuje wszystkie animacje i wyłącza
  płynne przewijanie;
- visual: baseline desktop 1440 px i mobile 390 px;
- kontrast: tekstowe pary minimum 4.5:1, mocna granica kontrolki minimum 3:1.

Pozostaje ręczny test VoiceOver/NVDA, forced colors oraz zoom 200/400% przed
release produkcyjnym; nie blokuje wewnętrznego gate’u foundation, ale jest
obowiązkowy przed zamknięciem checklisty release.
