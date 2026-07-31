"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const defaultNavigation = [
  { href: "/produkt", label: "Produkt" },
  { href: "/jak-dziala", label: "Jak działa" },
  { href: "/branze", label: "Zastosowania" },
] as const;

const homeNavigation = [
  { href: "#jak-dziala", label: "Jak działa" },
  { href: "#demo-procesu", label: "Demo" },
  { href: "#przykladowy-lead", label: "Przykładowy lead" },
  { href: "#pilotaz", label: "Pilotaż" },
] as const;

export function MarketingHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === "/";
  const navigation = isHome ? homeNavigation : defaultNavigation;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const focusable = () =>
      Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    document.body.style.overflow = "hidden";
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const items = focusable();
      const first = items[0];
      const last = items.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className={`marketing-header${isHome ? " marketing-header--home" : ""}`}>
      <div className="marketing-container marketing-header__inner">
        <Brand withMark={isHome} />
        <nav aria-label="Główna nawigacja" className="marketing-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="marketing-header__actions">
          {isHome ? null : (
            <Link className="marketing-header__login" href="/logowanie" prefetch={false}>
              Zaloguj się
            </Link>
          )}
          <Link className="marketing-header__cta" href={isHome ? "#demo-procesu" : "/jak-dziala"}>
            {isHome ? "Zobacz demo" : "Zobacz proces"}
            {isHome ? <span aria-hidden="true">→</span> : null}
          </Link>
        </div>
        <button
          ref={toggleRef}
          aria-controls="marketing-mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="marketing-menu-button"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      {open ? (
        <div
          ref={menuRef}
          aria-label="Menu mobilne"
          className="marketing-mobile-menu"
          id="marketing-mobile-menu"
          role="dialog"
        >
          <nav aria-label="Główna nawigacja mobilna">
            {navigation.map((item, index) => (
              <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
                <span aria-hidden="true">0{index + 1}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="marketing-mobile-menu__actions">
            {isHome ? (
              <Link href="/cennik" onClick={() => setOpen(false)}>
                Sprawdź pilotaż
              </Link>
            ) : (
              <Link href="/logowanie" onClick={() => setOpen(false)} prefetch={false}>
                Zaloguj się
              </Link>
            )}
            <Link
              className="marketing-button"
              href={isHome ? "#demo-procesu" : "/jak-dziala"}
              onClick={() => setOpen(false)}
            >
              {isHome ? "Zobacz demo" : "Zobacz działający proces"}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function Brand({ withMark = false }: { withMark?: boolean }) {
  return (
    <Link aria-label="Lorum — strona główna" className="marketing-brand" href="/">
      {withMark ? (
        <span aria-hidden="true" className="marketing-brand__mark">
          <Image alt="" height={22} src="/Logoicon.svg" unoptimized width={22} />
        </span>
      ) : null}
      <span className="marketing-brand__name">Lorum</span>
    </Link>
  );
}
