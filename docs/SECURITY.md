# Bezpieczeństwo

## Model zagrożeń

Chronione aktywa: PII leadów, pliki, konfiguracja ceny, tokeny integracji i dane organizacji. Główni przeciwnicy: anonimowy spammer, złośliwy respondent, użytkownik próbujący IDOR, przejęte konto i błędna integracja.

## Kontrole bazowe

- walidacja i autoryzacja server-side, RLS i least privilege;
- jawny tenant context i testy negatywne;
- bezpieczne cookies, rotacja sesji, MFA jako rekomendacja dla Ownera;
- CSP, HSTS, frame policy świadoma embedów, nosniff i referrer policy;
- output encoding, ograniczony rich text, brak `eval`;
- rate limits per IP/public flow/session oraz Turnstile adaptacyjnie przy submit;
- limity body, uploadu i liczby plików; MIME + magic bytes; prywatne obiekty i podpisane odczyty;
- HMAC webhooków, timestamp, replay window, retry i idempotencja;
- sekrety wyłącznie server-side, rotacja i skan repozytorium;
- dependency review, lockfile, automatyczne alerty i SBOM przed produkcją;
- logi bez pełnych PII, audit log operacji krytycznych.

## Szczególne przypadki

Manipulacja ceną: serwer odtwarza kalkulację na opublikowanej wersji. IDOR: zasób spoza tenant scope zwraca generyczne 404. Upload: nazwa klienta nie staje się ścieżką obiektu. Public ID nie ujawnia kolejnych identyfikatorów.

## Reakcja

Klasyfikacja, ograniczenie skutków, zachowanie dowodów, rotacja, ocena obowiązków notyfikacyjnych przez uprawnioną osobę, komunikacja i post-mortem. Kontakty i czasy reakcji zostaną wpisane przed produkcją.
