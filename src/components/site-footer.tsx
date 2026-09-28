import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { site } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-plum-gradient text-primary-foreground dark:bg-background dark:text-[#F3F0E7]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <img src={site.logo} alt={`${site.name} logo`} className="h-16 w-16 rounded-full object-cover" />
            <p className="mt-4 font-display text-2xl">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-primary-foreground/70 dark:text-[#F3F0E7]/70">{site.love}</p>
            <div className="mt-5 flex gap-3">
              {[
                { href: site.instagram, Icon: Instagram, label: "Instagram" },
                { href: site.facebook, Icon: Facebook, label: "Facebook" },
                { href: site.youtube, Icon: Youtube, label: "YouTube" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary-foreground/25 p-2.5 transition-colors hover:border-accent hover:text-accent dark:border-[#F3F0E7]/25"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Shop links">
            <p className="eyebrow text-primary-foreground/60 dark:text-[#F3F0E7]/60">Shop</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80 dark:text-[#F3F0E7]/80">
              <li><Link to="/shop" className="hover:text-accent">All Cushions</Link></li>
              <li><Link to="/cart" className="hover:text-accent">Cart</Link></li>
            </ul>
          </nav>

          <nav aria-label="Company links">
            <p className="eyebrow text-primary-foreground/60 dark:text-[#F3F0E7]/60">Company</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80 dark:text-[#F3F0E7]/80">
              <li><Link to="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link to="/policies" className="hover:text-accent">Policies</Link></li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-primary-foreground/60 dark:text-[#F3F0E7]/60">Atelier</p>
            <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80 dark:text-[#F3F0E7]/80">
              <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />+91 8849218079</li>
              <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{site.email}</li>
              <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 dark:border-border dark:text-[#F3F0E7]/70 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-primary-foreground/80 dark:text-[#F3F0E7]/80">Payment Methods</p>
            <div className="flex gap-3">
              <div className="flex h-10 w-16 items-center justify-center rounded bg-white px-2">
                <svg viewBox="0 0 48 32" className="h-8 w-12">
                  <rect fill="#1A1F71" width="48" height="32" rx="4"/>
                  <text x="24" y="21" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="Arial">VISA</text>
                </svg>
              </div>
              <div className="flex h-10 w-16 items-center justify-center rounded bg-white px-2">
                <svg viewBox="0 0 48 32" className="h-8 w-12">
                  <rect fill="#000" width="48" height="32" rx="4"/>
                  <circle cx="18" cy="16" r="9" fill="#EB001B"/>
                  <circle cx="30" cy="16" r="9" fill="#F79E1B"/>
                  <path d="M24 9.5a9 9 0 0 0 0 13" fill="#FF5F00"/>
                </svg>
              </div>
              <div className="flex h-10 w-16 items-center justify-center rounded bg-white px-2">
                <svg viewBox="0 0 48 32" className="h-8 w-12">
                  <rect fill="#fff" width="48" height="32" rx="4"/>
                  <text x="24" y="21" fill="#000" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="Arial">UPI</text>
                </svg>
              </div>
              <div className="flex h-10 w-16 items-center justify-center rounded bg-white px-2">
                <svg viewBox="0 0 48 32" className="h-8 w-12">
                  <rect fill="#003087" width="48" height="32" rx="4"/>
                  <text x="24" y="21" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Arial">PayPal</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
