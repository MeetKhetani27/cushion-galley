import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "../lib/site";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact The Cushion Gallery — Custom Orders & Support" },
      { name: "description", content: "Call, email or WhatsApp our Jaipur atelier for custom handmade cushion orders and order support." },
      { property: "og:title", content: "Contact — The Cushion Gallery" },
      { property: "og:description", content: "Reach our Jaipur atelier for custom cushion orders and support." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const field = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function Contact() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl">Let's make something</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Custom colourways, bulk gifting or a question about your order — we reply within a day.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            [Phone, "Phone", "+91 8849218079", "tel:+918849218079"],
            [Mail, "Email", site.email, `mailto:${site.email}`],
            [MessageCircle, "WhatsApp", "Chat with the atelier", `https://wa.me/${site.whatsapp}`],
            [MapPin, "Studio", site.address, undefined],
          ].map(([Icon, label, value, href]: any) => (
            <a
              key={label}
              href={href}
              className="flex gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-gold"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="min-w-0">
                <span className="block text-xs tracking-[0.2em] uppercase text-muted-foreground">{label}</span>
                <span className="block text-sm">{value}</span>
              </span>
            </a>
          ))}
          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Studio location map"
              src="https://www.google.com/maps?q=Jaipur,Rajasthan&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="h-fit rounded-3xl border border-gold/30 bg-secondary/50 p-6 sm:p-8"
        >
          <h2 className="font-display text-3xl">Send a note</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input required placeholder="Your name" aria-label="Your name" className={field} />
            <input required placeholder="Phone" aria-label="Phone" className={field} />
            <input required type="email" placeholder="Email" aria-label="Email" className={`${field} sm:col-span-2`} />
            <textarea required rows={5} placeholder="Tell us what you have in mind…" aria-label="Message" className={`${field} sm:col-span-2`} />
          </div>
          <button className="mt-6 w-full rounded-full bg-plum-gradient py-3.5 text-xs tracking-[0.22em] uppercase text-primary-foreground">
            Send message
          </button>
        </form>
      </div>

      <a
        href={`https://wa.me/${site.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-plum-gradient text-primary-foreground shadow-lift"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
