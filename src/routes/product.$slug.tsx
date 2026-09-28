import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Heart, Truck, RefreshCw, ShieldCheck, Minus, Plus } from "lucide-react";
import { getProduct, inr, products } from "../lib/site";
import { useCart } from "../components/cart-context";
import { ProductCard } from "../components/product-card";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  component: ProductPage,
  errorComponent: () => <Fallback text="This product didn't load." />,
  notFoundComponent: () => <Fallback text="We couldn't find that cushion." />,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Cushion"} — The Cushion Gallery` },
      { name: "description", content: loaderData?.story ?? "Handmade luxury cushion." },
      { property: "og:title", content: loaderData?.name ?? "Handmade cushion" },
      { property: "og:description", content: loaderData?.story ?? "Handmade luxury cushion." },
      { property: "og:type", content: "product" },
    ],
  }),
});

function Fallback({ text }: { text: string }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-32 text-center">
      <h1 className="font-display text-4xl">{text}</h1>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-plum-gradient px-8 py-3.5 text-xs tracking-[0.22em] uppercase text-primary-foreground">
        Back to shop
      </Link>
    </div>
  );
}

function ProductPage() {
  const product = Route.useLoaderData();
  const { add, setOpen, wishlist, toggleWish } = useCart();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors[0]!);
  const [size, setSize] = useState("16 × 16 in");
  const [zoom, setZoom] = useState(false);
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const wished = wishlist.includes(product.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        <Link to="/shop" className="hover:text-accent">Shop</Link> / {product.category}
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        <div>
          <div
            className="overflow-hidden rounded-[2rem] border border-gold/25 shadow-lift"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`aspect-4/5 w-full object-cover transition-transform duration-700 ${zoom ? "scale-115" : ""}`}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {products.slice(0, 4).map((p) => (
              <Link key={p.slug} to="/product/$slug" params={{ slug: p.slug }}>
                <img src={p.image} alt={p.name} loading="lazy" className="aspect-square w-full rounded-xl object-cover opacity-80 transition-opacity hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-xs text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.story}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl">{inr(product.price)}</span>
            <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-accent-foreground">
              Save {inr(product.mrp - product.price)}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Inclusive of GST · {product.stock} in stock</p>

          <div className="mt-8 space-y-5">
            <div>
              <p className="eyebrow mb-2">Colour</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`rounded-full px-4 py-2 text-xs tracking-[0.14em] uppercase ${
                      color === c ? "bg-plum-gradient text-primary-foreground" : "border border-border"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {["16 × 16 in", "18 × 18 in", "20 × 20 in"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-full px-4 py-2 text-xs ${
                      size === s ? "bg-plum-gradient text-primary-foreground" : "border border-border"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="eyebrow">Qty</p>
              <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
                <span className="w-6 text-center text-sm">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => { add(product.slug, qty); setOpen(true); }}
              className="flex-1 rounded-full bg-plum-gradient px-8 py-4 text-xs tracking-[0.22em] uppercase text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Add to cart — {inr(product.price * qty)}
            </button>
            <button
              onClick={() => toggleWish(product.slug)}
              aria-label="Add to wishlist"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-gold/60"
            >
              <Heart className={`h-5 w-5 ${wished ? "fill-accent text-accent" : ""}`} />
            </button>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            {[[Truck, "Ships in 3–5 days"], [RefreshCw, "7-day returns"], [ShieldCheck, "Artisan guarantee"]].map(
              ([Icon, label]: any) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  {label}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <section className="mt-24">
        <h2 className="font-display text-3xl">Reviews</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ["Exquisite handwork", "The embroidery detail is even better in person.", "Meera P."],
            ["Perfect gift", "Gifted for a housewarming — everyone asked where it's from.", "Rohan T."],
            ["Rich velvet", "Deep colour, soft touch, beautifully finished piping.", "Sara J."],
          ].map(([title, body, name]) => (
            <article key={name} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <h3 className="mt-3 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              <p className="mt-4 text-xs tracking-[0.18em] uppercase text-muted-foreground">{name}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl">You may also love</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
