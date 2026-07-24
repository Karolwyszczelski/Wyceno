# Kontrakty API

## Standard

JSON po HTTPS, jawna wersja `/api/v1`, limity payloadu, Zod po stronie serwera, stabilne kody błędów i `request_id`. Mutacje krytyczne przyjmują `Idempotency-Key`. Błąd nie ujawnia istnienia zasobu innego tenanta.

Przykład błędu:

```json
{
  "error": {
    "code": "FLOW_NOT_PUBLISHABLE",
    "message": "Proces zawiera błędy konfiguracji",
    "details": [],
    "request_id": "..."
  }
}
```

## Panel

- `POST /organizations`, `GET/PATCH /organizations/:id`;
- `GET/POST /flows`, `GET/PATCH /flows/:id`;
- `POST /flows/:id/validate`, `POST /flows/:id/publish`;
- `GET /leads`, `GET/PATCH /leads/:id`, `POST /leads/:id/notes`;
- `GET /analytics/overview`;
- `POST/DELETE /webhooks`, `POST /webhooks/:id/test`.

## Publiczne

- `GET /public/flows/:publicId/manifest`;
- `POST /public/flows/:publicId/sessions`;
- `PUT /public/sessions/:token/answers/:stepKey`;
- `POST /public/sessions/:token/files/presign`;
- `POST /public/sessions/:token/submit`;
- `POST /public/events` z batchowaniem i limitami.

Odpowiedź submit zawiera wynik do pokazania, nigdy reguły wewnętrzne. Serwer przelicza wynik na snapshotcie wersji.

## Webhook

Envelope: `id`, `type`, `occurred_at`, `organization_id`, `data`. Nagłówki: identyfikator dostawy, timestamp i podpis HMAC. Odbiorca ma tolerować duplikaty.

Szczegółowe OpenAPI i wersjonowanie kompatybilności powstaną w etapach domenowych, zanim endpointy zostaną wdrożone.
