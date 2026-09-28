import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Smartphone, Wallet, Truck } from "lucide-react";
import { useCart } from "../components/cart-context";
import { inr, site } from "../lib/site";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({
    meta: [
      { title: "Secure Checkout — The Cushion Gallery" },
      { name: "description", content: "Complete your handmade cushion order with secure, GST-compliant checkout." },
      { property: "og:title", content: "Secure Checkout — The Cushion Gallery" },
      { property: "og:description", content: "Complete your handmade cushion order securely." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/checkout" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
});

const steps = ["Shipping", "Billing", "Payment"];
const field =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold";

function Checkout() {
  const c = useCart();
  const [step, setStep] = useState(0);
  const [shippingDetails, setShippingDetails] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pinCode: "",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-5xl">Checkout</h1>

      <ol className="mt-8 flex flex-wrap gap-3">
        {steps.map((s, i) => (
          <li
            key={s}
            className={`rounded-full px-5 py-2 text-xs tracking-[0.18em] uppercase ${
              i === step ? "bg-plum-gradient text-primary-foreground" : "border border-border text-muted-foreground"
            }`}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <form
          className="rounded-3xl border border-border bg-card p-6 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (step < 2) {
              if (step === 0) {
                setShippingDetails({
                  customerName: String(formData.get("customerName") ?? ""),
                  phone: String(formData.get("phone") ?? ""),
                  email: String(formData.get("email") ?? ""),
                  address: String(formData.get("address") ?? ""),
                  city: String(formData.get("city") ?? ""),
                  pinCode: String(formData.get("pinCode") ?? ""),
                });
              }
              setStep(step + 1);
              return;
            }

            const orderItems = c.items
              .map(({ product, qty }) => `- ${product.name} x ${qty}: ${inr(product.price * qty)}`)
              .join("\n");
            const message = [
              "Hello! I'd like to place an order:",
              "",
              "Items:",
              orderItems || "- No items",
              "",
              `Name: ${shippingDetails.customerName}`,
              `Phone: ${shippingDetails.phone}`,
              `Email: ${shippingDetails.email}`,
              `Address: ${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.pinCode}`,
              `Payment preference: ${formData.get("pay") ?? "Not selected"}`,
              "",
              `Subtotal: ${inr(c.subtotal)}`,
              `GST: ${inr(c.gst)}`,
              `Shipping: ${c.shipping === 0 ? "Free" : inr(c.shipping)}`,
              `Total: ${inr(c.total)}`,
            ].join("\n");

            window.location.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
          }}
        >
          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <input required name="customerName" placeholder="Full name" aria-label="Full name" className={field} />
              <input required name="phone" placeholder="Phone" aria-label="Phone" className={field} />
              <input required name="email" type="email" placeholder="Email" aria-label="Email" className={`${field} sm:col-span-2`} />
              <input required name="address" placeholder="Address line" aria-label="Address" className={`${field} sm:col-span-2`} />
              <input required name="city" placeholder="City" aria-label="City" className={field} />
              <input required name="pinCode" placeholder="PIN code" aria-label="PIN code" className={field} />
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" defaultChecked className="accent-[var(--gold)]" /> Same as shipping address
              </label>
              <input placeholder="GSTIN (optional)" aria-label="GSTIN" className={`${field} sm:col-span-2`} />
              <input placeholder="Company name (optional)" aria-label="Company" className={`${field} sm:col-span-2`} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-3">
              {[
                { id: "razorpay", name: "Razorpay", description: "UPI, Cards, Netbanking", icon: <Smartphone className="h-5 w-5" /> },
                { id: "stripe", name: "Stripe", description: "Credit & Debit Cards", icon: <CreditCard className="h-5 w-5" /> },
                { id: "paypal", name: "PayPal", description: "Pay with PayPal", icon: <Wallet className="h-5 w-5" /> },
                { id: "cod", name: "Cash on Delivery", description: "Pay when you receive", icon: <Truck className="h-5 w-5" /> },
              ].map((method, i) => (
                <label
                  key={method.id}
                  className="flex items-center gap-4 rounded-2xl border border-border px-4 py-3 text-sm hover:border-gold/50 transition-colors cursor-pointer"
                >
                  <input type="radio" name="pay" value={method.name} defaultChecked={i === 0} className="accent-[var(--gold)]" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/50 text-gold">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{method.name}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border border-border px-6 py-3 text-xs tracking-[0.2em] uppercase">
                Back
              </button>
            )}
            <button className="flex-1 rounded-full bg-plum-gradient px-6 py-3.5 text-xs tracking-[0.22em] uppercase text-primary-foreground">
              {step < 2 ? "Continue" : "Send order on WhatsApp"}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-3xl border border-gold/30 bg-secondary/50 p-6">
          <h2 className="font-display text-2xl">Order summary</h2>
          <ul className="mt-4 space-y-3">
            {c.items.map(({ product, qty }) => (
              <li key={product.slug} className="flex items-center gap-3 text-sm">
                <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                <span className="min-w-0 flex-1 truncate">{product.name} × {qty}</span>
                <span>{inr(product.price * qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{inr(c.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{inr(c.gst)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{c.shipping === 0 ? "Free" : inr(c.shipping)}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-2xl"><dt>Total</dt><dd>{inr(c.total)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
