import { createFileRoute } from "@tanstack/react-router";
import { site } from "../lib/site";

export const Route = createFileRoute("/policies")({
  component: Policies,
  head: () => ({
    meta: [
      { title: "Policies — Privacy, Terms, Shipping & Refunds" },
      { name: "description", content: "Privacy policy, terms and conditions, shipping details and refund policy for The Cushion Gallery." },
      { property: "og:title", content: "Policies — The Cushion Gallery" },
      { property: "og:description", content: "Privacy, terms, shipping and refund policies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/policies" },
    ],
    links: [{ rel: "canonical", href: "/policies" }],
  }),
});

const sections: [string, string[]][] = [
  [
    "Privacy Policy",
    [
      "We collect only the details needed to fulfil your order: name, contact information and shipping address.",
      "Payment details are handled entirely by our payment provider and never stored on our servers.",
      "We never sell or rent your data. Email us to request deletion of your account at any time.",
    ],
  ],
  [
    "Terms & Conditions",
    [
      "All product imagery represents handmade pieces; slight variation in motif and shade is inherent to handwork.",
      "Prices are listed in INR and include applicable GST unless stated otherwise.",
      "Orders may be cancelled within 12 hours of placement, before the piece enters dispatch.",
    ],
  ],
  [
    "Shipping Policy",
    [
      "In-stock pieces dispatch within 3–5 working days; custom orders take 2–3 weeks.",
      "Free shipping on orders above ₹4,999. A flat ₹149 applies below that.",
      "Tracking details are emailed as soon as your parcel leaves the atelier.",
    ],
  ],
  [
    "Refund Policy",
    [
      "Unused pieces in original packaging may be returned within 7 days of delivery.",
      "Refunds are processed to the original payment method within 5–7 working days of pickup.",
      "Custom colourways and bespoke sizes are non-returnable, though we will always repair defects free of charge.",
    ],
  ],
];

function Policies() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 font-display text-5xl">Our policies</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Questions? Write to {site.email} — a human replies.
      </p>

      <div className="mt-12 space-y-10">
        {sections.map(([title, points]) => (
          <section key={title}>
            <h2 className="font-display text-3xl">{title}</h2>
            <div className="hairline-gold mt-3" />
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              {points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
