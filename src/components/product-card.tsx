import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useCart } from "./cart-context";
import { inr, type Product } from "../lib/site";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add, setOpen, wishlist, toggleWish } = useCart();
  const wished = wishlist.includes(product.slug);

  return (
    <article
      className="reveal-up group relative overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link to="/product/$slug" params={{ slug: product.slug }} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="aspect-4/5 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-108"
        />
      </Link>
      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWish(product.slug)}
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass-panel"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-accent text-accent" : "text-foreground"}`} />
      </button>
      <span className="absolute left-4 top-4 rounded-full glass-panel px-3 py-1 text-[0.62rem] tracking-[0.22em] uppercase">
        {product.category}
      </span>

      <div className="p-5">
        <div className="flex items-center gap-1 text-accent">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="text-xs text-muted-foreground">
            {product.rating} · {product.reviews} reviews
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg">{inr(product.price)}</span>
          <span className="text-sm text-muted-foreground line-through">{inr(product.mrp)}</span>
        </div>
        <button
          onClick={() => {
            add(product.slug);
            setOpen(true);
          }}
          className="mt-4 w-full rounded-full border border-gold/60 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors hover:bg-plum-gradient hover:text-primary-foreground"
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
