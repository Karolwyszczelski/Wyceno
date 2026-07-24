# Audyt referencji UI

**Data:** 2026-07-23. Referencje służą do analizy wzorców, nie kopiowania stylu.

## Wzorce warte wykorzystania

- ekranowe formularze Typeform/Heyflow: jednoznaczny fokus na aktualnym pytaniu;
- logic map Typeform/Heyflow: widoczność zależności bez pełnego node editora;
- dokumentowy builder Tally: niski próg tworzenia;
- dynamiczne zmienne Fillout: bliskość kalkulacji i użycia;
- CRM HubSpot/Pipedrive: lead jako obiekt operacyjny, nie tylko submission;
- Gutenberg: przewidywalna instalacja bloku w kontekście strony.

## Ryzyka do uniknięcia

- rozproszenie funkcji w wielu modalach i ukrytych workflow;
- formuły bez bezpiecznego modelu i wyjaśnienia kolejności;
- mobile builder jako pomniejszony desktop;
- dashboard z metrykami bez decyzji;
- ogromny canvas z martwymi przestrzeniami;
- ciężka personalizacja, która pozwala złamać kontrast;
- embed wymagający custom JS i podatny na cache/CSS hosta.

## Rekomendacja buildera

Trzy kolumny: nawigacja kroków, rzeczywisty preview/edycja, ustawienia wybranego elementu. Logika jako czytelna lista IF/THEN z widokiem zależności i automatyczną diagnostyką. Pricing i scoring oddzielone pojęciowo, lecz ich efekt widoczny w jednym trybie testowym.

## Rekomendacja dashboardu

Najpierw status publikacji i „Wymaga uwagi”, następnie kilka metryk z okresem i porównaniem, potem ostatnie leady i drop-off. Przy małej próbie zamiast wykresu instrukcja, jak zebrać dane.

## Rekomendacja widgetu

Lekki nagłówek z realnym postępem, pytanie, pomoc kontekstowa, odpowiedzi o dużych celach dotykowych i stała nawigacja. Nie używać dekoracyjnych kart jako domyślnego wzorca każdego pytania.

Źródła funkcjonalne: dokumentacja konkurencji zestawiona w `COMPETITIVE_ANALYSIS.md`.
