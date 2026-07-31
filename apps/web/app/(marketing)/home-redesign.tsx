import Image from "next/image";
import Link from "next/link";

import { HomeInteractiveDemo } from "./home-interactive-demo";
import styles from "./home-redesign.module.css";

type HeroSignalIcon = "budget" | "files" | "location" | "next" | "scope" | "term";

const heroSignals = [
  ["scope", "Zakres projektu", "Konkretny opis potrzeb"],
  ["budget", "Budżet", "Przedział lub orientacja"],
  ["term", "Termin", "Planowany czas realizacji"],
  ["location", "Lokalizacja", "Miejsce inwestycji"],
  ["files", "Materiały", "Zdjęcia i dokumenty"],
  ["next", "Następny krok", "Jasno określone działanie"],
] as const satisfies ReadonlyArray<readonly [HeroSignalIcon, string, string]>;

const industries = [
  ["01", "Meble na wymiar", "Zakres, układ, wymiary i budżet", "/branze/meble-na-wymiar"],
  ["02", "Ogrodzenia i bramy", "Długość, wariant, montaż i termin", "/branze/ogrodzenia"],
  ["03", "Strony internetowe", "Cel, funkcje, materiały i deadline", "/branze/strony-internetowe"],
  ["04", "Klimatyzacja", "Metraż, strefy, urządzenia i montaż", "/branze/klimatyzacja"],
  ["05", "Remonty", "Pomieszczenia, standard i harmonogram", "/branze/remonty"],
] as const;

const publicationModes = [
  ["Inline", "w treści strony"],
  ["Popup", "po wybranym działaniu"],
  ["Pełny ekran", "bez rozproszeń"],
  ["Link", "pod własnym adresem"],
] as const;

