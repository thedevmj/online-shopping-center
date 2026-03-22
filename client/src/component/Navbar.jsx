import React, { useState, useEffect, createContext } from "react";
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
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { getallCategories } from "../api/bookapi";
import e from "cors";
import Shophub_cart from "./Shophub_cart";


const features = [
  { name: "Free Shipping", icon: TruckIcon },
  { name: "Secure Payment", icon: ShieldCheckIcon },
  { name: "Easy Returns", icon: SparklesIcon },
];


export default function Navbar({ onLoginClick ,selectedCategory}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [categories, setCategories] = useState([]);
  
  
  const navigate = useNavigate();
 
  const fetchCategories=async()=>{
    try{
      const res=await getallCategories();
       
       setCategories(res.data.data);
       console.log("Categories fetched successfully !", res.data.data);
        
    }
    catch(err){
      console.log("Error occured in fetching categories",err.message);
      
    }
  
  }
  
  
  
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully ");
    navigate("/Login");
  };
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userCartCount = () => {
    if (!user) return 0;
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  return (
    <>
   
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 z-0 bg-white/70 backdrop-blur-md border-b border-white/20" />

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
              <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ShopHub
              </span>
            </a>
          </div>

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

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            >
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

          <PopoverGroup className="hidden md:flex gap-x-8 items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-1 font-semibold text-gray-900 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded">
            
             Categories
           
                <ChevronDownIcon className="h-5 w-5" />
              
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute left-0 z-50 mt-3 w-screen max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-xl ring-1 ring-white/20"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h3>
                  <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={fetchCategories} onChange={(e) => selectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories?.map((c) => (
                      <option key={c.name || c} value={c._id || c} >
                        {c.name || c}
                      </option>
                    ))}
                  </select>
                </div>
              </PopoverPanel>
            </Popover>
            {user && user?.role === "Admin" ? (
              <ul className="flex items-center gap-6">
                <li>
                  <a
                    href="/updateBook"
                    className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded"
                  >
                    Update Books
                  </a>
                </li>
                <li>
                  <a
                    href="/updateBook"
                    className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded"
                  >
                    Add Book
                  </a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <a
                    href="/shopping"
                    className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded"
                  >
                    shop
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-semibold hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 rounded"
                  >
                    About
                  </a>
                </li>
              </ul>
            )}
          </PopoverGroup>

          <div className="hidden lg:flex items-center gap-6">
            <button className="relative p-1 hover:text-red-500">
              <HeartIcon className="h-6 w-6" />
            </button>
            {isLoggedIn ? (
              <button
                onClick={logOut}
                className="font-semibold text-gray-900 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-200 rounded px-2 py-1"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="p-1 hover:text-blue-600"
              >
                <UserIcon className="h-6 w-6" />
              </button>
            )}
            <button className="relative p-1" onClick={()=>navigate("/allcarts")}>
              <ShoppingBagIcon className="h-6 w-6" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>

        <div className="hidden lg:block w-full bg-emerald-50/80 backdrop-blur-md border-t">
          <div className="max-w-7xl mx-auto px-8 py-3 flex justify-around">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <feature.icon className="h-5 w-5 text-emerald-600" />
                {feature.name}
              </div>
            ))}
          </div>
        </div>
      </header>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel
          id="mobile-menu"
          className="fixed right-0 top-0 h-full w-80 sm:w-96 bg-white p-6 shadow-xl transform transition-transform duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg">ShopHub</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
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
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold py-2"
            >
              Shop
            </a>
            {categories.map((c) => (
              <a
                key={c.name}
                href={c.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
              >
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
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-semibold"
              >
                Best Sellers
              </a>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-semibold"
              >
                Deals
              </a>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 font-semibold"
              >
                About
              </a>
            </div>

            <div className="pt-4 border-t mt-4 flex items-center justify-between">
              {isLoggedIn ? (
                <div>
                  <Logout />
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="p-1 hover:text-blue-600 transition"
                  title="Login"
                >
                  <UserIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </nav>
        </DialogPanel>
      </Dialog>
    </>
  );
}
