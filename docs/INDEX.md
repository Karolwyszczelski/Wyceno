# Indeks dokumentacji Lorum

**Status:** kanoniczny  
**Ostatni przegląd:** 2026-07-29

Ten plik wskazuje jedno aktywne źródło prawdy dla każdego obszaru. Materiały
referencyjne i raporty historyczne nie zastępują wymagań produktu, decyzji ADR
ani kontroli bezpieczeństwa.

## Kolejność pierwszeństwa

1. Bezpieczeństwo, prywatność i tenant isolation:
   `SECURITY.md`, `PRIVACY.md`, `AUTHORIZATION.md`, `THREAT_MODEL.md`.
2. Zaakceptowane decyzje przekrojowe: `DECISIONS.md`.
3. Zakres i zachowanie produktu: `PRODUCT_REQUIREMENTS.md`, `SCOPE.md`,
   `NON_GOALS.md`.
4. Kontrakty architektury i danych: `ARCHITECTURE.md`, `DATABASE.md`,
   `API_CONTRACTS.md`.
5. Aktywny backlog i gate'y: `TASKS.md`.
6. Program dojścia do pilota i produkcji: `PRODUCTION_READINESS_PLAN.md`
   oraz blokująca `RELEASE_CHECKLIST.md`.
7. Kontrakt prezentacji V6 Image-Locked: `../CODEX_MASTER_PROMPT.md`,
   `DESIGN_SYSTEM.md`, `UI_SCREEN_SPEC.md`, `RESPONSIVE_LAYOUT.md`,
   `VISUAL_QA.md` oraz `ui/REFERENCE_MANIFEST.md`.
8. Raporty etapów i materiały źródłowe — kontekst historyczny, bez prawa do
   samodzielnego rozszerzania zakresu.

Nowszy obraz zaakceptowany w rozmowie może zastąpić starszą geometrię wyłącznie
po zapisaniu różnicy w `ui/REFERENCE_MANIFEST.md` lub
`ui/REFERENCE_GAPS.md`. Obraz nigdy nie obniża wymagań bezpieczeństwa i nie
zatwierdza funkcji spoza `SCOPE.md`.

## Mapa źródeł prawdy

| Obszar               | Dokument kanoniczny                                   | Dokumenty uzupełniające                                                                             |
| -------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Cel i pozycjonowanie | `PRODUCT_VISION.md`                                   | `JOBS_TO_BE_DONE.md`, `PERSONAS.md`, `USER_JOURNEYS.md`                                             |
| Zakres MVP           | `PRODUCT_REQUIREMENTS.md`, `SCOPE.md`, `NON_GOALS.md` | `ROADMAP.md`                                                                                        |
| Decyzje              | `DECISIONS.md`                                        | `ASSUMPTIONS_AND_OPEN_QUESTIONS.md`, `RISKS.md`                                                     |
| Architektura         | `ARCHITECTURE.md`                                     | `DEPENDENCIES.md`, `DEVELOPMENT.md`                                                                 |
| Dane i tenant scope  | `DATABASE.md`, `AUTHORIZATION.md`                     | `FLOW_DOMAIN.md`, `LEAD_PIPELINE.md`                                                                |
| Bezpieczeństwo       | `SECURITY.md`, `THREAT_MODEL.md`                      | `SECURITY_AUDIT_2026-07-25.md`, `BACKUP_AND_RECOVERY.md`                                            |
| Prywatność           | `PRIVACY.md`                                          | `DPA_AND_SUBPROCESSORS.md`, `RELEASE_CHECKLIST.md`                                                  |
| Widget               | `WIDGET_ARCHITECTURE.md`                              | `WIDGET_IMPLEMENTATION.md`, `WORDPRESS_PLUGIN.md`                                                   |
| Estymacja            | `ESTIMATION_ENGINE.md`                                | `PRODUCT_REQUIREMENTS.md`, ADR-016                                                                  |
| Analityka            | `ANALYTICS_PLAN.md`                                   | `ANALYTICS_IMPLEMENTATION.md`, ADR-019                                                              |
| Marketing i SEO      | `CONTENT_ARCHITECTURE.md`, `SEO_STRATEGY.md`          | `MARKETING_IMPLEMENTATION.md`, `CRO_PLAN.md`                                                        |
| Treść i stany UX     | `CONTENT_DESIGN.md`, `EMPTY_LOADING_ERROR_STATES.md`  | `ACCEPTANCE_CRITERIA.md`                                                                            |
| System wizualny      | `DESIGN_SYSTEM.md`                                    | `DESIGN_PRINCIPLES.md`, ADR-024–ADR-028                                                             |
| Zakres ekranów       | `UI_SCREEN_SPEC.md`                                   | `ui/MASTER_SCREEN_SCOPE.md`, `panel-reference-audit.md`, `BUILDER_COMPLETENESS_AUDIT_2026-07-29.md` |
| Responsive           | `RESPONSIVE_LAYOUT.md`                                | `ui/RESPONSIVE_LAYOUT_INTEGRITY.md`                                                                 |
| Visual QA            | `VISUAL_QA.md`                                        | `panel-visual-qa.md`, `QA_PLAN.md`, `ACCESSIBILITY.md`                                              |
| Obrazy referencyjne  | `ui/REFERENCE_MANIFEST.md`                            | `ui/UI_REFERENCE_INDEX.md`, `ui/REFERENCE_IMAGE_PROTOCOL.md`                                        |
| Plan prac            | `TASKS.md`                                            | `ROADMAP.md`, `RELEASE_CHECKLIST.md`                                                                |
| Gotowość produkcyjna | `PRODUCTION_READINESS_PLAN.md`                        | `RELEASE_CHECKLIST.md`, `DEPLOYMENT.md`, `BACKUP_AND_RECOVERY.md`, `OBSERVABILITY.md`               |

