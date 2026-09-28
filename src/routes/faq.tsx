import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () => ({
    meta: [
      { title: "FAQ — Handmade Cushion Care, Shipping & Returns" },
      { name: "description", content: "Answers on cushion care, custom orders, shipping timelines, GST invoices and returns at The Cushion Gallery." },
      { property: "og:title", content: "FAQ — The Cushion Gallery" },
      { property: "og:description", content: "Cushion care, shipping, custom orders and returns answered." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }),
      },
    ],
  }),
});

const faqs: [string, string][] = [
  ["Are the cushions really handmade?", "Yes. Every motif is embroidered by hand on a wooden adda frame. No machine embroidery is used."],
  ["Is the filler included?", "Our listings are for covers with concealed zips. Inner fillers can be added at checkout on request."],
  ["How do I care for the embroidery?", "Dry clean only. Avoid direct sunlight for long periods and never machine wash zardozi work."],
  ["Can I order a custom colour or size?", "Absolutely. Share your fabric shade and dimensions via the contact form; custom pieces take 2–3 weeks."],
  ["What are the shipping timelines?", "In-stock pieces ship in 3–5 working days across India. Free shipping above ₹4,999."],
  ["Do you provide GST invoices?", "Yes, add your GSTIN at checkout and a GST-compliant invoice is emailed with your order."],
  ["What is your return policy?", "Unused pieces can be returned within 7 days of delivery. Custom orders are non-returnable."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow">Help centre</p>
      <h1 className="mt-3 font-display text-5xl">Questions, answered</h1>
      <div className="mt-10 space-y-3">
        {faqs.map(([q, a], i) => (
          <div key={q} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-5 text-left"
            >
              <span className="min-w-0 font-display text-xl">{q}</span>
              <Plus className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`} />
            </button>
            {open === i && <p className="px-6 pb-6 text-sm text-muted-foreground">{a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
