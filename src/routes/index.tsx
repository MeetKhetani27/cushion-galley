import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Scissors, Leaf, ShieldCheck, Quote, ChevronLeft, ChevronRight, Instagram, Star } from "lucide-react";
import { products, site, inr } from "../lib/site";
import { ProductCard } from "../components/product-card";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/carousel";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "The Cushion Gallery — Handmade Luxury Cushions" },
      {
        name: "description",
        content:
          "Hand-embroidered velvet and zardozi cushion covers, made with love. Shop heirloom-quality handmade cushions crafted by artisans in India.",
      },
      { property: "og:title", content: "The Cushion Gallery — Handmade Luxury Cushions" },
      {
        property: "og:description",
        content: "Made with love, by hand — luxury hand-embroidered cushions for elegant interiors.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  const hero = products[1]!;
  const float = products[4]!;
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  // Slider data
  const slides = [
    {
      tagline: site.tagline + " · Est. handcrafted",
      title: "Love, stitched",
      subtitle: "into every",
      highlight: "cushion",
      description: site.love + " Hand-embroidered velvet, zardozi threadwork and heirloom finishes — made slowly, in small batches, by artisans who sign their work.",
      image: hero.image,
      price: 2890,
    },
    {
      tagline: "Velvet · Zardozi · Floral",
      title: "Artisan",
      subtitle: "crafted",
      highlight: "masterpieces",
      description: "Each cushion tells a story of tradition, skill, and passion. From intricate zardozi work to delicate floral patterns, discover the art of hand embroidery.",
      image: products[0]!.image,
      price: 2890,
    },
    {
      tagline: "Heirloom quality · Made in India",
      title: "Timeless",
      subtitle: "elegance",
      highlight: "for your home",
      description: "Transform your living spaces with cushions that blend traditional craftsmanship with contemporary design. Pieces that become family heirlooms.",
      image: products[2]!.image,
      price: 3190,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 60000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div>
      {/* Hero Slider */}
      <section className="relative h-[600px] overflow-hidden border-b border-border sm:h-[600px] md:h-[700px] lg:h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover transition-opacity duration-500"
            key={currentSlide}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="relative mx-auto grid h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-2xl reveal-up">
            <p className="eyebrow text-white/80">{slide.tagline}</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              {slide.title}
              <br />
              {slide.subtitle}{" "}
              <span className="text-gold-gradient italic">{slide.highlight}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80">
              {slide.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-plum-gradient px-8 py-4 text-xs tracking-[0.24em] uppercase text-white shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 sm:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110 sm:right-8"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 right-4 flex gap-2 sm:bottom-12 sm:right-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Marquee values */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
          {[
            [Scissors, "Hand embroidered", "Every motif stitched by hand"],
            [Leaf, "Natural fabrics", "Cotton velvet & pure silk thread"],
            [ShieldCheck, "7-day returns", "Easy, no-question exchanges"],
            [Sparkles, "Custom orders", "Bespoke sizes and colourways"],
          ].map(([Icon, title, sub]: any, i) => (
            <div key={title} className="reveal-up flex gap-3" style={{ animationDelay: `${i * 80}ms` }}>
              <Icon className="h-5 w-5 shrink-0 text-accent" />
              <div className="min-w-0">
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-7xl border-b border-border px-4 py-20 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <p className="eyebrow">The collection</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Loved by hand, chosen by you</h2>
          </div>
          <Link to="/shop" className="hidden shrink-0 items-center gap-2 text-sm hover:text-accent sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Story band */}
      <section className="border-b border-border bg-plum-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[2.5rem] border border-primary-foreground/15">
            <img src={products[3]!.image} alt="Handmade cushion styled on an armchair" className="w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow text-primary-foreground/60">Our craft</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Slow made. <span className="italic text-gold-gradient">Deeply loved.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/75">
              Each cushion begins as a hand-drawn motif, traced onto velvet and embroidered on a
              wooden adda frame. No machines, no shortcuts — only patient hands and forty hours of
              devotion per piece.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="mx-auto max-w-7xl border-b border-border px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="eyebrow">@thecushiongallery</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Follow our journey</h2>
          <p className="mt-4 text-muted-foreground">
            See our cushions in real homes, behind-the-scenes at the atelier, and new collections before anyone else.
          </p>
          <Link
            to={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/60 px-8 py-4 text-xs tracking-[0.24em] uppercase transition-colors hover:bg-secondary"
          >
            <Instagram className="h-4 w-4" />
            Follow on Instagram
          </Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => (
            <a
              key={`${p.slug}-${i}`}
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-border shadow-soft transition-transform hover:scale-105"
            >
              <img
                src={p.image}
                alt={`Instagram post ${i + 1}`}
                className="aspect-square w-full object-cover transition-opacity group-hover:opacity-90"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl border-b border-border px-4 py-20 sm:px-6">
        <p className="eyebrow text-center What Our Riders Say">What Our Riders Say</p>
        <h2 className="mt-3 text-center font-display text-4xl sm:text-5xl">Experiences shared by members of our community</h2>
        <div className="mt-12 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
            setApi={(api) => {
              setCarouselApi(api);
              if (api) {
                api.on("select", () => {
                  setTestimonialSlide(api.selectedScrollSnap());
                });
              }
            }}
          >
            <CarouselContent>
              {[
                {
                  quote: "Been riding here since last 1.5 years and now I call it my second home ❤️ To all the foreigners, you can't miss out on safaris 🤳",
                  name: "Diya Ajmera",
                  initials: "D",
                  rating: 5,
                },
                {
                  quote: "The zardozi work is unreal. It transformed my whole living room.",
                  name: "Ananya R.",
                  initials: "A",
                  rating: 5,
                },
                {
                  quote: "You can feel the love in the stitching. Worth every rupee.",
                  name: "Devika S.",
                  initials: "D",
                  rating: 5,
                },
                {
                  quote: "Ordered a custom colourway — the team was so gracious.",
                  name: "Farah K.",
                  initials: "F",
                  rating: 5,
                },
              ].map((testimonial, i) => (
                <CarouselItem key={i} className="md:basis-1/1 lg:basis-1/1">
                  <figure className="reveal-up rounded-3xl bg-white p-8 shadow-soft mx-auto max-w-2xl">
                    <blockquote className="font-display text-xl leading-relaxed text-gray-800">{testimonial.quote}</blockquote>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-lg">
                        {testimonial.initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{testimonial.name}</p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50" />
            <CarouselNext className="right-0 translate-x-1/2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50" />
          </Carousel>
          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => {
                  if (carouselApi) {
                    carouselApi.scrollTo(index);
                  }
                }}
                className={`h-2 w-2 rounded-full transition-all ${
                  testimonialSlide === index ? "w-8 bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-4xl border-b border-border px-4 py-20 sm:px-6">
        <div className="rounded-[2.5rem] border border-gold/30 bg-secondary/60 px-6 py-14 text-center sm:px-12">
          <h2 className="font-display text-4xl">Join the atelier list</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            New drops, artisan stories and early access to limited handmade pieces.
          </p>
          <form
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              aria-label="Email address"
              className="flex-1 rounded-full border border-border bg-background px-5 py-3.5 text-sm outline-none focus:border-gold"
            />
            <button className="rounded-full bg-plum-gradient px-8 py-3.5 text-xs tracking-[0.22em] uppercase text-primary-foreground">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
