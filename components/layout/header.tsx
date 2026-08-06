"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { Menu, Search, ShoppingBag, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/range", label: "The Range" },
  { href: "/find-your-scent", label: "Find Your Scent" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/businesses", label: "For Businesses" },
];

// Shop dropdown – diffusers first, then oils. No "everything" entry.
const shopMenu = [
  { href: "/range#diffusers", label: "Diffusers" },
  { href: "/range#oils", label: "Oils" },
];

export function Header() {
  const pathname = usePathname();
  // Only the homepage has a full-bleed banner for the header to merge into.
  const overlay = pathname === "/";

  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slideHidden, setSlideHidden] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();
  const lastY = useRef(0);
  // Accumulates scroll distance in the current direction. Lets the reveal work
  // even with smooth-scroll (Lenis) sub-pixel per-frame deltas.
  const accum = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // On the homepage the header stays transparent and merged into the banner for
  // the WHOLE hero. The solid header only exists *below* the hero – and there it
  // hides on scroll-down and slides back on scroll-up. Inner pages are always solid.
  const transparent = overlay && !pastHero && !hovered && !mobileOpen;

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;

      // Has the hero scrolled up behind the header yet? (homepage only)
      let past = !overlay;
      if (overlay) {
        const hero = document.getElementById("hero");
        const headerH = headerRef.current?.offsetHeight ?? 80;
        past = hero
          ? hero.getBoundingClientRect().bottom <= headerH
          : y > window.innerHeight * 0.9;
      }
      setPastHero(past);

      // The header is never pinned: it leaves on scroll-down and slides back on
      // scroll-up. We accumulate small deltas (and reset on direction change) so
      // smooth-scroll's tiny per-frame steps still trigger a reliable reveal.
      const delta = y - lastY.current;
      lastY.current = y;

      if (y <= 8) {
        setHidden(false);
        accum.current = 0;
      } else if (delta !== 0) {
        // Reset the tally whenever the scroll direction flips.
        if (delta > 0 !== accum.current > 0) accum.current = 0;
        accum.current += delta;

        if (accum.current > 10) {
          setHidden(true); // scrolled down ~10px
          accum.current = 0;
        } else if (accum.current < -10) {
          setHidden(false); // scrolled up ~10px
          accum.current = 0;
        }
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);

  // Publish the real header height so the banner can sit exactly behind it.
  useEffect(() => {
    function measure() {
      const h = headerRef.current?.offsetHeight;
      if (h) document.documentElement.style.setProperty("--header-h", `${h}px`);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  // A hero slide can ask the header to step aside (e.g. the water video).
  useEffect(() => {
    const onHide = (e: Event) => setSlideHidden(!!(e as CustomEvent).detail);
    window.addEventListener("quint:hide-header", onHide);
    return () => window.removeEventListener("quint:hide-header", onHide);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "sticky top-0 z-40 will-change-transform",
          transparent
            ? "bg-transparent text-[color:var(--color-white)]"
            : "bg-[color:var(--color-white)]/85 text-[color:var(--color-charcoal)] backdrop-blur-xl",
          (hidden || slideHidden) && !mobileOpen
            ? "-translate-y-full"
            : "translate-y-0"
        )}
        style={{
          // Float over the banner on the homepage (negate our own height).
          marginBottom: overlay ? "calc(var(--header-h) * -1)" : undefined,
          // Reveal (coming back down) eases in slowly; hiding is quicker.
          // Background + text colour cross-fade as the panel appears.
          transition: `transform ${
            hidden ? "400ms" : "550ms"
          } var(--ease-quint), background-color 500ms var(--ease-quint), backdrop-filter 500ms var(--ease-quint), color 500ms var(--ease-quint)`,
        }}
      >
        <div className="mx-auto grid max-w-[var(--container-full)] grid-cols-[1fr_auto_1fr] items-center gap-6 px-6 py-5 md:px-10">
          {/* Left nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {/* Shop – with category dropdown */}
            <div className="group relative">
              <Link
                href="/range"
                className="flex items-center gap-1.5 text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
              >
                The Range
                <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-0 top-full pt-4 opacity-0 transition-all duration-200 ease-[var(--ease-quint)] group-hover:visible group-hover:opacity-100">
                <ul className="min-w-[12rem] border border-[color:var(--color-rule)] bg-[color:var(--color-white)] py-2 text-[color:var(--color-charcoal)] shadow-[0_18px_50px_-20px_rgba(58,53,50,0.28)]">
                  {shopMenu.map((s) => (
                    <li key={s.href}>
                      <Link
                        href={s.href}
                        className="block px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.2em] text-[color:var(--color-charcoal-soft)] transition-colors duration-200 hover:bg-[color:var(--color-stardust-soft)] hover:text-[color:var(--color-clay)]"
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {navLinks.slice(1, 2).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button (left) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center justify-self-start md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Center logo – inline SVG, inherits header color */}
          <Link
            href="/"
            className="justify-self-center"
            aria-label="Quint Home – Home"
          >
            <Logo className="h-9 w-auto md:h-10" />
          </Link>

          {/* Right nav + actions */}
          <div className="flex items-center justify-end gap-7">
            <nav className="hidden items-center gap-7 md:flex">
              {navLinks.slice(2).map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[color:var(--color-clay)]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Search"
              className="hidden transition-colors duration-300 hover:text-[color:var(--color-clay)] md:block"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Bag${count ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
              className="relative flex items-center gap-2 transition-colors duration-300 hover:text-[color:var(--color-clay)]"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="hidden text-[0.78rem] uppercase tracking-[0.18em] opacity-80 md:inline">
                Bag ({count})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[color:var(--color-white)]"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-full flex-col px-8 pt-8 pb-12">
            <div className="flex items-center justify-between">
              <Logo className="h-7 w-auto text-[color:var(--color-charcoal)]" />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[0.78rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal)]"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>
            <nav className="mt-20 flex flex-col gap-6">
              {navLinks.map((l) => (
                <div key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-[color:var(--color-charcoal)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "var(--text-3xl)",
                    }}
                  >
                    {l.label}
                  </Link>
                  {l.href === "/range" && (
                    <div className="mt-3 flex flex-col gap-2.5 pl-0.5">
                      {shopMenu.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-[0.8rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-auto text-[0.72rem] uppercase tracking-[0.18em] text-[color:var(--color-charcoal-soft)]">
              Mumbai · Air Elevated
            </div>
          </div>
        </div>
      )}
    </>
  );
}
