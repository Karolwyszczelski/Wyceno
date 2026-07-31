import Link from "next/link";

import { marketingMetadata } from "../../../lib/marketing/metadata";
import { ArrowIcon, Breadcrumbs, CtaBand, ProductWorkspace } from "../components";

export const metadata = marketingMetadata(
  "System kwalifikacji zapytań dla firm usługowych",
  "Poznaj Lorum: procesy, wersjonowanie, serwerowy pricing i scoring, widget, leady, pliki, powiadomienia oraz analityka.",
  "/produkt",
);

export default function ProductPage() {
  return (
    <>
      <div className="marketing-container marketing-page-hero">
        <Breadcrumbs items={[{ href: "/", label: "Start" }, { label: "Produkt" }]} />
        <div className="marketing-page-hero__grid">
          <div className="marketing-page-hero__copy">
            <p className="wy-kicker marketing-eyebrow">Produkt</p>
            <h1>Jeden proces od konfiguracji do obsługi leada.</h1>
            <p>
              Firma buduje pytania i reguły, publikuje niezmienną wersję, osadza formularz i
              otrzymuje wynik razem z pełnym kontekstem zapytania.
            </p>
            <div className="marketing-actions">
              <Link className="marketing-button" href="/jak-dziala">
                Przejdź przez proces <ArrowIcon />
              </Link>
              <Link className="marketing-button marketing-button--secondary" href="/funkcje">
                Zobacz funkcje
              </Link>
            </div>
          </div>
          <aside className="marketing-page-hero__aside">
            <strong>Zakres MVP</strong>
            <span>
              Interaktywny formularz, orientacyjny wynik, kwalifikacja, leady, powiadomienia i
              analityka. Bez płatności i pełnego CRM.
            </span>
          </aside>
        </div>
      </div>

      <section className="marketing-section marketing-section--surface">
        <div className="marketing-container product-map">
          <div className="marketing-section__heading">
            <p className="wy-kicker marketing-eyebrow">Mapa produktu</p>
            <h2>Jeden system prowadzi od opublikowanych pytań do decyzji handlowca.</h2>
          </div>
          <ProductWorkspace compact label="Mapa produktu Lorum" />
          <ol className="product-module-index">
            {[
              [
                "Builder i wersje",
                "Draft można zmieniać, ale opublikowany snapshot pozostaje niezmienny dla aktywnych sesji i leadów.",
              ],
              [
                "Widget i hosted link",
                "Ten sam proces działa inline, w popupie, fullscreen albo pod osobnym adresem.",
              ],
              [
                "Pricing i scoring",
                "Ograniczone reguły są deterministyczne, wyjaśnialne i potwierdzane przez serwer.",
              ],
              [
                "Lead pipeline",
                "Odpowiedzi, kontakt, pliki, status, notatki i historia tworzą jeden uporządkowany rekord.",
              ],
              [
                "Powiadomienia",
                "Transakcyjny outbox oddziela zapis leada od dostawy dostępnych wiadomości HTML i text.",
              ],
              [
                "Analityka",
                "Agregaty po zgodzie pokazują konwersję i drop-off, z ochroną małej próby.",
              ],
            ].map(([title, description]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section marketing-section--dark" id="granice">
        <div className="marketing-container product-boundaries">
          <div>
            <p className="wy-kicker marketing-eyebrow">Świadome granice</p>
            <h2>Formularz kwalifikuje. Nie udaje systemu do wszystkiego.</h2>
          </div>
          <dl>
            <div>
              <dt>Nie jest wiążącą ofertą</dt>
              <dd>Wynik wymaga potwierdzenia zakresu przez firmę.</dd>
            </div>
            <div>
              <dt>Nie jest pełnym CRM-em</dt>
              <dd>Panel obsługuje kontekst i status leada, nie realizację zlecenia.</dd>
            </div>
            <div>
              <dt>Nie używa AI do ceny</dt>
              <dd>Pricing i scoring wynikają z jawnych, ograniczonych reguł.</dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        description="Wybierz zastosowanie, zobacz specyficzne pytania i oceń, czy prowadzony proces pasuje do sposobu sprzedaży."
        title="Zacznij od realnego zapytania swojej branży."
      />
    </>
  );
}
