import { marketingMetadata } from "../../../lib/marketing/metadata";
import { Breadcrumbs, CtaBand } from "../components";

export const metadata = marketingMetadata(
  "Jak Lorum porządkuje i kwalifikuje zapytania",
  "Od szablonu i publikacji przez sesję klienta do serwerowego wyniku, uporządkowanego leada, powiadomień i analityki.",
  "/jak-dziala",
);

export default function HowItWorksPage() {
  return (
    <>
      <div className="marketing-container marketing-page-hero">
        <Breadcrumbs items={[{ href: "/", label: "Start" }, { label: "Jak działa" }]} />
        <div className="marketing-page-hero__grid">
          <div className="marketing-page-hero__copy">
            <p className="wy-kicker marketing-eyebrow">Jak działa</p>
            <h1>Klient odpowiada. Serwer potwierdza. Firma dostaje kontekst.</h1>
            <p>
              Każdy etap ma wyraźną granicę zaufania: przeglądarka prowadzi proces, ale nie decyduje
              samodzielnie o cenie, score ani dostępie do danych.
            </p>
          </div>
          <aside className="marketing-page-hero__aside">
            <strong>Orientacyjny wynik</strong>
            <span>Lorum nie zastępuje konsultacji, pomiaru ani formalnej oferty firmy.</span>
          </aside>
        </div>
      </div>

      <section className="marketing-section marketing-section--surface">
        <div className="marketing-container process-narrative">
          <ol>
            {[
              [
                "01 · Konfiguracja",
                "Owner lub Admin wybiera szablon, dopasowuje pytania, warunki, pricing, scoring i treści zgód.",
                "18 pytań · 5 warunków · wynik orientacyjny",
              ],
              [
                "02 · Walidacja i publikacja",
                "System wykrywa pętle i martwe ścieżki. Publikacja tworzy niezmienną wersję z własnym hashem.",
                "Wersja 4 · opublikowana · niezmienna",
              ],
              [
                "03 · Sesja klienta",
                "Widget przypina sesję do wersji, zapisuje odpowiedzi i potwierdza routing po stronie serwera.",
                "Krok 3 z 7 · odpowiedź zapisana",
              ],
              [
                "04 · Wynik",
                "Serwer odtwarza pricing i scoring z zapisanych odpowiedzi. Klient widzi tylko bezpieczną część wyniku.",
                "30–45 tys. zł · wynik nie jest ofertą",
              ],
              [
                "05 · Kontakt i lead",
                "Po wartości klient przekazuje minimalny kontakt, potwierdza informację prywatności i opcjonalnie dodaje pliki.",
                "E-mail · 2 pliki · potwierdzenie v1",
              ],
              [
                "06 · Obsługa i pomiar",
                "Firma otrzymuje powiadomienie, zmienia status leada i obserwuje agregowaną analitykę procesu.",
                "Gotowy do kontaktu · następny krok: rozmowa",
              ],
            ].map(([title, description, detail]) => (
              <li key={title}>
                <div>
                  <span>{title?.slice(0, 2)}</span>
                  <h2>{title?.slice(5)}</h2>
                  <p>{description}</p>
                </div>
                <aside aria-label={`Przykład: ${detail}`}>{detail}</aside>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section" id="bezpieczenstwo">
        <div className="marketing-container">
          <div className="marketing-section__heading">
            <p className="wy-kicker marketing-eyebrow">Bezpieczeństwo procesu</p>
            <h2>Dane organizacji mają kilka niezależnych warstw ochrony.</h2>
          </div>
          <dl className="security-lines">
            <div>
              <dt>Tenant scope i RLS</dt>
              <dd>
                Każdy odczyt panelu ma jawny kontekst organizacji, a PostgreSQL niezależnie wymusza
                polityki dostępu.
              </dd>
            </div>
            <div>
              <dt>Prywatne reguły</dt>
              <dd>
                Manifest widgetu nie zawiera pricingu, scoringu, identyfikatora tenanta ani danych
                innych sesji.
              </dd>
            </div>
            <div>
              <dt>Kontrolowane pliki</dt>
              <dd>
                Typ, rozszerzenie i sygnatura pliku są sprawdzane przed zapisem w prywatnym storage.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        description="Zobacz strony branżowe, aby porównać zakres pytań i przykładowy brief dla konkretnego typu usługi."
        title="Mechanizm jest wspólny. Pytania pozostają branżowe."
      />
    </>
  );
}
