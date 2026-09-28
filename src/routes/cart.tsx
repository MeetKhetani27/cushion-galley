import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../components/cart-context";
import { createWhatsAppOrderUrl, inr } from "../lib/site";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({
    meta: [
      { title: "Your Cart — The Cushion Gallery" },
      { name: "description", content: "Review your handmade cushion selection, apply a coupon and checkout securely." },
      { property: "og:title", content: "Your Cart — The Cushion Gallery" },
      { property: "og:description", content: "Review your handmade cushion selection and checkout securely." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/cart" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
});

function CartPage() {
  const c = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-5xl">Your cart</h1>

      {c.items.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-muted-foreground">Nothing here yet — go find a cushion to love.</p>
          <Link to="/shop" className="mt-6 inline-block rounded-full bg-plum-gradient px-8 py-3.5 text-xs tracking-[0.22em] uppercase text-primary-foreground">
            Shop cushions
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-5">
            {c.items.map(({ product, qty }) => (
              <li key={product.slug} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-3xl border border-border bg-card p-4 shadow-soft">
                <img src={product.image} alt={product.name} className="h-28 w-24 shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-display text-xl">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{inr(product.price)} · {product.category}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center gap-3 rounded-full border border-border px-3 py-1.5">
                      <button aria-label="Decrease quantity" onClick={() => c.setQty(product.slug, qty - 1)}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-5 text-center text-sm">{qty}</span>
                      <button aria-label="Increase quantity" onClick={() => c.setQty(product.slug, qty + 1)}><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <button aria-label="Remove item" onClick={() => c.remove(product.slug)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <span className="ml-auto font-display text-xl">{inr(product.price * qty)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-gold/30 bg-secondary/50 p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(c.subtotal)}</dd></div>
              {c.discount > 0 && <div className="flex justify-between text-accent"><dt>Discount</dt><dd>-{inr(c.discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{inr(c.gst)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{c.shipping === 0 ? "Free" : inr(c.shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-3 font-display text-2xl"><dt>Total</dt><dd>{inr(c.total)}</dd></div>
            </dl>
            <button
              onClick={() => {
                window.location.href = createWhatsAppOrderUrl(c.items, window.location.origin);
              }}
              className="mt-6 block w-full rounded-full bg-plum-gradient py-3.5 text-center text-xs tracking-[0.22em] uppercase text-primary-foreground"
            >
              Proceed to checkout
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Use code HANDMADE10 for 10% off</p>
          </aside>
        </div>
      )}
    </div>
  );
}
