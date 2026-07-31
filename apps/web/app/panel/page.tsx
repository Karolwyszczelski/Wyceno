import { Button, EmptyState, LinkButton } from "@wyceno/ui";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";
import { signOut } from "../logowanie/actions";

export const metadata: Metadata = {
  title: "Organizacje",
};

export const dynamic = "force-dynamic";

export default async function PanelPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logowanie");
  }

  const { data: memberships, error } = await supabase
    .from("organization_members")
    .select("organization_id, role, status")
    .eq("user_id", user.id)
    .eq("status", "active");

  if (error) {
    throw new Error("Nie udało się pobrać organizacji.");
  }

  const organizationIds = memberships.map((membership) => membership.organization_id);
  const { data: organizations, error: organizationsError } =
    organizationIds.length > 0
      ? await supabase
          .from("organizations")
          .select("id, name, slug")
          .in("id", organizationIds)
          .is("deleted_at", null)
      : { data: [], error: null };

  if (organizationsError) {
    throw new Error("Nie udało się pobrać danych organizacji.");
  }

  if (organizations.length === 1) {
    const onlyOrganization = organizations[0];
    const membership = memberships.find((item) => item.organization_id === onlyOrganization?.id);
    if (
      onlyOrganization &&
      membership &&
      (membership.role === "owner" || membership.role === "admin")
    ) {
      const { data: firstFlow, error: firstFlowError } = await supabase
        .from("flows")
        .select("id")
        .eq("organization_id", onlyOrganization.id)
        .limit(1)
        .maybeSingle();
      if (firstFlowError) {
        throw new Error("Nie udało się sprawdzić postępu organizacji.");
      }
      if (!firstFlow) redirect(`/panel/${onlyOrganization.id}/start`);
    }
  }

  return (
    <main className="organization-picker">
      <header className="organization-picker__header">
        <Link aria-label="Lorum — strona główna" href="/">
          <Image alt="" height={34} src="/Logoicon.svg" width={34} />
          <strong>Lorum</strong>
        </Link>
        <form action={signOut}>
          <Button size="small" type="submit" variant="secondary">
            Wyloguj się
          </Button>
        </form>
      </header>
      <div className="organization-picker__content">
        <div className="panel-section-heading">
          <div>
            <p className="panel-topbar__eyebrow">Obszar roboczy</p>
            <h1>Wybierz organizację</h1>
            <p>Każda organizacja ma oddzielne dane, role i konfigurację.</p>
          </div>
        </div>
        {organizations.length === 0 ? (
          <div className="panel-card">
            <EmptyState
              description="Administrator musi dodać Cię do aktywnej organizacji."
              title="Brak dostępnych organizacji"
            />
          </div>
        ) : (
          <ul className="organization-list">
            {organizations.map((organization) => (
              <li className="panel-card" key={organization.id}>
                <div className="organization-list__identity">
                  <span aria-hidden="true">{initials(organization.name)}</span>
                  <div>
                    <strong>{organization.name}</strong>
                    <small>/{organization.slug}</small>
                  </div>
                </div>
                <div className="organization-actions">
                  <LinkButton href={`/panel/${organization.id}`} size="small">
                    Otwórz panel
                  </LinkButton>
                  {memberships.find(
                    (membership) =>
                      membership.organization_id === organization.id &&
                      (membership.role === "owner" || membership.role === "admin"),
                  ) ? (
                    <LinkButton
                      href={`/panel/${organization.id}/procesy`}
                      size="small"
                      variant="secondary"
                    >
                      Procesy
                    </LinkButton>
                  ) : (
                    <LinkButton
                      href={`/panel/${organization.id}/leady`}
                      size="small"
                      variant="secondary"
                    >
                      Leady
                    </LinkButton>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function initials(value: string): string {
  return (
    value
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toLocaleUpperCase("pl-PL") ?? "")
      .join("") || "OR"
  );
}
