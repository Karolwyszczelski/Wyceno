# Backup i odtwarzanie

## Cele robocze

Przed produkcją biznes zatwierdza RPO i RTO. Propozycja MVP: RPO ≤ 24 h i RTO ≤ 8 h dla pełnej katastrofy, krótsze dla incydentu aplikacyjnego. To nie jest gwarancja dostawcy.

## Zakres

PostgreSQL z point-in-time recovery jeśli plan wspiera, prywatny storage, konfiguracje krytycznych integracji bez eksportowania jawnych sekretów oraz repozytorium kodu. Backup musi być szyfrowany, odseparowany i objęty retencją.

## Procedura

Kwartalny test restore do izolowanego środowiska, walidacja liczby rekordów i referencji plików, rotacja credentiali po odtworzeniu, protokół czasu i problemów. Test odtwarzania jest kryterium produkcji, nie tylko fakt istnienia backupu.
