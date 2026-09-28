import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { products } from "../lib/site";
import { ProductCard } from "../components/product-card";

export const Route = createFileRoute("/shop")({
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop Handmade Cushions — The Cushion Gallery" },
      {
        name: "description",
        content:
          "Browse hand-embroidered velvet and zardozi cushion covers. Filter by category, colour and price. Made with love in India.",
      },
      { property: "og:title", content: "Shop Handmade Cushions — The Cushion Gallery" },
      { property: "og:description", content: "Hand-embroidered luxury cushion covers, made in small batches." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
});

const categories = ["All", "Velvet", "Zardozi", "Floral"] as const;
const sorts = { featured: "Featured", low: "Price: Low to High", high: "Price: High to Low", rating: "Top Rated" };

function Shop() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    let l = products.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        p.name.toLowerCase().includes(q.toLowerCase()),
    );
    if (sort === "low") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "high") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, sort, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <p className="eyebrow">The shop</p>
      <h1 className="mt-3 font-display text-5xl sm:text-6xl">Handmade cushions</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Each piece is embroidered by hand — small variations are the signature of love, not a flaw.
      </p>

      <div className="mt-10 grid gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name…"
          aria-label="Search products"
          className="w-full rounded-full border border-border bg-background px-5 py-2.5 text-sm outline-none focus:border-gold"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors ${
                cat === c ? "bg-plum-gradient text-primary-foreground" : "border border-border hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="sr-only">Sort products</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            className="rounded-full border border-border bg-background px-4 py-2 text-sm outline-none"
          >
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-6 text-xs tracking-[0.18em] uppercase text-muted-foreground">
        {list.length} pieces
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-24 text-center text-muted-foreground">No cushions match that search.</p>
      )}
    </div>
  );
}
