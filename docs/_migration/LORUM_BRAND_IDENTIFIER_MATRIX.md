# Matryca marki i identyfikatorów

**Status:** kanoniczna  
**Podstawa:** ADR-024 i ADR-028

| Element                        | Wartość                              | Zasada                                                            |
| ------------------------------ | ------------------------------------ | ----------------------------------------------------------------- |
| Widoczna nazwa produktu        | `Lorum`                              | używana w marketingu, panelu, widgetcie, e-mailach i WordPress UI |
| Nazwa w historycznych obrazach | `Wyceno`                             | nie kopiować do nowej powierzchni                                 |
| Pakiety                        | `@wyceno/*`                          | zachować                                                          |
| Custom element                 | `<wyceno-widget>`                    | zachować                                                          |
| Eventy przeglądarki            | `wyceno:*`                           | zachować                                                          |
| Nagłówek sesji                 | `X-Wyceno-Session`                   | zachować                                                          |
| Storage prefix                 | techniczny `wyceno`                  | zachować                                                          |
| WordPress shortcode/namespace  | istniejący kontrakt Wyceno           | zachować                                                          |
| Nazwy migracji i tabel         | istniejące techniczne identyfikatory | nie zmieniać w rebrandingu                                        |
| Dane demonstracyjne            | jawnie oznaczone                     | nie używać prawdziwych danych osobowych                           |

Zmiana dowolnego stabilnego identyfikatora wymaga osobnego ADR, matrycy
kompatybilności, okresu przejściowego i testów istniejących osadzeń.
