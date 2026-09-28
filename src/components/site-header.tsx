import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Sun, Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../lib/site";
import { useCart } from "./cart-context";
import { CartDrawer } from "./cart-drawer";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <>
      <div className="bg-plum-gradient text-center text-[0.68rem] tracking-[0.28em] uppercase text-primary-foreground/85 py-2 px-4">
        Hand embroidered in India · Free shipping above ₹4,999
      </div>
      <header
        className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-500 ${
          scrolled ? "bg-background/95 shadow-sm" : "bg-background/85"
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <button
            className="lg:hidden -ml-1 p-2 text-foreground"
            aria-label="Open menu"
            onClick={() => setMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex min-w-0 items-center gap-3 justify-self-center lg:justify-self-start">
            <img src={site.logo} alt={`${site.name} logo`} className="h-11 w-11 shrink-0 rounded-full object-cover" />
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-display text-lg leading-tight">{site.name}</span>
              <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">
                {site.tagline}
              </span>
            </span>
          </Link>

          <nav className="hidden justify-center gap-8 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 justify-self-end">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle dark mode"
              className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative rounded-full p-2 text-foreground/80 transition-colors hover:bg-muted"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.6rem] font-semibold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-lg lg:hidden">
          <div className="flex items-center justify-between px-5 py-5">
            <span className="font-display text-xl">{site.name}</span>
            <button aria-label="Close menu" onClick={() => setMenu(false)} className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5">
            {nav.map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMenu(false)}
                style={{ animationDelay: `${i * 50}ms` }}
                className="reveal-up border-b border-border/60 py-4 font-display text-3xl"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <CartDrawer />
    </>
  );
}
