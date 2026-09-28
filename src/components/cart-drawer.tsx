import { Minus, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "./cart-context";
import { createWhatsAppOrderUrl, inr, products } from "../lib/site";

export function CartDrawer() {
  const c = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  const recommended = products
    .filter((p) => !c.items.some((i) => i.product.slug === p.slug))
    .slice(0, 2);

  return (
    <div
      className={`fixed inset-0 z-[70] transition-opacity duration-300 ${
        c.open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!c.open}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => c.setOpen(false)} />
      <aside
        className={`absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-500 ${
          c.open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl">Your Cart</h2>
          <button aria-label="Close cart" onClick={() => c.setOpen(false)} className="p-2">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {c.items.length === 0 && (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Your cart is empty. Fall in love with a handmade cushion.
            </p>
          )}
          <ul className="space-y-4">
            {c.items.map(({ product, qty }) => (
              <li key={product.slug} className="flex gap-3">
                <img src={product.image} alt={product.name} className="h-24 w-20 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{inr(product.price)}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => c.setQty(product.slug, qty - 1)}
                      className="rounded-full border border-border p-1.5"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => c.setQty(product.slug, qty + 1)}
                      className="rounded-full border border-border p-1.5"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      aria-label="Remove item"
                      onClick={() => c.remove(product.slug)}
                      className="ml-auto p-1.5 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {c.items.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">You may also love</p>
              <div className="grid grid-cols-2 gap-3">
                {recommended.map((p) => (
                  <button
                    key={p.slug}
                    onClick={() => c.add(p.slug)}
                    className="overflow-hidden rounded-xl border border-border text-left transition-shadow hover:shadow-soft"
                  >
                    <img src={p.image} alt={p.name} className="h-24 w-full object-cover" />
                    <span className="block truncate px-2 py-2 text-xs">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {c.items.length > 0 && (
          <div className="border-t border-border px-5 py-4">
            <div className="mb-3 flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon code"
                aria-label="Coupon code"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-gold"
              />
              <button
                onClick={() => setMsg(c.applyCoupon(code) ? "Coupon applied — 10% off" : "Invalid code")}
                className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Apply
              </button>
            </div>
            {msg && <p className="mb-2 text-xs text-muted-foreground">{msg}</p>}
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{inr(c.subtotal)}</dd>
              </div>
              {c.discount > 0 && (
                <div className="flex justify-between text-accent">
                  <dt>Discount</dt>
                  <dd>-{inr(c.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">GST (5%)</dt>
                <dd>{inr(c.gst)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{c.shipping === 0 ? "Free" : inr(c.shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2 font-display text-xl">
                <dt>Total</dt>
                <dd>{inr(c.total)}</dd>
              </div>
            </dl>
            <button
              onClick={() => {
                window.location.href = createWhatsAppOrderUrl(c.items, window.location.origin);
              }}
              className="mt-4 block rounded-full bg-plum-gradient py-3 text-center text-sm tracking-[0.18em] uppercase text-primary-foreground"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
