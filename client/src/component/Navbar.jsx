import React, { useState, useEffect, useContext } from "react";
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
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate, useLocation } from "react-router-dom";
import Logout from "./Logout";
import { getallCategories } from "../api/bookapi";


export default function Navbar({ selectedCategory, setfilter, setsearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [cartCount] = useState(3);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();


  const isActive = (path) => location.pathname === path;
  const activeButtonClass =
    "bg-emerald-500/30 border-emerald-400/60 text-emerald-300";
  const inactiveButtonClass =
    "bg-slate-700/50 border-emerald-500/30 text-emerald-400";

  const fetchCategories = async () => {
    try {
      const res = await getallCategories();

      setCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const logOut = () => {
    setLogoutModalOpen(true);
  };
  const user = localStorage.getItem("user");
  const isadmin = user === "Admin"?true:false;
  const isLoggedIn = !user? false : true;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 z-0 backdrop-blur-xl bg-linear-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 border-b border-emerald-500/30" />

        <nav
          role="navigation"
          aria-label="Main"
          className="relative z-10 mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8"
        >
          <div className="flex flex-1 md:flex-initial items-center">
            <a
              href="#"
              className="-m-1.5 p-1.5 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
              <span className="text-lg sm:text-2xl font-bold bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                ShopHub
              </span>
            </a>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-xl">
              <label className="relative block group">
                <span className="sr-only">Search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setsearch(e.target.value);
                  }}
                  className="w-full rounded-full backdrop-blur-xl bg-slate-700/50 border border-emerald-500/40 py-2.5 pl-11 pr-4 text-sm placeholder-slate-400 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:bg-slate-700/70 focus:shadow-xl focus:shadow-emerald-500/20"
                  placeholder="Search products, categories, brands..."
                />
                <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors" />
              </label>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-xl backdrop-blur-xl bg-slate-700/50 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-500/60 transition-all duration-300"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <button
              aria-label="Open search"
              className="p-2 rounded-xl backdrop-blur-xl bg-slate-700/50 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-500/60 transition-all duration-300"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            <button
              aria-label="Cart"
              className={`relative p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-emerald-600/30 hover:border-emerald-500/60 ${
                isActive("/allcarts")
                  ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                  : "bg-slate-700/50 border-emerald-500/30 text-emerald-400"
              }`}
              onClick={() => navigate("/allcarts")}
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-400 text-white text-[10px] h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <PopoverGroup className="hidden md:flex gap-x-8 items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl bg-slate-700/50 border border-emerald-500/40 hover:bg-slate-700/70 transition-all duration-300">
                Categories
                <ChevronDownIcon className="h-5 w-5" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-0 z-50 mt-3 w-screen max-w-md rounded-3xl backdrop-blur-xl bg-slate-800/90 shadow-2xl ring-1 ring-emerald-500/20 border border-emerald-500/30 shadow-emerald-900/50"
              >
                { !isadmin?(
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                    Select Category
                  </h3>
                  <select
                    className="w-full p-3 rounded-2xl backdrop-blur-xl bg-slate-700/50 border border-emerald-500/40 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/80 transition-all duration-300"
                    onChange={(e) => selectedCategory(e.target.value)}
                  >
                    <option value="" className="bg-slate-900 text-emerald-400">
                      All Categories
                    </option>
                    {categories?.map((c) => (
                      <option
                        key={c._id || c}
                        value={c._id||c}
                        className="bg-slate-900 text-emerald-400"
                      >
                        {c.name || c}
                      </option>
                    ))}
                  </select>
                </div>):<div></div>
}
              </PopoverPanel>
            </Popover>
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl bg-slate-700/50 border border-emerald-500/40 hover:bg-slate-700/70 transition-all duration-300">
                Filter
                <ChevronDownIcon className="h-5 w-5" />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-0 z-50 mt-3 w-48 rounded-3xl backdrop-blur-xl bg-slate-800/90 shadow-2xl ring-1 ring-emerald-500/20 border border-emerald-500/30 shadow-emerald-900/50"
              >
                { !isadmin ? (
                  <div className="p-3 space-y-1">
                    {[
                      { label: "All", value: "" },
                      { label: "Price Low to High", value: "price-asc" },
                      { label: "Price High to Low", value: "price-desc" },
                      { label: "A-Z", value: "az" },
                    { label: "Z-A", value: "za" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setfilter?.(option.value)}
                      className="w-full text-left text-white/90 hover:text-white hover:bg-slate-700 rounded-xl px-3 py-2 transition"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>) : (
                  <div></div>
                 )
}
              </PopoverPanel>
            </Popover>
            {!isadmin ? (
              <Popover className="relative">
                <PopoverButton
                  className={`flex items-center gap-1 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl border transition-all duration-300 hover:bg-slate-700/70 ${
                    isActive("/userdashboard")
                      ? activeButtonClass
                      : inactiveButtonClass
                  }`}
                  onClick={() => navigate("/userdashboard")}
                >
                  UserDashBoard
                </PopoverButton>
              </Popover>
            ) : (
              <Popover className="relative">
                <PopoverButton
                  className={`flex items-center gap-1 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl border transition-all duration-300 hover:bg-slate-700/70 ${
                    isActive("/userdashboard")
                      ? activeButtonClass
                      : inactiveButtonClass
                  }`}
                  onClick={() => navigate("/admindashboard")}
                >
                  AdminDashboard
                </PopoverButton>
              </Popover>
            )}
            {isadmin ? (
              <ul className="flex items-center gap-6">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className={`font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-4 py-2 backdrop-blur-xl border transition-all duration-300 hover:bg-slate-700/70 flex items-center gap-2 ${
                      isActive("/") ? activeButtonClass : inactiveButtonClass
                    }`}
                  >
                    ➕ Add Book
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/updateBook")}
                    className={`font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-4 py-2 backdrop-blur-xl border transition-all duration-300 hover:bg-slate-700/70 flex items-center gap-2 ${
                      isActive("/updateBook")
                        ? activeButtonClass
                        : inactiveButtonClass
                    }`}
                  >
                    ✏️ Update Books
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center gap-6">
                <li>
                  <button
                    onClick={() => navigate("/shopping")}
                    className={`font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl border transition-all duration-300 hover:bg-slate-700/70 ${
                      isActive("/shopping")
                        ? activeButtonClass
                        : inactiveButtonClass
                    }`}
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-semibold text-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/80 rounded-xl px-3 py-2 backdrop-blur-xl bg-slate-700/50 border border-emerald-500/40 hover:bg-slate-700/70 transition-all duration-300"
                  >
                    About
                  </a>
                </li>
              </ul>
            )}
          </PopoverGroup>

          <div className="hidden lg:flex items-center gap-6">
            {!isadmin ? (
              <button
                className={`relative p-2 ml-2.5 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-emerald-600/30 hover:border-emerald-500/60 ${
                  isActive("/favorites")
                    ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                    : "bg-slate-700/50 border-emerald-500/30 text-emerald-400"
                }`}
                onClick={() => navigate("/favorites")}
                title="My Favorites"
              >
                <HeartIcon className=" h-6 w-6" />
              </button>
            ) : null}
            {!isadmin ? (
              <button
                className={`relative p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-emerald-600/30 hover:border-emerald-500/60 ${
                  isActive("/orders")
                    ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                    : "bg-slate-700/50 border-emerald-500/30 text-emerald-400"
                }`}
                onClick={() => navigate("/orders")}
                title="My Orders"
              >
                <ClipboardDocumentListIcon className="h-6 w-6" />
              </button>
            ) : null}

            {isLoggedIn ? (
              <button
                onClick={logOut}
                className="font-semibold ml-1.5 text-red-400 hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/80 rounded-xl px-3 py-2 backdrop-blur-xl bg-slate-700/50 border border-red-500/40 hover:bg-red-600/20 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/Login")}
                className="p-2 rounded-xl backdrop-blur-xl bg-slate-700/50 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/30 hover:border-emerald-500/60 transition-all duration-300"
              >
                <UserIcon className="h-6 w-6" />
              </button>
            )}
            <button
              className={`relative p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-emerald-600/30 hover:border-emerald-500/60 ${
                isActive("/allcarts")
                  ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                  : "bg-slate-700/50 border-emerald-500/30 text-emerald-400"
              }`}
              onClick={() => navigate("/allcarts")}
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-400 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel
          id="mobile-menu"
          className="fixed right-0 top-0 h-full w-80 sm:w-96 backdrop-blur-xl bg-white/10 p-6 shadow-2xl border-l border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6 text-emerald-400" />
              <span className="font-bold text-lg bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                ShopHub
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <label className="relative block group">
              <span className="sr-only">Search For books</span>
              <input
                className="w-full rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 py-3 pl-11 pr-4 text-sm placeholder-white/50 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:bg-white/15"
                placeholder="Search products, categories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setsearch(e.target.value);
                }}
              />
              <MagnifyingGlassIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60 group-focus-within:text-emerald-300 transition-colors" />
            </label>
          </div>

          <nav className="space-y-3">
            <a
              href="/shopping"
              onClick={() => setMobileMenuOpen(false)}
              className={`block font-semibold py-3 px-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:bg-white/20 ${
                isActive("/shopping")
                  ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                  : "bg-white/10 border-white/20 text-white"
              }`}
            >
              Shop
            </a>
            <div className="space-y-2">
              <h3 className="text-white/80 font-semibold px-4">Categories</h3>
              {categories?.map((c) => (
                <a
                  key={c.name || c}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/15 text-white/90 hover:text-white transition-all duration-300"
                >
                  <div className="h-8 w-8 flex items-center justify-center rounded-xl backdrop-blur-xl bg-emerald-400/20 border border-emerald-400/30">
                    <span className="text-xs font-bold text-emerald-300">
                      {(c.name || c).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{c.name || c}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/20 mt-6 space-y-3">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 font-semibold text-white rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Best Sellers
              </a>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 font-semibold text-white rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Deals
              </a>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 font-semibold text-white rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                About
              </a>
              <div className="px-4 pt-2">
                <label
                  className="block text-sm text-white/80 mb-1"
                  htmlFor="mobile-filter"
                >
                  Filter
                </label>
                <select
                  id="mobile-filter"
                  onChange={(e) => {
                    setfilter?.(e.target.value);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl bg-slate-700/50 text-white border border-emerald-500/40 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                >
                  <option value="">All</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigate("/orders");
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-white/20 ${
                    isActive("/orders")
                      ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                      : "bg-white/10 border-white/20 text-white"
                  }`}
                  title="My Orders"
                >
                  <ClipboardDocumentListIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    navigate("/favorites");
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-white/20 ${
                    isActive("/favorites")
                      ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                      : "bg-white/10 border-white/20 text-white"
                  }`}
                  title="My Favorites"
                >
                  <HeartIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    navigate("/allcarts");
                    setMobileMenuOpen(false);
                  }}
                  className={`relative p-2 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:bg-white/20 ${
                    isActive("/allcarts")
                      ? "bg-emerald-500/30 border-emerald-400/60 text-emerald-300"
                      : "bg-white/10 border-white/20 text-white"
                  }`}
                  title="Cart"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-400 text-white text-xs h-4 w-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logOut();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 font-semibold text-white rounded-2xl backdrop-blur-xl bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  title="Login"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </nav>
        </DialogPanel>
      </Dialog>

      <Logout
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </>
  );
}
