# Założenia i otwarte pytania

## Założenia robocze

- Pierwszym rynkiem i językiem jest Polska/polski; model nie zamyka drogi do lokalizacji.
- PLN jest walutą domyślną, ale kwoty przechowujemy z kodem ISO i w najmniejszej jednostce.
- Start łączy usługę done-for-you i self-service; oba używają tych samych domen produktu.
- Priorytetowe branże to meble na wymiar, ogrodzenia i strony internetowe.
- Wynik MVP jest orientacyjny i niewiążący; firma wybiera przedział, „od”, brak ceny lub konsultację.
- System jest multi-tenant od pierwszej migracji, nawet jeśli pierwszy pilot ma jedną organizację.
- Hosting oparty o Next.js + PostgreSQL/Supabase jest propozycją do zatwierdzenia ADR.
- Płatności, AI i pełny CRM nie są częścią MVP.
- Dane demonstracyjne są syntetyczne i oznaczone.

## Pytania do właściciela produktu

Nie blokują dokumentacji ani technicznego fundamentu, ale mają gate przed wskazanym etapem:

| Pytanie                                                       | Termin decyzji             |
| ------------------------------------------------------------- | -------------------------- |
| Które 3 firmy będą pilotami i kto prowadzi wywiady?           | przed Etapem 4             |
| Czy pełny wynik domyślnie pojawia się przed czy po kontakcie? | przed Etapem 4             |
| Jaki minimalny zestaw danych ma każdy lead?                   | przed Etapem 4             |
| Jakie limity plików i retencja domyślna są akceptowalne?      | przed Etapem 7             |
| Czy Admin może eksportować leady, czy wyłącznie Owner?        | przed Etapem 7             |
| Jak wygląda delegacja agencji do organizacji klienta?         | przed Etapem 3             |
| Który dostawca e-mail i region danych zostają zatwierdzone?   | przed Etapem 8/produkcją   |
| Jaki model cenowy i limity planów przechodzą walidację?       | przed publicznym cennikiem |
| Czy „Wyceno” przechodzi profesjonalne badanie znaku i domen?  | przed brandingiem/launch   |
| Kto jest właścicielem incydentów, prywatności i supportu?     | przed Etapem 13            |

## Zasada decyzji

Odpowiedź zmieniająca architekturę, security lub scope trafia najpierw do `docs/DECISIONS.md`, a następnie do wymagań i backlogu.