## Pakiety źródłowe V6

- `ui/lorum-landing-reference-v2/` — mierzalna referencja landingu, prototyp i
  renderingi. Materiał źródłowy, nie osobny backlog.
- `ui/lorum-product-ui-reference-v1/` — referencje panelu, mobile i buildera.
  Materiał źródłowy; najnowsze obrazy wymienione w manifeście mają pierwszeństwo.
- `../references/` — cztery główne plansze używane przez master prompt;
  nie utrzymujemy ich dodatkowej kopii w `ui/references/`.
- `../CODEX_MASTER_PROMPT.md` — jedyny aktywny master prompt; identyczna kopia
  z `ui/` została usunięta.
- `../snippets/layout-integrity.spec.ts` — referencyjny test integralności
  layoutu; przed użyciem trzeba dostosować selektory do bieżącego etapu.

Aktualną rekonstrukcję panelu dokumentują `panel-reference-audit.md`,
`panel-ui-gap-analysis.md` i `panel-visual-qa.md`. Pierwszy blokuje pomiary,
drugi zachowuje porównanie stanu „przed”, a trzeci jest raportem odbioru po
implementacji.

Aktualną, niezakończoną wizualnie korektę hero strony głównej dokumentuje
`LANDING_RENDERED_PHONE_HERO_2026-07-29.md`. Decyzja U w
`ui/REFERENCE_MANIFEST.md` nadpisuje wcześniejszą scenę tylko w tym regionie.

## Dokumenty historyczne

Poniższe raporty opisują wykonane iteracje i nie sterują kolejną przebudową:

- `_archive/2026-07-28-pre-lorum-ui-v6/PREMIUM_MINIMAL_REDESIGN_AUDIT.md`;
- `_archive/2026-07-28-pre-lorum-ui-v6/PREMIUM_MINIMAL_REDESIGN_PROMPT.md`;
- `_archive/2026-07-28-pre-lorum-ui-v6/REFERENCE_LED_REBRAND_2026-07-26.md`;
- `_archive/2026-07-28-pre-lorum-ui-v6/HOME_REFERENCE_RECONSTRUCTION_2026-07-26.md`;
- `_archive/2026-07-28-pre-lorum-ui-v6/LORUM_PRESENTATION_REDESIGN.md`.

Klasyfikację i dowody czyszczenia zachowują
`_migration/LORUM_DOC_INVENTORY.md` i
`_migration/LORUM_DOC_MIGRATION_REPORT.md`. Bieżący baseline całego
repozytorium, w tym jawna klasyfikacja lokalnych archiwów i artefaktów QA,
znajduje się w
`_migration/REPOSITORY_BASELINE_INVENTORY_2026-07-29.md`. Decyzje o retencji
obrazów dokumentuje `_migration/VISUAL_QA_RETENTION_2026-07-29.md`.

## Nazwa prezentacyjna a identyfikatory

Widoczna marka to **Lorum**. Identyfikatory kompatybilności `@wyceno/*`,
`<wyceno-widget>`, `wyceno:*`, `X-Wyceno-Session`, shortcode i namespace
WordPress pozostają celowo bez zmian zgodnie z ADR-024. Pełna matryca znajduje
się w `_migration/LORUM_BRAND_IDENTIFIER_MATRIX.md`.
