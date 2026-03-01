"use client";

import { useState } from "react";
import { CheckCircle2, Globe, DollarSign, Users, Truck } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Global Audience",
    desc: "Reach customers across the US, Europe, and beyond who specifically seek out rare, artisan goods.",
  },
  {
    icon: DollarSign,
    title: "You Set the Price",
    desc: "Price your products fairly for your work. We take a small commission — you keep the majority.",
  },
  {
    icon: Users,
    title: "We Handle Marketing",
    desc: "Professional photography, storytelling, SEO, and social media promotion all included.",
  },
  {
    icon: Truck,
    title: "You Ship Directly",
    desc: "Ship from your workshop to the customer. No warehousing or middleman. Just you and the buyer.",
  },
];

export default function BecomeAVendorPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    products: "",
    story: "",
    website: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "vendor", ...formData }),
      });
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-forest py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-saffron uppercase tracking-widest mb-4">
              Partner with World Specialties
            </p>
            <h1
              className="text-5xl sm:text-6xl font-bold text-cream mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your craft. Our platform. Together.
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed">
              If you make something extraordinary — rare spices, handcrafted
              pottery, artisan sauces, unique textiles — we want to tell your
              story and help you reach a global audience. You focus on the
              making. We handle the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div key={b.title} className="text-center">
                <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <b.icon className="w-6 h-6 text-saffron" />
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{b.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm">
            {status === "success" ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-teal mx-auto mb-4" />
                <h2
                  className="text-2xl font-bold text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Application received!
                </h2>
                <p className="text-charcoal/60 leading-relaxed">
                  Thank you for applying. We review every application personally
                  and will be in touch within 5-7 business days.
                </p>
              </div>
            ) : (
              <>
                <h2
                  className="text-3xl font-bold text-charcoal mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Apply to be a vendor
                </h2>
                <p className="text-charcoal/60 mb-8">
                  Tell us about yourself and what you make. We review every
                  application personally.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Your name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream"
                        placeholder="Maria García"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">
                        Email address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream"
                        placeholder="maria@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Country / Region *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream"
                      placeholder="Oaxaca, Mexico"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      What do you make or produce? *
                    </label>
                    <input
                      type="text"
                      name="products"
                      required
                      value={formData.products}
                      onChange={handleChange}
                      className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream"
                      placeholder="Hand-woven textiles, artisan hot sauce, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Tell us your story *
                    </label>
                    <textarea
                      name="story"
                      required
                      rows={5}
                      value={formData.story}
                      onChange={handleChange}
                      className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream resize-none"
                      placeholder="How long have you been doing this? What makes your products unique? Where do your materials come from?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Website or Instagram (optional)
                    </label>
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full border border-charcoal/20 rounded-xl px-4 py-3 text-charcoal placeholder-charcoal/30 focus:outline-none focus:ring-2 focus:ring-saffron bg-cream"
                      placeholder="https://..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-coral text-sm">
                      Something went wrong. Please try again or email us
                      directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-saffron hover:bg-amber-500 disabled:opacity-60 text-white font-semibold py-4 rounded-xl transition-colors text-base"
                  >
                    {status === "loading"
                      ? "Sending..."
                      : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
