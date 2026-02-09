import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  SparklesIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const categories = [
  { name: "Electronics", description: "Latest gadgets and devices", href: "#", icon: SparklesIcon },
  { name: "Fashion", description: "Trending clothes and accessories", href: "#", icon: SparklesIcon },
  { name: "Home & Garden", description: "Furniture and decor items", href: "#", icon: SparklesIcon },
  { name: "Sports", description: "Athletic gear and equipment", href: "#", icon: SparklesIcon },
  { name: "Books", description: "Digital and physical books", href: "#", icon: SparklesIcon },
];

const features = [
  { name: "Free Shipping", icon: TruckIcon },
  { name: "Secure Payment", icon: ShieldCheckIcon },
  { name: "Easy Returns", icon: SparklesIcon },
];

export default function Navbar({ onLoginClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Glass Morphism Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 z-0 bg-white/70 backdrop-blur-md border-b border-white/20" />

        <nav role="navigation" aria-label="Main" className="relative z-10 mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1 md:flex-initial items-center">
            <a href="#" className="-m-1.5 p-1.5 hover:scale-105 transition-transform flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </a>
          </div>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-xl">
              <label className="relative block group">
                <span className="sr-only">Search</span>
                <input
                  className="w-full rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm py-2.5 pl-11 pr-4 text-sm placeholder-gray-400 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:shadow-lg hover:border-gray-400 focus:bg-white"
                  placeholder="Search products, categories, brands..."
                />
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
              </label>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} aria-label="Open menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>
            <button aria-label="Open search" className="p-1">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button aria-label="Cart" className="relative p-1">
              <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <PopoverGroup className="hidden md:flex gap-x-8 items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded">
                Shop
                <ChevronDownIcon className="h-5 w-5" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute left-0 z-50 mt-3 w-screen max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl ring-1 ring-white/20"
              >
                <div className="p-6">
                  <h3 className="text-sm font-semibold mb-4">Categories</h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {categories.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
                        >
                          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100">
                            <item.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.name}</div>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverPanel>
            </Popover>

            <ul className="flex items-center gap-6">
              <li>
                <a href="#" className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded">Best Sellers</a>
              </li>
              <li>
                <a href="#" className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded">Deals</a>
              </li>
              <li>
                <a href="#" className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded">About</a>
              </li>
            </ul>
          </PopoverGroup>

          {/* Right icons */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="relative p-1 hover:text-red-500">
              <HeartIcon className="h-6 w-6" />
            </button>
            <button onClick={onLoginClick} className="p-1 hover:text-blue-600">
              <UserIcon className="h-6 w-6" />
            </button>
            <button className="relative p-1">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Features bar (desktop) */}
        <div className="hidden lg:block w-full bg-emerald-50/80 backdrop-blur-md border-t">
          <div className="max-w-7xl mx-auto px-8 py-3 flex justify-around">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center gap-2 text-sm text-gray-700">
                <feature.icon className="h-5 w-5 text-emerald-600" />
                {feature.name}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel id="mobile-menu" className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-white p-6 shadow-xl transform transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">ShopHub</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-4">
            <label className="relative block group">
              <span className="sr-only">Search</span>
              <input
                className="w-full rounded-full border border-gray-300 bg-white py-2.5 pl-11 pr-4 text-sm placeholder-gray-400 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-lg hover:border-gray-400 focus:bg-white"
                placeholder="Search products, categories..."
              />
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </label>
          </div>

          <nav className="space-y-3">
            <a href="#" onClick={() => setMobileMenuOpen(false)} className="block font-semibold py-2">Shop</a>
            {categories.map((c) => (
              <a key={c.name} href={c.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                <div className="h-8 w-8 flex items-center justify-center rounded-md bg-blue-100">
                  <c.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.description}</div>
                </div>
              </a>
            ))}

            <div className="pt-3 border-t mt-3">
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">Best Sellers</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">Deals</a>
              <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-2 font-semibold">About</a>
            </div>

            <div className="pt-4 border-t mt-4 flex items-center justify-between">
              <button onClick={() => { setMobileMenuOpen(false); onLoginClick && onLoginClick(); }} className="px-4 py-2 rounded-md bg-blue-600 text-white">Sign in</button>
              <button className="relative px-3 py-2">
                <ShoppingBagIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </div>
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  );
}

