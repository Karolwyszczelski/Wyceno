import Link from "next/link";

import { industries } from "../../../lib/marketing/content";
import { marketingMetadata } from "../../../lib/marketing/metadata";
import { ArrowIcon, Breadcrumbs, CtaBand } from "../components";

export const metadata = marketingMetadata(
  "Formularze wyceny dla pięciu branż usługowych",
  "Zobacz przykładowe pytania i briefy dla mebli na wymiar, ogrodzeń, stron internetowych, klimatyzacji oraz remontów.",
  "/branze",
);

export default function IndustriesPage() {
  return (
    <>
      <div className="marketing-container marketing-page-hero">
        <Breadcrumbs items={[{ href: "/", label: "Start" }, { label: "Branże" }]} />
        <div className="marketing-page-hero__grid">
          <div className="marketing-page-hero__copy">
            <p className="wy-kicker marketing-eyebrow">Branże</p>
            <h1>Wspólny mechanizm, pytania wynikające z usługi.</h1>
            <p>
              Każda strona pokazuje specyficzny problem, zestaw pytań, syntetyczny przykład briefu i
              granice orientacyjnego wyniku.
            </p>
          </div>
          <aside className="marketing-page-hero__aside">
            <strong>Treści demonstracyjne</strong>
            <span>
              Szablony wymagają walidacji w rozmowach z firmami przed publicznym uznaniem ich za
              rekomendowany standard.
            </span>
          </aside>
        </div>
      </div>
      <section className="marketing-section marketing-section--surface">
        <div className="marketing-container editorial-index">
          {industries.map((industry, index) => (
            <Link href={`/branze/${industry.slug}`} key={industry.slug}>
              <span>0{index + 1}</span>
              <div>
                <p className="wy-kicker marketing-eyebrow">{industry.eyebrow}</p>
                <h2>{industry.title}</h2>
              </div>
              <p>{industry.description}</p>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>
      <CtaBand
        description="Nie znalazłeś swojej branży? Najpierw sprawdź model pytań i granice produktu — nie tworzymy automatycznie setek cienkich stron."
        title="Pięć dopracowanych zastosowań zamiast katalogu bez treści."
      />
    </>
  );
}
