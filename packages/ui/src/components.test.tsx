import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Button, FormField, Input, Tabs } from "./components";

describe("Button", () => {
  it("blokuje działanie i komunikuje ładowanie", async () => {
    const user = userEvent.setup();
    let calls = 0;
    render(
      <Button loading onClick={() => (calls += 1)}>
        Zapisz
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Proszę czekać…" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    await user.click(button);
    expect(calls).toBe(0);
  });
});

describe("FormField", () => {
  it("łączy etykietę, instrukcję i błąd z kontrolką", () => {
    render(
      <FormField
        error="Podaj poprawny adres."
        hint="Na ten adres wyślemy potwierdzenie."
        label="E-mail"
      >
        <Input type="email" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "E-mail" });
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input.getAttribute("aria-describedby")?.split(" ")).toHaveLength(2);
    expect(screen.getByText("Podaj poprawny adres.")).toBeVisible();
  });
});

describe("Tabs", () => {
  it("obsługuje strzałki, Home i End zgodnie z wzorcem ARIA", async () => {
    const user = userEvent.setup();
    render(
      <Tabs
        label="Przykładowe dane"
        tabs={[
          { content: "Treść pierwsza", id: "first", label: "Pierwsza" },
          { content: "Treść druga", id: "second", label: "Druga" },
          { content: "Treść trzecia", id: "third", label: "Trzecia" },
        ]}
      />,
    );
    const first = screen.getByRole("tab", { name: "Pierwsza" });
    first.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Druga" })).toHaveFocus();
    expect(screen.getByText("Treść druga")).toBeVisible();
    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Trzecia" })).toHaveFocus();
    await user.keyboard("{Home}");
    expect(first).toHaveFocus();
  });
});