export function HomeRedesign() {
  return (
    <div className={styles.root} id="lorum-home">
      <section className={styles.hero} data-home-section="hero">
        <div className={`marketing-container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow} data-intro="up" data-reveal-delay="1">
              Prowadzony proces zapytania
            </p>
            <h1 data-intro="up" data-reveal-delay="2">
              Zamiast pytania „ile kosztuje?” <span>dostajesz kontekst do decyzji.</span>
            </h1>
            <p className={styles.heroDescription} data-intro="up" data-reveal-delay="3">
              Klient przechodzi krótki proces. Lorum porządkuje zakres, budżet, termin i materiały,
              a Twojej firmie przekazuje kompletny lead z następnym krokiem.
            </p>
            <div className={styles.heroActions} data-intro="up" data-reveal-delay="4">
              <Link className={styles.primaryAction} href="#demo-procesu">
                Przejdź przykładowy proces
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className={styles.secondaryAction} href="#pilotaz">
                Zobacz zakres pilotażu
              </Link>
            </div>
            <dl className={styles.heroFacts} data-intro="up" data-reveal-delay="5">
              <div>
                <dt>Proces klienta</dt>
                <dd>około 3 minut</dd>
              </div>
              <div>
                <dt>Wynik</dt>
                <dd>potwierdzany po stronie serwera</dd>
              </div>
              <div>
                <dt>Demo</dt>
                <dd>bez zapisu danych</dd>
              </div>
            </dl>
          </div>

          <HeroProductRender />
        </div>

        <div className={`marketing-container ${styles.heroSignalRail}`}>
          <ul aria-label="Informacje porządkowane przez proces Lorum">
            {heroSignals.map(([icon, title, description]) => (
              <li key={title}>
                <span className={styles.heroSignalIcon}>
                  <HeroSignalGlyph kind={icon} />
                </span>
                <span>
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="flow-story-title"
        className={styles.flowSection}
        data-home-section="guided-flow"
        id="jak-dziala"
      >
        <div className={`marketing-container ${styles.sectionInner}`}>
          <header className={styles.editorialHeading}>
            <p className={styles.eyebrow}>Jeden ciąg informacji</p>
            <h2 data-reveal="up" id="flow-story-title">
              Od krótkiego pytania do decyzji bez rundy doprecyzowań.
            </h2>
            <p>
              Każda odpowiedź ma swoje miejsce. Firma nie dostaje kolejnego formularza kontaktowego,
              tylko materiał potrzebny do oceny projektu.
            </p>
          </header>

          <div
            aria-label="Przebieg od krótkiego zapytania do kompletnego leada"
            className={styles.flowCanvas}
            data-home-proof="flow-storyboard"
          >
            <article className={styles.flowInquiry}>
              <header>
                <span>Zapytanie ze strony</span>
                <time dateTime="2026-07-29T09:31:00+02:00">09:31</time>
              </header>
              <blockquote>
                Dzień dobry, ile kosztuje kuchnia na wymiar? Proszę o kontakt.
              </blockquote>
              <p>Brakuje zakresu, budżetu, terminu, lokalizacji i materiałów.</p>
            </article>

            <div aria-label="Informacje zbierane przez proces" className={styles.flowRail}>
              <span>Proces Lorum</span>
              <ol>
                <li>
                  <strong>01</strong>
                  <span>Zakres</span>
                </li>
                <li>
                  <strong>02</strong>
                  <span>Budżet</span>
                </li>
                <li>
                  <strong>03</strong>
                  <span>Termin</span>
                </li>
                <li>
                  <strong>04</strong>
                  <span>Materiały</span>
                </li>
              </ol>
            </div>

            <article className={styles.flowLead}>
              <header>
                <span>
                  <i aria-hidden="true">AK</i>
                  <span>
                    <strong>Anna Kowalska</strong>
                    <small>Kuchnia na wymiar</small>
                  </span>
                </span>
                <strong>
                  85<small>/100</small>
                </strong>
              </header>
              <dl>
                <div>
                  <dt>Zakres</dt>
                  <dd>Kuchnia L · około 8 mb</dd>
                </div>
                <div>
                  <dt>Budżet</dt>
                  <dd>25 000–35 000 zł</dd>
                </div>
                <div>
                  <dt>Termin</dt>
                  <dd>Do 3 miesięcy</dd>
                </div>
                <div>
                  <dt>Materiały</dt>
                  <dd>3 zdjęcia pomieszczenia</dd>
                </div>
              </dl>
              <p>
                <span>Następny krok</span>
                <strong>Kontakt telefoniczny do 24 h</strong>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="demo-title"
        className={styles.demoSection}
        data-home-section="client-demo"
        id="demo-procesu"
      >
        <div className={`marketing-container ${styles.sectionInner}`}>
          <header className={styles.demoHeading}>
            <div>
              <p className={styles.eyebrow}>Interaktywne demo</p>
              <h2 id="demo-title">Zobacz produkt w działaniu, nie na dekoracyjnym mockupie.</h2>
            </div>
            <p>
              Odpowiedz na kilka pytań jak klient i obserwuj, jak po prawej powstaje brief dla
              firmy. Dane nie są zapisywane ani wysyłane.
            </p>
          </header>
          <div data-home-proof="interactive-client-process">
            <HomeInteractiveDemo />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="decision-title"
        className={styles.decisionSection}
        data-home-section="decision-document"
        id="przykladowy-lead"
      >
        <div className={`marketing-container ${styles.decisionGrid}`}>
          <div className={styles.decisionCopy}>
            <p className={styles.eyebrow}>Wynik i kwalifikacja</p>
            <h2 id="decision-title">Firma widzi, dlaczego ten lead wymaga działania.</h2>
            <p>
              Wynik nie jest tajemniczą liczbą. Obok ceny i score pozostają dane wejściowe,
              uruchomione reguły oraz konkretny następny krok.
            </p>
            <ul>
              <li>Serwer ponownie potwierdza wynik.</li>
              <li>Handlowiec widzi pełny kontekst.</li>
              <li>Klient dostaje jasną informację, co wydarzy się dalej.</li>
            </ul>
          </div>

          <DecisionDocument />
        </div>
      </section>

      <section
        aria-labelledby="deployment-title"
        className={styles.deploymentSection}
        data-home-section="industry-and-publishing"
        id="dla-kogo"
      >
        <div className={`marketing-container ${styles.sectionInner}`}>
          <header className={styles.deploymentHeading}>
            <div>
              <p className={styles.eyebrow}>Dopasowanie i publikacja</p>
              <h2 id="deployment-title">
                Język branży w środku. Jedna wersja procesu na zewnątrz.
              </h2>
            </div>
            <p>
              Zaczynasz od realnego schematu pytań, a później dopasowujesz go do własnych kryteriów.
              Opublikowana wersja zasila każdy sposób osadzenia.
            </p>
          </header>

          <div className={styles.deploymentGrid}>
            <nav aria-label="Procesy branżowe" className={styles.industryList}>
              {industries.map(([number, title, description, href], index) => (
                <Link className={index === 0 ? styles.industryActive : ""} href={href} key={href}>
                  <span>{number}</span>
                  <span>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>

            <div className={styles.publicationProof} data-home-proof="publication-system">
              <header>
                <span>
                  <i aria-hidden="true" />
                  Kuchnia na wymiar
                </span>
                <strong>Wersja 3 · opublikowana</strong>
              </header>
              <div className={styles.publicationCanvas}>
                <article>
                  <span>Proces źródłowy</span>
                  <strong>6 kroków</strong>
                  <small>pytania, warunki, wynik i kontakt</small>
                </article>
                <span aria-hidden="true" className={styles.publicationLine}>
                  <i />
                </span>
                <ul>
                  {publicationModes.map(([title, description]) => (
                    <li key={title}>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                Zmiana robocza nie wpływa na trwające sesje. Nowy ruch otrzymuje dopiero
                opublikowaną wersję.
              </p>
            </div>
          </div>

          <aside className={styles.agencyNote} id="dla-agencji">
            <span>Model dla agencji</span>
            <p>
              Agencja przygotowuje warsztat, konfigurację i osadzenie. Firma zatwierdza proces,
              zachowuje kontrolę nad leadami i odpowiada za ich obsługę.
            </p>
            <Link href="/dla-agencji">
              Zobacz zasady współpracy
              <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="pilot-title"
        className={styles.pilotSection}
        data-home-section="pilot"
        id="pilotaz"
      >
        <div className={`marketing-container ${styles.pilotGrid}`}>
          <div>
            <p className={styles.eyebrow}>Program pilotażowy</p>
            <h2 id="pilot-title">
              Najpierw jeden proces. Potem decyzja, czy warto rozwijać całość.
            </h2>
          </div>
          <div className={styles.pilotAction}>
            <p>
              Wspólnie porządkujemy jeden rzeczywisty typ zapytania, uruchamiamy go na stronie i
              sprawdzamy jakość otrzymanych briefów.
            </p>
            <div>
              <Link className={styles.lightAction} href="/cennik">
                Sprawdź zakres pilotażu
                <span aria-hidden="true">↗</span>
              </Link>
              <Link className={styles.darkTextLink} href="/branze/meble-na-wymiar">
                Najpierw zobacz proces
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroProductRender() {
  return (
    <figure
      aria-label="Telefon z procesem Lorum i elementami wyniku wychodzącymi z ekranu"
      className={styles.productScene}
      data-home-proof="rendered-product-scene"
      data-intro="right"
      data-reveal-delay="3"
    >
      <figcaption className="wy-sr-only">
        Fizyczny telefon pokazuje rzeczywisty proces klienta Lorum. Na desktopie z ekranu wychodzą
        wybrana odpowiedź, wynik kwalifikacji i podsumowanie leada. Na urządzeniach mobilnych
        widoczny jest wyłącznie telefon, celowo ucięty prawą krawędzią.
      </figcaption>
      <Image
        alt=""
        className={styles.heroRenderDesktop}
        data-home-asset="desktop"
        fill
        priority
        sizes="(min-width: 1025px) 54vw, 47rem"
        src="/images/redesign/lorum-hero-phone-desktop-transparent-v4.webp"
      />
      <Image
        alt=""
        className={styles.heroRenderMobile}
        data-home-asset="mobile"
        fill
        sizes="(max-width: 640px) 100vw, 1px"
        src="/images/redesign/lorum-hero-phone-mobile-transparent-v4.webp"
      />
    </figure>
  );
}

function HeroSignalGlyph({ kind }: { kind: HeroSignalIcon }) {
  if (kind === "scope") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M7 3.75h7l3 3v13.5H7z" />
        <path d="M14 3.75v3h3M9.5 11h5M9.5 14.5h5" />
      </svg>
    );
  }

  if (kind === "budget") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M4.5 7.25h14.25v11H4.5z" />
        <path d="M6.5 7.25V5.5h10v1.75M15.25 11h3.5v3.5h-3.5a1.75 1.75 0 0 1 0-3.5Z" />
      </svg>
    );
  }

  if (kind === "term") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M5 6.25h14v13H5zM5 9.5h14M8 4v4M16 4v4" />
        <path d="M9 13h2v2H9z" />
      </svg>
    );
  }

  if (kind === "location") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M18 10c0 4.5-6 10-6 10s-6-5.5-6-10a6 6 0 1 1 12 0Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  if (kind === "files") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="m9.25 12.75 4.9-4.9a2.12 2.12 0 1 1 3 3l-6.35 6.36a3.5 3.5 0 0 1-4.95-4.95l6.36-6.36" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h13M13.5 7.5 18 12l-4.5 4.5" />
    </svg>
  );
}

function DecisionDocument() {
  return (
    <article
      aria-label="Dane demonstracyjne: kompletny lead z wynikiem i następnym krokiem"
      className={styles.decisionDocument}
      data-home-proof="decision-document"
    >
      <header>
        <div>
          <span>AK</span>
          <span>
            <strong>Anna Kowalska</strong>
            <small>Kuchnia na wymiar · L-2026-0152</small>
          </span>
        </div>
        <div>
          <strong>
            85<small>/100</small>
          </strong>
          <span>Dobre dopasowanie</span>
        </div>
      </header>
      <div className={styles.documentBody}>
        <dl>
          <div>
            <dt>Zakres</dt>
            <dd>Kuchnia w kształcie L, około 8 mb zabudowy</dd>
          </div>
          <div>
            <dt>Budżet</dt>
            <dd>25 000–35 000 zł</dd>
          </div>
          <div>
            <dt>Termin</dt>
            <dd>Do 3 miesięcy</dd>
          </div>
          <div>
            <dt>Lokalizacja</dt>
            <dd>Ciechanów</dd>
          </div>
          <div>
            <dt>Materiały</dt>
            <dd>3 zdjęcia pomieszczenia</dd>
          </div>
        </dl>
        <aside>
          <span>Uruchomione reguły</span>
          <ul>
            <li>Budżet w oczekiwanym przedziale</li>
            <li>Realny termin realizacji</li>
            <li>Komplet kluczowych informacji</li>
          </ul>
          <div>
            <span>Następny krok</span>
            <strong>Kontakt telefoniczny do 24 h</strong>
          </div>
        </aside>
      </div>
      <footer>
        <span>Wynik demonstracyjny · niewiążący</span>
        <Link href="/jak-dziala">
          Zobacz zasady wyniku
          <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}
