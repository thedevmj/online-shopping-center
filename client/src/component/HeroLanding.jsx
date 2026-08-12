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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute right-12 top-28 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-4xlrder border-emerald-400/20 bg-slate-950/60 shadow-[0_20px_80px_rgba(16,185,129,0.15)] backdrop-blur-xl">
          <div className="grid items-center gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300">
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
                  className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02]"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/Login")}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-400/50 hover:bg-emerald-500/10"
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
              <div className="absolute inset-0 rounded-[30px] bg-emerald-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/80 p-4 shadow-2xl shadow-black/25">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
                    alt="Books on a table"
                    className="h-105ull object-cover"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                      Featured drop
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">Weekend Reading</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-emerald-300">
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
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Why readers choose us</p>
              <h2 className="mt-2 text-3xl font-bold text-white">Everything you need for your next chapter</h2>
            </div>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
            {featureCards.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="min-w-70 snap-start flex-1 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-lg shadow-slate-950/20"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
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
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Popular categories</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Find the books that match your mood</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categoryCards.map((category) => (
              <div
                key={category}
                className="rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-400/10 to-blue-500/10 p-5 text-center transition hover:-translate-y-1 hover:border-emerald-400/50"
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
              <div className="mb-4 inline-flex rounded-2xl bg-white/10 p-3 text-emerald-300">
                <BookOpenIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-4xl border border-emerald-400/20 bg-linear-to-r from-emerald-500/10 via-slate-900/80 to-blue-500/10 p-8 text-center shadow-[0_20px_80px_rgba(16,185,129,0.12)]">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Start today</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Ready to build your next reading ritual?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-200">
            Sign in to shop, save favorites, track orders, and discover a collection tailored to your taste.
          </p>
          <button
            onClick={() => navigate("/Login")}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-900 transition hover:bg-emerald-200"
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
}
