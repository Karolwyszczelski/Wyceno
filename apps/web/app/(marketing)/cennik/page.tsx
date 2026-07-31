import Link from "next/link";

import { marketingMetadata } from "../../../lib/marketing/metadata";
import { Breadcrumbs, CtaBand } from "../components";

export const metadata = marketingMetadata(
  "Cennik — program pilotażowy Lorum",
  "Model self-service nie został jeszcze zatwierdzony. Program pilotażowy Lorum jest wyceniany indywidualnie po ustaleniu zakresu wdrożenia.",
  "/cennik",
);

export default function PricingPage() {
  return (
    <>
      <div className="marketing-container marketing-page-hero">
        <Breadcrumbs items={[{ href: "/", label: "Start" }, { label: "Cennik" }]} />
        <div className="marketing-page-hero__grid">
          <div className="marketing-page-hero__copy">
            <p className="wy-kicker marketing-eyebrow">Cennik bez zgadywania</p>
            <h1>Najpierw pilotaż. Model self-service po walidacji.</h1>
            <p>
              Nie publikujemy sztucznych pakietów ani przekreślonych cen. Zakres pilotażu zależy od
              procesu, branży i sposobu osadzenia.
            </p>
          </div>
          <aside className="marketing-page-hero__aside">
            <strong>Status modelu</strong>
            <span>Kwoty subskrypcji, limity planów i rozliczenia nie są zatwierdzone.</span>
          </aside>
        </div>
      </div>

      <section className="marketing-section marketing-section--surface">
        <div className="marketing-container pricing-sheet">
          <article className="marketing-price-card">
            <p className="wy-kicker marketing-eyebrow">Program pilotażowy</p>
            <h2>Wdrożenie z ustalonym zakresem</h2>
            <div className="marketing-price-card__value">Wycena indywidualna</div>
            <ul className="marketing-list">
              <li>Warsztat procesu i dopasowanie jednego flow</li>
              <li>Konfiguracja pytań, wyniku i kwalifikacji</li>
              <li>Osadzenie lub hosted link</li>
              <li>Weryfikacja jakości leadów w pilotażu</li>
            </ul>
          </article>
          <article className="marketing-price-card">
            <p className="wy-kicker marketing-eyebrow">Self-service</p>
            <h2>Model w trakcie walidacji</h2>
            <div className="marketing-price-card__value">Jeszcze nieustalony</div>
            <ul className="marketing-list">
              <li>Brak zatwierdzonych kwot miesięcznych</li>
              <li>Brak zatwierdzonych limitów leadów i procesów</li>
              <li>Brak płatności w zakresie obecnego MVP</li>
              <li>Decyzja po rozmowach z firmami pilotażowymi</li>
            </ul>
          </article>
          <div className="pricing-sheet__footer">
            <p className="marketing-price-card__note">
              Ta strona opisuje aktualny model współpracy, a nie ofertę handlową. Publiczny cennik
              kwotowy powstanie dopiero po zatwierdzeniu modelu przez właściciela produktu.
            </p>
            <div className="marketing-actions">
              <Link className="marketing-button" href="/jak-dziala">
                Oceń zakres procesu
              </Link>
              <Link className="marketing-button marketing-button--secondary" href="/produkt">
                Poznaj produkt
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        description="Przejdź przez architekturę procesu i wybierz branżę. To pozwala ocenić zakres bez udawania gotowego pakietu."
        title="Zakres przed ceną — tak samo jak w dobrym formularzu."
      />
    </>
  );
}
