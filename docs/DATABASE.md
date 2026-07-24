# Model danych

## Konwencje

UUID/ULID jako identyfikatory, `organization_id` na każdym rekordzie biznesowym, `created_at`/`updated_at` w UTC, soft delete tylko tam, gdzie wymaga tego odzyskanie lub retencja. Kwoty jako integer w najmniejszej jednostce waluty, nigdy float.

## Tożsamość i tenancy

- `users` — profil powiązany z dostawcą Auth;
- `organizations`, `organization_settings`;
- `organization_members` — `role`, status, zaproszenie;
- `sites` — dozwolone domeny, ustawienia embed;
- `api_keys`, `integrations`, `subscriptions`, `usage_records`.

## Flow

- `flows` — stabilna tożsamość i bieżący draft;
- `flow_versions` — immutable snapshot ze statusem draft/published/archived;
- `flow_steps`, `flow_options`, `conditional_rules`;
- `pricing_rules`, `scoring_rules`, `result_variants`, `themes`;
- `published_flows` — publiczny identyfikator → konkretna wersja;
- `email_templates`.

Draft może być znormalizowany dla edycji, ale publikacja tworzy walidowany, kanoniczny snapshot z hashem. Historycznego snapshotu nie edytujemy.

## Sesje i leady

- `widget_sessions` — publiczny losowy token, flow version, expiry, źródło i zgrubne dane urządzenia;
- `session_answers`, `session_events`;
- `leads` — organizacja, wersja, status, score, przedział, kontakt;
- `lead_answers`, `lead_files`, `lead_status_history`, `lead_notes`;
- `consent_records` — typ, treść/hash wersji, timestamp i źródło;
- `notifications`, `webhook_endpoints`, `webhook_deliveries`, `audit_logs`.

## Kluczowe więzy

- unique membership `(organization_id, user_id)`;
- jeden aktywny publiczny alias na flow;
- lead wymaga `flow_version_id`;
- `price_min <= price_max`, waluta ISO 4217;
- odpowiedź jest unikalna dla `(session_id, step_id)` z wersjonowaniem zapisu;
- eventy i submit przyjmują idempotency key;
- pliki wskazują prywatny bucket i tenant path.

## Indeksy początkowe

`organization_members(user_id, organization_id)`, `flows(organization_id, updated_at)`, `leads(organization_id, created_at desc)`, `leads(organization_id, status, score)`, `session_events(flow_version_id, occurred_at)`, `webhook_deliveries(status, next_attempt_at)`.

## Retencja

Sesje niedokończone, eventy surowe, leady i audyt mają osobne polityki. Domyślne okresy zostaną zatwierdzone z właścicielem danych; job usuwa/anonymizuje partiami i zapisuje raport bez PII.
