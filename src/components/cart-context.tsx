import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "../lib/site";

export type CartLine = { slug: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  items: { product: Product; qty: number }[];
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  count: number;
  coupon: string | null;
  discount: number;
  applyCoupon: (code: string) => boolean;
  wishlist: string[];
  toggleWish: (slug: string) => void;
};

const Ctx = createContext<CartCtx | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLines(read<CartLine[]>("tcg_cart", []));
    setWishlist(read<string[]>("tcg_wish", []));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("tcg_cart", JSON.stringify(lines));
  }, [lines]);
  useEffect(() => {
    if (typeof window !== "undefined")
      window.localStorage.setItem("tcg_wish", JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<CartCtx>(() => {
    const items = lines
      .map((l) => {
        const product = products.find((p) => p.slug === l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter(Boolean) as { product: Product; qty: number }[];

    const gross = items.reduce((s, i) => s + i.product.price * i.qty, 0);
    const discount = coupon === "HANDMADE10" ? Math.round(gross * 0.1) : 0;
    const subtotal = gross - discount;
    const gst = Math.round(subtotal * 0.05);
    const shipping = subtotal === 0 || subtotal > 4999 ? 0 : 149;

    return {
      lines,
      open,
      setOpen,
      items,
      subtotal,
      gst,
      shipping,
      total: subtotal + gst + shipping,
      count: items.reduce((s, i) => s + i.qty, 0),
      coupon,
      discount,
      applyCoupon: (code: string) => {
        const ok = code.trim().toUpperCase() === "HANDMADE10";
        setCoupon(ok ? "HANDMADE10" : null);
        return ok;
      },
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug);
          return found
            ? prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { slug, qty }];
        }),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      setQty: (slug, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.slug !== slug)
            : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
        ),
      wishlist,
      toggleWish: (slug) =>
        setWishlist((prev) =>
          prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
        ),
    };
  }, [lines, wishlist, coupon, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
