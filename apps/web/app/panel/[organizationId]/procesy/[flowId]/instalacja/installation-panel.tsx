"use client";

import { Button, LinkButton } from "@wyceno/ui";
import { useMemo, useState } from "react";

type InstallationMode = "fullscreen" | "hosted" | "inline" | "popup";

export function InstallationPanel({
  appOrigin,
  flowName,
  lastWidgetOpenedAt,
  organizationId,
  publicId,
  publishedAt,
  wordpressConnection,
}: Readonly<{
  appOrigin: string;
  flowName: string;
  lastWidgetOpenedAt: string | null;
  organizationId: string;
  publicId: string;
  publishedAt: string;
  wordpressConnection: Readonly<{
    lastSeenAt: string;
    siteOrigin: string;
  }> | null;
}>) {
  const [mode, setMode] = useState<InstallationMode>("inline");
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  const hostedUrl = `${appOrigin}/f/${publicId}`;
  const code = useMemo(
    () => installationCode(appOrigin, publicId, mode),
    [appOrigin, mode, publicId],
  );

  async function copy(value: string, target: "code" | "link") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="installation-layout">
      <div className="installation-main">
        <section className="panel-card publication-banner" aria-labelledby="publication-title">
          <span className="publication-banner__dot" aria-hidden="true" />
          <div>
            <p>Proces opublikowany</p>
            <h2 id="publication-title">{flowName}</h2>
            <small>
              Publiczny od{" "}
              {new Intl.DateTimeFormat("pl-PL", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(publishedAt))}
            </small>
          </div>
          <a href={hostedUrl} rel="noreferrer" target="_blank">
            Otwórz test
          </a>
        </section>

        <section className="panel-card installation-methods" aria-labelledby="method-title">
          <div className="panel-card__header">
            <div>
              <h2 id="method-title">Sposób osadzenia</h2>
              <p>Wybierz sposób uruchamiania procesu na stronie.</p>
            </div>
          </div>
          <div className="installation-mode-grid" role="group" aria-label="Sposób osadzenia">
            {(
              [
                ["inline", "Inline", "Proces w treści strony"],
                ["popup", "Popup", "Otwierany z przycisku"],
                ["fullscreen", "Fullscreen", "Pełny ekran procesu"],
                ["hosted", "Hosted link", "Gotowy adres Lorum"],
              ] satisfies ReadonlyArray<readonly [InstallationMode, string, string]>
            ).map(([value, label, description]) => (
              <button
                aria-pressed={mode === value}
                key={value}
                onClick={() => {
                  setMode(value);
                  setCopied(null);
                }}
                type="button"
              >
                <strong>{label}</strong>
                <small>{description}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="panel-card installation-code" aria-labelledby="installation-code-title">
          <div className="panel-card__header">
            <div>
              <h2 id="installation-code-title">
                {mode === "hosted" ? "Link do procesu" : "Kod instalacyjny"}
              </h2>
              <p>
                {mode === "hosted"
                  ? "Udostępnij bez osadzania skryptu na własnej stronie."
                  : "Wklej przed zamknięciem elementu body na stronie."}
              </p>
            </div>
            <Button
              onClick={() =>
                copy(mode === "hosted" ? hostedUrl : code, mode === "hosted" ? "link" : "code")
              }
              size="small"
              type="button"
              variant="secondary"
            >
              {copied === (mode === "hosted" ? "link" : "code") ? "Skopiowano" : "Kopiuj"}
            </Button>
          </div>
          <pre>
            <code>{mode === "hosted" ? hostedUrl : code}</code>
          </pre>
          <p className="installation-code__note">
            Kod zawiera wyłącznie publiczny identyfikator. Sekrety i logika wyceny pozostają po
            stronie Lorum.
          </p>
        </section>
      </div>

      <aside className="installation-side" aria-label="Status instalacji">
        <section className="panel-card installation-wordpress">
          <div className="installation-side__heading">
            <span aria-hidden="true">W</span>
            <div>
              <h2>WordPress</h2>
              <p>Wtyczka konektorowa</p>
            </div>
            <span
              className={`panel-status panel-status--${
                wordpressConnection ? "qualified" : "neutral"
              }`}
            >
              {wordpressConnection ? "Połączono" : "Niepołączono"}
            </span>
          </div>
          {wordpressConnection ? (
            <dl>
              <div>
                <dt>Witryna</dt>
                <dd>{wordpressConnection.siteOrigin}</dd>
              </div>
              <div>
                <dt>Ostatni heartbeat</dt>
                <dd>
                  {new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(wordpressConnection.lastSeenAt))}
                </dd>
              </div>
            </dl>
          ) : (
            <p>Połącz witrynę, aby użyć shortcode, bloku i triggera popup.</p>
          )}
          <LinkButton
            href={`/panel/${organizationId}/integracje/wordpress`}
            size="small"
            variant="secondary"
          >
            {wordpressConnection ? "Otwórz integrację" : "Połącz WordPress"}
          </LinkButton>
        </section>

        <section className="panel-card installation-diagnostics">
          <h2>Diagnostyka</h2>
          <ul>
            <li>
              <span>Proces opublikowany</span>
              <strong>OK</strong>
            </li>
            <li>
              <span>Hosted link</span>
              <strong>OK</strong>
            </li>
            <li>
              <span>Ostatnie otwarcie</span>
              <strong>
                {lastWidgetOpenedAt
                  ? new Intl.DateTimeFormat("pl-PL", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(lastWidgetOpenedAt))
                  : "Brak"}
              </strong>
            </li>
            <li>
              <span>WordPress</span>
              <strong>{wordpressConnection ? "OK" : "Opcjonalny"}</strong>
            </li>
          </ul>
          <a href={hostedUrl} rel="noreferrer" target="_blank">
            Uruchom test
          </a>
        </section>
      </aside>
    </div>
  );
}

function installationCode(appOrigin: string, publicId: string, mode: InstallationMode): string {
  if (mode === "hosted") return `${appOrigin}/f/${publicId}`;
  const buttonLabel = mode === "popup" ? '\n  button-label="Rozpocznij wycenę"' : "";
  return `<script type="module" src="${appOrigin}/widget/v1/loader.js"></script>
<wyceno-widget
  public-id="${publicId}"
  mode="${mode}"${buttonLabel}
></wyceno-widget>`;
}
