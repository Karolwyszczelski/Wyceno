# Architektura widgetu

## Cele

Izolacja od CSS i JS hosta, mały bundle, dostępność niezależna od strony, stabilna wysokość, wznowienie sesji, obsługa utraty sieci i brak sekretów.

## Loader

Jeden wersjonowany skrypt rejestruje custom element, ignoruje kolejne identyczne inicjalizacje i wspiera inline/popup/fullscreen. Hosted link używa tego samego renderera. Loader nie pobiera aplikacji panelowej.

## State machine

`idle → loading_manifest → active → submitting → result`, z osobnymi stanami `recoverable_error`, `expired` i `unavailable`. Odpowiedzi zapisują się lokalnie i serwerowo; kolejka ponawia bez duplikowania. Dwie zakładki wykrywają nowszą rewizję sesji.

## Bezpieczeństwo

Manifest jest allowlistowany. HTML użytkownika jest sanityzowany; preferowany jest ograniczony rich text. Upload używa krótkiego presigned URL, limitu MIME/rozmiaru i prywatnego bucketu. Token sesji ma wysoką entropię, expiry i ograniczony scope. Cena z klienta jest wyłącznie podglądem.

## Komunikacja z hostem

Custom events: ready, resize, started, submitted, closed. Dane kontaktowe i odpowiedzi nie są emitowane do hosta. `postMessage` wymaga sprawdzenia originu. Widget respektuje CSP i `prefers-reduced-motion`.
