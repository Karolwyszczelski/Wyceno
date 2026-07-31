export type NotificationKind = "lead_company_alert" | "lead_customer_confirmation";

export type NotificationTemplateInput = Readonly<{
  appUrl: string;
  companyName: string;
  contactEmail: string;
  contactName: string | null;
  flowTitle: string;
  kind: NotificationKind;
  leadId: string;
  organizationId: string;
  price: string | null;
  score: number | null;
}>;

export type RenderedEmail = Readonly<{
  html: string;
  subject: string;
  templateVersion: "lead-company-v1" | "lead-customer-v1";
  text: string;
}>;

const bodyStyle =
  "margin:0;background:#f4f7f5;color:#17352c;font-family:Arial,sans-serif;line-height:1.6";
const mainStyle =
  "max-width:640px;margin:0 auto;padding:32px 24px;background:#ffffff;border-top:4px solid #16634a";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeHeader(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .trim()
    .slice(0, 160);
}

function safeLine(value: string): string {
  return value.replace(/[\r\n\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g, " ").trim();
}

function document(subject: string, content: string): string {
  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="${bodyStyle}">
  <main style="${mainStyle}">
    ${content}
    <p style="margin-top:32px;color:#52675f;font-size:14px">Wiadomość transakcyjna wygenerowana przez Lorum.</p>
  </main>
</body>
</html>`;
}

function customerTemplate(input: NotificationTemplateInput): RenderedEmail {
  const company = safeLine(input.companyName);
  const flow = safeLine(input.flowTitle);
  const greeting = input.contactName
    ? `Dzień dobry, ${safeLine(input.contactName)}!`
    : "Dzień dobry!";
  const priceText = input.price
    ? `Orientacyjny wynik zapisany przy zapytaniu: ${safeLine(input.price)}.`
    : "Firma otrzymała zakres zapytania i dane kontaktowe.";
  const subject = safeHeader(`Potwierdzenie zapytania — ${company}`);
  return {
    html: document(
      subject,
      `<h1 style="margin:0 0 16px;font-size:28px">${escapeHtml(greeting)}</h1>
    <p>Twoje zapytanie dotyczące procesu „${escapeHtml(flow)}” zostało przekazane do firmy ${escapeHtml(company)}.</p>
    <p>${escapeHtml(priceText)}</p>
    <p>Wynik ma charakter orientacyjny i nie stanowi oferty. Firma może skontaktować się, aby potwierdzić zakres i warunki.</p>`,
    ),
    subject,
    templateVersion: "lead-customer-v1",
    text: `${greeting}

Twoje zapytanie dotyczące procesu „${flow}” zostało przekazane do firmy ${company}.

${priceText}

Wynik ma charakter orientacyjny i nie stanowi oferty. Firma może skontaktować się, aby potwierdzić zakres i warunki.

Wiadomość transakcyjna wygenerowana przez Lorum.`,
  };
}

function companyTemplate(input: NotificationTemplateInput): RenderedEmail {
  const company = safeLine(input.companyName);
  const flow = safeLine(input.flowTitle);
  const contactEmail = safeLine(input.contactEmail);
  const contactName = input.contactName ? safeLine(input.contactName) : "Nie podano";
  const appUrl = new URL(input.appUrl);
  appUrl.pathname = `/panel/${encodeURIComponent(input.organizationId)}/leady/${encodeURIComponent(input.leadId)}`;
  appUrl.search = "";
  appUrl.hash = "";
  const detailsUrl = appUrl.toString();
  const subject = safeHeader(`Nowy lead — ${flow}`);
  const scoreLine = input.score === null ? "Nie obliczono" : `${input.score}/100`;
  const priceLine = input.price ? safeLine(input.price) : "Nie obliczono";
  return {
    html: document(
      subject,
      `<h1 style="margin:0 0 16px;font-size:28px">Nowy lead dla ${escapeHtml(company)}</h1>
    <p>Klient ukończył proces „${escapeHtml(flow)}”.</p>
    <dl>
      <dt style="font-weight:bold">Imię</dt><dd style="margin:0 0 12px">${escapeHtml(contactName)}</dd>
      <dt style="font-weight:bold">E-mail</dt><dd style="margin:0 0 12px">${escapeHtml(contactEmail)}</dd>
      <dt style="font-weight:bold">Orientacyjny wynik</dt><dd style="margin:0 0 12px">${escapeHtml(priceLine)}</dd>
      <dt style="font-weight:bold">Score</dt><dd style="margin:0 0 12px">${escapeHtml(scoreLine)}</dd>
    </dl>
    <p><a href="${escapeHtml(detailsUrl)}" style="color:#0d5c43;font-weight:bold">Otwórz szczegóły leada w panelu</a></p>`,
    ),
    subject,
    templateVersion: "lead-company-v1",
    text: `Nowy lead dla ${company}

Klient ukończył proces „${flow}”.

Imię: ${contactName}
E-mail: ${contactEmail}
Orientacyjny wynik: ${priceLine}
Score: ${scoreLine}

Otwórz szczegóły leada w panelu:
${detailsUrl}

Wiadomość transakcyjna wygenerowana przez Lorum.`,
  };
}

export function renderNotificationEmail(input: NotificationTemplateInput): RenderedEmail {
  return input.kind === "lead_company_alert" ? companyTemplate(input) : customerTemplate(input);
}
