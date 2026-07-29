import { marketingMetadata } from "../../../lib/marketing/metadata";
import { Breadcrumbs, CtaBand } from "../components";

export const metadata = marketingMetadata(
  "Formularze wyceny dla agencji WordPress i web",
  "Projektuj prowadzone formularze dla firm usługowych, publikuj wersje i przekazuj klientom uporządkowane leady bez logiki kopiowanej między stronami.",
  "/dla-agencji",
);

export default function AgencyPage() {
  return (
    <>
      <div className="marketing-container marketing-page-hero">
        <Breadcrumbs items={[{ href: "/", label: "Start" }, { label: "Dla agencji" }]} />
        <div className="marketing-page-hero__grid">
          <div className="marketing-page-hero__copy">
            <p className="wy-kicker marketing-eyebrow">Dla agencji</p>
            <h1>Dodaj do wdrożenia proces sprzedażowy, nie kolejny zwykły formularz.</h1>
            <p>
              Ustal pytania razem z klientem, opublikuj kontrolowaną wersję i osadź widget bez
              przenoszenia danych leadów do WordPressa.
            </p>
          </div>
          <aside className="marketing-page-hero__aside">
            <strong>Granica MVP</strong>
            <span>
              Rozbudowana delegacja agencji między tenantami pozostaje do osobnej decyzji. Dostęp
              nie jest nadawany automatycznie.
            </span>
          </aside>
        </div>
      </div>

      <section className="marketing-section marketing-section--surface">
        <div className="marketing-container">
          <div className="marketing-section__heading">
            <p className="wy-kicker marketing-eyebrow">Model wdrożenia</p>
            <h2>Powtarzalna metoda, treść dopasowana do klienta.</h2>
          </div>
          <ol className="agency-flow">
            {[
              [
                "Warsztat",
                "Rozpisz informacje potrzebne do następnego kroku sprzedaży i usuń pytania bez właściciela.",
              ],
              [
                "Konfiguracja",
                "Dopasuj szablon, warunki, przedział, score oraz wersjonowane treści potwierdzeń.",
              ],
              [
                "Osadzenie",
                "Wybierz widget lub hosted link i sprawdź mobile, klawiaturę oraz zachowanie z CSS klienta.",
              ],
              [
                "Przekazanie",
                "Firma obsługuje leady we własnym tenantowym panelu, a zmiany procesu tworzą nową wersję.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container agency-guardrails">
          <article>
            <p className="wy-kicker marketing-eyebrow">Dla klienta agencji</p>
            <h2>Leady pozostają w organizacji firmy.</h2>
            <p>
              Role Owner, Admin i Sales kontrolują dostęp. Agencja nie otrzymuje szerszych uprawnień
              tylko dlatego, że wdraża stronę.
            </p>
          </article>
          <article>
            <p className="wy-kicker marketing-eyebrow">Dla zespołu wdrożeniowego</p>
            <h2>Widget nie dziedziczy stylów motywu.</h2>
            <p>
              Shadow DOM, mały loader i testy agresywnego CSS ograniczają konflikty. Konektor
              WordPress jest ukończony lokalnie; publiczna dystrybucja czeka na bramkę produkcyjną.
            </p>
          </article>
        </div>
      </section>

      <CtaBand
        description="Porównaj trzy priorytetowe branże i zobacz, jak zmienia się zestaw pytań przy wspólnej architekturze."
        title="Zbuduj usługę wdrożeniową wokół jakości briefu."
      />
    </>
  );
}
