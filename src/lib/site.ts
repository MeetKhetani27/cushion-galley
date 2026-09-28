export const site = {
  name: "The Cushion Gallery",
  tagline: "by Alkeshwari",
  love: "Made with love, by hand — every cushion, every stitch.",
  logo: "/images/logo.jpeg",
  phone: "+91 98765 43210",
  whatsapp: "918849218079",
  email: "hello@thecushiongallery.com",
  address: "Studio 12, Artisan Lane, Jaipur, Rajasthan 302001, India",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  mrp: number;
  image: string;
  images?: string[];
  category: "Velvet" | "Zardozi" | "Floral";
  colors: string[];
  rating: number;
  reviews: number;
  story: string;
  stock: number;
};

export const products: Product[] = [
  {
    slug: "amber-leaf-zardozi",
    name: "Amber Leaf Zardozi Cushion",
    price: 2890,
    mrp: 3600,
    image: "/images/PRODUCT_1.JPG",
    images: ["/images/PRODUCT_1.JPG", "/images/PRODUCT_2.JPG"],
    category: "Zardozi",
    colors: ["Amber", "Ivory"],
    rating: 4.9,
    reviews: 42,
    story:
      "Hand-embroidered silver leaves scattered across warm amber velvet, finished with a hand-twisted cord piping.",
    stock: 8,
  },
  {
    slug: "maroon-imperial-medallion",
    name: "Maroon Imperial Medallion",
    price: 3450,
    mrp: 4200,
    image: "/images/PRODUCT_2.JPG",
    images: ["/images/PRODUCT_2.JPG", "/images/PRODUCT_3.JPG"],
    category: "Zardozi",
    colors: ["Maroon", "Gold"],
    rating: 5,
    reviews: 67,
    story:
      "A regal gold medallion worked in zardozi over deep maroon velvet — 42 hours of handwork per piece.",
    stock: 5,
  },
  {
    slug: "trellis-noor-velvet",
    name: "Trellis Noor Velvet Cushion",
    price: 3190,
    mrp: 3900,
    image: "/images/PRODUCT_3.JPG",
    images: ["/images/PRODUCT_3.JPG", "/images/PRODUCT_5 (1).JPG"],
    category: "Velvet",
    colors: ["Maroon", "Pearl"],
    rating: 4.8,
    reviews: 31,
    story:
      "A pearl trellis lattice hand-stitched across plush maroon velvet, framed by a blossom border.",
    stock: 11,
  },
  {
    slug: "ivory-vine-heritage",
    name: "Ivory Vine Heritage Cushion",
    price: 2990,
    mrp: 3700,
    image: "/images/PRODUCT_5 (1).JPG",
    images: ["/images/PRODUCT_5 (1).JPG", "/images/PRODUCT_5 (2).JPG"],
    category: "Floral",
    colors: ["Maroon", "Ivory"],
    rating: 4.7,
    reviews: 24,
    story:
      "Climbing ivory vines embroidered thread by thread — a quiet heirloom for classic interiors.",
    stock: 14,
  },
  {
    slug: "golden-paisley-mandala",
    name: "Golden Paisley Mandala",
    price: 3690,
    mrp: 4500,
    image: "/images/PRODUCT_5 (2).JPG",
    images: ["/images/PRODUCT_5 (2).JPG", "/images/PRODUCT_6.JPG"],
    category: "Zardozi",
    colors: ["Amber", "Gold"],
    rating: 5,
    reviews: 58,
    story:
      "A paisley mandala centred on saffron velvet, surrounded by hand-beaded floral clusters.",
    stock: 4,
  },
  {
    slug: "royal-border-damask",
    name: "Royal Border Damask Cushion",
    price: 3990,
    mrp: 4900,
    image: "/images/PRODUCT_6.JPG",
    images: ["/images/PRODUCT_6.JPG", "/images/PRODUCT_7.JPG"],
    category: "Velvet",
    colors: ["Maroon", "Gold"],
    rating: 4.9,
    reviews: 73,
    story:
      "An ornate damask border in antique gold thread encircling a field of hand-worked motifs.",
    stock: 6,
  },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const createWhatsAppOrderUrl = (
  items: { product: Product; qty: number }[],
  origin: string,
) => {
  const productDetails = items
    .map(({ product, qty }) => `${product.name}\nQuantity: ${qty}`)
    .join("\n\n");
  const message = [
    "Hello, I'm interested in these products:",
    "",
    productDetails,
    "",
    "Please share more information.",
  ].join("\n");

  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
