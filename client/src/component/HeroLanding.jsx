import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRightIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const featureCards = [
  {
    icon: BookOpenIcon,
    title: "Curated Picks",
    text: "Explore handpicked fiction, business reads, and must-have classics chosen for every interest.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trusted Quality",
    text: "Every title is reviewed for quality, value, and reader satisfaction before it reaches your shelf.",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    text: "Enjoy quick fulfillment, easy checkout, and a seamless shopping journey from first click to final delivery.",
  },
];

const categoryCards = [
  "Fiction",
  "Business",
  "Self Growth",
  "Technology",
  "Fantasy",
  "Classics",
];

const storyBenefits = [
  {
    title: "Built for readers",
    text: "Discover books that match your curiosity and create a library you actually look forward to revisiting.",
  },
  {
    title: "Smart browsing",
    text: "Use filters, categories, and search to quickly find the perfect read without clutter or confusion.",
  },
  {
    title: "Start in seconds",
    text: "Create an account, save favorites, and continue from any device while keeping your journey personalized.",
  },
];

export default function HeroLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-lime-400/15 blur-3xl" />
        <div className="absolute right-12 top-28 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lime-400/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-4xl border-lime-400/20 bg-slate-950/60 shadow-[0_20px_80px_rgba(163,230,53,0.15)] backdrop-blur-xl">
          <div className="grid items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-lime-300">
                <SparklesIcon className="h-4 w-4" />
                Your next favorite read
              </span>

              <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Discover books that inspire, teach, and spark joy.
              </h1>

              <p className="mt-5 max-w-lg text-base text-slate-200 sm:text-lg">
                ShopHub brings together bestsellers, fresh discoveries, and everyday essentials for readers who want more from every page.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => navigate("/Login")}
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-lime-400 to-lime-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-lime-500/30 transition hover:scale-[1.02]"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/Login")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-lime-400/50 hover:bg-lime-500/10"
                >
                  Browse Books
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                {[
                  "Free shipping over $35",
                  "Curated collections",
                  "Easy returns",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[30px] bg-lime-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/25">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
                    alt="Books on a table"
                    className="h-105ull object-cover"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-lime-400/20 bg-lime-500/10 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-lime-300">
                      Featured drop
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">Weekend Reading</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-lime-300">
                    30% off
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-lime-300">Why readers choose us</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Everything you need for your next chapter</h2>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="min-w-70 snap-start flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg shadow-slate-950/20"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-lime-500/10 p-3 text-lime-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[28px] border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl sm:p-8">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.2em] text-lime-300">Popular categories</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Find the books that match your mood</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categoryCards.map((category) => (
              <div
                key={category}
                className="rounded-2xl border border-lime-500/20 bg-linear-to-br from-lime-400/10 to-blue-500/10 p-5 text-center transition hover:-translate-y-1 hover:border-lime-400/50"
              >
                <p className="text-lg font-semibold text-white">{category}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-6 lg:grid-cols-3">
          {storyBenefits.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-lime-300">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-4xl border border-lime-400/20 bg-linear-to-r from-lime-500/10 via-slate-900/80 to-blue-500/10 p-8 text-center shadow-[0_20px_80px_rgba(163,230,53,0.12)]">
          <p className="text-sm uppercase tracking-[0.2em] text-lime-300">Start today</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Ready to build your next reading ritual?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Sign in to shop, save favorites, track orders, and discover a collection tailored to your taste.
          </p>
          <button
            onClick={() => navigate("/Login")}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 transition hover:bg-lime-200"
          >
            Get Started
          </button>
        </section>
      </main>

      <footer className="relative z-10 mt-16 border-t border-lime-500/20 bg-slate-950/80 backdrop-blur-xl">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-lime-400/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-6 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-8 w-8 text-lime-400" />
                <span className="text-2xl font-bold bg-linear-to-r from-lime-400 to-blue-400 bg-clip-text text-transparent">
                  ShopHub
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">
                Your neighborhood bookstore, reimagined. Discover handpicked
                stories, timeless classics, and everyday essentials — all in one
                place.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:border-lime-400/60 hover:bg-lime-500/10 hover:text-lime-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:border-lime-400/60 hover:bg-lime-500/10 hover:text-lime-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition hover:border-lime-400/60 hover:bg-lime-500/10 hover:text-lime-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                Explore
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {[
                  { label: "Shop Books", action: () => navigate("/shopping") },
                  { label: "My Favorites", action: () => navigate("/favorites") },
                  { label: "Track Orders", action: () => navigate("/vieworder") },
                  { label: "Shopping Cart", action: () => navigate("/allcarts") },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-slate-300 transition hover:text-lime-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                Categories
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {categoryCards.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => navigate("/shopping")}
                      className="text-slate-300 transition hover:text-lime-300"
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-300">
                Stay in the loop
              </h3>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                Get the latest drops, deals, and reading lists straight to your
                inbox.
              </p>
              <form
                className="mt-5 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-lime-400/60 focus:ring-2 focus:ring-lime-400/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-linear-to-r from-lime-400 to-lime-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-lime-500/30 transition hover:scale-[1.03]"
                >
                  Subscribe
                </button>
              </form>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
                <ShieldCheckIcon className="h-5 w-5 text-lime-400" />
                Free shipping over $35 · Easy 30-day returns
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="#" className="transition hover:text-lime-300">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-lime-300">
                Terms of Service
              </a>
              <a href="#" className="transition hover:text-lime-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
