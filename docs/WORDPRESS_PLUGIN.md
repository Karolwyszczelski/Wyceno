# Wtyczka WordPress

## Rola

Wtyczka jest konektorem do SaaS, nie kopią backendu. Nie przechowuje leadów, reguł ani sekretnego API key w froncie.

## MVP

- połączenie przez jednorazowy token instalacyjny wymieniany server-to-server;
- zaszyfrowany/chroniony credential po stronie WordPress i możliwość rotacji;
- lista opublikowanych flow i status połączenia;
- shortcode `[wyceno id="flow_public_id" mode="inline"]`;
- blok Gutenberg: flow, tryb, wysokość, podgląd i stan błędu;
- popup otwierany przez blok lub bezpieczny atrybut;
- diagnostyka wersji PHP/WP, REST, CSP i komunikacji;
- pełne odłączenie oraz usunięcie credentialu.

## Bezpieczeństwo i jakość

Capabilities i nonce dla admin mutations, sanitization/escaping, brak sekretów w HTML, pinned origin SaaS, minimalny skrypt na froncie, testy kompatybilności i procedura bezpiecznej aktualizacji. WordPress nie może modyfikować historycznej wersji flow.

## Poza MVP

Synchronizacja leadów do WP, WooCommerce, multisite white-label i własna kopia widgetu.
