import { describe, expect, it } from "vitest";

import { renderNotificationEmail } from "./templates";

const baseInput = {
  appUrl: "https://app.wyceno.test",
  companyName: "Studio <Mebli>",
  contactEmail: "klient@example.test",
  contactName: "Jan & Anna",
  flowTitle: "Kuchnia <script>alert(1)</script>",
  leadId: "e0000000-0000-4000-8000-000000000001",
  organizationId: "a0000000-0000-4000-8000-000000000001",
  price: "10 000–15 000 zł",
  score: 80,
} as const;

describe("notification templates", () => {
  it.each(["lead_customer_confirmation", "lead_company_alert"] as const)(
    "renders accessible HTML and a useful text alternative for %s",
    (kind) => {
      const message = renderNotificationEmail({ ...baseInput, kind });

      expect(message.html).toContain('<html lang="pl">');
      expect(message.html).toContain("<title>");
      expect(message.html).toContain("<main");
      expect(message.html).toContain("<h1");
      expect(message.html).not.toContain("<script>");
      expect(message.html).toContain("&lt;script&gt;");
      expect(message.text.length).toBeGreaterThan(100);
      expect(message.subject).not.toMatch(/[\r\n]/);
    },
  );

  it("does not expose score or panel link in the customer confirmation", () => {
    const message = renderNotificationEmail({
      ...baseInput,
      kind: "lead_customer_confirmation",
    });

    expect(message.text).not.toContain("80/100");
    expect(message.text).not.toContain("/panel/");
    expect(message.text).not.toContain(baseInput.contactEmail);
  });
});
